 
const express = require("express");
const fs = require("fs");
const path = require("path");
const dbsql = require("./db/dbmanager");
//跳转到首页
exports.showMain = (req,res)=>{
    let sql = "select * from book order by id";
    dbsql.sqlcontrol(sql,null,(resules)=>{
        res.json(resules);
    })
}
exports.toedit = (req,res)=>{
    let id = req.params.id;
    let sql = "select * from book where id=?";
    let data = [id];
    dbsql.sqlcontrol(sql,data,(resules)=>{
        res.json(resules);
    })
}
exports.editfinish = (req,res)=>{
       let sql = 'update book set name=?,author=?,classify=?,content=? where id =?';
       let data = [req.body.name,req.body.author,req.body.classify,req.body.content,req.body.id];
       console.log("editfinish",data);
       console.log("editfinish",req);
       dbsql.sqlcontrol(sql,data,(resules)=>{
           console.log(resules);
        if(resules.affectedRows<=0){
            res.json({"success":false});
            return ;
        }else{
            res.json({"success":true});
            return ;
        }
       });
}
exports.todele = (req,res)=>{
    console.log(req.params.id);
    let id = req.params.id;
    let sql = "delete from book where id=?";
    let sqlData = [id];
    dbsql.sqlcontrol(sql,sqlData,(resules)=>{
        console.log("todele",resules);
        if(resules.affectedRows<=0){
            res.json({"success":false});
            return ;
        }
        res.json({"success":true});
        return ; 
    })
}
exports.addbook = (req,res)=>{
    res.render("addbook");
}
exports.addbookfinish = (req,res)=>{
    let adddata = {};
    for(let key in req.body){
        adddata[key] = req.body[key];
    }
    let sql = "insert into book set ?";
    dbsql.sqlcontrol(sql,adddata,(resules)=>{
        console.log("addbookfinish",resules);
        if(resules.affectedRows<=0){
            res.send("服务器异常");
            return ;
        }
        res.redirect("/");
    })
}
 