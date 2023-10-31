/**
    * 本文件主要用于定义WinSpace类该类继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Desktop
        * 属性：
             * tagNode         元素dom节点
             * childType       允许添加的元素子类型
        * 方法：
            * baseLoad         加载元素方法
            * format           规格 
            * getType          获取元素类型
            * load             加载子元素方法
 */
( function() {

    // 相关类型或对象引用
    eval( JPM.spaceUsing("Data", "guid,List") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );                      
    eval( JPM.spaceUsing("Web", "eventUtil") );  
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.WinSpace", "Icon") );
    eval( JPM.spaceUsing("EWin.Entity", "Window") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "WinSpace") );
    eval( JPM.spaceUsing("EWin.Event", "WinSpaceEvent") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "ShortcutMenu") );
    eval( JPM.spaceUsing("EWin", "IWinSpace") );
    
    
    
    
    // 规格
    function format() {
        var errString = "";
        return errString;
    }
    
    
    // 获取元素类型
    function getType() {
        return "WinSpace";
    }
    
    
    // 加载子元素实现
    function load( parseMap ,target ) {
        var winSpace = this;
        
        // 定义迭代器
        function iterator( nodeHTML ) {
            if(HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE") {
        
                var signName = nodeHTML.tagName; 
                // tabControl加载
                if ( signName.toLocaleUpperCase() === "TABCONTROL" || eWin.checkElementStyleClass("tabControl", nodeHTML) ) {
                    
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建TabControl对象
                        var tabControl = new TabControl( nodeHTML );
                        winSpace.append( tabControl );
                        eWin.addItem( indexGuid, tabControl );
                        tabControl.load( parseMap );
                        
                        // 激活标签
                        if ( tabControl.act ) {
                            if ( (typeof tabControl.act) === "string" ) {
                                var tag = eWin.getElement( (document.getElementById(tabControl.act || "")) );
                                if ( tag ) {
                                    tabControl.actitaveTag( tag );
                                }
                            }
                        } else {
                            if ( tabControl.tabHead.firstNode ) {
                                tabControl.actitaveTag( tabControl.tabHead.firstNode );
                            }
                        }
                        
                        // 放弃对当前节点的深度遍历
                        if ( tabControl.parentNode === winSpace ) {
                            return "giveUp";
                        }
                     }
                }
                
                if ( signName.toLocaleUpperCase() === "WINDOW" || eWin.checkElementStyleClass("window",nodeHTML) ) {
                    
                    if( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建窗体对象Window
                        var window = new Window( nodeHTML );
                        winSpace.append( window );
                        eWin.addItem( indexGuid, window );
                        window.load( parseMap );
                        
                        window.open();
                        
                        // 保存窗体原始大小及位置
                        window.saveSize();
                        
                        if ( window.state === "close" ) {
                            window.close();
                        }
                        
                        if ( window.state === "min" ) {
                            window.min();
                        }
                        
                        if ( window.state === "max" ) {
                            window.max();
                        }
                        
                        // 放弃对当前节点的深度遍历
                        if ( window.parentNode === winSpace ) {
                            return "giveUp";
                        }
                     }
                }
            }
        }
        
        // 调用基类加载方法
        this.baseLoad( parseMap, iterator, target );
    }
    
    
    // WinSpace类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop",
        
        function WinSpace( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode=tagNode;
            this.childType="Window|Icon";
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.baseLoad = this.load;
            this.format=format;
            this.getType=getType;
            this.load=load;
            /*--方法定义结束--*/
            
            WinSpaceEvent.call( this );
                 
            var err = this.format();
            if ( err ) {
                alert( err );
            }
            
            IWinSpace.call( this );
        }
    );
    
    // 原型继承Element
    WinSpace.prototype =  new Element();
} )();