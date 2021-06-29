
import styled from 'styled-components';
import _ from 'lodash';
import { COLORFORFEMALE, COLORFORMALE, NEUTRALCOLORONWHITE, NEUTRALCOLORONBLACK } from '../Constants';
import mumbaiMapData from '../data/Mumbai/mapData.json';
import mumbaiGenderData from '../data/Mumbai/genderData.json';
import delhiMapData from '../data/Delhi/mapData.json';
import delhiGenderData from '../data/Delhi/genderData.json';
import citySettings from '../data/citySettings.json';
import { RoadDataType, GenderDataType, CitySettingsDataType } from '../DataTypes';
import { MapVis, SplitMap } from '../MapVis';

interface Props {
  darkMode: boolean;
  splitMap: boolean;
  selectedCity: string;
}

const BodyHeader = styled.div`
display: flex;
max-width: 720px;
margin: 20px auto 10px auto;
flex-wrap: wrap;
justify-content: space-between;
padding-top: 20px;
`;

const CityMap = (props: Props) => {
  const { darkMode, splitMap, selectedCity } = props;
  let data = delhiMapData as { elements: RoadDataType[] };

  data.elements.forEach((d) => {
    if (!d.tags.gender) { console.log(d.tags.name) }
  })
  let gender = delhiGenderData as GenderDataType[];

  switch (selectedCity) {
    case 'Delhi, IN':
      gender = delhiGenderData as GenderDataType[];
      data = delhiMapData as { elements: RoadDataType[] };
      break;
    case 'Mumbai, IN':
      gender = mumbaiGenderData as GenderDataType[];
      data = mumbaiMapData as { elements: RoadDataType[] };
      break;
    case 'Bengaluru, IN':
      gender = mumbaiGenderData as GenderDataType[];
      data = mumbaiMapData as { elements: RoadDataType[] };
      break;
    default:
      gender = mumbaiGenderData as GenderDataType[];
      data = mumbaiMapData as { elements: RoadDataType[] };
  }
  const selectedCityData = _.filter(citySettings, (o: CitySettingsDataType) => o.city === selectedCity)[0] as CitySettingsDataType;
  return (
    <>
      <BodyHeader>
        <div style={{ color: COLORFORMALE }}>
          <h4>Named After Males</h4>
          <h3>
            {_.filter(gender, (o: GenderDataType) => o.Gender === 'male').length} (
            {
              (_.filter(gender, (o: GenderDataType) => o.Gender === 'male').length * 100 / gender.length).toFixed(1)
            }%)
          </h3>
        </div>
        <div style={{ color: COLORFORFEMALE }}>
          <h4>Named After Females</h4>
          <h3>
            {_.filter(gender, (o: GenderDataType) => o.Gender === 'female').length} (
            {
              (_.filter(gender, (o: GenderDataType) => o.Gender === 'female').length * 100 / gender.length).toFixed(1)
            }%)
          </h3>
        </div>
        <div style={darkMode ? { color: NEUTRALCOLORONBLACK } : { color: NEUTRALCOLORONWHITE }}>
          <h4>Ungendered Names</h4>
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
    </>
  )
}

export default CityMap;