import mongoose, { Schema } from 'mongoose';

const userModel = new Schema({
    first_name : String,
    last_name : String,
    dob : String,
    email : String,
    phone: String,
    address : String,
    cur_school : String
});

export default mongoose.model('User', userModel);