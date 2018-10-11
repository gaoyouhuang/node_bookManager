// 路由模块
const express = require("express");
const service = require("./service.js");
const router = express.Router();

//首页
router.get("/books",service.showMain);

//修改
// router.get("/toedit",service.toedit);
// router.post("/editfinish",service.editfinish);
//删除
router.delete("/books/:id",service.todele);
//添加
// router.get("/addbook",service.addbook);
// router.post("/addbookfinish",service.addbookfinish);
module.exports = router;