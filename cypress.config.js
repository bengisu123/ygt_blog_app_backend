const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    setupNodeEvents(on, config) {
      // If you need to start a backend, use a valid local command, e.g.:
      // const { exec } = require('child_process')
      // exec('npm run dev', { cwd: './' })
      return config;
    },
  },
});
