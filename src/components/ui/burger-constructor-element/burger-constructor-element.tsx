import React, { FC, MutableRefObject, forwardRef } from 'react';
import styles from './burger-constructor-element.module.css';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { BurgerConstructorElementUIProps } from './type';
import { MoveButton } from '@zlden/react-developer-burger-ui-components';

export const BurgerConstructorElementUI = forwardRef<
  HTMLLIElement,
  BurgerConstructorElementUIProps
>(
  (
    {
      ingredient,
      index,
      totalItems,
      handleMoveUp,
      handleMoveDown,
      handleClose
    },
    ref
  ) => (
    <li
      className={`${styles.element} mb-4 mr-2`}
      ref={ref}
      data-testid={`BurgerConstructor${ingredient.type}${ingredient._id}`}
    >
      <MoveButton
        handleMoveDown={handleMoveDown}
        handleMoveUp={handleMoveUp}
        isUpDisabled={index === 0}
        isDownDisabled={index === totalItems - 1}
      />
      <div className={`${styles.element_fullwidth} ml-2`}>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={handleClose}
        />
      </div>
    </li>
  )
);
