/**
    * 本文件主要用于定义PegPage实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Desktop.TaskBar
        * 属性：
            * tagNode     元素dom节点
        * 方法：
            * format      规格    
            * getType     获取类型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") )
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar", "PrePage") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    
    
    
    
    // 规格
    function format(tagNode) {
        var errString = "";
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "PrePage";
    }
    
    
    // PrePage类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop.TaskBar",
        
         function PrePage( tagNode ) {
           
             this.tagNode = tagNode;
             
             /*--定义方法开始--*/
             this.format=format;
             this.getType=getType;
             /*--定义方法结束--*/
            
             var err = this.format();
             if( err ) {
                alert( err );
             }
        }
    );
    
    // 原型继承Element
    PrePage.prototype = new Element();
} )();