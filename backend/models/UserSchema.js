const mongoose = require('mongoose')
const Blog=require("./BlogSchema")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    blogs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"BLOG",
            required:true
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
  
})


//we are generating token

userSchema.methods.generateAuthToken=async function(){
    try{
        let usertoken=jwt.sign({_id:this._id},"MYNAMEISHARSHITDWIVEDI")
        this.tokens=this.tokens.concat({token:usertoken});
        await this.save();
        return usertoken;
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('USER', userSchema);

module.exports=User;
