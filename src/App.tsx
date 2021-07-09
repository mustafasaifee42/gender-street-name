import { createGlobalStyle } from 'styled-components';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './Main';
import ReactGA from 'react-ga';

const GlobalStyle = createGlobalStyle`
  :root {
    --male-color: #00C4A9;
    --female-color: #E4615C;
    --neutral-color-on-white: #CCCCCC;
    --neutral-color-on-black: #555555;
    --white: #ffffff;
    --black: #2c2c2c;
    --jet-black: #111111;
    --dark-gray: #666666;
    --primary-color-very-light: #ffc282;
    --primary-color-light: #ff9f51;
    --primary-color: #ef5d09;
    --primary-color-dark: #ce440b;
    --primary-color-hover: #ce440b;
    --very-light-gray: #f6f6f6;
    --light-gray: #e5e5e5;
    --moderate-light-gray: #f1f1f1;
    --gray: #aaaaaa;
    --bg-color: #fafafa;
    --secondary-color: #7f8fa4;
    --tertiary-color: #bd304a;
  }

  ul{
    padding-left: 17px;
    margin: 0 0 20px 0;
  }

  body {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 16px;
    line-height: 2;
    color: var(--black);
    background-color: var(--bg-color);
    margin: 0;
  }


  a {
    text-decoration: none;
    font-style: italic;
    color: var(--primary-color);
  }

  a:hover {
    font-weight: bold;
  }


  h1 {
    margin: 0;
    font-weight: 700;
    font-size: 24px;
    font-family: IBM Plex Sans, sans-serif;
    @media (max-width: 460px) {
      font-size: 20px;
    }
  }
  .bold{
    font-weight: 700;
  }

  .thin{
    font-weight: 300;
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    font-family: IBM Plex Sans, sans-serif;
    line-height: 40px;
    margin: 0;
    @media (max-width: 600px) {
      font-size: 20px;
    }
    @media (max-width: 420px) {
      font-size: 16px;
    }
  }

  h4 {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: IBM Plex Sans, sans-serif;
    margin: 0;
    @media (max-width: 600px) {
      font-size: 12px;
    }
    @media (max-width: 420px) {
      font-size: 12px;
      text-transform: capitalize;
    }
  }

  .header-dark-mode{
    background-color: var(--jet-black) !important;
    color: var(--white) !important;
  }

  .react-share__ShareButton{
    height: 24px;
  }

  .dark-mode{
    background-color: var(--black) !important;
    color: var(--white) !important;
  }

  .footer-dark-mode{
    background-color: var(--jet-black) !important;
    color: var(--white) !important;
  }

  .footer-light-mode{
    background-color: var(--white) !important;
    color: var(--black) !important;
  }

  .map-split-key{
    @media (max-width: 958px) {
      display: none;
    }
  }

  .italics {
    font-style: italic;
  }

  .ReactModal__Overlay{
    z-index: 10000;
  }

  .modal {
    width: 90vw;
    max-height: 90vh;
    max-width: 960px;
    margin: auto;
    background-color: var(--white);
    border: 0 !important;
    padding: 0;
    box-shadow: 0 2px 5px rgba(12,13,14,0.05);
    color: var(--black);
    &:focus {
      outline: none;
    }
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(245,245,245,0.85);
    display: flex;
    align-items: center;
  }
`;

ReactGA.initialize('UA-201321336-1');
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview('/');

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Main />
      </Router>
    </>
  );
}

export default App;
