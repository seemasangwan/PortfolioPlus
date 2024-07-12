const mongoose=require('mongoose');
const projectschema=new mongoose.Schema({
    icon:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    Techstack:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});
const Project=mongoose.model("Project",projectschema);
module.exports=Project;