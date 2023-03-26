// Test if the api is working

context("Fetch pokemons informations", () => {
    it("Get a list of the pokemons", () => {
        cy.request("GET", "https://pokeapi.co/api/v2/pokemon").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.results).length.to.be.greaterThan(1)
        })
    })
});

context("Fetch pokemons images", () => {
    it("Get the pokemon images", () => {
        cy.request("GET", "https://pokeapi.co/api/v2/pokemon").then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.results).length.to.be.greaterThan(1)
        })
    })
});