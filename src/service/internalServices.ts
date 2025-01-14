import * as endPoints from '@src/const/internalEndpoints';

import {deleteRequest, getRequest, postRequest, putRequest} from './api';

// User endpoints
export const loginService = async (
  userUniqeId: string,
  platform?: string,
  notificationId?: string,
  version?: number,
) => {
  try {
    const response = await postRequest('internal', endPoints.sendUserLogin, {
      userUniqeId,
      platform,
      notificationId,
      version,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async (userData: object) => {
  try {
    const response = await putRequest(
      'internal',
      endPoints.sendUserUpdate,
      userData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendFriendshipRequestService = async (friendId: string) => {
  try {
    const response = await postRequest(
      'internal',
      endPoints.sendFriendshipRequest,
      {
        to: friendId,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendAnswerRequestService = async (
  id: string,
  status: 'accept' | 'reject' | 'cancelled' | 'removing',
) => {
  try {
    if (status === 'removing') {
      var response = await deleteRequest(
        'internal',
        `${endPoints.sendDeleteFriend}${id}`,
      );
      return response;
    } else if (status === 'cancelled') {
      var response = await deleteRequest(
        'internal',
        `${endPoints.sendCancelRequest}${id}`,
      );
      return response;
    } else {
      var response = await postRequest(
        'internal',
        endPoints.sendAnswerRequest + id,
        {status},
      );
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllRequestsService = async () => {
  try {
    const response = await getRequest('internal', endPoints.getAllRequests);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProfileService = async (userId: string) => {
  try {
    const response = await getRequest(
      'internal',
      `${endPoints.getProfile}${userId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFriendsService = async () => {
  try {
    const response = await getRequest('internal', endPoints.getFriends);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSearchedUsersService = async (searchTerm: string) => {
  try {
    const response = await getRequest(
      'internal',
      `${endPoints.getSearchedUsers}${searchTerm}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReceivedRequestsService = async () => {
  try {
    const response = await getRequest(
      'internal',
      endPoints.getReceivedRequests,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSendedRequestsService = async () => {
  try {
    const response = await getRequest('internal', endPoints.getSendedRequests);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPendingRequestsService = async () => {
  try {
    const response = await getRequest('internal', endPoints.getPendingRequests);
    return response;
  } catch (error) {
    throw error;
  }
};

// Movie endpoints
export const addOrUpdateMovieService = async (movieData: object) => {
  try {
    const response = await postRequest(
      'internal',
      endPoints.sendAddAndUpdateMovieUserList,
      movieData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendFriendAddMovieRequestService = async (
  friendShipId: string,
  movieId: number,
  type: 'towatched' | 'watched',
) => {
  try {
    const response = await postRequest(
      'internal',
      endPoints.sendFriendAddMovieRequest,
      {
        friendShipId,
        movieId: movieId.toString(),
        type,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendFriendAnswerMovieRequestService = async (
  requestData: object,
) => {
  try {
    const response = await postRequest(
      'internal',
      endPoints.sendFriendAnswerMovieRequest,
      requestData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const sendFriendMovieUpdateService = async (movieData: object) => {
  try {
    const response = await putRequest(
      'internal',
      endPoints.sendFriendMovieUpdate,
      movieData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFriendMovieService = async (movieId: string) => {
  try {
    const response = await deleteRequest(
      'internal',
      `${endPoints.delFriendMovie}/${movieId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserWatchedMoviesService = async () => {
  try {
    const response = await getRequest('internal', endPoints.getUserWatched);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserWatchlistService = async () => {
  try {
    const response = await getRequest('internal', endPoints.getUserWatchlist);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFriendWatchedMoviesService = async (friendId: string) => {
  try {
    const response = await getRequest(
      'internal',
      `${endPoints.getFriendWatched}${friendId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFriendWatchlistService = async (friendId: string) => {
  try {
    const response = await getRequest(
      'internal',
      `${endPoints.getFriendWatchlist}${friendId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUserMovieService = async (movieId: string) => {
  try {
    const response = await deleteRequest(
      'internal',
      `${endPoints.delUserMovie}/${movieId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// App config endpoints
export const getConfigListService = async () => {
  try {
    const response = await getRequest('internal', endPoints.getConfigList);
    return response;
  } catch (error) {
    throw error;
  }
};
