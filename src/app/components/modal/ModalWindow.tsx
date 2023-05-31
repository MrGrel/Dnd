import React, { useState } from 'react';
import { ModalContainer } from './Modal.style';
import { ICard } from '../Dnd';
import { log } from 'console';

interface IModal {
  childs: JSX.Element[] | null;
  modals: ICard[][];
  removeModal: React.Dispatch<React.SetStateAction<ICard[][]>>;
  modalClose: boolean;
  setIsClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalWindow = ({
  childs,
  modals,
  removeModal,
  setIsClose,
}: IModal) => {
  const [countTimer, setCountTimer] = useState<NodeJS.Timeout | null>(null);
  const [isStartTimer, setIsStartTimer] = useState<boolean>(false);

  const startTimer = () => {
    return setTimeout(() => {
      console.log('end timer');

      if (modals.length === 1) {
        removeModal((state) => []);
      } else {
        removeModal((state) => {
          state.splice(state.length - 1, 1);
          return state;
        });
      }
      setIsClose((state) => !state);
    }, 2000);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (e.target === e.currentTarget) {
      if (modals.length === 1) {
        removeModal((state) => []);
      } else {
        removeModal((state) => {
          state.splice(state.length - 1, 1);
          return state;
        });
      }
      setIsClose((state) => !state);
    }
  };
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && !isStartTimer) {
      console.log('start timer');
      setIsStartTimer(true);
      setCountTimer(startTimer());
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    if (countTimer !== null) {
      console.log('стоп таймер');
      setIsStartTimer(false);
      clearTimeout(countTimer);
      setCountTimer(null);
    }
  };

  return (
    <ModalContainer
      onClick={handleClick}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
    >
      {childs}
    </ModalContainer>
  );
};
