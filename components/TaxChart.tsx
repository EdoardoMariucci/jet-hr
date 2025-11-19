"use client";

import { useEffect, useState } from "react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";

export const description = "A pie chart with a label list";

const chartConfig = {
  value: {
    label: "Euro",
  },
  IRPEF_Netta: {
    label: "IRPEF Netta",
    color: "var(--chart-1)",
  },
  INPS: {
    label: "INPS",
    color: "var(--chart-2)",
  },
  Comunali: {
    label: "Comunali",
    color: "var(--chart-3)",
  },
  Regionali: {
    label: "Regionali",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export default function TaxChart() {
  const [chartData, setChartData] = useState([
    { tax: "IRPEF Netta", value: 4222, fill: "var(--color-IRPEF_Netta)" },
    { tax: "INPS", value: 2757, fill: "var(--color-INPS)" },
    { tax: "Comunali", value: 218, fill: "var(--color-Comunali)" },
    { tax: "Regionali", value: 378, fill: "var(--color-Regionali)" },
  ]);
  const [overallAvgPercent, setOverallAvgPercent] = useState<number>(25);

  useEffect(() => {
    type TaxComputedDetail = {
      inps: number;
      irpef: number;
      regionali: number;
      comunali: number;
      overallAverageRate?: number;
    };

    const handler = (e: Event) => {
      const { inps, irpef, regionali, comunali, overallAverageRate } =
        (e as CustomEvent<TaxComputedDetail>).detail || {};
      if (
        typeof inps !== "number" ||
        typeof irpef !== "number" ||
        typeof regionali !== "number" ||
        typeof comunali !== "number"
      ) {
        return;
      }

      if (
        typeof overallAverageRate === "number" &&
        Number.isFinite(overallAverageRate)
      ) {
        setOverallAvgPercent(Math.round(overallAverageRate * 100));
      }

      setChartData([
        {
          tax: "IRPEF Netta",
          value: Math.round(irpef),
          fill: "var(--color-IRPEF_Netta)",
        },
        { tax: "INPS", value: Math.round(inps), fill: "var(--color-INPS)" },
        {
          tax: "Comunali",
          value: Math.round(comunali),
          fill: "var(--color-Comunali)",
        },
        {
          tax: "Regionali",
          value: Math.round(regionali),
          fill: "var(--color-Regionali)",
        },
      ]);
    };

    const resetHandler = () => {
      setOverallAvgPercent(25);
      setChartData([
        { tax: "IRPEF Netta", value: 4222, fill: "var(--color-IRPEF_Netta)" },
        { tax: "INPS", value: 2757, fill: "var(--color-INPS)" },
        { tax: "Comunali", value: 218, fill: "var(--color-Comunali)" },
        { tax: "Regionali", value: 378, fill: "var(--color-Regionali)" },
      ]);
    };

    window.addEventListener("tax:computed", handler as EventListener);
    window.addEventListener("tax:reset", resetHandler as EventListener);
    return () => {
      window.removeEventListener("tax:computed", handler as EventListener);
      window.removeEventListener("tax:reset", resetHandler as EventListener);
    };
  }, []);

  return (
    <Card className="w-full max-w-sm flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Divisione Tasse
          <Badge
            variant="outline"
            className="text-red-500 bg-red-500/10 border-none ml-2"
          >
            <TrendingDown className="h-4 w-4" />
            <span>{overallAvgPercent}%</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          Focus su: INPS, IRPEF Netta, Regionali e Comunali
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="h-[260px] w-full aspect-auto [&_.recharts-text]:fill-background mx-auto"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie
              data={chartData}
              innerRadius={30}
              dataKey="value"
              radius={10}
              cornerRadius={8}
              paddingAngle={4}
            >
              <LabelList
                dataKey="value"
                stroke="none"
                fontSize={12}
                fontWeight={500}
                fill="currentColor"
                formatter={(value: number) => value.toString()}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
