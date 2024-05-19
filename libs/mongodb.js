// // import mongoose from "mongoose" ; 

// // const connectMongoDB= ()=>{
// // try{
// //     mongoose.connect(process.env.MONGODB_URI) ;
// //     console.log("Connected to MongoDB.")
// // }catch(error){
// //     console.log(error) ; 
// // }

// // }
// // export default connectMongoDB ; 
// import mongoose from 'mongoose';

// const connectMongoDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB.");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// export default connectMongoDB;
import mongoose from 'mongoose';

const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB