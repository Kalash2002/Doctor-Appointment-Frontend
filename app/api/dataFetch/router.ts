import axios from "axios";
import { AppointmentObj, BookAppointmentObj, FetchSlotObj } from "@/Types/Type";

export const FetchUserAppointment = async (id: Number) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/userAppointment/${id}`
    );

    let obj:AppointmentObj[];
    obj= res.data;
    return obj;
  } catch (error) {
    console.log(error, "error in fetching appointment history");
  }
};

export const FetchDepartment = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/departmentList`);
    return res.data;
  } catch (error) {
    console.log(error, "error in fetching department history");
  }
};

export const FetchDoctor = async (id: Number) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/department/${id}/doctors`
    );

    console.log(res.data, "res");
    return res.data;
  } catch (error) {
    console.log(error, "error in fetching doctor ");
  }
};

export const FetchSlot = async (formData: FetchSlotObj) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/availableSlots",
      {
        params: formData, // Assuming formData contains query parameters
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error, "error in fetching slots");
  }
};

export const BookAppointment=async(obj:BookAppointmentObj)=>{

  try {
    console.log("1")
    console.log(obj.userID,"object")
    const response = await axios("http://localhost:8080/api/bookAppointment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: obj,
    });

    console.log("2")
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }

}
