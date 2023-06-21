import {addProductToCart, decreaseQuantity, increaseQuantity} from "../lib/addProductToCart";

describe("Cart page", ()=>{
    it("managing products in cart", ()=>{
        cy.visit('/');
        cy.get(`[data-testid="products-link"]`)
          .click();
        cy.get(`[data-testid="product"]`)
          .first()
          .click();
        addProductToCart('0', '1');
        
        cy.visit('/cart');
        increaseQuantity(1, "increase-q-cart");
        cy.get(`[data-testid="quantity"]`)
          .contains('3');
        cy.get(`[data-testid="total-quantity"]`)
          .contains('3');
        decreaseQuantity(1, "decrease-q-cart");
        cy.get(`[data-testid="quantity"]`)
          .contains('2');
        decreaseQuantity(1, "decrease-q-cart");
        cy.get(`[data-testid="quantity"]`)
          .contains('1');
        cy.get(`[data-testid="total-quantity"]`)
          .contains('1');
        cy.get('[data-testid="remove"]')
          .each(element=>element.trigger("click"));
        cy.get(`[data-testid="total-quantity"]`)
          .contains("0")
    });
    it("should proceed to checkout", ()=>{
        cy.visit('/products');
        cy.get(`[data-testid="product"]`)
           .each((element, index)=>{
              if(index==1) cy.wrap(element).click();
            })           
        addProductToCart('0', '1');
        cy.get('[data-testid="checkout-icon"]')
          .click();
        cy.get('[data-testid="submit"]')
          .click();
        cy.contains("Checkout");
    })
})