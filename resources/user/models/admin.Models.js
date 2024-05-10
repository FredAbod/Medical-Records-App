import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  fullName: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  password: { type: String, required: true, minlength: 8 },
  token: { type: String},
  role: { type: String, required: true, role: 'admin', default: 'admin' },
},
{
  timestamps: true,
  versionKey: false,
});


const Admin = mongoose.model('Admin', adminSchema);

export default Admin;