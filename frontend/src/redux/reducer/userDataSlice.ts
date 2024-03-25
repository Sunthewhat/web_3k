import { allInstitute } from '@/constants/all-institute';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface UserDataState {
  institute: (typeof allInstitute)[number] | null;
}

const initialState: UserDataState = {
  institute: null,
};

export const counterSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setInstitute: (state, action) => {
      state.institute = action.payload;
    },
  },
});

export const { setInstitute } = counterSlice.actions;

export const selectUserData = (state: RootState) => state.userData;

export default counterSlice.reducer;
