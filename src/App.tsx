import React, { useState } from 'react';
//import logo from './logo.svg';
import logo from './greta_soon_big.png'
import './App.css';
import Box from '@mui/material/Box';
import { Button, FilledInput, FormControl, FormControlLabel, FormHelperText, Grid2 as Grid, Input, InputAdornment, OutlinedInput, Slider, Stack, Switch, TextField, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

function App() {

  const [area, setArea] = useState<number | null>(null)
  const [constructionYear, setConstructionYear] = useState<number>(1960)
  const [ownPower, setOwnpower] = useState<number | null>(null)
  const [ownHeaterName, setOwnHeaterName] = useState<string | undefined>(undefined)
  const [ownSwitch, setOwnSwitchChecked] = useState<boolean>(false);

  const calculateQty = (power: number | null) => {
    let yearFactor;

    switch (true) {
      case constructionYear < 1960:
        yearFactor = 190;
        break;
      case constructionYear < 1970:
        yearFactor = 185;
        break;
      case constructionYear < 1980:
        yearFactor = 175;
        break;
      case constructionYear < 1990:
        yearFactor = 165;
        break;
      case constructionYear < 2000:
        yearFactor = 175;
        break;
      case constructionYear < 2010:
        yearFactor = 130;
        break;
      case constructionYear <= 2020:
        yearFactor = 85;
        break;
      default:
        yearFactor = 185;
    }
    const calcArea = area ? area : 0;
    const calcPower = power ? power / 1000 * 24 : 0;

    const icons = Math.max(Math.ceil(((calcArea * yearFactor) / 365 / calcPower)), 0);
    console.log(icons)
    return icons;
  }

  const iconCount = calculateQty(4200);
  const halogenCount = calculateQty(54);
  const chickenCount = calculateQty(15);
  const cowCount = calculateQty(3000);
  const ownHeaterCount = calculateQty(ownPower)

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
            //justifyContent: 'center',
            mt: 5,
            flexDirection: 'column',
            px: 6, // Padding for small screens
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
                maxWidth: '200px', // Limit width on larger screens
                alignSelf: 'center', // Center in the stack
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Kui suur ehitis on?
              </Typography>
              <Box
                sx={{
                  maxWidth: 100,
                  alignSelf: 'center'
                }}
              >

                <Input
                  type='number'
                  id="pindala"
                  value={area}
                  onChange={
                    (event) => {
                      const newValue = event.target.value.replace(/^0/, ''); // Remove non-digit characters
                      setArea(newValue === '' ? null : Number(newValue));
                    }

                  }
                  endAdornment={<InputAdornment position="end">m2</InputAdornment>}
                  aria-describedby="Sisesta pindala"
                  inputProps={{
                    'aria-label': 'pindala',
                    min: 0,
                  }}
                />
              </Box>
            </FormControl>

            <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', alignSelf: 'center' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
                Mis aastal ehitatud?
              </Typography>
              <Slider
                min={1920}
                max={2020}
                step={10}
                defaultValue={1960}
                value={constructionYear}
                onChange={(event, newValue) => setConstructionYear(newValue as number)}
                aria-label="Ehitusaasta"
                valueLabelDisplay="on"
                marks
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">1920</Typography>
                <Typography variant="body2">2020</Typography>
              </Box>
            </Box>
            <Box sx={{ alignSelf: 'center' }}>
              <FormControlLabel control={
                <Switch
                checked={ownSwitch}
                onChange={(event) => setOwnSwitchChecked(event.target.checked)}
                />
              } label="Lisa oma kütte-elemendi"
              />
            </Box>
              {ownSwitch && <Box>
              <Input
                id="omaküte"
                value={ownHeaterName}
                onChange={
                  (event) => setOwnHeaterName(event.target.value)
                }
                //endAdornment={<InputAdornment position="end">w</InputAdornment>}
                //aria-describedby="Sisesta võimsus vattides"
                inputProps={{
                  'aria-label': 'Nimi',
                  "placeholder": 'Nimetus'
                }}
                sx={{
                  mr: 2
                }}
              />
              <Input
                type='number'
                id="omaküte"
                value={ownPower}
                onChange={
                  (event) => {
                    const newValue = event.target.value.replace(/^0/, ''); // Remove non-digit characters
                    setOwnpower(newValue === '' ? null : Number(newValue));
                  }

                }
                endAdornment={<InputAdornment position="end">w</InputAdornment>}
                aria-describedby="Sisesta võimsus vattides"
                inputProps={{
                  'aria-label': 'võimsus',
                  'placeholder': 'Võimsus',
                  min: 0,
                }}
              />
            </Box>}
            

            <Grid container spacing={1}>

              {[...Array(iconCount)].map((_, index) => (
                <Grid key={index}>
                  <StorageIcon />
                </Grid>
              ))}
            </Grid>
            {iconCount != 0 && <Box>
              {`Sul läheb vaja täpselt ${iconCount} keskmist serveritorni`}<br />
              {`või ${halogenCount} halogeenpirni`}<br />
              {`või ${chickenCount} kana`}<br />
              {`või ${cowCount} lehma`}<br />
              {ownSwitch && <Box>
                {`või ${ownHeaterCount} ${ownHeaterName}`}
              </Box>}
              


            </Box>}

          </Stack>
        </Box>
      </body>
    </div>
  );
}

export default App;
