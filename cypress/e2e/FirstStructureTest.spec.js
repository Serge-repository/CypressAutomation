/// <reference types="cypress" />
import HomePage from "../support/pages/HomePage"
import PhonesPage from "../support/pages/PhonesPage"
import PhonesCheckoutPage from "../support/pages/PhonesCheckoutPage"

describe('Structured framework first suite', () => {
    const homePage = new HomePage;
    const phonesPage = new PhonesPage;
    const phonesCheckoutPage = new PhonesCheckoutPage;

    before(() => {
        cy.visit(Cypress.env("url"));

        // hooks usage
        cy.fixture("example").then((data) => {
            // make data variable global across this class
            globalThis.data=data;
        })
      })

    it('Page Object example', () => {
        homePage.typeNameIntoTextbox(globalThis.data.name);
        homePage.selectGender(globalThis.data.gender);
        homePage.verifyIfUserNameSetCorrectly(globalThis.data.name);

        // validating exact ATTRIBUTE of our web element
        homePage.validateNameTextboxMinLength("2");
    })

    it('Using custom commands (support/commands.js)', () => {
        homePage.openShopLink();

        // here we use selectPhone command from support/commands.js and passing argument Blackberry
        // we also use forEach to provide multiple test data into test from custom command
        globalThis.data.device.forEach((deviceName) => {
            cy.selectPhone(deviceName);
        });
        phonesPage.proceedToCheckout();

        // handling numbers in cypress
        var sum = 0;
        var total = "";
        cy.get("tr td:nth-child(5) strong").then((element) => {
            total=element.text().split(" ")[1];
        })
        
        cy.get("tr td:nth-child(4) strong").each(($element, index, $list) => {
            var splittedElementArray = $element.text().split(" ");
            var result = splittedElementArray[1].trim();
            sum = Number(sum) + Number(result);
        }).then(() => expect(sum).be.equal(Number(total)));

        phonesCheckoutPage.proceedToCheckout();

        //custom timeout by overriding global configuration in cypress.config.js
        Cypress.config("pageLoadTimeout", 9000);
        // starting from this step
        cy.get("#country").type("India");
        
        cy.get("div.suggestions a").click();
        cy.get("#checkbox2").click({force:true});
        cy.get("input[type='submit']").click();

        cy.get(".alert").then((element) => {
            expect(element.text()).to.contain("Thank you! Your order will be delivered in next few weeks :-)");
        })
    })

})