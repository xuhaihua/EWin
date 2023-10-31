
/**
    * 本文件主要用于定义ChildMenu实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.Menu
        * 属性：
            * tagNode     元素dom节点
            * childType   允许添加的元素子类型
        * 方法：
            * format      规格
            * getType     获取类型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web", "css") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );      
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );                                                                         
    eval( JPM.spaceUsing("EWin.Entity.Win.Menu", "MenuItem,ChildMenu") );
    eval( JPM.spaceUsing("EWin.Event", "ChildMenuEvent") );
    eval( JPM.spaceUsing("EWin", "IChildMenu") ); 
    
    
    
    
    // 规格[本方法的调用在MenuItem类的load方法实现中]
    function format() {
        var errString = "";
        if ( this.parentNode ) {
            var menuItemOuterSize = HTMLDom.getNodeOuterSize( this.parentNode.tagNode );
           
            // 计算ChildMenu的left、Top值
            if ( this.parentNode.parentNode.getType() === "Menu" ) {
               var left = 0 - menuItemOuterSize.leftBorderWidth;
               var top = this.parentNode.tagNode.offsetHeight - menuItemOuterSize.topBorderWidth; 
            } else {
                if ( this.parentNode.parentNode.getType() === "ChildMenu" ) {
                   var left = this.parentNode.tagNode.offsetWidth;
                   var top = 0 - menuItemOuterSize.topBorderWidth - menuItemOuterSize.topPaddingWidth;
                } 
            }
            
            // 设置ChildMenu的位置
            this.setLeft( left );
            this.setTop( top );
            
            this.hide();
        }
        
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "ChildMenu";
    }

   
    // ChildMenu类定义
    JPM.nameSpace(
        "EWin.Entity.Win.Menu",
        
        function ChildMenu( tagNode ) {
           
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.childType = "MenuItem";
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/
            
            ChildMenuEvent.call( this );  
              
            IChildMenu.call( this );
        }
    );
    
    // 原型继承Element
    ChildMenu.prototype = new Element();
} )();