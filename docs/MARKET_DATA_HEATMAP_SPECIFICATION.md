# Hometown TC — Closed-Deal Heat Map & Market Data Specification
**Document ID:** HTC-SPEC-HEATMAP-01  
**Project Book Version:** v1.3 (Section 13 — Florida Market Footprint & Heat Map)  
**Author:** Engineering Team  
**Reviewer:** Michelle Martinez, Founder & CEO  
**Data Source File:** `src/data/market-counts.json` (converted directly from `HTC_Files_Worked_by_Area.csv`)  
**County Boundary Geometries:** Real Florida Census County SVG Outlines in `src/data/florida-counties-paths.json`  
**City Coordinates Database:** Geographic Map Positions in `src/data/florida-cities-coordinates.json`  
**Render Component:** `src/components/FloridaClosedDealsHeatMap.tsx` on `/why-htc/`  
**Date:** October 21, 2026  

---

## 1. Architectural Principles & Live Data Handover

As required by **Project Book v1.3 Section 13** and Michelle Martinez's direct specifications:
* **Zero Hardcoded Numbers:** Neither the SVG map, the React component, nor the page text hard-codes any transaction counts, percentages, or regional marketing claims.
* **Dynamically Calculated Totals:** Summary metrics are calculated directly by summing numeric county rows at runtime (1,830 files across 21 numeric counties, plus 11 counties marked "Fewer than 5"). No total counts are typed into the JSON.
* **Real Florida County Outlines:** All Florida counties are rendered using genuine geographic Census county boundary paths (`src/data/florida-counties-paths.json`) matched dynamically by 5-digit FIPS code (e.g., 12086 for Miami-Dade, 12011 for Broward, 12071 for Lee).
* **Automatic County Ingestion:** The map iterates through the county paths and looks up each county in `src/data/market-counts.json`. Any county added to or modified in the JSON immediately appears with its proper shading without any React or SVG code changes.
* **Dynamic Top Municipal Labels:** The map dynamically sorts all municipalities in `src/data/market-counts.json` by file count, extracts the top 10 cities (Miami: 552, Homestead: 128, Cape Coral: 77, Miami Beach: 65, Hialeah: 46, Fort Lauderdale: 44, Coral Gables: 41, Pompano Beach: 38, Pembroke Pines: 37, Miami Gardens: 31), and looks up their map coordinates from the separate `src/data/florida-cities-coordinates.json` file. A new data file automatically updates the labeled cities and counts without code changes.
* **Zero Labels on "<5" Areas:** Counties marked "Fewer than 5" receive shading only; no regional labels or text appear on these areas.

---

## 2. Privacy & Aggregation Standards

To safeguard agent client relationships and comply with strict real estate privacy guidelines:
1. **No Property-Level PII:** The system **never** accepts, stores, or renders street addresses, property APNs, client names, or individual transaction records.
2. **"Other cities" Threshold (< 5):** Any municipality or city with fewer than 5 files is automatically grouped into `"Other cities (grouped)"` within its respective county.
3. **County Privacy Threshold (< 5):** Any county with fewer than 5 files is labeled as `"Fewer than 5"`, shaded in distinct muted slate styling, and displayed without property points or text labels.

---

## 3. JSON Schema Definition (`src/data/market-counts.json`)

The data file adheres strictly to transaction data from `HTC_Files_Worked_by_Area.csv` with zero unapproved metadata or region strings:

```json
{
  "metadata": {
    "sourceFile": "HTC_Files_Worked_by_Area.csv",
    "description": "Florida files worked (in process and closed) by county and city from HTC transaction data."
  },
  "counties": [
    {
      "county": "Miami-Dade",
      "fips": "12086",
      "filesWorked": 1030,
      "cities": [
        { "city": "Miami", "filesWorked": 552 },
        { "city": "Homestead", "filesWorked": 128 },
        { "city": "Miami Beach", "filesWorked": 65 },
        { "city": "Other cities (grouped)", "filesWorked": 35 }
      ]
    },
    {
      "county": "Indian River",
      "fips": "12061",
      "filesWorked": "Fewer than 5",
      "cities": [
        { "city": "Other cities (grouped)", "filesWorked": "Fewer than 5" }
      ]
    }
  ]
}
```

---

## 4. City Coordinates Database (`src/data/florida-cities-coordinates.json`)

Separated from the component to allow independent layout and geographic lookups:

```json
{
  "Miami": {
    "city": "Miami",
    "x": 636.9,
    "y": 455.1,
    "labelX": 662,
    "labelY": 462,
    "textAnchor": "start"
  },
  "Homestead": {
    "city": "Homestead",
    "x": 612.9,
    "y": 480.8,
    "labelX": 596,
    "labelY": 485,
    "textAnchor": "end"
  }
}
```

---

## 5. Heat Map Shading Brackets

The SVG component evaluates `filesWorked` for each county entry dynamically:

| File Count Bracket | Fill Color | Hex Code | Visual Designation | Current Matching Counties |
| :--- | :--- | :--- | :--- | :--- |
| **250+ Files** | Deep Forest Teal | `#075960` | High Volume Hub | Miami-Dade (1,030), Broward (401) |
| **100 – 249 Files** | Vibrant Cyan/Teal | `#0D9BA3` | Major Market | Lee (138) |
| **40 – 99 Files** | Mid Cyan | `#20C5D2` | Established Market | Palm Beach (49) |
| **15 – 39 Files** | Soft Aqua | `#6EE7B7` | Expanding Market | Collier (31), Orange (22), Hillsborough (22), Polk (22), Pasco (17), Volusia (16) |
| **5 – 14 Files** | Pale Blue | `#BAE6FD` | Active Market | Sarasota (14), Manatee (11), St. Johns (10), Lake (7), St. Lucie (7), Pinellas (7), Charlotte (6), Duval (5), Osceola (5), Brevard (5), Marion (5) |
| **Fewer than 5** | Muted Slate Shading | `#334155` | Supported Area (< 5) | Indian River, Seminole, Hendry, Washington, Monroe, Highlands, Hernando, Bay, Levy, Putnam, Sumter |
| **Unrecorded** | Background Neutral | `#2A201C` | Boundary Outline | Counties outside current transaction file |

---

## 6. Converting Future CSV Exports to `market-counts.json`

When HTC exports an updated `HTC_Files_Worked_by_Area.csv`:
1. Group records by Florida county and municipality.
2. Sum all files where level is `County` or `City`.
3. Check cities: if count < 5, group as `Other cities (grouped)`. If count >= 5, list city name with count.
4. If county total < 5, set `filesWorked: "Fewer than 5"`.
5. Map official Florida FIPS code (12001 through 12133).
6. Save output directly to `src/data/market-counts.json`.
7. Rebuilding the site updates the heat map, top city labels, county selector, and municipal breakdown automatically.
