/**
    * 本文件主要用于定义Thum实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Desktop.TaskBar
        * 属性：
            * tagNode     元素dom节点
            * relWin      关联的Win
        * 方法：
            * format      规格    
            * getType     获取类型
            * show        显示
            * hide        隐藏
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar", "Thum") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Event", "ThumEvent") );
    eval( JPM.spaceUsing("EWin", "IThum") );
    
    
    
    // 规格
    function format() {
        var errString = "";
        return errString;
    }
    
    
    // 显示元素
    function show() {
        this.state = "show";
        var taskBar =this.parentNode;
        taskBar.showThumByPage(0);
    }
    
    // 隐藏元素
    function hide() {
        this.state = "hide";
        var taskBar = this.parentNode;
        taskBar.showThumByPage(0);
    }
    
    // 获取类型
    function getType() {
        return "Thum";
    }
    
     
    // Thum类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop.TaskBar",
        
         function Thum( tagNode ) {
            
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.winPoint = null;
            this.show = show;
            this.hide = hide;
            this.state = "hide";
            /*--属性定义结束--*/
            
            /*--方法定义开始--*/
            this.format = format;                 
            this.getType = getType;
            /*--方法定义结束--*/
            
            ThumEvent.call(this);
            
            var err = this.format();
            if ( err ) {
                alert( err );
            }
            
            IThum.call( this );
        }
    );
    
    // 原型继承Element
    Thum.prototype = new Element();
})();