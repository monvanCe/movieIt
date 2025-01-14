//user endpoints
export const sendUserLogin = '/user/login';
export const sendUserUpdate = '/user/update';
export const sendFriendshipRequest = '/friendship/create';
export const getAllRequests = '/requests/all';
export const getProfile = '/user/profile?id=';
export const getFriends = '/friendship';
export const getSearchedUsers = '/user/find?search=';
export const getReceivedRequests = '/requests';
export const getSendedRequests = '/requests/send';
export const getPendingRequests = '/requests/pending';
export const sendAnswerRequest = '/requests/answer?id=';
export const sendCancelRequest = '/requests/cancel?id=';
export const sendDeleteFriend = '/friendship?id=';

//movie endpoints
export const sendAddAndUpdateMovieUserList = '/movies/add';
export const sendFriendAddMovieRequest = '/movies/friendship/add';
export const sendFriendAnswerMovieRequest = '/movies/friendship/request';
export const sendFriendMovieUpdate = '/movies/friendship/movie';
export const delFriendMovie = '/friendship/movie?id=';
export const getUserWatched = '/movies/watched';
export const getUserWatchlist = '/movies/towatched';
export const getFriendWatched = '/movies/friendship/watched?id=';
export const getFriendWatchlist = '/movies/friendship/towatched?id=';
export const delUserMovie = '/movies/remove';

//app config endpoints
export const getConfigList = '/appConfig';
