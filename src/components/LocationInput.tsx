import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';

interface Props {
  onPlanRoute: (source: string, destination: string) => void;
}

const LocationInput: React.FC<Props> = ({ onPlanRoute }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [stations, setStations] = useState<string[]>([]);

  // Parse stops.txt
  useEffect(() => {
    Papa.parse('/data/delhi-metro-gtfs/stops.txt', {
      header: true,
      download: true,
      complete: (result) => {
        const names = result.data
          .map((row: any) => row.stop_name?.trim())
          .filter((name: string) => name && name.length > 0);
        const unique = Array.from(new Set(names)).sort();
        setStations(unique);
      },
    });
  }, []);

  const options = stations.map((station) => ({
    value: station,
    label: station,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (source && destination) {
      onPlanRoute(source, destination);
    } else {
      alert("Please select both starting and destination stations.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center">Plan Your Metro Journey</h2>
      <p className="text-sm text-center text-gray-600">Get the fastest route with AI-powered recommendations</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Starting Location</label>
        <Select
          options={options}
          value={source ? { value: source, label: source } : null}
          onChange={(selected) => setSource(selected?.value || '')}
          placeholder="Select Starting Station"
          isClearable
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
        <Select
          options={options}
          value={destination ? { value: destination, label: destination } : null}
          onChange={(selected) => setDestination(selected?.value || '')}
          placeholder="Select Destination Station"
          isClearable
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Plan My Route
      </button>
    </form>
  );
};

export default LocationInput;
