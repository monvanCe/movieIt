import {addNotification} from '@src/store/slices/notificationSlice';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {notificationTypes} from '@src/const/enums';

const useFriendshipNotification = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.currentUser?._id);

  const addSentFriendshipRequest = (requestId: string, to: any) => {
    const newNotification: INotification = {
      _id: requestId,
      type: notificationTypes.friendship,
      from: {_id: userId},
      to,
      status: 'send',
      message: 'Friendship request sent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      image: to.avatarId,
      subTitle: 'Friendship request',
      movie: null,
    };
    dispatch(addNotification(newNotification));
  };

  return {
    addSentFriendshipRequest,
  };
};

export default useFriendshipNotification;
