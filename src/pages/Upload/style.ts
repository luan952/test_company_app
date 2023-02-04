import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  padding-top: 100px;
  flex-direction: column;
  align-items: center;

  .input{
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button{
    width: 80px;
  }
`;