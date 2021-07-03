import styled from 'styled-components';

interface IconElProps {
  height?: number;
}

interface PathProps {
  color?: string;
}

const IconEl = styled.div<IconElProps>`
  margin: 0 7px;
  height: ${props => props.height ? `${props.height}px` : 'auto'};
`

const Path = styled.path<PathProps>`
  fill: ${props => props.color ? props.color : '#2c2c2c'};
  &:hover {
    fill: var(--primary-color);
  }
`

interface IconProps {
  size?: number;
  fill?: string;
}

export const DarkModeIcon = (props: IconProps) => {
  const { size, fill } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 24} height={size ? size : 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20.5V3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5Z" fill={fill ? fill : '#2c2c2c'} />
      </svg>
    </IconEl>
  )
}

export const AboutIcon = (props: IconProps) => {
  const { size, fill } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 24} height={size ? size : 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path color={fill} d="M12 1.99902C17.5237 1.99902 22.0015 6.47687 22.0015 12.0006C22.0015 17.5243 17.5237 22.0021 12 22.0021C6.47626 22.0021 1.99841 17.5243 1.99841 12.0006C1.99841 6.47687 6.47626 1.99902 12 1.99902ZM11.9962 10.2496C11.4833 10.2499 11.0609 10.6363 11.0035 11.1336L10.9968 11.2503L11.0004 16.7519L11.0072 16.8685C11.0653 17.3658 11.4882 17.7515 12.0011 17.7512C12.5139 17.7509 12.9363 17.3645 12.9938 16.8672L13.0004 16.7505L12.9968 11.249L12.99 11.1323C12.9319 10.635 12.509 10.2493 11.9962 10.2496ZM12.0004 6.50006C11.3092 6.50006 10.7489 7.06038 10.7489 7.75158C10.7489 8.44277 11.3092 9.0031 12.0004 9.0031C12.6916 9.0031 13.2519 8.44277 13.2519 7.75158C13.2519 7.06038 12.6916 6.50006 12.0004 6.50006Z" />
      </svg>
    </IconEl>
  )
}