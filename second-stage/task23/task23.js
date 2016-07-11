var Createbutton=(function(){
	function _ergodic(container,button,type){
		this.wrap=document.getElementById(container);
		this.button=document.getElementById(button);
		this.search;
		this.divList=[];
		this.type=type;
		this.init();
	}
	_ergodic.prototype={
		preorder:function(ele){
			if(ele!==null&&ele.nodeName!=='#text'){
				this.divList.push(ele);
				var i=0;
				for(;i<ele.childNodes.length;i++){
					this.preorder(ele.childNodes[i]);
				}
			}
		},
		afterorder:function(ele){
			if(ele!==null&&ele.nodeName!=='#text'){
				var i=0;
				for(;i<ele.childNodes.length;i++){
					this.preorder(ele.childNodes[i]);
				}
				this.divList.push(ele);
			}
		},
		Createtree:function(){
			switch(this.type){
				case('preorder'):
					this.preorder(this.wrap);
					break;
				case('afterorder'):
					this.afterorder(this.wrap);
					break;
			}
		},
		render:function(){
			var i=0;
			var self=this;
			this.divList[i].style.backgroundColor='blue';
			timer=setInterval(function(){
				i++;
				if(i < self.divList.length){
					self.divList[i].style.backgroundColor='blue';
					self.divList[i-1].style.backgroundColor='#fff';
					if(self.divList[i].childNodes[0].textContent.trim()==self.search){
						alert('找到了');
						clearInterval(timer);
						self.divList[i].style.backgroundColor='#fff';
						self.divList=[];
					}
				}else{
					clearInterval(timer);
					self.divList[self.divList.length-1].style.backgroundColor='#fff';
					self.divList=[];
					alert('没找到');
				}
			},500);
		},
		init:function(){
			var self=this;
			this.button.addEventListener('click',function(){
				self.search=document.getElementById('search').value;
				self.Createtree();
				self.render();
			});
		}
		
	};
	return _ergodic;
})();
var preorder = new Createbutton('wrap','preorderbutton','preorder');
var afterorder = new Createbutton('wrap','afterorderbutton','afterorder');
