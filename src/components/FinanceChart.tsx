import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface FinanceChartProps {
  data: any[];
}

const FinanceChart: React.FC<FinanceChartProps> = ({ data }) => {
  // Configurações responsivas
  const isMobile = window.innerWidth < 768;
  const mobileMargin = { top: 5, right: 10, left: 10, bottom: 5 };
  const desktopMargin = { top: 5, right: 30, left: 20, bottom: 5 };

  return (
    <div className="w-full h-[250px] sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={isMobile ? mobileMargin : desktopMargin}
          className="mx-auto"
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />

          <XAxis
            dataKey="name"
            angle={isMobile ? -45 : 0}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            interval={isMobile ? "preserveStartEnd" : 0}
            height={isMobile ? 60 : undefined}
          />

          <YAxis
            tick={{ fontSize: isMobile ? 10 : 12 }}
            width={isMobile ? 40 : 60}
          />

          <Tooltip
            contentStyle={{
              fontSize: isMobile ? 12 : 14,
              padding: "8px 12px",
              borderRadius: "8px",
              backgroundColor: "#1F2937",
              border: "none",
            }}
            itemStyle={{ color: "#fff" }}
          />

          <Legend
            wrapperStyle={{ paddingTop: isMobile ? "10px" : "0" }}
            layout={isMobile ? "horizontal" : "vertical"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            align="center"
            iconSize={isMobile ? 12 : 16}
          />

          <Line
            type="monotone"
            dataKey="entradas"
            stroke="#10B981"
            strokeWidth={2}
            dot={!isMobile}
            activeDot={{ r: isMobile ? 4 : 6 }}
          />

          <Line
            type="monotone"
            dataKey="saidas"
            stroke="#EF4444"
            strokeWidth={2}
            dot={!isMobile}
            activeDot={{ r: isMobile ? 4 : 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;