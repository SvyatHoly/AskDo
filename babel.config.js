const messagesDir = process.env.INTL_MESSAGES_DIR || "./translations/src";

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "@babel/plugin-transform-flow-strip-types",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    "@babel/plugin-proposal-class-properties",
    [
      "module-resolver",
      {
        root: ["./js"],
        extensions: [
          ".js",
          ".ts",
          ".tsx",
          ".ios.js",
          ".ios.ts",
          ".ios.tsx",
          ".android.js",
          ".android.ts",
          ".android.tsx",
        ],
        alias: { images: "./assets/images/" },
      },
    ],
    "react-native-reanimated/plugin",
  ],
  sourceMaps: true,
  overrides: [
    {
      test: /.*\.[tj]sx?/,
      exclude: /\/node_modules\//,
      plugins: [
        [
          "react-intl-auto",
          { removePrefix: "js/", filebase: true, includeExportName: true },
        ],
        ["react-intl", { messagesDir: messagesDir }],
      ],
    },
  ],
};
