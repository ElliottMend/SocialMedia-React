const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("./tailwind.config"),
    require("autoprefixer"),
  ],
};
