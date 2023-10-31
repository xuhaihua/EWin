/**
    * 本文件主要用于定义MenuItem实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间： EWin.Entity.Win.Menu
    
        * 属性：
            * tagNode             元素dom节点
            * childMenu           子菜单
        * 方法：  
            * baseLoad            基类加载方法 
            * baseAddElement      引用基类addElement方法
            * baseRemoveElement   引用基类removeElement方法
            * addElement          添加项[重写基类方法]
            * removeElement       移除项[重写基类方法]
            * load                加载
            * format              规格
            * getType             获取元素类型
 */
(function() {
    //相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );                                   
    eval( JPM.spaceUsing("EWin", "eWin") );  
    eval( JPM.spaceUsing("EWin.Entity.Win.Menu", "MenuItem,ChildMenu") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Event", "MenuItemEvent") );
    eval( JPM.spaceUsing("EWin", "IMenuItem") );  
    
    
    
    /*--重写基类方法开始--*/
    // 添加项
    function addElement(item){
        var result = null;
        if ( item.getType() === "ChildMenu" && !this.childMenu ){
            result = this.baseAddElement(item);
            this.childMenu = result;
        } else {
            alert("不能在已有子菜单的项中添加ChildMenu");
        }
        
        if ( item.getType() != "StartMenu" ) {
           return this.baseAddElement( item );
        }
        
        return result;
    }
    
    // 移除项
    function removeElement(item) {
        if( this.childMenu && this.childMenu === item && item.getType() === "ChildMenu" ) {
            this.childMenu=null;
            return this.baseRemoveElement(item);
        } else {
            alert("ChildMenu类型移除失败");
            return null;
        }
        
        if ( item.getType() != "StartMenu" ) {
           return this.baseRemoveElement( item );
        }
    }
    /*--重写基类方法结束--*/
    
    
    // 规格
    function format(tagNode) {
        var errString="";
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "MenuItem";
    }
    
    
    // 加载子元素实现
    function load( parseMap, target ) {
        var childMenu = null;
        var menuItem = this;
        
        // 定义解析处理器
        function iterator(nodeHTML) {
            if(HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE") {
                
                // childMenu元素加载
                var signName=nodeHTML.tagName;
                if( !childMenu && (signName.toLocaleUpperCase() === "CHILDMENU" || eWin.checkElementStyleClass("childMenu", nodeHTML)) ) {
                    
                    if( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                        
                        // 设置索引键indexguid
                        var indexGuid=guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建子菜单对象ChildMenu
                        childMenu = new ChildMenu( nodeHTML );
                        menuItem.childMenu = childMenu;
                        menuItem.append( childMenu );
                        eWin.addItem( indexGuid, childMenu );
                        childMenu.load( parseMap );
                        childMenu.format();
                    }
                }
            }
        }
        
        // 调用基类加载方法
        this.baseLoad( parseMap, iterator, target );
    }


    // MenuItem类定义
    JPM.nameSpace(
        "EWin.Entity.Win.Menu",
        
        function MenuItem( tagNode ) {
           
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.childMenu = null;
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.baseAddElement = this.addElement;
            this.baseRemoveElement = this.removeElement;
            this.addElement = addElement;
            this.removeElement = removeElement;
            this.baseLoad = this.load;
            this.format = format;
            this.getType = getType;
            this.load = load;
            /*--方法定义结束--*/
            
            MenuItemEvent.call( this );
            
            var err = this.format();
            if( err ) {
                alert( err );
            }
            
            IMenuItem.call( this );
        }
    );
    
    // 原型继承Element类
    MenuItem.prototype = new Element();
})();