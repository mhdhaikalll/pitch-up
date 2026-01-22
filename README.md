# Pitch-Up

A startup pitch platform connecting students, investors, and administrators. Built with Next.js 15 and shadcn/ui.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | admin |
| Student | student@test.com | student |
| Investor | investor@test.com | investor |

## Directory Structure

```
src/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.jsx
│   ├── (root)/                    # Main app pages (with sidebar)
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── user-management/
│   │   │   └── startups-management/
│   │   ├── student/
│   │   │   ├── profile/
│   │   │   ├── messages/
│   │   │   └── view-status/
│   │   └── investor/
│   │       ├── view-startup/
│   │       ├── investment/
│   │       ├── mentorship/
│   │       └── messages/
│   ├── globals.css
│   └── layout.js
├── components/
│   ├── ui/                        # shadcn/ui components
│   └── main-sidebar.jsx           # Reusable sidebar component
├── data/
│   └── sidebarData.js             # Navigation data for each role
├── hooks/
│   └── use-mobile.js
└── lib/
    └── utils.js
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Charts**: Recharts

