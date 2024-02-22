"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FetchDepartment,
  FetchUserAppointment,
} from "@/app/api/dataFetch/router";
import App from "@/app/page";
import ButtonSet from "@/components/ButtonSet";
import { AppointmentObj, Department } from "@/Types/Type";
import Appointment from "@/components/Appointment";
import UserHistory from "@/components/UserHistory";

const Dashboard = () => {
  const [departmentList, setDepartmentList] = React.useState<Department[]>([]);
  const [toggle, setToggle] = useState(false);
  const [userHistoryList, setUserHistoryList] = React.useState<
    AppointmentObj[]
  >([]);

  const searchParams = useSearchParams();
  const UserID = JSON.parse(searchParams.get("UserID") || "{}");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const fetchAppointment = async () => {
    const res = await FetchUserAppointment(UserID);

    setUserHistoryList(res);
  };

  const fetchDepartment = async () => {
    const res = await FetchDepartment();
    setDepartmentList(res);
  };

  useEffect(() => {
    fetchAppointment();
    fetchDepartment();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-6 mt-6 items-center">
      <UserHistory history={userHistoryList} />
      <button
        className="bg-yellow-200 w-[16rem] p-2 rounded hover:bg-green-300"
        onClick={handleToggle}
      >
        Book An Apoointment
      </button>
      {toggle && <Appointment userId={UserID} className="w-full bg-blue-300"/>}
      <div></div>
    </div>
  );
};

export default Dashboard;
