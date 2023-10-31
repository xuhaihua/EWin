/**
    * ShortcutChildMenu类定义，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.Menu
        * 属性：
            * tagNode      元素dom节点
            * childType    允许添加的元素子类型
        * 方法：
            * format       规格
            * getType      获取类型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web", "css" ));
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );                                                                         
    eval( JPM.spaceUsing("EWin.Entity.Desktop.ShortcutMenu", "ShortcutMenuItem,ShortcutChildMenu") );
    eval( JPM.spaceUsing("EWin.Event", "ShortcutChildMenuEvent") );
    eval( JPM.spaceUsing("EWin", "IShortcutChildMenu") );
    
    
   
    // 规格
    function format() {
        var errString="";
        if ( this.parentNode ) {
        
            // 计算ChildMenu位置
            var menuItemOuterSize = HTMLDom.getNodeOuterSize( this.parentNode.tagNode );
            var left = this.parentNode.tagNode.offsetWidth;
            var top = 0 - menuItemOuterSize.topBorderWidth - menuItemOuterSize.topPaddingWidth;
            
            // 设置ChildMenu的位置
            this.setLeft(left);
            this.setTop(top);
            
            this.hide();
        }
        
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "ShortcutChildMenu";
    }
    
    JPM.nameSpace(
        "EWin.Entity.Desktop.ShortcutMenu",
        
        function ShortcutChildMenu( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.childType = "ShortcutMenuItem";
            /*--属性定义结束--*/
            
            /*---方法定义开始--*/
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/
           
            ShortcutChildMenuEvent.call(this);
            
            IShortcutChildMenu.call( this );
        }
    );
    
    // 原型继承Element
    ShortcutChildMenu.prototype = new Element();
} )();