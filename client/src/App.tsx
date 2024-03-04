import './App.css';
import TextField from '@mui/material/TextField';
import Dropdown from './components/dropdown';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [locationName, setLocationName] = useState('');
  const [numberOfBirds, setNumberOfBirds] = useState('');
  const [fieldNotes, setFieldNotes] = useState('');
  const [selectedBird, setSelectedBird] = useState('');

  const handleSubmit = async () => {
    const birdObsData = {
      firstName,
      lastName,
      email,
      locName: locationName,
      howMany: numberOfBirds,
      speciesId: selectedBird,
      fieldNotes
    };

    try {
      const res = await axios.post('http://localhost:3000/api/observations/new', birdObsData);
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="flex flex-col p-4 justify-center space-y-8">
      <h1 className="text-3xl font-bold text-blue-400">
          Submit a Bird Observation
        </h1>
      <div className="m-4 flex flex-row space-x-4">
        <TextField
          required
          id="outlined-required"
          label="First Name"
          placeholder="first name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          placeholder="last name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <div className="m-4 flex flex-row space-x-4">
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Location Name"
          placeholder="location name"
          onChange={(e) => {
            setLocationName(e.target.value);
          }}
        />
      </div>
      <div className="m-4 flex flex-row space-x-4">
        <Dropdown selectedBird={selectedBird} setSelectedBird={setSelectedBird}/>
        <TextField
          id="outlined-number"
          label="How Many?"
          type="number"
          placeholder="0"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setNumberOfBirds(e.target.value);
          }}
        />
      </div>
      <div className="m-4">
        <TextField
          id="outlined-multiline-static"
          label="Field Notes"
          multiline
          fullWidth
          rows={4}
          placeholder="Jot down observations here"
          onChange={(e) => {
            setFieldNotes(e.target.value);
          }}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
          size="medium"
        >
          Medium
        </Button>
      </div>
    </div>
  );
}

export default App;
