import { geoMercator } from 'd3-geo';
import { select } from 'd3-selection';
import { useState, useEffect, useRef } from 'react';
import { RoadDataType, GeometryDataType } from '../DataTypes';
import { COLORFORFEMALE, COLORFORMALE, NEUTRALCOLORONWHITE, NEUTRALCOLORONBLACK, TOPPADDING } from '../Constants';
import styled from 'styled-components';
import _ from 'lodash';
import { zoom } from 'd3-zoom';

interface Props {
  data: RoadDataType[];
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

  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);

  useEffect(() => {
    const mapGSelect = select(mapG.current);
    const mapSvgSelect = select(mapSvg.current);
    const zoomBehaviour = zoom()
      .scaleExtent([1, 3])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', ({ transform }) => {
        mapGSelect.attr('transform', transform);
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSvgSelect.call(zoomBehaviour as any);
  }, [height, width]);
  return (
    <>
      <SVGEl darkMode={darkMode}>
        <svg style={{ height: `calc(100vh - ${TOPPADDING}px)`, width: '100vw' }} viewBox={`0 0 ${width} ${height}`} ref={mapSvg}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          <g ref={mapG}>
            {
              data.sort((a: RoadDataType, b: RoadDataType) => a.tags.gender > b.tags.gender ? -1 : 1).map((d: RoadDataType, i: number) => {
                let masterPath = ""
                d.geometry.forEach((geo: GeometryDataType[], j: number) => {
                  let path = " M"
                  geo.forEach((c: GeometryDataType, k: number) => {
                    const point = projection([c.lon, c.lat]) as [number, number]
                    if (k !== geo.length - 1)
                      path = path + `${point[0]} ${point[1]}L`
                    else
                      path = path + `${point[0]} ${point[1]}`
                  })
                  masterPath = masterPath + path
                })
                return <path
                  key={i}
                  d={masterPath}
                  className={'streetPath'}
                  stroke={
                    d.tags.gender === "male" || d.tags.gender === "transgender male" ? COLORFORMALE :
                      d.tags.gender === "female" || d.tags.gender === "transgender female" ? COLORFORFEMALE :
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
              selectedRoadGender === "male" || selectedRoadGender === "transgender male" ? COLORFORMALE :
                selectedRoadGender === "female" || selectedRoadGender === "transgender female" ? COLORFORFEMALE :
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
  const coordinates = geoMercator().scale(mapScale)([52.5200, 13.4050]) as any
  console.log(coordinates)
  */
  const mapMaleSvg = useRef<SVGSVGElement>(null);
  const mapMaleG = useRef<SVGGElement>(null);
  const mapFemaleSvg = useRef<SVGSVGElement>(null);
  const mapFemaleG = useRef<SVGGElement>(null);
  const mapUngenderedSvg = useRef<SVGSVGElement>(null);
  const mapUngenderedG = useRef<SVGGElement>(null);

  useEffect(() => {
    const mapMaleGSelect = select(mapMaleG.current);
    const mapMaleSvgSelect = select(mapMaleSvg.current);
    const mapFemaleGSelect = select(mapFemaleG.current);
    const mapFemaleSvgSelect = select(mapFemaleSvg.current);
    const mapUngenderedGSelect = select(mapUngenderedG.current);
    const mapUngenderedSvgSelect = select(mapUngenderedSvg.current);
    const zoomBehaviour = zoom()
      .scaleExtent([1, 3])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', ({ transform }) => {
        mapMaleGSelect.attr('transform', transform);
        mapFemaleGSelect.attr('transform', transform);
        mapUngenderedGSelect.attr('transform', transform);
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapMaleSvgSelect.call(zoomBehaviour as any);
    mapFemaleSvgSelect.call(zoomBehaviour as any);
    mapUngenderedSvgSelect.call(zoomBehaviour as any);
  }, [height, width]);

  const strokeWidth = ((window.innerWidth / 3) - 10) / width < (window.innerHeight - TOPPADDING) / height ? width / ((window.innerWidth / 3) - 10) : height / (window.innerHeight - TOPPADDING);
  return (
    <>
      <SVGEl darkMode={darkMode}>
        <svg style={{ height: `calc(100vh - ${TOPPADDING}px)`, width: 'calc(33.33vw - 10px)' }} viewBox={`0 0 ${width} ${height}`} ref={mapMaleSvg}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          <g ref={mapMaleG}>
            {
              _.filter(data, (o: RoadDataType) => o.tags.gender === 'male' || o.tags.gender === 'transgender male').map((d: RoadDataType, i: number) => {
                let masterPath = ""
                d.geometry.forEach((geo: GeometryDataType[], j: number) => {
                  let path = " M"
                  geo.forEach((c: GeometryDataType, k: number) => {
                    const point = projection([c.lon, c.lat]) as [number, number]
                    if (k !== geo.length - 1)
                      path = path + `${point[0]} ${point[1]}L`
                    else
                      path = path + `${point[0]} ${point[1]}`
                  })
                  masterPath = masterPath + path
                })
                return <path
                  key={i}
                  className={'streetPath'}
                  d={masterPath}
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
          </g>
        </svg>
        <svg style={{ height: `calc(100vh - ${TOPPADDING}px)`, width: 'calc(33.33vw - 10px)' }} viewBox={`0 0 ${width} ${height}`} ref={mapFemaleSvg}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          <g ref={mapFemaleG}>
            {
              _.filter(data, (o: RoadDataType) => o.tags.gender === 'female' || o.tags.gender === 'transgender female').map((d: RoadDataType, i: number) => {
                let masterPath = ""
                d.geometry.forEach((geo: GeometryDataType[], j: number) => {
                  let path = " M"
                  geo.forEach((c: GeometryDataType, k: number) => {
                    const point = projection([c.lon, c.lat]) as [number, number]
                    if (k !== geo.length - 1)
                      path = path + `${point[0]} ${point[1]}L`
                    else
                      path = path + `${point[0]} ${point[1]}`
                  })
                  masterPath = masterPath + path
                })
                return <path
                  key={i}
                  className={'streetPath'}
                  d={masterPath}
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
          </g>
        </svg>
        <svg style={{ height: `calc(100vh - ${TOPPADDING}px)`, width: 'calc(33.33vw - 10px)' }} viewBox={`0 0 ${width} ${height}`} ref={mapUngenderedSvg}>
          <rect x='0' y='0' width={width} height={height} style={darkMode ? { fill: 'var(--black)' } : { fill: 'var(--bg-color)' }} />
          <g ref={mapUngenderedG}>
            {

              _.filter(data, (o: RoadDataType) => o.tags.gender !== 'female' && o.tags.gender !== 'male' && o.tags.gender !== 'transgender female' && o.tags.gender !== 'transgender male').map((d: RoadDataType, i: number) => {
                let masterPath = ""
                d.geometry.forEach((geo: GeometryDataType[], j: number) => {
                  let path = " M"
                  geo.forEach((c: GeometryDataType, k: number) => {
                    const point = projection([c.lon, c.lat]) as [number, number]
                    if (k !== geo.length - 1)
                      path = path + `${point[0]} ${point[1]}L`
                    else
                      path = path + `${point[0]} ${point[1]}`
                  })
                  masterPath = masterPath + path
                })
                return <path
                  key={i}
                  d={masterPath}
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
          </g>
        </svg>
      </SVGEl>
      {
        roadName && tooltipPos && selectedRoadGender ?
          <TooltipEl
            x={tooltipPos.x}
            y={tooltipPos.y}
            fill={
              selectedRoadGender === "male" || selectedRoadGender === "transgender male" ? COLORFORMALE :
                selectedRoadGender === "female" || selectedRoadGender === "transgender female" ? COLORFORFEMALE :
                  darkMode ? 'var(--white)' : 'var(--black)'
            }
            darkMode={darkMode}
          >{roadName}</TooltipEl>
          : null
      }
    </>
  )
}