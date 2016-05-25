//存储对象
var data=[];
var button1=document.getElementById("button1");
var button2=document.getElementById("button2");
var button3=document.getElementById("button3");
var button4=document.getElementById("button4");
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
		x+="<div>"+data[i]+"</div>";
	}
	wrap.innerHTML=x;
	removediv();
}
//左侧插入
function addleft(){
	data.unshift(input.value);
	render();
}
//右侧插入
function addright(){
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
//初始化

function init(){
	addEventHandler(button1,'click',addleft);
	addEventHandler(button2,'click',addright);
	addEventHandler(button3,'click',removeleft);
	addEventHandler(button4,'click',removeright);
}
init();
