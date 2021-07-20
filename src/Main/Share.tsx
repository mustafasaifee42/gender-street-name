
import { TwitterShareButton, TwitterIcon } from 'react-share';
import cityData from '../data/cityData.json';
import { CityDataType } from '../DataTypes';
import _ from 'lodash';

interface Props {
  darkMode: boolean;
  selectedCity: string | null;
}

const ShareEl = (props: Props) => {
  const { darkMode, selectedCity } = props;
  let city = 'Mumbai';
  switch (selectedCity) {
    case 'delhi-in':
      city = "Delhi";
      break;
    case 'mumbai-in':
      city = "Mumbai";
      break;
    case 'helsinki-fi':
      city = "Helsinki";
      break;
    case 'berlin-de':
      city = "Berlin";
      break;
    default:
      city = "Mumbai"
  }
  const data = _.filter(cityData, (o: CityDataType) => o.city === selectedCity).length > 0 ? _.filter(cityData, (o: CityDataType) => o.city === selectedCity)[0] : null;

  const url = selectedCity ? `https://gendered-toponyms.mustafasaifee.com/?city=${selectedCity}` : 'https://gendered-toponyms.mustafasaifee.com';
  const quote = data ?
    city === 'Berlin' ?
      `Out of  ${data.maleStreets + data.femaleStreets + data.unknown} epynomous streets in #${city}, ${data.maleStreets} are named after males (cis), ${data.femaleStreets - 1} are named after females(cis) and 1 is named after transgender females via Gendered Toponyms by @mustafasaifee42.` :
      city === 'Mumbai' || city === 'Delhi' ?
        `Out of  ${data.maleStreets + data.femaleStreets + data.unknown} epynomous streets in #${city}, ${data.maleStreets} are named after males, ${data.femaleStreets} are named after females and ${data.unknown} street name genders can't be determined via Gendered Toponyms by @mustafasaifee42.` :
        `Out of  ${data.maleStreets + data.femaleStreets + data.unknown} epynomous streets in #${city}, ${data.maleStreets} are named after males are ${data.femaleStreets} are named after females via Gendered Toponyms by @mustafasaifee42.` :
    'Gendered Toponyms: Mapping gender imbalance in city street names by @mustafasaifee42.';
  return (
    <TwitterShareButton url={url} title={quote}>
      <TwitterIcon size={24} round={true} bgStyle={{ fill: `${darkMode ? '#999999' : '#AAAAAA'}` }} />
    </TwitterShareButton>
  )
}

export default ShareEl