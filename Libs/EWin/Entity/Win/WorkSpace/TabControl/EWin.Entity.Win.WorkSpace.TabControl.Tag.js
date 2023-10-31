/**
    * 本文件主要用于定义Tag类该类继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.WorkSpace.TabControl
        * 属性：
            * tagNode     元素dom节点
            * actCss      标签激活时样式
            * unCss       标签未激活时样式
        * 方法：
            * format      规格
            * getType     获取类型
  */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.TabControl", "Tag") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Event", "TagEvent") );
    eval( JPM.spaceUsing("EWin", "ITag") );
    
    


    // 规格
    function format() {
        var errString = "";
        
        // 获取标签状态样式
        var actCss = this.tagNode.getAttribute("data-ewin-actCss") || this.tagNode.getAttribute("actCss");
        if ( actCss ){
            this.actCss = actCss;
        }
        
        return errString;
    }


    // 获取类型
    function getType() {
        return "Tag";
    }


    // Tag类定义
    JPM.nameSpace(
        "EWin.Entity.Win.WorkSpace.TabControl",

         function Tag( tagNode ) {
           
            /*--定义属性开始--*/
            this.tagNode = tagNode; 
            this.actCss = "";
            /*--定义属性结束--*/

            /*--定义方法开始--*/
            this.format = format;
            this.getType = getType;
            /*--定义方法结束--*/

            TagEvent.call(this);

            var err = this.format();
            if( err ) {
                alert( err );
            }
            
            ITag.call( this );
        }
    );
    
    // 原型继承Element
    Tag.prototype = new Element();
} )();