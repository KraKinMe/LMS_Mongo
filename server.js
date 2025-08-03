const express=require('express');
const dotenv=require("dotenv");

const DbConnection=require('./databaseConnection');

const app=express();
dotenv.config();

DbConnection();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Home Page"
    })
})

const bookRouter=require('./routes/books.js');
app.use('/books',bookRouter);

// app.all('*',(req,res)=>{
//     res.status(500).json({
//         message:"Not Built Yet"
//     })
// })




const PORT=process.env.PORT || 3000;



app.listen(PORT,()=>{
    console.log(`Server live on ->  http://localhost:${PORT}`);
    
})