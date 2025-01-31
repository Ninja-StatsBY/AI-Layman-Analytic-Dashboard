import 'src/global.css';
import Fab from '@mui/material/Fab';
import { AppRouter } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ThemeProvider } from 'src/theme/theme-provider';
import { Iconify } from 'src/components/iconify';
import { _workspaces } from './layouts/config-nav-workspace';
import { useWorkspace, WorkspaceProvider } from './hooks/context/WorkspaceContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <WorkspaceProvider>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </WorkspaceProvider>
  );
}

function MainContent() {
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();

  useScrollToTop();

  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <>
      <AppRouter currentWorkspace={currentWorkspace} />
    </>
  );
}
