import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { browser: "chrome", progress: 10, fill: "var(--color-chrome)" },
  { browser: "safari", progress: 30, fill: "var(--color-safari)" },
  { browser: "firefox", progress: 20, fill: "var(--color-firefox)" },
 
]

const chartConfig = {
  progress: {
    label: "Progress",
  },
  chrome: {
    label: "React",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "MERN",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Flutter",
    color: "hsl(var(--chart-3))",
  },
 
}

const ChartPie = ({course}) => {

  
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.progress, 0)
  }, [])

  return (
    <Card className="flex flex-col bg-transparent border-none shadow-md p-3">
      <h1 className="dark:text-gray-100 font-semibold text-xl mb-2">Course Progress</h1>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent  />}
            />
            <Pie
              data={chartData}
              dataKey="progress"
              nameKey="browser"
              innerRadius={65}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-gray-100 text-3xl font-bold "
                        >
                          {totalVisitors}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-gray-100 font-semibold"
                        >
                          Progress
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
          <h1 className="font-semibold dark:text-gray-200 mb-2">Total Courses : {4}</h1>

    </Card>
  )
}

export default ChartPie;