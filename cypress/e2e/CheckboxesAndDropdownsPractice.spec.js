/// <reference types="cypress" />

describe("Specific web elements training", () => {

    it("Checkboxes / radio buttons test", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        // assert on checkboxes
        cy.get("#checkBoxOption1").check().should("be.checked").and("have.value", "option1");
        cy.get("#checkBoxOption1").uncheck().should("not.be.checked").and("have.value", "option1");

        // select multiple checkboxes
        cy.get("#checkbox-example input").each(($element, index, $list) => {
            cy.wrap($element).click();
        })

        // OR unselect multiple checkboxes by their unique values
        cy.get("#checkbox-example input").uncheck(["option2", "option3"]);
    })

    it("Dropdowns test", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        
        // option2 is value attribute here
        cy.get("select").select("Option2").should("have.value", "option2");

        // dynamic dropdown
        cy.get("input#autocomplete").type("ind");
        cy.get(".ui-menu-item").each(($element, index, $list) => {
            if($element.text() === "India") {
                cy.wrap($element).click();
            }
        })
        cy.get("input#autocomplete").should("have.value", "India");
    })

    it("Hover on element", () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

        // hovers on exact element
        cy.get("div.mouse-hover-content").invoke("show");

        cy.contains("Top").click();
        // should() to be applied on DIRECT PARENT element
        cy.url().should("include", "#top")

        ///// CLICKING ON HIDDEN ELEMENT //////
        cy.contains("Reload").click({force:true});
    
    })

})
