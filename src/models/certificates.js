const mongoose=require('mongoose');
const certificateschema=new mongoose.Schema({
    icon:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    name:{
      type:String,
      required:true
    },
    ppturl:
    {
        type:String,
        required:false
    },
    pptname:{
type:String,
required:false
    }
});

const Certificate=mongoose.model('Certificate',certificateschema);
module.exports=Certificate;