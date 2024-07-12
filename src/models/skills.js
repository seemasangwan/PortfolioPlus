const mongoose=require('mongoose');
const skillschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:true
    }
});
const Skill=mongoose.model('Skill',skillschema);
module.exports =Skill;