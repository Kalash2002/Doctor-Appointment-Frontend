import axios from "axios";

export type formData = {
  email: String;
  password: String;
};

export const AuthenticateUser = async (formdata: formData) => {
  try {
    const response = await axios("http://localhost:8080/api/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: formdata,
    });
    
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
    throw Error("Wrong Email or Password");
  }
};
