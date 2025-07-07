'use client';
import { ChevronRight } from "lucide-react";
import Button from "../ui/button/Button";
import { ChartConfig, ChartContainer } from "../ui/chart/Chart";
import { RadialBarChart, PolarGrid, RadialBar, PolarRadiusAxis, Label } from "recharts";

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const InsightsHeader = () => {
  return (
    <div className="rounded-lg flex lg:justify-between justify-start items-center gap-5 px-10 h-50 bg-[#7f56d9]">

       {/* Left Side */}
        <div className='text-white space-y-2'>
          <h2 className="text-2xl font-bold text-white">
          Apollo Care Alliance
          </h2>
          <p className=" mt-1">
            Welcome to your Culture and wellbeing platform
          </p>
          <p className='text-sm'>
            Members: <span className="font-bold">1,200</span>
          </p>
        </div>
        

        {/* Right Side */}
        <div className="hidden lg:flex items-center bg-[#a795cd] text-white w-96 rounded-lg px-4 py-6">
          <div className="flex flex-row items-center justify-between w-full">
            <h2 className="text-lg font-medium">
              Learning Progress
            </h2>
            <Button variant="outline" size="xs" className="!rounded-full">
              <ChevronRight />
            </Button>
          </div>

          <div>
          <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
          </div>
        </div>

      </div>
  );
};

export default InsightsHeader;