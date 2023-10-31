/**
    * 本文件主要用于定义TabSubstance实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.WorkSpace.TabControl
        * 属性：
            * tagNode   元素dom节点
            * wFlex     宽度伸缩
            * hFlex     高度伸缩
        * 方法：
            * format    规格
            * getType   获取类型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.TabControl" ,"TabSubstance") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") ); 
    eval( JPM.spaceUsing("EWin", "ITabSubstance") ); 
    
    

    // 规格
    function format() {
        var errString = "";
        
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
        
        // 获取和设置Substance元素尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute("data-ewin-width") || this.tagNode.getAttribute("width");
            if ( width === null || isNaN(parseInt(width)) ) {
                this.setWidth( HTMLDom.getNodeWidth( this.tagNode ) );
            } else {
                this.setWidth(parseInt(width));
            }
        }
        if ( this.hFlex ) {
            var height = this.tagNode.getAttribute("data-ewin-height") || this.tagNode.getAttribute("height");
            if ( height === null || isNaN(parseInt(height)) ) {
                this.setHeight( HTMLDom.getNodeHeight( this.tagNode ) );
            } else {
                this.setHeight( parseInt(height) );
            }
        }
        
        return errString;
    }


    // 获取类型
    function getType() {
        return "TabSubstance";
    }


    // TabSubstance类定义
    JPM.nameSpace(
        "EWin.Entity.Win.WorkSpace.TabControl",
        
        function TabSubstance( tagNode ) {
            
            /*--定义属性开始--*/
            this.tagNode = tagNode;
            this.wFlex = true;                   
            this.hFlex = true;
            /*--定义属性结束--*/
            
            /*--定义方法开始--*/
            this.format = format;
            this.getType = getType;
            /*--定义方法结束--*/
            
            var err = this.format();
            if ( err ) {
                alert( err );
            }
            
            ITabSubstance.call( this );
        }
    );
    
    // 原型继承Element
    TabSubstance.prototype = new Element();
} )();