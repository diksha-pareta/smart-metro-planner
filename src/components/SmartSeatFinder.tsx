import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Select from 'react-select';
import { getSmartSeatSuggestion } from '../services/geminiService';
import { Lightbulb } from 'lucide-react';

const SmartSeatFinder = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [stations, setStations] = useState<string[]>([]);
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });
  const [flexible, setFlexible] = useState(false);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const stationOptions = stations.map((station) => ({
    value: station,
    label: station,
  }));

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
      error: (err) => {
        console.error('Error loading station data:', err);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      alert("Please select both origin and destination");
      return;
    }

    setLoading(true);
    try {
      const suggestion = await getSmartSeatSuggestion(origin, destination, time, flexible);
      setResponse(suggestion);
    } catch (err) {
      console.error('Error fetching suggestion:', err);
      setResponse("Failed to fetch seat suggestions. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="h-6 w-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-800">Smart Seat Finder</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Find stations where you're more likely to get a seat based on crowd prediction.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            options={stationOptions}
            value={origin ? { value: origin, label: origin } : null}
            onChange={(selected) => setOrigin(selected?.value || '')}
            placeholder="Select Origin Station"
            isClearable
          />

          <Select
            options={stationOptions}
            value={destination ? { value: destination, label: destination } : null}
            onChange={(selected) => setDestination(selected?.value || '')}
            placeholder="Select Destination Station"
            isClearable
          />

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600">Preferred Travel Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-44"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={flexible}
              onChange={() => setFlexible(!flexible)}
            />
            I’m okay walking 1–2 stations
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {loading ? 'Finding suggestions…' : 'Find Best Seat Option'}
          </button>
        </form>
      </div>

      {response && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Seat Suggestion Result</h3>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-gray-800">
            {response
              .split(/\n\s*\*\s/)
              .filter(Boolean)
              .map((section, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-green-50 via-white to-blue-50 border-l-4 border-green-400 shadow-md p-4 rounded"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>'),
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSeatFinder;
