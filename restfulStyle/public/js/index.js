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
                                    // getBookList();
                                }
                            });
                        });
                    })
                }
            });
    }

    getBookList();
  })