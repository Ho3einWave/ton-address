export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "TON Address Converter",
    description: "Convert any type of ton blockchain address.",
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
        github: "https://github.com/Ho3einWave/ton-address",
        telegram: "https://t.me/onyx_ton",
    },
};
