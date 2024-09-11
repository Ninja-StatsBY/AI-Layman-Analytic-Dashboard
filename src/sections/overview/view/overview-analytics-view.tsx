import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';


// ----------------------------------------------------------------------

// Define the type for the data
type VisitData = {
  label: string;
  value: number;
};

type PostData = {
  title: string;
  description: string;
};

type TaskData = {
  task: string;
  status: string;
};

type TimelineData = {
  title: string;
  date: string;
};

type ChartData = {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
};

type WidgetDataType = {
  title : string,
  total: number,
  chart:ChartData
}




export function OverviewAnalyticsView() {

  const [currentVisitsData, setCurrentVisitsData] = useState<VisitData[]>([]);
  const [postsData, setPostsData] = useState<PostData[]>([]);
  const [tasksData, setTasksData] = useState<TaskData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const [totalAiSessions, setTotalAiSessions] = useState<WidgetDataType>();
  const [aiChatSessions, setAiChatSessions] = useState<WidgetDataType>();
  const [aiResolvedSessions, setAiResolvedSessions] = useState<WidgetDataType>();
  const [CSAT, setCSAT] = useState<WidgetDataType>();
  const [abandonRate, setAbandonRate] = useState<WidgetDataType>();
  const [avgSessionDuration, setAvgSessionDuration] = useState<WidgetDataType>();
  const [avgAiResponseTime, setAvgAiResponseTime] = useState<WidgetDataType>();
  const [userName, setUserName] = useState<string>('Admin');

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUserName(storedUser.displayName || 'Admin');
    // Fetch Current Visits data
    axios.get('http://localhost:5020/current-visits')
      .then(response => setCurrentVisitsData(response.data))
      .catch(error => console.error('Error fetching current visits data:', error));

    // Fetch Posts data
    axios.get('http://localhost:5020/posts')
      .then(response => setPostsData(response.data))
      .catch(error => console.error('Error fetching posts data:', error));

    // Fetch Tasks data
    axios.get('http://localhost:5020/tasks')
      .then(response => setTasksData(response.data))
      .catch(error => console.error('Error fetching tasks data:', error));

    // Fetch Timeline data
    axios.get('http://localhost:5020/timeline')
      .then(response => setTimelineData(response.data))
      .catch(error => console.error('Error fetching timeline data:', error));

    // Fetch Chart data
    axios.get('http://localhost:5020/website-visits')
      .then(response => setChartData(response.data))
      .catch(error => console.error('Error fetching timeline data:', error));
    


    // Fetch Total Ai sessions
    axios.get('http://localhost:5020/total-ai-sessions')
      .then(response =>setTotalAiSessions(response.data))
      .catch(error => console.error('Error fetching total ai sessions data:', error));

    // Fetch Ai Chat sessions
    axios.get('http://localhost:5020/ai-chat-sessions')
      .then(response =>setAiChatSessions(response.data))
      .catch(error => console.error('Error fetching ai chat sessions data:', error));

    // Fetch Ai Resolved sessions
    axios.get('http://localhost:5020/ai-resolved-sessions')
      .then(response =>setAiResolvedSessions(response.data))
      .catch(error => console.error('Error fetching ai resolved sessions data:', error));

    // Fetch CSAT
    axios.get('http://localhost:5020/csat')
      .then(response =>setCSAT(response.data))
      .catch(error => console.error('Error fetching CSAT data:', error));
    
    // Fetch Abandon Rate
    axios.get('http://localhost:5020/abandon-rate')
      .then(response =>setAbandonRate(response.data))
      .catch(error => console.error('Error fetching abandon rate data:', error));
    
      // Fetch AVG session duration
    axios.get('http://localhost:5020/avg-session-duration')
    .then(response =>setAvgSessionDuration(response.data))
    .catch(error => console.error('Error fetching AVG session duration data:', error));

    // Fetch AVG Ai Response time
    axios.get('http://localhost:5020/avg-ai-response-time')
      .then(response =>setAvgAiResponseTime(response.data))
      .catch(error => console.error('Error fetching AVG ai response time data:', error));
  }, []);
    
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
      Welcome {userName}.
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          {totalAiSessions && (
            <AnalyticsWidgetSummary
            title="Total AI Sessions"
            percent={2.6}
            percentage_flag = {false}
            total={totalAiSessions.total}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
          )}
          
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          {aiChatSessions && (
            <AnalyticsWidgetSummary
            title="AI Chat Sessions"
            percent={-0.1}
            percentage_flag
            total={aiChatSessions.total}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
          )}
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          {aiResolvedSessions && (
            <AnalyticsWidgetSummary
            title="AI Resolved Sessions"
            percent={2.8}
            total={aiResolvedSessions.total}
            percentage_flag
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
          )}
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          {CSAT && (<AnalyticsWidgetSummary
            title="CSAT"
            percent={3.6}
            total={CSAT.total}
            percentage_flag
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
          )}
        </Grid>
        {/* Existing AnalyticsWidgetSummary components... */}
        
        {/* Static components */}
        <Grid xs={12} sm={6} md={4}>
          {abandonRate && (
            <AnalyticsWidgetSummary
            title="Abandon Rate"
            percent={2.6}
            total={abandonRate.total}
            percentage_flag
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
          )}
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          {avgSessionDuration && (
             <AnalyticsWidgetSummary
             title="AVG Session Duration"
             percent={-0.1}
             total={avgSessionDuration.total}
             percentage_flag
             color="secondary"
             icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
             chart={{
               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
               series: [56, 47, 40, 62, 73, 30, 23, 54],
             }}
           />
          )}
        </Grid>

        {/* Current visits fetched from API */}
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: currentVisitsData.map((visit) => ({
                label: visit.label,
                value: visit.value,
              })),
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          {chartData && (
            <AnalyticsWebsiteVisits
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              height: '100%'
            }}
              title="Website visits"
              subheader="(+43%) than last year"
              chart={{
                categories: chartData.categories,
                series: chartData.series,
              }}
            />
          )}
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
          sx={{
            height: '100%'
          }}
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
