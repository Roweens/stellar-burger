import { expect, test, describe } from '@jest/globals';
import { burgerReducer, burgerActions, initialState } from './burgerSlice';
import { TIngredientWithUniqueId } from './burgerSchema';

const testIngredient: TIngredientWithUniqueId = {
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
  uniqueId: '1'
};

const testIngredient2: TIngredientWithUniqueId = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  uniqueId: '2'
};

describe('burgerSlice actions test', () => {
  test('Add Burger ingredient', () => {
    const newState = burgerReducer(
      initialState,
      burgerActions.addBurgerConstructorItem(testIngredient)
    );

    const { burgerConstructor } = newState;

    expect(burgerConstructor.ingredients.length).toEqual(1);
    expect(burgerConstructor.ingredients[0]._id).toEqual(testIngredient._id);
  });

  test('Remove Burger ingredient', () => {
    const newState = burgerReducer(
      {
        ...initialState,
        burgerConstructor: {
          bun: null,
          ingredients: [testIngredient]
        }
      },
      burgerActions.removeIngridient(testIngredient.uniqueId)
    );

    const { burgerConstructor } = newState;

    expect(burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('Move ingredient test', () => {
    const newState = burgerReducer(
      {
        ...initialState,
        burgerConstructor: {
          bun: null,
          ingredients: [testIngredient, testIngredient2]
        }
      },
      burgerActions.setConstructorIngredients([testIngredient2, testIngredient])
    );

    const { burgerConstructor } = newState;

    expect(burgerConstructor).toEqual({
      bun: null,
      ingredients: [testIngredient2, testIngredient]
    });
  });
});
