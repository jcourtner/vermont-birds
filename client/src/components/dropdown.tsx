import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface SpeciesDataObject {bird_id: string, bird_comName: string}

export default function Dropdown(props) {
  const { selectedBird, setSelectedBird} = props;
  const [speciesData, setSpeciesData] = useState<SpeciesDataObject[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/birds/species');
      setSpeciesData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  }, []);

  return (
    <div className="w-full">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Bird Species</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedBird}
            autoWidth
            onChange={(ev) => setSelectedBird(ev.target.value)}
          >
            <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {speciesData.map((bird, idx) => (
          <MenuItem key={idx} value={bird.bird_id}>{bird.bird_comName}</MenuItem>
        ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
