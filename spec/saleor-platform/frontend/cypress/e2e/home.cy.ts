import {addProductToCart} from "../lib/addProductToCart";


describe('home page', () => {

  it('add an item into cart out of a general pull of products', ()=>{
    cy.visit('/');
    cy.get(`[data-testid="products-link"]`)
      .click();
    cy.get(`[data-testid="product"]`)
      .first()
      .click();
    addProductToCart('0', '1');
  })
  it('add an item into cart out of a particular category', () => {
    cy.visit('/');
    cy.get(`[data-testid="category-block"]`)
      .first()
      .click();
    cy.get(`[data-testid="product"]`)
      .first()
      .click();
    addProductToCart('0', '1');
  })

})