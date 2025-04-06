import { defineConfig } from "cypress";
import viteConfig from "./vite.config";

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    video: process.env.CI ? true : false,
    screenshotOnRunFailure: true,
  },

  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "http://localhost:3001",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // CI-specific configuration
  ...(process.env.CI && {
    retries: {
      runMode: 2,
      openMode: 0,
    },
  }),
});
