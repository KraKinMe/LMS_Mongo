
const {BookModel,UserModel}=require("../models/index.js");

const IssueBook=require("../dtos/book-dto.js");
const { findByIdAndDelete } = require("../models/user-model.js");


//ALL GET METHODS------>>>>
//ALL GET METHODS------>>>>
//ALL GET METHODS------>>>>
//ALL GET METHODS------>>>>
//ALL GET METHODS------>>>>

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

    if(!book){
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

    const ListofissuedBook=users.map((each)=>{
        return new IssueBook(each);
    })

    res.status(200).json({
        success:true,
        data:ListofissuedBook
    })
}





// ALL POST METHODS----->>>>
// ALL POST METHODS----->>>>
// ALL POST METHODS----->>>>
// ALL POST METHODS----->>>>
// ALL POST METHODS----->>>>
// ALL POST METHODS----->>>>


exports.addNewBook = async (req, res) => {
    try {
        const { data } = req.body;

        const newBook = await BookModel.create(data);

        res.status(201).json({
            success: true,
            data: newBookx
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add new book",
            error: error.message // Sending the error message for debugging
        });
    }
};


// ALL PUT METHODS---->>>>
// ALL PUT METHODS---->>>>
// ALL PUT METHODS---->>>>
// ALL PUT METHODS---->>>>
// ALL PUT METHODS---->>>>

exports.updateBookByID = async (req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const book=await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book not found for id: ${id}`
        })

    }
    Object.assign(book,data);
    await book.save();

    res.status(200).json({
        success:true,
        data:book
    })
}


// (req,res)=>{
//     const {id}=req.params;

//     const index=books.findIndex((each)=>each.id===id);

//     if(index===-1){
//         return res.status(404).json({
//             success:false,
//             message:`No Book with ID: ${id}`
//         })
//     }

//     books.splice(index,1);

//     res.status(200).json({
//         success:true,
//         message:`Successfully Deleted`
//     })
// }
exports.deleteBookByID = async (req,res)=>{
    const {id}=req.params;
    const book = findByIdAndDelete(id);

    res.status(200).json({
        success:true,
        message:`Deleted successuffly ${id}`
    })
}