import type { IconButtonProps } from '@mui/material/IconButton';
import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter, usePathname } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountPopover({ data = [], sx, ...other }: AccountPopoverProps) {
  const router = useRouter(); // Get the router for navigation
  const pathname = usePathname(); // Current path name

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openProfile, setOpenProfile] = useState<HTMLButtonElement | null>(null); // State to control profile popover
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    profileImage: '',
  }); // Initialize state for user data
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For editing mode

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      router.push(path); // Navigate to the desired path
    },
    [handleClosePopover, router]
  );

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/sign-in');
  };

  const handleOpenProfile = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProfile(event.currentTarget);
    setOpenPopover(null); // Close the main popover
  }, []);

  const handleCloseProfile = useCallback(() => {
    setOpenProfile(null);

    setIsEditing(false); // Exit edit mode when closing
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUser((prev) => ({ ...prev, profileImage: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
          background: (theme) =>
            `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
          ...sx,
        }}
        {...other}
      >
        <Avatar src={user?.profileImage || ''} alt={user?.displayName} sx={{ width: 1, height: 1 }}>
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      {/* Main Popover with Home, Profile, Settings */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              [`&.${menuItemClasses.selected}`]: {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
          <MenuItem component="button" onClick={handleOpenProfile}>
            <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" /> Profile
          </MenuItem>
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color="error" size="medium" variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Popover>

      <Popover
        open={!!openProfile}
        // anchorEl={isEditing}
        onClose={handleCloseProfile}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 300 },
          },
        }}
      >
        <Box sx={{ p: 2, position: 'relative' }}>
          {/* Close Icon */}
          <IconButton
            onClick={handleCloseProfile}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {isEditing ? 'Edit Profile' : 'Profile'}
          </Typography>

          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="Name"
                value={user.displayName}
                onChange={(e) => setUser((prev) => ({ ...prev, displayName: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={user.email}
                onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" component="label" sx={{ mb: 2 }}>
                Upload Profile Image
                <input type="file" hidden onChange={handleImageUpload} />
              </Button>
              {user?.profileImage && (
                <Avatar alt={user.displayName} src={user.profileImage} sx={{ width: 100, height: 100, mb: 2 }} />
              )}
              <Button variant="contained" fullWidth onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
            {user?.profileImage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar alt={user.displayName} src={user.profileImage} sx={{ width: 100, height: 100 }} />
                </Box>
              )}
              <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>
                Name: {user.displayName}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
                Email: {user.email}
              </Typography>
              <Button variant="contained" fullWidth onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </Box>
      </Popover>

    </>
  );
}
