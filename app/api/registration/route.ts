import { MyAxios } from "@/service";
import axios from "axios";

export type user = {
  email: String;
  password: String;
  address: String;
  name: String;
  mobile: String;
};

export type formData = {
  email: String;
  password: String;
};

export async function getDepartments() {
  try {
  } catch (error) {
    console.error(error);
  }
}

export const registerUser = async (userData: user) => {
  try {
    const response = await axios("http://localhost:8080/api/registration", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: userData,
    });

    const data = await response.data;

    return data;
  } catch (error) {
    throw Error("Email Already Registered");
  }
};
