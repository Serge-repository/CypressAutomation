/// <reference types="cypress" />

describe("Alerts training", () => {

    it("Handling simple and tricky alert", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        // alerts auto accept
        cy.get("#alertbtn").click();
        cy.get("#confirmbtn").click();
        
        // on() - assertion for text inside browser alert popups (returns true or false) 
        // window:alert - this is browser even and Cypress can handle such events
        // must be run AFTER clicking and accepting alert so event to be written in browser session
        cy.on("window:alert", (alertText) => {
            //Mocha
            expect(alertText).to.equal("Hello , share this practice page and share your knowledge");
        })
        cy.on("window:confirm", (alertText) => {
            //Mocha
            expect(alertText).to.equal("Hello , Are you sure you want to confirm?");
        })
    })

    it("Opening new tab inside same tab and validate URL correctness", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        
        // removing tag attribute which opens link in new tab
        cy.get("#opentab").invoke("removeAttr", "target").click();

        // return to previous page
        cy.go("back");
        // validate url is correct
        cy.url().should("include", "AutomationPractice");
        cy.url().should("have.string", "https://rahulshettyacademy.com/AutomationPractice/");
    })

    it("Web table handling", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("table[name='courses'] td:nth-child(2)").each(($element, index, $list) => {
            var desiredText = $element.text();
            if(desiredText.includes("Python")) {

                // next() gets NEXT element in DOM after selected ON SAME LEVEL
                cy.get("table[name='courses'] td:nth-child(2)").eq(index).next().then((price) => {
                    var desiredPrice = price.text();
                    expect(desiredPrice).to.equal("25");
                })
            }
        })  
    })

})
