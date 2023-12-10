import { testimonyActions } from "../slices/testimonySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch Services
export function fetchTestimoniesAccepted() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/testimonies/AcceptedTestimonies");
      dispatch(testimonyActions.setTestimonies(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
export function fetchTestimonies(search) {
  return async (dispatch, getState) => {
    let link;
    if (search) {
      link = request.get(`/api/testimonies?search=${search}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
    } else {
      link = request.get(`/api/testimonies`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
    }
    try {
      const { data } = await link;
      dispatch(testimonyActions.setTestimonies(data));
    } catch (error) {
      toast.error(error);
    }
  };
}

export function accepteTestimony(testimonyId) {
  return async (dispatch, getState) => {
      try {
          await request.put(`/api/testimonies/accepteTestimony/${testimonyId}`,{}, {
              headers: {
                  Authorization: "Bearer " + getState().auth.user.token,
              },
          });
          dispatch(testimonyActions.setIsAcceptedTestimony());
      } catch (error) {
          toast.error(error);
      }
  };
}

// //create category
export function addTestimony(newTestimony) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/testimonies", newTestimony, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(testimonyActions.addTestimony(data));
      toast.success("Your testimony submited successfully !");
    } catch (error) {
      toast.error(error);
    }
  };
}
// // //delete category
export function deleteTestimony(testimonyId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/testimonies/${testimonyId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(testimonyActions.deleteTestimony(data._id));
      toast.success("Testimony deleted successfully !");
    } catch (error) {
      toast.error(error);
    }
  };
}

export function getTestimoniesCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/testimonies/count");
      dispatch(testimonyActions.setTestimoniesCount(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
