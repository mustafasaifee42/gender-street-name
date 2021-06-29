import styled from 'styled-components';

interface ToggleProps {
  selected?: boolean;
}

const ToggleBG = styled.button<ToggleProps>`
  width: 40px;
  height: 20px;
  background-color: ${props => props.selected ? 'var(--primary-color-very-light)' : 'rgba(255,255,255,0.2)'};
  border-radius: 20px;
  border: 1px solid var(--primary-color);
  cursor: pointer;
  padding: 0;
`

const ToggleCircle = styled.div<ToggleProps>`
  width: 18px;
  height: 18px;
  background-color: var(--primary-color);
  margin-left: ${props => !props.selected ? '0' : '20px'};
  border-radius: 20px;

`;

interface Props {
  selected: boolean;
  click: () => void;
}

const ToggleButton = (props: Props) => {
  const { selected, click } = props;
  return <ToggleBG selected={selected} onClick={() => { click() }}>
    <ToggleCircle selected={selected} />
  </ToggleBG>

}

export default ToggleButton