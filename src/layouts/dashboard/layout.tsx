import React, { useState } from 'react';
import { Box } from '@mui/material';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import { _workspaces } from '../config-nav-workspace'; // Import workspaces data
import { WorkspacesPopover } from '../components/workspaces-popover'; // Import workspace popover
import { DefaultTeamLayout } from './DefaultTeamLayout'; // This layout is for Team-1
import { Team2Layout } from './Team2Layout'; // Layout for Team-2
import { Team3Layout } from './Team3Layout'; // Layout for Team-3

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};
export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const [currentWorkspace, setCurrentWorkspace] = useState(_workspaces[0]);

  // Render the appropriate layout based on the selected workspace
  const renderLayout = () => {
    console.log("currentWorkspace.id",currentWorkspace.id);
    
    switch (currentWorkspace.id) {
      case 'team-2':
        return <Team2Layout children= {children}/>;
      case 'team-3':
        return <Team3Layout children= {children}/>;
      default:
        return <DefaultTeamLayout children= {children}/>;
    }
  };

  return (
    <Box>
      {/* Workspace selector popover */}
      <WorkspacesPopover
        data={_workspaces}
        onChangeWorkspace={(workspace) => setCurrentWorkspace(workspace)}
      />

      {/* Dynamically render the layout based on the selected workspace */}
      {renderLayout()}
    </Box>
  );
}
