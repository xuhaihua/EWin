/*--
    本文件主要用于定义guid对象
        公有：
          方法：
            build   全球唯一标识符生成方法
--*/
( function() {
    var guid={
        
        //guid生成器[私有]
        build:function() {
            var s = []; 
            var hexDigits = "0123456789abcdef"; 
            for (var i = 0; i < 36; i++) { 
                s[i] = hexDigits.substr( Math.floor(Math.random() * 0x10), 1 ); 
            } 
            s[14] = "4";  
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  
            s[8] = s[13] = s[18] = s[23] = "-"; 
            var guid = s.join("");
            return "gu"+guid;
        }
    }
    
    JPM.nameSpace(
        "Data",
        "guid",guid
    )
} )();

