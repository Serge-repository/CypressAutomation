const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // full hd resolution
  viewportHeight: 1080,
  viewportWidth: 1920,
  
  projectId: "jxycim",
  reporter: "mochawesome",
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 10000,
  e2e: {
    // baseUrl: 'http://localhost:4201',
    // e2e folder to recognise files as test specs
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'],
    experimentalSessionAndOrigin: true
  },

  // custom variables
  env: {
    url: "https://rahulshettyacademy.com/angularpractice/",
    apiBaseUrl: "http://dummy.restapiexample.com",
    apiBaseUrl2: "https://reqres.in",
    apiBaseUrl3: "https://gorest.co.in",
    weatherApi: "https://metaweather.com"
  }
});
