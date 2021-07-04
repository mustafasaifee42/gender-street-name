import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ToggleButton from './Components/Toggle';
import { DarkModeIcon, AboutIcon } from './Components/Icons';
import Modal from 'react-modal';
import { HEADERHEIGHT } from './Constants';
import CityMap from './CityMap';
import { TwitterShareButton, TwitterIcon } from 'react-share';

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

  .modal-dark-mode {
    width: 90vw;
    max-width: 960px;
    margin: auto;
    background-color: var(--black);
    border: 0 !important;
    padding: 0 20px 20px 20px;
    box-shadow: 0 2px 5px rgba(12,13,14,0.05);
    color: var(--white);
    max-height: 90vh;
  }

  .modal-light-mode {
    width: 90vw;
    max-height: 90vh;
    max-width: 960px;
    margin: auto;
    background-color: var(--white);
    border: 0 !important;
    padding: 0 20px 20px 20px;
    box-shadow: 0 2px 5px rgba(12,13,14,0.05);
    color: var(--black);
  }

  .overlay-dark-mode {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.85);
    display: flex;
    align-items: center;
  }
  .overlay-light-mode {
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
  @media (max-width: 760px) {
    height: 80px;
  }
  @media (max-width: 560px) {
    padding: 0 10px;
    width: calc(100vw - 20px);
  }
`;

const ModeDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
`;

const NavDiv = styled.div`
  cursor: pointer;
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

  @media (max-width: 760px) {
    display:none;
  }
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

  @media (max-width: 420px) {
    margin: 0;
  }
`;

const ModalContent = styled.div`
  overflow: auto;
  max-height: calc(90vh - 88px);
`

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [splitMap, setSplitMap] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Helsinki, FI');
  const cityList = [
    'Delhi, IN',
    'Mumbai, IN',
    'Helsinki, FI'
  ];

  const closeModal = () => {
    setIsOpen(false);
  }

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
          <ModeDiv className="map-split-key">
            <Label>Split Map</Label>
            <ToggleButton click={() => { setSplitMap(!splitMap) }} selected={splitMap} />
          </ModeDiv>
          <ModeDiv>
            <DarkModeIcon size={24} fill={darkMode ? '#999999' : '#AAAAAA'} />
            <ToggleButton click={() => { setDarkMode(!darkMode) }} selected={darkMode} />
          </ModeDiv>
          <NavDiv onClick={() => { setIsOpen(true) }}>
            <AboutIcon size={24} fill={darkMode ? '#999999' : '#AAAAAA'} />
          </NavDiv>
          <NavDiv style={{ height: '24px' }} >
            <TwitterShareButton url={"https://gendered-toponyms.mustafasaifee.com"} title={"Gendered Toponyms: Mapping gender imbalance in city street names by @mustafasaifee42."}>
              <TwitterIcon size={24} round={true} bgStyle={{ fill: `${darkMode ? '#999999' : '#AAAAAA'}` }} />
            </TwitterShareButton>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className={darkMode ? 'modal-dark-mode' : 'modal-light-mode'}
        overlayClassName={darkMode ? 'overlay-dark-mode' : 'overlay-light-mode'}
      >
        <h2>Gendered<span className="thin">Toponyms</span></h2>
        <ModalContent>
          Places and streets names define how a person interacts with a city. Often they are named after important personalities, gods, and goddesses. We wanted to study and visualize the distribution of gender in eponymous streets.
          <br />
          <br />
          The project currently visualizes the streets in Helsinki, Finland; Delhi, India; and Mumbai, India. (Since those are the cities I have lived in and know about).
          <br />
          <br />
          <span className="bold">Data</span>
          <br />
          Currently, the data only focuses on the cisgender distribution because of the way the data is collected; since we are using names to identify if a street is named after a particular gender.
          <br />
          <br />
          Also, note the if a street is named after a landmark or building and that landmark is named after a gender; then we mark the street to be named after that gender. For ex. if a street name is St. Johns Church street; we mark it as named after a male as the street is named after St. John Church which is named after a male.
          <br />
          <br />
          If a street is named after last or family name or has only initials for first and middlle name then the street is categorized as ungendered if no information could be found to categorize the name as male or female. For ex. KN Gaikwad Marg is marked ungendered as we weren't able to find any information what KN stands for; even though the street is clearly named after a human.
          <br />
          <br />
          If the street is called something that can be a name and is also a common word in the language and if no proof can be found that the street is named after a human then that street is marked ungendered. For ex. Pragati street is marked ungendered as although Pragati is a female name in India it also means progress in hindi.
          <br />
          <br />
          <span className="italics">The source code of the visualization can be found on <a href="https://github.com/mustafasaifee42/gender-street-name" target="_blank" rel="noopener noreferrer">Github</a></span>
          <br />
          <br />
          <hr />
          <br />
          <h3>Methodology</h3>
          To get all the streets in a particular city, we used open data from OpenStreetMap.
          <br />
          <br />
          <span className="bold">Delhi and Mumbai</span>
          <br />
          We first removed numbers, special characters, stopwords, keywords like highway, road, apartment, street, mandir, masjid, church, square, margs, gali, etc., and neighborhood names from the street names. Then we pass these parsed names (with length {'>'} 3 characters) through NamSor API ( an API to classifies personal names accurately by gender) to identify the gender. <span className="italics">Dataset for Mumbai can be found <a href="https://github.com/mustafasaifee42/gender-street-name/tree/main/src/data/Mumbai" target="_blank" rel="noopener noreferrer">here</a> and for Delhi can be found <a href="https://github.com/mustafasaifee42/gender-street-name/tree/main/src/data/Delhi" target="_blank" rel="noopener noreferrer">here</a>.</span>
          <br />
          <br />
          <span className="bold">Helsinki</span>
          <br />
          We first removed numbers, special characters, keywords like tie, katu, kuja, väg (for Helsinki), etc. from the Finnish and Swedish names of streets. Then we matched the parsed Finnish names and Swedish names of streets, and if the street names matched we assumed that the street is named after a proper noun. This helped us reduce the number of street names to be checked and then we tagged these streets manually using data from Helsingin Kadunnimet (a book about the history of street names in Helsinki). <span className="italics">Dataset for Helsinki can be found <a href="https://github.com/mustafasaifee42/gender-street-name/tree/main/src/data/Helsinki" target="_blank" rel="noopener noreferrer">here</a>.</span>
          <br />
          <br />
          <hr />
          <br />
          <h3>Similar Projects</h3>
          <a href="https://equalstreetnames.org/" target="_blank" rel="noopener noreferrer">EqualStreetNames</a>
          <br />
          <a href="https://labs.mapbox.com/bites/00190" target="_blank" rel="noopener noreferrer">Street and Gender by MapBox</a>
          <br />
          <br />
          <hr />
          <br />
          <h3>Made By</h3>
          This project was created by <a href="https://mustafasaifee.com" target='_blank' rel="noopener noreferrer" >Mustafa Saifee</a> in Helsinki. Please email me at <a href="mailto:saifee.mustafa@gmail.com" target="_blank" rel="noopener noreferrer">saifee.mustafa@gmail.com</a> or connect on <a href="https://twitter.com/mustafasaifee42" target="_blank" rel="noopener noreferrer">twitter</a> for corrections, suggestions for features and citites or queries. For other such projects: visit <a href="https://mustafasaifee.com/" target="_blank" rel="noopener noreferrer">www.mustafasaifee.com</a>
          <br />
          <br />
          <hr />
          <br />
          <h4>Privacy Policy</h4>
          This website does not save any information about you. We do not directly use cookies or other tracking technologies. We do, however, use Google Analytics for mere statistical reasons. It is possible that Google Analytics sets cookies or uses other tracking technologies, but this data is not directly accessible by us.
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
