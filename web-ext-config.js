module.exports = {
  sourceDir: "src",
  artifactsDir: "build",
  build: {
    overwriteDest: true
  },
  ignoreFiles: [
    "node_modules",
    "build",
    ".github",
    ".husky",
    ".prettierrc",
    ".prettierignore",
    "package-lock.json",
    "yarn.lock",
    "yarn-error.log"
  ]
};
