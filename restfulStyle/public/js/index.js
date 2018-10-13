$(function () {

    let getBookList = function(){
        $.ajax(
            {
                dataType:"json",
                type:"get",
                url:"/books",
                success:function(data){
                    console.log(data);
                    let templateHtml = template("bookTemplate", {data:data});
                    let tbody = $("tbody");
                    tbody.html(templateHtml);
                    tbody.find("tr").each(function(index,item){
                        let id = $(item).find("td:eq(0)").text();
                        console.log("id "+id);
                        let lastTd = $(item).find("td").eq(5);
                        lastTd.find("a").eq(0).click(function(){
                            console.log("编辑");
                        });
                        lastTd.find("a:eq(1)").click(function(){
                            console.log("删除");
                            $.ajax({
                                dataType:"json",
                                type:"delete",
                                url:"/books/"+id,
                                success:function(data){
                                    console.log(data);
                                    if(data.success){
                                        showSuccess("删除成功");
                                    }else{
                                        showFail();
                                    }
                                }
                            });
                        });
                        lastTd.find("a:eq(0)").click(()=>{
                            $.ajax({
                                dataType:"json",
                                type:"get",
                                url:"/books/book/"+id,
                                success:(data)=>{
                                    console.log(data);
                                    let div = $("<div></div>");
                                    let bookTemplate =$( template("bookAdd",{editdata:data[0]}));
                                    bookTemplate.find("input[type=submit]").unbind("click").click(()=>{
                                        $.ajax({
                                            dataType:"json",
                                            type:"put",
                                            url:"/books/book",
                                            data:bookTemplate.serialize(),
                                            success:(data)=>{
                                                console.log("修改");
                                                if(data.success){
                                                    showSuccess("修改成功");
                                                }else{
                                                    showFail();
                                                }
                                            }
                                        });
                                    });
                                    div.append(bookTemplate);
                                    let dialog = new MarkBox(300,200,"修改",div.get(0));
                                    dialog.init();
                                    
                                }
                            });
                        });
                    })
                }
            });
        $("footer").find("a").click(()=>{
            let div = $("<div></div>");
            let bookTemplate =$( template("bookAdd",{editdata:""}));
            bookTemplate.find("input[type=hidden]").remove();
            div.append(bookTemplate);
            let dialog = new MarkBox(300,200,"添加",div.get(0));
            dialog.init();
            bookTemplate.find("input[type=submit]").click(()=>{
                $.ajax({
                    type:"post",
                    dataType:"json",
                    url:"/books",
                    data:bookTemplate.serialize(),
                    success:(data)=>{
                        console.log("添加");
                        if(data.success){
                            showSuccess("添加成功");
                        }else{
                            showFail();
                        }
                    }
                })
            })
        })    
    }
    let showSuccess  = (msg)=>{
        // let div = $("<div></div>");
        // let p = $("<p></p>").text(msg);
        // div.append(p);
        // let popup = new MarkBox(300,200,"提示",div.get(0));
        // popup.init();
        getBookList();

    }
    let showFail = ()=>{
        let div = $("<div></div>");
        let p = $("<p></p>").text("操作失败");
        div.append(p);
        let popup = new MarkBox(300,200,"提示",div.get(0));
        popup.init();
    }
    let showUpdate = ()=>{

    }
    getBookList();
  })