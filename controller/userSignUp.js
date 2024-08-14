const User = require("../Models/User")


async function userSignUpController(req,res){
    try{
        const {number, name} = req.body

        // const user = await User.findOne({number})

        // console.log("user",user)

        // if(user){
            
        //     throw new Error("Already user exits.")
        // }

        if(!number){
            
           throw new Error("Please provide number")
        }
        // if(number.length != 10){
        //     throw new Error("Please provide a valid number")
        // }
        if(!name){
            throw new Error("Please provide name")
        }

        const payload = {
            ...req.body,
            role : "GENERAL"
        }

        const userData = new User(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created Successfully!"
        })


    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController