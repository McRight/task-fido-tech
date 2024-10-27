import { useEffect, useRef } from 'react';
import mapboxgl, { type Map as MapboxGL } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Constants
import { COORDS_BICESTER_OFFICE } from '../constants/mapbox';

// Types
import type { ProcessedData } from '../types';

// Utils
import { getRandomColor } from '../utils/getRandomColor';

// Dummy access token used for this tech test only
mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN;

type EngineerPoints = {
  points: {
    id: ProcessedData['id'];
    coords: ProcessedData['coords'];
  }[];
  color: string;
};

type MapTestPointsProps = { data: ProcessedData[] };

function MapTestPoints({ data }: MapTestPointsProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxGL>();

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: COORDS_BICESTER_OFFICE,
      zoom: 17.5,
    });

    mapRef.current.on('load', () => {
      const engineerPointsMap = new Map<
        ProcessedData['engineerId'],
        EngineerPoints
      >();

      // Assign points and a color to an engineer
      data.forEach((p) => {
        const engineer = engineerPointsMap.get(p.engineerId);
        const currentPoint = { id: p.id, coords: p.coords };

        if (engineer) {
          const newPoints = [...engineer.points, currentPoint];
          engineerPointsMap.set(p.engineerId, {
            ...engineer,
            points: newPoints,
          });
        } else {
          engineerPointsMap.set(p.engineerId, {
            color: getRandomColor(),
            points: [currentPoint],
          });
        }
      });

      // Plot the points on the map
      engineerPointsMap.forEach(({ color, points }, engineerId) => {
        if (!mapRef.current) return;

        mapRef.current.addSource(`points-${engineerId}`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',

            features: points.map((p) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: p.coords,
              },
              properties: {
                id: p.id,
              },
            })),
          },
        });

        mapRef.current.addLayer({
          id: `points-${engineerId}`,
          type: 'circle',
          source: `points-${engineerId}`,
          paint: {
            'circle-radius': 4,
            'circle-color': color,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#FFFFFF',
          },
        });
      });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [data]);

  return (
    <div
      ref={mapContainerRef}
      className='map'
    />
  );
}

export default MapTestPoints;
