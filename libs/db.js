import mongoose from "mongoose" ; 

const connectMongoDB= ()=>{
try{
    mongoose.connect(process.env.MONGODB_URI1) ;
    console.log("Connected to MongoDB1.")
}catch(error){
    console.log(error) ; 
}

}
export default connectMongoDB ; 