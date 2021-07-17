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

export const AboutIconWOHover = (props: IconProps) => {
  const { size, fill } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 24} height={size ? size : 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={fill ? fill : '#2c2c2c'} d="M12 1.99902C17.5237 1.99902 22.0015 6.47687 22.0015 12.0006C22.0015 17.5243 17.5237 22.0021 12 22.0021C6.47626 22.0021 1.99841 17.5243 1.99841 12.0006C1.99841 6.47687 6.47626 1.99902 12 1.99902ZM11.9962 10.2496C11.4833 10.2499 11.0609 10.6363 11.0035 11.1336L10.9968 11.2503L11.0004 16.7519L11.0072 16.8685C11.0653 17.3658 11.4882 17.7515 12.0011 17.7512C12.5139 17.7509 12.9363 17.3645 12.9938 16.8672L13.0004 16.7505L12.9968 11.249L12.99 11.1323C12.9319 10.635 12.509 10.2493 11.9962 10.2496ZM12.0004 6.50006C11.3092 6.50006 10.7489 7.06038 10.7489 7.75158C10.7489 8.44277 11.3092 9.0031 12.0004 9.0031C12.6916 9.0031 13.2519 8.44277 13.2519 7.75158C13.2519 7.06038 12.6916 6.50006 12.0004 6.50006Z" />
      </svg>
    </IconEl>
  )
}

export const ShareIcon = (props: IconProps) => {
  const { size, fill } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 24} height={size ? size : 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path color={fill} d="M17 3.00195C18.6558 3.00195 19.998 4.34424 19.998 6.00003C19.998 7.65582 18.6558 8.9981 17 8.9981C16.1578 8.9981 15.3967 8.65085 14.8521 8.09171L9.39499 11.2113C9.46333 11.4626 9.49981 11.7271 9.49981 12C9.49981 12.273 9.46333 12.5374 9.39499 12.7887L14.8528 15.9076C15.3974 15.3489 16.1582 15.002 17 15.002C18.6558 15.002 19.998 16.3442 19.998 18C19.998 19.6558 18.6558 20.9981 17 20.9981C15.3442 20.9981 14.0019 19.6558 14.0019 18C14.0019 17.7271 14.0384 17.4626 14.1067 17.2113L8.6496 14.0917C8.105 14.6508 7.34392 14.9981 6.50174 14.9981C4.84595 14.9981 3.50366 13.6558 3.50366 12C3.50366 10.3442 4.84595 9.00195 6.50174 9.00195C7.34355 9.00195 8.10432 9.3489 8.64887 9.9076L14.1067 6.78874C14.0384 6.53743 14.0019 6.27299 14.0019 6.00003C14.0019 4.34424 15.3442 3.00195 17 3.00195Z" />
      </svg>
    </IconEl>
  )
}

export const ListIcon = (props: IconProps) => {
  const { size, fill } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 24} height={size ? size : 24} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={fill ? fill : '#2c2c2c'} d="M492,236H144.262c-11.046,0-20,8.954-20,20s8.954,20,20,20H492c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z" />
        <path fill={fill ? fill : '#2c2c2c'} d="M492,86H144.262c-11.046,0-20,8.954-20,20s8.954,20,20,20H492c11.046,0,20-8.954,20-20S503.046,86,492,86z" />
        <path fill={fill ? fill : '#2c2c2c'} d="M492,386H144.262c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20H492c11.046,0,20-8.954,20-20
          C512,394.954,503.046,386,492,386z"/>
        <circle fill={fill ? fill : '#2c2c2c'} cx="27" cy="106" r="27" />
        <circle fill={fill ? fill : '#2c2c2c'} cx="27" cy="256" r="27" />
        <circle fill={fill ? fill : '#2c2c2c'} cx="27" cy="406" r="27" />
      </svg>
    </IconEl>
  )
}

export const ExpandIcon = (props: IconProps) => {
  const { size, fill } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 24} height={size ? size : 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8834 3.00673L12 3C12.5128 3 12.9355 3.38604 12.9933 3.88338L13 4V11H20C20.5128 11 20.9355 11.386 20.9933 11.8834L21 12C21 12.5128 20.614 12.9355 20.1166 12.9933L20 13H13V20C13 20.5128 12.614 20.9355 12.1166 20.9933L12 21C11.4872 21 11.0645 20.614 11.0067 20.1166L11 20V13H4C3.48716 13 3.06449 12.614 3.00673 12.1166L3 12C3 11.4872 3.38604 11.0645 3.88338 11.0067L4 11H11V4C11 3.48716 11.386 3.06449 11.8834 3.00673L12 3L11.8834 3.00673Z" fill={fill ? fill : '#2c2c2c'} />
      </svg>
    </IconEl>
  )
}

export const CollapseIcon = (props: IconProps) => {
  const { size, fill } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 24} height={size ? size : 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75488 12.5H20.2468C20.661 12.5 20.9968 12.1642 20.9968 11.75C20.9968 11.3358 20.661 11 20.2468 11H3.75488C3.34067 11 3.00488 11.3358 3.00488 11.75C3.00488 12.1642 3.34067 12.5 3.75488 12.5Z" fill={fill ? fill : '#2c2c2c'} />
      </svg>
    </IconEl>
  )
}