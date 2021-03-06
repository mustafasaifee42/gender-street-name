import { useState } from 'react';
import styled from 'styled-components';
import ToggleButton from '../Components/Toggle';
import { DarkModeIcon, AboutIcon } from '../Components/Icons';
import Modal from 'react-modal';
import { HEADERHEIGHT } from '../Constants';
import CityMap from '../CityMap';
import ShareEl from './Share';
import {
  Link,
  useLocation
} from "react-router-dom";

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
  font-style: normal;
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
    margin: 0 10px;
  }
`;

const ModalContent = styled.div`
  overflow: auto;
  padding: 0 20px;
  max-height: calc(90vh - 88px);
`

const ModalHeading = styled.div`
  padding: 1px 20px;    
  margin: -20px 0 0 0;
  background-color: var(--very-light-gray);
`

const SpaceDiv = styled.div`
  margin: 20px 0;
`

const HR = styled.hr`
  margin: 20px 0;
  border: 1px solid var(--light-gray);
  shape-rendering: crisp-edges;
`

const H3 = styled.h3`
  margin: 10px 0;
  @media (max-width: 600px) {
    font-size: 24px;
  }
  @media (max-width: 420px) {
    font-size: 20px;
  }
`

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
function Main() {
  const query = useQuery().get("city")
  const [darkMode, setDarkMode] = useState(true);
  const [splitMap, setSplitMap] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  let selectedCity = "Mumbai, IN";
  switch (query) {
    case 'delhi-in':
      selectedCity = "Delhi, IN";
      break;
    case 'mumbai-in':
      selectedCity = "Mumbai, IN";
      break;
    case 'helsinki-fi':
      selectedCity = "Helsinki, FI";
      break;
    case 'berlin-de':
      selectedCity = "Berlin, DE";
      break;
    default:
      selectedCity = "Mumbai, IN";
  }
  const cityList = [
    {
      cityName: 'Delhi, IN',
      id: "delhi-in",
      cityTag: 'Delhi'
    },
    {
      cityName: 'Mumbai, IN',
      id: "mumbai-in",
      cityTag: 'Mumbai'
    },
    {
      cityName: 'Helsinki, FI',
      id: "helsinki-fi",
      cityTag: 'Helsinki'
    },
    {
      cityName: 'Berlin, DE',
      id: "berlin-de",
      cityTag: 'Berlin'
    }
  ];

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      <Header className={darkMode ? 'header-dark-mode' : 'light-mode'}>
        {
          window.innerWidth < 420 ?
            <h1>
              G<span className="thin">Toponyms</span>
            </h1> :
            <h1>
              Gendered<span className="thin">Toponyms</span>
            </h1>
        }
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
            <ShareEl darkMode={darkMode} selectedCity={query} />
          </NavDiv>
        </SettingsDiv>
      </Header>
      <BodyArea className={darkMode ? 'dark-mode' : 'light-mode'}>
        <CityMap
          darkMode={darkMode}
          splitMap={splitMap}
          queryParameter={query}
        />
      </BodyArea>
      <FooterMenu className={darkMode ? 'footer-dark-mode' : 'footer-light-mode'}>
        {
          cityList.map((d, i: number) =>
            <Link to={`?city=${d.id}`} key={i}>
              <CityTags
                selected={selectedCity === d.cityName ? true : false}
                darkMode={darkMode}
              >
                {d.cityTag}
              </CityTags>
            </Link>
          )
        }
      </FooterMenu>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="About Modal"
        ariaHideApp={false}
        className={'modal'}
        overlayClassName={'overlay'}
      >
        <ModalHeading>
          <h2>Gendered<span className="thin">Toponyms</span></h2>
        </ModalHeading>
        <ModalContent>
          <SpaceDiv />
          Places and streets names define how a person interacts with a city. Often they are named after important personalities, gods, and goddesses. The project aims to study and visualize the distribution of gender in eponymous streets.
          <br />
          <br />
          The project currently visualizes the streets in Delhi(IN), Mumbai(IN), Helsinki(FI) and Berlin(DE).
          <br />
          <br />
          <span className="bold">Data</span>
          <br />
          Currently, the data only focuses on the binary gender distribution because of the way the data is collected; since we are using names to identify if a street is named after a particular gender.
          <br />
          <br />
          If a street is named after a landmark or building and that landmark is named after a gender; the street is tagged to be named after that gender. For ex. if a street name is St. Johns Church street; it is taggeded as named after a male as the street is named after St. John Church which is named after a male. If the street is named after a male or female given name than also street  is tagged to be named after a gender.
          <br />
          <br />
          If a street is named after last or family name or has only initials for first and middlle name then the street is tagged as unknown if no information could be found to categorize the name as male or female. For ex. KN Gaikwad Marg is tagged unknown as no information was available for what KN stands for; even though the street is clearly named after a human. If the street is named after multiple people of differnt genders than the street is also considered ungendered.
          <br />
          <br />
          If the street is called something that can be a name and is also a common word in the language and if no proof can be found that the street is named after a human then that street is tagged ungendered. For ex. Pragati street is tagged ungendered as although Pragati is a female name in India it also means progress in hindi.
          <br />
          <br />
          For simplicity transgender males are counted as males and transgender females are counted as female. Berlin has 1 street named after transgender female which is counted as female.
          <br />
          <br />
          <span className="italics">The source code of the visualization can be found on <a href="https://github.com/mustafasaifee42/gender-street-name" target="_blank" rel="noopener noreferrer">Github</a></span>
          <br />
          <HR />
          <H3>Methodology</H3>
          To get all the streets in a particular city, open data from OpenStreetMap is used.
          <br />
          <br />
          <span className="bold">Delhi and Mumbai</span>
          <br />
          Numbers, special characters, stopwords, keywords like highway, road, apartment, street, mandir, masjid, church, square, margs, gali, etc., and neighborhood names  are first removed from the street names. Then these parsed names (with length {'>'} 3 characters) are passed through NamSor API (an API to classifies personal names accurately by gender) to identify the gender. <span className="italics">Dataset for Mumbai can be found <a href="https://github.com/mustafasaifee42/gender-street-name/blob/main/public/data/Mumbai/mapData.json" target="_blank" rel="noopener noreferrer">here</a> and for Delhi can be found <a href="https://github.com/mustafasaifee42/gender-street-name/blob/main/public/data/Delhi/mapData.json" target="_blank" rel="noopener noreferrer">here</a>.</span>
          <br />
          <br />
          <span className="bold">Helsinki</span>
          <br />
          Numbers, special characters, keywords like tie, katu, kuja, v??g (for Helsinki), etc. are first removed from the Finnish and Swedish names of streets. Then the parsed Finnish names and Swedish names of streets are compared, and if the street names matched we assumed that the street is named after a proper noun. This helps in reducing the number of street names to be checked and then these streets are tagged manually using data from Helsingin Kadunnimet (a book about the history of street names in Helsinki). <span className="italics">Dataset for Helsinki can be found <a href="https://github.com/mustafasaifee42/gender-street-name/blob/main/public/data/Helsinki/mapData.json" target="_blank" rel="noopener noreferrer">here</a>.</span>
          <br />
          <br />
          <span className="bold">Berlin</span>
          <br />
          For Berlin we use the data from WikiData to find the gender of the people after whom the street are named after. <span className="italics">Dataset for Berlin can be found <a href="https://github.com/mustafasaifee42/gender-street-name/blob/main/public/data/Berlin/mapData.json" target="_blank" rel="noopener noreferrer">here</a>.</span>
          <br />
          <HR />
          <H3>Similar Projects</H3>
          <a href="https://equalstreetnames.org/" target="_blank" rel="noopener noreferrer">EqualStreetNames</a>
          <br />
          <a href="https://labs.mapbox.com/bites/00190" target="_blank" rel="noopener noreferrer">Street and Gender by MapBox</a>
          <br />
          <HR />
          <H3>Made By</H3>
          This project was created by <a href="https://mustafasaifee.com" target='_blank' rel="noopener noreferrer" >Mustafa Saifee</a> in Helsinki. Please email me at <a href="mailto:saifee.mustafa@gmail.com" target="_blank" rel="noopener noreferrer">saifee.mustafa@gmail.com</a> or connect on <a href="https://twitter.com/mustafasaifee42" target="_blank" rel="noopener noreferrer">twitter</a> for corrections, suggestions for features and citites or queries. For other such projects: visit <a href="https://mustafasaifee.com/" target="_blank" rel="noopener noreferrer">www.mustafasaifee.com</a>
          <br />
          <HR />
          <h4>Privacy Policy</h4>
          This website does not save any information about you. We do not directly use cookies or other tracking technologies. We do, however, use Google Analytics for mere statistical reasons. It is possible that Google Analytics sets cookies or uses other tracking technologies, but this data is not directly accessible by us.
          <br />
          <br />
        </ModalContent>
      </Modal>
    </>
  );
}

export default Main;
