
import styled from 'styled-components';
import _ from 'lodash';
import { COLORFORFEMALE, COLORFORMALE, NEUTRALCOLORONWHITE, NEUTRALCOLORONBLACK } from '../Constants';
import { AboutIconWOHover } from '../Components/Icons';
import mumbaiMapData from '../data/Mumbai/mapData.json';
import mumbaiGenderData from '../data/Mumbai/genderData.json';
import delhiMapData from '../data/Delhi/mapData.json';
import delhiGenderData from '../data/Delhi/genderData.json';
import helsinkiMapData from '../data/Helsinki/mapData.json';
import helsinkiGenderData from '../data/Helsinki/genderData.json';
import citySettings from '../data/citySettings.json';
import { RoadDataType, GenderDataType, CitySettingsDataType } from '../DataTypes';
import { MapVis, SplitMap } from '../MapVis';
import ReactTooltip from "react-tooltip";

interface Props {
  darkMode: boolean;
  splitMap: boolean;
  queryParameter: string | null;
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

const CityMap = (props: Props) => {
  const { darkMode, splitMap, queryParameter } = props;
  let selectedCity = "Mumbai, IN"
  let data = delhiMapData as { elements: RoadDataType[] };
  console.log(queryParameter)
  let gender = delhiGenderData as GenderDataType[];

  switch (queryParameter) {
    case 'delhi-in':
      gender = delhiGenderData as GenderDataType[];
      data = delhiMapData as { elements: RoadDataType[] };
      selectedCity = "Delhi, IN";
      break;
    case 'mumbai-in':
      gender = mumbaiGenderData as GenderDataType[];
      data = mumbaiMapData as { elements: RoadDataType[] };
      selectedCity = "Mumbai, IN";
      break;
    case 'helsinki-fi':
      gender = helsinkiGenderData as GenderDataType[];
      data = helsinkiMapData as { elements: RoadDataType[] };
      selectedCity = "Helsinki, FI";
      break;
    default:
      gender = mumbaiGenderData as GenderDataType[];
      data = mumbaiMapData as { elements: RoadDataType[] };
      selectedCity = "Mumbai, IN"
  }
  const selectedCityData = _.filter(citySettings, (o: CitySettingsDataType) => o.city === selectedCity)[0] as CitySettingsDataType;
  return (
    <>
      <BodyHeader>
        <div style={{ color: COLORFORMALE }}>
          <HeadingDiv>
            <h4>Male Names</h4>
            <InfoIconEl data-tip data-for='maleTooltip'>
              <AboutIconWOHover size={16} fill={darkMode ? '#999999' : '#AAAAAA'} />
            </InfoIconEl>
          </HeadingDiv>

          <h3>
            {_.filter(gender, (o: GenderDataType) => o.Gender === 'male').length} (
            {
              (_.filter(gender, (o: GenderDataType) => o.Gender === 'male').length * 100 / gender.length).toFixed(1)
            }%)
          </h3>
        </div>
        <div style={{ color: COLORFORFEMALE }}>
          <HeadingDiv>
            <h4>Female Names</h4>
            <InfoIconEl data-tip data-for='femaleTooltip'>
              <AboutIconWOHover size={16} fill={darkMode ? '#999999' : '#AAAAAA'} />
            </InfoIconEl>
          </HeadingDiv>
          <h3>
            {_.filter(gender, (o: GenderDataType) => o.Gender === 'female').length} (
            {
              (_.filter(gender, (o: GenderDataType) => o.Gender === 'female').length * 100 / gender.length).toFixed(1)
            }%)
          </h3>
        </div>
        <div style={darkMode ? { color: NEUTRALCOLORONBLACK } : { color: NEUTRALCOLORONWHITE }}>
          <HeadingDiv>
            <h4>Ungendered Names</h4>
            <InfoIconEl data-tip data-for='ungenderedTooltip'>
              <AboutIconWOHover size={16} fill={darkMode ? '#999999' : '#AAAAAA'} />
            </InfoIconEl>
          </HeadingDiv>
          <h3>
            {_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female').length} (
            {
              (_.filter(gender, (o: GenderDataType) => o.Gender !== 'male' && o.Gender !== 'female').length * 100 / gender.length).toFixed(1)
            }%)
          </h3>
        </div>
      </BodyHeader>
      {
        splitMap ? <SplitMap
          data={data}
          width={selectedCityData.splitMapData.width}
          height={selectedCityData.splitMapData.height}
          mapScale={selectedCityData.splitMapData.mapScale}
          translate={selectedCityData.splitMapData.translate}
          darkMode={darkMode}
        /> : <MapVis
          data={data}
          width={selectedCityData.combinedMapData.width}
          height={selectedCityData.combinedMapData.height}
          mapScale={selectedCityData.combinedMapData.mapScale}
          translate={selectedCityData.combinedMapData.translate}
          darkMode={darkMode}
        />
      }
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
    </>
  )
}

export default CityMap;