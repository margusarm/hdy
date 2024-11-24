import React from 'react';
//import logo from './logo.svg';
import logo from './greta_soon_big.png'
import './App.css';
import Box from '@mui/material/Box';
import { Button, FilledInput, FormControl, FormHelperText, Input, InputAdornment, OutlinedInput, Slider, Stack, Typography } from '@mui/material';

function App() {


  return (
  
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <body>
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2, // Padding for small screens
        }}
      >
        <Stack
          spacing={3} // Adds spacing between elements
          sx={{
            maxWidth: '600px',
            width: '100%', // Full width on smaller screens
          }}
        >
          <FormControl
            variant="standard"
            sx={{
              m: 1,
              width: '100%',
              maxWidth: '250px', // Limit width on larger screens
              alignSelf: 'center', // Center in the stack
            }}
          >
                        <Typography variant="subtitle1" gutterBottom>
              Kui suur su kodu on?
            </Typography>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">m2</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="standard-weight-helper-text">
              
            </FormHelperText>
          </FormControl>

          <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', alignSelf: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>
              Mis aastal su kodu ehitatud on?
            </Typography>
            <Slider 
            min={1920} 
            max={2020}
            step={10} 
            defaultValue={1960} 
            aria-label="Default" 
            valueLabelDisplay="on" 
            marks
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">1920</Typography>
              <Typography variant="body2">2020</Typography>
            </Box>
          </Box>

          <Button variant="contained" sx={{ alignSelf: 'center', width: '50%' }}>
            Arvuta
          </Button>
        </Stack>
      </Box>
    </body>
  </div>
  );
}

export default App;
