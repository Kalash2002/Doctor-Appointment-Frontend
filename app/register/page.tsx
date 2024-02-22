"use client";
import React from "react";
import { useState } from "react";
import { registerUser } from "../api/registration/route";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const router = useRouter();

  const notify = (event: React.FormEvent<HTMLFormElement>) =>
    toast.promise(handleSubmit(event), {
      loading: "Registering",
      success: () => {
        router.push("/login"); // Redirect to login page
        return <b>Success</b>;
      },
      error: (err) => {
        let errorMessage = "An error occurred";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        return <b>{errorMessage}</b>;
      },
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
      address: address,
      name: name,
      mobile: mobile,
    };

    const response = await registerUser(userData);
    console.log(response);
    return response;
  };

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-[50rem] h-[38rem] p-6 mt-6 items-center bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase decoration-wavy">
          Register
        </h1>
        <form onSubmit={(event) => notify(event)} className="mt-6">
          <div className="mt-2">
            <label className="block text-sm font-semibold text-gray-800">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-semibold text-gray-800">
              Name:
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-semibold text-gray-800">
              Mobile:
            </label>
            <input
              type="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-semibold text-gray-800">
              Address
            </label>
            <input
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Log In
          </Link>
        </p>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default RegistrationPage;
