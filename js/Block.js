(function (argument) {
	  //方块类
	  var Block = window.Block = function (argument) {
	  	    //①数组->字符串（类型）
	  	    this.allType = ["L","J","I","T","Z","S","X"];
	  	    //②随机出一个类型
	  	    this.type = this.allType[_.random(0,this.allType.length-1)];
	  	    //③拿去随机出来的类型的全部的矩阵
	  	    this.allDirection =allMatrix()[this.type];
	  	    //当前的矩阵是哪一个
	  	    this.idx = _.random(0,this.allDirection.length-1);
	  	    //⑤小方块当前的矩阵
	  	    this.direction =this.allDirection[this.idx];
	  	    //小方块居中 行列的控制
	  	    this.row = 0;
	  	    this.col = 6;
	  }
	    //小方块的渲染的方法
	   Block.prototype.render = function(argument) {
	 	  for(var row = 0;row<4;row++){
	 	  	 for(var col = 0;col<4;col++){
	 	  	 //渲染
	         Certain(this.direction,row,col)==1&&game.render(row+this.row,col+this.col,this.type);	 	  	 }
	 	  }
	   }

	  //提供全部的矩阵
	  function allMatrix() {
      	 return{

            "L":[0x4460,0x0e80,0x6220,0x0170],
            "J":[0x2260,0x8e00,0x6440,0x0710],
            "I":[0x4444,0x0f00],
            "T":[0x0720,0x2620,0x2700,0x4640],
            "Z":[0x0630,0x2640],
            "S":[0x0360,0x462]
            // "X":[0x9669]
      	 }
      }
      //判断某一个矩阵当中的某一个位置是0还是1：如果是1我就渲染
      function Certain(matrix,row,col) {
			  //拿到某一个矩阵的某一行
		     var hang = matrix>>(3-row)*4&0xf;
		     var  ge = hang>>(3-col)&0x1;
		     return ge;
       }
      //向下动
      Block.prototype.down = function (argument) {
      	 this.row++;
      }
      //向左动
      Block.prototype.left = function (argument) {
         this.col--;
      }
      //向右动
      Block.prototype.right = function (argument) {
         this.col++;
      }
      //小方块的对比的方法
      Block.prototype.compare = function (array,matrix) {
          //如果不是按的是上键盘，没有传递下一个矩阵的必要
          //因此如果没有传递矩阵的情况下，咱们matr就是当前的这个小方块的矩阵
          if(matrix==undefined){
               matrix = this.direction;
          }
      	  //进行16个小方块的对比：一个一个对比都不是零的时候就卡住了
      	  for(var i = 0;i<4;i++){
      	   	var str  = array[i];
      	  	for(var j = 0;j<4;j++){
               var char = str.charAt(j);
              //如果char!=0 小方块的4*4的矩阵每一个td也不是0 卡住了
                if(char!=0&&Certain(matrix,i,j)!=0){
             	       return true;
              }
      	  	}
      	  }
      	  return false;
      }
      //小方块先转的方法
      Block.prototype.rotate = function (argument) {
          this.idx ++;
           //每一个形状的全部的矩阵是有限的，如果超出数组的范围要从0开始
          if(this.idx>this.allDirection.length-1){
             this.idx = 0;
          }

          this.direction = this.allDirection[this.idx];
      }
      //提供一个当前的矩阵的下一个矩阵进行判断，判断能否旋转
      Block.prototype.nextMatrix = function (argument) {
          var next  = this.idx+1;
          if(next>this.allDirection.length-1){
               next = 0;
          }
          //只是提供当前的矩阵的下一个矩阵
          return this.allDirection[next];
      }
})()