/**
    * 本文件主要用于定义NextPage实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Desktop.TaskBar
        * 属性：
            * tagNode     元素dom节点
            * getType
        * 方法：
            * format      规格    
            * getType     获取类型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") )
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar", "NextPage") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    
    
    
    // 规格
    function format(tagNode) {
        var errString = "";
        return errString;
    }
    
    // 获取类型
    function getType() {
        return "NextPage";
    }
    
    
    // NextPage类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop.TaskBar",
        
         function NextPage( tagNode ) {
           
            this.tagNode = tagNode;
            
            /*-方法定义开始--*/
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/
            
            var err = this.format();
            if ( err ) {
                alert( err );
            }  
        }
    );
    
    // 原型继承Element
    NextPage.prototype = new Element();
} )();