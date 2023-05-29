import React, { useState } from 'react';
import { ModalContainer } from './Modal.style';
import { ICard } from '../Dnd';

interface IModal {
  zIndex: number;
  childs: JSX.Element[] | null;
  removeModal: React.Dispatch<React.SetStateAction<ICard[][]>>;
  arrayModalIndexes: number[];
  reduceLastModalIndex: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ModalWindow = ({
  zIndex,
  childs,
  removeModal,
  arrayModalIndexes,
  reduceLastModalIndex,
}: IModal) => {
  const [countTimer, setCountTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTimerStart, setIsTimerStart] = useState<boolean>(false);

  const lastIndex = arrayModalIndexes[arrayModalIndexes.length - 1];

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.stopPropagation();

    if (lastIndex === zIndex) {
      removeModal((state) => state.splice(state.length - 1, 1));
      reduceLastModalIndex((state) => state.splice(state.length - 1, 1));
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
