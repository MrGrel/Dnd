import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICard } from '../Dnd';
import { FieldValue } from '../../../../../inmind/inmind-course-editor/src/infra/firebase/firestore';
import { log } from 'console';
import {
  FormContainer,
  Form,
  Input,
  ButtonSubmit,
  FastButtonsContainer,
  FastButtons,
} from './SearchCards.style';

interface ISercheCard {
  cardTree: ICard;
  setModalTrees: React.Dispatch<React.SetStateAction<ICard[]>>;
}

interface IInputs {
  serchCard: string;
}

export const SeacrhCards = ({ cardTree, setModalTrees }: ISercheCard) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IInputs>({
    defaultValues: {
      serchCard: '',
    },
  });

  const [cards, setCards] = useState<ICard[]>([]);
  const [fastButtons, setFastButtons] = useState<ICard[]>([]);

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    const firstModalCard: ICard = {
      id: 9999999,
      title: `Результат поиска по: "${data.serchCard}"`,
      floar: 9999999,
      parent_id: null,
      childrens: [],
    };

    if (data.serchCard !== '') {
      const serchMatches = cards?.filter((card) =>
        card.title.includes(data.serchCard)
      );
      if (serchMatches.length > 0) {
        firstModalCard.childrens = serchMatches;
      }
      setModalTrees((state) => [...state, firstModalCard]);
    }
  };

  useEffect(() => {
    let arrayCards: ICard[] = [];
    const search = (card: ICard) => {
      arrayCards.push(card);
      if (card.childrens.length > 0) {
        card.childrens.forEach((child) => search(child));
      }
    };
    search(cardTree);
    setCards(arrayCards);
  }, []);

  const handleOnclick = (title: string): void => {
    setValue('serchCard', title);
    handleSubmit(onSubmit);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          {...register('serchCard', {
            required: true,
            onChange(e) {
              setFastButtons([]);
              const value = e.currentTarget.value;
              if (value) {
                const serchMatches = cards?.filter((card) =>
                  card.title.includes(value)
                );

                if (serchMatches?.length) {
                  setFastButtons(serchMatches);
                }
              }
            },
          })}
        />
        <ButtonSubmit type="submit">Поиск</ButtonSubmit>
        {fastButtons.length > 0 && (
          <FastButtonsContainer>
            {fastButtons.map((button, index) => (
              <FastButtons
                key={index}
                onClick={(e) => handleOnclick(button.title)}
              >
                {button.title}
              </FastButtons>
            ))}
          </FastButtonsContainer>
        )}
      </Form>
    </FormContainer>
  );
};
