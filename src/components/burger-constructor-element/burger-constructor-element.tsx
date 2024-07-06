import { FC, memo, useRef } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { burgerActions } from '../../services/burger/burgerSlice';
import { useDrag, useDrop } from 'react-dnd';

type Item = {
  index: number;
};

const isItem = (object: unknown): object is Item =>
  !!object &&
  typeof object === 'object' &&
  'index' in object &&
  object.hasOwnProperty('index');

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, moveRow, handleMove }) => {
    const dispatch = useDispatch();

    const ref = useRef<HTMLLIElement>(null);

    const [collectedProps, drop] = useDrop({
      accept: 'ingredient',

      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        };
      },

      hover(item, monitor) {
        if (!ref.current) {
          return;
        }

        if (isItem(item)) {
          const dragIndex = item.index;
          const hoverIndex = index;

          if (dragIndex === hoverIndex) {
            return;
          }

          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY =
            (clientOffset?.y as number) - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }

          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }

          moveRow(dragIndex, hoverIndex);

          item.index = hoverIndex;
        }
      }
    });

    const [collectedDragProps, drag, preview] = useDrag({
      type: 'ingredient',
      item: () => ({ id: ingredient._id, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });

    drag(drop(ref));

    const handleMoveDown = () => {
      handleMove(index, 'down');
    };

    const handleMoveUp = () => {
      handleMove(index, 'up');
    };

    const handleClose = () => {
      dispatch(burgerActions.removeIngridient(ingredient.uniqueId));
    };

    return (
      <BurgerConstructorElementUI
        ref={ref}
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
