/**
   * 本文件主要用于定义Menu实体,该实体继承自EWin.Entity.Base.Element
   * 所属空间： EWin.Entity.Win
   * 公有：
        * 属性：
            * tagNode             元素dom节点
            * childType           允许添加的元素子类型
            * wFlex               宽度伸缩[默认值：true]                    
            * hFlex               高度伸缩[默认值：false]
        * 方法：
            * format              规格
            * getType             获取类型
            * furl                收拢方法
            * spread              展开方法
 */
( function() {

    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );      
    eval( JPM.spaceUsing("EWin.Entity.Win", "Menu") );  
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );                                                                         
    eval( JPM.spaceUsing("EWin.Entity.Win.Menu", "MenuItem") );
    eval( JPM.spaceUsing("EWin.Event", "MenuEvent") );
    eval( JPM.spaceUsing("EWin", "IMenu") ); 
    
    
    
    
    // 规格
    function format( tagNode ) {
        var errString="";
        
        // 对伸缩属性进行设置
        if ( this.tagNode.getAttribute("wflex") === "false" || this.tagNode.getAttribute("data-ewin-wflex") === "false" ){
            this.wFlex=false;
        }
        if ( this.tagNode.getAttribute("hflex") === "false" || this.tagNode.getAttribute("data-ewin-hflex") === "false" ){
            this.hFlex=false;
        }
        if ( this.tagNode.getAttribute("wflex") === "true" || this.tagNode.getAttribute("data-ewin-wflex") === "true" ){
            this.wFlex=true;
        }
        if ( this.tagNode.getAttribute("hflex") === "true" || this.tagNode.getAttribute("data-ewin-hflex") === "true" ){
            this.hFlex=true;
        }
        
        // 获取和设置菜单栏元素的尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute( "data-ewin-width" ) || this.tagNode.getAttribute( "width" );
            if ( width === null || isNaN(parseInt(width)) ) {
                this.setWidth( HTMLDom.getNodeWidth( this.tagNode ) );
            } else {
                this.setWidth(parseInt(width));
            }
        }
        if ( this.hFlex ) {
            var height = this.tagNode.getAttribute( "data-ewin-height" ) || this.tagNode.getAttribute( "height" );
            if (  height === null || isNaN(parseInt(height)) ) {
                this.setHeight( HTMLDom.getNodeHeight( this.tagNode ) );
            } else {
                this.setHeight( parseInt(height) );
            }
        }
        
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "Menu";
    }
    
    
    // 收拢方法[relMenuItem：参考菜单项，depth：深度]
    function furl( relMenuItem, depth ) {
       
        // 检索菜单链并将该链中的菜单压入menuChainStack中
        var item = relMenuItem;
        var menuChainStack = new Array();
        while ( item && item != this ) {
            if ( item.getType() === "ChildMenu" ) {
                if ( depth && depth === item ) {
                    break;
               }
               menuChainStack.push( item );
            }
            item = item.parentNode;
        }
      
        // 隐藏menuChainStack中的每一项
        while ( menuChainStack.length>0 ) {
          var item = menuChainStack.pop();
          if ( item.tagNode.style.display === "block" ) {
                item.hide();
          }
        }
        
        // 隐藏relMenuItem中的子菜单
        if ( relMenuItem.childMenu ) {
          if ( relMenuItem.childMenu.tagNode.style.display === "block" ) {
             relMenuItem.childMenu.hide();
          }
        }
    }
    
    // 展开子菜单方法[参数：relMenuItem 参照菜单项]
    function spread( relMenuItem ) {
        if( relMenuItem.childMenu ) {
            relMenuItem.childMenu.show();
        }
    }


    // Menu类定义
    JPM.nameSpace(
        "EWin.Entity.Win",
        
        function Menu( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.childType = "MenuItem";
            this.wFlex = true;
            this.hFlex = false;
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.format = format;
            this.getType = getType;
            this.furl = furl;
            this.spread = spread;
            /*--方法定义结束--*/
            
            MenuEvent.call(this);
            
            var err = this.format() ;
            if( err ) {
               alert( err );
            }
            
            IMenu.call( this );
        }
    );
    
    // 原型继承Element
    Menu.prototype = new Element();
} )();