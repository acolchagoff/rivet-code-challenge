import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProfileState, Profile, ProfileError} from './profileUtils'
import { RootState } from '../../store';
import { isArray } from 'lodash'

const initialState = {
  profiles: [],
  inFocus: null
} as ProfileState;


const RIVET_API_DOMAIN = 'https://codechallenge.rivet.work/api/v1';

async function returnNetworkProfiles() {
  const profiles = await fetch(`${RIVET_API_DOMAIN}/profiles`, {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || ''
    }
  })
  .then((response) => response.json())
  .then((data) => {
    // do something with the data
    return data;
  })

  if (isArray(profiles)) {
    return profiles;
  }
  return [profiles]
}


export const fetchProfiles = createAsyncThunk('users/fetchUsers', () => {
  return returnNetworkProfiles();
})

export const createProfile = createAsyncThunk('users/createProfile', async (profile: Profile, thunkApi) => {
  const newProfile:Profile = await fetch(`${RIVET_API_DOMAIN}/profile`, {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || '',
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(profile)
  })
  .then(async (response) => {
    if (response.status === 422) {
      // Return the known error for future handling
      return thunkApi.rejectWithValue((await response.json()) as ProfileError)
    }
    return response.json()
  })
  .then((data) => {
    return data;
  });
  return newProfile;
});

export const updateProfile = createAsyncThunk('users/updateProfile', async (profile: Profile, thunkApi) => {
  const updatedProfile = await fetch(`${RIVET_API_DOMAIN}/profile/${profile.id}`, {
    headers: {
      "token": process.env.REACT_APP_API_TOKEN || '',
      "Content-Type": "application/json"
    },
    method: 'PUT',
    body: JSON.stringify(profile)
  })
  .then(async (response) => {
  if (response.status === 422) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue((await response.json()) as ProfileError)
  }
    return response.json()
  })
  .then((data) => {
    return data;
  });
  return updatedProfile;
});

export const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload
      }
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: state.profiles.concat(action.payload)
      }
    });
    builder.addCase(createProfile.rejected, (state, action) => {
      console.error('createProfile failed', action.error.message);
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const updatedProfile = action.payload;
      const index = state.profiles.findIndex((profile)=>profile.id === updatedProfile.id);
      if(index > -1) {
        state.profiles[index] = updatedProfile;
      }
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      console.error('updateProfile failed', action.error.message);
    });
  }
})

// Action creators are generated for each case reducer function
export const profileList = (state: RootState) => state.profile.profiles;
export const countProfiles = (state: RootState) => state.profile.profiles.length as number;

export default profileSlice.reducer