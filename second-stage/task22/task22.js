var Createbutton=(function(){
	function _ergodic(container,button,type){
		this.wrap=document.getElementById(container);
		this.button=document.getElementById(button);
		this.divList=[];
		this.type=type;
		this.init();
	}
	_ergodic.prototype={
		preorder:function(ele){
			if(ele!==null){
				this.divList.push(ele);
				this.preorder(ele.firstElementChild);
				this.preorder(ele.lastElementChild);
			}
		},
		inorder:function(ele){
			if(ele!==null){
				this.inorder(ele.firstElementChild);
				this.divList.push(ele);
				this.inorder(ele.lastElementChild);
			}
		},
		afterorder:function(ele){
			if(ele!==null){
				this.afterorder(ele.firstElementChild);
				this.afterorder(ele.lastElementChild);
				this.divList.push(ele);
			}
		},
		Createtree:function(){
			switch(this.type){
				case('preorder'):
					this.preorder(this.wrap);
					break;
				case('inorder'):
					this.inorder(this.wrap);
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
				}else{
					clearInterval(timer);
					self.divList[self.divList.length-1].style.backgroundColor='#fff';
					self.divList=[];
				}
			},500);
		},
		init:function(){
			var self=this;
			this.button.addEventListener('click',function(){
				self.Createtree();
				self.render();
			});
		}
		
	};
	return _ergodic;
})();
var preorder = new Createbutton('wrap','preorderbutton','preorder');
var inorder = new Createbutton('wrap','inorderbutton','inorder');
var afterorder = new Createbutton('wrap','afterorderbutton','afterorder');
