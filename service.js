const express = require("express");
const fs = require("fs");
const path = require("path");
const http_data = require("./data/booklist.json");
//跳转到首页
exports.showMain = (req,res)=>{
    // console.log(http_data);
    res.render('index',http_data);
}
exports.toedit = (req,res)=>{
    let id = req.query.id;
    let edit_data = {};
    http_data.data.forEach((data,index) => {
        if(data.id==id)
        { edit_data = data;
        return ;}
    });  
    res.render("edit",{"editdata":edit_data})  
}
exports.editfinish = (req,res)=>{
    console.log(req.body);
    http_data.data.forEach((item,index)=>{
        console.log("editfinish "+index);
        if(item.id==req.body.id){
            for(let key in req.body){
                item[key] = req.body[key];
            }
            return ;
        }
    })
   writeFile(res);
}
exports.todele = (req,res)=>{
    let dele_index =0;
    http_data.data.forEach((item,index)=>{
        if(item.id==req.query.id){
            dele_index = index;
        }
    })
    http_data.data.splice(dele_index,1);
    writeFile(res);
}
exports.addbook = (req,res)=>{
    res.render("addbook");
}
exports.addbookfinish = (req,res)=>{
    let adddata = {};
    for(let key in req.body){
        adddata[key] = req.body[key];
    }
    adddata["id"] = maxIndex();
    http_data.data.push(adddata);
    writeFile(res);
}
let maxIndex = ()=>{
    let id_list = [];
    http_data.data.forEach((item)=>{
        id_list.push(item.id);
    })
    if (id_list.length>0)
    return Math.max.apply(null,id_list)+1;
    else 
    return 1;
}
let writeFile = (res)=>{
    fs.writeFile(path.join(__dirname,"data","booklist.json"),JSON.stringify(http_data),(error)=>{
        if(error){
            res.send("服务器异常");
            return ;
        }
        res.redirect("/");
    })
    
}
 