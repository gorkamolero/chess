import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import TextureLight from 'assets/TextureLight.jpg';

export default createGlobalStyle`
  ${normalize}

  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }
    
  body {
    display: flex;
    background-size: cover;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url(${TextureLight});
      background-size: cover;
      opacity: .1;
    }
  }
`;
