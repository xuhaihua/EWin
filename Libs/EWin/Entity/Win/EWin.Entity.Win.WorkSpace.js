/**
   * 本文件主要用于定义WorkSpace实体，该实体继承自EWin.Entity.Base.Element
   * 所属空间：EWin.Entity.Win
        * 属性：
            * tagNode            元素dom节点
            * wFlex              宽度伸缩[默认值：true]
            * hFlex              高度伸缩[默认值：true]
            * childType          允许添加的元素子类型
         * 方法：   
            * baseLoad           基类加载方法
            * format             规格 
            * getType            获取类型
            * load               加载子元素
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "List,guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin.Entity.Win", "WorkSpace") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity", "Window") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "SplitContainer,TabControl") );            
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "CancelBut") ); 
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "ConfirmBut") );   
    eval( JPM.spaceUsing("EWin.Event", "WorkSpaceEvent") ); 
    eval( JPM.spaceUsing("EWin", "IWorkSpace") ); 
    
    
                        
    
    // 规格
    function format() {
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
        
        // 获取和设置窗体工作区元素的尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute( "data-ewin-width" ) || this.tagNode.getAttribute( "width" );
            if ( width === null || isNaN(parseInt(width)) ) {
                this.setWidth( HTMLDom.getNodeWidth( this.tagNode ) );
            } else {
                this.setWidth( parseInt(width) );
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
        return "WorkSpace";
    }
    
    
    // 加载子元素方法
    function load( parseMap, target ) {
    
        var workSpace = this;
        
        // 处理器定义
        function iterator(nodeHTML) {
            if (HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE") {
        
                var signName = nodeHTML.tagName;
                
                // tabControl加载
                if ( signName.toLocaleUpperCase() === "TABCONTROL" || eWin.checkElementStyleClass("tabControl", nodeHTML) ) {
                    
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建TabControl对象
                        var tabControl = new TabControl( nodeHTML );
                        workSpace.append( tabControl );
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
                        if ( tabControl.parentNode === workSpace ) {
                            return "giveUp";
                        }
                     }
                }
                
                
                // Window加载
                if ( signName.toLocaleUpperCase() === "WINDOW" || eWin.checkElementStyleClass("window", nodeHTML) ) {
                    
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        //设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        //创建窗体对象Window
                        var window = new Window( nodeHTML );
                        workSpace.append( window );
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
                        
                        //放弃对当前节点的深度遍历
                        if( window.parentNode === workSpace ) {
                            return "giveUp"
                        }
                     }
                }
            }
        }
        
        // 调用基类加载方法
        this.baseLoad( parseMap, iterator, target );
    }


    // WorkSpace类定义
    JPM.nameSpace(
        "EWin.Entity.Win",
        
        function WorkSpace( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.wFlex = true;
            this.hFlex = true;
            this.childType = "SplitContainer|TabControl|Window";
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.format = format;
            this.baseLoad = this.load;
            this.getType = getType;
            this.load = load;
            /*--方法定义结束--*/
            
            WorkSpaceEvent.call(this);
            
            var err = this.format() ;
            if( err ) {
               alert( err );
            }
            
            IWorkSpace.call( this );
        }
    );
    
    // 原型继承Element
    WorkSpace.prototype=new Element();
} )();