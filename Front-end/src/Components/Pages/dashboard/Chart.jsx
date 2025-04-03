import {  Line, LineChart, XAxis, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartData = [
  { day: "Monday", desktop: 10 },
  { day: "Tuesday", desktop: 10 },
  { day: "Wednesday", desktop: 20 },
  { day: "Thursday", desktop: 10 },
  { day: "Friday", desktop: 0 },
];

const chartConfig = {
  desktop: {
    label: "Minutes",
    color: "hsl(var(--chart-1))",
  },
};

const Chart = () => {
  return (
    <Card className="w-full max-w-4xl border border-dark-border bg-transparent shadow-md p-3 overflow-hidden">
      <h1 className="dark:text-gray-100 font-semibold text-xl mb-2">
        Activity Insights
      </h1>
      <CardContent className="flex items-center justify-center">
        <ChartContainer className="h-[50vw] max-h-80 overflow-x-hidden " config={chartConfig}>
          
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 5, right: 5 }}
            >
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={true}
                tickMargin={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.slice(0, 3)}
                padding={{ left: 20, right: 20 }}
              />
              <ChartTooltip
                className="p-3"
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
        
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
