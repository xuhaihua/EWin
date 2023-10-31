
/**
    * 本文件主要用于定义TitleBar实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win
        * 属性：
            * tagNode            元素dom节点
            * caption            标题名
            * minBut             最小化按钮
            * maxBut             最大化按钮
            * closeBut           关闭按钮
            * wFlex              宽度伸缩
            * hFlex              高度伸缩
            * childType          允许的子类型
        * 方法：
            * baseAddElement     引用基类addElement方法
            * baseRemoveElement  引用基类removeElement方法
            * addElement;        添加项[重写基类方法]
            * removeElement;     移除项[重写基类方法]
            * format             规格
            * getType            获取类型
 */
( function() {
    // 相关对象或类型的引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );                          
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Win", "TitleBar") );              
    eval( JPM.spaceUsing("EWin.Entity.Win.TitleBar", "TitleCaption,TitleMaxBut,TitleMinBut,TitleCloseBut") );
    eval( JPM.spaceUsing("EWin.Event", "TitleBarEvent") );
    eval( JPM.spaceUsing("EWin", "ITitleBar") );
    
    
    
    /*--重写基类方法开始--*/
    // 添加项
    function addElement( item ){
        var result = null;
        if ( item.getType() === "TitleMinBut" && !this.minBut ){
             result = this.baseAddElement( item );
             this.minBut = result;
        } else {
             alert( "TitleMinBut类型添加失败" );
        }
        
        if ( item.getType() === "TitleMaxBut" && !this.maxBut ){
             result = this.baseAddElement( item );
             this.maxBut = result;
        } else {
             alert( "TitleMaxBut类型添加失败" );
        }
        
        if ( item.getType() === "TitleCloseBut" && !this.closeBut ){
             result = this.baseAddElement( item );
             this.closeBut = result;
        } else {
             alert( "TitleCloseBut类型添加失败" );
        }
        
        if( item.getType() != "TitleMinBut" && item.getType() != "TitleMaxBut" && item.getType() != "TitleCloseBut" ) {
            return this.baseAddElement( item );
        }
        
        return result;
    }

    // 移除项
    function removeElement( item ) {
        if ( this.minBut && this.minBut == item && item.getType() === "TitleMinBut" ) {
            this.minBut = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "TitleMinBut类型移除失败" );
            return null;
        }
        
        if ( this.maxBut && this.maxBut == item && item.getType() === "TitleMaxBut" ) {
            this.maxBut = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "TitleMaxBut类型移除失败" );
            return null;
        }
        
        if ( this.closeBut && this.closeBut == item && item.getType() === "TitleCloseBut" ) {
            this.closeBut = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "TitleCloseBut类型移除失败" );
            return null;
        }
        
        if( item.getType() != "TitleMinBut" && item.getType() != "TitleMaxBut" && item.getType() != "TitleCloseBut" ) {
            return this.baseRemoveElement( item );
        }
    }
    /*--重写基类方法--*/
    
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
        
        // 获取和设置标题栏元素尺寸
        if ( this.wFlex ) {
            var width = this.tagNode.getAttribute( "data-ewin-width" ) || this.tagNode.getAttribute( "width" );
            if ( width === null || isNaN(parseInt(width)) ) {
                this.setWidth( HTMLDom.getNodeWidth( this.tagNode ) );
            } else {
                this.setWidth(parseInt(width));
            }
        }
        if ( this.hFlex ) {
            var height = this.tagNode.getAttribute("data-ewin-height") || this.tagNode.getAttribute("height");
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
        return "TitleBar";
    }
    
    
    // TitleBar类定义
    JPM.nameSpace(
        "EWin.Entity.Win",
        
        function TitleBar( tagNode )    {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.caption = null;
            this.minBut = null;
            this.maxBut = null;
            this.closeBut = null;
            this.wFlex = true;                    
            this.hFlex = false;
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.baseAddElement = this.addElement;
            this.baseRemoveElement = this.removeElement;
            this.addElement = addElement;
            this.removeElement = removeElement;
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/    
                
            TitleBarEvent.call(this);
            
            var err = this.format() ;
            if( err ) {
               alert( err );
            }
            
            ITitleBar.call( this );
        }
    );
    
    // 继承Element类
    TitleBar.prototype = new Element();
} )();