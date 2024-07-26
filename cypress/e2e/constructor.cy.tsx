let currentArticleId: number;

const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};
const testMain = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

describe('User navigates to article page', () => {
  beforeEach(() => {
    document.cookie = `accessToken=mockAccessToken`;
    localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.visit('/');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: '../fixtures/user.json'
    });

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: '../fixtures/ingredients.json'
    });
  });

  it('BurgerIngredientsList renders', () => {
    cy.getBurgerIngredientsList().should('exist');
  });

  it('Ingredient add test', () => {
    cy.getBurgerIngredientsList().should('exist');

    const bun = cy.getByTestId(`BurgerIngredientbun${testBun._id}`);
    bun.should('exist');
    bun.within(() => {
      cy.get('button').click();
    });

    const ingredient = cy.getByTestId(`BurgerIngredientmain${testMain._id}`);
    ingredient.should('exist');
    ingredient.within(() => {
      cy.get('button').click();
    });

    const bunTopConstructor = cy.getByTestId('BurgerConstructorTopElement');
    const bunBottomConstructor = cy.getByTestId(
      'BurgerConstructorBottomElement'
    );
    const mainConstructor = cy.getByTestId(
      `BurgerConstructormain${testMain._id}`
    );

    bunTopConstructor.within(() => {
      cy.contains('span', testBun.name);
      cy.get('img').should('have.attr', 'src').should('include', testBun.image);
    });

    bunBottomConstructor.within(() => {
      cy.contains('span', testBun.name);
      cy.get('img').should('have.attr', 'src').should('include', testBun.image);
    });

    mainConstructor.within(() => {
      cy.contains('span', testMain.name);
      cy.get('img')
        .should('have.attr', 'src')
        .should('include', testMain.image);
    });
  });

  it('Ingredient modal open test', () => {
    cy.getBurgerIngredientsList().should('exist');

    const ingredient = cy.getByTestId(`BurgerIngredientmain${testMain._id}`);
    ingredient.should('exist');
    ingredient.click();

    cy.getByTestId('IngredientDetails').should('be.visible');
  });

  it('Ingredient modal close on icon click test', () => {
    cy.getBurgerIngredientsList().should('exist');

    const ingredient = cy.getByTestId(`BurgerIngredientmain${testMain._id}`);
    ingredient.should('exist');
    ingredient.click();

    cy.getByTestId('IngredientDetails').should('be.visible');

    const closeIcon = cy.getByTestId('ModalCloseIcon');
    closeIcon.should('exist');
    closeIcon.click();

    cy.getByTestId('IngredientDetails').should('not.exist');
  });

  it('Ingredient modal close on overlay click test', () => {
    cy.getBurgerIngredientsList().should('exist');

    const ingredient = cy.getByTestId(`BurgerIngredientmain${testMain._id}`);
    ingredient.should('exist');
    ingredient.click();

    cy.getByTestId('IngredientDetails').should('be.visible');

    const overlay = cy.getByTestId('ModalOverlay');
    overlay.should('exist');
    overlay.click({ force: true });

    cy.getByTestId('IngredientDetails').should('not.exist');
  });

  it('Create order test', () => {
    let orderNumber: number;
    cy.getBurgerIngredientsList().should('exist');
    cy.intercept(
      {
        method: 'POST',
        url: 'https://norma.nomoreparties.space/api/orders'
      },
      {
        fixture: '../fixtures/sucessfulOrder.json'
      }
    ).as('createOrder');
    const bun = cy.getByTestId(`BurgerIngredientbun${testBun._id}`);
    bun.should('exist');
    bun.within(() => {
      cy.get('button').click();
    });

    const ingredient = cy.getByTestId(`BurgerIngredientmain${testMain._id}`);
    ingredient.should('exist');
    ingredient.within(() => {
      cy.get('button').click();
    });

    const createOrderBlock = cy.getByTestId('CreateOrderBlock');
    createOrderBlock.within(() => {
      cy.get('button').click();
    });

    cy.wait('@createOrder')
      .should(({ request, response }) => {
        expect(response?.statusCode).to.equal(200);

        expect(testBun._id).to.be.oneOf(request.body.ingredients);
        expect(testMain._id).to.be.oneOf(request.body.ingredients);

        expect(response?.body.name).to.equal(
          'Флюоресцентный люминесцентный бургер'
        );
        expect(response?.body.success).to.equal(true);

        orderNumber = response?.body.order.number;
      })
      .then(() => {
        const orderDetailsNumber = cy.getByTestId('OrderDetailsNumber');
        orderDetailsNumber.should('exist');
        orderDetailsNumber.should('have.text', orderNumber);

        const closeIcon = cy.getByTestId('ModalCloseIcon');
        closeIcon.should('exist');
        closeIcon.click();

        cy.getByTestId('OrderDetailsNumber').should('not.exist');

        cy.getByTestId('BurgerConstructorTopElementStub').should('be.visible');
        cy.getByTestId('BurgerConstructorMainElementStub').should('be.visible');
        cy.getByTestId('BurgerConstructorBottomElementStub').should(
          'be.visible'
        );
      });
  });
});
