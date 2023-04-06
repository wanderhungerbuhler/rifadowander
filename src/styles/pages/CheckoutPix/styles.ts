import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-radius: 7px;
`;

export const InfoPayment = styled.div`
  width: 50%;
  /* background: #49b004; */
  margin-bottom: 100px;

  img { margin-bottom: 15px;}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    color: #fff;
    font-size: 1.5em;
    text-transform: uppercase;
  }

  p {
    color: #fff;
  }

  a { color: #fff; margin-top: 20px;}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 30px 0px 30px 0px;

  button {
    width: 50%;
    height: 56px;
    border: 0;
    border-radius: 7px;
    padding: 10px 20px;
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 100px;
    color: #fff;
    background: #723EB5;
    transitions: all .3s ease-in-out;

    :hover {
      background: #49b004;
      transitions: all .3s ease-in-out;
    }
  }

  h2 {
    width: 50%;
    color: #fff;
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  p {
    width: 50%;
    font-size: .9em;
    color: #ccc;
    margin-bottom: 20px;
  }

  input {
    height: 56px;
    width: 50%;
    padding: 0px 15px;

    font-size: 1.2em;

    background: #2F2C53;
    color: #ccc;
    ::placeholder: #ccc;
    :-input-placeholder: #ccc;
    :-mz-input-placeholder: #ccc;
    :-ms-input-placeholder: #ccc;

    border: 2px solid transparent;
    border-radius: 7px;

    :focus {
      border: 2px solid #723EB5;
    }

    & { margin-bottom: 10px; }
  }

  @media (max-width: 580px) {
    h2 { width: 80%; text-align: center; }
    p { width: 75%; text-align: center;}

    input { width: 90%; }
    button { width: 90%; margin-bottom: 200px; }
  }
`;

export const InputError = styled.div`
  width: 50%;
  color: red;
  margin-top: -10px;
  padding: 10px 15px;
`;

export const BoxVerifyPayment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  iframe {
    position: fixed;
    width: 70%;
    min-height: 500px;
    top: 15vh;
  }

  button {
    width: 50%;
    height: 56px;
    border: 0;
    border-radius: 7px;
    padding: 10px 20px;
    font-size: 1.2em;
    font-weight: bold;
    color: #fff;
    background: #723EB5;
    transitions: all .3s ease-in-out;
    margin-top: 50px;
    margin-bottom: 100px;

    :hover {
      background: #49b004;
      transitions: all .3s ease-in-out;
    }
  }
`;
