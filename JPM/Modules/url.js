/*--
    本文件主要用于定义JPM url解析对象
        公有：
            方法：
                parseAbs    将url解析为绝对地址
--*/
( function() {
    
    // 绝对地址解析方法
    function parseAbs( url, relUrl ) {
    
        url = url.replace(/\\/g, "/");
        relUrl = relUrl.replace(/\\/g, "/");
        
        // 绝对地址判断
        if ( url.indexOf( ":/" ) != -1 ) {
            return url;
        }
        
        // 在这里如果解析地址中的首字符为："/"则将他做简单的删除
        if( url[0] == "/" ) {
            url = url.substring( 1, url.length )
        }
    
        // 将参考url分段
        relUrlPaths = relUrl.split( "/" );
        
        // 将解析地址分段
        var urlPaths = url.split( "/" );
        
        // 计算后退步
        var backSum = 1;
        for ( var i = 0; i < urlPaths.length && (urlPaths[i] == ".." || urlPaths == "."); i++) {
            if ( urlPaths[i] === ".." ) {
                ++backSum;
            }
        }
        
        // 获取解析地址主体路径
        var path="";
        for ( var i = backSum-1; i < urlPaths.length; i++ ) {
            if ( !path ) {
                path = urlPaths[i];
            } else {
                path = path + "/" + urlPaths[i]
            }
        }
        
        // 将解析地址成绝对地址并返回
        var index = relUrl.length - 1;
        var backCount = 0;
        for ( var i = relUrl.length - 1; i > 0;  i-- ) {
            if ( relUrl[i] === "/" ) {
                index = i;
                ++backCount;
            }
            if( backCount === backSum ) {
                break;
            }
        }
        return relUrl.substring( 0 , (index + 1) ) + path;
    }
    
    //定义url对象
    window[JPM.moduleSpaceName].url = {
        parseAbs: parseAbs
    }
} )();