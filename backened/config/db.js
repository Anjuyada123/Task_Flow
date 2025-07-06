import mongoose from 'mongoose';


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://anjuyad2810:EjWsPWvkZ77NEvSW@cluster0.qeh4v5y.mongodb.net/TaskFlow?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>console.log('DB CONNECTED'));
}