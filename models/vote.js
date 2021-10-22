const mongoose=require('mongoose');

const  voteSchema= new mongoose.Schema({
   
    name:{
        type:String,
        required:true
        

    },
    branch:{
            type:String,
            required:true,
            enum:['CSE','ECE','CIVIL','AEROSPACE']
    },
    candidate:{
        type:String,
        required:true
    },
    comment:{
          type:String,
          required:true
          
    },
    email:{
        type:String,
        required:true
    }

});

const Vote=mongoose.model('Vote',voteSchema);

module.exports= Vote;