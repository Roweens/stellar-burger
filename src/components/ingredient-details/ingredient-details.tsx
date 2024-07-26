import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngridientById } from '../../services/ingredients/selectors';
import { StateSchema } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

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
