# Marga - Complete Features Documentation

**Marga** is a free, web-based study tracker designed specifically for Indian students preparing for competitive entrance exams and board examinations. Built as a progressive web app (PWA) with offline support, it enables students to track chapters, monitor syllabus completion, plan revisions, and manage study progress across multiple exam paths.

**Project Details:**
- **Author:** Pruthviraj Arun
- **Build Year:** 2026
- **License:** © 2026 Pruthviraj Arun. All rights reserved.
- **Website:** https://mymarga.in
- **App URL:** https://mymarga.in/app

---

## 1. Core Application Features

### 1.1 Chapter Tracking System
**Purpose:** Convert syllabus into manageable chapter-by-chapter tracking units.

**Features:**
- Mark chapters as:
  - **Complete:** Chapter fully studied and understood
  - **In Progress:** Currently being studied
  - **Not Started:** Yet to be begun
  - **Pending/Backlog:** Not yet covered
- Track completion percentages by subject and exam
- Visual progress bars showing:
  - Syllabus mapped percentage
  - Overall chapter completion rate
- Quick status updates from mobile or desktop
- Support for unlimited chapters per subject
- **Drag-and-drop reordering:** Rearrange chapters by dragging them to custom order with visual feedback
- **Alphabetical sorting:** Sort chapters alphabetically, by completion %, by confidence, or custom order
- **Chapter grouping:** Organize chapters into groups/sections with collapsible group headers
- **Group completion tracking:** Track when entire groups/sections are complete
- **Inline chapter renaming:** Edit chapter names directly in the tracker
- **Health indicators:** Visual status dots (green/yellow/red) showing chapter/subject freshness

**UI Elements:**
- Chapter list with checkbox toggles
- Progress bars indicating percentage completion
- Subject-wise progress view
- Weekly focus indicator showing priority chapters
- Drag handle icons (≡) for chapter reordering
- Sort dropdown selector (subject header)
- Expandable/collapsible group sections (.scene-row, .group-header)
- Group progress indicators
- Health/status indicator dots

### 1.2 Confidence Tracking
**Purpose:** Identify weak topics and plan targeted revision.

**Features:**
- Rate confidence level for each chapter:
  - **High:** Strong understanding, likely to retain
  - **Medium/Mid:** Comfortable knowledge level
  - **Low:** Needs more practice or clarity
  - **New:** Just started learning
- Confidence-based chapter ordering to surface weak topics
- Color-coded visual indicators (red→yellow→green) for quick scanning
- Confidence update timestamp tracking
- Sort chapters by confidence (weak topics to top)
- Bulk confidence updates for multiple chapters

### 1.3 Revision Planning & Scheduling
**Purpose:** Manage revision cycles and prevent forgotten topics.

**Features:**
- Log last revision date for each chapter via date picker
- Track revision cycle frequency
- Visual indicators showing chapters that need revisiting
- Revision status dashboard showing:
  - Recently revised chapters
  - Chapters pending revision
  - Topics not revisited since first attempt
  - Days since last revision counter
- Integration with mock test schedules
- Countdown to board/entrance exam dates
- Spaced repetition suggestions

### 1.4 Syllabus Completion Tracking
**Purpose:** Provide real-time visibility into overall exam preparation progress.

**Features:**
- Subject-wise syllabus percentage completion
- Overall exam completion percentage
- Chapter distribution by subject
- Completion trends showing progress over time
- Alerts for chapters approaching due dates
- Backlog visibility highlighting unstarted topics

### 1.5 Progress Analytics Dashboard
**Purpose:** Visualize study patterns and identify improvement areas.

**Features:**
- Subject performance comparison across:
  - Physics
  - Chemistry
  - Mathematics
  - Biology
  - English
  - Computer Science
  - History
  - Economics
  - Other board subjects
- Progress cards showing:
  - Completion percentage
  - Confidence average per subject
  - Total chapters in subject
  - Time invested (if logged)
- Visual charts and graphs for trend analysis
- Mock test result integration (if available)
- Weekly study streak tracking

---

## 2. Exam Support & Pathways

### 2.1 Pre-Loaded Exam Templates

Marga provides ready-to-use syllabus structures for major Indian exams:

#### **JEE (Joint Entrance Examination)**
- **Subjects:** Physics, Chemistry, Mathematics
- **Specialization:** Engineering entrance (Mains & Advanced)
- **Features:**
  - PCM (Physics-Chemistry-Mathematics) chapter organization
  - Mock test integration points
  - Confidence tracking for high-weightage chapters
  - Chapter priority based on JEE difficulty levels
  - Weekly target setting for PCM balance
