'use client';
import React, { DragEvent, useCallback, useMemo, useState } from 'react';
import { ModalWindow } from '../components/modal/ModalWindow';
import {
  Button,
  Card,
  CardContainer,
  Container,
  FirstCard,
  Folder,
  Icon,
  IconContainer,
  TextContainer,
} from './Card.style';
import { log } from 'console';

export interface ICard {
  id: number;
  title: string;
  floar: number;
  parent_id: number | null;
  childrens: ICard[];
}

export const Dnd = () => {
  const [treeOfCards, setTreeOfCards] = useState<ICard>({
    id: 0,
    title: '',
    floar: 0,
    parent_id: null,
    childrens: [
      {
        id: 1,
        title: 'Главная',
        floar: 1,
        parent_id: 0,
        childrens: [
          { id: 2, title: 'О нас', floar: 2, parent_id: 1, childrens: [] },
          {
            id: 3,
            title: 'Че то там',
            floar: 2,
            parent_id: 1,
            childrens: [
              {
                id: 4,
                title: 'Телефоны',
                floar: 3,
                parent_id: 3,
                childrens: [],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: 'Самая главная',

        floar: 1,
        parent_id: 0,
        childrens: [
          { id: 6, title: 'О нас', floar: 2, parent_id: 5, childrens: [] },
          {
            id: 7,
            title: 'Контакты',
            floar: 2,
            parent_id: 5,
            childrens: [
              { id: 8, title: '1', floar: 3, parent_id: 7, childrens: [] },
              { id: 9, title: '2', floar: 3, parent_id: 7, childrens: [] },
              { id: 10, title: '3', floar: 3, parent_id: 7, childrens: [] },
              { id: 11, title: '4', floar: 3, parent_id: 7, childrens: [] },
            ],
          },
        ],
      },
      { id: 12, title: '1', floar: 1, parent_id: 0, childrens: [] },
      { id: 13, title: '2', floar: 1, parent_id: 0, childrens: [] },
    ],
  });
  const [currentFolder, setCurrentFolder] = useState<ICard | null>(null);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);
  const [isDiveFolder, setIsDiveFolder] = useState<boolean>(false);
  const [diveFolder, setDiveFolder] = useState<ICard | null>(null);
  const [countTimer, setCountTimer] = useState<NodeJS.Timeout | null>(null);
  const [modalTrees, setModalTrees] = useState<ICard[][]>([]);
  const [isClose, setIsClose] = useState<boolean>(false);

  const timeToDiveFolder = useCallback(
    (card: ICard, targetStyle: CSSStyleDeclaration) => {
      return setTimeout(() => {
        setIsDiveFolder(true);
        if (currentCard && card.floar >= currentCard.floar) {
          targetStyle.backgroundColor = 'rgba(210, 220, 255, .2)';
        }
      }, 1500);
    },
    [diveFolder]
  );

  const dragOverHandler = (e: DragEvent<HTMLDivElement>, card: ICard): void => {
    e.preventDefault();
    e.stopPropagation();

    if (card !== diveFolder && currentCard !== card) {
      const targetStyle = e.currentTarget.style;
      targetStyle.borderColor = '#b4c4f8';
      targetStyle.boxShadow = '2px 2px 2px #b4c4f8';
      targetStyle.backgroundColor = '';

      setDiveFolder(card);
      setCountTimer(timeToDiveFolder(card, targetStyle));
    }
  };

  const dragLeaveHandler = (
    e: DragEvent<HTMLDivElement>,
    card: ICard
  ): void => {
    const targetStyle = e.currentTarget.style;
    targetStyle.borderColor = '';
    targetStyle.boxShadow = '';
    targetStyle.backgroundColor = '';

    if (countTimer) {
      clearTimeout(countTimer);
      setCountTimer(null);
      setIsDiveFolder(false);
      setDiveFolder(null);
    }
  };

  const dragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    card: ICard
  ): void => {
    const targetStyle = e.currentTarget.style;
    targetStyle.borderColor = '#88ff92';
    targetStyle.boxShadow = '2px 2px 2px #88ff92';
    e.stopPropagation();
    setCurrentFolder(searchFolder(treeOfCards, card));
    setCurrentCard(card);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>, card: ICard): void => {
    e.stopPropagation();
    const targetStyle = e.currentTarget.style;
    targetStyle.borderColor = '';
    targetStyle.boxShadow = '';
    targetStyle.backgroundColor = '';
    if (countTimer) {
      clearTimeout(countTimer);
      setCountTimer(null);
      setIsDiveFolder(false);
    }
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, card: ICard): void => {
    e.preventDefault();
    e.stopPropagation();
    const targetStyle = e.currentTarget.style;
    targetStyle.borderColor = '';
    targetStyle.boxShadow = '';
    targetStyle.backgroundColor = '';

    if (countTimer) {
      clearTimeout(countTimer);
      setCountTimer(null);
      setIsDiveFolder(false);
    }

    if (currentCard === card) {
      return;
    }

    let folderForDrop: ICard;
    let currentIndex = 0;
    let dropIndex = 0;

    if (isDiveFolder && diveFolder !== null) {
      folderForDrop = diveFolder;
    } else {
      folderForDrop = searchFolder(treeOfCards, card);
    }

    currentFolder?.childrens.forEach((item, index) => {
      if (currentCard && item.id === currentCard.id) {
        currentIndex = index;
      }
    });

    if (currentCard?.parent_id === card.parent_id && !isDiveFolder) {
      if (currentFolder !== null && folderForDrop !== null) {
        dropIndex = folderForDrop.childrens.indexOf(card);
        folderForDrop.childrens = swapCard(
          folderForDrop.childrens,
          dropIndex,
          currentIndex
        );
        currentCard.parent_id = folderForDrop.id;
        currentCard.floar = folderForDrop.floar + 1;
      }
    } else {
      if (currentFolder !== null && folderForDrop !== null && currentCard) {
        currentFolder?.childrens.splice(currentIndex, 1);

        dropIndex = folderForDrop.childrens.indexOf(card);
        folderForDrop.childrens.splice(dropIndex, 0, currentCard);
        currentCard.parent_id = folderForDrop.id;
        currentCard.floar = folderForDrop.floar + 1;
      }
    }

    if (modalTrees.length !== 0) {
      const lastModalCard = modalTrees[modalTrees.length - 1][0];
      console.log(modalTrees);

      if (
        lastModalCard.id === folderForDrop.id ||
        lastModalCard.id === folderForDrop.parent_id
      ) {
        setModalTrees((state) => [...state]);
      } else {
        setModalTrees((state) => [...state, [folderForDrop]]);
      }
    }

    setTreeOfCards((state) => swapNewTree(folderForDrop, treeOfCards));
    setCurrentFolder(null);
    setCurrentCard(null);
    setDiveFolder(null);
  };

  const handleClick = (card: ICard) => {
    setModalTrees((state) => [...state, [card]]);
  };

  const swapCard = (
    childrens: ICard[],
    firstCount: number,
    secondCount: number
  ): ICard[] => {
    var temp = childrens[secondCount];
    childrens[secondCount] = childrens[firstCount];
    childrens[firstCount] = temp;
    return childrens;
  };

  const swapNewTree = (folderForDrop: ICard, tree: ICard): ICard => {
    const newTree: ICard = Object.create(tree);
    newTree.childrens.forEach((item) => {
      if (item.id === folderForDrop?.id) {
        return folderForDrop;
      }
      if (item.id === currentFolder?.id) {
        return currentCard;
      }
      if (item.childrens.length > 0) {
        swapNewTree(folderForDrop, item);
      }
    });

    return newTree;
  };

  const searchFolder = (tree: ICard, child: ICard): ICard => {
    let folder = treeOfCards;

    const search = (card: ICard) => {
      if (currentCard && currentCard.floar - child.floar > 0) {
        folder = child;
        return;
      }
      if (card.childrens.length > 0) {
        card.childrens.forEach((card: ICard) => {
          if (child.parent_id === card.id) {
            folder = card;
          }
          if (card.childrens?.length) {
            search(card);
          }
        });
      }
    };
    search(tree);

    return folder;
  };

  const buildCardsTree = (arr: ICard[], index = 0) => {
    if (index === 2) {
      return arr.map((card: ICard) => (
        <Icon
          key={card.id}
          onDragOver={(e: DragEvent<HTMLDivElement>) =>
            dragOverHandler(e, card)
          }
          onDragLeave={(e: DragEvent<HTMLDivElement>) =>
            dragLeaveHandler(e, card)
          }
          onDragStart={(e: DragEvent<HTMLDivElement>) =>
            dragStartHandler(e, card)
          }
          onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e, card)}
          onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, card)}
          draggable={true}
        >
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleClick(card)
            }
          >
            {card.title}
          </Button>
        </Icon>
      ));
    }
    if (index === 1) {
      return arr.map((card: ICard) => (
        <Card
          key={card.id}
          onDragOver={(e: DragEvent<HTMLDivElement>) =>
            dragOverHandler(e, card)
          }
          onDragLeave={(e: DragEvent<HTMLDivElement>) =>
            dragLeaveHandler(e, card)
          }
          onDragStart={(e: DragEvent<HTMLDivElement>) =>
            dragStartHandler(e, card)
          }
          onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e, card)}
          onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, card)}
          draggable={true}
        >
          <TextContainer>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClick(card)
              }
            >
              {card.title}
            </Button>
          </TextContainer>
          <IconContainer>
            {card.childrens.length > 0 &&
              buildCardsTree(card.childrens, index + 1)}
          </IconContainer>
        </Card>
      ));
    }

    return arr.map((card: ICard) => (
      <Folder
        key={card.id}
        onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e, card)}
        onDragLeave={(e: DragEvent<HTMLDivElement>) =>
          dragLeaveHandler(e, card)
        }
        onDragStart={(e: DragEvent<HTMLDivElement>) =>
          dragStartHandler(e, card)
        }
        onDragEnd={(e: DragEvent<HTMLDivElement>) => dragEndHandler(e, card)}
        onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, card)}
        draggable={true}
      >
        <TextContainer>
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleClick(card)
            }
          >
            {card.title}
          </Button>
        </TextContainer>

        <CardContainer>
          {card.childrens.length > 0 &&
            buildCardsTree(card.childrens, index + 1)}
        </CardContainer>
      </Folder>
    ));
  };

  const htmlTreeOfCards = useMemo(() => {
    return (
      <FirstCard
        onDragOver={(e: DragEvent<HTMLDivElement>) =>
          dragOverHandler(e, treeOfCards)
        }
        onDragLeave={(e: DragEvent<HTMLDivElement>) =>
          dragLeaveHandler(e, treeOfCards)
        }
        onDrop={(e: DragEvent<HTMLDivElement>) => dropHandler(e, treeOfCards)}
      >
        {buildCardsTree(treeOfCards.childrens)}
      </FirstCard>
    );
  }, [currentCard, treeOfCards, isDiveFolder, diveFolder]);

  const htmlTreeOfModal = useMemo(() => {
    console.log('я ща обнов');

    if (modalTrees.length === 0) return null;
    return (
      <ModalWindow
        childs={buildCardsTree(modalTrees[modalTrees.length - 1])}
        modals={modalTrees}
        removeModal={setModalTrees}
        modalClose={isClose}
        setIsClose={setIsClose}
      ></ModalWindow>
    );
  }, [modalTrees]);

  return (
    <Container>
      {htmlTreeOfCards}
      {modalTrees.length !== 0 && (
        <ModalWindow
          childs={buildCardsTree(modalTrees[modalTrees.length - 1])}
          modals={modalTrees}
          removeModal={setModalTrees}
          modalClose={isClose}
          setIsClose={setIsClose}
        ></ModalWindow>
      )}
    </Container>
  );
};
