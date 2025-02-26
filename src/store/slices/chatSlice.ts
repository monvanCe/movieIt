import {createSlice} from '@reduxjs/toolkit';

interface ChatState {
  message: string;
  messages: IMessage[];
  lastSeenMessage: string;
}

const initialState: ChatState = {
  message: '',
  messages: [],
  lastSeenMessage: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setLastSeenMessage: (state, action) => {
      state.lastSeenMessage = action.payload;
    },
  },
});

export const {addMessages, setMessages, setMessage, setLastSeenMessage} =
  chatSlice.actions;
export default chatSlice.reducer;
