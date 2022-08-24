const mongoose = require('mongoose')
const User=require("./UserSchema")

const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"USER",
        required:true
    },
    likes:[
        {
            like:{
                type:String
            }
        }
    ],
    comments:[
        {
            comment:{
                type:String
            }
        }
    ]
   
})

const Blog = mongoose.model('BLOG', blogSchema);
module.exports=Blog;
