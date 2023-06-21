type CheckoutFormData = {
    email?: string,
    firstName?: string,
    lastName?: string,
    address?: string, 
    postalCode?: string,
    city?: string,
    country?: "Germany",
}
export const fillCheckoutForm = (formData: CheckoutFormData)=>{
    cy.get('[data-testid="input-email"]')
      .type(formData.email);
    cy.get('[id="country-select"]')
      .type(`${formData.country}{enter}`)
    cy.get('[data-testid="input-firstName"]')
      .type(formData.firstName);
    cy.get('[data-testid="input-lastName"]')
      .type(formData.lastName);
    cy.get('[data-testid="input-address"]')
      .type(formData.address);
    cy.get('[data-testid="input-postalCode"]')
      .type(formData.postalCode);
    cy.get('[data-testid="input-city"]')
      .type(formData.city);
}