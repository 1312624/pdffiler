import mongoose , { Schema } from 'mongoose';

const schoolModel = new Schema({
	TieuBang : String,
	LoaiTruong : String,
	TenTruong : String,
	Nganh : Array,
	BieuMau : String //link to form
});

export default mongoose.model('DanhSachTruong', schoolModel, 'DanhSachTruong');