/*--
    本模块主要用于实现EWin的用户行为识别
        模块变量：
            target                目标元素
            handleIcon            目标图标
            handleWin             目标窗体
            handleSplit           目标框架
            headleTag             目标标签
            handleTool            目标工具栏
            oldMouseDownTime      上次鼠标单击时间
            oldMouseX             上次鼠标X坐标
            oldMouseY             上次鼠标Y坐标
            mouseX                当前鼠标X坐标
            mouseY                当前鼠标Y坐标
            oldMenuItem           上次打开的窗体菜单项                                     
            oldStartMenuItem      上次打开的开始菜单项
            oldShortcutMenuItem   上次打开的快捷菜单项
            oldShortcutMenu       上次打开的快捷菜单
            isIconDragReady       图标拖动准备标识
            isIconDragActioning   图标拖动行为标识
            isToolDragReady       工具栏拖动准备标识
            isToolDragActioning   工具栏拖动行为标识
            isMoveReady           窗体移动准备标识
            isMoveActioning       窗体移动行为标识
            isSizeReady           窗体调整准备标识
            isSizeActioning       窗体调整行为标识
            ajsutDirection        窗体调整方向
            isSplitSizeReady      框架调整准备标识
            isSplitSizeActioning  框架调整行为标识
            isTagDragReady        标签拖动准备标识
            isTagDragActioning    标签拖动行为标识
            
            commonClickEnable     通用控件单击使能
            commonDragEnable      通用控件拖动使能
            cancelButEnable       取消按钮使能
            confirmButEnable      确定按钮使能
            titleDlClickEnable    标题栏双击使能
            thumClickEnable       缩略图单击使能
            iconClickEnable       图标单击使能
            iconDragEnable        图标拖动使能
            iconScrollEnable      图标滚动使能
            menuEnable            窗体菜单使能
            menuItemEnable        窗体菜单项使能
            shortcutMenuEnable    快捷菜单使能
            startMenuEnable       开始菜单使能
            startMenuItemEnable   开始菜单项使能
            tagActivaveEnable     标签激活使能
            tagCloseEnable        标签关闭使能
            tagDragEnable         标签拖动使能
            activaveEnable        窗体激活使能
            closeEnable           窗体关闭使能  
            minEnable             窗体最小化使能
            maxEnable             窗体最大化使能
            moveEnable            窗体移动使能
            sizeEnable            窗体尺寸改变使能
            toolItemEnable        工具按钮使能
            toolDragEnable        工具栏拖动使能
            splitSizeEnable       框架尺寸改变使能
--*/
( function() {
    // 相关对象或类型的引用
    eval( JPM.spaceUsing("EWin", "eWin,dBehaviour") );
    eval( JPM.spaceUsing("Web", "css") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("Web", "eventUtil,mouse") );
    eval( JPM.spaceUsing("EWin.Entity", "Window") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "ShortcutMenu") );
    
    /*--定义模块行为变量开始--*/
    var target = null;
    var oldMouseDownTime = null;
    
    //菜单行为变量定义
    var oldMenuItem = null;
    var oldStartMenuItem = null;
    var oldShortcutMenuItem = null;
    var oldShortcutMenu = null;
    
 
    // 鼠标行为变量定义
    var oldMouseX = 0;
    var oldMouseY = 0;
    var mouseX = 0;
    var mouseY = 0;
    
    // 通用控件行为变量定义
    var handleCommon = null;
    var isCommonDragReady = false;
    var isCommonDragActioning = false;
    
    // 窗体行为变量定义
    var handleWin = null;
    var isMoveReady = false;
    var isMoveActioning = false;
    var sizeHandleWin = null;
    var isSizeReady = false;
    var isSizeActioning = false;                 
    var ajsutDirection =" ";
    
    // 工具栏行为变量定义
    var handleTool = null;                           
    var isToolDragReady = false;
    var isToolDragActioning = false;
    
    // 标签行为变量定义
    var headleTag = null;                                
    var isTagDragReady = false;
    var isTagDragActioning = false;
    
    var handleSplit = null;
    var isSplitSizeReady = false;
    var isSplitSizeActioning = false;
    
    // 图标行为变量定义
    var handleIcon = null;
    var isIconDragReady = false;
    var isIconDragActioning = false;
    var isIconScrollReady = false;
    var isIconScrollActioning = false; 
    /*--定义模块行为变量结束--*/
   
    /*--定义模块使能变量开始--*/
    // 菜单行为使能定义
    var menuItemEnable = true;
    var startMenuItemEnable = true;
    var menuEnable=true;
    var startMenuEnable = true;
    var shortcutMenuEnable = true;
    
    // 图标行为使能定义
    var iconClickEnable = true;
    var iconScrollEnable = true;
    var iconDragEnable = true;
    
    // 窗体行为使能定义
    var activaveEnable = true;
    var closeEnable = true;                         
    var maxEnable = true;
    var minEnable = true;
    var moveEnable = true;
    var sizeEnable = true;
    
    // 工具栏行为使能定义
    var toolDragEnable = true;
    var toolItemEnable = true;
    
    // 标签行为使能定义
    var tagActivaveEnable = true;
    var tagCloseEnable = true;
    var tagDragEnable = true;
    
    // 通用控件、标题栏、框架、缩略图、取消按钮、确定按钮使能定义
    var commonDragEnable = true;
    var commonClickEnable = true;
    var titleDlClickEnable = true;
    var splitSizeEnable = true;
    var thumClickEnable = true;
    var cancelButEnable = true;
    var confirmButEnable = true;
    /*--定义模块使能变量结束--*/
    
    
    // 打开所有使能方法[私有]
    function openAllEnable() {
        commonDragEnable = true;
        commonClickEnable = true;
        menuItemEnable = true;
        startMenuItemEnable = true;
        menuEnable = true;
        startMenuEnable = true;
        shortcutMenuEnable = true;
        
        iconClickEnable = true;
        iconScrollEnable = true;
        iconDragEnable = true;
    
        activaveEnable = true;
        closeEnable = true;
        maxEnable = true;
        minEnable = true;
        moveEnable = true;
        sizeEnable = true;
        
        toolItemEnable = true;
        toolDragEnable = true;
        
        tagCloseEnable = true;
        tagActivaveEnable = true;
        tagDragEnable = true;
        
        titleDlClickEnable = true;
        splitSizeEnable = true;
        cancelButEnable = true;
        confirmButEnable = true;
        thumClickEnable = true;
    }
    
    
    // 关闭所有使能方法[私有]
    function closeAllEnable() {
        commonDragEnable = false;
        commonClickEnable = false;
        menuItemEnable = false;
        startMenuItemEnable = false;
        menuEnable = false;
        startMenuEnable = false;
        shortcutMenuEnable = false;
        
        iconClickEnable = false;
        iconScrollEnable = false;
        iconDragEnable = false;
    
        activaveEnable = false;
        closeEnable = false;
        maxEnable = false;
        minEnable = false;
        moveEnable = false;
        sizeEnable = false;
        
        toolItemEnable = false;
        toolDragEnable = false;
        
        tagCloseEnable = false;
        tagActivaveEnable = false;
        tagDragEnable = false;
        
        titleDlClickEnable = false;
        splitSizeEnable = false;
        cancelButEnable = false;
        confirmButEnable = false;
        thumClickEnable = false;
    }

    // 用户行为识别方法
    function actionParse( event ) {
    
         // 获取Dom事件对象
         var event = eventUtil.getEvent( event );
         
         // 获取鼠标在Dom层的行为                                    
         var mouseAction = mouse.getAction( event );
         var mouseButCode = mouse.getButton( event );

         // 行为识别及执行
         if ( mouseAction === "MOUSEUP" || mouseAction === "MOUSEDOWN" || mouseAction === "MOUSEMOVE" || mouseAction === "MOUSEOVER" || mouseAction === "MOUSEOUT" ) {
         
            // 获取当前鼠标客户端坐标
            mouseX = mouse.getPointerClientX( event );                            
            mouseY = mouse.getPointerClientY( event );
            
            // 获取事件的目标对象
            var nodeTarget = eventUtil.getTarget( event );
            target = eWin.getElement( nodeTarget );                           
            
            // 计算鼠标所在的Windows对象
            var relWin = null;
            if ( target ) {
                relWin = eWin.getWin( target.tagNode );
            }
            
            // dom事件对Window对象操作的有效性判断
            var isDomActValid = false;
            if ( relWin && (eWin.dialogStack.length === 0 || eWin.dialogStack.length > 0 && eWin.dialogStack[eWin.dialogStack.length-1] === relWin) ) {
                isDomActValid = true;
            }
            
            // 禁止Dom层的事件默认行为
            if ( mouseAction === "MOUSEDOWN" && mouseButCode===0 && nodeTarget.getAttribute("data-ewin-indexguid") ) {
                eventUtil.preventDefault( event );
            }
            
            // 用户双击行为识别
            var mAction="";
            if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 ) {
                var date = new Date();
                var currentTime = date.getTime();
                if ( oldMouseDownTime ) {
                    if ( currentTime - oldMouseDownTime < 300 ) {
                        mAction = "DBCLICK"
                    } else {
                        mAction = "";
                    }
                } 
                oldMouseDownTime = currentTime;
            }

            /*--快捷菜单处理代码开始--*/
            if ( shortcutMenuEnable ) {
            
                // 隐藏主菜单
                if ( mouseAction === "MOUSEDOWN" && target && target.getType() != "ShortcutMenuItem" && target.getType() != "ShortcutChildMenu" && target.getType() != "ShortcutMenu" ) {
                    if ( oldShortcutMenu ) {
                        if( oldShortcutMenuItem ) {
                            oldShortcutMenu.furl( oldShortcutMenuItem );
                        }
                        oldShortcutMenu.hide();
                    }
                    oldShortcutMenu = null;
                    oldShortcutMenuItem = null;
                }
                
                // 隐藏子菜单
                if ( mouseAction === "MOUSEOVER" && target && (target.getType() === "ShortcutMenuItem") ) {
                    if ( oldShortcutMenuItem && oldShortcutMenuItem != target.parentNode.parentNode ) {
                        oldShortcutMenu.furl( oldShortcutMenuItem, target.parentNode );
                    }
                }
            
                // 显示主菜单
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 2 && (nodeTarget.getAttribute("data-ewin-shortcutId") || nodeTarget.getAttribute("shortcutId")) ) {
                    
                   // 阻止浏览器快捷菜单
                   document.oncontextmenu=function(){ return false; };
                   
                   // 查找快捷菜单并显示
                   shortcutMenu = eWin.getElement( document.getElementById(nodeTarget.getAttribute("data-ewin-shortcutId") || nodeTarget.getAttribute("shortcutId")) );
                   if ( shortcutMenu ) {
                       shortcutMenu.tagNode.style.zIndex = "3333";
                       shortcutMenu.show( mouseX, mouseY );
                       oldShortcutMenu = shortcutMenu;
                   }
                }
                
                // 展开子菜单
                if ( mouseAction === "MOUSEOVER" && target && target.getType() === "ShortcutMenuItem" ) {
                    var item = oldShortcutMenuItem;
                    while ( item && item.getType() != "ShortcutMenu" ){ item = item.parentNode; };
                    if ( item ) {
                        item.spread( target );
                    }
                    oldShortcutMenuItem = target;
                }
                
                // 单击菜单项
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && target && target.getType() === "ShortcutMenuItem" ) {
                    
                    // 执行click事件
                    target.clickEvent();
                    
                    // 收拢菜单
                    var item = target;
                    item = item.parentNode;
                    while ( item.getType() != "ShortcutMenu" ){ item = item.parentNode; };
                    var shortcutMenu = item;
                    shortcutMenu.furl( oldShortcutMenuItem );
                    shortcutMenu.hide();
                    
                    // 复位相关变量
                    oldShortcutMenu = null;
                    oldShortcutMenuItem = null;
                }
            }
            /*--快捷菜单处理代码结束--*/
            
            
            /*--开始菜单行为处理代码开始--*/
            if ( startMenuEnable ) {
            
                // 显示一级菜单
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && target && target.getType() === "StartMenuItem" && target.parentNode.getType() === "StartMenu" ) {
                    var item = target;
                    while ( item && item.getType() != "StartMenu" ){ item = item.parentNode; };
                    if( item ) {
                        item.spread( target );
                    }
                    oldStartMenuItem = target;
                }
            
                // 隐藏除一级菜单下的所有菜单
                if ( mouseAction === "MOUSEOVER" && target && oldStartMenuItem && (target.getType() != "StartMenuItem" && target.getType() != "StartMenu" && target.getType() != "StartChildMenu") ) {
                    var item = oldStartMenuItem;
                    while ( item && item.getType() != "StartMenu" ){ item = item.parentNode; };
                    item.furl( oldStartMenuItem );
                }
                
                // 隐藏子菜单
                if ( mouseAction === "MOUSEOVER" && target && oldStartMenuItem && target.getType() === "StartMenuItem" && target.parentNode.parentNode != oldStartMenuItem && oldStartMenuItem.parentNode.parentNode != target ) {
                    var item = oldStartMenuItem;
                    while ( item && item.getType() != "StartMenu" ){ item = item.parentNode; };
                    item.furl( oldStartMenuItem, target.parentNode );
                }
                
                // 显示子菜单
                if ( mouseAction === "MOUSEOVER" && target && target.getType() === "StartMenuItem" && target.parentNode.getType() != "StartMenu" ) {
                    var item = target;
                    while ( item && item.getType() != "StartMenu" ){ item = item.parentNode; };
                    if ( item ) {
                        item.spread( target );
                    }
                    oldStartMenuItem = target;
                }
            }
            /*--开始菜单行为处理代码结束--*/
            
            
            // 开始菜单项单击
            if ( startMenuItemEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && eWin.dialogStack.length === 0 && target && target.getType() === "StartMenuItem" ) {
                
                    // 执行click事件
                    target.clickEvent();
                    
                    // 阻止事件默认行为
                    var isPreventDefault = target.clickEvent.isPreventDefault
                    if( !isPreventDefault ) {
                    
                        // 菜单收拢
                        var item = oldStartMenuItem;
                        if ( item.parentNode.getType() === "StartChildMenu" ) {
                            var item = oldStartMenuItem;
                            while ( item && item.getType() != "StartMenu" ){ item = item.parentNode; };
                            item.furl( oldStartMenuItem );
                            oldStartMenuItem = null;
                        }
                    } else {
                        target.clickEvent.isPreventDefault = false;
                    }
                }
            }
            
            
            // 确定按钮单击
            if ( confirmButEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target && target.getType() === "ConfirmBut" ) {
                
                    // 执行click单击事件
                    target.clickEvent();            
                    
                    // 阻止事件默认行为
                    var isPreventDefault = target.clickEvent.isPreventDefault
                    if( !isPreventDefault ) {
                        relWin.close();
                    } else {
                        target.clickEvent.isPreventDefault = false;
                    }
                }
            }
            
            
            // 取消按钮单击
            if ( confirmButEnable ) {
                if ( isDomActValid && target && target.getType() === "CancelBut"  && mouseAction === "MOUSEDOWN" && mouseButCode === 0) {
                
                    // 执行click单击事件
                    target.clickEvent();
                    
                    // 阻止事件默认行为
                    var isPreventDefault = target.clickEvent.isPreventDefault
                    if(!isPreventDefault) {
                        relWin.close();
                    } else {
                        target.clickEvent.isPreventDefault = false;
                    }
                }
            }
            
            
            /*--图标拖动处理代码开始--*/
            if ( iconDragEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && !isIconDragReady && target.getType() === "Icon") {
                    isIconDragReady = true;
                    handleIcon = target;
                    
                    // 使能操作
                    closeAllEnable();
                    iconDragEnable = true;                        
                }
                
                if ( mouseAction === "MOUSEMOVE" && (isIconDragReady || isIconDragActioning) ) {
                    if(!isIconDragActioning) {
                    
                        // 执行undrag事件
                        handleIcon.undragEvent();                    
                    }
                    
                    isIconDragReady = false;
                    isIconDragActioning = true;
                    
                    // 执行draging事件
                    handleIcon.dragingEvent();                       
                }
                
                if ( mouseAction === "MOUSEUP" && (isIconDragReady || isIconDragActioning) ) {
                
                    // 复位相关变量
                    isIconDragReady = false;
                    isIconDragActioning = false;
                    
                    // 执行draged事件
                    handleIcon.dragedEvent();
                    
                    handleIcon = null;
                    openAllEnable();
                }
            }
            /*--图标拖动处理代码结束--*/
            
            
            /*--图标滚动处理代码开始--*/
            if ( iconScrollEnable ) {
            
                // 图标滚动准备
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && eWin.dialogStack.length === 0 && !isIconScrollReady && target && target.getType() === "WinSpace" ) {
                    isIconScrollReady = true; 
                    
                    // 使能操作
                    closeAllEnable();
                    iconScrollEnable = true;
                }
                
                // 图标滚动进行
                if ( mouseAction === "MOUSEMOVE" && (isIconScrollReady || isIconScrollActioning) ) {
                        
                        if(!isIconScrollActioning) {
                            
                            // 执行图标滚动默认行为：start
                            dBehaviour.iconsScroll.start( mouseX, mouseY, oldMouseX, oldMouseY );
                        }
                
                        isIconScrollReady = false;
                        isIconScrollActioning = true;
                        
                        // 执行图标滚动默认行为：process
                        dBehaviour.iconsScroll.process( mouseX, mouseY, oldMouseX, oldMouseY );
                }
               
                // 图标滚动结束
                if ( mouseAction === "MOUSEUP" && (isIconScrollReady || isIconScrollActioning) ) {
                
                    // 执行图标滚动默认行为：end
                    dBehaviour.iconsScroll.end( mouseX, mouseY, oldMouseX, oldMouseY );
                    
                    // 复位相应变量
                    isIconScrollReady = false;
                    isIconScrollActioning = false;
                    openAllEnable();
                }
             }
             /*--图标滚动处理代码结束--*/
             
            
            // 图标单击
            if ( iconClickEnable ) {
                if ( (mouseAction === "MOUSEDOWN" && mouseButCode===0) && eWin.dialogStack.length === 0 && target && target.getType() === "Icon" ){
                    
                    // 执行click事件
                    target.clickEvent();
                    
                    if ( (typeof target.winPoint) === "string" ) {
                       var winPoint = eWin.getWin( document.getElementById(target.winPoint || "") );
                       
                       if ( winPoint ) {
                          target.winPoint = winPoint;
                       }
                    } 
                   
                    // 阻止事件默认行为
                    var isPreventDefault = target.clickEvent.isPreventDefault
                    
                    // 深度阻止
                    if ( isPreventDefault != "strong" ) {
                       if ( target.winPoint && (typeof target.winPoint) === "object" ) {
                       
                            // 检索winSpace下的所有主窗体
                            var items = new Array();
                            items = target.winPoint.parentNode.getChildElements();
                            
                            // 对除目标窗体外的所有主窗体进行尺寸恢复
                            for ( var i = 0; i < items.length; i++) {
                                if ( items[i].getType() === "Window" && items[i].state != "min" && items[i].state != "close" && items[i].type != "dialog" && target.winPoint != items[i] ) {
                                    if( items[i].state === "max" ) {
                                        items[i].reset();
                                    } else {
                                        items[i].show();
                                    }
                                }
                            }
                        }
                    }
                    
                    if ( !isPreventDefault ) {
                        
                        if ( target.winPoint && (typeof target.winPoint) === "object" ) {
                        
                            // 执行窗体打开默认行为:action
                            dBehaviour.iconClick.action( target.winPoint );
                        }
                    } else {
                        target.clickEvent.isPreventDefault = false;
                    }
                }
            }
            
            
            /*--窗体菜单项处理代码开始--*/
            if ( menuEnable ) {
                
                // 显示一级菜单
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target.getType() === "MenuItem" && target.parentNode.getType() === "Menu" ) {
                    var item = target
                    while ( item && item.getType() != "Menu" ){ item = item.parentNode; };
                    if ( item ) {
                        item.spread( target );
                        oldMenuItem = target;
                    }
                }
                
                // 隐藏除一级菜单下的所有菜单
                if ( mouseAction === "MOUSEOVER" && target && oldMenuItem && (target.getType() != "MenuItem" && target.getType() != "Menu" && target.getType() != "ChildMenu") ) {
                    var item = oldMenuItem;
                    while ( item && item.getType() != "Menu" ){ item = item.parentNode; };
                    item.furl( oldMenuItem );
                }
                
                // 隐藏子菜单
                if ( mouseAction === "MOUSEOVER" && target && oldMenuItem && target.getType() === "MenuItem" && target.parentNode.parentNode != oldMenuItem ) {
                    var item = oldMenuItem;
                    while ( item && item.getType() != "Menu" ){ item = item.parentNode; };
                    item.furl( oldMenuItem,target.parentNode );
                    oldMenuItem = target;
                }
                
                // 显示子菜单
                if( mouseAction === "MOUSEOVER" && target && target.getType() === "MenuItem" && target.parentNode.getType() != "Menu" ) {
                    var item = oldMenuItem
                    while ( item && item.getType() != "Menu" ){ item = item.parentNode; };
                    if( item ) {
                        item.spread( oldMenuItem );
                        oldMenuItem = target;
                    }
                }
            }
            /*--窗体菜单项处理代码开始--*/
            
            
            // 窗体激活
            if( activaveEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid ) {
                
                    // 执行actitave事件
                    relWin.actitaveEvent();                                    
                    
                    // 阻止事件默认行为
                    var isPreventDefault = relWin.actitaveEvent.isPreventDefault
                    if ( !isPreventDefault ) {
                        
                        // 执行窗体激活默认行为
                        dBehaviour.winActitave.action( relWin );
                    } else {
                        relWin.actitaveEvent.isPreventDefault = false;
                    }
                }
            }
            
            
            // 窗体关闭
            if ( closeAllEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target.getType() === "TitleCloseBut" ) {
                
                    // 执行close事件
                    relWin.closeEvent();                                                   
                    
                    // 阻止窗体关闭默认行为
                    var isPreventDefault = relWin.closeEvent.isPreventDefault;
                    
                    //深度阻止
                    if ( isPreventDefault != "strong" ) {
                        if ( relWin.state === "max" ) {
                        
                            // 检索父元素下的所有窗体
                            var items = new Array();
                            items = relWin.parentNode.getChildElements();
                            
                            // 显示除目标窗体外的所有窗体
                            for ( var i = 0; i < items.length; i++) {
                                 
                                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i] !=  relWin && items[i].type != "dialog" ) {
                                    if(items[i].state === "max") {
                                        items[i].reset();
                                    } else {
                                        items[i].show();
                                    }
                                }
                            }
                        }
                    }
                    
                    if(!isPreventDefault){
                    
                        // 执行关闭窗体默认行为:action[参数timeStep:setInterval触发时间，stepCount：触发：setInterval次数]
                        dBehaviour.winClose.action( relWin );
                    } else {
                        relWin.closeEvent.isPreventDefault = false;
                    }
                    
                    eWin.sizeHandle.hide();
                }
            }
            

            // 窗体最小化
            if( minEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && relWin.state != "min" && target.getType() === "TitleMinBut") {
                
                    // 执行min事件
                    relWin.minEvent();
                    
                    // 阻止窗体最小化默认行为
                    var isPreventDefault = relWin.minEvent.isPreventDefault;
                    
                    //深度阻止
                    if ( isPreventDefault != "strong" ) {                                      
                        
                        // 检索父元素下的所有窗体
                        var items = new Array();
                        items = relWin.parentNode.getChildElements();
                        
                        // 显示除目标窗体外的所有窗体
                        for ( var i = 0; i < items.length; i++) {
                            if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i] !=  relWin && items[i].type != "dialog" ) {
                                if ( items[i].state === "max" ) {
                                    items[i].reset();
                                } else {
                                    items[i].show();
                                }
                            }
                        }
                    }                  
                    
                    if(!isPreventDefault) {
                    
                         // 执行最小化窗体默认行为
                         dBehaviour.winMin.action( relWin );
                    } else {
                        relWin.minEvent.isPreventDefault = false;
                    }  
                    
                    eWin.sizeHandle.hide();
                }
            }
            
            
            // 窗体最大化
            if ( maxEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && relWin.state != "max" && target.getType() === "TitleMaxBut" ) {
                
                    // 执行max事件
                    relWin.maxEvent();                                                  

                    // 阻止窗体最大化默认行为
                    var isPreventDefault = relWin.maxEvent.isPreventDefault;
                    
                    // 深度阻止
                    if ( isPreventDefault != "strong" ) {
                                                     
                        // 检索父对象下的所有主窗体
                        var items = new Array();
                        items = relWin.parentNode.getChildElements();
                       
                        // 对除目标窗体外的所有主窗体进行最大化
                        for ( var i = 0; i < items.length; i++ ) {
                            if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i].type != "dialog" ) {
                                 items[i].hide();
                            }
                        }
                    }
                    
                    // 未被阻止时的行为
                    if(!isPreventDefault) {   
                                                                                      
                        // 最大化窗体行为[参数timeStep:setInterval触发时间，stepCount：触发：setInterval次数]
                        dBehaviour.winMax.action( relWin );
                    } else {
                        relWin.maxEvent.isPreventDefault = false;
                    }
                    
                    eWin.sizeHandle.hide();
                  
                }
            }
            
            
            // 缩略图单击
            if ( thumClickEnable) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && eWin.dialogStack.length === 0 && target && target.getType() === "Thum" ) {
                
                    // 执行click事件
                    target.clickEvent();                                                                            
                    
                    // 查找窗体[并试图将winPoint的值由Id转换成Win对象]
                    if ( (typeof target.winPoint) === "string" ) {
                       var winTagNode = document.getElementById(target.winPoint);
                       if ( winTagNode ) {
                            var win = eWin.getWin(winTagNode);
                            target.winPoint = win;
                       }
                    } 
                    
                    // 阻止事件默认行为
                    var isPreventDefault = target.clickEvent.isPreventDefault;
                    
                    // 深度阻止
                    if ( isPreventDefault != "strong" ) {                                      
                        if ( target.winPoint && (typeof target.winPoint) === "object" ) {
                        
                            // 检索父元素下的所有窗体
                            var items = new Array();
                            items = target.winPoint.parentNode.getChildElements();
                            
                            // 显示除目标窗体外的所有窗体
                            for ( var i = 0; i < items.length; i++ ) {
                                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && target.winPoint != items[i] && items[i].type != "dialog" ) {
                                    if(items[i].state === "max") {
                                        items[i].reset();
                                    } else {
                                         items[i].show();
                                    }
                                }
                            }
                        }
                    }
                    
                    if ( !isPreventDefault ) {  
                       if ( target.winPoint && (typeof target.winPoint) === "object") {
                        
                            // 执行默认行为[参数timeStep:setInterval触发时间，stepCount：触发：setInterval次数]
                            dBehaviour.thumClick.action( target.winPoint );
                       }
                    } else {
                        target.clickEvent.isPreventDefault = false;
                    }
                }
            }
            
            
            // 标题栏双击
            if ( titleDlClickEnable ) {
                if ( mAction === "DBCLICK" && isDomActValid && target.getType() === "TitleBar" ) {
                    
                    // 执行dblClick事件   
                    target.dblClickEvent();                                                 
                    
                    //阻止事件默认行为
                    var isPreventDefault = target.dblClickEvent.isPreventDefault;
                    
                    // 深度阻止
                    if ( isPreventDefault != "strong") {                                      
                    
                        // 检索父元素下的所有窗体
                        var items = new Array();
                        items = relWin.parentNode.getChildElements();
                        
                        if ( relWin.state != "max" ) {
                        
                            // 对除目标窗体外的所有主窗体进行最大化
                            for ( var i = 0; i < items.length; i++ ) {
                                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i].type != "dialog" ) {
                                     items[i].hide();
                                }
                            }
                        } else {
                        
                            // 显示除目标窗体外的所有窗体
                            for ( var i = 0; i < items.length; i++ ) {
                                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i] !=  relWin && items[i].type != "dialog" ) {
                                    if(items[i].state === "max") {
                                        items[i].reset();
                                    } else {
                                        items[i].show();
                                    }
                                }
                            }
                        }
                    }
                    
                    // 未被阻止时的行为
                    if ( !isPreventDefault ) {                                                 
                        // 执行默认行为[参数timeStep:setInterval触发时间，stepCount：触发：setInterval次数]
                        dBehaviour.titleDlClick.action( relWin );
                    } else {
                        target.dblClickEvent.isPreventDefault = false;
                    }
                    
                    eWin.sizeHandle.hide();
                }
            }
            
            
            // 菜单项单击
            if ( menuItemEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target.getType() === "MenuItem") {
                
                      // 执行菜单[click]单击事件
                      target.clickEvent();            
                
                      // 阻止事件默认行为
                      var isPreventDefault = target.clickEvent.isPreventDefault;
                      if ( !isPreventDefault ) {
                      
                          // 检索菜单链并将该链中的每一项都压入menuNodeStack栈中
                          var item = oldMenuItem;
                          if ( item.parentNode.getType() === "ChildMenu" ) {
                              var item = oldMenuItem;
                              while ( item && item.getType() != "Menu") { item = item.parentNode; }
                              item.furl( oldMenuItem );
                              oldMenuItem = null;
                          }    
                     } else {
                        target.clickEvent.isPreventDefault = false;
                     }
                 }
            }
            
            
            // 工具栏按钮单击
            if ( toolItemEnable) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target.getType() === "ToolItem") {
                
                    // 执行工具栏按钮[click]单击事件
                    target.clickEvent();            
                }
            }
            
            
            /*--工具栏拖动处理代码开始--*/
            if ( toolDragEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && !isToolDragReady && target.getType() === "ToolControlBlock" ) {
                    isTagDragReady = true;
                    handleTool = target;
                    
                    // 使能操作
                    closeAllEnable();
                    toolDragEnable = true;                        
                }
                
                if ( mouseAction=="MOUSEMOVE" && (isToolDragReady || isToolDragActioning) ) {
                    if ( !isToolDragActioning ) {
                        
                        // 执行undrag事件
                        handleTool.undragEvent();                    
                    }
                    
                    isToolDragReady = false;
                    isToolDragActioning = true;
                    
                    // 执行draging事件
                    handleTool.dragingEvent();                       
                }
                
                if ( mouseAction === "MOUSEUP" && (isToolDragReady || isToolDragActioning) ) {
                
                    // 复位相关变量
                    isToolDragReady = false;
                    isToolDragActioning = false;
                    
                    // 执行draged事件
                    handleTool.dragedEvent();
                                           
                    handleTool=null;
                    openAllEnable();
                }
            }
            /*--工具栏拖动处理代码结束--*/
            
            
            /*--窗体移动处理代码开始--*/
            if ( moveEnable ) {
                // 移动准备
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && !isMoveReady && isDomActValid && relWin.state != "max" && target.getType() === "TitleBar" ) {
                
                    // 查寻操作窗体
                    handleWin=relWin             
                    isMoveReady = true;         
                    
                    // 对使能进行操作
                    closeAllEnable();
                    moveEnable=true;
                }
                
                // 移动进行
                if ( mouseAction === "MOUSEMOVE" && (isMoveReady || isMoveActioning) ) {
                
                    // 阻止Dom层事件默认行为
                    eventUtil.preventDefault(event);
                    
                    if( !isMoveActioning ) {
                        
                        // 执行窗体unMove事件
                        handleWin.unmoveEvent();
                        
                        // 阻止事件默认行为
                        var isPreventDefault = handleWin.unmoveEvent.isPreventDefault;
                        if(!isPreventDefault) {
                        
                            // 执行默认行为
                            dBehaviour.winMove.start( mouseX, mouseY, oldMouseX, oldMouseY, handleWin );
                        } else {
                            handleWin.unmoveEvent.isPreventDefault=false;
                        }
                    }
                    
                    isMoveActioning=true;
                    isMoveReady=false;
                    
                    handleWin.movingEvent();                                                                                     
                    // 阻止事件默认行为
                    var isPreventDefault = handleWin.movingEvent.isPreventDefault;
                    if(!isPreventDefault) {    
                        
                        // 执行默认行为    
                        dBehaviour.winMove.process( mouseX, mouseY, oldMouseX, oldMouseY, handleWin );                                  
                    } else {
                        handleWin.movingEvent.isPreventDefault=false;
                    }
                }
                
                // 移动结束
                if(mouseAction==="MOUSEUP" && (isMoveReady || isMoveActioning)) {
                
                    // 执行moved事件
                    handleWin.movedEvent();    
                                                                                                      
                    // 阻止事件默认行为
                    var isPreventDefault = handleWin.movedEvent.isPreventDefault;
                    if(!isPreventDefault) {   
                                                                                                        
                        // 执行默认行为
                        dBehaviour.winMove.end( mouseX, mouseY, oldMouseX, oldMouseY, handleWin );                
                    } else {
                        handleWin.movedEvent.isPreventDefault=false;
                    }
                    
                    eWin.sizeHandle.refurbish( handleWin );
                    
                    // 复位与窗体移动相关的变量
                    isMoveReady=false;
                    isMoveActioning=false;
                    handleWin=null;
                    openAllEnable();
                }
            }
            /*--窗体移动处理代码结束--*/
            
            
            /*--窗体尺寸调整代码开始--*/
            if ( sizeEnable ) {
               
               // 计算鼠标位置
               var isMouseOnSizeHandle = false;
               if ( target ) {
                    isMouseOnSizeHandle = target.getType() === "LeftTopHandle" || target.getType() === "LeftBottomHandle" || target.getType() === "RightTopHandle" || target.getType() === "RightBottomHandle" || target.getType() === "LeftHandle" || target.getType() === "RightHandle" || target.getType() === "UpHandle" || target.getType() === "BottomHandle";
               }
               
               // 计算预调整窗体对象
               if ( relWin && !isSizeReady && !isSizeActioning  && !isMouseOnSizeHandle ) {
                    sizeHandleWin = relWin;
               } else {
                    sizeHandleWin = null;
               }
               
               // 隐藏窗体尺寸控制句柄
                if ( target && !isSizeReady && !isSizeActioning  && !isMouseOnSizeHandle && eWin.sizeHandle.handleWin &&  (!sizeHandleWin || sizeHandleWin && sizeHandleWin != eWin.sizeHandle.handleWin) && mouseAction === "MOUSEOVER" ) {
                    if ( eWin.sizeHandle.state != "hide" ) {
                        eWin.sizeHandle.hide();
                        sizeHandleWin = null;
                    }
                }
            
                // 呈现窗体尺寸控制句柄
                if ( isDomActValid && !isSizeReady && !isSizeActioning  && !isMouseOnSizeHandle  && relWin != eWin.sizeHandle.handleWin && mouseAction === "MOUSEOVER" ) {
                    if ( (relWin.state != "max" && relWin.state != "min") ) {
                        eWin.sizeHandle.takeOn( relWin );
                    }
                }

                // 调整准备
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && eWin.dialogStack.length === 0 && target && isMouseOnSizeHandle && eWin.sizeHandle.handleWin){
                    ajsutDirection = target.getType();
                    handleWin = eWin.sizeHandle.handleWin;
                    isSizeReady = true;
                    
                    //使能操作
                    closeAllEnable();
                    sizeEnable=true;
                }
                
                // 调整执行
                if ( mouseAction === "MOUSEMOVE" && handleWin && (isSizeReady || isSizeActioning) ) {
                
                    // 阻止Dom层的事件默认行为
                    eventUtil.preventDefault(event);
                    
                    if(!isSizeActioning) {
                        
                        // 执行窗体unSizeAdjuest事件
                        handleWin.unsizeEvent();
                        
                        // 阻止事件默认行为
                        var isPreventDefault = handleWin.unsizeEvent.isPreventDefault;
                        if(!isPreventDefault) {
                        
                            //执行默认行为
                            dBehaviour.winSizeChange.start( mouseX, mouseY, oldMouseX, oldMouseY, ajsutDirection, handleWin );
                        } else {
                            handleWin.unsizeEvent.isPreventDefault = false;
                        }
                    }
                    
                    isSizeActioning=true;
                    isSizeReady=false;
                    
                    // 执行窗体sizing事件
                    handleWin.sizeingEvent();        
                    
                    var isPreventDefault = handleWin.sizeingEvent.isPreventDefault;
                    if(!isPreventDefault) {
                    
                        // 执行默认行为
                        dBehaviour.winSizeChange.process( mouseX, mouseY, oldMouseX, oldMouseY, ajsutDirection, handleWin );
                    } else {
                        handleWin.sizeingEvent.isPreventDefault = false;
                    }
                    
                }
                
                if( mouseAction === "MOUSEUP" && handleWin && (isSizeReady || isSizeActioning) ) {
                
                    // 执行窗体sizeed事件
                    handleWin.sizeedEvent(); 
                                                            
                    var isPreventDefault = handleWin.sizeedEvent.isPreventDefault;
                    if ( !isPreventDefault ) {
                    
                        // 执行默认行为
                        dBehaviour.winSizeChange.end( mouseX, mouseY, oldMouseX, oldMouseY, ajsutDirection, handleWin );
                    } else {
                        handleWin.sizeedEvent.isPreventDefault = false;
                    }
                    eWin.sizeHandle.hide();
                    
                    // 复位与窗体大小调整相关的变量
                    isSizeReady=false;
                    isSizeActioning=false;
                    ajsutDirection="";
                    handleWin=null;
                    sizeHandleWin = null;
                    openAllEnable();
                }
                
            }
            /*--窗体尺寸调整代码结束--*/
            
            
            
            // 激活标签
            if ( tagActivaveEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target.getType() === "Tag") {
                   
                    var tabControl =  target.parentNode.parentNode;
                    
                    if ( tabControl && tabControl.getType() === "TabControl" ){
                        
                        // 执行tagAct事件
                        tabControl.tagActEvent();
                        
                        // 阻止事件默认行为
                        var isPreventDefault = tabControl.tagActEvent.isPreventDefault;
                        if ( !isPreventDefault ) {
                            
                            // 执行默认行为
                            dBehaviour.tagActitave.action( target )  
                        } else {
                            headleTag.tagActEvent.isPreventDefault = false;
                        }          
                    }
                }
            }
            
            
            // 标签关闭
            if ( tagCloseEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target.getType() === "TabCloseBut" ) {
                    var tabControl = target.parentNode.parentNode;
                    if ( tabControl && tabControl.getType() === "TabControl" ) {
                    
                        // 执行closeAct事件
                        tabControl.closeActEvent();                              
                        
                        // 阻止事件默认行为
                        var isPreventDefault = tabControl.closeActEvent.isPreventDefault;
                        if(!isPreventDefault) {
                            
                            // 执行默认行为
                            dBehaviour.closeActTag.action( target )
                        } else {
                            tabControl.closeActEvent.isPreventDefault = false;
                        }
                    }
                }
            }
            
            
            /*--标签拖动处理代码开始--*/
            if ( tagDragEnable ) {
                // 拖动准备
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && !isTagDragReady && target.getType() === "Tag") {
                    isTagDragReady = true;
                    headleTag = target;
                    
                    //使能操作
                    closeAllEnable();
                    tagDragEnable=true;
                }
                
                // 执行拖动行为
                if ( mouseAction === "MOUSEMOVE" && (isTagDragReady || isTagDragActioning) ) {
                
                    eventUtil.preventDefault(event);
                    
                    if ( !isTagDragActioning ) {
                    
                        // 执行undrag事件
                        headleTag.undragEvent();   
                        
                        // 阻止事件默认行为
                        var isPreventDefault = headleTag.undragEvent.isPreventDefault;
                        if ( !isPreventDefault ) {
                        
                            // 执行默认行为
                            dBehaviour.tagDrag.start(  mouseX, mouseX, oldMouseX, oldMouseY, headleTag );
                        } else {
                            headleTag.undragEvent.isPreventDefault = false;
                        }                
                    }
                    isTagDragReady=false;
                    isTagDragActioning=true;
                    
                     // 执行draging事件
                    headleTag.dragingEvent();  
                    
                    // 阻止事件默认行为                    
                    var isPreventDefault = headleTag.dragingEvent.isPreventDefault;
                    if(!isPreventDefault) {
                    
                        // 执行默认行为
                        dBehaviour.tagDrag.process( mouseX, mouseX, oldMouseX, oldMouseY, headleTag );
                    } else {
                        headleTag.dragingEvent.isPreventDefault = false;
                    }
                }
                
                // 拖动结束处理
                if ( mouseAction === "MOUSEUP" && (isTagDragReady || isTagDragActioning) ) {
                
                    // 执行draged事件
                    headleTag.dragedEvent();   
                    
                    // 阻止事件默认行为                     
                    var isPreventDefault = headleTag.dragedEvent.isPreventDefault;
                    if(!isPreventDefault) {
                    
                        // 执行默认行为
                        dBehaviour.tagDrag.end(  mouseX, mouseX, oldMouseX, oldMouseY, headleTag );
                     } else {
                         headleTag.dragedEvent.isPreventDefault = false;
                     }
                     
                     // 复位相应的变量
                     isTagDragReady = false;
                     isTagDragActioning = false;
                     headleTag = null;
                     
                     // 打开所有使能
                     openAllEnable();
                    
                }
            }
            /*--标签拖动处理代码结束--*/
            
            
            /*--框架处理代码开始--*/
            if ( splitSizeEnable ) {
            
                // 调整准备
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && !isSplitSizeReady && target && target.getType() === "SpaceBar" ) {
                   
                    eventUtil.preventDefault(event);
                    isSplitSizeReady = true;                               
                    handleSplit = target.parentNode;
                    closeAllEnable();
                    splitSizeEnable = true;
                }
                
                //调整进行
                if ( mouseAction === "MOUSEMOVE" && (isSplitSizeReady || isSplitSizeActioning) ) {
                    
                    eventUtil.preventDefault(event); 
                    
                    if ( !isSplitSizeActioning ) {
                    
                        //执行unadjust事件
                        handleSplit.unadjustEvent();                   
                        
                        // 阻止事件默认行为
                        var isPreventDefault = handleSplit.unadjustEvent.isPreventDefault;
                        if ( !isPreventDefault ) {
                        
                            // 执行默认行为
                            dBehaviour.SplitSpaceBarDarg.start( mouseX, mouseY, oldMouseX, oldMouseY, handleSplit );
                        } else {
                            handleSplit.unadjustEvent.isPreventDefault = false;
                        }
                        
                    }
                    
                    isSizeReady=false;
                    isSplitSizeActioning=true;
                    
                    //执行draging事件
                    handleSplit.adjustingEvent();                                                           
                    
                    // 阻止事件默认行为
                    var isPreventDefault = handleSplit.adjustingEvent.isPreventDefault;
                    if ( !isPreventDefault ) {
                    
                       // 执行默认行为
                       dBehaviour.SplitSpaceBarDarg.process( mouseX, mouseY, oldMouseX, oldMouseY, handleSplit );
                    } else {
                        handleSplit.spaceBar.adjustingEvent.isPreventDefault = false;
                    }
                }
                
                // 调整结束
                if ( mouseAction === "MOUSEUP" && (isSplitSizeReady || isSplitSizeActioning) ) {
                    
                    // 执行draged事件
                    handleSplit.adjustedEvent()  
                    
                    // 阻止事件默认行为                                                            
                    var isPreventDefault = handleSplit.adjustedEvent.isPreventDefault;
                    if(!isPreventDefault) {
                    
                        // 执行默认行为
                        dBehaviour.SplitSpaceBarDarg.end( mouseX, mouseY, oldMouseX, oldMouseY, handleSplit );
                    } else {
                        handleSplit.adjustedEvent.isPreventDefault = false;
                    }
                
                    // 复位与窗体移动相关的变量
                    isSplitSizeReady = false;
                    isSplitSizeActioning = false;
                    handleSplit = null;
                    openAllEnable();
                }
            }
            /*--框架处理代码结束--*/
            
            
            /*--通用控件处理代码开始--*/
            if ( commonClickEnable ) {
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && target.getType() === "Common" ) {
                
                    // 执行click事件
                    target.clickEvent();
                }
            }
            
            if ( commonDragEnable ) {
            
                // 拖动准备
                if ( mouseAction === "MOUSEDOWN" && mouseButCode === 0 && isDomActValid && !isCommonDragReady && target.getType() === "Common" ) {
                    isCommonDragReady = true;
                    handleCommon = target;
                    
                    //使能操作
                    closeAllEnable();
                    cancelButEnable = true;
                }
                
                // 执行拖动行为
                if ( mouseAction === "MOUSEMOVE" && (isCommonDragReady || isCommonDragActioning) ) {
                
                    eventUtil.preventDefault(event);
                    
                    if ( !isCommonDragActioning ) {
                    
                        // 执行undrag事件
                        handleCommon.undragEvent();   
                    }
                    isCommonDragReady = false;
                    isCommonDragActioning = true;
                    
                     // 执行draging事件
                    handleCommon.dragingEvent();  
                }
                
                // 拖动结束处理
                if ( mouseAction === "MOUSEUP" && (isCommonDragReady || isCommonDragActioning) ) {
                
                    // 执行draged事件
                    handleCommon.dragedEvent();   
                    
                     // 复位相应的变量
                     isCommonDragReady = false;
                     isCommonDragActioning = false;
                     handleCommon = null;
                     
                     // 打开所有使能
                     openAllEnable();
                }
            }
            
            /*--通用控件处理代码结束--*/
            
            
            // 记录鼠标初始坐标
            oldMouseX = mouse.getPointerClientX(event);
            oldMouseY = mouse.getPointerClientY(event);
         }
    }
   
    JPM.nameSpace(
        "EWin",
        
        "actionParse",actionParse
    )
} )();