import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openForm, setOpenForm] = useState(false); // For the signup modal
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    displayName: '',
    profileImage: '',
  });

  // Handle sign-in
  const handleSignIn = useCallback(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser.email === email && storedUser.password === password) {
      // If the user is found in localStorage, use their stored data
      alert(`Welcome back, ${storedUser.displayName}`);
      router.push('/');
    } else if (email === 'nihal@test.com' && password === '1234') {
      // First-time login with demo credentials
      const demoUser = {
        email: 'nihal@test.com',
        password: '1234',
        displayName: 'Nihal',
        profileImage: '',
      };
      localStorage.setItem('user', JSON.stringify(demoUser));
      alert(`Welcome, ${demoUser.displayName}`);
      router.push('/');
    } else {
      alert('Email or password is incorrect.');
    }
  }, [email, password, router]);

  // Handle opening and closing the signup form
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  // Handle signup form submission
  const handleSignUp = () => {
    // Store the new user data in localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    alert('User registered successfully!');
    handleCloseForm();
  };

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setNewUser((prev) => ({ ...prev, profileImage: e.target!.result as string }));
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="nihal@test.com"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleOpenForm}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>

      {/* Signup Modal */}
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Register New User
          </Typography>
          <TextField
            fullWidth
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            value={newUser.password}
            onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Display Name"
            value={newUser.displayName}
            onChange={(e) => setNewUser((prev) => ({ ...prev, displayName: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Upload Profile Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          {newUser.profileImage && (
            <Avatar
              alt={newUser.displayName}
              src={newUser.profileImage}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          )}
          <Button fullWidth variant="contained" onClick={handleSignUp}>
            Register
          </Button>
        </Box>
      </Modal>
    </>
  );
}
