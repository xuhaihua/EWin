/**
    * 本文件主要用于定义TabBody类该类继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.WorkSpace.TabControl
        * 属性：
            * tagNode    元素dom节点
            * wFlex      宽度伸缩                      
            * hFlex      高度伸缩
            * childType  允许添加的元素子类型
         * 事件：
            * format     规格  
            * getType    获取为型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.TabControl", "TabSubstance,TabBody") );
    eval( JPM.spaceUsing("EWin.Event", "TabBodyEvent") );
    eval( JPM.spaceUsing("EWin", "ITabBody") );
    
    

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
        
        // 获取和设置TabBody元素尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute("data-ewin-width") || this.tagNode.getAttribute("width");
            if( width === null || isNaN(parseInt(width)) ) {
                this.setWidth( HTMLDom.getNodeWidth( this.tagNode ) );
            } else {
                this.setWidth( parseInt(width) );
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
        return "TabBody";
    }


    // TabBody类定义
    JPM.nameSpace(
        "EWin.Entity.Win.WorkSpace.TabControl",

        function TabBody( tagNode ) {

            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.wFlex = true;                     
            this.hFlex = true;
            this.childType = "TabSubstance";
            /*--属性定义结束--*/

            /*--方法定义开始--*/
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/

            TabBodyEvent.call( this );

            var err = this.format();
            if( err ) {
                alert( err );
            }
            
            ITabBody.call( this );
        }
    );
    
    //原型继承Element
    TabBody.prototype = new Element();
} )();