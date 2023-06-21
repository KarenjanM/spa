describe('home page', () => {

  const addProductToCart = ()=>{
    cy.get('[data-testid="total-quantity"]')
      .contains('0')
    cy.get('[data-testid="quantity"]')
      .contains('1');
    cy.get('[data-testid="increase-q"]')
      .click()
      .click();
    cy.get('[data-testid="quantity"]')
      .contains('3');
    cy.get('[data-testid="decrease-q"]')
      .click();
    cy.get('[data-testid="quantity"]')
      .contains('2');
    cy.get('[data-testid="add-button"]')
      .click()
      .should('be.disabled')
      .contains('Loading');
    cy.get('[data-testid="total-quantity"]')
      .contains('2')
  }

  it('add an item into cart out of a general pull of products', ()=>{
    cy.visit('/');
    cy.get(`[data-testid="products-link"]`)
      .click();
    cy.get(`[data-testid="product"]`)
      .first()
      .click();
    addProductToCart();
  })
  it('add an item into cart out of a particular category', () => {
    cy.visit('/');
    cy.get(`[data-testid="category-block"]`)
      .first()
      .click();
    cy.get(`[data-testid="product"]`)
      .first()
      .click();
    addProductToCart();
  })

})