import "./App.css";
import Map from "./components/Map";
import Table from "./components/Table";

function App() {
  const processedData: any[] = [];
  return (
    <div className="app">
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
