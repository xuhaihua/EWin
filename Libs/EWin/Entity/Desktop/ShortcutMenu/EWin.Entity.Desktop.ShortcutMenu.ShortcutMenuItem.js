
/**
    * 本文件主要用于定义ShortcutMenuItem实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.Menu
        * 属性：
            * tagNode                   元素dom节点
            * childMenu                 子菜单
        * 方法：   
            * baseLoad                  基类加载方法
            * baseAddElement            引用基类addElement方法
            * baseRemoveElement         引用基类removeElement方法
            * addElement                添加项[重写基类方法]
            * removeElement             移除项[重写基类方法]
            * load                      加载
            * format                    规格
            * getType                   获取元素类型
 */
( function() {
    //相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );                                   
    eval( JPM.spaceUsing("EWin", "eWin") );  
    eval( JPM.spaceUsing("EWin.Entity.Desktop.ShortcutMenu", "ShortcutMenuItem,ShortcutChildMenu") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "ShortcutMenu") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Event", "ShortcutMenuItemEvent") );
    eval( JPM.spaceUsing("EWin", "IShortcutMenu") );
    
    
    

    /*--重写基类方法开始--*/
    // 添加项
    function addElement( item ){
        var result = null;
        if ( item.getType() === "ShortcutChildMenu" && !this.shortcutChildMenu ){
            result = this.baseAddElement( item );
            this.shortcutChildMenu = result;
        } else {
            alert( "不能在已有子菜单的项中添加ShortcutChildMenu" );
        }
        
        if ( item.getType() != "ShortcutChildMenu" ) {
           return this.baseAddElement( item );
        }
        
        return result;
    }
    
    
    // 移除项
    function removeElement( item ) {
        if ( this.shortcutChildMenu && this.shortcutChildMenu == item && item.getType() === "ShortcutChildMenu" ) {
            this.shortcutChildMenu = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "ShortcutChildMenu类型移除失败" );
            return null;
        }
        
        if ( item.getType() != "ShortcutChildMenu" ) {
           return this.baseRemoveElement( item );
        }
        
    }
    /*重写基类方法结束*/
    
    
    // 规格
    function format() {
        var errString = "";
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "ShortcutMenuItem";
    }
    
    
    // 加载子元素实现
    function load( parseMap, target ) {
    
        var shortcutChildMenu = null;
        var shortcutMenuItem = this;
        
        // 定义解析处理器
        function iterator( nodeHTML ) {
            if ( HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE" ) {
        
                var signName=nodeHTML.tagName;
                
                // shortcutChildMenu元素加载
                if ( !shortcutChildMenu && (signName.toLocaleUpperCase() === "SHORTCUTCHILDMENU" || eWin.checkElementStyleClass("shortcutChildMenu",nodeHTML)) ) {
                    
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                        
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建子菜单对象StartChildMenu
                        shortcutChildMenu = new ShortcutChildMenu( nodeHTML );
                        shortcutMenuItem.shortcutChildMenu = shortcutChildMenu;
                        shortcutMenuItem.append( shortcutChildMenu );
                        eWin.addItem( indexGuid, shortcutChildMenu );
                        shortcutChildMenu.load( parseMap );
                        shortcutChildMenu.format();
                    }
                }
            }
        }
        
        // 调用基类加载方法
        this.baseLoad( parseMap, iterator, target );
    }
    
    
    // StartMenuItem类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop.ShortcutMenu",
        
        function ShortcutMenuItem( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.shortcutChildMenu = null;
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.baseLoad = this.load;
            this.baseAddElement = this.addElement;
            this.baseRemoveElement =this.removeElement;
            this.addElement = addElement;
            this.removeElement = removeElement;
            this.load = load;
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/
            
            ShortcutMenuItemEvent.call(this);
            
            var err = this.format();
            if( err ) {
                alert( err );
            }
            
            IShortcutMenu.call( this );
        }
    );
    
    // 原型继承MenuItemEvent类
    ShortcutMenuItem.prototype = new Element();
} )();