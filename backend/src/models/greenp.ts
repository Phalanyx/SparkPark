import mongoose from "mongoose";

mongoose.pluralize(null); 

const RateDetailSchema = new mongoose.Schema({
  when: String,
  rate: String,
});

const PeriodSchema = new mongoose.Schema({
  title: String,
  rates: [RateDetailSchema],
  notes: [String],
});

const RateDetailsSchema = new mongoose.Schema({
  periods: [PeriodSchema],
  addenda: [String],
});

const ParkingSchema = new mongoose.Schema({
  id: { type: String, required: true },
  is_bikeshare: { type: Boolean, default: false },
  ibikeshare_available: { type: String, enum: ['yes', 'no'] },
  check_bikeshare: { type: Boolean, default: false },
  slug: { type: String, required: true },
  address: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  rate: { type: String, required: true },
  carpark_type: { type: String, required: true },
  carpark_type_str: { type: String, required: true },
  is_ttc: { type: Boolean, default: false },
  is_under_construction: { type: Boolean, default: false },
  is_EV_station: { type: Boolean, default: false },
  changing_rates: { type: Boolean, default: false },
  rate_half_hour: { type: String, required: true },
  capacity: { type: String, required: true },
  max_height: { type: String, required: true },
  bike_racks: { type: String, required: true },
  payment_methods: [{ type: String }],
  payment_options: [{ type: String }],
  rate_details: RateDetailsSchema,
  monthly_permit_status: { type: String, required: true },
  monthly_permit_quantity: { type: String, default: '' },
  monthly_permit_price: { type: String, required: true },
  map_marker_logo: { type: String, required: true },
  alert_box: { type: String, default: '' },
  enable_streetview: { type: String, required: true },
  streetview_lat: { type: String, required: true },
  streetview_long: { type: String, required: true },
  streetview_yaw: { type: String, required: true },
  streetview_pitch: { type: String, required: true },
  streetview_zoom: { type: String, required: true },
  location: {
    type: { type: String, emum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  }
});




const Parking = mongoose.model("greenp", ParkingSchema);

export default Parking;