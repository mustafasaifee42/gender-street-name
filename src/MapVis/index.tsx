import { geoMercator } from 'd3-geo';
import { useState } from 'react';
import { RoadDataType, GeometryDataType } from '../DataTypes';
import { COLORFORFEMALE, COLORFORMALE, NEUTRALCOLORONWHITE, NEUTRALCOLORONBLACK, TOPPADDING } from '../Constants';
import styled from 'styled-components';
import _ from 'lodash';

interface Props {
  data: { elements: RoadDataType[] };
  width: number;
  height: number;
  mapScale: number;
  translate: [number, number]
  darkMode: boolean;
}

interface TooltipProps {
  x: number;
  y: number;
  fill: string;
  darkMode: boolean;
}

interface Position {
  x: number;
  y: number;
}

interface SVGElProps {
  darkMode: boolean;
}

const SVGEl = styled.div<SVGElProps>`
  display: flex;
  justify-content: center;
  background-color: ${props => props.darkMode ? 'var(--black)' : 'var(--bg-color)'};
`;

const TooltipEl = styled.div<TooltipProps>`
  position: fixed;
  z-index: 1000;
  font-size: 14px;
  color: ${props => props.fill};
  font-weight: 700;
  padding: 5px 10px;
  left: ${props => props.x + 5}px;
  top: ${props => props.y - 15}px;
  background-color: ${props => props.darkMode ? 'rgba(44,44,44,0.8)' : 'rgba(255,255,255,0.8)'};
  border-radius: 2px;
  border: 1px solid ${props => props.darkMode ? 'var(--jet-black)' : 'var(--moderate-light-gray)'};
`;

export const MapVis = (props: Props) => {
  const {
    data,
    width,
    height,
    mapScale,
    translate,
    darkMode
  } = props
  const [roadName, setRoadName] = useState<string | undefined>(undefined)
  const [selectedRoadGender, setSelectedRoadGender] = useState<string | undefined>(undefined)
  const [tooltipPos, setTooltipPos] = useState<Position | undefined>(undefined)
  const projection = geoMercator().scale(mapScale).translate(translate);
  const strokeWidth = window.innerWidth / width < (window.innerHeight - TOPPADDING) / height ? width / window.innerWidth : height / (window.innerHeight - TOPPADDING);
  return (
    <>
      <SVGEl darkMode={darkMode}>
        <svg width={window.innerWidth} height={window.innerHeight - TOPPADDING} viewBox={`0 0 ${width} ${height}`}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          <g>
            {
              data.elements.map((d: RoadDataType, i: number) => {
                let path = "M"
                d.geometry.forEach((geo: GeometryDataType, j: number) => {
                  const point = projection([geo.lon, geo.lat]) as [number, number]
                  if (j !== d.geometry.length - 1)
                    path = path + `${point[0]} ${point[1]}L`
                  else
                    path = path + `${point[0]} ${point[1]}`
                })
                return <path
                  key={i}
                  d={path}
                  className={'streetPath'}
                  stroke={
                    d.tags.gender === "male" ? COLORFORMALE :
                      d.tags.gender === "female" ? COLORFORFEMALE :
                        darkMode ? NEUTRALCOLORONBLACK : NEUTRALCOLORONWHITE
                  }
                  strokeWidth={strokeWidth}
                  fill="none"
                  opacity={roadName ? roadName === d.tags.name ? "1" : "0.2" : "1"}
                  onMouseOver={(event) => {
                    setRoadName(d.tags.name);
                    setTooltipPos({ x: event.clientX, y: event.clientY });
                    setSelectedRoadGender(d.tags.gender);
                  }}
                  onMouseLeave={(event) => {
                    setRoadName(undefined);
                    setTooltipPos({ x: event.clientX, y: event.clientY });
                    setSelectedRoadGender(undefined);
                  }}
                />
              })
            }
          </g>
        </svg>
      </SVGEl>
      {
        roadName && tooltipPos && selectedRoadGender ?
          <TooltipEl
            x={tooltipPos.x}
            y={tooltipPos.y}
            fill={
              selectedRoadGender === "male" ? COLORFORMALE :
                selectedRoadGender === "female" ? COLORFORFEMALE :
                  darkMode ? 'var(--white)' : 'var(--black)'
            }
            darkMode={darkMode}
          >{roadName}</TooltipEl>
          : null
      }
    </>
  )
}


