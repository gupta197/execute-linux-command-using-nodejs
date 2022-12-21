const express = require('express'),
app = express(),
PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',(req,res)=>{
    res.send("Welcome to Page!")
 })
app.get('**',(req,res)=>{
    res.send("Page Not Found!")
})
app.listen(PORT,()=>console.log(`http://localhost:${PORT}/`))