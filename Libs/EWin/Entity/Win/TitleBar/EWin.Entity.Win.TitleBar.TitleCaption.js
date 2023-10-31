/** 
    * 本文件主要用于定义TitleCaption实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.TitleBar
        * 属性：
            * tagNode     元素dom节点
        * 方法：
            * format      规格
            * getType     获取类型所属空间：
 */
( function() {

    // 数据类引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Win.TitleBar", "TitleCaption") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin", "ITitleCaption") )
    
    

    // 规格
    function format() {
        var errString = "";
        return errString;
    }


    // 获取类型
    function getType() {
        return "TitleCaption";
    }
    
    
    // TitleCaption类定义
    JPM.nameSpace(
        "EWin.Entity.Win.TitleBar",
        
         function TitleCaption( tagNode ) {
           
            this.tagNode = tagNode;
            
            /*--方法定义开始--*/
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/
            
            var err = this.format();
            if ( err ) {
                alert( err  );
            }
            
            ITitleCaption.call( this );
        }
    );
    
    // 原型继承Element
    TitleCaption.prototype = new Element();
})();