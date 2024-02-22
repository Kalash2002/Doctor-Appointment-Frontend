import { AppointmentObj, Department } from "@/Types/Type";
import React from "react";

type buttonList = {
  button: { id: Number; name: String; num_of_doctors: Number }[];
  onSelect: (departmentId: Number) => {};
  selectedButton: Number;
};

const ButtonSet = ({ button, onSelect, selectedButton }: buttonList) => {
  return (
    <div className="w-full flex justify-center">
      {button.map((department, index) => (
        <button
          key={index}
          className={`${
            selectedButton === department.id ? "bg-red-600" : "bg-slate-400"
          } p-4 m-4 h-16 w-32`}
          onClick={() => {
            onSelect(department.id);
          }}
        >
          {department.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonSet;
