const mongoose=require('mongoose');

const Schema=mongoose.Schema;

//const passportLocalMongoose=require('passport-local-mongoose');

const UserSchema= new Schema({
   googleId:{
      type:String,
      unique:true,
      required:true
   },
   image:{
      type:String,
   
   },
   username:{
      type:String,
      required:true
   },
   
   name:{
      type:String,
      required:true
   }

   

});

//UserSchema.plugin(passportLocalMongoose);



module.exports= mongoose.model('User',UserSchema);
