"us client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BookAppointment,
  FetchDepartment,
  FetchDoctor,
  FetchSlot,
  FetchUserAppointment,
} from "@/app/api/dataFetch/router";
import App from "@/app/page";
import ButtonSet from "@/components/ButtonSet";
import {
  Department,
  Doctor,
  FetchSlotObj,
  SlotType,
  PayStatus,
  BookAppointmentObj,
} from "@/Types/Type";
import DoctorContainer from "./DoctorContainer";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import DatePicker from "react-datepicker";
import { FaCalendarDays } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";


export const Appointment = (userId: Number) => {
  const [departmentList, setDepartmentList] = React.useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = React.useState<Number>(0);
  const [doctorList, setDoctorList] = React.useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = React.useState<Number>(0);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSlotsModal, setShowSlotsModal] = useState(false);
  const [showPayModal, setShowPaysModal] = useState(false);
  const [date, setDate] = React.useState<String>("");
  const [slotList, setSlotList] = React.useState<SlotType[]>([]);
  const [selectedSlot, setSelectedSlot] = React.useState<Number>(0);
  const [payStatus, setPayStatus] = React.useState<PayStatus>(
    PayStatus.pay_later
  );

  const dateModal = React.useRef(null);
  const slotModal = React.useRef(null);
  const PaymentModal = React.useRef(null);

  const router = useRouter();

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setOpenDateModal(false);
    setShowSlotsModal(true);
  };
  const onOpenPayModal = () => setShowPaysModal(true);
  const onClosePayModal = () => setShowPaysModal(false);
  const onDateOpenModal = () => setOpenDateModal(true);
  const onDateCloseModal = () => {
    setOpenDateModal(false);
  };
  const handleCloseSlotsModal = () => {
    setShowSlotsModal(false);
  };

  const SetDate = async () => {
    const a =
      selectedDate.getFullYear().toString() +
      "-" +
      (selectedDate.getMonth() + 1).toString() +
      "-" +
      (selectedDate.getDate() + 1).toString();

    setDate(a);

    setTimeout(() => {}, 1000);
  };

  const fetchDoctor = async () => {
    const res = await FetchDoctor(selectedDepartment);
    setDoctorList(res);
  };

  const fetchDepartment = async () => {
    const res = await FetchDepartment();
    setDepartmentList(res);
  };

  const fetchSlots = async () => {
    let FetchObj: FetchSlotObj = {
      docID: selectedDoctor,
      date: selectedDate.toISOString().split("T")[0], // Convert to yyyy-mm-dd format
    };
    if (date !== "" && FetchObj.date !== "") {
      let res: SlotType[] = await FetchSlot(FetchObj);
      setSlotList(res);
    }
  };

  const bookAppoinMent = async () => {
    let payLoad: BookAppointmentObj = {
      userID: userId.userId,
      slotID: selectedSlot,
      appointmentStatus: payStatus,
    };

    const response: Promise<any> = await BookAppointment(payLoad);
    return response;
  };

  const notify = () =>
    toast.promise(bookAppoinMent(), {
      loading: "Booking Your Slot",
      success: () => {
        onClosePayModal();
        onDateCloseModal();
        handleCloseSlotsModal();

        const createQueryString = () => {
          const params = new URLSearchParams();
          params.set("UserID", JSON.stringify(userId.userId));
          return params.toString();
        };
        router.push(`/User/${userId.userId}?` + createQueryString()); // Redirect to login page
        window.location.reload();
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

  useEffect(() => {
    fetchDoctor();
  }, [selectedDepartment]);

  useEffect(() => {
    fetchDepartment();
  }, []);
  useEffect(() => {
    SetDate();
  }, [selectedDate]);

  useEffect(() => {
    fetchSlots();
  }, [date]);

  // Function to handle button selection
  const handleButtonSelect = (departmentId: Number): {} => {
    setSelectedDepartment(departmentId);
    return {};
  };

  const handleDocSelect = (docId: Number): {} => {
    setSelectedDoctor(docId);
    return {};
  };

  const handleSlotSubmit = (id: Number) => {
    setSelectedSlot(id);
    onOpenPayModal();
  };

  const handlePaymentStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayStatus(event.target.value as PayStatus);
  };

  const handlePaymentSubmit = async () => {
    bookAppoinMent();
  };

  return (
    <div className="w-full bg-yellow-50 my-10">
      {/* Department Buttons */}
      <ButtonSet
        button={departmentList}
        onSelect={handleButtonSelect}
        selectedButton={selectedDepartment}
      />

      {/*  Dcotors List for Selscted Department*/}
      <DoctorContainer
        docList={doctorList}
        onSelect={handleDocSelect}
        selectedDoc={selectedDoctor}
        onBook={onDateOpenModal}
      />

      <div ref={dateModal} />
      <div ref={slotModal} />

      {/* Modal for date selection */}

      <Modal
        open={openDateModal}
        onClose={onDateCloseModal}
        container={dateModal.current}
      >
        <div className="flex flex-col gap-4 z-10000001">
          <h2>Select Date for Appointment</h2>
          <div className="w-[20rem] h-[18rem]  flex flex-col items-center gap-5">
            <div className="flex items-center gap-6">
              <FaCalendarDays className="" />
              <DatePicker
                selected={selectedDate}
                onChange={handleDateSelection}
                dateFormat="yyyy/MM/dd"
                className="border w-24 p-1"
              ></DatePicker>
            </div>

            <button
              onClick={onDateCloseModal}
              className="bg-slate-300 p-1 rounded hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal for slot containers */}
      <Modal
        open={showSlotsModal}
        onClose={handleCloseSlotsModal}
        container={slotModal.current}
      >
        <div className="h-[35rem] w-[30rem] flex flex-col gap-4 justify-center items-center">
          <h1 className="font-semibold text-2xl">
            Select Slot of{" "}
            <text className="text-red-400">{selectedDate.toDateString()}</text>
          </h1>
          <div className="grid grid-cols-3 gap-1">
            {slotList?.map((slots, index) => (
              <button
                key={index}
                className={`bg-slate-300 hover:bg-slate-400 p-2 m-4 h-12 w-32`}
                onClick={() => handleSlotSubmit(slots.id)}
              >
                {slots.time}
              </button>
            ))}
          </div>
        </div>
        <div ref={PaymentModal} />
      </Modal>

      {/* Payment Modal */}
      <Modal
        open={showPayModal}
        onClose={onClosePayModal}
        container={PaymentModal.current}
      >
        <div className="h-[15rem] w-[15rem] flex flex-col gap-4 justify-center items-center">
          <h2 className="font-semibold text-lg">Payment Status</h2>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="radio"
                value={PayStatus.success}
                checked={payStatus === PayStatus.success}
                onChange={handlePaymentStatusChange}
              />
              Pay
            </label>
            <label>
              <input
                type="radio"
                value={PayStatus.pay_later}
                checked={payStatus === PayStatus.pay_later}
                onChange={handlePaymentStatusChange}
              />
              Pay Later
            </label>
          </div>
          <button
            // onClick={/* Your submission logic here */}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={notify}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Appointment;
