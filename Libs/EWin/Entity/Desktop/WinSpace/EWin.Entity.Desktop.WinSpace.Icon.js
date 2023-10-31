/** 
    * 本文件主要用于定义Icon实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Desktop.WinSpace
        * 属性：
            * tagNode     元素dom节点
            * winpoint    关联窗体的指针
        * 方法：
            * format      规格
            * getType     获取类型
 */
( function() {
    //数据类引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.WinSpace", "Icon" ));
    eval( JPM.spaceUsing("EWin.Event", "IconEvent") );
    eval( JPM.spaceUsing("EWin", "IIcon") );
    
    
   
    // 规格
    function format() {
        var errString = "";
        
        // 获取和设置winPoint属性
        var winPoint = this.tagNode.getAttribute( "data-ewin-winPoint" ) || this.tagNode.getAttribute( "winPoint" );
        if( winPoint ) {
            this.winPoint = winPoint;
        }
        
        return errString;
    }


    // 获取类型
    function getType() {
        return "Icon";
    }
    
    
    // Icon类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop.WinSpace",

        function Icon( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.winPoint = null;
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.getType = getType;
            this.format = format;
            /*--方法定义结束--*/
            
            IconEvent.call(this);
            
            var err = this.format();
            if ( err ) {
                alert( err );
            }
            
            IIcon.call( this );
        }
    );
    
    // 原型继承Element
    Icon.prototype = new Element();
} )();