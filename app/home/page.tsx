"use client";
import React from "react";
import { getDepartments } from "../api/registration/route";
import { useState } from "react";
import HospitalImage from "../../public/hospitalimage.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const clickFun = () => {
    router.push("/login");
  };
  return (
    <div className="w-full mt-24 items-center justify-center">
      <div className="w-full flex items-center justify-center gap-20">
        <Image src={HospitalImage} alt="hospital Image" width={400} />
        <div className="w-1/3 flex flex-col items-start gap-5">
          <div className="font-bold text-5xl ">Welcome!</div>
          <div className="font-semibold text-4xl">
            {" "}
            We always think of your well-being.
          </div>
          <button
            className="bg-slate-400 rounded p-2 hover:bg-slate-500"
            onClick={clickFun}
          >
            Make an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
