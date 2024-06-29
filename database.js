var mongoose=require('mongoose')
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB,{
            useNewURLParser:true,
            useUnifiedTopology:true
        })
        console.log("Database connected");
    }
    catch(err){
        console.log(err); 
    }

}
module.exports=connectDB