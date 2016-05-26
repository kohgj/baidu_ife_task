//存储对象
var data=[];
var putin=document.getElementById("putin");
var submitbtn=document.getElementById("submit");
var tag=document.getElementById("tag");
var input_search=document.getElementById("input_search");
var searchbtn=document.getElementById("search");
var str=input_search.value.trim();

//跨浏览器事件绑定
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
//查询事件
function search(){
	str=input_search.value.trim();
	render(str);

}
//给每个模块绑定移除事件
function removediv(){
	var li=tag.getElementsByTagName("li");
	for(var i in li){
		li[i].index=i;
		li[i].onclick=function(){
			data.splice(this.index,1);
			render(str);
		}
	}
}
//渲染DIV
function render(str){
	var x="";
	for(var i in data){
		x+='<li>'+data[i]+'</li>';
	}
	if(str != null && str.length > 0){
		x = x.replace(new RegExp(str, "g"), "<span style='color:red'>" + str + "</span>");
		console.log(x);
	}
	tag.innerHTML=x;
	removediv();
}
//提交事件
function submit(){
	var text=putin.value;
	var words=text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	data=words;
	console.log(data);
	render();
}

//初始化
function init(){
	addEventHandler(submitbtn,'click',submit);
	addEventHandler(searchbtn,'click',search);
}
init();
