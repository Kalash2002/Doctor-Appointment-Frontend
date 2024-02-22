"use client";
import React from "react";
import { useState } from "react";
import { AuthenticateUser } from "../api/login/route";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const notify = (event: React.FormEvent<HTMLFormElement>) =>
    toast.promise(handleSubmit(event), {
      loading: "Registering",
      success: (data) => {
        const createQueryString = () => {
          const params = new URLSearchParams();
          params.set("UserID", JSON.stringify(data.id));
          return params.toString();
        };
        router.push(`/User/${data.id}?` + createQueryString()); // Redirect to login page
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
    };

    const response: Promise<any> = await AuthenticateUser(userData);
    return response;
  };

  return (
    <div className="w-full h-screen relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-[50rem] h-[25rem] p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase decoration-wavy">
          Login
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
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default LoginPage;
