# Hometown TC — Closed-Deal Heat Map & Market Data Specification
**Document ID:** HTC-SPEC-HEATMAP-01  
**Project Book Version:** v1.3 (Section 13 — Florida Market Footprint & Heat Map)  
**Author:** Engineering Team  
**Reviewer:** Michelle Martinez, Founder & CEO  
**Data Source File:** `src/data/market-counts.json`  
**Render Component:** `src/components/FloridaClosedDealsHeatMap.tsx` on `/why-htc/`  
**Date:** October 21, 2026  

---

## 1. Architectural Architecture & Live Data Handover

As required by **Project Book v1.3 Section 13** and Michelle's written instruction:
* **Zero Hardcoded Numbers:** Neither the SVG map, the React component, nor the page text hard-codes any transaction counts, percentages, or invented regional claims.
* **Single Source of Truth:** All file counts, county brackets, regions, and municipal summaries are loaded dynamically from `src/data/market-counts.json`.
* **Zero Code Updates for Future Data:** The HTC team or automated data pipeline can replace or overwrite `src/data/market-counts.json` at any time. The heat map immediately calculates new shading brackets, updates total counts, and populates the city lists upon re-build without altering a single line of React or CSS.

---

## 2. Privacy & Aggregation Standards

To safeguard agent client relationships and comply with strict real estate privacy guidelines:
1. **No Property-Level PII:** The system **never** accepts, stores, or renders street addresses, property APNs, client names, or individual transaction records.
2. **"Other cities" Threshold (< 5):** Any municipality or city with fewer than 5 files is automatically grouped into `"Other cities"` within its respective county.
3. **County Privacy Threshold (< 5):** Any county with fewer than 5 files is labeled as `"Fewer than 5"` (or `files: "< 5"`), shaded in neutral tier styling, and prevented from displaying isolated property points.

---

## 3. JSON Schema Definition (`src/data/market-counts.json`)

The data file adheres to the following clean structure:

```json
{
  "metadata": {
    "dataset": "HTC_Files_Worked_by_Area",
    "description": "Florida files worked (in process and closed) aggregated by county and municipality.",
    "privacyCompliance": "Cities with <5 files grouped into 'Other cities'. Counties with <5 files classified as 'Fewer than 5'.",
    "lastUpdated": "YYYY-MM-DD"
  },
  "summary": {
    "totalFilesReported": 1870,
    "totalCountiesReported": 32,
    "primaryMarkets": [
      "South Florida (Miami-Dade, Broward, Palm Beach)",
      "Southwest Florida (Lee, Collier, Sarasota, Charlotte)",
      "Central Florida & Tampa Bay (Orange, Hillsborough, Polk, Pasco, Pinellas, Lake)",
      "Northeast & Atlantic Coast (Volusia, St. Johns, Duval, Brevard, St. Lucie)"
    ]
  },
  "counties": [
    {
      "countyId": "string (kebab-case identifier matching SVG path, e.g. 'miami-dade')",
      "countyName": "string (Display title, e.g. 'Miami-Dade')",
      "region": "string ('South Florida' | 'Central Florida' | 'Southwest Florida' | etc.)",
      "fips": "string (5-digit US FIPS code, e.g. '12086')",
      "totalFiles": "number | 'Fewer than 5'",
      "tier": "string ('tier-1' | 'tier-2' | 'tier-3' | 'tier-4' | 'tier-fewer')",
      "status": "string ('active' | 'under-five')",
      "cities": [
        {
          "cityName": "string (e.g. 'Miami', or 'Other cities (grouped)')",
          "files": "number | 'Fewer than 5'"
        }
      ]
    }
  ]
}
```

---

## 4. Heat Map Shading Brackets

The SVG component evaluates `totalFiles` for each county entry dynamically:

| File Count Bracket | Fill Color | Hex Code | Visual Designation | Example Counties |
| :--- | :--- | :--- | :--- | :--- |
| **250+ Files** | Deep Forest Teal | `#075960` | Primary Hub | Miami-Dade (1,030), Broward (401) |
| **100 – 249 Files** | Vibrant Cyan/Teal | `#0D9BA3` | Major Market | Lee / SWFL (138) |
| **40 – 99 Files** | Mid Cyan | `#20C5D2` | Established Market | Palm Beach (49) |
| **15 – 39 Files** | Soft Aqua | `#6EE7B7` | Expanding Market | Collier (31), Orange (22), Hillsborough (22), Polk (22), Pasco (17), Volusia (16) |
| **5 – 14 Files** | Pale Blue | `#BAE6FD` | Active Market | Sarasota (14), Manatee (11), St. Johns (10), Lake (7), St. Lucie (7), Pinellas (7), Charlotte (6), Duval (5), Osceola (5), Brevard (5), Marion (5) |
| **Fewer than 5** | Neutral Shading Slate | `#E2E8F0` | Supported / Monitored Area (< 5) | Indian River, Seminole, Hendry, Monroe, Highlands, Hernando, Bay, Levy, Putnam, Sumter, Washington |

---

## 5. Converting Future CSV Exports to `market-counts.json`

When HTC exports an updated `HTC_Files_Worked_by_Area.csv`:
1. Group records by Florida county.
2. Sum all files where status is "In Process" or "Closed".
3. Check cities: if count < 5, add count to `Other cities`. If count >= 5, list city name with count.
4. If county total < 5, set `totalFiles: "Fewer than 5"`.
5. Save output to `src/data/market-counts.json`.
6. Run `npm run build` — the static heat map and municipal breakdown cards update instantly.
