const SYNC_QUEUE_KEY = 'marga_sync_queue_v1';
let isSyncing = false;

function generateId() {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

function getSyncQueue() {
  try {
    const data = localStorage.getItem(SYNC_QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to read sync queue:', e);
    return [];
  }
}

function setSyncQueue(queue) {
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.error('Failed to save sync queue:', e);
  }
}

function enqueueSync(payload) {
  const queue = getSyncQueue();
  const userId = window._userId || 'anon';

  // Deduplicate: remove older items with the same userId, type, and key (if exam)
  const filtered = queue.filter(item => {
    if (item.userId !== userId) return true;
    if (item.payload.type !== payload.type) return true;
    if (payload.type === 'exam' && item.payload.key !== payload.key) return true;
    return false;
  });

  filtered.push({
    id: generateId(),
    ts: Date.now(),
    userId: userId,
    payload: payload
  });

  setSyncQueue(filtered);
  updateSyncIndicator();
}

async function executeSyncItem(item) {
  const _sb = window._supabase;
  if (!_sb) throw new Error('Supabase client not initialized');

  const { data: { user }, error: userError } = await _sb.auth.getUser();
  if (userError || !user) {
    throw new Error('User session not available');
  }

  // Double check user matching to avoid replaying under wrong account
  if (item.userId !== user.id) {
    return { status: 'skipped' };
  }

  const payload = item.payload;
  const tsIso = new Date(item.ts).toISOString();

  if (payload.type === 'exam') {
    const examKey = payload.key;
    const dataObj = payload.data;

    if (payload.isDelete) {
      const { error } = await _sb
        .from('user_data')
        .delete()
        .eq('user_id', user.id)
        .eq('exam_key', examKey);
      if (error) throw error;
    } else {
      const { error } = await _sb.from('user_data').upsert({
        user_id: user.id,
        exam_key: examKey,
        data: dataObj,
        updated_at: tsIso
      }, { onConflict: 'user_id,exam_key' });
      if (error) throw error;
    }
  } else if (payload.type === 'meta') {
    const dataObj = payload.data;
    const { error } = await _sb.from('user_data').upsert({
      user_id: user.id,
      exam_key: '__marga_account_meta_v1', // CLOUD_META_KEY
      data: dataObj,
      updated_at: dataObj.savedAt || tsIso
    }, { onConflict: 'user_id,exam_key' });
    if (error) throw error;
  } else if (payload.type === 'activity') {
    const dataObj = payload.data;
    const { error } = await _sb.from('user_data').upsert({
      user_id: user.id,
      exam_key: '__marga_activity_v1',
      data: dataObj,
      updated_at: dataObj.savedAt || tsIso
    }, { onConflict: 'user_id,exam_key' });
    if (error) throw error;
  } else {
    throw new Error(`Unknown payload type: ${payload.type}`);
  }

  return { status: 'success' };
}

async function syncPendingChanges() {
  if (!navigator.onLine) {
    updateSyncIndicator();
    return;
  }
  if (isSyncing) return;
  isSyncing = true;

  updateSyncIndicator('syncing');

  const queue = getSyncQueue();
  // Filter queue to current user
  const userId = window._userId || 'anon';
  const userQueueItems = queue.filter(item => item.userId === userId);

  if (userQueueItems.length === 0) {
    isSyncing = false;
    updateSyncIndicator('synced');
    return;
  }

  let successCount = 0;
  let hasFailure = false;
  const remainingQueue = [];

  // Replay queue in chronological order (from index 0)
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];

    if (hasFailure) {
      remainingQueue.push(item);
      continue;
    }

    // Skip executing if the item doesn't belong to the current user, but keep in queue
    if (item.userId !== userId) {
      remainingQueue.push(item);
      continue;
    }

    try {
      const result = await executeSyncItem(item);
      if (result && result.status === 'skipped') {
        remainingQueue.push(item);
      } else {
        successCount++;
      }
    } catch (err) {
      console.error('Failed to sync queue item:', item, err);
      hasFailure = true;
      remainingQueue.push(item);
    }
  }

  setSyncQueue(remainingQueue);
  isSyncing = false;

  if (successCount > 0 && !hasFailure) {
    if (typeof showToast === 'function') {
      showToast(`Synced ${successCount} change(s) with cloud.`, 'success');
    }
  }

  if (hasFailure) {
    updateSyncIndicator('error');
  } else {
    updateSyncIndicator();
  }
}

