const mongoose=require('mongoose');
mongoose.connect(process.env.SECRET_DB).then(()=>{
    console.log('ATlas connected')
}

).catch((err)=>{
    console.log("Not connected");
});
