/**
    * 本文件主要用于定义CancelBut实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.WorkSpace
    * 公有：
        * 属性：
            * tagNode  元素dom节点
        * 方法：
            * format   规格
            * getType  获取类型
 */
( function() {

    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "CancelBut") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") ); 
    eval( JPM.spaceUsing("EWin.Event", "CancelButEvent") );
    eval( JPM.spaceUsing("EWin", "ICancelBut") );
    
    


    // 规格
    function format(tagNode) {
        var errString = "";
        return errString;
    }


    // 获取类型
    function getType() {
        return "CancelBut";
    }


    // CancelBut类定义
    JPM.nameSpace(
        "EWin.Entity.Win.WorkSpace",

        function CancelBut( tagNode ) {

            this.tagNode = tagNode;

            /*--方法定义开始--*/
            this.format = format;
            this.getType = getType;
            /*--方法定义结束--*/

            CancelButEvent.call(this);

            var err = this.format();
            if ( err ) {
                alert( err );
            }
            
            ICancelBut.call( this );
        }
    );

    // 原型继承Element
    CancelBut.prototype = new Element();
} )();