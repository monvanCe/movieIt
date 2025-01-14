import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NotificationState {
  notifications: INotification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    setNotification: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { addNotification, removeNotification, setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
