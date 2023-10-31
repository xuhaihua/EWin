/**
    * 本文件主要用于定义ChildMenu实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.Menu
        * 属性：
            * tagNode                          元素dom节点
            * childType                        允许添加的元素子类型
        * 方法：
            * format                           规格
            * getType                          获取类型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web", "css") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );                                                                         
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar.StartMenu", "StartMenuItem,StartChildMenu") );
    eval( JPM.spaceUsing("EWin.Event", "StartChildMenuEvent") );
    eval( JPM.spaceUsing("EWin", "IStartChildMenu") );
    
    
   
    // 规格
    function format() {
        var errString="";
        if ( this.parentNode ) {
        
            //计算ChildMenu的left、Top值
            var menuItemOuterSize = HTMLDom.getNodeOuterSize( this.parentNode.tagNode );
            if ( this.parentNode.parentNode.getType() === "StartMenu" ) {
               var left = - menuItemOuterSize.leftBorderWidth - menuItemOuterSize.leftPaddingWidth;
               var top = -this.tagNode.offsetHeight; 
            } else {
                if ( this.parentNode.parentNode.getType() === "StartChildMenu" ) {
                   var left = this.parentNode.tagNode.offsetWidth;
                   var top = -this.tagNode.offsetHeight + this.parentNode.tagNode.offsetHeight;
                } 
            }
            
            //设置ChildMenu的位置
            this.setLeft(left);
            this.setTop(top);
            
            this.hide();
        }
        
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "StartChildMenu";
    }
    
    
    // ChildMenu类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop.TaskBar.StartMenu",
        
        function StartChildMenu( tagNode ) {
         
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.childType = "StartMenuItem";
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/
           
            StartChildMenuEvent.call( this );
            
            IStartChildMenu.call( this );
        }
    );
    
    // 原型继承Element
    StartChildMenu.prototype = new Element();
} )();