import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICard } from '../Dnd';
import { FieldValue } from '../../../../../inmind/inmind-course-editor/src/infra/firebase/firestore';
import { log } from 'console';

interface ISercheCard {
  cardTree: ICard;
  setModalTrees: React.Dispatch<React.SetStateAction<ICard[]>>;
}

interface IInputs {
  serchCard: string;
}

export const SeacrhCards = ({ cardTree }: ISercheCard) => {
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
    console.log(data);

    if (data.serchCard !== '') {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
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
      <button type="submit">Поиск</button>
      {fastButtons.length > 0 &&
        fastButtons.map((button, index) => (
          <button key={index} onClick={(e) => handleOnclick(button.title)}>
            {button.title}
          </button>
        ))}
    </form>
  );
};
