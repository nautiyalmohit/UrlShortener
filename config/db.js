import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
console.log()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log("DB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);

    };
}
export default connectDB;

