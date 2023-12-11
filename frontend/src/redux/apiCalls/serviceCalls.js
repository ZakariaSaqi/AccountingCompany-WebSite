import { serviceActions } from "../slices/serviceSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch Services
export function fetchServices(search) {
  let link;
  if (search) {
    link = request.get(`/api/services?search=${search}`);
  } else {
    link = request.get(`/api/services`);
  }
  return async (dispatch) => {
    try {
      const { data } = await link;
      dispatch(serviceActions.setServices(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
export function updateService(newService, serviceId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/services/${serviceId}`, newService, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(serviceActions.setService(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
export function getSingleService(serviceId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/services/${serviceId}`);
      dispatch(serviceActions.setService(data));
    } catch (error) {
      toast.error(error);
    }
  };
}

//create category
export function addService(newServ) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/services", newServ, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(serviceActions.addService(data));
      toast.success("Service added successfully !");
    } catch (error) {
      toast.error(error);
    }
  };
}
// //delete category
export function deleteService(serviceId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/services/${serviceId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(serviceActions.deleteService(data._id));
      toast.success("Service deleted successfully !");
    } catch (error) {
      toast.error(error);
    }
  };
}

export function getServicesCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/services/count");
      dispatch(serviceActions.setServicesCount(data));
    } catch (error) {
      toast.error(error);
    }
  };
}