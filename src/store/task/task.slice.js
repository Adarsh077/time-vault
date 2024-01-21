import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { title: 'Tech: General', id: 1 },
    { title: 'Tech: Portal', id: 2 },
    { title: 'Tech: Buisness', id: 3 },
    { title: 'Tech: External', id: 4 },
    { title: 'Examcell', id: 5 },
    { title: 'Tvs App', id: 6 },
  ],
};

export const taskSlice = createSlice({
  name: 'taskSlice',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;
