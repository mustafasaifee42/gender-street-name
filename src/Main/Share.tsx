
import { TwitterShareButton, TwitterIcon } from 'react-share';
import mumbaiGenderData from '../data/Mumbai/genderData.json';
import delhiGenderData from '../data/Delhi/genderData.json';
import helsinkiGenderData from '../data/Helsinki/genderData.json';
import berlinGenderData from '../data/Berlin/genderData.json';
import { GenderDataType } from '../DataTypes';
import _ from 'lodash';

interface Props {
  darkMode: boolean;
  selectedCity: string | null;
}

const ShareEl = (props: Props) => {
  const { darkMode, selectedCity } = props;
  let city = 'Mumbai';
  let gender = mumbaiGenderData as GenderDataType[];
  switch (selectedCity) {
    case 'delhi-in':
      gender = delhiGenderData as GenderDataType[];
      city = "Delhi";
      break;
    case 'mumbai-in':
      gender = mumbaiGenderData as GenderDataType[];
      city = "Mumbai";
      break;
    case 'helsinki-fi':
      gender = helsinkiGenderData as GenderDataType[];
      city = "Helsinki";
      break;
    case 'berlin-de':
      gender = berlinGenderData as GenderDataType[];
      city = "Berlin";
      break;
    default:
      gender = mumbaiGenderData as GenderDataType[];
      city = "Mumbai"
  }

  const maleCount = _.filter(gender, (o: GenderDataType) => o.Gender === 'male' || o.Gender === 'transgender male').length
  const femaleCount = _.filter(gender, (o: GenderDataType) => o.Gender === 'female' || o.Gender === 'transgender female').length
  const url = selectedCity ? `https://gendered-toponyms.mustafasaifee.com/?city=${selectedCity}` : 'https://gendered-toponyms.mustafasaifee.com';
  const quote = selectedCity ?
    selectedCity === 'berlin-de' ?
      `Out of  ${maleCount + femaleCount} epynomous streets in #${city}, ${maleCount} are named after males (cis), ${femaleCount - 1} are named after females(cis) and 1 is named after transgender females. Gendered Toponyms by @mustafasaifee42.` :
      `Out of  ${maleCount + femaleCount} epynomous streets in #${city}, ${maleCount} are named after males and ${femaleCount} are named after females. Gendered Toponyms by @mustafasaifee42.` :
    'Gendered Toponyms: Mapping gender imbalance in city street names by @mustafasaifee42.';
  return (
    <TwitterShareButton url={url} title={quote}>
      <TwitterIcon size={24} round={true} bgStyle={{ fill: `${darkMode ? '#999999' : '#AAAAAA'}` }} />
    </TwitterShareButton>
  )
}

export default ShareEl