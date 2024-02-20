process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optionally, you can log the error, send it to a logging service, or handle it in another way.
  });

const User = require("../modals/usemodal");
const bcrypt = require('bcrypt');
const uploadImage = require("../uploadImage");

module.exports.register = async(req,res,next) => {
    try{
        const {name,email,password} = req.body;
        const namecheck = await User.findOne({name});
        if(namecheck){
            return res.json({message:"user already used",status:false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({message:"Email is already use",status:false});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create(
            {   name,
                email,
                password:hashedPassword,
            }
        )
        delete user.password;
        return res.json({status:true,user})
    }catch(error){
        console.log(error);
    }
};

module.exports.login = async(req,res,next) => {
    try{
        const {name,password} = req.body;
        const user = await User.findOne({name});
        if(!user){
            return res.json({message:"Incorrect username or password",status:false});
        }
        const passwordCheck = await bcrypt.compare(password,user.password);
        if(!passwordCheck)
            return res.json({msg:"Incorrect username or password", status:false});
        delete user.password;
        return res.json({status:true,user})
    }catch(error){
        console.log(error);
    }
};

module.exports.setAvatar = async(req,res) => {
    
    try{
        const userId = req.params.id;
        const base64Image = req.body.image;
        const uploadResult = await Promise.race([
            uploadImage(base64Image),
            new Promise((_, reject) =>
              setTimeout(() => reject({ error: { message: 'Request Timeout' } }), 60000) // Set timeout to 60 seconds
            ),
          ]);
      
          if (uploadResult.error) {
            return res.status(500).json({ message: 'Request Timeout', status: false });
          }
          const { secure_url, url } = uploadResult;

        console.log('User ID:', userId);
        console.log('Avatar Image:', url); 
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage:secure_url || url,
        })
        if (!userData) {
            return res.status(404).json({ message: 'User not found', status: false });
        }

        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage,
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.getAllUsers = async(req,res) => {
    try{
        const users = await User.find({_id:{$ne:req.params.id}})
        .select([
            "email",
            "name",
            "avatarImage",
            "_id"       
         ]);
         if (users.length > 0) {
            return res.status(200).json(users);
          } else {
            return res.status(404).json({ message: 'No users found.' });
          }
         //return res.json(users);
    }catch(err){
        console.log(errors);
    }
}