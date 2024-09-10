export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Next.js + NextUI",
    description:
        "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Bulk Convert",
            href: "/bulk",
        },
    ],
    navMenuItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Bulk Convert",
            href: "/bulk",
        },
    ],
    links: {
        github: "https://github.com/nextui-org/nextui",
        telegram: "https://patreon.com/jrgarciadev",
    },
};
