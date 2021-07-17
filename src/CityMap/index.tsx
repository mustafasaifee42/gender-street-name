
import styled from 'styled-components';
import _ from 'lodash';
import { COLORFORFEMALE, COLORFORMALE, NEUTRALCOLORONWHITE, NEUTRALCOLORONBLACK, TOPPADDING } from '../Constants';
import { AboutIconWOHover, ListIcon, ExpandIcon, CollapseIcon } from '../Components/Icons';
import Loader from "react-loader-spinner";
import citySettings from '../data/citySettings.json';
import { RoadDataType, GenderDataType, CitySettingsDataType } from '../DataTypes';
import { MapVis, SplitMap } from '../MapVis';
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface Props {
  darkMode: boolean;
  splitMap: boolean;
  queryParameter: string | null;
}

interface DarkMode {
  darkMode: boolean;
}

const BodyHeader = styled.div`
display: flex;
max-width: 720px;
margin: 20px auto 10px auto;
flex-wrap: wrap;
justify-content: space-between;
padding: 20px 10px 0 10px;
`;

const TooltipDiv = styled.div`
  max-width: 320px;
`

const HeadingDiv = styled.div`
  display: flex;
  align-items: center;
`

const InfoIconEl = styled.div`
  margin-top: -12px;  
  margin-left: -5px;  
`

const TooltipText = styled.div`
  font-size: 12px;
  margin: 5px 0;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
`

const PercentValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  font-family: IBM Plex Sans, sans-serif;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 420px) {
    font-size: 12px;
  }
`

const H3 = styled.h3`
  line-height: 32px;
  @media (max-width: 600px) {
    font-size: 24px;
  }
  @media (max-width: 420px) {
    font-size: 20px;
  }
`;

const LoaderDiv = styled.div`
  height: calc(100vh - ${TOPPADDING}px);
  align-items: center;
  display: flex;
  justify-content: center;
`


const InfoBox = styled.div<DarkMode>`
  background-color: ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'var(--light-gray)'};
  color: ${props => props.darkMode ? 'var(--white)' : 'var(--black)'};
  position: fixed;
  z-index: 1000;
  right: 10px;
  bottom: 60px;
  padding: 5px;
  font-size: 12px;
  font-style: italic;
  max-width: 370px;
  text-align: right; 
  @media (max-width: 600px) {
    font-size: 10px;
  }
`

interface DataIconProps {
  darkMode: boolean;
  bottomPosition?: number;
}

const DataIcon = styled.div<DataIconProps>`
  background-color: ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'var(--light-gray)'};
  color: ${props => props.darkMode ? 'var(--white)' : 'var(--black)'};
  position: fixed;
  z-index: 1000;
  right: 10px;
  bottom: ${props => props.bottomPosition ? `${props.bottomPosition}px` : '100px'};
  padding: 5px;
  cursor: pointer;
`
const ModalContent = styled.div`
  overflow: auto;
  padding: 0 20px;
  max-height: calc(90vh - 88px);
`

const NameList = styled.div`
  margin-top: 20px; 
  display: flex;
  flex-wrap: wrap;
`

const NameTag = styled.div`
  padding: 0 10px;
  border-radius: 2px;
  margin: 0 10px 10px 0;
  background-color: var(--light-gray);
`

const HR = styled.hr`
  margin: 20px 0 0 0;
  border: 1px solid var(--light-gray);
  shape-rendering: crisp-edges;
`

const H3Body = styled.h3`
  margin: 0;
  @media (max-width: 600px) {
    font-size: 24px;
  }
  @media (max-width: 420px) {
    font-size: 20px;
  }
`
const TitleDiv = styled.div`
  display: flex;
  border-bottom: 1px solid var(--light-gray);
  cursor: pointer;
  align-items: center;
  margin: 0;
  padding: 10px 0;
`

const AccordionIcon = styled.div`
  margin-right: 0;
`

const ModalHeading = styled.div`
  padding: 1px 20px;    
  margin: -20px 0 0 0;
  background-color: var(--very-light-gray);
