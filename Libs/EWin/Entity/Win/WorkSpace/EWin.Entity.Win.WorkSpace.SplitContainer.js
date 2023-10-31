/**
    * 本文件主要用于定义SplitContainer实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.WorkSpace
        * 公有
            * 属性：
                * tagNode               元素dom节点
                * firstPanel            第一框架项
                * secondPanel           第二框架项
                * spaceBar              分隔条 
                * wFlex                 宽度伸缩
                * hFlex                 高度伸缩
            * 方法
                * baseLoad              基类加载方法
                * addElement;           添加项[重写基类方法]
                * removeElement;        移除项[重写基类方法]
                * setWidthByOffset      设置宽度按偏移量[重写基类方法]
                * setHeightByOffset     设置高度按偏移量[重写基类方法]
                * setWidth              设置宽度[重写基类方法]
                * setHeight             设置高度[重写基类方法]
                * format                规格
                * getType               获取元素类型
                * load                  加载
                * sizeAdjust            尺寸调整
         * 私有：
                widthFlex               宽度伸缩方法
                heightFlex              高度伸缩方法
 */
( function () {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "SplitContainer") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.SplitContainer", "Panel,SpaceBar") );
    eval( JPM.spaceUsing("EWin.Event", "SplitContainerEvent") );
    eval( JPM.spaceUsing("EWin", "ISplitContainer") );
    
    

    /*--重写基类方法开始--*/
    // 添加项
    function addElement( item ){
        return null;
    }

    // 移除项
    function removeElement(item) {
        return null;
    }
    /*--重写基类方法--*/

    // 宽度伸缩方法实现[参数：offsetWidth：伸缩偏移量，element：伸缩起始元素]
    function widthFlex( offsetWidth, element ){
    
       // 编历element下的每一个元素并将其宽度按offsetWidth的值伸缩
       var startElement = element;
       while ( element) {
            while ( element ) {
                 if ( element.getType() === "Window" && element != this && element.state != "max" ) {
                    break;
                 } else {
                    if( element.wFlex ) {
                        element.setWidthByOffset( offsetWidth );
                    }
                 }
                 if ( element.firstChild ) {
                     element=element.firstChild;
                 } else{
                    break;
                 }
            }
            while ( element ) {
                 if ( element.nextNode ) {
                      element = element.nextNode;
                      break;
                  }
                  element = element.parentNode;
                  if ( element === startElement ) {
                      break;
                  }
            }
            if ( element === startElement ) {
                break;
            }
        }
    }


    // 高度伸缩方法实现[参数：offsetHeight：伸缩偏移量，element：伸缩起始元素]
    function heightFlex( offsetHeight, element ){

       // 编历element下的每一个元素并将其高度按offsetHeight的值伸缩
       var startElement = element
       while ( element ) {
            while ( element ) {
                 if ( element.getType() == "Window" && element != this && element.state != "max" ) {
                    break;
                 } else {
                    if ( element.hFlex ) {
                        element.setHeightByOffset( offsetHeight );
                    }
                 }
                 if ( element.firstChild ) {
                     element = element.firstChild;
                 }else{
                    break;
                 }
            }
            while ( element ) {
                 if (element.nextNode ) {
                      element = element.nextNode;
                      break;
                  }
                  element = element.parentNode;
                  if ( element === startElement ) {
                      break;
                  }
            }
            if( element === startElement ) {
                break;
            }
        }
    }
    
    
    /*--重写基类setWidth、setHeigh、setWidthByOffset、setHeightByOffset方法开始--*/
    // 设置宽度方法实现
    function setWidth( width ){
    
        if ( this.spaceBar.tagNode.tagName.toLocaleUpperCase() === "VSPACEBAR" || eWin.checkElementStyleClass("vSpaceBar", this.spaceBar.tagNode) ){
            
            // 垂直分割型框架处理代码
            this.firstPanel.setWidth( width );
            this.secondPanel.setWidth( width );
            this.spaceBar.setWidth( width );
            this.tagNode.style.width = width + "px";
        } else {
            
            /*-水平分割型框架处理代码开始--*/
            
            // splitConWidth     框架内盒宽度
            // firstPanelWidth   框架内firstPanel内盒宽度
            // secondPanelWidth  框架内secondPanel内盒宽度
            // spaceBarWidth     框架内spaceBar内盒宽度
            var splitConWidth = this.getWidth();
            var firstPanelWidth = this.firstPanel.getWidth();
            var secondPanelWidth = this.secondPanel.getWidth();
            var spaceBarWidth = this.spaceBar.getWidth();
            
            // firstPanelOutWidth    框架内firstPanel元素外盒宽度
            // secondPanelOutWidth   框架内secondPanel元素外盒宽度
            var firstPanelOutWidth = this.firstPanel.tagNode.offsetWidth;
            var secondPanelOutWidth = this.secondPanel.tagNode.offsetWidth;
            var spaceBarOutWidth = this.spaceBar.tagNode.offsetWidth;
            
            // firstPanelFlexWidth  框架内firstPanel元素的伸缩量
            // secondPanelFlexWidth 框架内secondPanelFlexWidth元素的伸缩量
            // compensateWidth      补尝宽度
            var firstPanelFlexWidth = 0
            var secondPanelFlexWidth = 0;
            var compensateWidth = 0;
            
            // 按固定尺寸方式设置元素宽度
            var isExed = false;
            if( this.firstPanel.flexMode === "fixed" || this.secondPanel.flexMode === "fixed" ){
                
                isExed = true;
                if ( this.firstPanel.flexMode === "fixed" ){
                    firstPanelFlexWidth = 0;
                    secondPanelFlexWidth = width - splitConWidth;
                } else {
                    firstPanelFlexWidth = width - splitConWidth;
                    secondPanelFlexWidth = 0;
                }
                
                if ( firstPanelWidth + firstPanelFlexWidth > this.firstPanel.minSize && secondPanelWidth + secondPanelFlexWidth > this.secondPanel.minSize ) {
                    this.firstPanel.setWidth( firstPanelWidth + firstPanelFlexWidth );
                    this.secondPanel.setWidth( secondPanelWidth + secondPanelFlexWidth );
                } else {
                   isExed = false;
                }
            }
            
            // 按比例尺寸方式设置元素宽度
            if( !isExed ) {
            
                // firstPanel、secondPanel交替补尝逻辑标识
                this.isFirstPanelCompensate = !this.isFirstPanelCompensate;
            
                // 当绝对伸缩量值不等于1时的代码
                if( Math.abs(parseInt(width-splitConWidth)) != 1 ) {
                    firstPanelFlexWidth = parseInt( (firstPanelOutWidth / (firstPanelOutWidth+secondPanelOutWidth)) * (width-splitConWidth) );
                    secondPanelFlexWidth = (width-splitConWidth) - firstPanelFlexWidth;
                    compensateWidth = width - (firstPanelOutWidth+firstPanelFlexWidth + secondPanelOutWidth+secondPanelFlexWidth + spaceBarOutWidth);
                    
                    if ( this.isFirstPanelCompensate ) {
                        if ( (firstPanelWidth + firstPanelFlexWidth + compensateWidth <= this.firstPanel.minSize || secondPanelWidth+secondPanelFlexWidth <= this.secondPanel.minSize) && !(firstPanelWidth + firstPanelFlexWidth+compensateWidth <= this.firstPanel.minSize && secondPanelWidth + secondPanelFlexWidth <= this.secondPanel.minSize) ) {
                        
                            // 在firstPanel和secondPanel这两个元素中其中有一个元素的新宽度小于他的最小尺寸时的处理代码
                            if (firstPanelWidth + firstPanelFlexWidth + compensateWidth <= this.firstPanel.minSize) {
                                this.firstPanel.setWidth( this.firstPanel.minSize );
                                this.secondPanel.setWidth( secondPanelWidth + secondPanelFlexWidth + (firstPanelWidth+firstPanelFlexWidth + compensateWidth) - this.firstPanel.minSize );
                            } else {
                                this.secondPanel.setWidth( this.secondPanel.minSize );
                                this.firstPanel.setWidth( firstPanelWidth + firstPanelFlexWidth + compensateWidth + (secondPanelWidth + secondPanelFlexWidth) - this.secondPanel.minSize );
                            }
                        } else {
                            if ( firstPanelWidth + firstPanelFlexWidth + compensateWidth <= this.firstPanel.minSize && secondPanelWidth + secondPanelFlexWidth <= this.secondPanel.minSize ) {
                            
                                // firstPanel和secondPanel元素的新宽度都小于他们的最小尺寸时的处理代码
                                this.firstPanel.setWidth( this.firstPanel.minSize );
                                this.secondPanel.setWidth( this.secondPanel.minSize );  
                            } else {
                            
                                // firstPanel和secondPanel元素的新宽度都在他们的正常值范围内的处理代码
                                this.firstPanel.setWidth( firstPanelWidth + firstPanelFlexWidth + compensateWidth );
                                this.secondPanel.setWidth( secondPanelWidth + secondPanelFlexWidth);
                            }
                        }
                    } else {
                        if( (firstPanelWidth + firstPanelFlexWidth <= this.firstPanel.minSize || secondPanelWidth+secondPanelFlexWidth+compensateWidth <= this.secondPanel.minSize) && !(firstPanelWidth + firstPanelFlexWidth <= this.firstPanel.minSize && secondPanelWidth + secondPanelFlexWidth + compensateWidth <= this.secondPanel.minSize) ) {
                            
                            // 在firstPanel和secondPanel这两个元素中其中有一个元素的新宽度小于他的最小尺寸时的处理代码
                            if( firstPanelWidth + firstPanelFlexWidth <= this.firstPanel.minSize ) {
                                this.firstPanel.setWidth( this.firstPanel.minSize );
                                this.secondPanel.setWidth( secondPanelWidth + secondPanelFlexWidth + compensateWidth + (firstPanelWidth + firstPanelFlexWidth) - this.firstPanel.minSize );
                            } else {
                                this.secondPanel.setWidth( this.secondPanel.minSize );
                                this.firstPanel.setWidth( firstPanelWidth + firstPanelFlexWidth + (secondPanelWidth + secondPanelFlexWidth + compensateWidth)- this.secondPanel.minSize);
                            }
                        } else {
                            if(firstPanelWidth + firstPanelFlexWidth <= this.firstPanel.minSize && secondPanelWidth + secondPanelFlexWidth + compensateWidth <= this.secondPanel.minSize) {
                            
                                // firstPanel和secondPanel元素的新宽度都小于他们的最小尺寸时的处理代码
                                this.firstPanel.setWidth( this.firstPanel.minSize );
                                this.secondPanel.setWidth( this.secondPanel.minSize );  
                            } else {
                            
                                // firstPanel和secondPanel元素的新宽度都在他们的正常值范围内的处理代码
                                this.firstPanel.setWidth( firstPanelWidth + firstPanelFlexWidth );
                                this.secondPanel.setWidth( secondPanelWidth + secondPanelFlexWidth + compensateWidth );
                            }
                        }
                    }
                }else {
                    
                    // 绝对伸缩量值等于1时的处理代码
                    compensateWidth = parseInt( width - splitConWidth );
                    if ( this.isFirstPanelCompensate ) {
                    
                        // 对firstPanel元素宽度设置
                        if ( firstPanelWidth + compensateWidth > this.firstPanel.minSize ) {
                            this.firstPanel.setWidth( firstPanelWidth + compensateWidth );
                        }else {
                            this.firstPanel.setWidth( this.firstPanel.minSize );
                        }
                    } else {
                    
                        // 对secondPanel元素宽度设置
                        if ( secondPanelWidth + compensateWidth > this.secondPanel.minSize ) {
                            this.secondPanel.setWidth( secondPanelWidth + compensateWidth );
                        } else {
                            this.secondPanel.setWidth( this.secondPanel.minSize );
                        }
                    }
                }
            }
            
            this.tagNode.style.width = width + "px";
            
            /*-水平分割型框架处理代码结束--*/
            
        }
    }


    // 设置高度方法实现
    function setHeight( height ){

        if( this.spaceBar.tagNode.tagName.toLocaleUpperCase() === "VSPACEBAR" || eWin.checkElementStyleClass("vSpaceBar", this.spaceBar.tagNode) ){
        
            /*-垂直分割型框架处理代码开始--*/
            
            // splitConHeight    框架内盒高度
            // firstPanelHeight  框架内firstPanel内盒高度
            // secondPanelHeight 框架内secondPanel内盒高度
            var splitConHeight=this.getHeight();
            var firstPanelHeight=this.firstPanel.getHeight();
            var secondPanelHeight=this.secondPanel.getHeight();
            
            // firstPanelOutHeight  框架内firstPanel外盒高度
            // secondPanelOutHeight 框架内secondPanel外盒高度
            var firstPanelOutHeight = this.firstPanel.tagNode.offsetHeight;
            var secondPanelOutHeight = this.secondPanel.tagNode.offsetHeight;
            var spaceBarOutHeight = this.spaceBar.tagNode.offsetHeight
            
            // firstPanelFlexHeight  框架内firstPanel高度伸缩量
            // secondPanelFlexHeight 框架内secondPanel高度伸缩量
            // compensateWidth       补尝高度
            var firstPanelFlexHeight = 0
            var secondPanelFlexHeight = 0;
            var compensateHeight = 0;
            
            // 按固定尺寸方式设置元素高度
            var isExed = false;
            if ( this.firstPanel.flexMode === "fixed" || this.secondPanel.flexMode === "fixed" ) {
                isExed = true;
                if ( this.firstPanel.flexMode === "fixed" ){
                    firstPanelFlexHeight = 0;
                    secondPanelFlexHeight = height - splitConHeight;
                } else {
                    firstPanelFlexHeight = height - splitConHeight;
                    secondPanelFlexHeight = 0;
                }
                if ( firstPanelHeight + firstPanelFlexHeight > this.firstPanel.minSize && secondPanelHeight + secondPanelFlexHeight > this.secondPanel.minSize ) {
                    this.firstPanel.setHeight( firstPanelHeight + firstPanelFlexHeight );
                    this.secondPanel.setHeight( secondPanelHeight + secondPanelFlexHeight );
                } else {
                    isExed = false;
                }
            } 
            
            // 按比例尺寸方式设置元素高度
            if( !isExed ) {
            
                // firstPanel、secondPanel交替补尝逻辑标识
                this.isFirstPanelCompensate = !this.isFirstPanelCompensate;
            
                if( Math.abs(parseInt(height - splitConHeight)) != 1 ) {
                    firstPanelFlexHeight = parseInt( (firstPanelOutHeight / (firstPanelOutHeight + secondPanelOutHeight)) * (height-splitConHeight) );
                    secondPanelFlexHeight = (height-splitConHeight) - firstPanelFlexHeight;
                    compensateHeight = height - (firstPanelOutHeight + firstPanelFlexHeight + secondPanelOutHeight+secondPanelFlexHeight + spaceBarOutHeight);
                    
                    
                    if ( this.isFirstPanelCompensate ) {
                        if ( (firstPanelHeight + firstPanelFlexHeight + compensateHeight <= this.firstPanel.minSize || secondPanelHeight + secondPanelFlexHeight <= this.secondPanel.minSize) && !(firstPanelHeight + firstPanelFlexHeight + compensateHeight <= this.firstPanel.minSize && secondPanelHeight + secondPanelFlexHeight <= this.secondPanel.minSize) ) {
                        
                            // 在firstPanel和secondPanel这两个元素中其中有一个元素的新高度小于他的最小尺寸时的处理代码
                            if ( firstPanelHeight + firstPanelFlexHeight + compensateHeight <= this.firstPanel.minSize ) {
                                this.firstPanel.setHeight( this.firstPanel.minSize );
                                this.secondPanel.setHeight( secondPanelHeight + secondPanelFlexHeight + (firstPanelHeight + firstPanelFlexHeight + compensateHeight) - this.firstPanel.minSize );
                            } else {
                                this.secondPanel.setHeight( this.secondPanel.minSize );
                                this.firstPanel.setHeight( firstPanelHeight + firstPanelFlexHeight + compensateHeight + (secondPanelHeight + secondPanelFlexHeight) - this.secondPanel.minSize );
                            }
                        } else {
                            if ( firstPanelHeight + firstPanelFlexHeight + compensateHeight <= this.firstPanel.minSize && secondPanelHeight + secondPanelFlexHeight <= this.secondPanel.minSize) {
                            
                                // firstPanel和secondPanel元素的新高度都小于他们的最小尺寸时的处理代码
                                this.firstPanel.setHeight( this.firstPanel.minSize );
                                this.secondPanel.setHeight( this.secondPanel.minSize );
                            } else {
                            
                                // firstPanel和secondPanel元素的新高度都在他们的正常值范围内的处理代码
                                this.firstPanel.setHeight( firstPanelHeight + firstPanelFlexHeight + compensateHeight );
                                this.secondPanel.setHeight( secondPanelHeight + secondPanelFlexHeight );
                            }
                        }
                    } else {
                        if ( ( firstPanelHeight + firstPanelFlexHeight <= this.firstPanel.minSize || secondPanelHeight + secondPanelFlexHeight+compensateHeight <= this.secondPanel.minSize) && !(firstPanelHeight + firstPanelFlexHeight <= this.firstPanel.minSize && secondPanelHeight + secondPanelFlexHeight + compensateHeight <= this.secondPanel.minSize) ) {
                        
                            // 在firstPanel和secondPanel这两个元素中其中有一个元素的新高度小于他的最小尺寸时的处理代码
                            if (firstPanelHeight + firstPanelFlexHeight <= this.firstPanel.minSize) {
                                this.firstPanel.setHeight( this.firstPanel.minSize );
                                this.secondPanel.setHeight( secondPanelHeight + secondPanelFlexHeight + compensateHeight + (firstPanelHeight + firstPanelFlexHeight) - this.firstPanel.minSize );
                            } else {
                                this.secondPanel.setHeight( this.secondPanel.minSize );
                                this.firstPanel.setHeight( firstPanelHeight + firstPanelFlexHeight + (secondPanelHeight + secondPanelFlexHeight + compensateHeight) - this.secondPanel.minSize );
                            }
                        } else {
                            if ( firstPanelHeight + firstPanelFlexHeight <= this.firstPanel.minSize && secondPanelHeight + secondPanelFlexHeight+compensateHeight <= this.secondPanel.minSize ) {
                            
                                // firstPanel和secondPanel元素的新高度都小于他们的最小尺寸时的处理代码
                                this.firstPanel.setHeight( this.firstPanel.minSize );
                                this.secondPanel.setHeight( this.secondPanel.minSize );
                            } else {
                            
                                // firstPanel和secondPanel元素的新高度都在他们的正常值范围内的处理代码
                                this.firstPanel.setHeight( firstPanelHeight + firstPanelFlexHeight );
                                this.secondPanel.setHeight( secondPanelHeight + secondPanelFlexHeight + compensateHeight );
                            }
                        }
                    }
                } else {
                
                    // 绝对伸缩量值等于1时的处理代码
                    compensateHeight = parseInt( height - splitConHeight );
                    this.isFirstPanelCompensate = !this.isFirstPanelCompensate;
                    if ( this.isFirstPanelCompensate ) {
                    
                        // 对firstPanel元素高度设置
                        if ( firstPanelHeight + firstPanelFlexHeight + compensateHeight > this.firstPanel.minSize ) {
                            this.firstPanel.setHeight( firstPanelHeight + firstPanelFlexHeight + compensateHeight );
                        } else {
                            this.firstPanel.setHeight( this.firstPanel.minSize );
                        }
                    } else {
                    
                        // 对secondPanel元素高度设置
                        if( secondPanelHeight + secondPanelFlexHeight + compensateHeight > this.secondPanel.minSize ) {
                            this.secondPanel.setHeight( secondPanelHeight + secondPanelFlexHeight + compensateHeight );
                        } else {
                            this.secondPanel.setHeight( this.secondPanel.minSize );
                        }
                    }
                }
            }
            
            this.tagNode.style.height = height + "px";
            
            /*-垂直分割型框架处理代码结束--*/
          
        } else {
        
            // 水平分割型框架处理代码
            this.tagNode.style.height = height + "px";
            this.firstPanel.setHeight( height );
            this.secondPanel.setHeight( height );
            this.spaceBar.setHeight( height );
        }
    }
    
    
    // 按偏移量设置宽度方法实现
    function setWidthByOffset( offset ) {
        if ( this.parentNode.getType() === "Panel" ) {
           offset =  this.parentNode.getWidth() - this.getWidth();
        }
         this.setWidth( this.getWidth() + offset );
       
    }
    
    
    // 按偏移量设置高度方法实现
    function setHeightByOffset( offset ) {
        if( this.parentNode.getType() === "Panel" ) {
           offset = this.parentNode.getHeight() - this.getHeight();
        }
        this.setHeight( this.getHeight() + offset )
    }
    /*--重写基类方法结束--*/
    
    
    // 规格
    function format(){
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
        
        // 获取和设置框架元素的尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute("data-ewin-width") || this.tagNode.getAttribute("width");
            if( width === null || isNaN(parseInt(width)) ) {
                this.tagNode.style.width = HTMLDom.getNodeWidth( this.tagNode ) + "px"
            } else {
                 this.tagNode.style.width = parseInt(width) + "px";
            }
        }
        if ( this.hFlex ) {
            var height = this.tagNode.getAttribute("data-ewin-height") || this.tagNode.getAttribute("height");
            if(  height === null || isNaN(parseInt(height)) ) {
                this.tagNode.style.height = HTMLDom.getNodeHeight( this.tagNode ) + "px";
            } else {
                this.tagNode.style.height = parseInt(height) + "px";
            }
        }
        
        // 获取和设置水平型SplitContainer元素中的Panel的尺寸
        if ( this.spaceBar.tagNode.tagName.toLocaleUpperCase()=="HSPACEBAR" || eWin.checkElementStyleClass("hSpaceBar",this.spaceBar.tagNode) ) {
            var leftWidth = this.tagNode.getAttribute( "data-ewin-leftWidth" ) || this.tagNode.getAttribute( "leftWidth" );
            var rightWidth = this.tagNode.getAttribute( "data-ewin-rightWidth" ) || this.tagNode.getAttribute( "rightWidth" );
            if ( leftWidth === null || isNaN(parseInt(leftWidth)) ) {
                errString = errString + "eWin警告!：系统见意您为" + this.getType() + "元素的leftWidth属性赋于一个明确的值!\n";
            } else {
                this.firstPanel.setWidth( parseInt(leftWidth) );
            }
            if ( rightWidth === null || isNaN( parseInt(rightWidth)) ) {
                errString = errString + "eWin警告!：系统见意您为" + this.getType() + "元素的rightWidth属性赋于一个明确的值!\n";
            } else {
                this.secondPanel.setWidth( parseInt(rightWidth) );
                
            }
        }
        
        // 获取和设置垂直型SplitContainer元素中的Panel的尺寸
        if ( this.spaceBar.tagNode.tagName.toLocaleUpperCase() === "VSPACEBAR" || eWin.checkElementStyleClass("vSpaceBar", this.spaceBar.tagNode) ) {
            var topHeight = this.tagNode.getAttribute( "data-ewin-topHeight" ) || this.tagNode.getAttribute( "topHeight" ) ;
            var bottomHeight = this.tagNode.getAttribute( "data-ewin-bottomHeight" ) || this.tagNode.getAttribute( "bottomHeight" );
            
            if( topHeight === null || isNaN(parseInt(topHeight)) ) {
                errString = errString + "eWin警告!：系统见意您为" + this.getType() + "元素的topHeight属性赋于一个明确的值!\n";
            } else {
                this.firstPanel.setHeight( parseInt(topHeight) );
            }
            if( bottomHeight === null || isNaN(parseInt(bottomHeight)) ) {
                errString = errString + "eWin警告!：系统见意您为" + this.getType() + "元素的bottomHeight属性赋于一个明确的值!\n";
            } else {
                this.secondPanel.setHeight( parseInt(bottomHeight) );
            }
        }
        
        // 设置框架内元素尺寸
        if(this.firstPanel && this.secondPanel && this.spaceBar) {
        
            // 获取SplitContainer元素尺寸
            var splitConHeight = this.getHeight();
            var splitConWidth = this.getWidth();
            
            if(this.spaceBar.tagNode.tagName.toLocaleUpperCase()=="HSPACEBAR" || eWin.checkElementStyleClass("hSpaceBar",this.spaceBar.tagNode)){
                
                // 强制将SplitContainer下的Panel元素设为左浮动
                if(document.all){
                    this.firstPanel.tagNode.style.styleFloat = "left";
                    this.spaceBar.tagNode.style.styleFloat = "left";
                    this.secondPanel.tagNode.style.styleFloat = "left";
                } else {
                    this.firstPanel.tagNode.style.cssFloat = "left";
                    this.spaceBar.tagNode.style.cssFloat = "left";
                    this.secondPanel.tagNode.style.cssFloat = "left";
                }
                
                // 计算和设置panel元素尺寸
                var firstPanelOuterSize = HTMLDom.getNodeOuterSize(this.firstPanel.tagNode);
                this.firstPanel.setHeight(splitConHeight - firstPanelOuterSize.topPaddingWidth-firstPanelOuterSize.bottomPaddingWidth-firstPanelOuterSize.topBorderWidth-firstPanelOuterSize.bottomBorderWidth);
                var secondPanelOuterSize = HTMLDom.getNodeOuterSize(this.secondPanel.tagNode);
                this.secondPanel.setHeight(splitConHeight - secondPanelOuterSize.topPaddingWidth-secondPanelOuterSize.bottomPaddingWidth-secondPanelOuterSize.topBorderWidth-secondPanelOuterSize.bottomBorderWidth);
                
                // 计算和设置spaceBar元素尺寸
                this.spaceBar.tagNode.style.border = "0px"
                this.spaceBar.setWidth( splitConWidth - this.firstPanel.tagNode.offsetWidth - this.secondPanel.tagNode.offsetWidth );
                this.spaceBar.setHeight( splitConHeight - secondPanelOuterSize.topPaddingWidth-secondPanelOuterSize.bottomPaddingWidth-secondPanelOuterSize.topBorderWidth-secondPanelOuterSize.bottomBorderWidth );
                
                
                // 尺寸溢出检测
                if ( this.firstPanel.tagNode.offsetWidth + this.secondPanel.tagNode.offsetWidth + this.spaceBar.tagNode.offsetWidth > splitConWidth ) {
                    errString = errString + "eWin报警：splitContainer元素下的panel与spaceBar外盒宽度和大于splitContainer的内盒宽度!";
                }
            }
            if ( this.spaceBar.tagNode.tagName.toLocaleUpperCase()=="VSPACEBAR" || eWin.checkElementStyleClass("vSpaceBar", this.spaceBar.tagNode) ){
                
                this.firstPanel.setWidth( splitConWidth );
                this.secondPanel.setWidth( splitConWidth );
                
                
                // 计算和设置panel元素尺寸
                var firstPanelOuterSize = HTMLDom.getNodeOuterSize( this.firstPanel.tagNode );
                this.firstPanel.setWidth( splitConWidth - firstPanelOuterSize.leftPaddingWidth - firstPanelOuterSize.rightPaddingWidth - firstPanelOuterSize.leftBorderWidth - firstPanelOuterSize.rightBorderWidth );
                var secondPanelOuterSize = HTMLDom.getNodeOuterSize( this.secondPanel.tagNode );
                this.secondPanel.setWidth(splitConWidth - secondPanelOuterSize.leftPaddingWidth - secondPanelOuterSize.rightPaddingWidth - secondPanelOuterSize.leftBorderWidth - secondPanelOuterSize.rightBorderWidth);
                
                // 计算和设置spaceBar高度  
                this.spaceBar.tagNode.style.border = "0px"  
                this.spaceBar.setWidth( splitConWidth - secondPanelOuterSize.leftPaddingWidth - secondPanelOuterSize.rightPaddingWidth - secondPanelOuterSize.leftBorderWidth - secondPanelOuterSize.rightBorderWidth );
                this.spaceBar.setHeight( splitConHeight - this.firstPanel.tagNode.offsetHeight - this.secondPanel.tagNode.offsetHeight );
                
                // 尺寸溢出检测
                if ( this.firstPanel.tagNode.offsetHeight + this.secondPanel.tagNode.offsetHeight + this.spaceBar.tagNode.offsetHeight > splitConHeight ) {
                    errString = errString + "eWin报警：splitContainer元素下的panel与spaceBar外盒高度和大于splitContainer的内盒高度!";
                }
            } 
        } else {
            errString = errString + "eWin报警：在解析splitContainer元素时缺少相应的子元素!";
        }
        
        return errString;
    }


    // 获取元素类型
    function getType() {
        return "SplitContainer";
    }


    // 元素加载方法实现
    function load( parseMap, target ){
    
        var splitContainer = this;
        
        // 定义解析处理器
        function iterator(nodeHTML) {
            if(HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE") {
        
                var signName = nodeHTML.tagName;
                
                // 加载panel元素
                if( ((!splitContainer.firstPanel || !splitContainer.secondPanel) && (signName.toLocaleUpperCase() === "PANEL" || eWin.checkElementStyleClass("panel", nodeHTML))) ) {
                
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                       
                        // 创建Panel对象
                        var panel = new Panel( nodeHTML );
                        if ( !splitContainer.firstPanel ) {
                            splitContainer.firstPanel = panel;
                        } else {
                            splitContainer.secondPanel = panel;
                        }
                        
                        splitContainer.append( panel );
                        eWin.addItem( indexGuid, panel );
                        panel.load( parseMap );
                        
                        // 放弃对当前节点的深度遍历
                        if( panel.parentNode === splitContainer ) {
                            return "giveUp";
                        }
                    }
                }
                
                // 加载spaceBar元素
                if ( !splitContainer.spaceBar && (signName.toLocaleUpperCase() === "HSPACEBAR" || signName.toLocaleUpperCase() === "VSPACEBAR" || eWin.checkElementStyleClass("hSpaceBar", nodeHTML) || eWin.checkElementStyleClass("vSpaceBar", nodeHTML)) ) {
                
                    if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                    
                        // 设置索引键indexguid
                        var indexGuid = guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建SpaceBar对象
                        var spaceBar = new SpaceBar( nodeHTML );
                        splitContainer.spaceBar = spaceBar;
                        
                        splitContainer.append( spaceBar );
                        eWin.addItem( indexGuid, spaceBar );
                        
                        // 放弃对当前节点的深度遍历
                        if ( spaceBar.parentNode === splitContainer ) {
                            return "giveUp";
                        }
                    }
                }
            }
        }
        
        this.baseLoad( parseMap, iterator, target );
        
        var err = this.format();
        if( err ) {
            alert( err );
        }
    }


    // 分隔调整方法实现
    function sizeAdjust( leftOffset, topOffset ){
        
        // 调整左右项宽度            
        if ( this.spaceBar.tagNode.tagName.toLocaleUpperCase()=="HSPACEBAR" || eWin.checkElementStyleClass("hSpaceBar", this.spaceBar.tagNode) ) {
        
            // 计算和设置panel尺寸
            var firstPanelWidth = this.firstPanel.getWidth() - leftOffset;
            var secondPanelWidth = this.secondPanel.getWidth() + leftOffset;
            if ( firstPanelWidth <= 0 || secondPanelWidth <= 0 ) {
                return false;
            }
            this.firstPanel.setWidth( firstPanelWidth );
            this.secondPanel.setWidth( secondPanelWidth );
            
            
            // 调整项内子框架的尺寸
            if ( this.firstPanel.splitContainer ) {
               widthFlex( this.firstPanel.getWidht() - this.firstPanel.splitContainer.getWidht(), this.firstPanel.splitContainer );
            }
            if ( this.secondPanel.splitContainer ) {
                widthFlex( this.secondPanel.getWidht() - this.secondPanel.splitContainer.getWidht(), this.secondPanel.splitContainer );
            }
            
            // 调整项内标签控件的尺寸
            if ( this.firstPanel.tabControl ) {
                widthFlex( this.firstPanel.getWidht() - this.firstPanel.tabControl.getWidht(), this.firstPanel.tabControl );
            }
            if ( this.secondPanel.tabControl ) {
                widthFlex( this.secondPanel.getWidht() - this.secondPanel.tabControl.getWidht(), this.secondPanel.tabControl );
            }
        }
       
        //调整上下项高度
        if ( this.spaceBar.tagNode.tagName.toLocaleUpperCase() === "VSPACEBAR" || eWin.checkElementStyleClass("vSpaceBar", this.spaceBar.tagNode) ) {
        
            // 计算和设置panel尺寸
            var firstPanelHeight = this.firstPanel.getHeight() - topOffset;
            var secondPanelHeight = this.secondPanel.getHeight() + topOffset;
            if ( firstPanelHeight <= 0 || secondPanelHeight <= 0 ) {
                return false;
            }
            this.firstPanel.setHeight( firstPanelHeight );
            this.secondPanel.setHeight( secondPanelHeight );
            
            //调整项内子框架的尺寸
            if ( this.firstPanel.splitContainer ) {
               heightFlex( this.firstPanel.getHeight() - this.firstPanel.splitContainer.getHeight(), this.firstPanel.splitContainer );
            }
            if ( this.secondPanel.splitContainer ) {
                heightFlex( this.secondPanel.getHeight() - this.secondPanel.splitContainer.getHeight(), this.secondPanel.splitContainer );
            }
            
            //调整项内标签控件的尺寸
            if ( this.firstPanel.tabControl ) {
                heightFlex( this.firstPanel.getHeight() - this.firstPanel.tabControl.getHeight(), this.firstPanel.tabControl );
            }
            if ( this.secondPanel.tabControl ) {
                heightFlex( this.secondPanel.getHeight() - this.secondPanel.tabControl.getHeight(), this.secondPanel.tabControl );
            }
        }
    }


    // SplitContainer类定义
    JPM.nameSpace(
        "EWin.Entity.Win.WorkSpace",
        
        function SplitContainer( tagNode ) {
        
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.firstPanel = null;
            this.secondPanel = null;
            this.spaceBar = null;
            this.wFlex = true;
            this.hFlex = true;
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.baseLoad = this.load;
            this.addElement = addElement;
            this.removeElement = removeElement;
            this.setWidthByOffset = setWidthByOffset;
            this.setHeightByOffset = setHeightByOffset;
            this.setWidth = setWidth;
            this.setHeight = setHeight;
            this.format = format;
            this.getType = getType;
            this.load = load;
            this.sizeAdjust = sizeAdjust;
            /*--方法定义结束--*/
            
            SplitContainerEvent.call( this );
            
            ISplitContainer.call( this );
        }
    );
    
    // 原型继承Element
    SplitContainer.prototype = new Element();
} )();