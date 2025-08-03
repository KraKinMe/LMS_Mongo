const { exists } = require("../models/book-model.js");
const {BookModel,UserModel}=require("../models/index.js");

const IssueBook=require("../dtos/book-dto.js")

// const getAllBooks=()=>{
    
// }
// const getBookByID=()=>{

// }

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:books
//     })
// })

exports.getAllBooks=async (req,res)=>{
    const Books=await BookModel.find()
    if(Books.length===0){
        return res.status.json({
            success:false,
            message:"No Books in the system"
        })
    }
    res.status(200).json({
        success:true,
        data:books
    })
}

// router.get('/:id',(req,res)=>{
//     const {id}=req.params;
//     const thisBook=books.find((each)=>each.id===id);
//     if(!thisBook){
//         return res.status(404).json({
//             success:false,
//             message:`No book with ID: ${id}`
//         });
//     }
//     res.status(200).json({
//         success:true,
//         data:thisBook
//     })
// })
exports.getBookByID=async (req,res)=>{
    const {id}=req.params;
    const book=await BookModel.findById(id);

    if(book){
        return res.status(404).json({
            success:false,
            message:`No book with ID: ${id}`
        });
    }
    res.status(200).json({
        success:true,
        data:book
    })
}
// router.get('/issued/for-users',(req,res)=>{
//     const usersWithIssuedBooks=users.filter((each)=>{
//         if(each.issuedBook){
//             return each;
//         }
//     });

//     const issuedBooks=[];

//     usersWithIssuedBooks.forEach((each)=>{
//         const book=books.find((boook)=>boook.id===each.issuedBook);

//         book.issuedBy=each.name;
//         book.issuedDate=each.issuedDate;
//         book.returnDate=each.returnDate;

//         issuedBooks.push(book);

//     })
//     res.status(200).json({
//         success:true,
//         data:issuedBooks
//     })
// }) 
exports.getAllIssuedBooks=async (req,res)=>{
    const users= await UserModel.find({
        issuedBook:{$exists:true},
    }).populate("issuedBook");

    const issuedBook=users.map((each)=>{
        return new issuedBook(each);
    })

    res.status(200).json({
        success:true,
        data:issuedBook
    })
}