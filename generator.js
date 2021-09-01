const workbox = require("workbox-build")

workbox.generateSW({
    cacheId: "Pwa",
    globDirectory:"./",
    globIgnores: [
        "**/generator.js",
        "**/sw.js",
        "**/node_modules/**/*",
        "*/node_modules/**/*",
        "./node_modules/**/*",
    ],
    globPatterns:[
        "**/*.{css,js,jsx,html}",
        "./**/*.{css,js,jsx,html}",
        "./*.{css,js,jsx,html}"
    ],
    swDest: "./sw.js",
    runtimeCaching: [
        {
            urlPattern: /\.(?:html|htm)$/,
            handler: "CacheFirst",
            options: {
                cacheName: "Markup"
            }
        }
    ]
})