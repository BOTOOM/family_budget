"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { balanceChart } from "@/services/types";

export function BalanceGraph({
  data,
  lng,
  startAmount,
}: {
  data: balanceChart[];
  startAmount: number;
  lng: string;
}) {
  const calcPercentage = 
    ((data[data.length - 1].amount -startAmount ) / startAmount) * 100;
    console.log(calcPercentage)
  const chartConfig = {
    desktop: {
      label: "balance",
      color: (calcPercentage < 0 ) ? "hsl(var(--chart-1))": "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 5,
              right: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => ""}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator  />}
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {Math.abs(calcPercentage).toFixed(1)}%
          {calcPercentage < 0 ? (<TrendingDown className="h-4 w-4" />): (<TrendingUp className="h-4 w-4" />)}
          
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
