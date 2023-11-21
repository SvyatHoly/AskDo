module.exports = {
  extends: ["./mobile-utils/shared/.eslintrc", "./lint/rules"],
  env: {
    node: true,
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single", { avoidEscape: true }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
        alphabetize: { order: "asc" },
        "newlines-between": "always",
      },
    ],
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "@typescript-eslint/consistent-type-definitions": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-namespace": "off",
    /*
        If you are thinking of adding some rules here, just think that they might be suitable for sweatcoin/wallet as well.
        In that case, please add your rules to the shared/.eslintrc file instead. - https://github.com/sweatco/mobile-utils/blob/main/shared/.eslintrc
        If for some reason you find it difficult to add a rule to the shared configuration, then please create a task in the CORE Jira board.
      */
  },
};
