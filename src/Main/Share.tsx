
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
  const cityList = ['delhi-in', 'mumbai-in', 'helsinki-fi', 'berlin-de']
  let city = undefined;
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
      city = undefined
  }
  const data = _.filter(cityData, (o: CityDataType) => o.city === selectedCity).length > 0 ? _.filter(cityData, (o: CityDataType) => o.city === selectedCity)[0] : null;

  const url = selectedCity ? cityList.indexOf(selectedCity) > -1 ? `https://gendered-toponyms.mustafasaifee.com/?city=${selectedCity}` : 'https://gendered-toponyms.mustafasaifee.com' : 'https://gendered-toponyms.mustafasaifee.com';
  const quote = data ?
    city === 'Berlin' ?
      `Out of ${data.maleStreets + data.femaleStreets + data.unknown + data.multiple} epynomous streets in #${city}, ${data.maleStreets} are named after males (cis), ${data.femaleStreets - 1} are named after females(cis), 1 is named after transgender females amd 1 is named after 2 or more people with different genders via Gendered Toponyms by @mustafasaifee42.` :
      `Out of ${data.maleStreets + data.femaleStreets + data.unknown + data.multiple} epynomous streets in #${city}, ${data.maleStreets} are named after males, ${data.femaleStreets} are named after females${data.multiple > 0 ? `, ${data.multiple} ${data.multiple > 1 ? 'are' : 'is'} named after 2 or more people with different genders` : ''}${data.unknown > 0 ? `, and for ${data.unknown} ${data.unknown > 1 ? 'streets' : 'street'} genders can't be determined` : ''} via Gendered Toponyms by @mustafasaifee42.`
    :
    'Gendered Toponyms: Mapping gender imbalance in city street names by @mustafasaifee42.';
  return (
    <TwitterShareButton url={url} title={quote}>
      <TwitterIcon size={24} round={true} bgStyle={{ fill: `${darkMode ? '#999999' : '#AAAAAA'}` }} />
    </TwitterShareButton>
  )
}

export default ShareEl