`

const Note = styled.div`
  background-color: var(--very-light-gray);
  border: 1px solid var(--gray);
  font-style: italic;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0 0 0;
`

const CityMap = (props: Props) => {
  const { darkMode, splitMap, queryParameter } = props;
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [femaleStreetExpanded, setFemaleStreetExpanded] = useState(true);
  const [maleStreetExpanded, setMaleStreetExpanded] = useState(false);
  const [ungenderedStreetExpanded, setUngenderedStreetExpanded] = useState(false);
  const [data, setData] = useState<RoadDataType[] | undefined>(undefined);
  const [gender, setGender] = useState<GenderDataType[] | undefined>(undefined);
  const [selectedCitySettings, setSelectedCitySettings] = useState<CitySettingsDataType>(_.filter(citySettings, (o: CitySettingsDataType) => o.city === "Mumbai, IN")[0] as CitySettingsDataType);
  useEffect(() => {
    let directory = 'Mumbai';
    setLoading(true);
    switch (queryParameter) {
      case 'delhi-in':
        directory = "Delhi";
        break;
      case 'mumbai-in':
        directory = "Mumbai";
        break;
      case 'helsinki-fi':
        directory = "Helsinki";
        break;
      case 'berlin-de':
        directory = "Berlin";
        break;
      default:
        directory = "Mumbai";
    }
    fetch(`./data/${directory}/mapData.json`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then((jsonData) => {
        switch (queryParameter) {
          case 'delhi-in':
            setSelectedCitySettings(_.filter(citySettings, (o: CitySettingsDataType) => o.city === "Delhi, IN")[0] as CitySettingsDataType)
            break;
          case 'mumbai-in':
            setSelectedCitySettings(_.filter(citySettings, (o: CitySettingsDataType) => o.city === "Mumbai, IN")[0] as CitySettingsDataType)
            break;
          case 'helsinki-fi':
            setSelectedCitySettings(_.filter(citySettings, (o: CitySettingsDataType) => o.city === "Helsinki, FI")[0] as CitySettingsDataType)
            break;
          case 'berlin-de':
            setSelectedCitySettings(_.filter(citySettings, (o: CitySettingsDataType) => o.city === "Berlin, DE")[0] as CitySettingsDataType)
            break;
          default:
            setSelectedCitySettings(_.filter(citySettings, (o: CitySettingsDataType) => o.city === "Mumbai, IN")[0] as CitySettingsDataType)
        }
        setLoading(false)
        setData(jsonData.elements as RoadDataType[])
        setGender(jsonData.genderData as GenderDataType[])
      });
  }, [queryParameter])
  return (
    <>
      {data && gender && !loading ?
        <>
          <BodyHeader>
            <div style={{ color: COLORFORMALE }}>
              <HeadingDiv>
                <h4>Male Names</h4>
                <InfoIconEl data-tip data-for='maleTooltip'>
                  <AboutIconWOHover size={16} fill={darkMode ? '#999999' : '#AAAAAA'} />
                </InfoIconEl>
              </HeadingDiv>
              <H3>
                {_.filter(gender, (o: GenderDataType) => o.Gender === 'male' || o.Gender === 'transgender male').length} <PercentValue>(
                  {
                    (_.filter(gender, (o: GenderDataType) => o.Gender === 'male' || o.Gender === 'transgender male').length * 100 / gender.length).toFixed(1)
                  }%)</PercentValue>
              </H3>
            </div>
            <div style={{ color: COLORFORFEMALE }}>
              <HeadingDiv>
                <h4>Female Names</h4>
                <InfoIconEl data-tip data-for='femaleTooltip'>
                  <AboutIconWOHover size={16} fill={darkMode ? '#999999' : '#AAAAAA'} />
                </InfoIconEl>
              </HeadingDiv>
              <H3>
                {_.filter(gender, (o: GenderDataType) => o.Gender === 'female' || o.Gender === 'transgender female').length} <PercentValue>(
                  {
                    (_.filter(gender, (o: GenderDataType) => o.Gender === 'female' || o.Gender === 'transgender female').length * 100 / gender.length).toFixed(1)
                  }%)</PercentValue>
              </H3>
            </div>
            <div style={darkMode ? { color: NEUTRALCOLORONBLACK } : { color: NEUTRALCOLORONWHITE }}>
              <HeadingDiv>
                <h4>Ungendered Names</h4>
                <InfoIconEl data-tip data-for='ungenderedTooltip'>
                  <AboutIconWOHover size={16} fill={darkMode ? '#999999' : '#AAAAAA'} />
                </InfoIconEl>
              </HeadingDiv>
              <H3>
                {_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female' && o.Gender !== 'transgender male' && o.Gender !== 'transgender female').length} <PercentValue>(
                  {
                    (_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female' && o.Gender !== 'transgender male' && o.Gender !== 'transgender female').length * 100 / gender.length).toFixed(1)
                  }%)</PercentValue>
              </H3>
            </div>
          </BodyHeader>
          {
            splitMap ? <SplitMap
              data={data}
              width={selectedCitySettings.splitMapData.width}
              height={selectedCitySettings.splitMapData.height}
              mapScale={selectedCitySettings.splitMapData.mapScale}
              translate={selectedCitySettings.splitMapData.translate}
              darkMode={darkMode}
            /> : <MapVis
              data={data}
              width={selectedCitySettings.combinedMapData.width}
              height={selectedCitySettings.combinedMapData.height}
              mapScale={selectedCitySettings.combinedMapData.mapScale}
              translate={selectedCitySettings.combinedMapData.translate}
              darkMode={darkMode}
            />
          }
          <DataIcon bottomPosition={queryParameter === "berlin-de" ? 150 : 100} darkMode={darkMode} onClick={() => { setShowData(true) }}>
            <ListIcon size={24} fill={darkMode ? '#999999' : '#AAAAAA'} />
          </DataIcon>
          <InfoBox darkMode={darkMode}>
            {
              queryParameter === "berlin-de" ?
                <>
                  Charlotte-Von-Mahlsdorf-Ring is named after transgender female which is counted as female
                  <br />
                </> : null
            }
            Scroll {'&'} drag to pan {'&'} zoom and hover to see details
          </InfoBox>
          <ReactTooltip place="bottom" type={darkMode ? 'dark' : 'light'} effect="solid" id='maleTooltip'>
            <TooltipDiv>
              <TooltipText>Show the number of streets named after male human or male mythological/fictional characters.</TooltipText>
              <TooltipText>Also includes streets named after a landmark which was named after a male human or male mythological/fictional characters.</TooltipText>
              <TooltipText>Also includes streets named after transgender males.</TooltipText>
              <TooltipText>Does not include the street that uses initials for first and middle name or uses just the last name and it cannot be determined if the name belong to a male.</TooltipText>
            </TooltipDiv>
          </ReactTooltip>
          <ReactTooltip place="bottom" type={darkMode ? 'dark' : 'light'} effect="solid" id='femaleTooltip'>
            <TooltipDiv>
              <TooltipText>Show the number of streets named after female human or female mythological/fictional characters.</TooltipText>
              <TooltipText>Also includes streets named after a landmark which was named after a female human or female mythological/fictional characters.</TooltipText>
              <TooltipText>Also includes streets named after transgender females.</TooltipText>
              <TooltipText>Does not include the street that uses initials for first and middle name or uses just the last name and it cannot be determined if the name belong to a female.</TooltipText>
            </TooltipDiv>
          </ReactTooltip>
          <ReactTooltip place="bottom" type={darkMode ? 'dark' : 'light'} effect="solid" id='ungenderedTooltip'>
            <TooltipDiv>
              <TooltipText>Show the number of streets that are not named after humans.</TooltipText>
              <TooltipText>Also include the street that uses initials for first and middle name or uses just the last name or the name is unisex and cannot be determined if the name belong to a male or female.</TooltipText>
            </TooltipDiv>
          </ReactTooltip>

          <Modal
            isOpen={showData}
            onRequestClose={() => { setShowData(false); setFemaleStreetExpanded(true); setMaleStreetExpanded(false); setUngenderedStreetExpanded(false) }}
            contentLabel="Data Modal"
            ariaHideApp={false}
            className={'modal'}
            overlayClassName={'overlay'}
          >
            <ModalHeading>
              <h2>
                {
                  queryParameter === "delhi-in" ? "Delhi, IN" :
                    queryParameter === "helsinki-fi" ? "Helsinki, FI" :
                      queryParameter === "berlin-de" ? "Berlin, DE" :
                        "Mumbai, IN"
                }
              </h2>
            </ModalHeading>
            <ModalContent>
              <TitleDiv onClick={() => { setFemaleStreetExpanded(!femaleStreetExpanded) }}>
                {
                  femaleStreetExpanded ?
                    <AccordionIcon >
                      <CollapseIcon size={24} fill={'#999999'} />
                    </AccordionIcon> :
                    <AccordionIcon>
                      <ExpandIcon size={24} fill={'#999999'} />
                    </AccordionIcon>
                }
                <H3Body className="bold">Streets Named After Females ({_.filter(gender, (o: GenderDataType) => o.Gender === 'female' || o.Gender === 'transgender female').length})</H3Body>
              </TitleDiv>
              {
                femaleStreetExpanded ? <>
                  {
                    queryParameter === "berlin-de" ? <Note>Charlotte-Von-Mahlsdorf-Ring in Berlin is named after transgender female</Note> : null
                  }
                  <NameList>
                    {
                      _.filter(gender, (o: GenderDataType) => o.Gender === 'female' || o.Gender === 'transgender female').map((d, i) => <NameTag key={i}>{d.Highway_Name}</NameTag>)
                    }
                  </NameList>
                  <HR />
                </> : null
              }
              <TitleDiv onClick={() => { setMaleStreetExpanded(!maleStreetExpanded) }}>
                {
                  maleStreetExpanded ?
                    <AccordionIcon >
                      <CollapseIcon size={24} fill={'#999999'} />
                    </AccordionIcon> :
                    <AccordionIcon>
                      <ExpandIcon size={24} fill={'#999999'} />
                    </AccordionIcon>
                }
                <H3Body className="bold">Streets Named After Males ({_.filter(gender, (o: GenderDataType) => o.Gender === 'male' || o.Gender === 'transgender male').length})</H3Body>
              </TitleDiv>
              {
                maleStreetExpanded ? <>
                  <NameList>
                    {
                      _.filter(gender, (o: GenderDataType) => o.Gender === 'male' || o.Gender === 'transgender male').map((d, i) => <NameTag key={i}>{d.Highway_Name}</NameTag>)
                    }
                  </NameList>
                  <HR />
                </> : null
              }
              <TitleDiv onClick={() => { setUngenderedStreetExpanded(!ungenderedStreetExpanded) }}>
                {
                  ungenderedStreetExpanded ?
                    <AccordionIcon >
                      <CollapseIcon size={24} fill={'#999999'} />
                    </AccordionIcon> :
                    <AccordionIcon>
                      <ExpandIcon size={24} fill={'#999999'} />
                    </AccordionIcon>
                }
                <H3Body className="bold">Ungendered Street Names ({_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female' && o.Gender !== 'transgender male' && o.Gender !== 'transgender female').length})</H3Body>
              </TitleDiv>
              {
                ungenderedStreetExpanded ? <>
                  <NameList>
                    {
                      _.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female' && o.Gender !== 'transgender male' && o.Gender !== 'transgender female').map((d, i) => <NameTag key={i}>{d.Highway_Name}</NameTag>)
                    }
                  </NameList>
                </> : null
              }
            </ModalContent>
          </Modal>
        </> :
        <LoaderDiv>
          <Loader
            type="Oval"
            color="#ef5d09"
            height={50}
            width={50}
          />
        </LoaderDiv>}
    </>
  )
}

export default CityMap;