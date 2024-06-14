import { Modal, Box, TextField, Button, Theme } from '@mui/material'
import { createProfile, updateProfile } from "./profileSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from './profileUtils';
import { Profile } from './profileUtils'
import {useState} from 'react';

const modalStyle = {
  overflow: 'scroll'
};

const formStyle =  (theme: Theme) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  [theme.breakpoints.down('md')]: {
    top: '70%'
  }
});

const provfileImageWrapperStyle = {
  textAlign: 'center',
  margin: '10px',
  width: '95%'
};

const halfWidthInputStyle = (theme: Theme) => ({
  margin: "10px",
  [theme.breakpoints.down('md')]: {
    width: "95%"
  },
  [theme.breakpoints.up('md')]: {
    width: "45.5%"
  }
});

const fullWidthInputStyle = {
  margin: "10px",
  width: "95%"
};

const ProfileShow  = ({open = false, onClose=() => {}, profile = {
  id: null,
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  photo: '',
  notes: ''} }: { open?: boolean, onClose?: () => void, profile?: Profile }) => {
  const dispatch: AppDispatch = useDispatch();

  const id = profile.id;

  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);
  const [state, setState] = useState(profile.state);
  const [zip, setZip] = useState(profile.zip);
  const [photo, setPhoto] = useState(profile.photo);
  const [notes, setNotes] = useState(profile.notes);

  const handleSave = () => {
    console.log(formIsValid());
    if(formIsValid()) {
      const newProfile: Profile = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        address: address,
        city: city,
        state: state,
        zip: zip,
        photo: photo,
        notes: notes
      }
      if(id === null) {
        // create new profile
        dispatch(createProfile(newProfile));
      } else {
        // update existing profile
        newProfile.id = id;
        dispatch(updateProfile(newProfile));
      }
      onClose();
    }
  }

  const handleCancel = () => {
    onClose();
  }

  const formIsValid = () => {
    return !Object.entries(validations).some(([key, value]) => value === true);
  }

  const validations = {
    firstName: firstName === '',
    lastName: lastName === '',
    phone: phone === '',
    email: email === '',
    address: address === '',
    city: city === '',
    state: state === '' || state.length > 2,
    zip: zip.length !== 5
  }


  return (
    <Modal sx={modalStyle} open={open} onClose={handleCancel}>
      <Box sx={formStyle} >
        { photo && <Box sx={provfileImageWrapperStyle}><img height="150" width="150" src={photo} alt="User Profile" /></Box> }
        <div>
          <TextField sx={halfWidthInputStyle} label="First Name" name="first_name" defaultValue={firstName} 
            onChange={(e) => setFirstName(e.target.value)} error={validations.firstName} helperText="Enter first name"/>
          <TextField sx={halfWidthInputStyle} label="Last Name" name="last_name" defaultValue={lastName} 
            onChange={(e) => setLastName(e.target.value)} error={validations.lastName} helperText="Enter last name"/>
          <TextField sx={halfWidthInputStyle} label="Phone" name="phone" defaultValue={phone} 
            onChange={(e) => setPhone(e.target.value)} error={validations.phone} helperText="Enter phone number"/>
          <TextField sx={halfWidthInputStyle} label="Email" name="email" defaultValue={email} 
            onChange={(e) => setEmail(e.target.value)} error={validations.email} helperText="Enter email address"/>
          <TextField sx={halfWidthInputStyle} label="Address" name="address" defaultValue={address} 
            onChange={(e) => setAddress(e.target.value)} error={validations.address} helperText="Enter mailing address"/>
          <TextField sx={halfWidthInputStyle} label="City" name="city" defaultValue={city} 
            onChange={(e) => setCity(e.target.value)} error={validations.city} helperText="Enter city name"/>
          <TextField sx={halfWidthInputStyle} label="State" name="state" defaultValue={state} 
            onChange={(e) => setState(e.target.value)} error={validations.state} helperText="Enter a 2 letter state code"/>
          <TextField sx={halfWidthInputStyle} label="Zip" name="zip" defaultValue={zip} 
            onChange={(e) => setZip(e.target.value)} error={validations.zip} helperText="Enter a 5 digit number"/>
        </div>
        <div>
          <TextField sx={fullWidthInputStyle} label="Photo Url" name="photo" defaultValue={photo} 
            onChange={(e) => setPhoto(e.target.value)} />
        </div>
        <div>
          <TextField sx={fullWidthInputStyle} label="Notes" name="notes" defaultValue={notes} 
            onChange={(e) => setNotes(e.target.value)} multiline rows={4} />
        </div>
        <div>
          <Button sx={halfWidthInputStyle} type="button" onClick={handleSave}>Save</Button>
          <Button sx={halfWidthInputStyle} type="button" onClick={handleCancel}>Cancel</Button>
        </div>
      </Box>
    </Modal>
  )
}

export { ProfileShow }