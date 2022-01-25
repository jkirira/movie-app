module.exports = {
    plugins: [
        [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
            "postcss-preset-env", {},
        ],
    ],
};