const mongoose =require('mongoose');

const DataSchema = new mongoose.Schema({

FirstName:{type:String ,required:true},
LastName:{type:String,required:true},
EmailAddress:{type:String,required:true},
MobileNumber:{type:String,required:true},
City:{type:String,required:true},
UserName:{type:String,unique:true,required:true},
Password:{type:String,required:true},



},{versionKey:false,autoIndex: true});



const ProfileModel = mongoose.model('profiles',DataSchema);


module.exports =ProfileModel;