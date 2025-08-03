const express=require('express');

let {books}=require('../data/books.json');
const {users}=require('../data/users.json');


const {UserModel, BookModel} = require("../models/index.js");
const { getAllBooks,getBookByID, getAllIssuedBooks} = require('../controllers/book-controller.js');
const router=express.Router();

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:books
//     })
// })
router.get('/',getAllBooks)

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
router.get('/:id',getBookByID)


router.post('/',(req,res)=>{
    // "id": "3",
    //   "name": "The Land Before Time",
    //   "author": "Alan Moore",
    //   "genre": "Children's",
    //   "price": "8.50",
    //   "publisher"
    const {id,name,author,genre,price,publisher}=req.body;
    
    
    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details"
        })
    }
    
    const thisBook=books.find((each)=>each.id===id);

    if(thisBook){
        return res.status(409).json({
            success:false,
            message:`Book by ID:${id} already exists`
        })
    }

    let newBook={id,name,author,genre,price,publisher}

    books.push(newBook);

    res.status(201).json({
        success:true,
        message:`Book added successfully`
    })
    
})


router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const book=books.find((each)=>each.id===id);

    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book Not Found for ${id}`
        })
    }

    books=books.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data
            }
        }
        return each;
    })

    res.status(200).json({
        success:true,
        message:`Book Updated Successfully`
    })
})


router.delete('/:id',(req,res)=>{
    const {id}=req.params;

    const index=books.findIndex((each)=>each.id===id);

    if(index===-1){
        return res.status(404).json({
            success:false,
            message:`No Book with ID: ${id}`
        })
    }

    books.splice(index,1);

    res.status(200).json({
        success:true,
        message:`Successfully Deleted`
    })
})

/// BOOKS+USER DATA

/**
 * Route:- /books/issued/for-users
 * METHOD:- GET
 * Desc:- Details of all the issued books
 */

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
router.get('/issued/for-users',getAllIssuedBooks)

module.exports=router;
//