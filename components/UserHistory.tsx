"use client";
import React, { useState } from "react";
import { AppointmentObj, PayStatus } from "@/Types/Type";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Appointment from "./Appointment";

const UserHistory = ({ history }: { history: AppointmentObj[] }) => {
  console.log(history);
  const detailModal = React.useRef(null);
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => setShowModal(true);
  const onNotShowModal = () => setShowModal(false);
  return (
    <div className="w-full">
      {history === null ? (
        <div className="">
          {/* for when list s Empty */}
          No Appointment History Found
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-5">
          <h1 className="font-semibold text-2xl">Appointment History</h1>
          {history.map((appointment, index) => {
            return (
              <>
                <div
                  key={index}
                  className="w-full h-10 items-center rounded flex flex-row bg-slate-300 p-2 hover:bg-slate-400 cursor-pointer"
                  onClick={onShowModal}
                >
                  <div className="w-[10%] ">{index + 1}.</div>
                  <div className="w-[35%]">Date: {appointment.date}</div>
                  <div className="w-[35%]">Time: {appointment.slotTime}</div>
                  <div className="">
                    Consulted: {appointment.doctor.doc_name}
                  </div>
                  <div ref={detailModal} />
                </div>
                <Modal
                  open={showModal}
                  onClose={onNotShowModal}
                  container={detailModal.current}
                >
                  <div className="h-[17rem] w-[25rem] flex flex-col gap-5 items-center">
                    <h1 className="font-semibold text-2xl">
                      Appointment Details{" "}
                    </h1>
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex gap-2">
                        <p>Booked By: </p>
                        {appointment.user.name}
                      </div>
                      <div className="flex gap-2">
                        <p>Date: </p> {appointment.date}
                      </div>
                      <div className="flex gap-2">
                        <p>Time: </p> {appointment.slotTime}
                      </div>
                      <div className="flex gap-2">
                        <p>Consulted To: </p> {appointment.doctor.doc_name}
                      </div>
                      <div className="flex gap-2">
                        <p>Department: </p> {appointment.department.name}
                      </div>
                      <div className="flex gap-2">
                        <p>Slot Status: </p> {appointment.status===PayStatus.pay_later?"Payment Pending":"Payment Done"}
                      </div>
                    </div>
                  </div>
                </Modal>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
