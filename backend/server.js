const express= require('express');
const{chats}=require('./data/data.js');
const dotenv=require("dotenv");
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes=require('./routes/messageRoutes');
const connectDB = require('./config/db.js');
const path=require('path');
dotenv.config();

const {notFound,errorHandler}=require('./middleware/errorMiddleware');
const res = require('express/lib/response');

const app=express();
connectDB();

app.use(express.json());//to accept json data



// app.get('/api/chat',(req,res)=>{
//     res.send(chats);
// });

// app.get('/api/chat/:id',(req,res)=>{
//     //console.log(req.params.id);
//     const singlechat=chats.find(
//         (c)=>c._id==req.params.id );
//     res.send(singlechat);
// });

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

//error handlers if invalid url

//--------------------------------------------------------------------------------
const __dirname1=path.resolve();



if(process.env.NODE_ENV==="production"){

app.use(express.static("frontend/build"));
// console.log("../frontend/build");
// console.log(path.resolve(__dirname1,"frontend",

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend/build/index.html"));
  });
 
}
else{

  app.get('/',(req,res)=>{
    res.send("api running")
});
}
app.use(notFound)
app.use(errorHandler)
const PORT=process.env.PORT ||5000;
console.log(process.env.PORT);
const server=app.listen(PORT, console.log("server started"));

    
const io=require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin:"http://localhost:3001",
    },
});


io.on("connection",(socket)=>{
console.log("connected to socket.io");

socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
});

socket.off("setup", () => {
  console.log("USER DISCONNECTED");
  socket.leave(userData._id);
});

}
);
    