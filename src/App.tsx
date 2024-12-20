import { useState } from 'react';
//import logo from './greta_soon_big.png'
import './App.css';
import Box from '@mui/material/Box';
import { FormControlLabel, Grid2 as Grid, Input, InputAdornment, Slider, Stack, Switch, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

function App() {

  const [area, setArea] = useState<number | null>(10)
  const [constructionYear, setConstructionYear] = useState<number>(1960)
  const [ownPower, setOwnpower] = useState<number | null>(0)
  const [ownHeaterName, setOwnHeaterName] = useState<string | undefined>('')
  const [ownSwitch, setOwnSwitchChecked] = useState<boolean>(false);

  const calculateQty = (power: number | null): number | string => {
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
    return icons !== Infinity ? icons : '\u221E';
  }

  const iconCount = calculateQty(420);
  const ownHeaterCount = calculateQty(ownPower)

  return (

    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        Kodud soojaks serveritega
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


            <Box
              sx={{
                width: '100%',
                maxWidth: 400,
                mx: 'auto',
                alignSelf: 'center'
              }}
            >
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
                Mitu ruutmeetrit on ehitis?
              </Typography>
              <Slider
                min={10}
                max={250}
                step={5}
                value={area as number}
                onChange={(event, newValue) => setArea(newValue as number)}
                valueLabelDisplay='on'
              //marks
              />
            </Box>

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
              } label="Lisa oma kütte-element"
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
            {iconCount !== 0 && <Box>
              {`Sul läheb vaja ${iconCount} keskmist serverit`}<br />
              {ownSwitch && <Box><p>
                {`või kui sul on kütte-elemendiks ${ownHeaterName !== "" ? ownHeaterName : "_______"} võimsusega ${ownPower}w,`}<br />
                {`siis läheb sul neid vaja ${ownHeaterCount} tk`}
              </p>
              </Box>}
            </Box>}

          </Stack>
        </Box>
      </body>
    </div>
  );
}

export default App;
