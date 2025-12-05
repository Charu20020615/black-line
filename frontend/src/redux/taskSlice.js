import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [] },
  reducers: {
    addTask(state, action) { state.items.push(action.payload); },
    removeTask(state, action) { state.items = state.items.filter(t => t.id !== action.payload); }
  }
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;


