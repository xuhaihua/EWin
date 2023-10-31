 /** 
    * 本文件用于定义Window实体,该实体继承自EWin.Entity.Base.Element
        * 所属名称空间： EWin.Entity
        * 属性：
            * tagNode;   元素dom节点
            * titleBar   标题栏
            * toolArea   工具栏区域
            * menu       菜单栏
            * workSpace  工作区域
            * state      窗体状态[normal|max|min|close]
            * type       窗体类型[window|dialog]
            * closeMode  关闭方式[值为hidden是只是简单的隐藏,值为destroy是销毁
            * wFlex      宽度伸缩[默认值：true]
            * hFlex      高度伸缩[默认值：true]
            * thumPoint  缩略图指针
            * childType  允许的子类型
        * 方法：
            * baseAddElement           引用基类addElement方法
            * baseRemoveElement        引用基类removeElement方法
            * addElement;              添加项[重写基类方法]
            * removeElement;           移除项[重写基类方法]
            * format     规格
            * getType    获取类型
            * actitave   激活
            * min        最小化方法
            * max        最大化方法
            * open       打开方法
            * close      关闭方法
            * saveSize   保存窗体尺寸
            * reset      恢复窗体
            * move       移动方法
            * widthFlex  宽度伸缩
            * heightFlex 高度伸缩
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid,List") );
    eval( JPM.spaceUsing("Web", "css") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base","Element") ); 
    eval( JPM.spaceUsing("EWin.Entity", "Window") );            
    eval( JPM.spaceUsing("EWin.Entity.Win", "TitleBar,ToolArea,Menu,WorkSpace") ); 
    eval( JPM.spaceUsing("EWin.Event", "WindowEvent") );
    eval( JPM.spaceUsing("EWin", "IWindow") );
    
    
    
    /*--重写基类方法开始--*/
    // 添加项
    function addElement( item ){
        var result = null;
        if ( item.getType() === "TitleBar" && !this.titleBar ){
             result = this.baseAddElement( item );
             this.titleBar = result;
        } else {
             alert( "TitleBar类型添加失败" );
        }
        
        if ( item.getType() === "Menu" && !this.menu ){
             result = this.baseAddElement( item );
             this.menu = result;
        } else {
             alert( "Menu类型添加失败" );
        }
        
        if ( item.getType() === "ToolArea" && !this.toolArea ){
             result = this.baseAddElement( item );
             this.toolArea = result;
        } else {
             alert( "ToolArea类型添加失败" );
        }
        
        if ( item.getType() === "WorkSpace" && !this.workSpace ){
             result = this.baseAddElement( item );
             this.workSpace = result;
        } else {
             alert( "WorkSpace类型添加失败" );
        }
        
        if( item.getType() != "TitleBar" && item.getType() != "Menu" && item.getType() != "ToolArea" && item.getType() != "WorkSpace" ) {
            return this.baseAddElement( item );
        }
        
        return result;
    }

    // 移除项
    function removeElement( item ) {
        if ( this.titleBar && this.titleBar == item && item.getType() === "TitleBar" ) {
            this.titleBar = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "TitleBar类型移除失败" );
            return null;
        }
        
        if ( this.menu && this.menu == item && item.getType() === "Menu" ) {
            this.menu = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "Menu类型移除失败" );
            return null;
        }
        
        if ( this.toolArea && this.toolArea == item && item.getType() === "ToolArea" ) {
            this.toolArea = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "ToolArea类型移除失败" );
            return null;
        }
        
        if ( this.workSpace && this.workSpace == item && item.getType() === "WorkSpace" ) {
            this.workSpace = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "WorkSpace类型移除失败" );
            return null;
        }
        
        if( item.getType() != "TitleBar" && item.getType() != "Menu" && item.getType() != "ToolArea" && item.getType() != "WorkSpace" ) {
            return this.baseRemoveElement( item );
        }
        
    }
    /*--重写基类方法--*/
    
    
    // 规格
    function format() {
        var errString = "";
        
        // 获取最小尺寸
        var minWidth = this.tagNode.getAttribute("data-ewin-minWidth") || this.tagNode.getAttribute( "minWidth" );
        if ( minWidth != null && !isNaN(parseInt(minWidth)) ) {
            this.minWidth = minWidth;
        }
        var minHeight = this.tagNode.getAttribute("data-ewin-minHeight") ||  this.tagNode.getAttribute( "minHeight" );
        if ( minHeight != null && !isNaN(parseInt(minHeight)) ) {
            this.minHeight = minHeight;
        }
        
        // 对伸缩属性进行设置
        if (  this.tagNode.getAttribute("wflex") === "false" || this.tagNode.getAttribute("data-ewin-wflex") === "false" ){
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
        
        // 获取和设置窗体元素的尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute( "data-ewin-width" ) || this.tagNode.getAttribute( "width" );
            if( width === null || isNaN(parseInt(width)) ) {
                this.setWidth( HTMLDom.getNodeWidth( this.tagNode ) );
            } else {
                this.setWidth( parseInt(width) );
            }
        }
        if ( this.hFlex ) {
            var height = this.tagNode.getAttribute("data-ewin-height") || this.tagNode.getAttribute("height");
            if(  height === null || isNaN(parseInt(height)) ) {
                this.setHeight( HTMLDom.getNodeHeight( this.tagNode ) );
            } else {
                this.setHeight( parseInt(height) );
            }
        }
        
        // 获取和设置窗体元素的状态
        var state = this.tagNode.getAttribute("data-ewin-state") || this.tagNode.getAttribute("state");
        if ( state === "normal" || state === "max" || state === "min" || state === "close" ) {
            this.state = state;
        }
        
        // 获取和设置窗体的类型[window|dialog]
        var type = this.tagNode.getAttribute("data-ewin-type") || this.tagNode.getAttribute("type");
        if ( type === "window" || type === "dialog" ) {
            this.type = type;
        }
        
        // 获取和设置窗体缩略图的指针[并试图将thumpoint的值由Id转换成Win对象]
        var thumId = this.tagNode.getAttribute("data-ewin-thumPoint") || this.tagNode.getAttribute("thumPoint") || "";
        if ( thumId ) {
            this.thumPoint = thumId;
            
            var thum = eWin.getElement( document.getElementById(thumId) );
            if( thum ) {
                this.thumPoint = thum;
                this.thumPoint.winPoint = this;
            }
        }
        
        return errString;
    }
    
    
    // 快速获取类型
    function getType() {
        return "Window";
    }
    
    
    // 窗体激活[将窗体置于最顶层]
    function actitave() {
    
        // winChainStack 窗体链栈
        // handleWin     处理窗体
        var winChainStack = new Array();
        var handleWin = this;
       
        if ( this != eWin.actWin ) {
            
            // 按嵌套次序将窗体链中的每个窗体压入winChainStack中
            var win = handleWin;
            while ( win ) {
                winChainStack.push( win );
                var nodeHTML = win.tagNode.parentNode;
                win = eWin.getWin( nodeHTML );
            }
            
            // 依次弹出winChainStack中的窗体并为其重新设置堆叠次序值
            while ( winChainStack.length > 0 ) {
                var win = winChainStack.pop();
                
                // 获取处理窗体所在层内的所有子窗体
                wins = win.parentNode.getChildElements();
                
                // sortArr      一个临时的排序数组
                // zIndexWin    普通窗体堆叠次序
                // zIndexDialog 对话框堆叠次序
                var sortArr = new Array();
                var zIndexWin = 100;
                var zIndexDialog = 1100;
                
                // 将当前层内的可见窗体[state: != close|min]压入排序数组内
                for ( var i = 0; i < wins.length; i++ ) {
                    if ( wins[i] != win && wins[i].state != "close" && wins[i].state != "min" ) {
                        if ( isNaN(parseInt(wins[i].tagNode.style.zIndex ))) {
                            if ( wins[i].type != "dialog" ) {
                                wins[i].tagNode.style.zIndex = zIndexWin;
                                ++zIndexWin;
                            } else {
                                wins[i].tagNode.style.zIndex = zIndexDialog;
                                ++zIndexDialog;
                            }
                        } 
                        sortArr.push( wins[i] );
                    }
                }
                
                // 按元素Dom节点的zIndex值，以从小到大的次序排列sortArr数组中的每一个元素
                sortArr.sort( 
                               function(a, b) { 
                                     return parseInt( a.tagNode.style.zIndex ) - parseInt( b.tagNode.style.zIndex );
                               } 
                             );
                
                // 在sortArr数组中，按元素的下标对数组内每个元素的zIndex值进行有序化
                zIndexWin = 100;
                zIndexDialog = 1100;
                for ( var i = 0; i < sortArr.length; i++ ) {
                    if ( sortArr[i].type === "dialog" ) {
                        sortArr[i].tagNode.style.zIndex = zIndexDialog;
                        zIndexDialog++;
                    } else {
                        sortArr[i].tagNode.style.zIndex = zIndexWin;
                        zIndexWin++;
                    }
                }
                
                // 设置目标窗体的zIndex
                if ( handleWin.type === "dialog" ) {
                    handleWin.tagNode.style.zIndex = ++zIndexDialog;
                } else {
                    handleWin.tagNode.style.zIndex = ++zIndexWin;
                }
            }
            
            eWin.actWin = this;
        }
    }
    
    
    // 打开窗体方法实现
    function open() {
        if ( this.tagNode.parentNode ) {                                           //判断窗体是否被销毁
        
            // 窗体呈现过程
            this.show();                                                        
            this.actitave();                                                
            
            // 对话框的处理[压入系统对话框栈]
            if ( this.type === "dialog" ) {                                         
                eWin.dialogStack.push(this);
            }
            
            // 窗体对应的缩略图呈现过程[试图将thumpoint的值由Id转换成thum对象，当转换成功后将其呈现]
            if ( (typeof this.thumPoint) === "string" ) {
                if ( this.thumPoint ) {
                    var thumNode = document.getElementById( this.thumPoint );
                    if ( thumNode ) {
                        var thum = eWin.getElement( thumNode );
                        this.thumPoint = thum;
                        this.thumPont.winPoint = this;
                    }
                }
            } 
            if ( this.thumPoint && (typeof this.thumPoint) === "object" ) {
                this.thumPoint.show();
            }
        }
    }
    

    // 窗体关闭方法实现
    function close() {
        if ( this.tagNode.parentNode ) {
        
            // 关闭过程
            if ( this.state != "max" ) {
               this.saveSize();
            }
            this.hide();                                 
            if ( this.type === "dialog" ) {                      
                eWin.dialogStack.pop();
            }
        
            //关闭缩略图过程
            if ( (typeof this.thumPoint) === "string" ) {
                var thumNode = document.getElementById( this.thumPoint );
                if( thumNode ) {
                    var thum = eWin.getElement( thumNode );
                    this.thumPoint = thum;
                    this.thumPoint.winPoint = this;
                }
            } 
            if ( this.thumPoint && (typeof this.thumPoint) != "string" ) {
                this.thumPoint.hide();
            }
        }
        this.state = "close";
        return this;
    }
    

    // 窗体最小化方法实现
    function min() {
       if ( this.state != "max" ) {
           this.saveSize();
       }
       this.hide();
       this.state="min";
    }


    // 窗体最大化方法实现
    function max() {
       if ( this.state != "max" ) {

           // 最大化前预处理
           this.show();
           this.saveSize();
           this.setLeft(0);
           this.setTop(0);

           // 窗体拉伸过程
           this.widthFlex( HTMLDom.getNodeWidth(this.parentNode.tagNode) - this.tagNode.offsetWidth );
           this.heightFlex( HTMLDom.getNodeHeight(this.parentNode.tagNode) - this.tagNode.offsetHeight );

           this.state = "max";
        }
    }


    // 保存窗体尺寸方法实现
    function saveSize() {

        // 窗体处于不可见情况下时保存尺寸前的预处理
        var cssText = "";
        if ( this.tagNode.style.display === "none" ) {
            cssText = this.tagNode.style.cssText;
            this.tagNode.style.filter = 'alpha(opacity=2)';
            this.tagNode.style.opacity = 2;
            this.tagNode.style.display = "block";
        }

        // 保存窗体内盒尺寸及顶点坐标
        this.originalSize.left = this.getLeft();
        this.originalSize.top = this.getTop();
        this.originalSize.width = this.getWidth();
        this.originalSize.height = this.getHeight();

        // 保存窗体外盒尺寸及顶点坐标
        this.originalSize.offsetLeft = this.tagNode.offsetLeft;
        this.originalSize.offsetTop = this.tagNode.offsetTop;
        this.originalSize.offsetWidth = this.tagNode.offsetWidth;
        this.originalSize.offsetHeight = this.tagNode.offsetHeight;

        // 恢复预处理前的窗体样式
        if ( cssText ) {
            this.tagNode.style.cssText = cssText;
        }
    }
    
    
    // 恢复窗体
    function reset() {
        this.show();
        if ( this.originalSize.width ) {
            this.widthFlex( this.originalSize.width - this.getWidth() );
        }
        if ( this.originalSize.height ) {
            this.heightFlex( this.originalSize.height - this.getHeight() );
        }
        if ( this.originalSize.left ) {
            this.setLeft( this.originalSize.left );
        }
        if ( this.originalSize.top ) {
            this.setTop( this.originalSize.top );
        }
        this.state = "normal";
    }


    // 窗体移动实现[公有]
    function move(x,y) {
        this.setLeft(x);
        this.setTop(y);
    }

    // 宽度伸缩方法实现[参数：offsetWidth 偏移宽度]
    function widthFlex ( offsetWidth ) {
        var isMinSise = false;
    
       // 编历窗体的每一个元素并将其宽度按offsetWidth的值伸缩
       var element = this;
       while ( element && !isMinSise) {
            while ( element && !isMinSise ) {
                 if ( element.getType() === "Window" && element != this && element.state != "max" ) {
                    break;
                 } else {
                    if ( element.wFlex ) {
                        if( element.getType() === "Window" && element.getWidth() <= element.minWidth && offsetWidth < 0 ) {
                            isMinSise = true;
                        } else {
                            element.setWidthByOffset( offsetWidth );
                        }
                    }
                 }
                 if ( element.firstNode ) {
                     element = element.firstNode;
                 } else {
                    break;
                 }
            }
            while ( element && !isMinSise ) {
                 if ( element.nextNode ) {
                      element = element.nextNode;
                      break;
                  }
                  element=element.parentNode;
                  if ( element === this ) {
                      break;
                  }
            }
            if ( element === this ) {
                break;
            }
        }
    }


    // 高度伸缩方法实现[参数：offsetHeight 偏移高度]
    function heightFlex( offsetHeight ){

       var isMinSize = false;
       
       // 编历窗体的每一个元素并将其高度按offsetHeight的值伸缩
       var element = this;
       while ( element &&  !isMinSize ) {
            while( element && !isMinSize ) {
                 if ( element.getType() === "Window" && element != this && element.state != "max" ) {
                    break;
                 } else {
                    if ( element.hFlex ) {
                    
                        if( element.getType() === "Window" && element.getHeight() <= element.minHeight && offsetHeight < 0 ) {
                            isMinSize = true;
                        } else {
                            element.setHeightByOffset(offsetHeight);
                        }
                    }
                 }
                 if ( element.firstNode ) {
                     element = element.firstNode;
                 } else{
                    break;
                 }
            }
            while ( element && !isMinSize ) {
               if ( element.nextNode ) {
                  element = element.nextNode;
                  break;
               }
               element = element.parentNode;
               if ( element === this ) {
                  break;
               }
            }
            if ( element === this ) {
                break;
            }
        }
    }


    // Window类定义
    JPM.nameSpace(
        "EWin.Entity" ,

        function Window( tagNode ) {

            /*--属性定义开始--*/
            this.tagNode=tagNode;
            this.titleBar = null;
            this.toolArea = null;
            this.menu = null;
            this.workSpace = null;
            this.thumPoint = "";
            this.minWidth = 0;
            this.minHeight = 0;
            this.wFlex = true;
            this.hFlex = true;
            this.childType = "TitleBar|ToolArea|Menu|WorkSpace";
            this.originalSize = {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
                offsetWidth: 0,
                offsetHeight: 0,
                offsetLeft: 0,
                offsetTop: 0
            };
            
            this.type = "window";
            this.state = "normal";
            /*--属性定义结束--*/

            /*--方法定义开始--*/
            this.baseAddElement = this.addElement;
            this.baseRemoveElement = this.removeElement;
            this.addElement = addElement;
            this.removeElement = removeElement;    
            this.format = format;
            this.getType = getType;
            this.actitave = actitave;
            this.open = open;
            this.close = close;
            this.min = min;
            this.max = max;
            this.saveSize = saveSize;
            this.reset = reset;
            this.move = move;
            this.widthFlex = widthFlex;
            this.heightFlex = heightFlex;
             /*--方法定义开始--*/

            WindowEvent.call( this );

            var err = this.format() ;
            if( err ) {
               alert( err );
            } 
            
            IWindow.call( this );                                   
        }
    );

    // 继承Element类
    Window.prototype = new Element();
} )();