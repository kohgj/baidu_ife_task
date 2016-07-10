/*
创建一个可复用的类_tag
@param String input
@param String output
@param String button
*/
var Createtag=(function(){
	function _tag(input,output,button){
		this.tagdata=[];
		this.input=document.getElementById(input);
		this.output=document.getElementById(output);
		this.button=document.getElementById(button);
		this.getData=function(){
			switch(input){
				case('taginput'):
					if(this.tagdata.length<10){
						this.tagdata.push(this.input.value.match(/(^[^,\， ]*)/)[0]);
						this.input.value='';
					}else{
						this.tagdata.shift();
						this.tagdata.push(this.input.value.match(/(^[^,\， ]*)/)[0]);
						this.input.value='';
					}
					break;
				case('interestinput'):
					this.tagdata=this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
					while(this.tagdata.length>10){
						this.tagdata.shift();
					}
					break;
			}
		};
		this.button ? this.init('buttonEvent') : this.init('keyEvent');
	}
	_tag.prototype={
		render:function(){
			var i=0;
			var wrap='';
			console.log(this.tagdata);
			for(;i<this.tagdata.length;i++){
				wrap+='<li>'+this.tagdata[i]+'</li>';
			}
			this.output.innerHTML=wrap;
		},
		delData:function(ele){
			this.output.removeChild(ele);
			this.tagdata.splice(this.tagdata.indexOf(ele.textContent),1);
		},
		init:function(type){
			console.log(this.tagdata);
			var self=this;
			this.output.addEventListener('mouseover',function(event){
				event.target.innerHTML='删除:'+event.target.innerHTML;
			});
			this.output.addEventListener('mouseout',function(event){
				event.target.innerHTML=event.target.innerHTML.replace(/删除:/,'');
			});
			this.output.addEventListener('click',function(event){
				self.delData(event.target);
			});
			switch(type){
				case'keyEvent':
					document.addEventListener('keyup',function(event) {
						if (/(,| |\，)$/.test(self.input.value) || event.keyCode===13) {
							self.getData();
							self.render();
						}
					});
					break;
				case'buttonEvent':
					self.button.addEventListener('click',function(event){
						self.getData();
						self.render();
					});
					break;
					
			}
		}

	};
	return _tag;
})();
var tag = new Createtag('taginput','tagul');
var hobby = new Createtag('interestinput','interestul', 'submit');
