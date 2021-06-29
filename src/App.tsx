import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ToggleButton from './Components/Toggle';
import { DarkModeIcon } from './Components/Icons';
import { HEADERHEIGHT } from './Constants';
import CityMap from './CityMap';

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
  }

  h4 {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: IBM Plex Sans, sans-serif;
    margin: 0;
  }

  .header-dark-mode{
    background-color: var(--jet-black) !important;
    color: var(--white) !important;
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


`;

const BodyArea = styled.div`
  min-height: calc(100vh - ${HEADERHEIGHT}px);
  margin-top: ${HEADERHEIGHT}px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: var(--white);
  box-shadow: 0 2px 5px rgba(12,13,14,0.05);
  align-items: center;
  z-index: 1000;
  position: fixed;
  width: calc(100vw - 40px);
  top: 0;
`;

const ModeDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const NavDiv = styled.div`
  margin: 0 20px;
  &:last-of-type{
    margin-right: 0;
  }
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
  }
`;

const Label = styled.div`
  margin: 0 10px;
`;

const SettingsDiv = styled.div`
  display: flex;
  align-items: center;
`;

const CityTitle = styled.div`
  font-size: 40px;
  font-weight: 300;
`;

const FooterMenu = styled.div`
  display: flex;
  position: fixed;
  bottom: 0px;
  height: 50px;
  z-index: 1000;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

interface CityTagProps {
  selected: boolean;
  darkMode: boolean;
}

const CityTags = styled.div<CityTagProps>`
  padding: 0 15px;
  margin: 0 10px;
  border-radius: 20px;
  background-color:${props => props.selected ? 'var(--primary-color)' : "none"};
  font-size: 14px;
  color:${props => props.selected ? 'var(--white)' : props.darkMode ? "var(--white)" : "var(--black)"};
  cursor: pointer;
  font-weight:  700;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [splitMap, setSplitMap] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Delhi, IN')
  const cityList = [
    'Delhi, IN',
    'Mumbai, IN',
    'Bengaluru, IN'
  ]
  return (
    <>
      <GlobalStyle />
      <Header className={darkMode ? 'header-dark-mode' : 'light-mode'}>
        <h1>
          Gendered<span className="thin">Toponyms</span>
        </h1>
        <CityTitle>
          {selectedCity}
        </CityTitle>
        <SettingsDiv>
          <ModeDiv>
            <Label>Combine Map</Label>
            <ToggleButton click={() => { setSplitMap(!splitMap) }} selected={!splitMap} />
          </ModeDiv>
          <ModeDiv>
            <DarkModeIcon size={24} fill={darkMode ? '#999999' : '#AAAAAA'} />
            <ToggleButton click={() => { setDarkMode(!darkMode) }} selected={darkMode} />
          </ModeDiv>
          <NavDiv>
            About
          </NavDiv>
        </SettingsDiv>
      </Header>
      <BodyArea className={darkMode ? 'dark-mode' : 'light-mode'}>
        <CityMap
          darkMode={darkMode}
          splitMap={splitMap}
          selectedCity={selectedCity}
        />
      </BodyArea>
      <FooterMenu className={darkMode ? 'footer-dark-mode' : 'footer-light-mode'}>
        {
          cityList.map((d: string, i: number) =>
            <CityTags
              key={i}
              selected={selectedCity === d ? true : false}
              darkMode={darkMode}
              onClick={() => { setSelectedCity(d) }}
            >
              {d}
            </CityTags>
          )
        }
      </FooterMenu>
    </>
  );
}

export default App;
