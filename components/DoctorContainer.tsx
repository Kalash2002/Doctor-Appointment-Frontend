import React from "react";
import DocImg from "../public/DocImg.png";
import Image from "next/image";

type DocList = {
  docList: {
    doc_id: Number;
    doc_name: String;
    doc_address: String;
    doc_qualification: String;
    department_id: Number;
    is_HOD: Boolean;
  }[];
  onSelect: (docId: Number) => {};
  selectedDoc: Number;
  onBook: () => void;
};

const DoctorContainer = ({
  docList,
  onSelect,
  selectedDoc,
  onBook,
}: DocList) => {
  return (
    <div className="flex w-full justify-center items-center">
      {docList.map((doc, index) => (
        <div
          key={index}
          className={`bg-slate-300 p-4 m-4 w-[20rem] h-[25rem] flex flex-col justify-center items-center cursor-pointer`}
        >
          <Image src={DocImg} alt="doc" />
          <div className="w-full flex flex-col justify-center items-center gap-8">
            <div className="px-4 flex flex-col gap-3 mt-3 justify-start items-center">
              <div>Name: {doc.doc_name}</div>
              <div>Qualification: {doc.doc_qualification}</div>
            </div>
            <button
              onClick={() => {
                onSelect(doc.doc_id);
                onBook();
              }}
              className="bg-slate-400 hover:bg-red-400 p-1 rounded"
            >
              {" "}
              Book Appointment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorContainer;
