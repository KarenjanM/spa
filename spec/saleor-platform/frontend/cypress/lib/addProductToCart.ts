export const addProductToCart = (start_total_q: string, start_q: string)=>{
    cy.get('[data-testid="total-quantity"]')
      .contains(start_total_q)
    cy.get('[data-testid="quantity"]')
      .contains(start_q);
    increaseQuantity(2, "increase-q")
    cy.get('[data-testid="quantity"]')
      .contains('3');
    decreaseQuantity(1, "decrease-q");
    cy.get('[data-testid="quantity"]')
      .contains('2');
    cy.get('[data-testid="add-button"]')
      .click()
      .should('be.disabled')
      .contains('Loading');
    cy.get('[data-testid="total-quantity"]')
      .contains('2')
  }

export const increaseQuantity = (numberOfClicks: number, testid: string)=>{
  let increase_q = cy.get(`[data-testid="${testid}"]`);
  for(let i = 0; i < numberOfClicks; i++){
    increase_q.each((element)=>{
      element.trigger("click");
    })
  }
}

export const decreaseQuantity = (numberOfClicks: number, testid: string)=>{
  let decrease_q = cy.get(`[data-testid="${testid}"]`);
  for(let i = 0; i < numberOfClicks; i++){
    decrease_q.each((element)=>{
      element.trigger("click");
    });
  }
}