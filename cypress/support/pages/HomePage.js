import homePageSelectors from "../selectors/HomePageSelectors";

class HomePage {
    // use return word to return element from cy.get()
    typeNameIntoTextbox(name) {
        cy.get(homePageSelectors.nameTextboxElement).type(name);
    }

    selectGender(gender) {
        cy.get(homePageSelectors.genderDropdown).select(gender);
    }

    verifyIfUserNameSetCorrectly(name) {
        cy.get(homePageSelectors.secondNameTextbox).should("have.value", name);
    }

    validateNameTextboxMinLength(minLength) {
        cy.get(homePageSelectors.nameTextboxElement).should("have.attr", "minlength", minLength);
    }

    openShopLink() {
        cy.get(homePageSelectors.shopLink).click();
    }
}

// allows us to use this class everywhere
export default HomePage;