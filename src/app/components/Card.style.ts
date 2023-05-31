import styled from '@emotion/styled';

export const Container = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 1360px;
  min-height: 100vh;
  background: #fff;
`;

export const FirstCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: 100vh;
`;

export const Folder = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 2 - 10px);
  height: calc(100% / 2 - 10px);
  padding: 10px;
  border: 1px solid #e5e5e5;
  box-shadow: 2px 2px 2px#aaaaaa;
  border-radius: 5%;
  background: #fff;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;

  &:hover {
    overflow-y: scroll;
  }
`;
export const Card = styled.div`
  padding: 5px;
  width: calc(100% / 3 - 10px);
  height: calc(100% / 2 - 10px);
  border: 1px solid #e5e5e5;
  box-shadow: 2px 2px 2px#aaaaaa;
  border-radius: 5%;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  transition: background-color 0.3s ease-in-out, border-color 1s ease-in-out,
    box-shadow 1s ease-in-out;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  gap: 5px;
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;

  &:hover {
    overflow-y: scroll;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: calc(100% / 2 - 5px);
  height: calc(100% / 2 - 5px);
  border: 1px solid #e5e5e5;
  box-shadow: 2px 2px 2px#aaaaaa;
  border-radius: 5%;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  transition: background-color 0.3s ease-in-out, border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
`;

export const TextContainer = styled.div`
  display: flex;
  align-content: center;
  margin-bottom: 5px;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  background-color: inherit;
  border: none;
  cursor: pointer;
`;
