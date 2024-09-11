import type { CardProps } from '@mui/material/Card';
import type { ColorType } from 'src/theme/core/palette';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';

import { varAlpha, bgGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  percentage_flag: boolean;
  color?: ColorType;
  icon: React.ReactNode;
  chart: {
    series: number[];
    categories: string[];
    options?: ChartOptions;
  };
};

export function AnalyticsWidgetSummary({
  icon,
  title,
  total,
  chart,
  percent,
  percentage_flag,
  color = 'primary',
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  // Define chart colors based on the trend (up or down)
  const isPositive = percent >= 0;
  const chartColors = [isPositive ? theme.palette.success.main : theme.palette.warning.main]; // green for up, orange for down

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: { formatter: (value: number) => fNumber(value), title: { formatter: () => '' } },
    },
    ...chart.options,
  });

  const renderTrending = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      <Iconify
        width={20}
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{ color: percent < 0 ? theme.palette.warning.main : theme.palette.success.main }} // orange for down, green for up
      />
      <Box component="span" sx={{ typography: 'subtitle2', color:theme.palette.common.black }}>
        {percent > 0 && '+'}
        {fPercent(percent)} <span style={{ color: 'grey' }}>last month</span>
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: 'none',
        position: 'relative',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        ...sx,
      }}
      {...other}
    >
      <Box  sx={{ mb: 1, typography: 'subtitle1' }}>{title}</Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 112 }}>
          {percentage_flag ? (
            <Box sx={{ typography: 'h4', color:theme.palette.common.black }}>{total}%</Box>
          ) : (
            <Box sx={{ typography: 'h4', color:theme.palette.common.black }}>{fShortenNumber(total)}</Box>
          )}
        </Box>
        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          width={100}
          height={56}
        />
      </Box>
      {renderTrending}
    </Card>
  );
}
