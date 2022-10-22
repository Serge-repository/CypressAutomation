/// <reference types="cypress" />

describe('Api test suite', () => {
// tests on this domain may be flaky

    it('Get all employee data', {tags:['api', 'regression']}, () => {
        cy.request("GET", Cypress.env("apiBaseUrl") + "/api/v1/employees").then(function(response) {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(2500);
        })
    })

    it('Check response body', {tags:'smoke'}, () => {
        cy.request({
            method: "GET",
            url: Cypress.env("apiBaseUrl") + "/api/v1/employees"
            // headers: {
                // "authorization": ""   - for auth token
            // }
        }).then((response) => {
            expect(response.body).to.have.property("status", "success");
            expect(response.body).to.have.property("data");
        })
    })

    it('Check response body continue + headers', () => {
        cy.request({
            method: "GET",
            url: Cypress.env("apiBaseUrl2") + "/api/users"
        }).then((response) => {
            expect(response.body.data[0].id).to.eq(1);
            expect(response.headers).to.have.property("server", "cloudflare");
        })
    })

    it('POST request', () => {
        cy.request({
            method: "POST",
            url: Cypress.env("apiBaseUrl2") + "/api/users",
            body: {
                "name": "morpheus",
                "job": "leader"
            }
        }).then((response) => {
            // see response in chrome console
            cy.log(JSON.stringify(response));
            expect(response.body).has.property("name", "morpheus");
        })
    })
})