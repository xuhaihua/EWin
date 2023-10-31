/**
    * 本文件主要用于定义ShortcutMenu实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win
        * 属性：
            * tagNode     元素dom节点
            * left        快捷菜单left值
            * top         快捷菜单top值
            * offsetX     X坐标偏移量
            * offsetY     Y坐标偏移量
            * childType   允许添加的元素子类型
        * 方法：
            * baseLoad    基类加载方法
            * format      规格
            * getType     获取类型
            * load        加载子元素
            * show        显示方法[覆盖基类]
            * furl        收拢方法
            * spread      展开方法
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "ShortcutMenu") );  
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );                                                                         
    eval( JPM.spaceUsing("EWin.Entity.Desktop.ShortcutMenu", "ShortcutMenuItem") );
    eval( JPM.spaceUsing("EWin.Event", "ShortcutMenuEvent") );
    eval( JPM.spaceUsing("EWin", "IShortcutMenu") );
    
    
    
    
    // 规格
    function format() {
        var errString = "";
        
        var offsetX = this.tagNode.getAttribute( "data-ewin-offsetX" ) || this.tagNode.getAttribute( "offsetX" );
        if( offsetX != null && !isNaN(parseInt(offsetX)) ) {
            this.offsetX = parseInt(offsetX);
        }
        
        var offsetY = this.tagNode.getAttribute( "data-ewin-offsetY" ) || this.tagNode.getAttribute( "offsetY" );
        if( offsetY != null && !isNaN(parseInt(offsetY)) ) {
            this.offsetY = parseInt(offsetY);
        }
        
        var left = this.tagNode.getAttribute( "data-ewin-left" ) || this.tagNode.getAttribute( "left" );
        if( left != null && !isNaN(parseInt(left)) ) {
            this.left = parseInt(left);
        }
        
        var top = this.tagNode.getAttribute( "data-ewin-top" ) || this.tagNode.getAttribute( "top" );
        if( top != null && !isNaN(parseInt(top)) ) {
            this.top = parseInt(top);
        }
        
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "ShortcutMenu";
    }
    
    
    //加载子元素实现
    function load( parseMap , target ) {
    
        var shortcutMenu = this;
        //定义解析处理器
        function iterator( nodeHTML ) {
            if ( HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE" ) {
                
                var signName=nodeHTML.tagName;
                if ( (signName.toLocaleUpperCase() === "SHORTCUTMENUITEM" || eWin.checkElementStyleClass("shortcutMenuItem", nodeHTML)) ) {
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        //设置索引键indexguid
                        var indexGuid=guid.build();
                        nodeHTML.setAttribute("data-ewin-indexguid",indexGuid);
                        
                        //创建菜单项对象StartMenuItem
                        var shortcutMenuItem = new ShortcutMenuItem(nodeHTML);
                        shortcutMenu.append(shortcutMenuItem);
                        eWin.addItem(indexGuid,shortcutMenuItem);
                        shortcutMenuItem.format();
                        shortcutMenuItem.load( parseMap );

                        //放弃对当前节点的深度遍历
                        if(shortcutMenuItem.parentNode === shortcutMenu) {
                            return "giveUp"
                        }
                    }
                }
            }
        }
        
        // 调用基类加载方法
        this.baseLoad( parseMap, iterator, target)
        
        this.hide();
    }
    
    
    /*--覆盖基类方法开始--*/
    function show(x,y) {
        this.tagNode.style.display = "block";
        if ( x && y ) {
            if ( this.left === null ) {
                this.setLeft(x + this.offsetX);
            } else {
                this.setLeft(this.left + this.offsetX);
            }
            if( this.top === null ) {
                this.setTop(y + this.offsetY);
            } else {
                this.setTop(this.top + this.offsetY);
            }
        }
    }
    /*--覆盖基类方法结束--*/
    
    
    // 收拢方法
    function furl( relMenuItem, depth ) {
       
        // 检索菜单链并将该链中的每一项都压入menuNodeStack栈中
        var item = relMenuItem;
        var menuNodeStack = new Array();
        while ( item && item != this ) {
            if ( item.getType() === "ShortcutChildMenu" ) {
                if ( depth && depth === item ) {
                    break;
               }
               menuNodeStack.push( item );
            }
            item = item.parentNode;
        }
      
        // 隐藏menuNodeStack栈中的每一项
        while ( menuNodeStack.length > 0 ) {
          var item = menuNodeStack.pop();
          if ( item.tagNode.style.display === "block" ) {
                item.hide();
          }
        }
        
        // 隐藏oldStartrelMenuItem中的子菜单
        if ( relMenuItem.shortcutChildMenu ) {
            if ( relMenuItem.shortcutChildMenu.tagNode.style.display === "block" ) {
               relMenuItem.shortcutChildMenu.hide();
            }
        }
    }
    
    
    // 展开子菜单方法[参数：relMenuItem 参照菜单项]
    function spread( relMenuItem ) {
        if ( relMenuItem.shortcutChildMenu ) {
            relMenuItem.shortcutChildMenu.show();
        }
    }


    // ShortcutMenu类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop",
        
        function ShortcutMenu( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.top = null;
            this.left = null;
            this.offsetX = 0;
            this.offsetY = 0;
            this.childType = "ShortcutMenuItem";
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.baseLoad = this.load;
            this.format = format;
            this.getType = getType;
            this.load = load;
            this.show = show;
            this.furl = furl;
            this.spread = spread;
            /*--方法定义结束--*/
      
            ShortcutMenuEvent.call(this);
            
            var err = this.format();
            if ( err ) {
                alert( err );
            }
            
            IShortcutMenu.call( this );
        }
    );
    
    // 原型继承Element
    ShortcutMenu.prototype = new Element();
} )();