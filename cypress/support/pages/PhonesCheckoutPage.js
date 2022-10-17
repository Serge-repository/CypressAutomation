import generalPageSelectors from "../selectors/GeneralPageSelectors";

class PhonesCheckoutPage {
    // use return word to return element from cy.get()
    proceedToCheckout() {
        cy.contains(generalPageSelectors.checkoutButton).click();
    }

}

export default PhonesCheckoutPage;