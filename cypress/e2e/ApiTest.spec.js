describe('Api test suite', () => {
// tests on this domain may be flaky

    it('Get all employee data', () => {
        cy.request("GET", Cypress.env("apiBaseUrl") + "/api/v1/employees").then(function(response) {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2500);
        })
    })

    it('Check res', () => {
        cy.request({
            method: "GET",
            url: Cypress.env("apiBaseUrl") + "/api/v1/employees"
        }).then((response) => {
            expect(response.body).to.have.property("status", "success");
        })
    })
})