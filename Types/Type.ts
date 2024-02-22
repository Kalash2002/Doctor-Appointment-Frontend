export type LoginformData = {
  email: String;
  password: String;
};

export type User = {
  email: String;
  password: String;
  address: String;
  name: String;
  mobile: String;
};

export type Department = {
  id: Number;
  name: String;
  num_of_doctors: Number;
};

export type Doctor = {
  department_id: Number;
  doc_address: String;
  doc_id: Number;
  doc_name: String;
  doc_qualification: String;
  is_HOD: boolean;
};

export type UserObj = {
  email: String;
  password: String;
  address: String;
  name: String;
  mobile: String;
  id: Number;
  account_balance: Number;
};

export type AppointmentObj = {
  date: String;
  department: Department;
  doctor: Doctor;
  id: Number;
  slotId: Number;
  slotTime: String;
  status: String;
  user: UserObj;
};

export type FetchSlotObj = {
  docID: Number;
  date: String;
};

export type SlotType={
  id:Number,
  doctor:Doctor,
  date:String,
  time:String,
  status:String
}

export enum PayStatus {
  success = "CONFIRMED",
  pay_later = "PENDING_FOR_PAYMENT",
}

export type BookAppointmentObj={
  userID:Number,
  slotID:Number,
  appointmentStatus:PayStatus
}