import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { mockFinanceSeries } from "@/lib/dashboard-mocks";

export function Sparkline() {
  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockFinanceSeries} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="digital"
            stroke="hsl(217 91% 60%)"
            strokeWidth={2}
            fill="url(#sparkFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
