/** 
    * 本文件主要用于定义Desktop实体，该实体继承自EWin.Entity.Base.Element
        * 所属空间： EWin.Entity
            * 属性：
                * tagNode          元素dom节点
                * winSpace         窗体区
                * taskBar          任务栏区
                * iconRoll         图标偏移量[默认为：0]
            * 方法：
                baseAddElement     基类添加元素方法
                baseRemoveElement  基类移除元素方法
                addElement         添加元素方法
                removeElement      移除元素方法
                * baseLoad         基类加载方法
                * format           规格
                * getType          获取元素类型
                * load             加载方法
     */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin,actionParse") );
    eval( JPM.spaceUsing("Web", "eventUtil") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "TaskBar,WinSpace") );
    eval( JPM.spaceUsing("EWin.Entity", "Desktop") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Event", "DesktopEvent") );
    eval( JPM.spaceUsing("EWin", "IDesktop") );
    
    
    
    
    /*--重写基类方法开始--*/
    // 添加项
    function addElement( item ){
        var result = null;
        if ( item.getType() === "WinSpace" && !this.winSpace ){
            result = this.baseAddElement( item );
            this.winSpace = result;
        } else {
            alert( "Desktop元素下已经存在有WinSpace元素!" );
        }
        
        if ( item.getType() === "TaskBar" && !this.taskBar ){
            result = this.baseAddElement( item );
            this.taskBar = result;
        } else {
            alert( "Desktop元素下已经存在有TaskBar元素!" );
        }
        
        if( item.getType() != "TaskBar" && item.getType() != "WinSpace" ) {
           return this.baseAddElement( item );
        }
        
        return result;
    }
    
    
    // 移除项
    function removeElement( item ) {
        if ( this.winSpace && this.winSpace == item && item.getType() === "WinSpace" ) {
            this.winSpace = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "WinSpace类型移除失败" );
            return null;
        }
        
        if ( this.taskBar && this.taskBar == item && item.getType() === "TaskBar" ) {
            this.taskBar = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "TaskBar类型移除失败" );
            return null;
        }
        
        if( item.getType() != "TaskBar" && item.getType() != "WinSpace" ) {
            return this.baseRemoveElement( item );
        }
    }
    /*重写基类方法结束*/
    

    // 规格
    function format() {
        var errString = "";
        
        // 获取和设置图标每次滚动的偏移量
        var iconRoll = this.tagNode.getAttribute( "iconRoll" ) || this.tagNode.getAttribute( "data-ewin-iconRoll" );
        if ( iconRoll != null && !isNaN( parseInt(iconRoll)) ) {
            this.iconRoll = parseInt(iconRoll);
        }

        // 行为注册
        var deskTop=this;
        eventUtil.addHandler( deskTop.tagNode, "click", function(event){actionParse(event);} );                	
        eventUtil.addHandler( deskTop.tagNode, "mousedown", function(event){actionParse(event);} );
        eventUtil.addHandler( deskTop.tagNode, "mousemove", function(event){actionParse(event);} );
        eventUtil.addHandler( deskTop.tagNode, "mouseout", function(event){actionParse(event);} );
        eventUtil.addHandler( deskTop.tagNode, "mouseover" ,function(event){actionParse(event);} );
        eventUtil.addHandler( deskTop.tagNode, "mouseup", function(event){actionParse(event);} );
        
        return errString;
    }
    
    
    // 获取元素类型
    function getType() {
        return "Desktop";
    }


    // 加载子元素现实
    function load( parseMap, target ) {
    
        // deskTop  桌面
        // winSpace 窗体、图标空间
        // taskBar  任务栏对象
        var deskTop = this;
        var winSpace = null;
        var taskBar = null;
        
        // 定义加载处理器
        function handler( nodeHTML ) {
            if (HTMLDom.getNodeType( nodeHTML ) === "ELEMENT_NODE") {
                
                var signName = nodeHTML.tagName;
                
                // taskBar加载
                if ( !taskBar && (signName.toLocaleUpperCase() === "TASKBAR" || eWin.checkElementStyleClass("taskBar", nodeHTML)) ) {
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建任务栏对象TaskBar
                        taskBar = new TaskBar( nodeHTML );
                        deskTop.taskBar = taskBar;
                        deskTop.append( taskBar );
                        eWin.addItem( indexGuid, taskBar );
                        taskBar.load( parseMap );
                        
                        // 放弃对当前节点的深度遍历
                        if( taskBar.parentNode === deskTop ) {
                            return "giveUp";
                        }
                    }
                }
                
                // 检索winSpace符号并将其转成对应的WinSpace元素
                if ( !winSpace && (signName.toLocaleUpperCase() === "WINSPACE" || eWin.checkElementStyleClass("winSpace", nodeHTML)) ) {
                
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                        
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建WinSpace对象
                        winSpace = new WinSpace( nodeHTML );
                        deskTop.winSpace = winSpace;
                        deskTop.append( winSpace );
                        eWin.addItem( indexGuid, winSpace );
                        
                        // 放弃对当前节点的深度遍历
                        if( winSpace.parentNode === deskTop ) {
                            return "giveUp";
                        }
                     }
                }
            }
            
            if ( winSpace && taskBar ) {
                return false;
            } else {
                return true;
            }
        }
        
        // 定义查找的范围[防止遍历溢出]
        var tagNode = this.tagNode;
        if( (typeof target) != "undefined" ) {
            tagNode = target;
        }
        
        
        function range( node ){
            if ( node === tagNode ) {
                return true;
            }
        }
        
        // 解析执行
        HTMLDom.backwardTravevsal( this.tagNode, handler, range );
        
        // winSpace加载
        if ( winSpace ) {
            winSpace.load( parseMap );
        }
    }


    // Desktop类定义：
    JPM.nameSpace(
        "EWin.Entity",
        
        function Desktop( tagNode )    {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.winSpace = null;
            this.taskBar = null;
            this.iconRoll = 0;
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
            
            DesktopEvent.call( this );
            
            var err = this.format() ;
            if( err ) {
               alert( err );
            }
            
            IDesktop.call( this );
        }
    );
    
    // 原型继承Element
    Desktop.prototype = new Element();
} )();