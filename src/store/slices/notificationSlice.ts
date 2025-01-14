import {PayloadAction, createSlice} from '@reduxjs/toolkit';

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
        notification => notification._id !== action.payload,
      );
    },
    setNotification: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },
    updateNotificationStatus: (
      state,
      action: PayloadAction<{id: string; status: string}>,
    ) => {
      const notification = state.notifications.find(
        n => n._id === action.payload.id,
      );
      if (notification) {
        notification.status = action.payload.status;
      }
    },
  },
});

export const {
  addNotification,
  removeNotification,
  setNotification,
  updateNotificationStatus,
} = notificationSlice.actions;
export default notificationSlice.reducer;
