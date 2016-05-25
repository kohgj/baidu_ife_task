
//存储对象
var data=[];
var button1=document.getElementById("button1");
var button2=document.getElementById("button2");
var button3=document.getElementById("button3");
var button4=document.getElementById("button4");
var sort=document.getElementById("sort");
var wrap=document.getElementById("wrap");
var input=document.getElementById("input");

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


//给每个模块绑定移除事件
function removediv(){
	var div=wrap.getElementsByTagName("div");
	for(var i in div){
		div[i].index=i;
		div[i].onclick=function(){
			data.splice(this.index,1);
			console.log(data);
			render();
		}
	}
}
//渲染DIV
function render(){
	var x="";
	for(var i in data){

		x+='<div style="height:'+data[i]*5+'px"></div>';
		console.log(x)
	}
	wrap.innerHTML=x;
	removediv();
}
//左侧插入
function addleft(){
	if(data.length>=60){
		alert("标签上限60个!");
		return
	}
	if(parseInt(input.value)<10||parseInt(input.value)>100){
		alert("请输入10到100的整数！")
		return
	}
	data.unshift(input.value);
	render();
	
}
//右侧插入
function addright(){
	if(data.length>=60){
		alert("标签上限60个!");
		return
	}
	if(parseInt(input.value)<10||parseInt(input.value)>100){
		alert("请输入10到100的整数！")
		return
	}
	data.push(input.value);
	render();
}
//左侧移除
function removeleft(){
	data.shift();
	render();
}
function removeright(){
	data.pop();
	render();
}
function sortdata(){
	data.sort();
	render();
}
//初始化

function init(){
	addEventHandler(button1,'click',addleft);
	addEventHandler(button2,'click',addright);
	addEventHandler(button3,'click',removeleft);
	addEventHandler(button4,'click',removeright);
	addEventHandler(sort,'click',sortdata);
}
init();
