
import styled from 'styled-components';
import _ from 'lodash';
import { COLORFORFEMALE, COLORFORMALE, NEUTRALCOLORONWHITE, NEUTRALCOLORONBLACK, TOPPADDING } from '../Constants';
import { AboutIconWOHover, ListIcon } from '../Components/Icons';
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
  @media (max-width: 600px) {
    font-size: 10px;
  }
`

const DataIcon = styled.div<DarkMode>`
  background-color: ${props => props.darkMode ? 'rgba(255,255,255,0.1)' : 'var(--light-gray)'};
  color: ${props => props.darkMode ? 'var(--white)' : 'var(--black)'};
  position: fixed;
  z-index: 1000;
  right: 10px;
  bottom: 100px;
  padding: 5px;
  cursor: pointer;
`
const ModalContent = styled.div`
  overflow: auto;
  padding: 0 20px;
  max-height: calc(90vh - 88px);
`

const NameList = styled.div`
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
  margin: 20px 0;
  border: 1px solid var(--light-gray);
  shape-rendering: crisp-edges;
`

const H3Body = styled.h3`
  margin: 10px 0;
  @media (max-width: 600px) {
    font-size: 24px;
  }
  @media (max-width: 420px) {
    font-size: 20px;
  }
`


const ModalHeading = styled.div`
  padding: 1px 20px;    
  margin: -20px 0 0 0;
  background-color: var(--very-light-gray);
`

const CityMap = (props: Props) => {
  const { darkMode, splitMap, queryParameter } = props;
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(true);
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
                {_.filter(gender, (o: GenderDataType) => o.Gender === 'male').length} <PercentValue>(
                  {
                    (_.filter(gender, (o: GenderDataType) => o.Gender === 'male').length * 100 / gender.length).toFixed(1)
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
                {_.filter(gender, (o: GenderDataType) => o.Gender === 'female').length} <PercentValue>(
                  {
                    (_.filter(gender, (o: GenderDataType) => o.Gender === 'female').length * 100 / gender.length).toFixed(1)
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
                {_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female').length} <PercentValue>(
                  {
                    (_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female').length * 100 / gender.length).toFixed(1)
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
          <DataIcon darkMode={darkMode} onClick={() => { setShowData(true) }}>
            <ListIcon size={24} fill={darkMode ? '#999999' : '#AAAAAA'} />
          </DataIcon>
          <InfoBox darkMode={darkMode}>
            Scroll {'&'} drag to pan {'&'} zoom and hover to see details
          </InfoBox>
          <ReactTooltip place="bottom" type={darkMode ? 'dark' : 'light'} effect="solid" id='maleTooltip'>
            <TooltipDiv>
              <TooltipText>Show the number of streets named after male human or male mythological/fictional characters.</TooltipText>
              <TooltipText>Also includes streets named after a landmark which was named after a male human or male mythological/fictional characters.</TooltipText>
              <TooltipText>Does not include the street that uses initials for first and middle name or uses just the last name and it cannot be determined if the name belong to a male.</TooltipText>
            </TooltipDiv>
          </ReactTooltip>
          <ReactTooltip place="bottom" type={darkMode ? 'dark' : 'light'} effect="solid" id='femaleTooltip'>
            <TooltipDiv>
              <TooltipText>Show the number of streets named after female human or female mythological/fictional characters.</TooltipText>
              <TooltipText>Also includes streets named after a landmark which was named after a female human or female mythological/fictional characters.</TooltipText>
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
            onRequestClose={() => { setShowData(false) }}
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
                      "Mumbai, IN"
                }
              </h2>
            </ModalHeading>
            <ModalContent>
              <H3Body className="bold">Streets Named After Females ({_.filter(gender, (o: GenderDataType) => o.Gender === 'female').length})</H3Body>
              <NameList>
                {
                  _.filter(gender, (o: GenderDataType) => o.Gender === 'female').map((d, i) => <NameTag key={i}>{d.Highway_Name}</NameTag>)
                }
              </NameList>
              <HR />
              <H3Body className="bold">Streets Named After Males ({_.filter(gender, (o: GenderDataType) => o.Gender === 'male').length})</H3Body>
              <NameList>
                {
                  _.filter(gender, (o: GenderDataType) => o.Gender === 'male').map((d, i) => <NameTag key={i}>{d.Highway_Name}</NameTag>)
                }
              </NameList>
              <HR />
              <H3Body className="bold">Ungendered Street Names ({_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female').length})</H3Body>
              <NameList>
                {
                  _.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female').map((d, i) => <NameTag key={i}>{d.Highway_Name}</NameTag>)
                }
              </NameList>
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