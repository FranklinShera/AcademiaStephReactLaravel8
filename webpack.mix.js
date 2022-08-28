const mix = require("laravel-mix");
const path = require("path");

mix.js("resources/js/app.jsx", "public/js")
    .react()
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
        require("autoprefixer"),
    ]);
