module.exports = {
    locales: ["id", "en"],
    defaultLocale: "id",
    localeDetection: false,
    pages: {
        "*": ["common"],
        "/": ["home"],
        "/pokemon": ["pokemon_list"],
    },
};
