import React, { useState } from 'react';
import {
  SelectChangeEvent,
  TextField,
  Button,
  Select,
  MenuItem,
  Slider,
  Typography,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const tools = ['Search Parts', 'Retrive Shops', 'Installation Guide'];

export const CustomDashboard = () => {
  const [iconPosition, setIconPosition] = useState('bottom-right');
  const [uploadedIcon, setUploadedIcon] = useState<string | null>(null);
  const [fontSizeStatic, setFontSizeStatic] = useState<number>(16);
  const [fontSizeUser, setFontSizeUser] = useState<number>(14);
  const [fontSizeBot, setFontSizeBot] = useState<number>(14);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [userMessageBgColor, setUserMessageBgColor] = useState('#ffffff');
  const [botMessageBgColor, setBotMessageBgColor] = useState('#f0f0f0');
  const [allToolsSelected, setAllToolsSelected] = useState(false);

  // Handle file upload for chatbot icon
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/svg+xml')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUploadedIcon(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid PNG or SVG image.');
    }
  };

  // Handle selecting tools
  const handleToolSelect = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedTools(value);
  };

  // Change font size from text field
  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'static' | 'user' | 'bot'
  ) => {
    const value = Number(event.target.value);
    if (type === 'static') setFontSizeStatic(value);
    else if (type === 'user') setFontSizeUser(value);
    else setFontSizeBot(value);
  };

  return (
    <Box sx={{ bgcolor: '#f9fafb', p: 4, borderRadius: 0, boxShadow: 4, maxWidth: '1200px', margin: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'start', fontWeight: 'bold', color: '#5D3B8C' }}>
        Custom Chatbot Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Section for Chatbot Icon Position */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Chatbot Icon Position
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Chatbot Icon Position</InputLabel>
                <Select value={iconPosition} onChange={(e) => setIconPosition(e.target.value)}>
                  <MenuItem value="top-left">Top Left</MenuItem>
                  <MenuItem value="top-right">Top Right</MenuItem>
                  <MenuItem value="bottom-left">Bottom Left</MenuItem>
                  <MenuItem value="bottom-right">Bottom Right</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2" style={{color:'green'}} sx={{ mt: 1 }}>
                The chatbot icon will appear at the selected corner of the screen.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Chatbot Icon Upload */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upload Chatbot Icon (SVG/PNG)
              </Typography>
              <Button variant="contained" component="label">
                Upload Chatbot Icon
                <input type="file" accept="image/png, image/svg+xml" hidden onChange={handleFileUpload} />
              </Button>
              {uploadedIcon && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <img src={uploadedIcon} alt="Chatbot Icon" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Font Sizes */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Font Sizes
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography gutterBottom>Static Text Font Size</Typography>
                  <Slider
                    value={fontSizeStatic}
                    min={10}
                    max={30}
                    onChange={(e, newValue) => setFontSizeStatic(newValue as number)}
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    label="Font Size"
                    type="number"
                    value={fontSizeStatic}
                    onChange={(e) => handleFontSizeChange(e as React.ChangeEvent<HTMLInputElement>, 'static')}
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography gutterBottom>User Text Font Size</Typography>
                  <Slider
                    value={fontSizeUser}
                    min={10}
                    max={30}
                    onChange={(e, newValue) => setFontSizeUser(newValue as number)}
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    label="Font Size"
                    type="number"
                    value={fontSizeUser}
                    onChange={(e) => handleFontSizeChange(e as React.ChangeEvent<HTMLInputElement>, 'user')}
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography gutterBottom>Bot Text Font Size</Typography>
                  <Slider
                    value={fontSizeBot}
                    min={10}
                    max={30}
                    onChange={(e, newValue) => setFontSizeBot(newValue as number)}
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    label="Font Size"
                    type="number"
                    value={fontSizeBot}
                    onChange={(e) => handleFontSizeChange(e as React.ChangeEvent<HTMLInputElement>, 'bot')}
                    fullWidth
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Tools Selection */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Chatbot Tools
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Chatbot Tools</InputLabel>
                <Select
                  multiple
                  value={selectedTools}
                  onChange={handleToolSelect}
                  input={<OutlinedInput label="Chatbot Tools" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {tools.map((tool) => (
                    <MenuItem key={tool} value={tool}>
                      <Checkbox checked={selectedTools.indexOf(tool) > -1} />
                      <ListItemText primary={tool} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" style={{color:'green'}} sx={{ mt: 1 }}>
                Choose the tools you want to activate in the chatbot.
              </Typography>

              <FormControlLabel
                control={<Switch checked={allToolsSelected} onChange={(e) => setAllToolsSelected(e.target.checked)} />}
                label="Select All Tools"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Section for Background Colors */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                User Message Background Color
              </Typography>
              <TextField
                label="User Message Background Color"
                type="color"
                value={userMessageBgColor}
                onChange={(e) => setUserMessageBgColor(e.target.value)}
                fullWidth
              />
              <Typography variant="body2" style={{color:'green'}} sx={{ mt: 1 }}>
                Change the background color of user messages in the chat window.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Bot Message Background Color
              </Typography>
              <TextField
                label="Bot Message Background Color"
                type="color"
                value={botMessageBgColor}
                onChange={(e) => setBotMessageBgColor(e.target.value)}
                fullWidth
              />
              <Typography variant="body2" style={{color:'green'}} sx={{ mt: 1 }}>
                Change the background color of bot responses in the chat window.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

