/*--
    本文件主要用于定义eWin对象
        公有：
            属性：
                desktop                                             桌面
                actWin                                              当前活动窗体
            方法：
                addItem:addItem                                     向元素索引表内添加元素
                getItem                                             获取元素
                removeElement:removeElement                         从元素索引表内移除元素
                getWin                                              按节点获取Win对象
                getElement                                          按节点获取元素
                createDesktop                                       创建桌面元素方法
                checkElementStyleClass                              检查元素样式类是否存在方法
                main                                                eWin入口方法
        私有：
            类：
                SizeHandle                                          定义尺寸操作句柄类
            属性：
                element                                             元素集合[本质是eWin元素索引表，用于方便对eWin中的元素进行检索]
--*/
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid,List") );
    eval( JPM.spaceUsing("EWin.Entity", "Desktop") );
    eval( JPM.spaceUsing("Web", "css") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "elementParse") );
    
    
    
    
    /*
        定义尺寸操作句柄类[私有]
            方法：
              refurbish     刷新方法
              hide          隐藏方法
              takeOn        呈现方法
     */
    function SizeHandle() {
        
        // 定义向上调整句柄类
        function UpHandle(){
            this.tagNode = document.createElement( "upHandle" );
            this.getType = function() {
                return "UpHandle";
            }
            
            this.tagNode.style.cssText = "z-index:1000000000000;height:10px;position:absolute;cursor:s-resize;";
            
            // 设置索引键indexguid
            var indexGuid = guid.build();
            this.tagNode.setAttribute( "data-ewin-indexguid", indexGuid );
            elements.add( indexGuid, this );
        }
        
        // 定义向下调整句柄类
        function BottomHandle() {
            this.tagNode = document.createElement( "buttomHandle" );
            this.getType = function() {
                return "BottomHandle";
            }
            
            this.tagNode.style.cssText = "z-index:1000000000000;height:10px;position:absolute;cursor:s-resize;";
            
            // 设置索引键indexguid
            var indexGuid = guid.build();
            this.tagNode.setAttribute( "data-ewin-indexguid", indexGuid );
            elements.add( indexGuid, this );
        }
        
        // 定义向左调整句柄类
        function LeftHandle() {
            this.tagNode = document.createElement( "leftHandle" );
            this.getType = function() {
                return "LeftHandle";
            }

            this.tagNode.style.cssText = "z-index:1000000000000;width:10px;position:absolute;cursor:w-resize;";

            // 设置索引键indexguid
            var indexGuid = guid.build();
            this.tagNode.setAttribute( "data-ewin-indexguid", indexGuid );
            elements.add( indexGuid, this );
        }
        
        // 定义向右调整句柄类
        function RightHandle() {
            this.tagNode = document.createElement( "rightHandle" );
            this.getType=function() {
                return "RightHandle";
            }
            
            this.tagNode.style.cssText = "z-index:1000000000000;width:10px;position:absolute;cursor:w-resize;";

            //设置索引键indexguid
            var indexGuid=guid.build();
            this.tagNode.setAttribute("data-ewin-indexguid",indexGuid);
            elements.add(indexGuid,this);
        }
        
        // 定义左上调整句柄类
        function LeftTopHandle() {
            this.tagNode = document.createElement( "leftTopHandle" );
            this.getType=function() {
                return "LeftTopHandle";
            }
            
            this.tagNode.style.cssText = "z-index:1000000000000;position:absolute;width:10px;height:10px;cursor:se-resize;";
            
            // 设置索引键indexguid
            var indexGuid = guid.build();
            this.tagNode.setAttribute( "data-ewin-indexguid", indexGuid );
            elements.add( indexGuid, this );
        }
        
        // 定义左下调整句柄类
        function LeftBottomHandle() {
            this.tagNode = document.createElement( "leftBottomHandle" );
            this.getType = function() {
                return "LeftBottomHandle";
            }
            
            this.tagNode.style.cssText = "z-index:1000000000000;position:absolute;width:10px;height:10px;cursor:ne-resize;";
            
            //设置索引键indexguid
            var indexGuid = guid.build();
            this.tagNode.setAttribute( "data-ewin-indexguid", indexGuid );
            elements.add( indexGuid, this );
        }
        
        // 定义右上调整句柄类
        function RightTopHandle() {
            this.tagNode = document.createElement( "rightTopHandle" );
            this.getType = function() {
                return "RightTopHandle";
            }
            
            this.tagNode.style.cssText = "z-index:1000000000000;position:absolute;width:10px;height:10px;cursor:ne-resize;";
            
            //设置索引键indexguid
            var indexGuid = guid.build();
            this.tagNode.setAttribute( "data-ewin-indexguid", indexGuid );
            elements.add( indexGuid, this );
        }
        
        // 定义右下调整句柄类
        function RightBottomHandle() {
            this.tagNode = document.createElement( "rightBottomHandle" );
            this.getType=function() {
                return "RightBottomHandle";
            }
            
            this.tagNode.style.cssText = "z-index:1000000000000;position:absolute;width:10px;height:10px;cursor:se-resize;";
            
            // 设置索引键indexguid
            var indexGuid = guid.build();
            this.tagNode.setAttribute( "data-ewin-indexguid", indexGuid );
            elements.add( indexGuid, this );
        }
        
        // 创建SizeHandle类的Dom节点及该节点的结束
        this.leftTopHandle = new LeftTopHandle();
        this.UpHandle = new UpHandle();
        this.RightTopHandle = new RightTopHandle();
        this.LeftHandle = new LeftHandle();
        this.RightHandle = new RightHandle();
        this.LeftBottomHandle = new LeftBottomHandle();
        this.BottomHandle = new BottomHandle();
        this.RightBottomHandle = new RightBottomHandle();

        this.state = "hide";
        this.handleWin = null;
        
        // 获取类型
        this.getType=function() {
            return "SizeHandle";
        }
        
        // 刷新方法
        this.refurbish = function( win ) {
              if ( win.tagNode.style.display == "block") {
                    var sizeHandleLeft = win.tagNode.offsetLeft-5;
                    var sizeHandleTop = win.tagNode.offsetTop-5;
                    var sizeHandleWidth = win.tagNode.offsetWidth + 10;
                    var sizeHandleHeight = win.tagNode.offsetHeight + 10;
                    this.leftTopHandle.tagNode.style.left = sizeHandleLeft+"px";
                    this.leftTopHandle.tagNode.style.top = sizeHandleTop+"px";
                    this.UpHandle.tagNode.style.left = (sizeHandleLeft+10)+"px";
                    this.UpHandle.tagNode.style.top = (sizeHandleTop)+"px";
                    this.UpHandle.tagNode.style.width = (sizeHandleWidth-20)+"px";
                    this.RightTopHandle.tagNode.style.left = (sizeHandleLeft+sizeHandleWidth-10)+"px";
                    this.RightTopHandle.tagNode.style.top = sizeHandleTop+"px";
                    this.LeftHandle.tagNode.style.left = sizeHandleLeft+"px";
                    this.LeftHandle.tagNode.style.top = (sizeHandleTop+10)+"px";
                    this.LeftHandle.tagNode.style.height = (sizeHandleHeight-20)+"px";
                    this.LeftBottomHandle.tagNode.style.left = sizeHandleLeft+"px";
                    this.LeftBottomHandle.tagNode.style.top = (sizeHandleTop+sizeHandleHeight-10)+"px";
                    this.BottomHandle.tagNode.style.left = (sizeHandleLeft+10)+"px";
                    this.BottomHandle.tagNode.style.top = (sizeHandleTop+sizeHandleHeight-10)+"px";
                    this.BottomHandle.tagNode.style.width = (sizeHandleWidth-20)+"px";
                    this.RightBottomHandle.tagNode.style.left = (sizeHandleLeft+sizeHandleWidth-10) +"px";
                    this.RightBottomHandle.tagNode.style.top = (sizeHandleTop+sizeHandleHeight-10)+"px";
                    this.RightHandle.tagNode.style.left = (sizeHandleLeft+sizeHandleWidth-10) +"px";
                    this.RightHandle.tagNode.style.top = (sizeHandleTop+10)+"px";
                    this.RightHandle.tagNode.style.height =(sizeHandleHeight-20)+"px"; 
                    this.leftTopHandle.tagNode.style.visibility = "visible";
                    this.UpHandle.tagNode.style.visibility = "visible";
                    this.RightTopHandle.tagNode.style.visibility = "visible";;
                    this.LeftHandle.tagNode.style.visibility = "visible";
                    this.RightHandle.tagNode.style.visibility = "visible";
                    this.LeftBottomHandle.tagNode.style.visibility = "visible";
                    this.BottomHandle.tagNode.style.visibility = "visible";
                    this.RightBottomHandle.tagNode.style.visibility = "visible";
                }
        }
        
        // 隐藏方法
        this.hide = function() {
            if ( this.state != "hide" ){
                this.leftTopHandle.tagNode.style.visibility = "hidden";
                this.UpHandle.tagNode.style.visibility = "hidden";
                this.RightTopHandle.tagNode.style.visibility = "hidden";;
                this.LeftHandle.tagNode.style.visibility = "hidden";
                this.RightHandle.tagNode.style.visibility = "hidden";
                this.LeftBottomHandle.tagNode.style.visibility = "hidden";
                this.BottomHandle.tagNode.style.visibility = "hidden";
                this.RightBottomHandle.tagNode.style.visibility = "hidden";
                this.state="hide";
                this.handleWin = null;
            }
        }
       
        
        // 呈现方法
        this.takeOn = function ( win ) {
            this.state="show";
            this.handleWin = win;
            try {
                win.parentNode.tagNode.appendChild(this.leftTopHandle.tagNode);
                win.parentNode.tagNode.appendChild(this.UpHandle.tagNode);
                win.parentNode.tagNode.appendChild(this.RightTopHandle.tagNode);
                win.parentNode.tagNode.appendChild(this.LeftHandle.tagNode);
                win.parentNode.tagNode.appendChild(this.RightHandle.tagNode);
                win.parentNode.tagNode.appendChild(this.LeftBottomHandle.tagNode);
                win.parentNode.tagNode.appendChild(this.BottomHandle.tagNode);
                win.parentNode.tagNode.appendChild(this.RightBottomHandle.tagNode);
            } catch (e) {
                ;
            }
            
            this.refurbish( win );
        }
    }  
    
    
    // 元素集合[私有][本质是eWin元素索引表]
    var elements = new List();   
                                       
    
    // 添加元素
    function addItem( attribute, item ) {
        elements.add( attribute, item );
    }
    
    
    // 获取元素
    function getItem( attribute ) {
        return elements[attribute];
    }
    
    // 创建桌面
    function createDesktop ( node, relDomNode ) {
        
        if ( (typeof node) === "string" ) {
            var desktopString = node;        
            var documentFragment = XMLDom.xmlStringToHTMLDom( desktopString );
        } else if( !eWin.desktop && node.nodeType && node.nodeType === 1 ) {
            relDomNode.appendChild( node );
            elementParse.start();
        } else if( eWin.desktop ) {
            alert( "eWin中已经存在有Desktop元素!");
        }
    }
    
    // 移除元素
    function removeItem( item ) {
        elements.remove( item );
    }
    
    
    // 按节点获取元素[公有]
    function getElement( node ){
    
        if( !node ) {
            return null;
        }
        var nodeHTML = node;
        
        if ( node.tagNode && node.tagNode.getAttribute("data-ewin-indexguid") ) {
        
            // 这里不对他直接返回而将其赋给nodeHTML变量进行继续查找的原因是：有可能这个EWin元素节点在系统中已被删除
            nodeHTML = node.tagNode;
        }
        
        // 节点查找
        var result=null;
        while( !nodeHTML.getAttribute("data-ewin-indexguid") ){
            nodeHTML = nodeHTML.parentNode;
        }
        
        // 从elements集合中索引出对应的EWin元素
        var indexGuid = nodeHTML.getAttribute( "data-ewin-indexguid" );
        if( indexGuid ){
            result = elements[indexGuid];
        }
        return result;
    }
    
    
    // 按节点获取Win元素
    function getWin( node ) {
    
        if( !node ) {
            return null;
        }
        var nodeHTML = node;
    
        var element = getElement( node );
        
        while ( element && element.getType() !=  "Window" ) {
            element = element.parentNode;
        }
        
        return element;
    }
    
    
    // 检查元素样式类方法[如果代入样式名className在nodeHTML节点中存在则返回true，反之返回false]
    function checkElementStyleClass( className, nodeHTML ) {
        var test = false;
        var styleClassStr = nodeHTML.getAttribute( "class" );
        if ( styleClassStr ) {
            var styleClasses = styleClassStr.split(" ");
            for ( var i = 0; i < styleClasses.length; i++ ) {
                if ( className === styleClasses[i] ) {
                    test = true;
                    break;
                }
            }
        }
        return test;
    }

    
    // animation对象定义[动画对象]
    var animation = {
        
        // 水平移动演员方法[参数：performers 演员集合， offsetX 水平偏移量， offsetY 垂直偏移量， timeStep触发时间间隔，deputes委托集合，speed 速度]
        levelMove: function ( performers, offsetX, offsetY, timeStep, deputes ,speed ) {
                        
                        // offsetXCount 水平偏移量累计
                        // cycleCount   周期数累计
                        var offsetXCount = 0;
                        var cycleCount = 0;
                        
                        // 动画过程
                        function perform() {
                        
                            // 计算当前偏移累计量
                            ++cycleCount;
                            if ( speed ) {
                                offsetXCount = offsetXCount + cycleCount *  parseInt( speed * cycleCount );             
                            } else {
                                ++offsetXCount;
                            }  
                            
                            // 动画出口点
                            if ( offsetXCount > Math.abs(offsetX) ) {
                            
                                // 终止动画
                                window.clearInterval( performId );  
                                
                                // 执行传入的委托
                                for (var i = 0; i < deputes.length; i++) {
                                    deputes[i]();
                                }                         
                            }
                           
                            // 对演员进行偏移
                            for ( var i = 0; i < performers.length; i++ ) {
                            
                                if ( offsetXCount <= Math.abs(offsetX) ) {
                                    if ( speed ) {
                                        performers[i].style.left = ( parseInt(performers[i].style.left.replace("px", "")) + offsetX/Math.abs(offsetX) * cycleCount *  parseInt(speed * cycleCount) ) + "px";
                                    } else {
                                        performers[i].style.left = ( parseInt(performers[i].style.left.replace("px", "")) + offsetX/Math.abs(offsetX) ) + "px";
                                    }
                                }
                            }
                        }
                        
                        //启动动画效果
                        var performId = window.setInterval(perform,timeStep);              
                    },
        
        // 演员伸缩方法[ 参数：performer 演员，startPoint 起始点，endPoint 结束点，startSize 起始尺寸，endSize 结束尺寸，deputes 委托集合]
        flex: function ( performer, startPoint, endPoint, offsetPercent, startSize, endSize, frameCount, timeStep, deputes) {
                    var oldTriggerTime = null;
                    var oldCycleTime = timeStep;
        
                    // 计算动画路径斜率k及常量c[动画路径是 y = k * x + c 的一条直线]
                    var k = ( startPoint.Y-endPoint.Y ) / ( startPoint.X - endPoint.X );        
                    var c = startPoint.Y - k*startPoint.X;
                    
                    // leftInc    X坐标增量
                    // widthInc   宽度增量
                    // heightInc  高度增量
                    // opacityInc 透明度增量
                    var leftInc = ( endPoint.X - startPoint.X ) / frameCount;
                    var widthInc = ( endSize.width - startSize.width ) / frameCount;
                    var heightInc = ( endSize.height - startSize.height ) / frameCount;
                    var opacityInc = parseFloat( 30 / endPoint.X);
                    
                    // 设置演员的起启尺寸及坐标
                    performer.style.left = ( startPoint.X - width * offsetPercent.X ) + "px";
                    performer.style.top = ( startPoint.Y - height*offsetPercent.Y ) + "px";
                    performer.style.width = startSize.width + "px";
                    performer.style.height = startSize.height + "px";
                    performer.style.filter = 'alpha(opacity=0)';
                    performer.style.opacity = 0;
                    
                    // 定义与演员动画过程相关的变量
                    var left = startPoint.X;
                    var top = startPoint.Y ;
                    var width = startSize.width;
                    var height = startSize.height;
                    var opacity = 0; 
                    var frameNum = 0;
                    
                    var sumCycleTime = 0;
                    
                    // 表演
                    function perform() {
                    
                        if ( !oldTriggerTime ) {
                            var date = new Date();
                            oldTriggerTime = date.getTime();
                        } else {
                                var date = new Date();
                                var currentTime = date.getTime();
                                var cycleTime = parseFloat(date.getTime()) - parseFloat( oldTriggerTime ) ;
                                if( ((frameCount - 1) * oldCycleTime / cycleTime) != Number.NEGATIVE_INFINITY && ((frameCount - 1) * oldCycleTime / cycleTime) != Number.POSITIVE_INFINITY ) {
                                    timeStep = cycleTime;
                                    frameCount = (frameCount - 1) * oldCycleTime / cycleTime
                                    leftInc = ( endPoint.X - left ) / frameCount;
                                    widthInc = ( endSize.width - width ) / frameCount;
                                    heightInc = ( endSize.height - height ) / frameCount;
                                    oldCycleTime = cycleTime;
                                } 
                                
                                oldTriggerTime = currentTime;
                        }
                    
                        // 计算当前演员的位置及尺寸
                        left = left + leftInc;
                        top = left * k + c;
                        width = width + widthInc;
                        height = height + heightInc;
                        opacity = left * opacityInc;
                        
                        ++frameNum
                        
                        if( frameNum > frameCount ) {
                            
                            // 执行传入的委托
                            for( var i = 0 ;i < deputes.length; i++) {
                                deputes[i]();
                            }
                            
                            // 散场
                            window.clearInterval(performId);                           
                            
                            // 杀死演员
                            performer.parentNode.removeChild( performer );
                            
                            return false;                                                    
                        }
                        
                        //设置透明度
                        performer.style.filter = 'alpha(opacity='+opacity+')';
                        performer.style.opacity = opacity/100;
                        
                        //设置演员当前尺寸及位置
                        performer.style.left = ( left-width*offsetPercent.X ) + "px";
                        performer.style.top = ( top-height*offsetPercent.Y ) + "px";
                        performer.style.width = width + "px";
                        performer.style.height = height + "px";
                    }
                    
                    // 开场
                    var performId = window.setInterval( perform, timeStep ); 
                }
    }

    // 定义eWinUI
    var eWin = {
        desktop: null,
        actWin: null,
        dialogStack: new Array(),
        addItem: addItem,
        getItem: getItem,
        removeItem: removeItem,
        getWin: getWin,
        getElement: getElement,
        createDesktop: createDesktop, 
        checkElementStyleClass: checkElementStyleClass,
        sizeHandle: new SizeHandle(),
        animation: animation                                        
    }
    
    
    // EWin入口点
    function main() {
       // 启动静态解析
       elementParse.start();
    }
    
    
    // 定义eWin对象及main方法
    JPM.nameSpace(
        "EWin",
        "main", main, "eWin", eWin
    )
} )();