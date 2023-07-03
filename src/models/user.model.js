import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        min: 3,
    },
    email:{
        type:String,
        required:true,
        min: 3,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        min: 3,
    },
    roles: {
        type: String,
        required: true,
        min: 3,
    }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;