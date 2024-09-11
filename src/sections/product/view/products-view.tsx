import React, { useState, useEffect,useMemo } from 'react';
import {
  Box, List, ListItem, Avatar, Typography, Paper, TextField, Button, IconButton, Toolbar, Drawer, CssBaseline, InputBase
} from '@mui/material';
import { Circle, Menu as MenuIcon, FilterList as FilterListIcon, Search as SearchIcon } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

const drawerWidth = 300;

// Define the User type
interface User {
  id: number;
  name: string;
  active: boolean;
}

export const ProductsView: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize the users array so it doesn't change on every render
  const users: User[] = useMemo(() => [
    { id: 1, name: 'John Doe', active: true },
    { id: 2, name: 'Jane Smith', active: false },
    { id: 3, name: 'Bob Johnson', active: true },
  ], []);

  // Automatically select the first user on component mount
  useEffect(() => {
    if (users.length > 0) {
      handleUserClick(users[0]);
    }
  }, [users]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setMessages([
      { user: user.name, message: "Hello, how are you?" },
      { user: "You", message: "I'm good, thanks!" },
    ]);
    setMobileOpen(false); // Close the drawer in mobile view
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, { user: 'You', message: newMessage }]);
      setNewMessage('');
    }
  };

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar />
      {/* Search Bar and Filter */}
      <Box sx={{ padding: '10px 15px', display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <SearchIcon sx={{ marginRight: '8px' }} />
        <InputBase
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Box>

      {/* Users List */}
      <List>
        {filteredUsers.map((user) => (
          <ListItem
            button
            key={user.id}
            onClick={() => handleUserClick(user)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              backgroundColor: selectedUser?.id === user.id ? '#e0f7fa' : 'inherit',
              borderBottom: '1px solid #ddd',
            }}
          >
            <Avatar sx={{ marginRight: '8px' }}>{user.name.charAt(0)}</Avatar>
            <Typography variant="body1">{user.name}</Typography>
            {user.active && <Circle sx={{ color: 'green', fontSize: 14, marginLeft: 'auto' }} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '90vh', overflow: 'hidden' }}>
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Client Communication Dashboard
        </Typography>
      </Toolbar>

      {/* Main Content Area */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically for mobile, side-by-side for desktop
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Drawer for Mobile View */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Left Side (Users List) */}
        <Box
          sx={{
            width: { xs: '100%', sm: drawerWidth },
            borderRight: { sm: '1px solid #ccc' },
            display: { xs: 'none', sm: 'block' }, // Show users list on desktop
            height: '100%', // Take full height of the viewport
            overflowY: 'auto', // Scrollable only for the users list
            backgroundColor: '#5D3B8C', color: '#fff'
          }}
        >
          {drawer}
        </Box>

        {/* Chat Side */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f0f2f5',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden',borderRadius: 0 }}>
            {selectedUser ? (
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                <span style={{color:'#5D3B8C'}}>@{selectedUser.name}</span>
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Select a user to start a conversation
              </Typography>
            )}

            {/* Chat Messages */}
            <Box
              id="chat-container"
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                marginBottom: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.user === 'You' ? '#007bff' : '#e0e0e0',
                    color: msg.user === 'You' ? '#fff' : '#000',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    marginBottom: 1,
                    maxWidth: '60%',
                    wordBreak: 'break-word',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {msg.user}
                  </Typography>
                  <Typography variant="body1">{msg.message}</Typography>
                </Box>
              ))}
            </Box>

            {selectedUser && (
              <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 2 }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                  sx={{ marginLeft: 2 }}
                >
                  <SendIcon />
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
