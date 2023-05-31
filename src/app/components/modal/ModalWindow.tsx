import React, { useState } from 'react';
import { ModalContainer } from './Modal.style';
import { ICard } from '../Dnd';
import { log } from 'console';

interface IModal {
  zIndex: number;
  childs: JSX.Element[] | null;
  removeModal: React.Dispatch<React.SetStateAction<ICard[][]>>;
  reducingZInex: React.Dispatch<React.SetStateAction<number>>;
}

export const ModalWindow = ({
  zIndex,
  childs,
  removeModal,
  reducingZInex,
}: IModal) => {
  const [countTimer, setCountTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {

    if (e.target === e.currentTarget) {
      reducingZInex((state) => state - 10);

      removeModal((state) => {
        if (state.length === 1) {
          return []
        }
        state.splice(state.length - 1, 1);     
        return state
      });
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {};

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {};

  return (
    <ModalContainer
      onClick={handleClick}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      style={{
        zIndex: `${zIndex}`,
      }}
      aria-modal="true"
    >
      {childs}
    </ModalContainer>
  );
};
