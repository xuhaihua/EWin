/**
    * 本文件主要用于定义Panel实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.WorkSpace.SplitContainer
        * 属性：
            * tagNode                          元素dom节点
            * splitContainer                   子框架
            * tabControl                       标签
            * childTyp                         充许的子类型
            * flexMode                         伸缩方式[auto：按比例,fixed：固定不变]
            * minSize                          最小尺寸
        * 方法：
            * baseLoad                         基类子元素加载方法
            * baseAddElement                   引用基类addElement方法
            * baseRemoveElement                引用基类removeElement方法
            * addElement;                      添加项[重写基类方法]
            * removeElement;                   移除项[重写基类方法]
            * format;                          规格
            * getType;                         获取类型
            * load                             加载
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin"));  
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.SplitContainer", "Panel") );                                   
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "TabControl,SplitContainer") ); 
    eval( JPM.spaceUsing("EWin.Event", "PanelEvent") );
    eval( JPM.spaceUsing("EWin", "IPanel"));
    
    


    /*--重写基类方法开始--*/
    // 添加项
    function addElement( item ){
        var result = null;
        if ( item.getType() === "SplitContainer" && !this.tabControl ){
            if( !this.splitContainer ) {
                result = this.baseAddElement( item );
                this.splitContainer = result;
            } else {
                alert( "SplitContainer类型添加失败" );
            }
        }
        if ( item.getType() === "TabControl" && !this.splitContainer ){
            if ( !this.tabControl ) {
                result = this.baseAddElement( item );
                this.tabControl = result;
            } else {
                alert( "TabControl类型添加失败" );
            }
        }
        
        if( item.getType() != "TabControl" && item.getType() != "SplitContainer" ) {
            return this.baseAddElement( item );
        }
        
        return result;
    }

    // 移除项
    function removeElement(item) {
        var result = null;
        if ( item.getType() === "SplitContainer" ){
            if(this.splitContainer && this.splitContainer === item) {
                result = this.baseRemoveElement(item);
                this.splitContainer=null;
            } else {
                alert("SplitContainer类型移除失败");
            }
        }
        if ( this.getType() === "TabControl" ){
            if( this.tabControl && this.tabControl === item ) {
                result = this.baseRemoveElement( item );
                this.tabControl = null;
            } else {
                alert( "TabControl类型移除失败" );
            }
        }
        
        if( item.getType() != "TabControl" && item.getType() != "SplitContainer" ) {
            return this.baseRemoveElement( item );
        }
        
        return result;
    }
    /*--重写基类方法--*/
    
    
    // 规格
    function format() {
        var errString="";
        
        // 获取和设置flexMode属性值
        var flexMode = this.tagNode.getAttribute( "flexMode" )|| this.tagNode.getAttribute( "data-ewin-flexMode" );
        if ( flexMode && flexMode === "fixed" ) {
            this.flexMode = "fixed";
        } else {
            this.flexMode = "auto";
        }

        // 获取和设置minSize属性值
        var minSize = this.tagNode.getAttribute( "minSize" ) || this.tagNode.getAttribute( "data-ewin-minSize" );
        if ( minSize != null && !isNaN(parseInt(minSize)) ) {
            this.minSize = minSize;
        }
        
        return errString;
    }


    // 获取类型
    function getType() {
        return "Panel";
    }


    // 加载子元素方法实现
    function load( parseMap, target ){
        var panel = this;
        function iterator(nodeHTML) {
            if(HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE") {

                var signName = nodeHTML.tagName;
                
                // TabControl元素加载
                if ( !panel.tabControl && (signName.toLocaleUpperCase() === "TABCONTROL" || eWin.checkElementStyleClass("tabControl", nodeHTML)) ) {

                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {

                        // 设置索引键indexguid
                        var indexGuid=guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );

                        // 创建TabControl对象
                        var tabControl = new TabControl( nodeHTML );
                        panel.tabControl = tabControl;
                        panel.append( tabControl );
                        eWin.addItem( indexGuid, tabControl );
                        tabControl.load( parseMap );
                        
                        // 激活标签
                        if ( tabControl.act ) {
                            if ( (typeof tabControl.act) === "string" ) {
                                var tag = eWin.getElement( (document.getElementById(tabControl.act || "")) );
                                if( tag ) {
                                    tabControl.actitaveTag( tag );
                                }
                            }
                        } else {
                            if(tabControl.tabHead.firstChild) {
                                tabControl.actitaveTag( tabControl.tabHead.firstChild );
                            }
                        }

                        // 放弃对当前节点的深度遍历
                        if(tabControl.parentNode === panel) {
                            return "giveUp";
                        }
                     }
                }

                // splitContainer元素加载
                if ( !panel.splitContainer && (signName.toLocaleUpperCase() === "SPLITCONTAINER" || eWin.checkElementStyleClass("splitContainer", nodeHTML)) ) {

                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {

                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );

                        // 创建SplitContainer对象
                        var splitContainer = new SplitContainer( nodeHTML );
                        panel.splitContainer = splitContainer;
                        panel.append( splitContainer );
                        eWin.addItem( indexGuid, splitContainer );
                        splitContainer.load( parseMap );

                        // 放弃对当前节点的深度遍历
                        if ( splitContainer.parentNode === panel ) {
                            return "giveUp";
                        }
                    }
                }
            }
        }
        
        // 调用基类加载方法
        this.baseLoad( parseMap, iterator, target );
    }
    

    // Panel类定义
    JPM.nameSpace(
        "EWin.Entity.Win.WorkSpace.SplitContainer",

        function Panel( tagNode ) {

            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.splitContainer = null;
            this.tabControl = null;
            this.childType = "SplitContainer|TabControl";
            this.flexMode = "auto";
            this.minSize = 1;
            /*--属性定义结束--*/

            /*--方法定义开始--*/
            this.baseLoad = this.load;
            this.baseAddElement = this.addElement;
            this.baseRemoveElement = this.removeElement;
            this.addElement = addElement;
            this.removeElement = removeElement;    
            this.format = format;
            this.getType = getType;
            this.load = load;
            /*--方法定义结束--*/

            PanelEvent.call(this);  

            var err = this.format();
            if( err ) {
                alert( err );
            }
            
            IPanel.call( this );
        }
    );

    //原型继承Element
    Panel.prototype = new Element();
} )();