describe('Pizza Order Form', () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/order");
  });
  it("should type into username input", () => {
    cy.get('[data-cy="username-input"]').should('be.visible').type("abcdef");
    cy.get('[data-cy="username-input"]').should("have.value", "abcdef");
  });
  it("should allow selecting multiple ingredients", () => {
    cy.get('[data-cy="ingredient-pepperoni"]').check().should("be.checked");
    cy.get('[data-cy="ingredient-salam"]').check().should("be.checked");
    cy.get('[data-cy="ingredient-jalepeno"]').check().should("be.checked");
    cy.get('[data-cy="ingredient-kabak"]').check().should("be.checked");
  });
  it("should submit the form and navigate to success page", () => {
    cy.get('[data-cy="username-input"]').type("abcdef");

    cy.get('[data-cy="size-orta"]').click().should("be.checked");

    cy.get('[data-cy="dough-select"]').select("ince");

    cy.get('[data-cy="ingredient-pepperoni"]').check().should("be.checked");
    cy.get('[data-cy="ingredient-salam"]').check().should("be.checked");
    cy.get('[data-cy="ingredient-jalepeno"]').check().should("be.checked");
    cy.get('[data-cy="ingredient-kabak"]').check().should("be.checked");
    
    cy.get('[data-cy="submit-button"]').should("not.be.disabled").click();

    cy.url().should("include", "/success");
  });
});