/**
    * 本文件主要用于定义TabControl实体,该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.WorkSpace
        * 属性：
            * tagNode       元素dom节点
            * tabHead       标标签头
            * tabBody       标签体
            * wFlex         宽度伸缩
            * hFlex         高度伸缩
            * act           处在激活状态的标签
        * 方法：
            * format        规格
            * getType       获取类型
            * actitaveTag   激活
            * closeActTag   关闭
 */
( function () {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("Web", "css") );
    eval( JPM.spaceUsing("EWin", "eWin") ); 
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "TabControl") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") ); 
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.TabControl", "TabControl,TabHead,TabBody") );
    eval( JPM.spaceUsing("EWin.Event", "TabControlEvent") );
    eval( JPM.spaceUsing("EWin", "ITabControl") ); 
    
    

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
        
        // 获取和设置TabControl元素的尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute( "data-ewin-width" ) || this.tagNode.getAttribute( "width" );
            if( width === null || isNaN(parseInt(width)) ) {
                this.setWidth( HTMLDom.getNodeWidth( this.tagNode ) );
            } else {
                this.setWidth(parseInt(width));
            }
        }
        if ( this.hFlex ) {
            var height = this.tagNode.getAttribute( "data-ewin-height" ) || this.tagNode.getAttribute( "height" );
            if(  height === null || isNaN(parseInt(height)) ) {
                this.setHeight( HTMLDom.getNodeHeight( this.tagNode ) );
            } else {
                this.setHeight( parseInt(height) );
            }
        }
        
        return errString;
    }


    // 获取类型
    function getType() {
        return "TabControl";
    }


    // 关闭标签
    function closeActTag() {
       if( this.act ) {

           // 获取当前激活标签对应的Substance元素
           var substance = eWin.getElement( document.getElementById(this.act.tagNode.getAttribute("substanceId") || "") );

           // 获取标签集
           var tags = new Array();
           if (substance) {
               var items = this.act.parentNode.getChildElements();
               for ( var i = 0; i < items.length; i++ ) {
                   if ( items[i].getType() === "Tag" ) {
                       tags.push( items[i] );
                   }
               }
           }

           // 标签关闭过程
           if ( substance && tags.length>1 ) {

               // 移除标签
               this.act.parentNode.removeElement( this.act );
               this.tabBody.removeElement( substance );

               // 计算和设置一下个激活状态的标签
               var sortTags = new Array();
               for ( var i = 0; i < tags.length; i++ ) {
                   if ( tags[i].getType() === this.act ) {
                       sortTags.push( tags[i] );
                   }
               }
               sortTags.sort( 
                               function (a,b) {
                                 return parseInt(a.style.zIndex) - parseInt(b.style.zIndex);
                               }
                             );

               this.actitaveTag( sortTags[sortTags.length-1] );
           }
        }
    }
    
    // 激活标签
    function actitaveTag( tag ) {
        
        if( this.act != tag ) {
            
            var headleSubstance = eWin.getElement( document.getElementById(tag.tagNode.getAttribute("data-ewin-substanceId") || tag.tagNode.getAttribute("substanceId") || "") );
            if ( headleSubstance ) {
            
                // 重新排列除目标标签以外的所有标签
                var tags = tag.parentNode.getChildElements();
                var substances = new Array();
                var zIndexTag = 100;
                for ( var j = 0; j < tags.length; j++ ) {
                    if ( tags[j].getType() === "Tag" && tags[j] != tag ) {
                        tags[j].tagNode.style.zIndex = ++zIndexTag;
                        var substance = eWin.getElement( document.getElementById(tags[j].tagNode.getAttribute("data-ewin-substanceId") || tags[j].tagNode.getAttribute("substanceId") || "") )
                        if( substance ) {
                            substance.tagNode.style.zIndex = zIndexTag;
                        }
                        
                        // 标签状态样式设置
                        if( tags[j].actCss ) {
                            
                            css.removeCssClass( tags[j].actCss, tags[j].tagNode);
                        }
                        if( tags[j].unActCss ) {
                            css.addCssClass( tags[j].unActCss, tags[j].tagNode);
                        }
                    }
                }
              
                // 将目标标签置于最顶层
                tag.tagNode.style.zIndex = ++zIndexTag;
                headleSubstance.tagNode.style.zIndex = ++zIndexTag;
                
                // 标签状态样式设置
                if( tag.unActCss ) {
                    css.removeCssClass( tag.unActCss, tag.tagNode);
                }
                if( tag.actCss ) {
                    css.addCssClass( tag.actCss, tag.tagNode);
                }
                
                this.act=tag;
           }
       }
    }


    // TabControl类定义
    JPM.nameSpace(
        "EWin.Entity.Win.WorkSpace",

        function TabControl( tagNode ) {

            /*--定义属性开始--*/
            this.tagNode = tagNode;
            this.tabHead = null;
            this.tabBody = null;
            this.wFlex = true;                    
            this.hFlex = true;
            this.act = "";
            /*--定义属性结束--*/

            /*--定义方法开始--*/
            this.format = format;
            this.getType = getType;
            this.closeActTag = closeActTag;
            this.actitaveTag = actitaveTag;
            /*--定义方法结束--*/

            TabControlEvent.call(this);

            var err = this.format();
            if ( err ) {
                alert( err );
            }
            
            ITabControl.call( this );
        }
    );

    // 原型继承Element
    TabControl.prototype= new Element();
} )();