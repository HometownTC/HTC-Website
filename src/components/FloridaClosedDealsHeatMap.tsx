import React, { useState, useMemo } from 'react';
import marketDataRaw from '../data/market-counts.json';
import { Layers, ShieldCheck, MapPin, Info } from 'lucide-react';

interface CityCount {
  cityName: string;
  files: number | string;
}

interface CountyData {
  countyId: string;
  countyName: string;
  region: string;
  fips: string;
  totalFiles: number | string;
  tier: string;
  status: string;
  cities: CityCount[];
}

export const FloridaClosedDealsHeatMap: React.FC = () => {
  const [selectedCountyId, setSelectedCountyId] = useState<string>('miami-dade');

  const counties: CountyData[] = (marketDataRaw.counties as CountyData[]) || [];

  // Dynamically calculate summary metrics from JSON (never hardcoded)
  const stats = useMemo(() => {
    let numericTotal = 0;
    let highCounties = 0;
    let underFiveCounties = 0;

    counties.forEach((c) => {
      if (typeof c.totalFiles === 'number') {
        numericTotal += c.totalFiles;
        if (c.totalFiles >= 20) highCounties++;
      } else {
        underFiveCounties++;
      }
    });

    return {
      totalFiles: marketDataRaw.summary?.totalFilesReported || numericTotal,
      activeCounties: counties.length,
      primaryMarkets: marketDataRaw.summary?.primaryMarkets || []
    };
  }, [counties]);

  const selectedCounty = useMemo(() => {
    return counties.find((c) => c.countyId === selectedCountyId) || counties[0];
  }, [counties, selectedCountyId]);

  // Color shading function based on file count
  const getFillColor = (county: CountyData | undefined) => {
    if (!county) return '#F1F5F9';
    if (typeof county.totalFiles !== 'number') return '#E2E8F0'; // Fewer than 5
    if (county.totalFiles >= 250) return '#075960'; // Deepest Teal (Top tier)
    if (county.totalFiles >= 100) return '#0D9BA3'; // Vibrant Cyan/Teal
    if (county.totalFiles >= 40) return '#20C5D2';  // Mid Teal
    if (county.totalFiles >= 15) return '#6EE7B7';  // Light Cyan
    return '#BAE6FD'; // 5-14 files
  };

  return (
    <div className="bg-white rounded-3xl border border-[#D8D2D4] shadow-sm overflow-hidden">
      {/* Header bar dynamically derived from JSON metadata */}
      <div className="bg-[#EEEAEB] px-6 py-5 border-b border-[#D8D2D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#075960] text-white flex items-center justify-center font-bold">
            <Layers className="w-5 h-5 text-[#20C5D2]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#3A2E29] font-serif">
              Florida Files Worked by Market & Municipality
            </h3>
            <p className="text-xs text-slate-600">
              Aggregated transaction file counts (in-process and closed). Data read directly from <code className="font-mono bg-white px-1.5 py-0.5 rounded border text-[#075960]">src/data/market-counts.json</code>.
            </p>
          </div>
        </div>

        {/* Dynamic Metric Badges */}
        <div className="flex items-center space-x-3 flex-wrap">
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#D8D2D4] text-xs">
            <span className="text-slate-500 font-medium">Total Files Documented:</span>{' '}
            <strong className="text-[#075960] font-bold">{stats.totalFiles.toLocaleString()}+</strong>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg border border-[#D8D2D4] text-xs">
            <span className="text-slate-500 font-medium">Active Markets:</span>{' '}
            <strong className="text-[#3A2E29] font-bold">{stats.activeCounties} Counties</strong>
          </div>
        </div>
      </div>

      {/* Main Heat Map Display & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
        
        {/* Left Column: Interactive Florida SVG Heat Map */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-[#1A1412] rounded-2xl p-4 sm:p-6 border border-[#3A2E29] shadow-inner relative">
            
            {/* SVG Map of Florida with County Regions */}
            <svg
              viewBox="0 0 650 520"
              className="w-full h-auto max-h-[460px] drop-shadow-md select-none"
              aria-label="Florida Closed-Deal Heat Map"
            >
              <defs>
                <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Coordinate grid for tactical look */}
              <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.8">
                <line x1="80" y1="0" x2="80" y2="520" />
                <line x1="180" y1="0" x2="180" y2="520" />
                <line x1="280" y1="0" x2="280" y2="520" />
                <line x1="380" y1="0" x2="380" y2="520" />
                <line x1="480" y1="0" x2="480" y2="520" />
                <line x1="580" y1="0" x2="580" y2="520" />
                <line x1="0" y1="100" x2="650" y2="100" />
                <line x1="0" y1="200" x2="650" y2="200" />
                <line x1="0" y1="300" x2="650" y2="300" />
                <line x1="0" y1="400" x2="650" y2="400" />
              </g>

              {/* Base Florida Mainland Silhouette */}
              <path
                d="M 60 140 L 260 140 L 320 155 L 420 160 L 440 180 L 460 220 L 480 270 L 510 350 L 535 430 L 540 480 L 520 495 L 490 490 L 460 460 L 420 420 L 390 350 L 350 280 L 290 240 L 210 230 L 110 220 L 60 140 Z"
                fill="#27211E"
                stroke="#3E3430"
                strokeWidth="1.5"
              />

              {/* Panhandle / Northwest (Base outline) */}
              <path
                d="M 60 140 L 260 140 L 260 200 L 110 215 L 60 140 Z"
                fill="#2F2724"
                stroke="#473C37"
                strokeWidth="1"
              />

              {/* Orange County / Central FL */}
              <g
                onClick={() => setSelectedCountyId('orange')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <rect
                  x="390"
                  y="265"
                  width="45"
                  height="35"
                  rx="4"
                  fill={getFillColor(counties.find(c => c.countyId === 'orange'))}
                  stroke={selectedCountyId === 'orange' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'orange' ? 2.5 : 1}
                />
                <text x="412" y="286" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                  ORANGE
                </text>
              </g>

              {/* Hillsborough County / Tampa */}
              <g
                onClick={() => setSelectedCountyId('hillsborough')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <rect
                  x="340"
                  y="285"
                  width="44"
                  height="34"
                  rx="4"
                  fill={getFillColor(counties.find(c => c.countyId === 'hillsborough'))}
                  stroke={selectedCountyId === 'hillsborough' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'hillsborough' ? 2.5 : 1}
                />
                <text x="362" y="306" textAnchor="middle" fill="#1A1412" fontSize="8" fontWeight="bold">
                  TAMPA
                </text>
              </g>

              {/* Pinellas County / St. Pete */}
              <g
                onClick={() => setSelectedCountyId('pinellas')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <rect
                  x="315"
                  y="292"
                  width="22"
                  height="30"
                  rx="4"
                  fill={getFillColor(counties.find(c => c.countyId === 'pinellas'))}
                  stroke={selectedCountyId === 'pinellas' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'pinellas' ? 2.5 : 1}
                />
                <text x="326" y="310" textAnchor="middle" fill="#1A1412" fontSize="7" fontWeight="bold">
                  PIN
                </text>
              </g>

              {/* Sarasota County (Southwest FL) */}
              <g
                onClick={() => setSelectedCountyId('sarasota')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <path
                  d="M 370 335 L 405 340 L 395 375 L 360 365 Z"
                  fill={getFillColor(counties.find(c => c.countyId === 'sarasota'))}
                  stroke={selectedCountyId === 'sarasota' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'sarasota' ? 2.5 : 1}
                />
                <text x="382" y="357" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                  SARASOTA
                </text>
              </g>

              {/* Charlotte County (Southwest FL - <5) */}
              <g
                onClick={() => setSelectedCountyId('charlotte')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <rect
                  x="385"
                  y="380"
                  width="36"
                  height="26"
                  rx="3"
                  fill={getFillColor(counties.find(c => c.countyId === 'charlotte'))}
                  stroke={selectedCountyId === 'charlotte' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'charlotte' ? 2.5 : 1}
                />
                <text x="403" y="396" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">
                  CHARL.
                </text>
              </g>

              {/* Lee County (Fort Myers / Cape Coral - Southwest FL) */}
              <g
                onClick={() => setSelectedCountyId('lee')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <path
                  d="M 405 408 L 448 408 L 442 445 L 398 440 Z"
                  fill={getFillColor(counties.find(c => c.countyId === 'lee'))}
                  stroke={selectedCountyId === 'lee' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'lee' ? 2.5 : 1}
                />
                <text x="422" y="428" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">
                  LEE (SWFL)
                </text>
              </g>

              {/* Collier County (Naples / Marco Island - Southwest FL) */}
              <g
                onClick={() => setSelectedCountyId('collier')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <path
                  d="M 425 448 L 485 450 L 478 488 L 420 480 Z"
                  fill={getFillColor(counties.find(c => c.countyId === 'collier'))}
                  stroke={selectedCountyId === 'collier' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'collier' ? 2.5 : 1}
                />
                <text x="452" y="470" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">
                  COLLIER
                </text>
              </g>

              {/* Treasure Coast: St. Lucie & Martin (< 5) */}
              <g
                onClick={() => setSelectedCountyId('martin')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <rect
                  x="480"
                  y="348"
                  width="36"
                  height="26"
                  rx="3"
                  fill={getFillColor(counties.find(c => c.countyId === 'martin'))}
                  stroke={selectedCountyId === 'martin' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'martin' ? 2.5 : 1}
                />
                <text x="498" y="364" textAnchor="middle" fill="#475569" fontSize="7" fontWeight="bold">
                  TREASURE
                </text>
              </g>

              {/* Palm Beach County */}
              <g
                onClick={() => setSelectedCountyId('palm-beach')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <path
                  d="M 470 376 L 525 382 L 522 418 L 465 410 Z"
                  fill={getFillColor(counties.find(c => c.countyId === 'palm-beach'))}
                  stroke={selectedCountyId === 'palm-beach' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'palm-beach' ? 2.5 : 1}
                />
                <text x="495" y="401" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                  PALM BEACH
                </text>
              </g>

              {/* Broward County */}
              <g
                onClick={() => setSelectedCountyId('broward')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <path
                  d="M 465 420 L 532 425 L 530 458 L 460 452 Z"
                  fill={getFillColor(counties.find(c => c.countyId === 'broward'))}
                  stroke={selectedCountyId === 'broward' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'broward' ? 2.5 : 1}
                />
                <text x="498" y="442" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  BROWARD
                </text>
              </g>

              {/* Miami-Dade County */}
              <g
                onClick={() => setSelectedCountyId('miami-dade')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <path
                  d="M 460 460 L 530 465 L 522 505 L 455 498 Z"
                  fill={getFillColor(counties.find(c => c.countyId === 'miami-dade'))}
                  stroke={selectedCountyId === 'miami-dade' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'miami-dade' ? 2.5 : 1}
                />
                <text x="492" y="485" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
                  MIAMI-DADE
                </text>
              </g>

              {/* Monroe / Keys (< 5) */}
              <g
                onClick={() => setSelectedCountyId('monroe')}
                className="cursor-pointer transition hover:opacity-90"
              >
                <ellipse
                  cx="440"
                  cy="508"
                  rx="26"
                  ry="8"
                  fill={getFillColor(counties.find(c => c.countyId === 'monroe'))}
                  stroke={selectedCountyId === 'monroe' ? '#FE7311' : '#1A1412'}
                  strokeWidth={selectedCountyId === 'monroe' ? 2.5 : 1}
                />
                <text x="440" y="511" textAnchor="middle" fill="#475569" fontSize="6.5" fontWeight="bold">
                  KEYS (&lt;5)
                </text>
              </g>

            </svg>

            {/* Heat Map Legend */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <span className="font-semibold text-white">Files Worked Intensity:</span>
              <div className="flex items-center space-x-2">
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
                  <span className="w-3 h-3 rounded-xs bg-[#E2E8F0] inline-block"></span>
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
                <span className="text-xs uppercase font-bold tracking-wider text-[#075960] bg-white px-2.5 py-1 rounded-md border border-[#D8D2D4] inline-block">
                  {selectedCounty.region}
                </span>
                <h4 className="text-2xl font-extrabold text-[#3A2E29] font-serif mt-2">
                  {selectedCounty.countyName}
                </h4>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Files</span>
                <span className="text-2xl font-black text-[#075960]">
                  {typeof selectedCounty.totalFiles === 'number'
                    ? selectedCounty.totalFiles.toLocaleString()
                    : selectedCounty.totalFiles}
                </span>
              </div>
            </div>

            {/* City Level Breakdown from JSON */}
            <div className="space-y-2 pt-2 border-t border-[#D8D2D4]">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Top Municipalities & Cities (Aggregated)
              </span>

              {selectedCounty.cities && selectedCounty.cities.length > 0 ? (
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {selectedCounty.cities.map((city, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs bg-white px-3 py-2 rounded-lg border border-[#D8D2D4]"
                    >
                      <span className={`font-medium ${city.cityName === 'Other cities' ? 'text-slate-500 italic' : 'text-[#3A2E29]'}`}>
                        {city.cityName}
                      </span>
                      <span className="font-bold text-[#075960] bg-[#075960]/10 px-2 py-0.5 rounded">
                        {typeof city.files === 'number' ? `${city.files} files` : city.files}
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
              <span>Click any highlighted Florida county on the map to inspect its municipal transaction count.</span>
            </div>
          </div>

          {/* Quick Selector Dropdown for Accessibility */}
          <div className="space-y-2">
            <label htmlFor="county-selector" className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Select County by Name:
            </label>
            <select
              id="county-selector"
              value={selectedCountyId}
              onChange={(e) => setSelectedCountyId(e.target.value)}
              className="w-full bg-white border border-[#D8D2D4] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#3A2E29] focus:outline-none focus:ring-2 focus:ring-[#075960] cursor-pointer"
            >
              {counties.map((c) => (
                <option key={c.countyId} value={c.countyId}>
                  {c.countyName} ({typeof c.totalFiles === 'number' ? `${c.totalFiles} files` : c.totalFiles}) — {c.region}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
