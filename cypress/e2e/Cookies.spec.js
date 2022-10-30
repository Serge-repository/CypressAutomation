/// <reference types="cypress" />

describe("Cookies training", () => {

    beforeEach(() => {
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

        // Using session() with origin(). session() works within origin() to wait untill we bypass authorization 
        // to continue work on main domain
        // Cypress.Commands.add('login', (username, password) => {
        //     const args = { username, password }
        //     cy.session(args, () => {
        //         cy.origin('supersecurelogons.com', { args }, ({ username, password }) => {
        //           cy.visit('/login')
        //           cy.contains('Username').find('input').type(username)
        //           cy.contains('Password').find('input').type(password)
        //           cy.get('button').contains('Login').click()
        //         })
        //         cy.url().should('contain', '/home')
        //       }
        //     )
        //   })

      })

    it("Cookies example 1", () => {
        cy.visit("https://demo.guru99.com/test/cookie/selenium_aut.php");
        cy.get("h2 center").should("have.text", "You are logged In");
    })

    it("Cookies example 2", () => {
        cy.visit("https://demo.guru99.com/test/cookie/selenium_aut.php");
        cy.get("h2 center").should("have.text", "You are logged In");
    })

    it("Handling origin (SSO) example", () => {
        cy.visit("https://courses.rahulshettyacademy.com/");
        cy.origin("sso.teachable.com", () => {
            cy.visit("https://sso.teachable.com/secure/9521/identity/login/password");
            cy.get("input#email").type("testuser5186@gmail.com");
            cy.get("input#password").type("admin11");
            cy.get("input[type=submit]").click();
        })
        cy.visit("https://courses.rahulshettyacademy.com/");
    })

})
