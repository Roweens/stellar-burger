import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getIngridientById,
  getIngridients
} from '../../services/ingredients/selectors';
import { StateSchema, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/ingredients/fetchIngredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingridients = useSelector(getIngridients);

  useEffect(() => {
    if (!ingridients.buns.length || !ingridients.mains.length) {
      dispatch(fetchIngredients());
    }
  }, [ingridients]);

  const ingredientData = useSelector((state: StateSchema) =>
    getIngridientById(state, id)
  );

  if (!id) {
    return <p>Такой ингредиент не найден</p>;
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