export const SplitMap = (props: Props) => {
  const {
    data,
    width,
    height,
    mapScale,
    translate,
    darkMode
  } = props
  const [roadName, setRoadName] = useState<string | undefined>(undefined)
  const [selectedRoadGender, setSelectedRoadGender] = useState<string | undefined>(undefined)
  const [tooltipPos, setTooltipPos] = useState<Position | undefined>(undefined)
  const projection = geoMercator().scale(mapScale).translate(translate);
  /*
  const coordinates = geoMercator().scale(mapScale)([77.1025, 28.7041]) as any
  console.log(coordinates)
  */
  const strokeWidth = ((window.innerWidth / 3) - 10) / width < (window.innerHeight - TOPPADDING) / height ? width / ((window.innerWidth / 3) - 10) : height / (window.innerHeight - TOPPADDING);
  return (
    <>
      <SVGEl darkMode={darkMode}>
        <svg width={(window.innerWidth / 3) - 10} height={window.innerHeight - TOPPADDING} viewBox={`0 0 ${width} ${height}`}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          {
            _.filter(data.elements, (o: RoadDataType) => o.tags.gender === 'male').map((d: RoadDataType, i: number) => {
              let path = "M"
              d.geometry.forEach((geo: GeometryDataType, j: number) => {
                const point = projection([geo.lon, geo.lat]) as [number, number]
                if (j !== d.geometry.length - 1)
                  path = path + `${point[0]} ${point[1]}L`
                else
                  path = path + `${point[0]} ${point[1]}`
              })
              return <path
                key={i}
                className={'streetPath'}
                d={path}
                stroke={COLORFORMALE}
                strokeWidth={strokeWidth}
                opacity={roadName ? roadName === d.tags.name ? "1" : "0.2" : "1"}
                fill="none"
                onMouseOver={(event) => {
                  setRoadName(d.tags.name);
                  setTooltipPos({ x: event.clientX, y: event.clientY });
                  setSelectedRoadGender(d.tags.gender);
                }}
                onMouseLeave={(event) => {
                  setRoadName(undefined);
                  setTooltipPos({ x: event.clientX, y: event.clientY });
                  setSelectedRoadGender(undefined);
                }}
              />
            })
          }
        </svg>
        <svg width={(window.innerWidth / 3) - 10} height={window.innerHeight - TOPPADDING} viewBox={`0 0 ${width} ${height}`}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          {
            _.filter(data.elements, (o: RoadDataType) => o.tags.gender === 'female').map((d: RoadDataType, i: number) => {
              let path = "M"
              d.geometry.forEach((geo: GeometryDataType, j: number) => {
                const point = projection([geo.lon, geo.lat]) as [number, number]
                if (j !== d.geometry.length - 1)
                  path = path + `${point[0]} ${point[1]}L`
                else
                  path = path + `${point[0]} ${point[1]}`
              })
              return <path
                key={i}
                className={'streetPath'}
                d={path}
                stroke={COLORFORFEMALE}
                strokeWidth={strokeWidth}
                fill="none"
                opacity={roadName ? roadName === d.tags.name ? "1" : "0.2" : "1"}
                onMouseOver={(event) => {
                  setRoadName(d.tags.name);
                  setTooltipPos({ x: event.clientX, y: event.clientY });
                  setSelectedRoadGender(d.tags.gender);
                }}
                onMouseLeave={(event) => {
                  setRoadName(undefined);
                  setTooltipPos({ x: event.clientX, y: event.clientY });
                  setSelectedRoadGender(undefined);
                }}
              />
            })
          }
        </svg>
        <svg width={(window.innerWidth / 3) - 10} height={window.innerHeight - TOPPADDING} viewBox={`0 0 ${width} ${height}`}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          {
            _.filter(data.elements, (o: RoadDataType) => o.tags.gender !== 'female' && o.tags.gender !== 'male').map((d: RoadDataType, i: number) => {
              let path = "M"
              d.geometry.forEach((geo: GeometryDataType, j: number) => {
                const point = projection([geo.lon, geo.lat]) as [number, number]
                if (j !== d.geometry.length - 1)
                  path = path + `${point[0]} ${point[1]}L`
                else
                  path = path + `${point[0]} ${point[1]}`
              })
              return <path
                key={i}
                d={path}
                stroke={
                  darkMode ? NEUTRALCOLORONBLACK :
                    NEUTRALCOLORONWHITE
                }
                className={'streetPath'}
                strokeWidth={strokeWidth}
                opacity={roadName ? roadName === d.tags.name ? "1" : "0.2" : "1"}
                fill="none"
                onMouseOver={(event) => {
                  setRoadName(d.tags.name);
                  setTooltipPos({ x: event.clientX, y: event.clientY });
                  setSelectedRoadGender(d.tags.gender);
                }}
                onMouseLeave={(event) => {
                  setRoadName(undefined);
                  setTooltipPos({ x: event.clientX, y: event.clientY });
                  setSelectedRoadGender(undefined);
                }}
              />
            })
          }
        </svg>
      </SVGEl>
      {
        roadName && tooltipPos && selectedRoadGender ?
          <TooltipEl
            x={tooltipPos.x}
            y={tooltipPos.y}
            fill={
              selectedRoadGender === "male" ? COLORFORMALE :
                selectedRoadGender === "female" ? COLORFORFEMALE :
                  darkMode ? 'var(--white)' : 'var(--black)'
            }
            darkMode={darkMode}
          >{roadName}</TooltipEl>
          : null
      }
    </>
  )
}