/*--
    本文件主要用于定义Space类
        公有:
          属性:
            emptySpace           空间间
          方法:
            nameSpace            nameSpace方法
            spaceUsing           spaceUsing方法
--*/
( function() {

    // 定义nameSpace方法
    function nameSpace( url, name, obj) {
       if ( url != "" && !this[url] ) {                                                        
         this[url] = new window[JPM.moduleSpaceName].List();
       } 
       if ( url === "" ) {
           url = this.emptySpace;
       }
       
       this[url].add( name, obj );
    }
    
    // 定义usingSpace方法
    function spaceUsing( url ) {
        if ( !url || url.replace(/\s+/g,"") === "" ) {
            url = this.emptySpace;
        }
        if ( !this[url] ) {
            this[url] = new window[JPM.moduleSpaceName].List();
        }
        return this[url];
    }

    // Space类定义
    window[JPM.moduleSpaceName].Space = function(){
        
        /*--属性定义开始--*/
        this.emptySpace = window[JPM.moduleSpaceName].guid.build();
        this[this.emptySpace] = new window[JPM.moduleSpaceName].List();
        /*--属性定义结束--*/
        
        /*--方法定义开始--*/
        this.nameSpace = nameSpace;
        this.spaceUsing = spaceUsing;
        /*--方法定义开始--*/
    }
    
    //继承List类
    window[JPM.moduleSpaceName].Space.prototype = new window[JPM.moduleSpaceName].List();
} )();