/// <reference types="cypress" />

describe("Cookies training", () => {

    before(() => {
        cy.session("firstSession", () => {
            cy.visit('https://demo.guru99.com/test/cookie/selenium_aut.php');
            cy.get("[name=username]").type("abc123");
            cy.get("[name=password]").type("123xyz");
            cy.get("[name=submit]").click()

        // Cypress.Commands.add('login', (username, password) => {
        //     cy.session([username, password], () => {
        //       cy.visit('/login')
        //       cy.get('[data-test=username]').type(username)
        //       cy.get('[data-test=password]').type(password)
        //       cy.get('#login').click()
        //       cy.url().should('contain', '/login-successful')
        //     })
        //   })
        })
      })

    it("Handling cookies example", () => {
        cy.visit('https://demo.guru99.com/test/cookie/selenium_aut.php');
        cy.get("h2 center").should("have.text", "You are logged In");
    })

})
