const mongoose=require('mongoose');

function DbConnection(){
    const MONGO_URI=process.env.MONGO_URI;
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