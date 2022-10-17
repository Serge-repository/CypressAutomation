import generalPageSelectors from "../selectors/GeneralPageSelectors";

class PhonesPage {
    // use return word to return element from cy.get()
    proceedToCheckout() {
        cy.contains(generalPageSelectors.checkoutButton).click();
    }

}

export default PhonesPage;