import React, { useState, useMemo } from 'react';
import marketDataRaw from '../data/market-counts.json';
import flCountyPaths from '../data/florida-counties-paths.json';
import { Layers, ShieldCheck, Info } from 'lucide-react';

interface CityCount {
  city: string;
  filesWorked: number | string;
}

interface CountyRecord {
  county: string;
  fips: string;
  filesWorked: number | string;
  cities: CityCount[];
}

interface CountySvgPath {
  fips: string;
  name: string;
  path: string;
  centroid: [number, number];
}

// Geographic positions for top municipal hubs
interface TopCityMarker {
  city: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  textAnchor: 'start' | 'end' | 'middle';
}

const TOP_CITIES_CONFIG: TopCityMarker[] = [
  { city: 'Jacksonville', x: 517.5, y: 79.9, labelX: 526, labelY: 77, textAnchor: 'start' },
  { city: 'Saint Augustine', x: 545.3, y: 115.8, labelX: 554, labelY: 115, textAnchor: 'start' },
  { city: 'Orlando', x: 540.1, y: 227.2, labelX: 550, labelY: 225, textAnchor: 'start' },
  { city: 'Tampa', x: 452.2, y: 275.4, labelX: 442, labelY: 275, textAnchor: 'end' },
  { city: 'West Palm Beach', x: 648.2, y: 376.8, labelX: 658, labelY: 375, textAnchor: 'start' },
  { city: 'Cape Coral', x: 493.6, y: 389.3, labelX: 483, labelY: 388, textAnchor: 'end' },
  { city: 'Fort Myers', x: 499.9, y: 383.0, labelX: 489, labelY: 400, textAnchor: 'end' },
  { city: 'Fort Lauderdale', x: 641.3, y: 425.5, labelX: 652, labelY: 423, textAnchor: 'start' },
  { city: 'Naples', x: 506.2, y: 423.9, labelX: 496, labelY: 432, textAnchor: 'end' },
  { city: 'Miami', x: 636.9, y: 455.1, labelX: 648, labelY: 456, textAnchor: 'start' },
];

