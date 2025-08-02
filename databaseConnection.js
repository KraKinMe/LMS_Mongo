const mongoose=require('mongoose');
const MONGO_URI=process.env.MONGO_URI;

function DbConnection(){
    mongoose.connect(MONGO_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    const db=mongoose.connection;

    db.on("error", console.error.bind(console, "Connection Error:- "));
    db.once("open",()=>{
        console.log("DB Connected...");
        
    })
}

module.exports=DbConnection;