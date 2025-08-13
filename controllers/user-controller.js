const {BookModel,UserModel}=require("../models/index.js");
const userModel = require("../models/user-model.js");
const { stack } = require("../routes/users.js");

exports.getAllUsers = async (req,res)=>{
    const Users =await userModel.find();
    if(Users.length===0){
        return res.status(404).json({
            success:false,
            message:`No Users found`
        });
    }

    res.status(200).json({
        success:true,
        data:Users
    })
}

exports.getUserByID=async (req,res)=>{
    const {id}=req.params;
    const user=await userModel.findById(id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:`No user with id: ${id}`
        })
    }

    res.status(200).json({
        success:true,
        data:user
    })
}

exports.createUser=async (req,res)=>{
    try{
        const {data}=req.body;
        const newUser=await UserModel.create(data);
        res.status(201).json({
            success:true,
            data:newUser
        });
    }
    catch{
        res.status(500).json({
            success:false,
            message:`Failed to add new User`,
            error:error.message
        })
    }
}

exports.updateUser=async (req,res)=>{
    const {id}=req.params;
    const {data}=req.body;

    const oldUser=await UserModel.findById(id);
    //if no oldUser ret 404

    Object.assign(oldUser,data);
    await oldUser.save();

    res.status(200).json({
        success:true,
        data:oldUser
    })
}

exports.deleteuser=async (req,res)=>{
    const {id}=req.params;
    const user=await UserModel.findOneAndDelete(id);

    res.status(200).json({
        success:true,
        message: `User with data : ${user} is deleted`
    })
}

exports.getSubbyID = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch user as plain JS object for performance
    const user = await UserModel.findById(id)
      .populate("issuedBook") // optional: remove if not needed
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No User found for id: ${id}`
      });
    }

    // Helper: Get number of days from a given date until today
    const getDateInDays = (dateString) => {
      if (!dateString) return 0;
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate)) return 0;
      const today = new Date();
      return Math.ceil((today - parsedDate) / (1000 * 60 * 60 * 24)); // ms → days
    };

    // Subscription duration mapping
    const SUBSCRIPTION_DURATIONS = {
      Basic: 90,
      Premium: 365
    };

    // Core calculations
    const currentDays = 0; // Today vs Today is zero days difference
    const daysSinceSubscription = getDateInDays(user.subscriptionDate);
    const daysSinceReturnDate = getDateInDays(user.returnDate);

    const subscriptionDuration = SUBSCRIPTION_DURATIONS[user.subscriptionType] || 0;
    const subscriptionExpirationDayCount = subscriptionDuration; // from subscription start
    const subscriptionExpired = daysSinceSubscription > subscriptionDuration;
    const subscriptionDaysLeft = Math.max(subscriptionDuration - daysSinceSubscription, 0);

    // Fine calculation rules
    let fine = 0;
    if (daysSinceReturnDate > currentDays) {
      fine = subscriptionExpired ? 200 : 100;
    }

    // Response data
    const data = {
      ...user,
      subscriptionExpired,
      subscriptionDaysLeft,
      daysLeftForBookReturn: daysSinceReturnDate - currentDays,
      returnStatus: daysSinceReturnDate > currentDays ? "Book is overdue" : "On time",
      fine
    };

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving subscription details",
      error: error.message
    });
  }
};
