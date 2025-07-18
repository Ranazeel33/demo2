import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import typography from './theme/typography'
import { createTheme } from '@mui/material/styles';
import { getCountries, getStates, getCities } from './locationapi';

// const API_KEY = 'RmYyOHVGMnBSS0VoRUc5cTRMMmhnc2UwdE1WdVZqaHRicnhMbzJ6eA==';

const LocationDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { control, watch, setValue } = useForm();

  const selectedCountry = watch('country');
  const selectedState = watch('state');


  useEffect(() => {
    getCountries()
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates(selectedCountry)
        .then((res) => setStates(res.data))
        .catch((err) => console.error(err));
      setValue('state', '');
      setValue('city', '');
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities(selectedCountry, selectedState)
        .then((res) => setCities(res.data))
        .catch((err) => console.error(err));
      setValue('city', '');
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry, setValue]);


  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" mb={3}>
        Select Your Location
      </Typography>


      <FormControl fullWidth margin="normal">
        <InputLabel>Country</InputLabel>
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} label="Country">
              <MenuItem value="">Select Country</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.iso2} value={country.iso2}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>


      <FormControl fullWidth margin="normal" disabled={!selectedCountry}>
        <InputLabel>State</InputLabel>
        <Controller
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} label="State">
              <MenuItem value="">Select State</MenuItem>
              {states.map((state) => (
                <MenuItem key={state.iso2} value={state.iso2}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>


      <FormControl fullWidth margin="normal" disabled={!selectedState}>
        <InputLabel>City</InputLabel>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select {...field} label="City">
              <MenuItem value="">Select City</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>


      <Typography variant="rana">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="body1">This is body text.</Typography>
      <typography>hey my name is rana zeel</typography>
      <Typography>Hey my name is rana zeel</Typography>
    </Box>
  );
};

export default LocationDropdown;
