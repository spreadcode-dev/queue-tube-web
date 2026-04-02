export default {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "subject-issue-format": ({ subject }: { subject: string | undefined }) => {
          const valid = /^#\d+ - [a-z]/.test(subject ?? "");
          return [
            valid,
            "subject must follow the pattern: #<issue> - <lowercase description> " +
              "(e.g. #42 - add drag-to-reorder support)",
          ];
        },
      },
    },
  ],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "ci", "perf", "revert"],
    ],
    "scope-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "subject-issue-format": [2, "always"],
    "subject-max-length": [2, "always", 72],
    "subject-case": [0],
    "body-max-line-length": [0],
  },
};
