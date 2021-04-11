module.exports = {
  configureWebpack:
    process.env.NODE_ENV === "production"
      ? {
          externals: ["@vue/composition-api", "chart.js", "vue"],
        }
      : {},
};