- **Landing Page:** Interactive preview showing JEE-specific study flow

#### **NEET (National Eligibility cum Entrance Test)**
- **Subjects:** Physics, Chemistry, Biology (Botany & Zoology)
- **Specialization:** Medical entrance exam preparation
- **Features:**
  - Biology-heavy organization (50% of exam)
  - NCERT chapter mapping
  - Recall trend tracking
  - Physics and Chemistry chapter visibility for balanced prep
  - Genetics and human physiology focus
  - Mock test scheduling and review
- **Landing Page:** Analytics-style preview with recall trend visualization

#### **CBSE (Central Board of Secondary Education)**
- **Classes:** Class 11 & 12
- **Specialization:** National board exam preparation
- **Features:**
  - NCERT chapter-by-chapter tracking
  - School test integration
  - Internal assessment planning
  - Board-specific chapter weights
  - Multi-subject tracking (Science, Maths, Social Studies, etc.)
  - Pre-board and board exam readiness tracking
  - Performance analytics by chapter

#### **ISC (Indian School Certificate)**
- **Classes:** Class 11 & 12
- **Specialization:** Upper school board preparation with commerce/science focus
- **Features:**
  - Subject-specific desk organization
  - Commerce stream support (Accounts, Economics)
  - Science stream support (Physics, Chemistry, Biology)
  - Literature and humanities tracking
  - Chapter completion with internal deadline alignment
  - Revision status for board readiness
  - Subject priority balancing

#### **ICSE (Indian Certificate of Secondary Education)**
- **Classes:** Class 10
- **Specialization:** ICSE board preparation
- **Features:**
  - Multi-subject support:
    - English (Literature & Language)
    - Mathematics
    - Science (Physics, Chemistry, Biology)
    - Social Studies (History & Geography)
    - Computer Applications
  - Internal assessment tracking
  - Pre-board readiness assessment
  - Chapter-wise confidence and completion
  - Subject revision scheduling

#### **KCET (Karnataka Common Entrance Test)**
- **Streams:** PCM & PCB
- **Specialization:** Karnataka entrance exam + board integration
- **Features:**
  - Board preparation + KCET practice workflow
  - Chapter tracking for board + entrance together
  - Stream-specific syllabus (PCM or PCB)
  - Mock test planning
  - Exam readiness indicators

#### **MHT CET (Maharashtra Common Entrance Test)**
- **Streams:** PCM & PCB
- **Specialization:** Maharashtra entrance exam preparation
- **Features:**
  - PCM or PCB stream selection
  - Study streak tracking (daily motivation)
  - Mock review integration
  - Chapter revision rhythm planning
  - Realistic revision schedule management

### 2.2 Custom Exam Creation
**Purpose:** Support any syllabus beyond pre-loaded exams.

**Features:**
- Create custom exam with:
  - Custom exam name
  - Any number of subjects
  - Unlimited chapters per subject
  - Custom subject names (not limited to standard exams)
  - Custom syllabus structure
- Import from existing exam template and customize
- Add/remove subjects anytime
- Rename or delete custom subjects
- Custom exams treated same as pre-built templates (all features available)

**Use Cases:**
- Coaching institute syllabuses
- College entrance tests
- State-level board exams
- Internal school assessments
- Personal study plans

### 2.3 Multi-Exam Switching
**Purpose:** Support students preparing for multiple exams simultaneously.

**Features:**
- Switch between different exams in sidebar
- Per-exam data isolation (each exam tracked separately)
- Quick exam switcher in top navigation
- All features available for each active exam
- Independent progress tracking per exam
- Sync queue handles multi-exam changes seamlessly

---

## 3. Theme & Personalization System

### 3.1 Light & Dark Mode Toggle
**Purpose:** Provide visual comfort and personalization for different lighting conditions and preferences.

**Features:**
- **Dark Mode:** Deep navy/dark theme optimized for:
  - Low-light studying environments
  - Reduced eye strain during extended sessions
  - Battery efficiency on OLED screens
  - Professional, immersive appearance

- **Light Mode:** Bright, clean theme with:
  - Better readability in bright environments
  - Professional presentation for study planning
  - High contrast for accessibility

- **Theme Switching:**
  - Checkbox toggle in Settings → Appearance tab
  - One-click switching between dark and light
  - Smooth CSS transitions (no jarring color changes)
  - Real-time preview of changes

- **Persistent Theme:**
  - Theme choice saved to localStorage (`studyTracker_theme`)
  - Remembered across all browser sessions
  - Applied automatically on app reload
  - Synced with cloud account metadata
  - Survives device changes when logged in

