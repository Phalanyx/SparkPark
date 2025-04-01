import mongoose, { Document } from "mongoose";

mongoose.pluralize(null); 

export interface IVehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  color: string;
}

const VehicleSchema = new mongoose.Schema<IVehicle>({
  id: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  licensePlate: { type: String, required: true },
  color: { type: String, required: true }
});

export interface IUser extends Document {
  uid: string;
  email: string;
  name: string;
  vehicles: IVehicle[];
}

const UserSchema = new mongoose.Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  vehicles: [VehicleSchema]
});

export default mongoose.model<IUser>("users", UserSchema);
