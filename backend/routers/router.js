const express=require('express');
const router=express.Router();
const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const authenticate=require("../middleware/authenticate")


// mongoose.connect("mongodb://localhost:27017/BlogUser",{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
//     console.log("connection successful")
// }).catch((err)=>console.log(err))

mongoose.connect("mongodb+srv://admin:R6CZYdOztkTQH022@cluster0.nesbhxo.mongodb.net/Blog?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connection successful")
}).catch((err)=>console.log(err))

const User=require("../models/UserSchema")
const Blog= require("../models/BlogSchema")
// require('')

//cookie parser
const cookieParser=require("cookie-parser");
router.use(cookieParser());

router.post("/register",async (req,res)=>{
    const{name,phone,email,profession,password}=req.body

    if(!name||!phone||!email||!profession|!password){
        return res.status(404).json({message:"No of the field can be blank"})
    }
    try{
        const existingUser=await User.findOne({email:email});
        let user;
        if(existingUser){
            return res.status(404).json({message:"User already exists"})
        }else{

            const hashedPassword=bcrypt.hashSync(password,12)
    
            user=new User({
                name,phone,email,profession,password:hashedPassword,blogs:[]
            })
            user.save();
        }
    
        return res.status(200).json({message:"Successfully registered"})
    }catch(err){
        console.log(err)
    }
    
})

router.post("/login",async(req,res)=>{

    const{email,password}=req.body;
    if(!email||!password){
        return res.status(404).json({message:"No of the field can be blank"})
    }

    try{
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"Invalid credentials"})
        }else{

            const isPassword =await bcrypt.compare(password,existingUser.password);
            console.log(isPassword)

            if(!isPassword){
                return res.status(404).json({message:"Invalid credentials"})
            }else{
                const token=await existingUser.generateAuthToken();
                // console.log(token)

                //cookie generation
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+25892000000), //25892000000 means 30 days so after 30 days cookie will expired and user will be logged out.
                    httpOnly:true
                });
                
                // console.log(existingUser)
                return res.status(200).json(existingUser)
            }
        }
    }catch(err){
        console.log(err)
    }
})

router.post('/postBlog',authenticate,async(req,res)=>{
    const{title,description,imageUrl,user}=req.body;

    if(!title||!description||!imageUrl){
        return res.status(404).json({message:"No of the field can be blank"})
    }
    let existingUser;
    try{
        existingUser= await User.findById(user);
        console.log(existingUser);
    }catch(err){
        console.log(err)
    }
    const blog= new Blog({
        title,description,imageUrl,user
    })
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session,new: true});
        console.log(blog);
        existingUser.blogs.push(blog);
        await existingUser.save({session,new:true});
        await session.commitTransaction();
        return res.status(200).json({message:"Sucessfully saved"});
       
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"cannot save"});
    }
    
})

router.delete('/deleteblog/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id)
    let blog;
    try{
        blog=await Blog.findById(id).populate('user');
        await Blog.findByIdAndRemove(id)
        console.log(blog)
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).json({message:"successfully deleted"});
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"failed to delete"});
    }
})

router.put('/editblog/:id',authenticate,async(req,res)=>{
    const{title,description,imageUrl}=req.body;
    const id=req.params.id;
    let blog;
    try{
        // console.log("hh")
        blog=await Blog.findByIdAndUpdate(id,{title,description,imageUrl});
        
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"Cannot be updated"});
    }
    return res.status(200).json({blog});
})


router.get('/about',authenticate, (req, res) => {

    res.send(res.send(req.rootUser))
})

router.get('/allBlogs',authenticate,async(req,res)=>{

    const blog=await Blog.find();
    // console.log(blog);
    return res.status(200).json(blog)

})

router.get("/getById/:id",authenticate,async(req,res)=>{
    const id=req.params.id

    let blog;
    try{
        blog=await Blog.findById(id);
        console.log(blog)
    }catch(e){
        console.log(e);
    }
    if(!blog){
        return res.status(404).json({message:"Blogs not found"})
    }
    res.status(200).json(blog)
})

router.get("/getByUserId/:id",authenticate,async(req,res)=>{
    const id=req.params.id;
    let userBlogs;

    try{
        userBlogs=await User.findById(id).populate('blogs')
    }catch(err){
        console.log(err)
    }

    // if(!userBlogs){
    //     return res.status(404).json({message:"Blogs not exist"})
    // }
    return res.status(200).json(userBlogs.blogs)
})

router.put('/like/:id',authenticate,async(req,res)=>{
    const id=req.params.id;
    const userBlogs=await Blog.findById(id);
    await userBlogs.likes.push(req.userId);
    await userBlogs.save();
    return res.status(200).json(userBlogs.likes)
})
router.put('/unlike/:id',authenticate,async(req,res)=>{
    const id=req.params.id;
    const userBlogs=await Blog.findById(id);
    await userBlogs.likes.pull(req.userId);
    await userBlogs.save();
    return res.status(200).json(userBlogs.likes)
})

router.put('/postComment/:id',authenticate,async(req,res)=>{
    const id=req.params.id;
    const comment=req.body
    const userBlogs=await Blog.findById(id);
    await userBlogs.comments.push(comment);
    await userBlogs.save();
    return res.status(200).json(userBlogs.comments)
})

router.get('/logout',authenticate, (req, res) => {

    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send(("User logout"))
})

module.exports=router;