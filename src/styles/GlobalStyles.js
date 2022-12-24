import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizeing: border-box;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;