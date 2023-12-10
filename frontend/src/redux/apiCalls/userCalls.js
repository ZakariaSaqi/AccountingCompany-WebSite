import { userActions } from "../slices/userSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
//Get user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(userActions.setProfile(data));
      console.log(JSON.parse(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//Uolaad  profile photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(userActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      const user = JSON.parse(localStorage.getItem("AccountingUser"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("AccountingUser", JSON.stringify(user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };
}
// //Update  profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(userActions.updateUserProfile(data));
      const username =
        data?.firstname.charAt(0).toUpperCase() +
        data?.firstname.slice(1) +
        " " +
        data?.lastname;
      dispatch(authActions.setUsername(username));
      const user = JSON.parse(localStorage.getItem("AccountingUser"));
      user.username = username;
      localStorage.setItem("AccountingUser", JSON.stringify(user));
    } catch (error) {
      toast.error(error);
    }
  };
}
// // delete profile
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(userActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(userActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(userActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error);
      dispatch(userActions.clearLoading());
    }
  };
}
// // count users
export function getUsersCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/users/count");
      dispatch(userActions.setUsersCount(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
// get all users
export function getAllProfiles(search) {
  return async (dispatch, getState) => {
    let link;
    if (search) {
      link = request.get(`/api/users?search=${search}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
    } else {
      link = request.get(`/api/users`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
    }
    try {
      const { data } = await link;
      dispatch(userActions.setProfiles(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
