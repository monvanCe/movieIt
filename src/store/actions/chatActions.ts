import {getMessagesService} from '@src/service/internalServices';
import {setMessages, setLastSeenMessage} from '../slices/chatSlice';
import {store} from '../store';
import storage from '@src/utils/storage';
import {storageKeys} from '@src/const/enums';

interface MessageUser {
  _id: string;
  userName: string;
  avatarId: string;
}

interface MessageResponse {
  _id: string;
  content: string;
  user: MessageUser;
}

const state = store.getState();
const appConfig = state.appConfig;
const dispatch = store.dispatch;

export const loadMessages = async () => {
  const response = await getMessagesService(appConfig.roomId);
  const lastSeenMessage = await storage.getItem(storageKeys.lastSeenMessage);

  const mappedMessages = response.map((msg: MessageResponse) => ({
    _id: msg._id,
    userId: msg.user._id,
    username: msg.user.userName,
    message: msg.content,
    avatar: msg.user.avatarId,
  }));

  dispatch(setMessages(mappedMessages));
  if (lastSeenMessage) {
    dispatch(setLastSeenMessage(lastSeenMessage));
  }
};
