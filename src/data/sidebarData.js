

export const admin = {
    user: {
        name: "John Doe",
        email: "johndoe@email.com",
        avatar: "https://i.pravatar.cc/300?img=1",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            // icon: HomeIcon,
            isActive: true,
        },
        {
            title: "User Management",
            url: "/admin/user-management",
            // icon: UsersIcon,
        },
        {
            title: "Startup Management",
            url: "/admin/startups-management",
            // icon: BriefcaseIcon,
        },
    ]
}

export const investor = {
    user: {
        name: "Alice Smith",
        email: "alicesmith@email.com",
        avatar: "https://i.pravatar.cc/300?img=2",
    },
    navMain: [
        {
            title: "View Startups",
            url: "/investor/view-startup",
            // icon: HomeIcon,
            isActive: true,
        },
        {
            title: "Propose Investment",
            url: "/investor/investment",
            // icon: UsersIcon,
        },
        {
            title: "Offer Mentorship",
            url: "/investor/mentorship",
            // icon: BriefcaseIcon,
        },
        {
            title: "Messages",
            url: "/investor/messages",
            // icon: MessageIcon,
        }
    ]
}

export const student = {
    user: {
        name: "Bob Johnson",
        email: "bobjohnson@email.com",
        avatar: "https://i.pravatar.cc/300?img=3",
    },
    navMain: [
        {
            title: "Profile",
            url: "/student/profile",
            // icon: HomeIcon,
            isActive: true,
            item: [
                {
                    title: "Create Profile",
                    url: "/student/profile/create-profile",
                },
                {
                    title: "Edit Profile",
                    url: "/student/profile/update-profile",
                }
            ]
        },
        {
            title: "View Status",
            url: "/student/view-status",
            // icon: UsersIcon,
        },
        {
            title: "Messages",
            url: "/student/messages",
            // icon: MessageIcon,
        },
    ]
}