- **Automatic Color Adaptation:**
  - Subject cards adapt colors to current theme
  - HSL-based color system adjusts saturation/lightness per theme
  - All UI elements (buttons, inputs, borders) theme-aware
  - Form elements and date pickers respect system theme
  - No content reflow on theme change
  - Accessible contrast ratios maintained in both modes

- **Color System:**
  - Primary accent (#6C63FF purple) consistent in both themes
  - Subject-specific HSL colors adapt:
    - Physics: Blue hue (217)
    - Chemistry: Green hue (142)
    - Mathematics: Purple hue (271)
    - Computer Science: Cyan hue (200)
    - English: Pink hue (330)
    - Literature: Orange hue (45)
    - And more...

### 3.2 Settings & Personalization Modal
**Purpose:** Centralized control panel for all app preferences and account management.

**Access:** Click settings icon (⚙️) in sidebar footer

**Modal Structure:**
- Header with "Settings" title and close button
- Tab navigation on left side
- Scrollable content panel on right
- Smooth tab transitions
- Responsive layout for mobile

**Settings Sections:**

#### **Profile Tab**
- Display name and avatar
- Email address display
- Account creation date
- Account tier/subscription status
- Edit profile option
- User preferences summary

#### **Study Preferences Tab**
- **Feature Toggles:**
  - Toggle visibility of confidence levels
  - Toggle visibility of revision dates
  - Toggle visibility of scene/group details
  - Toggle chapter count badges (X/Y completed display)
  - Toggle other study metadata
- **Customization Options:**
  - Enable/disable specific tracking features
  - Customize which fields appear in chapter cards
  - Control visibility of advanced study metadata
  - Set preferred default sorting method per subject

#### **Appearance Tab**
- **Theme Selection:**
  - Dark mode checkbox
  - Light mode toggle
  - Visual theme preview
  - Real-time changes applied
- **Visual Comfort:**
  - Color scheme selector (if available)
  - Contrast adjustment options
  - Font size or spacing preferences

#### **Support Tab**
- Help and documentation links
- Tutorial and onboarding access
- Feature walkthroughs and guides
- FAQ and knowledge base
- Contact/support information
- Send feedback option

### 3.3 Sidebar Navigation
**Purpose:** Quick access to main views, exams, and settings.

**Location:** Fixed left sidebar (collapsible)

**Components:**

1. **Header**
   - Marga branding/logo
   - Sidebar toggle button (expand/collapse)
   - Smooth animations

2. **Exam List**
   - Current active exams/trackers
   - "New Exam" button (+ icon)
   - Exam rename functionality (hover actions)
   - Exam delete functionality (with confirmation)
   - Scrollable list with custom scrollbar
   - Active exam highlighted with primary color indicator

3. **Navigation**
   - Dashboard link (📋 icon + "Dashboard/Tracker")
   - Insights link (📊 icon + "Insights" - analytics page)
   - Active state indicator

4. **Footer Controls**
   - Settings row (⚙️ + "Settings")
   - Theme toggle row (🌙/☀️ + "Appearance")
   - Help/Support row (❓ + "Help")
   - User profile section (avatar + name/email)
   - Logout button

**Responsive Behavior:**
- Desktop: Always visible, can toggle expand/collapse
- Tablet: Compact by default, slide-out on menu click
- Mobile: Hidden with hamburger menu toggle

---

## 4. Insights & Analytics Page

### 4.1 Insights Dashboard
**Path:** `/app/insights`
**Purpose:** View study patterns, activity analytics, and progress visualization over time.

**Access:**
- Insights button in left sidebar (📊)
- Active state highlighting when on Insights page
- Smooth transitions between Dashboard and Insights views

**Features:**

#### **Activity Timeline & Heatmap**
- Visual representation of study activity over time
- Heatmap showing completion frequency
- Chapter completion history
- Group/section completion tracking
- Revision activity log
- Color-coded activity intensity

#### **Study Patterns & Analytics**
- Overall activity summary
- Exam-specific progress tracking
- Most active study periods identification
- Chapter completion trends over time
- Activity type breakdown (chapter completions, revisions, confidence updates, etc.)
- Weekly/monthly activity charts

#### **Engagement Metrics**
- Total chapters tracked
- Completed groups/sections count
- Revisions logged
- Confidence updates made
- Study streak (consecutive days of activity)
- Total activity count

#### **Per-Exam Analytics**
- Subject-specific progress
- Chapter completion status per subject
- Confidence distribution by subject
- Revision frequency per subject
- Activity intensity by subject

#### **Empty State Messaging**
- Helpful message when no activity recorded yet
- Encouragement to start tracking
- Quick link to create first exam: "Track your first chapter →"
- Visual guide showing activity types that count:
  - Chapter completions
  - Group/section completions
  - Revision logs
  - Confidence updates
  - Data imports

#### **Responsive Design**
- Full-width on desktop
- Adapted chart sizes for mobile
- Touch-friendly interaction areas
- Scrollable content on small screens

### 4.2 Activity Logging & Tracking
**Purpose:** Record all study actions for analytics and insights generation.

**Activity Types Tracked:**

1. **Chapter Activities (Weight: 28)**
   - Chapter completion
   - Chapter status changes
   - Confidence level updates
   - Revision date logging

2. **Group Activities (Weight: 28)**
   - Group/scene completion
   - Group creation
   - Group renaming
   - Group deletion

3. **Data Activities (Weight: 1-varies)**
   - Exam creation (weight: 1)
   - Exam deletion (weight: 1)
   - Bulk chapter operations
   - Data imports (weight: varies)

4. **Engagement Activities**
   - Feature usage
   - Settings customization
   - Theme toggling
   - Sort preference changes

**Activity Recording:**
- Auto-logged when user takes action
- Timestamp recorded for each activity
- User ID attached for sync verification
- Deduplication to prevent double-counting
- Stored in user_data table with activity history

### 4.3 Health & Status Indicators
**Purpose:** Visual status for chapters and subjects at a glance.

**Color-Coded System:**
- 🟢 **Green:** Active/Good (recently completed or revised)
- 🟡 **Yellow:** Warning (not touched in ~2 weeks)
- 🔴 **Red:** Critical (long overdue >1 month or low confidence)

**Subject-Level Health:**
- Single health indicator dot per subject card
- Reflects overall subject status
- Based on completion %, revision recency, confidence average
- Updated in real-time as user makes changes

**Chapter-Level Indicators:**
- Individual chapter status dots
- Color reflects recency and confidence
- Helps identify chapters needing attention

---

## 5. Advanced Chapter Management

### 5.1 Drag-and-Drop Reordering
**Purpose:** Allow students to customize chapter order based on their study strategy.

**Implementation:**
- **Visual Indicators:**
  - Drag handle icon (≡) on left of each chapter
  - Cursor changes to grab (🖐️) on hover
  - Cursor changes to grabbing (✊) while dragging
  - Dashed border around dragged chapter
  - Opacity effect for visual feedback

- **Interaction:**
  - Click and hold drag handle to initiate
  - Drag chapter up/down within subject
  - Visual indicator shows drop position
  - Release to drop in new position
  - Smooth slide animation of other chapters

- **Persistence:**
  - Custom chapter order saved to user data
  - Survives page reloads and sessions
  - Synced to cloud via offline-sync system
  - Per-subject order tracking

- **Benefits:**
  - Study chapters in any order (not forced alphabetical)
  - Prioritize weak areas by moving to top
  - Group related chapters together
  - Organize by exam strategy or coaching schedule
  - Enable personalized study flow

### 5.2 Sorting Options
**Purpose:** Provide multiple ways to organize and view chapters.

**Sorting Methods:**

1. **Alphabetical Sort**
   - Chapters sorted A-Z by name
   - Quick reference ordering
   - Standard syllabus order

2. **Custom Order (Manual)**
   - Sort by drag-and-drop reordering
   - Student-defined sequence
   - Default after manual reordering

3. **Completion-Based Sort**
   - Unfinished chapters at top
   - In-progress chapters middle
   - Completed chapters at bottom
   - Helps focus on pending work

4. **Confidence-Based Sort**
   - Low-confidence chapters at top
   - High-confidence chapters at bottom
   - Weak area identification
   - Priority planning

5. **Revision-Date Sort**
   - Most recently revised at top
   - Helps track revision cycles
   - Ensures spaced repetition
   - Overdue chapters flagged

**Sort Control:**
- **Location:** Subject card header, next to subject name
- **UI:** Dropdown select (.sort-select class)
- **Label:** Shows current sort method
- **Persistence:**
  - Saved per subject in localStorage (key: `SORT_KEY`)
  - Remembered across sessions
  - Independent for each subject
  - Auto-saves on selection

### 5.3 Chapter Grouping & Organization
**Purpose:** Organize chapters hierarchically into units or sections.

**Features:**
- **Group Headers:**
  - Collapsible/expandable group sections
  - Visual group name display
  - Collapse state persisted per group
  - Group-level progress indicator

- **Group Operations:**
  - Add chapter to group
  - Create new group (inline)
  - Rename group inline
  - Delete group (with chapter relocation)
  - Group completion percentage

- **Group-Level Tracking:**
  - Mark entire group complete
  - Group completion tracked separately as activity
  - Group health indicator (green/yellow/red dot)
  - Group-level revision dates
  - Group confidence average

- **Responsive Layout:**
  - Desktop: Indented hierarchy view
  - Mobile: Accordion-style collapse/expand
  - Touch-friendly expand/collapse areas
  - Visual indentation for nesting

**Use Cases:**
- Unit-based organization (Unit 1, Unit 2, etc.)
- Topic grouping (Mechanics, Thermodynamics, etc.)
- Difficulty grouping (Easy, Medium, Hard)
- Time-based grouping (Month 1, Month 2, etc.)

---

## 6. User Preferences & Customization

### 6.1 Feature Toggle System
**Purpose:** Allow students to customize which tracking features are visible.

**Toggleable Features:**
- Chapter confidence levels display
- Revision date columns
- Group/scene details
- Chapter count badges (X/Y format)
- Other advanced metadata

**Benefits:**
- Reduce visual clutter for beginners
- Show advanced metrics for experienced users
- Customize interface to study style
- Enable/disable features as needed
- Persistent across sessions

### 6.2 Preference Storage
**Purpose:** Remember user choices across sessions.

**Storage Methods:**
- **Client-Side:** localStorage for instant access
- **Cloud:** User profile in Supabase for sync
- **Persistence:**
  - Theme preference
  - Sort preferences per subject
  - Feature toggle settings
  - Sidebar collapse state
  - Active exam selection

---

## 7. Data Management

### 7.1 Offline-First Architecture
**Purpose:** Work seamlessly without internet connection.

**Features:**
- All data cached locally via Service Worker
- Changes queued in localStorage when offline
- Automatic sync when back online
- No data loss even with app crashes
- Chronological replay of changes on reconnect

### 7.2 Sync System
**Purpose:** Keep local and cloud data synchronized.

**Process:**
1. User makes change (offline)
2. Change queued locally via enqueueSync()
3. Sync indicator shows "Queued"
4. When online, syncPendingChanges() triggered
5. Items replayed in chronological order
6. Supabase upsert operations execute
7. Successfully synced items removed from queue
8. Toast shows sync count

**Deduplication:**
- User ID validation for security
- Timestamp-based deduplication
- Prevents duplicate activities
- Chronological ordering maintained

### 7.3 Supabase Integration
**Purpose:** Cloud backend for auth and data persistence.

**Features:**
- **Authentication:**
  - Email/password signup and login
  - Google OAuth with PKCE flow
  - Session token management
  - Auto-refresh on expiration

- **Database Tables:**
  - `profiles`: User account data
  - `user_data`: Chapter tracking, groups, activities
  - `feedback`: User feedback submissions
  - Indexes on user_id for fast queries

- **Security:**
  - Row-level security (RLS) policies
  - User ID validation
  - HTTPS/TLS encryption
  - Session isolation

---

## 8. Progressive Web App (PWA) Features

### 8.1 Installation Support
**Purpose:** Allow installation as native-like app on multiple devices.

**Supported Platforms:**
- **iOS:** Add to Home Screen
- **Android:** Install app prompt
- **Desktop:** App shortcut creation
- **Windows/Mac:** Standalone window

**Installation Features:**
- Custom app icon
- Splash screen on launch
- Standalone window mode
- App manifest configuration
- Home screen shortcut

### 8.2 Service Worker & Caching
**Purpose:** Enable offline functionality and fast loading.

**Caching Strategy:**

- **Static Assets:** Cache-first
  - CSS stylesheets
  - JavaScript bundles
  - Images and icons
  - Fonts

- **HTML Pages:** Network-first
  - Always fetch fresh if possible
  - Fallback to cache when offline
  - Ensures latest version

- **External Resources:** Bypass service worker
  - External APIs
  - Third-party scripts
  - CDN resources

**Cache Management:**
- Auto-update with skip-waiting
- Versioned cache names (v11, v12, etc.)
- Stale content cleanup
- Offline fallback page

### 8.3 Offline Mode
**Purpose:** Full app functionality without internet.

**Features:**
- Read all existing data while offline
- Queue changes for later sync
- Offline banner showing connection status
- Auto-reconnect detection
- No forced refresh required
- Sync on reconnect

---

## 9. Homepage & Marketing Features

### 9.1 Landing Page (`index.html`)
**Purpose:** Introduce Marga to new users and guide to sign up.

**Sections:**

#### **Navigation**
- Header navbar with exam links
- Lazy-loaded navigation for performance
- Links to all exam-specific pages
- "Start Tracking" CTA button

#### **Hero Section**
- Headline: "Study Smarter, Not Harder"
- Subheading explaining Marga benefits
- Eye-catching hero image or animation
- "Create Free Account" CTA button

#### **Key Features Section**
- 4+ feature cards highlighting:
  - Chapter tracking
  - Confidence monitoring
  - Revision planning
  - Offline support
  - PWA installation
  - Real-time analytics

#### **Exam Templates Section**
- Card for each supported exam:
  - JEE
  - NEET
  - CBSE
  - ISC
  - ICSE
  - KCET
  - MHT CET
- Click card to open exam-specific page

#### **Why Use Marga?**
4 Key Benefits:
1. **Backlog Management** - Make pending chapters visible
2. **Revision Consistency** - Revision dates and confidence help retention
3. **Syllabus Overwhelm** - Break large syllabuses into trackable chapters
4. **Exam Stress** - Clear tracker reduces panic

#### **FAQ Section**
11 Questions Answered:
1. What is Marga?
2. Is Marga free?
3. Does Marga work offline?
4. Does Marga work on mobile?
5. How does chapter tracking work?
6. Which exams does Marga support?
7. Can I track revisions in Marga?
8. Do I need to sign in to use Marga?
9. Can I create a custom exam?
10. How is my data synced?
11. Is my data secure?

**FAQ Features:**
- Single-open accordion
- Session-based state persistence
- Keyboard navigation support
- Hash-based bookmarking
- Smooth animations

#### **CTA Banner**
- "Ready to take control of your studies?"
- "Join students using Marga to prepare smarter"
- "Create Free Account →" button

#### **Footer**
- Logo and branding
- Social links (LinkedIn, Instagram, Email)
- Exam planner links
- Contact page link
- Copyright and legal

### 9.2 Exam-Specific Landing Pages
**Path:** `/[exam-name]-study-planner/`
**Examples:** `/jee-study-planner/`, `/neet-study-planner/`

**Each Exam Page Includes:**

1. **Hero Section**
   - Exam name and completion percentage
   - Progress bar visualization
   - 3 sample chapter cards with status

2. **Interactive Preview**
   - Clickable sample chapter cards
   - Show/hide completion details
   - Demonstrate chapter tracking UI

3. **Customized Visualizations**
   - **JEE:** 3x3 grid matrix
   - **NEET:** Analytics card with recall trend
   - **ISC/ICSE:** Subject chips display
   - **CBSE:** Performance bars visualization
   - **KCET:** Flow diagram
   - **MHT CET:** Bar chart

4. **Study Journey Section**
   - 3-step workflow cards
   - Exam-specific journey titles
   - Step descriptions

5. **Below-Fold Animations**
   - Halo particle effects
   - Interactive element animations
   - Scroll-reveal animations

---

## 10. Contact & Feedback System

### 10.1 Feedback Form (`contact.js`)
**Path:** `/contact`
**Purpose:** Collect user feedback and suggestions.

**Form Fields:**
1. **Name** (required, 1-100 chars)
   - Pre-filled if logged in
   - Character counter

2. **Email** (required, valid email)
   - Pre-filled from profile
   - Email validation

3. **Subject** (required, 1-100 chars)
   - Dropdown or text input
   - Categories: Bug, Feature, Other

4. **Message** (required, 10-3000 chars)
   - Textarea with live character count
   - Character limit warning
   - Markdown-friendly

5. **Honeypot** (hidden)
   - Spam protection
   - Ignored if filled

**Form Validation:**
- Client-side validation before submission
- Field-specific error messages
- Error field highlighting
- Clear all errors on retry
- Custom email validation

**Submission:**
- Submit button spinner during submission
- Button disabled during submission
- Supabase insertion into feedback table
- Auto-capture of user_id, created_at
- Toast notification on success/error

**Toast Messages:**
- **Success:** "Thanks! Your feedback was sent."
- **Error:** "Could not send feedback. Please try again."
- Auto-dismiss after 3 seconds
- Position: Fixed bottom-center

---

## 11. FAQ System (Deferred Loading)

### 11.1 Lazy-Loading Strategy
- FAQ not loaded on homepage load
- Deferred via `requestIdleCallback` (2.5s timeout)
- Loaded as separate `faq.js` file
- Reduces initial page load impact
- Progressive enhancement

### 11.2 Accessible Accordion Pattern
**ARIA Attributes:**
- Trigger buttons have:
  - `aria-expanded` (true/false)
  - `aria-controls` (panel ID)
- Panels have:
  - `aria-hidden` (matches expanded state)
  - `role="region"`
  - `aria-labelledby` (button ID)

**Keyboard Support:**
- **Enter/Space:** Toggle open/close
- **ArrowDown:** Focus next item
- **ArrowUp:** Focus previous item
- **Home:** Focus first item
- **End:** Focus last item

**Focus Management:**
- Auto-moves between items
- Visible focus indicator
- Scroll-to-focus on navigation
- Respects `prefers-reduced-motion`

### 11.3 State Management
**Session Storage:**
- Key: `faq:[pathname]`
- Stores last opened item
- Per-page tracking
- Session-scoped only

**Hash Navigation:**
- URL fragment (#faq-item-id) opens accordion
- Deep linking support
- Auto-scroll-to-view
- Back button compatible

### 11.4 Animation
- Smooth max-height animation
- ~450ms duration
- Respects `prefers-reduced-motion`
- CSS-based for performance

---

## 12. Design System & Theming

### 12.1 Color Palette

**Primary Brand:**
- `--primary: #6C63FF` (Purple)
- `--primary-rgb: 108, 99, 255`

**Subject/Domain Colors (HSL-based):**
- `--phy: 217` (Physics - Blue)
- `--chem: 142` (Chemistry - Green)
- `--math: 271` (Mathematics - Purple)
- `--cs: 200` (Computer Science - Cyan)
- `--eng: 330` (English - Pink)
- `--lit: 45` (Literature - Orange)
- `--org: 28` (Organic Chemistry - Brown)
- `--inorg: 172` (Inorganic Chemistry - Teal)
- `--bot: 130` (Botany - Lime)
- `--zoo: 95` (Zoology - Yellow-Green)
- `--soc: 48` (Social Studies - Amber)

**Dark Theme Neutrals:**
- `--bg-body: #0D0F1A` (Main background)
- `--bg-card: #141727` (Card background)
- `--bg-card-2: #1C2035` (Secondary card)
- `--text-main: #EEF0FF` (Primary text)
- `--text-sub: #8892B8` (Secondary text)
- `--border: #252A45` (Border)

**Accent Colors:**
- `--accent-gold: #F0C040` (Highlights)
- `--accent-teal: #38E8C5` (Accent)
- `--danger: #EF4444` (Errors)

**Shadows:**
- Standard: `0 4px 6px -1px rgba(0, 0, 0, 0.05)`
- Large: `0 10px 25px -5px rgba(0, 0, 0, 0.12)`

**Border Radius:**
- Standard: `18px`
- Small: `12px`

### 12.2 Typography
- Font Family: 'Plus Jakarta Sans', sans-serif
- Responsive sizing
- Hierarchy through weight and size
- Accessibility focus

### 12.3 Spacing System
- Margin/padding based on 4px units
- Consistent spacing scale
- Mobile-first approach
- Responsive adjustments

---

## 13. Performance & Optimization

### 13.1 Loading Strategies
- **Critical Path:** HTML + CSS synchronous
- **Scripts:** Deferred loading
- **FAQ:** Idle callback (2.5s timeout)
- **Supabase:** CDN-based, lazy import
- **Service Worker:** Registered after page load

### 13.2 Caching Strategy
- Static assets: Cache-first
- HTML: Network-first
- External URLs: Bypass service worker
- SEO files: Always fresh
- Stale content: Cache fallback

### 13.3 Runtime Optimizations
- Throttled scroll events (100ms)
- Passive event listeners
- Intersection Observer for animations
- Request Idle Callback for deferred tasks
- Debounced form validation
- Asset preloading (fonts, critical CSS)

### 13.4 Bundle Optimization
- Minimal dependencies
- Vanilla JS (no frameworks)
- CSS-in-HTML for critical styles
- Lazy-loaded external libraries
- Efficient event delegation

---

## 14. Security & Privacy

### 14.1 Authentication
- **PKCE Flow:** OAuth 2.0 PKCE for secure token exchange
- **Session Storage:** LocalStorage with unique key
- **Token Refresh:** Auto-refresh on expiration
- **HTTPS Only:** Enforced via CORS headers
- **Email Verification:** Confirmation required

### 14.2 Data Protection
- **User ID Validation:** Sync verifies user before replaying
- **Honeypot Field:** Spam protection on feedback
- **Password Hashing:** Supabase Auth handles
- **SQL Injection Protection:** Parameterized queries
- **CORS:** Restrictive origin policy

### 14.3 Privacy
- **Minimal Collection:** Only essential data
- **Session-Based Persistence:** Sync tied to user ID
- **No Tracking:** No analytics by default
- **No Ads:** Privacy-focused
- **GDPR Friendly:** Data export/deletion available

---

## 15. Supported Features Matrix

| Feature | JEE | NEET | CBSE | ISC | ICSE | KCET | MHT CET | Custom |
|---------|-----|------|------|-----|------|------|--------|--------|
| Chapter Tracking | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Confidence Tracking | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Revision Planning | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Syllabus Completion | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Progress Analytics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Offline Support | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| PWA Installation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cloud Sync | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mobile Support | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Drag-and-Drop | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Multiple Sorting | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Theme Toggle | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Insights/Analytics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Chapter Grouping | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Health Indicators | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## 16. Marketing-Focused Features

### 16.1 Unique Selling Points

1. **Indian Exam Specialist**
   - Only tracker designed for Indian exam formats
   - Pre-loaded templates for all major Indian exams
   - Understands Indian syllabus structures

2. **Offline-Ready**
   - Full offline capability (no internet required)
   - Automatic sync when back online
   - Perfect for areas with unreliable connectivity

3. **Fully Customizable**
   - Drag-and-drop chapter reordering
   - Multiple sorting options (alphabetical, completion %, confidence)
   - Create custom exams for any syllabus
   - Toggle features based on preference

4. **Visual Analytics**
   - Insights page with activity heatmaps
   - Study pattern analysis
   - Health indicators at a glance
   - Subject-wise progress tracking

5. **Modern UI with Theme Support**
   - Professional dark and light modes
   - Eye-comfort for late-night studying
   - Quick theme toggle in settings
   - Personalization without clutter

6. **Lightweight & Fast**
   - No heavy frameworks
   - Instant loading on slow connections
   - Small bundle size
   - Mobile-optimized

7. **Privacy-First**
   - No ads or tracking
   - Your data is yours
   - GDPR compliant
   - Transparent data handling

8. **Free Forever**
   - No paywalls
   - No premium features
   - Complete feature access
   - No account type restrictions

---

## 17. Technical Architecture

### 17.1 Frontend Stack
- **HTML5:** Semantic markup
- **CSS3:** Modern styling with variables and media queries
- **Vanilla JavaScript (ES6+):** Pure JS, no framework dependencies
- **Responsive Design:** Mobile-first approach

### 17.2 Backend
- **Supabase:** Backend-as-a-service
- **PostgreSQL:** Database
- **Real-time Sync:** Firebase-style updates
- **Authentication:** Built-in auth UI

### 17.3 File Structure
```
/
├── index.html              # Landing page
├── app.html                # Main app interface
├── contact.html            # Contact/feedback
├── contact.js              # Feedback form logic
├── faq.js                  # FAQ accordion
├── defer-faq.js            # FAQ loader
├── exam-landing.js         # Exam pages
├── home.js                 # Homepage auth
├── offline-sync.js         # Sync queue system
├── service-worker.js       # PWA caching
├── app/                    # App pages
│   ├── index.html          # Dashboard
│   └── insights/           # Analytics page
├── [exam]-study-planner/   # Exam-specific pages
│   └── index.html
├── manifest.json           # PWA config
└── styles/
    ├── app.html (inline CSS)
    ├── contact-page.css
    └── faq.css
```

---

## 18. Roadmap & Future Enhancements

### 18.1 Potential Features
1. Mock test result tracking
2. Study timers (Pomodoro)
3. Study group collaboration
4. Push notifications
5. Teacher/parent dashboard
6. Multilingual support
7. Video integration (YouTube per chapter)
8. Study streak gamification
9. Progress report export (PDF)
10. AI-powered recommendations

---

## Summary

**Marga** combines simplicity with power:

- **For Students:** Intuitive chapter tracking, confidence monitoring, revision planning
- **For Exam Prep:** Pre-built templates for every major Indian exam
- **For Organization:** Drag-and-drop reordering, multiple sorting options, chapter grouping
- **For Insights:** Analytics page showing study patterns and progress
- **For Comfort:** Light and dark themes with one-click toggle
- **For Reliability:** Offline-first with automatic cloud sync
- **For Freedom:** Completely free, no paywalls, all features included

The platform is production-ready, scalable, and designed for growing with expanding exam coverage and features while maintaining its core mission: **helping Indian students prepare smarter, not harder.**

---

**Document Generated:** 2026
**Marga Version:** v11 (Service Worker), v10+ (Feature Suite)
**Last Updated:** Current session
**Comprehensive Feature Coverage:** ✓ Complete with all UI and marketing features
