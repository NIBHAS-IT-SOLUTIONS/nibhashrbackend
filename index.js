var express=require('express')
var cors=require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const session = require("express-session");
var router=require("./routes/indexRouter")
var connectDB=require('./database')
const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/',router)
connectDB()
app.use(session({ 
    secret: "key",
    saveUninitialized: false,
    resave: false,
    cookie:{maxAge:600000}
}));

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const fileSchema = new mongoose.Schema({
  appliedID:{
    type: mongoose.Schema.ObjectId,
    required:true
},
    filename: String,
    path: String,
    size: Number,
    mimetype: String,
  });
  const File = mongoose.model('File', fileSchema);
  
  // Configure Multer for file uploading
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  
  // Set up a route for file uploading
  app.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.body.id);
    let id=req.body.id
    try {
      const file = new File({
        appliedID:new mongoose.Types.ObjectId(id),
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
      await file.save();
      res.status(201).send('Submmitted successfully');
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  app.get('/files', async (req, res) => {
      try {
        const files = await File.find({});
        res.status(200).json(files);
      } catch (error) {
        res.status(500).send('Server error');
      }
    });
  
  // Serve the uploads folder as static
  app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT,()=>{
    console.log(`running @${process.env.PORT} `);
})

module.exports=app