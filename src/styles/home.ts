import styled from 'styled-components';

interface CardInfoProps {
  bg?: boolean;
}

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 10vh auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  .choosenumbers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

export const BoxWhatsApp = styled.div`
  position: fixed;
  width: 70px;
  height: 70px;
  z-index: 100;
  right: 50px;
  bottom: 50px;
`;

export const CardInfo = styled.div<CardInfoProps>`
  max-width: 960px;
  width: 100%;
  border-radius: 7px;
  margin: ${({ bg }) => bg === true && `70px 0px 30px 0px`};

  background: ${({ bg }) => bg === true && `linear-gradient(90deg, #332E59 30%, #723EB5 70%)`};

  img {
    width: 100%;
    height: 100%;
    margin-top: ${({ bg }) => bg === true && `-100px`};
  }

  display: flex;
  padding: 50px;
  justify-content: space-evenly;
  align-items: center;

  h1, h2 {
    color: #fff;
    font-weight: 900;
    font-size: 40px;
    line-height: 40px;
    letter-spacing: -2px;
  }

  h2 { font-size: 30px; text-align: center; }

  p { width: 80%; color: #ccc; font-size: 1em; margin-top: 10px; }

  @media (max-width: 580px) {
    width: 90%;
    height: auto;
    flex-wrap: wrap;

    p { width: 100%; }

    img {
      margin-top: 20px;
      width: 390px;
    }
  }
`;

export const Btn = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 7px;
  background: #2F2C53;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer;

  font-size: 1.2em;
  font-weight: 900;

  display: flex;
  justify-content: center;
  align-items: center;

`;
