import { lazy, Suspense, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { DefaultTeamLayout } from 'src/layouts/dashboard/DefaultTeamLayout';
import { Team2Layout } from 'src/layouts/dashboard/Team2Layout';
import { Team3Layout } from 'src/layouts/dashboard/Team3Layout';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
export const TestPage = lazy(() => import('src/pages/carparts_home'));
export const AilaymanPage = lazy(() => import('src/pages/ailayman_home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const CustomDashboard = lazy(()=> import('src/pages/custom_dashboard'))

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ), // <-- Add a comma here
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   element: (
    //     <DashboardLayout>
    //       <Suspense fallback={renderFallback}>
    //         <Outlet />
    //       </Suspense>
    //     </DashboardLayout>
    //   ), // <-- Add a comma here
    //   children: [
    //     { element: <HomePage />, index: true },
    //     { path: 'user', element: <UserPage /> },
    //     { path: 'products', element: <ProductsPage /> },
    //     { path: 'blog', element: <BlogPage /> },
    //   ],
    // },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}



export function AppRouter({ currentWorkspace }: { currentWorkspace: { id: string } | null }) {
  
  // Define routes for each workspace
  const routesForTeam1 = [
    { element: <HomePage />, index: true },
    { path: 'user', element: <UserPage /> },
    { path: 'products', element: <ProductsPage /> },
    { path: 'blog', element: <BlogPage /> },
    { path: 'custom_dashboard', element: <CustomDashboard /> },
  ];

  const routesForTeam2 = [
    { element: <HomePage />, index: true },
    { path: 'user', element: <UserPage /> },
    { path: 'products', element: <ProductsPage /> },
    { path: 'blog', element: <BlogPage /> },
    { path: 'custom_dashboard', element: <CustomDashboard /> },
  ];

  const routesForTeam3 = [
    { element: <HomePage />, index: true },
    { path: 'user', element: <UserPage /> },
    { path: 'products', element: <ProductsPage /> },
    { path: 'blog', element: <BlogPage /> },
    { path: 'custom_dashboard', element: <CustomDashboard /> },
  ];

  // Choose layout and routes based on the workspace ID
  const LayoutComponent =
    currentWorkspace?.id === 'team-1'
      ? DefaultTeamLayout
      : currentWorkspace?.id === 'team-2'
      ? Team2Layout
      : currentWorkspace?.id === 'team-3'
      ? Team3Layout
      : DefaultTeamLayout

  const children =
    currentWorkspace?.id === 'team-1'
      ? routesForTeam1
      : currentWorkspace?.id === 'team-2'
      ? routesForTeam2
      : currentWorkspace?.id === 'team-3'
      ? routesForTeam3
      : routesForTeam1

  return useRoutes([
    {
      element: (
        <Suspense fallback={renderFallback}>
          {/* Render the correct layout */}
          <LayoutComponent>
            <Outlet />
          </LayoutComponent>
        </Suspense>
      ),
      children,
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}