export const FloridaClosedDealsHeatMap: React.FC = () => {
  const [selectedFips, setSelectedFips] = useState<string>('12086'); // Miami-Dade default
  const [hoveredFips, setHoveredFips] = useState<string | null>(null);

  const countiesList: CountyRecord[] = useMemo(() => {
    return (marketDataRaw.counties as CountyRecord[]) || [];
  }, []);

  // Map FIPS to county data record
  const countyDataByFips = useMemo(() => {
    const map = new Map<string, CountyRecord>();
    countiesList.forEach((c) => {
      if (c.fips) map.set(c.fips, c);
    });
    return map;
  }, [countiesList]);

  // Dynamically calculate summary metrics strictly from county rows
  const stats = useMemo(() => {
    let numericTotal = 0;
    let underFiveCounties = 0;

    countiesList.forEach((c) => {
      if (typeof c.filesWorked === 'number') {
        numericTotal += c.filesWorked;
      } else {
        underFiveCounties++;
      }
    });

    return {
      totalNumericFiles: numericTotal,
      activeCounties: countiesList.length,
      underFiveCounties,
    };
  }, [countiesList]);

  // Look up current selected county
  const selectedCounty = useMemo(() => {
    return countyDataByFips.get(selectedFips) || countiesList[0];
  }, [countyDataByFips, selectedFips, countiesList]);

  // Dynamically query city files worked from JSON
  const getCityCount = (cityName: string): number | string => {
    for (const c of countiesList) {
      const found = c.cities.find((ci) => ci.city.toLowerCase() === cityName.toLowerCase());
      if (found) return found.filesWorked;
    }
    return 0;
  };

  // Color shading function based on file count
  const getFillColor = (county: CountyRecord | undefined) => {
    if (!county) return '#2A201C'; // Unrecorded Florida county outline
    if (typeof county.filesWorked !== 'number') return '#334155'; // 'Fewer than 5' (muted slate shading)
    if (county.filesWorked >= 250) return '#075960'; // 250+ (Miami-Dade, Broward)
    if (county.filesWorked >= 100) return '#0D9BA3'; // 100-249 (Lee)
    if (county.filesWorked >= 40) return '#20C5D2';  // 40-99 (Palm Beach)
    if (county.filesWorked >= 15) return '#6EE7B7';  // 15-39 (Collier, Orange, Hillsborough, Polk, Pasco, Volusia)
    return '#BAE6FD'; // 5-14 files
  };

  return (
    <div className="bg-white rounded-3xl border border-[#D8D2D4] shadow-sm overflow-hidden">
      {/* Header bar dynamically derived from JSON */}
      <div className="bg-[#EEEAEB] px-6 py-5 border-b border-[#D8D2D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#075960] text-white flex items-center justify-center font-bold">
            <Layers className="w-5 h-5 text-[#20C5D2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#3A2E29] font-serif">
              Florida Files Worked by County & Municipality
            </h3>
            <p className="text-xs text-slate-600">
              Aggregated transaction file counts (in-process and closed). Numbers read directly from <code className="font-mono bg-white px-1.5 py-0.5 rounded border text-[#075960]">src/data/market-counts.json</code>.
            </p>
          </div>
        </div>

        {/* Dynamic Metric Badges calculated directly from county rows */}
        <div className="flex items-center space-x-3 flex-wrap">
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#D8D2D4] text-xs">
            <span className="text-slate-500 font-medium">Files Worked Documented:</span>{' '}
            <strong className="text-[#075960] font-bold">{stats.totalNumericFiles.toLocaleString()}+</strong>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#D8D2D4] text-xs">
            <span className="text-slate-500 font-medium">Counties Documented:</span>{' '}
            <strong className="text-[#3A2E29] font-bold">{stats.activeCounties} Counties</strong>
          </div>
        </div>
      </div>

      {/* Main Heat Map Display & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
        
        {/* Left Column: Interactive Florida SVG Heat Map with Real County Outlines */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-[#1A1412] rounded-2xl p-4 sm:p-6 border border-[#3A2E29] shadow-inner relative">
            
            {/* SVG Map of Florida with Real County Outlines from Census data */}
            <svg
              viewBox="0 0 760 580"
              className="w-full h-auto max-h-[480px] drop-shadow-md select-none"
              aria-label="Florida Closed-Deal Heat Map"
            >
              {/* Background Coordinate grid */}
              <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.8">
                <line x1="100" y1="0" x2="100" y2="580" />
                <line x1="220" y1="0" x2="220" y2="580" />
                <line x1="340" y1="0" x2="340" y2="580" />
                <line x1="460" y1="0" x2="460" y2="580" />
                <line x1="580" y1="0" x2="580" y2="580" />
                <line x1="700" y1="0" x2="700" y2="580" />
                <line x1="0" y1="100" x2="760" y2="100" />
                <line x1="0" y1="200" x2="760" y2="200" />
                <line x1="0" y1="300" x2="760" y2="300" />
                <line x1="0" y1="400" x2="760" y2="400" />
                <line x1="0" y1="500" x2="760" y2="500" />
              </g>

              {/* Real Florida County Boundaries (All 67 counties rendered dynamically) */}
              <g className="county-boundaries">
                {(flCountyPaths as CountySvgPath[]).map((cp) => {
                  const data = countyDataByFips.get(cp.fips);
                  const isSelected = selectedFips === cp.fips;
                  const isHovered = hoveredFips === cp.fips;
                  const fillColor = getFillColor(data);
                  const isClickable = !!data;

                  return (
                    <path
                      key={cp.fips}
                      d={cp.path}
                      fill={fillColor}
                      stroke={isSelected ? '#FE7311' : isHovered ? '#FFFFFF' : '#1A1412'}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 1.8 : 0.7}
                      strokeLinejoin="round"
                      className={`transition-colors duration-150 ${isClickable ? 'cursor-pointer hover:opacity-90' : 'cursor-default'}`}
                      onClick={() => {
                        if (data) setSelectedFips(cp.fips);
                      }}
                      onMouseEnter={() => setHoveredFips(cp.fips)}
                      onMouseLeave={() => setHoveredFips(null)}
                    >
                      <title>
                        {data
                          ? `${data.county}: ${typeof data.filesWorked === 'number' ? `${data.filesWorked} files` : data.filesWorked}`
                          : `${cp.name} County`}
                      </title>
                    </path>
                  );
                })}
              </g>

              {/* Top Cities Labeled with Dynamic File Counts */}
              <g className="top-cities-labels pointer-events-none">
                {TOP_CITIES_CONFIG.map((m) => {
                  const count = getCityCount(m.city);
                  return (
                    <g key={m.city} className="transition-transform duration-200">
                      {/* Pointer line connecting city point to label if offset */}
                      {Math.abs(m.labelX - m.x) > 6 && (
                        <line
                          x1={m.x}
                          y1={m.y}
                          x2={m.labelX}
                          y2={m.labelY - 3}
                          stroke="#FFFFFF"
                          strokeOpacity="0.4"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        />
                      )}
                      {/* City Marker Dot */}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r="3.5"
                        fill="#FE7311"
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                      />
                      {/* Text Label: City Name & Count */}
                      <text
                        x={m.labelX}
                        y={m.labelY}
                        textAnchor={m.textAnchor}
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="700"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.9))"
                      >
                        {m.city} ({count})
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Heat Map Legend */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <span className="font-semibold text-white">Files Worked Intensity:</span>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="inline-flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-xs bg-[#075960] inline-block border border-white/20"></span>
                  <span>250+</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-xs bg-[#0D9BA3] inline-block"></span>
                  <span>100–249</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-xs bg-[#20C5D2] inline-block"></span>
                  <span>40–99</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-xs bg-[#6EE7B7] inline-block"></span>
                  <span>15–39</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-xs bg-[#BAE6FD] inline-block"></span>
                  <span>5–14</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-xs bg-[#334155] inline-block"></span>
                  <span className="text-slate-400">Fewer than 5</span>
                </span>
              </div>
            </div>

          </div>

          <p className="text-[11px] text-slate-500 mt-2 text-center flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#075960]" />
            <span>Strict Client Privacy: Aggregated county and municipal data only. No property-level pins or addresses.</span>
          </p>
        </div>

        {/* Right Column: Dynamic County & Municipal Breakdown Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="bg-[#EEEAEB] rounded-2xl p-5 sm:p-6 border border-[#D8D2D4] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block">
                  County Record
                </span>
                <h4 className="text-2xl font-extrabold text-[#3A2E29] font-serif mt-1">
                  {selectedCounty?.county}
                </h4>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Files</span>
                <span className="text-2xl font-black text-[#075960]">
                  {typeof selectedCounty?.filesWorked === 'number'
                    ? selectedCounty.filesWorked.toLocaleString()
                    : selectedCounty?.filesWorked}
                </span>
              </div>
            </div>

            {/* City Level Breakdown from JSON */}
            <div className="space-y-2 pt-2 border-t border-[#D8D2D4]">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Top Municipalities & Cities (Aggregated)
              </span>

              {selectedCounty?.cities && selectedCounty.cities.length > 0 ? (
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {selectedCounty.cities.map((city, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs bg-white px-3 py-2 rounded-lg border border-[#D8D2D4]"
                    >
                      <span className={`font-medium ${city.city.startsWith('Other cities') ? 'text-slate-500 italic' : 'text-[#3A2E29]'}`}>
                        {city.city}
                      </span>
                      <span className="font-bold text-[#075960] bg-[#075960]/10 px-2 py-0.5 rounded">
                        {typeof city.filesWorked === 'number' ? `${city.filesWorked} files` : city.filesWorked}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No municipal breakdown recorded.</p>
              )}
            </div>

            {/* Selection Guidance */}
            <div className="flex items-center space-x-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-[#D8D2D4]">
              <Info className="w-4 h-4 text-[#075960] flex-shrink-0" />
              <span>Click any shaded Florida county on the map to inspect its municipal transaction count.</span>
            </div>
          </div>

          {/* Quick Selector Dropdown for Accessibility */}
          <div className="space-y-2">
            <label htmlFor="county-selector" className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Select County:
            </label>
            <select
              id="county-selector"
              value={selectedFips}
              onChange={(e) => setSelectedFips(e.target.value)}
              className="w-full bg-white border border-[#D8D2D4] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#3A2E29] focus:outline-none focus:ring-2 focus:ring-[#075960] cursor-pointer"
            >
              {countiesList.map((c) => (
                <option key={c.fips} value={c.fips}>
                  {c.county} ({typeof c.filesWorked === 'number' ? `${c.filesWorked} files` : c.filesWorked})
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
