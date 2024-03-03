// import { useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Dropdown from './components/dropdown';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
function App() {
  const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [locationName, setLocationName] = useState('');
  // const [dropdown, setDropdown] = useState('');
  // const [numberOfBirds, setNumberOfBirds] = useState('');
  // const [fieldNotes, setFieldNotes] = useState('');

  const handleSubmit = async () => {
    alert('clicked');
    // const birdObservation = {
    //   firstName,
    // };

    try {
      const res = await axios.get('http://localhost:3000/api/user');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    //api call here
  };

  console.log({ firstName });
  return (
    <div className="flex flex-col p-4 justify-center space-y-8">
      {/* <h1 className="text-3xl font-bold underline text-red-600">
          Simple React Typescript Tailwind Sample
        </h1> */}
      <div className="m-4 flex flex-row space-x-4">
        <TextField
          required
          id="outlined-required"
          label="Required"
          placeholder="first name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="last name"
        />
      </div>
      <div className="m-4 flex flex-row space-x-4">
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="email"
        />

        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="location name"
        />
      </div>
      <div className="m-4 flex flex-row space-x-4">
        <Dropdown />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
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
          defaultValue="Default Value"
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
