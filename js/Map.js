(function (argument) {
     //地图类

    var Map = window.Map = function (argument) {
    	 //地图类的属性，用来显示地图用的
    	  this.map = [
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MM0000000000000000MM",
                "MMMMMMMMMMMMMMMMMMMM",
                "MMMMMMMMMMMMMMMMMMMM",
                "MMMMMMMMMMMMMMMMMMMM"
     ];
    }
    //渲染的方法
    Map.prototype.render = function (argument) {
    	for(var i = 0;i<16;i++){
    		//获取每一行的字符串
    		var hangStr = this.map[i];
    		//获取每一行的字符串的字符
    		for(var j = 0;j<16;j++){
    			var type = hangStr.charAt(j+2);
    			 game.render(i,j,type);
    		}

    	}
    }
    //地图类的切割的方法
    Map.prototype.cut = function (row,col) {
    	 //用数组装在切割出来的字符串
    	 var temp = [];
    	for(var i = 0;i<4;i++){
    		//要切割的行的字符串
            var hangStr = this.map[row+i];
            //字符串的切割子串的方法 substr
            var cutStr = hangStr.substr(col+2,4);
            //添加到数组当中
            temp.push(cutStr);
    	}
    	//返回的是一个数组
    	return temp;
    }
    //插入新的数据
    Map.prototype.insert = function (row,col,matrix,type) {
          //因为咱们融入进去的4*4矩阵
         for(var i = 0;i<4;i++){
             //行
            for(var j = 0;j<4;j++){
             //列
              if(Certain(matrix,i,j)==1){//当你的4*4的矩阵为1的部分才融入进去
                this.map[row+i] = this.changeString(this.map[row+i],col+2+j,type);
              }
            }
         }
    }
     //判断某一个矩阵当中的某一个位置是0还是1：如果是1我就渲染
     function Certain(matrix,row,col) {
              //拿到某一个矩阵的某一行
             var hang = matrix>>(3-row)*4&0xf;
             var  ge = hang>>(3-col)&0x1;
             return ge;
       }
   //封装一个函数，这个函数的作用是某一个字符串在某一个位置插入的新的字符是什么？
   Map.prototype.changeString = function (str,start,type) {
        var a = str.substr(0,start);
        var b = str.substr(start+1);
        var c = a+type+b;
        return c;
   }
   Map.prototype.xiaohang = function (argument) {
     console.log(11111);
       //消行的时候：倒着消除
       for(var i = 15;i>=0;i--){
         var hangStr = this.map[i];
          if(hangStr.indexOf("0")==-1){
               //删除数组的某一项的方法 splice
               this.map.splice(i,1);
               //因为数组的元素变一个因此头部在添加一个
               this.map.unshift("MM0000000000000000MM");
               i++;
          }
       }
   }
})()