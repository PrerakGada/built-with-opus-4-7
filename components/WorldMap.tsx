"use client";

import { useMemo, useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import type { CountryCount } from "@/lib/types";

// world-atlas uses some names that differ from our canonical set
const ALIASES: Record<string, string> = {
  "United States of America": "United States",
  "Dominican Rep.": "Dominican Republic",
  "Czechia": "Czech Republic",
  "Bosnia and Herz.": "Bosnia and Herzegovina",
  "Republic of the Congo": "Congo",
  "Dem. Rep. Congo": "DR Congo",
  "Central African Rep.": "Central African Republic",
  "S. Sudan": "South Sudan",
  "eSwatini": "Eswatini",
  "Côte d'Ivoire": "Ivory Coast",
  "Solomon Is.": "Solomon Islands",
  "Falkland Is.": "Falkland Islands",
};

export function WorldMap({ countries }: { countries: CountryCount[] }) {
  const byName = useMemo(() => {
    const m = new Map<string, number>();
    countries.forEach((c) => m.set(c.name, c.count));
    return m;
  }, [countries]);

  const max = Math.max(1, ...countries.map((c) => c.count));
  const [hover, setHover] = useState<{
    name: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="relative w-full aspect-[2.1/1] overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
      <ComposableMap
        projectionConfig={{ scale: 165, center: [10, 25] }}
        width={800}
        height={380}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={3} center={[10, 20]}>
          <Geographies geography="/countries-110m.json">
            {({ geographies }) => (
              <>
                {geographies.map((g) => (
                  <Geography
                    key={g.rsmKey}
                    geography={g}
                    style={{
                      default: {
                        fill: "var(--surface-2)",
                        stroke: "var(--border)",
                        strokeWidth: 0.3,
                        outline: "none",
                      },
                      hover: {
                        fill: "var(--surface-hover)",
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                ))}
                {geographies.map((g) => {
                  const raw = g.properties?.name as string | undefined;
                  if (!raw) return null;
                  const canonical = ALIASES[raw] ?? raw;
                  const count = byName.get(canonical);
                  if (!count) return null;
                  const [lon, lat] = geoCentroid(g);
                  const r = 1.8 + Math.sqrt(count / max) * 6.5;
                  return (
                    <Marker
                      key={"m-" + g.rsmKey}
                      coordinates={[lon, lat]}
                      onMouseEnter={(e) =>
                        setHover({
                          name: canonical,
                          count,
                          x: e.clientX,
                          y: e.clientY,
                        })
                      }
                      onMouseMove={(e) =>
                        setHover({ name: canonical, count, x: e.clientX, y: e.clientY })
                      }
                      onMouseLeave={() => setHover(null)}
                    >
                      <circle
                        r={r}
                        fill="var(--accent)"
                        fillOpacity={0.75}
                        stroke="var(--accent)"
                        strokeOpacity={0.9}
                        strokeWidth={0.6}
                      />
                    </Marker>
                  );
                })}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {hover && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg bg-foreground text-background
                     text-[11px] font-mono px-2 py-1 shadow-lg"
          style={{
            left: hover.x + 12,
            top: hover.y + 12,
          }}
        >
          {hover.name} · <span className="opacity-80">{hover.count}</span>
        </div>
      )}

      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-muted pointer-events-none">
        {countries.length} countries · {countries.reduce((a, c) => a + c.count, 0)} located
      </div>
    </div>
  );
}
