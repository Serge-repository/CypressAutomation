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

    //not working example
    // it('Pass JSON Value/Array from one request to another', () => {
    //     cy.request({
    //         method: "GET",
    //         url: Cypress.env("weatherApi") + "/api/location/search/?query=San",
    //     }).then((response) => {
    //         const city = response.body[0].title
    //         return city
    //     }).then((city) => {
    //         // for (let i=0; i<city.length; i++)
    //         cy.request({
    //             method: "GET",
    //             url: Cypress.env("weatherApi") + "/api/location/search/?query=" + city   // + city[i].title
    //         }).then((response) => {
    //             expect(response.status).to.eq(200);
    //             expect(response.body[0]).to.have.property("title", city);
    //         })
    //     })
    // })

    it('POST + PUT + DELETE request', () => {
        // always put new address before run
        cy.request({
            method: "POST",
            url: Cypress.env("apiBaseUrl3") + "/public/v1/users",
            headers: {
                "authorization": "Bearer 2a7e7908b02b43b6859058b0e7fdcc21de4c6bc716cf66cc91915f5635488d78"
            },
            body: {
                "name": "Elzar",
                "email": "elzar097@kiehn-stamm.io",
                "gender": "male",
                "status": "active"
            }
        }).then((response) => {
            expect(response.body.data).has.property("name", "Elzar");
        }).then((response) => {
            const userId = response.body.data.id
            cy.log("user id is " + userId)
            cy.request({
                method: "PUT",
                url: Cypress.env("apiBaseUrl3") + "/public/v1/users/" + userId,
                headers: {
                "authorization": "Bearer 2a7e7908b02b43b6859058b0e7fdcc21de4c6bc716cf66cc91915f5635488d78"
            },
            body: {
                "name": "Elzar Updated",
                "email": "elzar097@kiehn-stamm.io",
                "gender": "male",
                "status": "active"
                }
            })
        }).then((response) => {
            expect(response.body.data).has.property("name", "Elzar Updated");
        }).then((response) => {
            const userId = response.body.data.id
            cy.request({
                method: "DELETE",
                url: Cypress.env("apiBaseUrl3") + "/public/v1/users/" + userId,
                headers: {
                "authorization": "Bearer 2a7e7908b02b43b6859058b0e7fdcc21de4c6bc716cf66cc91915f5635488d78"
                }
            })
        }).then((response) => {
            expect(response.status).to.eq(204);
        })
    })
})