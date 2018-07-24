(function (argument) {
	var Game  = window.Game = function (argument) {
		  //属性罗列
		  this.table = null;
		  this.timer = null;
		  //实例化地图对象、实例化方块对象
		  this.map = new Map();
		  this.block = new Block();
		  //初始化函数
		  this.init();
		  //开启游戏
		  this.start();
          //监听事件
          this.bindEvent();
	}
    //初始化方法
    Game.prototype.init = function (argument) {
    	//table的初始化
    	this.table = document.createElement("table");
    	document.body.appendChild(this.table);
    	//tr、td的上树  矩阵4*4 因此tr、td个数尽量能被四整除
    	for(var row = 0;row<16;row++){
    	   var tr = document.createElement("tr");
    	   for(var col = 0;col<16;col++){
    	   	  var td = document.createElement('td');
    	   	  tr.appendChild(td);
    	   }
    	   this.table.appendChild(tr);
    	}
    }
    //渲染的方法
    Game.prototype.render = function (row,col,type) {

      this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className = type;
    }
    //清屏的方法
    Game.prototype.clearScreen = function () {
    	for(var row = 0;row<16;row++){

    	   for(var col = 0;col<16;col++){
    	   	    //注意：别给我写空格（死翘翘）
                this.render(row,col,"");
    	   }
    	}
    }
    //开启游戏的方法
    Game.prototype.start = function (argument) {
    	//备份：因为有定时器存在
    	var self = this;
    	var frame = 0;
    	self.timer = setInterval(function (argument) {
    		   frame++;
    		   //清屏
    		   self.clearScreen();
    		   //渲染地图:事情一定是在渲染方块之前，否则覆盖情况
    		   self.map.render();
    		   //渲染方块
    		   self.block.render();
    		   //方块向下落如果没有碰到方块就向下落
    		   if(!self.block.compare(self.map.cut(self.block.row+1,self.block.col))){
    		   	     frame%10==0&&self.block.down();
    		    }else{
                  //如果碰到方块代表现在的方块死去重新的new出一个新的方块
                  self.map.insert(self.block.row,self.block.col,self.block.direction,self.block.type);
                  self.block = new Block();
                  //消除行
                  self.map.xiaohang();
                }

    	},100);
    }
    Game.prototype.bindEvent = function (argument) {
         //备份
         var self = this;
         //监听事件
         document.onkeydown = function (event) {
              switch(event.keyCode){
                case 32:
                  //咱们用while语句进行快速的向下落：如果条件为true一直向下落；如果为false就打破死循环
                  while(!self.block.compare(self.map.cut(self.block.row+1,self.block.col))){
                       self.block.down();
                  }
                 break;
                case 37:
                  //向左进行移动判断的时候，应该判断的是当前的矩阵的col-1的4*4的矩阵进行判断
                 if(!self.block.compare(self.map.cut(self.block.row,self.block.col-1))){
                       self.block.left();
                  }
                 break;
                case 38:
                if(!self.block.compare(self.map.cut(self.block.row,self.block.col),self.block.nextMatrix())){
                    //上键盘的时候，要小方块旋转
                     self.block.rotate();
                  }
                 break;
                case 39:
                //向右进行移动判断的时候，应该判断的是当前的矩阵的col+1的4*4的矩阵进行判断
                if(!self.block.compare(self.map.cut(self.block.row,self.block.col+1))){
                       self.block.right();
                  }
                 break;
                case 40:
                     //向下进行移动判断的时候，应该判断的是当前的矩阵的row+1的4*4的矩阵进行判断
                if(!self.block.compare(self.map.cut(self.block.row+1,self.block.col))){
                    self.block.down();
                  }
                 break;
              }
         }
    }
})()