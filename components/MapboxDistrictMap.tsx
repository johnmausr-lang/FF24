'use client';

import * as React from 'react';
import Map, { Source, Layer, Popup, MapLayerMouseEvent } from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; // Это нужно для фикса бага с транспиляцией в Next.js

// CSS для Mapbox
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxDistrictMapProps {
  activeLocation: string;
  onSelect: (name: string) => void;
  mapboxToken: string;
}

// Координаты центра Сургутского района
const INITIAL_VIEW_STATE = {
  longitude: 73.4000,
  latitude: 61.2500,
  zoom: 6.5
};

// Стили для слоев (границы и заливка)
const fillLayer = {
  id: 'districts-fill',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'name'], 'active_placeholder'], // Будет заменено логикой ниже
      '#1e3a8a', // Цвет активного
      '#64748b'  // Цвет остальных
    ],
    'fill-opacity': [
      'case',
      ['==', ['get', 'name'], 'active_placeholder'],
      0.6,
      0.2
    ]
  }
};

const lineLayer = {
  id: 'districts-line',
  type: 'line',
  paint: {
    'line-color': '#ffffff',
    'line-width': 1,
    'line-opacity': 0.5
  }
};

export function MapboxDistrictMap({ activeLocation, onSelect, mapboxToken }: MapboxDistrictMapProps) {
  const [hoverInfo, setHoverInfo] = React.useState<any>(null);

  // Динамический стиль для активного региона
  const layerStyle = React.useMemo(() => {
    return {
      ...fillLayer,
      paint: {
        ...fillLayer.paint,
        'fill-color': [
          'case',
          ['==', ['get', 'name'], activeLocation],
          '#3b82f6', // Яркий синий для выбранного
          '#1e293b'  // Темный для остальных
        ],
        'fill-opacity': [
          'case',
          ['==', ['get', 'name'], activeLocation],
          0.7,
          0.3
        ]
      }
    } as any; // Приведение типов для TS
  }, [activeLocation]);

  const onHover = React.useCallback((event: MapLayerMouseEvent) => {
    const { features, point } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && hoveredFeature.properties ? {
      feature: hoveredFeature,
      x: point.x,
      y: point.y
    } : null);
  }, []);

  const onClick = React.useCallback((event: MapLayerMouseEvent) => {
    const feature = event.features && event.features[0];
    if (feature && feature.properties?.name) {
      onSelect(feature.properties.name);
    }
  }, [onSelect]);

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative">
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11" // Темная тема выглядит профессионально
        mapboxAccessToken={mapboxToken}
        interactiveLayerIds={['districts-fill']}
        onMouseMove={onHover}
        onClick={onClick}
        attributionControl={false} // Убираем логотип для чистоты (если позволяет лицензия)
      >
        {/* Источник данных GeoJSON */}
        <Source type="geojson" data="/geo/surgut_district.geojson"> 
          <Layer {...layerStyle} />
          <Layer {...lineLayer} />
        </Source>

        {/* Тултип при наведении */}
        {hoverInfo && (
          <div 
            className="absolute z-10 pointer-events-none bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg text-xs font-bold uppercase shadow-lg border border-blue-500/30"
            style={{left: hoverInfo.x + 10, top: hoverInfo.y + 10}}
          >
            {hoverInfo.feature.properties.name}
          </div>
        )}
      </Map>

      {/* Легенда поверх карты */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white text-[10px]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span className="font-bold uppercase">Выбрано</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-800 border border-white/20 rounded-sm"></div>
          <span className="font-bold uppercase text-slate-400">Территория</span>
        </div>
      </div>
    </div>
  );
}
