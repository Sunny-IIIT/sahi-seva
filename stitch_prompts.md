# Stitch AI UI Generation Prompts: SahiSeva

Below are highly detailed prompts optimized for **Stitch AI** (or any advanced AI UI generator) to completely redesign the core interfaces of the SahiSeva platform. 

These prompts explicitly specify the design language, state machines, and components we've built in our architecture.

---

### 1. Public Homepage (Discovery & Search)
**Prompt:**
> "Create a modern, production-grade SaaS homepage for 'SahiSeva', a government-backed platform connecting users with verified blue-collar workers. The design should feel highly trustworthy, using a color palette of indigo (#4338ca) and emerald green for verification. 
> 
> Include:
> 1. A clean sticky Navbar with a logo, language selector, and a 'Sign In' button.
> 2. A hero section with a large, prominent search bar. Inside the search bar, include a 'Microphone' icon to indicate Voice-First search.
> 3. A 'Browse by Category' grid below the hero (e.g., Plumbers, Electricians, Maids) with clean icons.
> 4. A 'Top Rated Workers' horizontal scroll section showing small worker cards with 'Govt. Verified' badges.
> Use Tailwind CSS and Lucide React icons."

---

### 2. Real-Time Search Results (Geospatial & Status)
**Prompt:**
> "Design a Search Results page for a ride-hailing style service app. The page should have a split layout: on the left, a scrollable list of 'Worker Cards', and on the right, an interactive map placeholder.
> 
> For the Worker Cards, include:
> - A profile avatar with a glowing green 'Online' dot indicator.
> - The worker's name, category, and an Uber-style 'Trust Score' badge (e.g., 85/100).
> - A 'Govt. Verified ✓' shield badge.
> - An ETA indicator (e.g., '12 mins away' with a car icon).
> - A prominent 'Book Now' or 'Unlock Contact' CTA button.
> Keep the UI crisp, using Tailwind CSS, and ensure it looks like a premium enterprise application."

---

### 3. Worker Registration (Aadhaar 2-Step OTP Flow)
**Prompt:**
> "Create a 2-step onboarding UI for service workers. It needs to look highly secure and official.
> 
> The core component is an Aadhaar (National ID) Verification block with a dynamic state machine:
> - **Default State:** A 12-digit input field with a 'Send OTP' button.
> - **OTP Sent State:** The 12-digit input becomes disabled/locked. A 6-digit OTP input appears below it with a 'Verify' button, along with a green text message saying 'OTP sent to linked mobile'.
> - **Success State:** Both inputs disappear/lock, replaced by a highly visible, premium green 'Govt. Verified ✓' badge inside a green-tinted box.
> Use a clean card layout with subtle shadows, Tailwind CSS, and Lucide React icons."

---

### 4. Authentication (Login / Sign Up)
**Prompt:**
> "Design a modern authentication page (Login/Signup) for a SaaS platform. The UI should be centered on the screen within a clean, subtly shadowed card.
> 
> Include:
> - A 'Welcome Back' header with a subtle logo.
> - A prominent, full-width 'Continue with Google' button with the Google 'G' logo.
> - An 'OR continue with phone' divider.
> - A form with a 'Mobile Number' input and a '6-digit OTP' input.
> - A primary submit button with an arrow icon.
> - A footer link saying 'Don't have an account? Sign Up here'.
> The design must be extremely polished, using Tailwind CSS, light gray borders, and an indigo primary color."

---

### 5. Customer Dashboard (Bookings & Dispute Resolution)
**Prompt:**
> "Design a user dashboard for managing service bookings. 
> 
> Include:
> - A sidebar or top navigation with 'Active Jobs', 'Past Bookings', and 'Profile'.
> - A list of 'Booking Cards'. Each card should show the worker's name, the service type, the date, and the total cost.
> - For active bookings, show an 'In Progress' status pill and an 'ETA / Live Tracking' button.
> - For past bookings, include a 'Rate Worker' button.
> - Critically, next to each booking, include a subtle 'Report Issue' or 'Raise Dispute' button that looks contextual (not alarmist, but easy to find).
> Use Tailwind CSS, clean typography, and standard SaaS layout principles."

---

### 6. Cooperative Admin Dashboard (Protected Route)
**Prompt:**
> "Design a secure, enterprise-grade admin dashboard for a 'Society Admin' managing local workers. 
> 
> Include:
> - A dark-themed sidebar with navigation links: 'Overview', 'Worker Verification', 'Disputes', 'Settings'.
> - A top header showing the currently logged-in admin's avatar and a 'Logout' button.
> - A main content area featuring a data table of 'Pending Workers'.
> - The table should have columns for Name, Phone, Aadhaar Status, and Actions (Approve/Reject buttons).
> - Include summary metric cards at the top (e.g., 'Total Workers', 'Pending KYC', 'Active Disputes') with small sparkline charts or trend indicators.
> Use Tailwind CSS and ensure it looks like a professional internal tool."
