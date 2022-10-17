/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import "cypress-iframe"

describe('Handling iframes', () => {
    it('IFrame example', () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        // upload our frame so cypress know about it
        cy.frameLoaded("#courses-iframe")
        // perform actions inside registered frame
        cy.iframe().find("a[href*='mentorship']").eq(0).click();
        cy.wait(1000)
        cy.iframe().find("h1[class*='pricing-title']").should("have.length", 2)
    })

})