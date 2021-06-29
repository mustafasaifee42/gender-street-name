import styled from 'styled-components';

interface IconElProps {
  height?: number;
}

const IconEl = styled.div<IconElProps>`
  margin: 0 10px;
  height: ${props => props.height ? `${props.height}px` : 'auto'};
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