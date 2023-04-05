import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{margin:0; padding:0; box-sizing:border-box; outline: 0;}

  html {
    scroll-behavior: smooth;
  }

  body {
    height: 100vh;
    background: #1A1824;
    font-family: 'Roboto', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

`;