// ── UI Indicator Logic ───────────────────────────────────────────────────

function getOrCreateIndicator() {
  let indicator = document.getElementById('margaSyncIndicator');
  if (!indicator) {
    const appHeader = document.querySelector('.app-header');
    if (appHeader) {
      indicator = document.createElement('div');
      indicator.id = 'margaSyncIndicator';
      indicator.className = 'sync-indicator';
      const headerCenter = appHeader.querySelector('.header-center');
      (headerCenter || appHeader).appendChild(indicator);
    }
  }
  return indicator;
}

function updateSyncIndicator(forceStatus) {
  const indicator = getOrCreateIndicator();
  if (!indicator) return;

  let status = 'synced';
  let text = 'Synced';

  if (!navigator.onLine) {
    status = 'offline';
    text = 'Offline';
  } else if (forceStatus === 'syncing') {
    status = 'syncing';
    text = 'Syncing...';
  } else if (forceStatus === 'error') {
    status = 'error';
    text = 'Sync error';
  } else {
    const queue = getSyncQueue();
    const userId = window._userId || 'anon';
    const userQueue = queue.filter(item => item.userId === userId);

    if (userQueue.length > 0) {
      status = 'queued';
      text = `${userQueue.length} queued`;
    }
  }

  indicator.className = `sync-indicator ${status}`;
  indicator.innerHTML = `<span class="sync-dot"></span><span class="sync-text">${text}</span>`;
}

// ── Dynamic Styles Injection ──────────────────────────────────────────────

(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .sync-indicator {
      position: absolute;
      top: 2rem;
      right: 2.5rem;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.25rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      transition: all 0.3s ease;
      user-select: none;
    }
    .insights-active .sync-indicator {
      display: none;
    }
    @media (max-width: 768px) {
      .sync-indicator {
        top: 1.25rem;
        right: 1rem;
      }
    }
    /* On compact phones the badge sits inside .header-center.
       position:static lets it flow in the flex column;
       order:1 places it after the tagline on its own row. */
    @media (max-width: 430px) {
      .sync-indicator {
        position: static;
        order: 1;
        align-self: center;
      }
    }
    .sync-indicator.synced {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    .sync-indicator.synced .sync-dot {
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
    }
    .sync-indicator.offline {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    .sync-indicator.offline .sync-dot {
      width: 6px;
      height: 6px;
      background: #ef4444;
      border-radius: 50%;
    }
    .sync-indicator.queued {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }
    .sync-indicator.queued .sync-dot {
      width: 6px;
      height: 6px;
      background: #f59e0b;
      border-radius: 50%;
      animation: sync-pulse 1.5s infinite alternate;
    }
    .sync-indicator.syncing {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    .sync-indicator.syncing .sync-dot {
      width: 6px;
      height: 6px;
      background: transparent;
      border-radius: 50%;
      border: 2px solid #3b82f6;
      border-top-color: transparent;
      animation: sync-spin 0.8s infinite linear;
    }
    .sync-indicator.error {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    .sync-indicator.error .sync-dot {
      width: 6px;
      height: 6px;
      background: #ef4444;
      border-radius: 50%;
    }
    @keyframes sync-pulse {
      0% { opacity: 0.4; }
      100% { opacity: 1; }
    }
    @keyframes sync-spin {
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();

// ── Reconnection/State Listeners ───────────────────────────────────────────

window.addEventListener('online', () => {
  updateSyncIndicator();
  syncPendingChanges();
});

window.addEventListener('offline', () => {
  updateSyncIndicator();
});

window.addEventListener('DOMContentLoaded', () => {
  updateSyncIndicator();
});
