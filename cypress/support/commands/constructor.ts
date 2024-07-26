export const getBurgerIngredientsList = () =>
  cy.getByTestId('BurgerIngredientsList');

declare global {
  namespace Cypress {
    interface Chainable {
      getBurgerIngredientsList(): Chainable<JQuery<HTMLElement>>;
    }
  }
}
