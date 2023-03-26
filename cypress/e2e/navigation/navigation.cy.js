describe('Navigation to Pokemon page', () => {
    it('Should navigate to a pokemon page', () => {
      // Start from the index page
        cy.visit('http://localhost:3000/')

        // Find a pokemon and click on it to be redirected to its page
        cy.get('a[href*="/pokemon/bulbasaur"]').click()

        // The new url should include the pokemon name
        cy.url().should('include', '/pokemon/bulbasaur')
    })
})

describe('Back to Pokedex', () => {
  it('Should navigate to a pokemon page and back to the pokedex', () => {
    // Start from a pokemon page
    cy.visit('http://localhost:3000/pokemon/charmander')

    // Find the pokedex button and click on it
    cy.get('#pokedex-button').click()

    // The new url should be the pokedex page
    cy.url().should('include', '/')
  })
})

describe('Navigating through the pokemon pages in the pokedex', () => {
  it('Should successfully navigate with the Next and Previous buttons', () => {
    // Start from a pokemon page
    cy.visit('http://localhost:3000/')

    // Find the 'next' button and click on it three times navigating through the pokemons
    cy.get('#next').click().click().click()

    // Find the 'previous' button and click on it three times to go back to the initial pokemons page
    cy.get('#previous').click().click().click()
  })
})