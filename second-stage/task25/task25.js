/*
创建封装类treenode
@param container  指定操作的树节点容器
*/
var treenode=(function(){
	function _treenode(container){
		this.search_input=document.getElementById('search_input');
		this.search_btn=document.getElementById('search_btn');
		this.add_input=document.getElementById('add_input');
		this.add_btn=document.getElementById('add_btn');
		this.del_btn=document.getElementById('del_btn');
		this.wrap=document.getElementById(container);
		this.list=[];
		this.chosen=this.wrap;
		this.init();
	}
	_treenode.prototype={
		preorder:function(ele){
			if(ele!==null&&ele.nodeName!=='#text'){
				this.list.push(ele);
				var i=0;
				for(;i<ele.childNodes.length;i++){
					this.preorder(ele.childNodes[i]);
				}
			}
		},
		search:function(){
			this.preorder(this.wrap);
			console.log(this.list);
			for(var i=0;i<this.list.length;i++){
				if(this.list[i].innerHTML==this.search_input.value){
					this.list[i].className=this.list[i].className.replace('black','red');
					var x=this.list[i];
					while(x.tagName=='SPAN'){
						if(x.className.indexOf('close')>=0){
							x.className=x.className.replace('close','open');
						}
						x=x.parentNode.parentNode.childNodes[0];
					}
					var y=this.list[i].parentNode;
					while(y.tagName=='DIV'){
						if(y.className.indexOf('hidden')>=0){
							y.className=y.className.replace('hidden','visual');
						}
						y=y.parentNode;
					}
				}
			}
		},
		open:function(event){
			this.chosen.className=this.chosen.className.replace('red','black');
			this.chosen=event.target;
			this.chosen.className=this.chosen.className.replace('black','red');
			
				if(event.target.className.indexOf('close')>=0){
					event.target.className=event.target.className.replace('close','open');
					for(var i=1;i<event.target.parentNode.childNodes.length;i++){
						if(event.target.parentNode.childNodes[i].nodeName!=='#text')
						event.target.parentNode.childNodes[i].className=event.target.parentNode.childNodes[i].className.replace('hidden','visual');
					}
				}else if(event.target.className.indexOf('open')>=0){
					event.target.className=event.target.className.replace('open','close');
					for(var i=1;i<event.target.parentNode.childNodes.length;i++){
						if(event.target.parentNode.childNodes[i].nodeName!=='#text')
							event.target.parentNode.childNodes[i].className=event.target.parentNode.childNodes[i].className.replace('visual','hidden');
					}
							
				}
		},
		add:function(){
			this.newdiv=document.createElement('div');
			this.newdiv.className='visual';
			this.newdiv.innerHTML='<span class="close black">'+this.add_input.value+'</span>';
			this.chosen.className=this.chosen.className.replace('close','open');
			this.chosen.parentNode.appendChild(this.newdiv);
		},
		del:function(){
			this.chosen.parentNode.parentNode.removeChild(this.chosen.parentNode);
		},
		init:function(){
			var self=this;
			this.add_btn.addEventListener('click',function(event){
				self.add();
			});
			this.wrap.addEventListener('click',function(event){
				self.open(event);
			});
			this.del_btn.addEventListener('click',function(event){
				self.del();
			});
			this.search_btn.addEventListener('click',function(event){
				self.search();
			})
		}
	};
	return _treenode;
})();
var a=new treenode('wrap');
