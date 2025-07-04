require('dotenv').config()
const express = require('express');

const categoryRoutes= require('./routes/category')


const mongoose = require('mongoose');
const app = express();


// Middleware to parse JSON
app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/vehicleDB', {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//  })
// .then(() => console.log('✅ MongoDB Connected'))
// .catch(err => console.error('❌ DB Error:', err));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log('connected to db and listening on port',process.env.PORT)
  })
})
.catch((error)=>{
  console.log(error)
})


 // Basic Route
 app.get('/', (req, res) => {
   res.send('welcome to the app!');
 });

// routes
app.use('/api/category',categoryRoutes)




// Start Server
const PORT = 5000;
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`,process.env.PORT);
});

