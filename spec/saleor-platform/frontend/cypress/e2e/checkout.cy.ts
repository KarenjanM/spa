import { addProductToCart } from "../lib/addProductToCart";
import { fillCheckoutForm } from "../lib/fillCheckoutFormOut";

describe("Checkout page", ()=>{
    it("checkout flow", ()=>{
        cy.visit("/products")
        cy.get('[data-testid="product"]')
          .first()
          .click();
        addProductToCart('0', '1');
        cy.visit("/checkout/information");
        fillCheckoutForm({
          firstName: "Karen",
          lastName: "Meliksetian",
          email: "karenjantv@gmail.com",
          address: "Schleinitzstraße 11",
          country: "Germany",
          postalCode: "38106",
          city: "Braunschweig"
        })
        cy.get('[data-testid="checkout-form"]').submit();
    })
})