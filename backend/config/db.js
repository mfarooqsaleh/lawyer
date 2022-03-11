//Connection file to mongo db
import mongoose  from 'mongoose';


const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI, {
           useUnifiedTopology: true,
           useNewUrlParser: true,
         });
         console.log(`MongoDB Connected: ${conn.connection.host}`);
       } catch (error) {
         console.error(`Error: ${error.message}`);
         process.exit();
       }
     };
     
     export default connectDB;



*/
MONGO_URI=mongodb+srv://farooq_123:farooq_123@cluster0.zg5bb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=5000
NODE_ENV =local
JWT_SECRET=ameer12


*/
