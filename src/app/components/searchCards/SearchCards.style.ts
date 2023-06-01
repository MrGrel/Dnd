import styled from '@emotion/styled';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0;
`;

export const Form = styled.form`
  position: relative;
  max-width: 500px;
`;

export const Input = styled.input`
  max-width: 180px;
  margin-right: 10px;
  padding: 5px 10px;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 5px;
  color: #000;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    outline: none;
    background: #fff;
  }

  &:focus {
    outline: none;
    background: #fff;
  }

  &:active {
    outline: none;
    background: #fff;
  }
`;

export const ButtonSubmit = styled.button`
  padding: 5px 10px;
  color: #000;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;

  &:hover {
    outline: none;
    background-color: #a7b4df;
    border-color: #a7b4df;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    background-color: #4470ff;
    border-color: #4470ff;
    color: #fff;
  }
`;

export const FastButtonsContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  display: flex;
  flex-direction: column;
  max-width: 180px;
  width: 100%;
  padding: 5px;
  background: #fff;
  border: 1px solid #aaa;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 10;
`;

export const FastButtons = styled.button`
  width: 100%;
  padding: 5px 10px;
  color: #000;
  background: #fff;
  border: none;
  cursor: pointer;

  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    outline: none;
    color: #4470ff;
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    background-color: #4470ff;
    color: #fff;
  }
`;
