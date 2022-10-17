/// <reference types="cypress" />

// instead of () => we can use function() method
describe("My first test suite", () => {

    it("first test", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get(".search-keyword").type("ca");

        // wait sample
        cy.wait(2000);

        // assertion sample (use :visible if you search only for visible for user elements)
        cy.get("div[class='product']:visible").should("have.length", 4);

        // aliasing for selectors
        cy.get("div[class='products']").as("productsSelector");

        // finding elements inside element
        cy.get("@productsSelector").find(".product").should("have.length", 4);

        // choose second element inside .find and verify text
        cy.get("@productsSelector").find(".product").eq(1).contains("ADD TO CART").click();
    })

    it("second test", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get(".search-keyword").type("ca");
        cy.wait(2000);

        // search for exact text inside all elements
        cy.get("div[class='products']").find(".product").each(($element, index, $list) => {

            // const vegetableText if we want it final
            var vegetableText = $element.find("h4.product-name").text();

            if(vegetableText.includes("Cashews")) {
                // use wrap to treat $element as not-promise element
                cy.wrap($element).find("button").click();
            }
        })

        // log example (cy. function must not be given into variable - will not work); then() enables to work with subject
        // because text() is not cypress command
        cy.get(".brand").then((logElement) => {
            cy.log(logElement.text());
        })

        // following will not work because const and text() are not cypress command. 
        // Cypress command understand only cypress command
        // const logoText = cy.get(".brand").text()
        // cy.log(logoTextw)
    })

    it("third test", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.wait(2000);

        cy.get(".brand").should("have.text", "GREENKART");

        cy.get("div[class='products']").find(".product").each(($element, index, $list) => {

            // const vegetableText if we want it final
            var vegetableText = $element.find("h4.product-name").text();

            if(vegetableText.includes("Cashews")) {
                // use wrap to treat $element as not-promise element
                cy.wrap($element).find("button").click();
            }
        })

        cy.get('.cart-icon > img').click();
        cy.contains("PROCEED TO CHECKOUT").click();
        cy.contains("Place Order").click();

        cy.get("#root label").should("have.text", "Choose Country");
    })
})
