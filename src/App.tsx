// Styles
import { useMemo } from 'react';
import './App.css';

// Components
import Map from './components/Map';
import Table from './components/Table';

// Data
import coordData from './data.json';

// Types
import { ProcessedData } from './types';

function App() {
  const processedData = useMemo<ProcessedData[]>(
    () =>
      coordData.mapData.map((d) => ({
        id: d.id,
        notes: d.information,
        engineerId: d.engineerId,
        coords: [d.coords.lat, d.coords.lng],
      })),
    []
  );

  return (
    <div className='app'>
      <h1>Map</h1>
      <Map data={processedData} />
      <div>
        <h1>Table</h1>
        <Table data={processedData} />
      </div>
    </div>
  );
}

export default App;
