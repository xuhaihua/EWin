/**
    * 本文件主要用于定义StartMenu类该类继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win
        * 属性：
            * tagNode     元素dom节点
            * childType   允许添加的元素子类型
        * 方法：
            * format      规格
            * getType     获取类型
            * furl        收拢方法
            * spread      展开方法
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar", "StartMenu") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar.StartMenu", "StartMenuItem") );
    eval( JPM.spaceUsing("EWin.Event", "StartMenuEvent") );
    eval( JPM.spaceUsing("EWin", "IStartMenu") );
    
    
    
    // 规格
    function format(tagNode) {
        var errString = "";
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "StartMenu";
    }
    
    
    // 收拢方法
    function furl( relMenuItem, depth ) {
       
        // 检索菜单链并将该链中的每一项都压入menuStack栈中
        var item = relMenuItem;
        var menuStack = new Array();
        while ( item && item != this ) {
            if ( item.getType() === "StartChildMenu" ) {
                if ( depth && depth === item ) {
                    break;
               }
               menuStack.push(item);
            }
            item = item.parentNode;
        }
      
        // 隐藏menuStack栈中的每一项
        while ( menuStack.length > 0 ) {
          var item = menuStack.pop();
          if ( item.tagNode.style.display === "block" ) {
                item.hide();
          }
        }
        
        // 隐藏relMenuItem中的子菜单
        if ( relMenuItem.startChildMenu ) {
          if ( relMenuItem.startChildMenu.tagNode.style.display === "block" ) {
             relMenuItem.startChildMenu.hide();
          }
        }
    }
    
    
    // 展开子菜单方法[参数：relMenuItem 参照菜单项]
    function spread( relMenuItem ) {
        if ( relMenuItem.startChildMenu ) {
            relMenuItem.startChildMenu.show();
        }
    }


    // StartMenu类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop.TaskBar",
        
        function StartMenu( tagNode ) {
           
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.childType = "StartMenuItem";
            /*--属性定义结束--*/
            
            /*--方法定义结束--*/
            this.format = format;
            this.getType = getType;
            this.furl = furl;
            this.spread = spread;
            /*--方法定义结束--*/
      
            StartMenuEvent.call(this);
                
            var err = this.format();
            if( err ) {
                alert( err );
            }
            
            IStartMenu.call( this );
        }
    )
    
    //原型继承Element
    StartMenu.prototype = new Element();
} )();