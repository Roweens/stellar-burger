import { expect, test, describe } from '@jest/globals';
import { ingredientsReducer, ingredientsActions } from './ingredientsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { fetchIngredients } from './fetchIngredients';
import { TIngredient } from '@utils-types';

describe('ingredients Services actions test', () => {
  test('fetch ingredients result test', async () => {
    const expectedResult: TIngredient[] = [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: expectedResult })
    }) as jest.Mock;

    const store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });

    const thunk = fetchIngredients();
    await thunk(store.dispatch, () => ({}), undefined);

    const { ingredients, isLoading, error } = store.getState().ingredients;

    expect(ingredients).toEqual(expectedResult);
    expect(isLoading).toEqual(false);
    expect(error).toBeUndefined();
  });
  test('fetch ingredients isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });

    store.dispatch(fetchIngredients());
    const { isLoading, error } = store.getState().ingredients;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('fetch ingredients error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false, data: [] })
    }) as jest.Mock;

    const store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });

    const thunk = fetchIngredients();
    await thunk(store.dispatch, () => ({}), undefined);

    const { isLoading, error } = store.getState().ingredients;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('fetchIngredients error');
  });
});
