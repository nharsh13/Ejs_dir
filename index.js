const express=require("express");
const app=express();
const path=require("path");

const port=3000;


// Serving static files
app.use(express.static(path.join(__dirname,"/public")));

app.set("view engine","ejs");

// to search views folder int this directory
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/apple",(req,res)=>{
    res.send("apple");
})

// app.get("/rolldice",(req,res)=>{
//     res.render("rolldice.ejs");
// })

// But in realworld datas are not coming from any file but instead from a database,
// so we store that data in a variable and that data is passed as a object to the page that renders(in this case rolldice.ejs)

app.get("/rolldice",(req,res)=>{
    let diceval=Math.floor(Math.random()*6)+1;
    res.render("rolldice.ejs",{diceval});
})


// Creating Instagram EJS
// app.get("/ig/:username",(req,res)=>{
//     let {username}=req.params;
//     // console.log(username);
//     res.render("instagram.ejs",{username});
    
// })

app.get("/ig/:username",(req,res)=>{
    let {username} =req.params;
    const igdata=require("./data.json");
    const data=igdata[username];
    // console.log(data);
    if(data){
        res.render("instagram.ejs",{data});

    }
    else{
        res.render("error.ejs");
    }
    


})


app.listen(port,()=>{
    console.log(`Listening from port ${port}`);
});