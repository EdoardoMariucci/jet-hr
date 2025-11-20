"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";

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

const createDefaultChartData = () => [
  { value: "Euro", ral: 30000, netto: 22426 },
];

const chartConfig = {
  ral: {
    label: "RAL",
    color: "var(--chart-1)",
  },
  netto: {
    label: "Netto",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function NetChart() {
  const [chartData, setChartData] = useState(createDefaultChartData);

  useEffect(() => {
    type TaxComputedDetail = {
      ral?: number;
      annualNet?: number;
    };

    const handler = (event: Event) => {
      const { ral, annualNet } =
        (event as CustomEvent<TaxComputedDetail>).detail || {};

      if (
        typeof ral !== "number" ||
        typeof annualNet !== "number" ||
        !Number.isFinite(ral) ||
        !Number.isFinite(annualNet)
      ) {
        return;
      }

      setChartData([{ value: "Euro", ral, netto: annualNet }]);
    };

    const resetHandler = (_event: Event) => {
      void _event;
      setChartData(createDefaultChartData());
    };

    window.addEventListener("tax:computed", handler);
    window.addEventListener("tax:reset", resetHandler);

    return () => {
      window.removeEventListener("tax:computed", handler);
      window.removeEventListener("tax:reset", resetHandler);
    };
  }, []);

  return (
    <Card className="w-full max-w-sm flex flex-col">
      <CardHeader>
        <CardTitle>RAL vs Netto</CardTitle>
        <CardDescription>Confronto tra RAL e Netto (annuale)</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="h-[320px] w-full aspect-auto"
        >
          <BarChart accessibilityLayer data={chartData}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="85%"
              fill="url(#default-multiple-pattern-dots)"
            />
            <defs>
              <DottedBackgroundPattern />
            </defs>
            <XAxis
              dataKey="value"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" hideLabel />}
            />
            <Bar
              dataKey="ral"
              color="var(--chart-1)"
              fill="var(--color-ral)"
              shape={<CustomHatchedBar isHatched={false} />}
              radius={4}
            />
            <Bar
              dataKey="netto"
              fill="var(--color-netto)"
              shape={<CustomHatchedBar />}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CustomHatchedBar = (
  props: React.SVGProps<SVGRectElement> & {
    dataKey?: string;
    isHatched?: boolean;
  }
) => {
  const { fill, x, y, width, height, dataKey } = props;

  const isHatched = props.isHatched ?? true;

  return (
    <>
      <rect
        rx={4}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="none"
        fill={isHatched ? `url(#hatched-bar-pattern-${dataKey})` : fill}
      />
      <defs>
        <pattern
          key={dataKey}
          id={`hatched-bar-pattern-${dataKey}`}
          x="0"
          y="0"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45)"
        >
          <rect width="10" height="10" opacity={0.5} fill={fill}></rect>
          <rect width="1" height="10" fill={fill}></rect>
        </pattern>
      </defs>
    </>
  );
};
const DottedBackgroundPattern = () => {
  return (
    <pattern
      id="default-multiple-pattern-dots"
      x="0"
      y="0"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
    >
      <circle
        className="dark:text-muted/40 text-muted"
        cx="2"
        cy="2"
        r="1"
        fill="currentColor"
      />
    </pattern>
  );
};
