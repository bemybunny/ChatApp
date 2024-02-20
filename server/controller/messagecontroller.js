const Message = require("../modals/messagemodal");

module.exports.addMessage = async(req,res,next) => {
    try{
        const {from,to,message} = req.body;
        console.log({"addMessage":req.body});
        const data = await Message.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        });
        if(data)return res.json({msg:"message successfully added."});
        return res.json({msg:"failed to add msg to the database"})
    }catch(ex){
        next(ex);
    }
};
module.exports.getAllMessage = async(req,res,next) => {
    try{
        const {from,to}  = req.query;
        const messages = await Message.find({
            users:{
                $all:[from,to]
            },
        }).sort({updatedAt:1})
        const projectMessage = messages.map((msg)=>{
             return {
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
             }; 
        })
        console.log({"projectMessage":projectMessage});
        res.json({"projectMessage":projectMessage});
    }catch(ex){
        next(ex);
    }
};