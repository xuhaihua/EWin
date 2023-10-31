/**
    * 本文件主要用于定义TaskBar实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Desktop
        * 属性：
            * tagNode         元素dom节点
            * thumCount       每页缩略图数 
            * childType       允许添加的子类型
        * 方法：
            * baseAddElement      引用基类addElement方法
            * baseRemoveElement   引用基类removeElement方法
            * addElement          添加项[重写基类方法]
            * removeElement       移除项[重写基类方法]
            * format          规格
            * getType         获取类型
            * showThumByPage  按页号显示任务栏中的缩略图
 */
( function() {
    // 数据类引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "TaskBar") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar", "StartMenu,Thum,PrePage,NextPage") );
    eval( JPM.spaceUsing("EWin.Event", "TaskBarEvent") );
    eval( JPM.spaceUsing("EWin", "ITaskBar") );
    
    
    

     /*--重写基类方法开始--*/
    // 添加项
    function addElement( item ){
        var result = null;
        if ( item.getType() === "StartMenu" && !this.startMenu ){
            result = this.baseAddElement( item );
            this.startMenu = result;
        } else {
            alert( "不能在已有子菜单的项中添加StartMenu" );
        }
        
        if ( item.getType() != "StartMenu" ) {
           return this.baseAddElement( item );
        }
        
        return result;
    }
    
    
    // 移除项
    function removeElement( item ) {
        if ( this.startMenu && this.startMenu == item && item.getType() === "StartMenu" ) {
            this.startMenu = null;
            return this.baseRemoveElement( item );
        } else {
            alert( "StartMenu类型移除失败" );
            return null;
        }
        
        if ( item.getType() != "StartMenu" ) {
           return this.baseRemoveElement( item );
        }
        
    }
    /*重写基类方法结束*/

    // 规格
    function format() {
        var errString = "";
        
        //每页显示的缩略图数[默认情况下为0显示全部]
        var thumCount = this.tagNode.getAttribute( "data-ewin-thumCount" ) || this.tagNode.getAttribute( "thumCount" );
        if ( thumCount != null && !isNaN(parseInt(thumCount)) ) {
            this.thumCount = parseInt( thumCount );
        }
                
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "TaskBar";
    }
    

    // 按页显示缩略图
    function showThumByPage(pageNum) {
        
        // 获取缩略图集合
        var items = this.getChildElements();                              
        var thums = new Array();
        var sum = 0;
        for ( var i = 0; i < items.length; i++ ) {
            if ( items[i].getType() === "Thum" ) {
                if ( items[i].state === "show" ) {
                    thums.push(items[i]);
                    ++sum;
                }
                items[i].tagNode.style.display = "none"
            } 
        }
        
        if ( this.thumCount > 0 )  {
            sum = sum - pageNum * this.thumCount;
            if ( sum > 0 ) {
                // 显示缩略图
                for ( var i = pageNum * this.thumCount;i < (pageNum+1) * this.thumCount; i++ ) {
                    if( thums[i] ) {
                        thums[i].tagNode.style.display = "block";
                    }
                }
            }
        } else {
            for ( var i = 0; i < thums.length; i++) {
                thums[i].tagNode.style.display = "block";
            }
        }
    }
    
    
    // TaskBar类定义
    JPM.nameSpace(
        "EWin.Entity.Desktop",
        
         function TaskBar( tagNode ) {
         
            /*--属性定义开始--*/
            this.tagNode = tagNode;
            this.startMenu = null;
            this.thumCount = 0;
            this.childType = "Thum";
            /*--属性定义结束--*/         
            
            /*--方法定义开始--*/
            this.baseAddElement = this.addElement;
            this.baseRemoveElement = this.removeElement;
            this.addElement = addElement;
            this.removeElement = removeElement;
            this.format = format;
            this.getType = getType;
            this.showThumByPage = showThumByPage;
            /*--方法定义结束--*/
         
            TaskBarEvent.call(this);
            
            var err = this.format();
            if( err ) {
                alert( err );
            }
            
            ITaskBar.call( this );
        }
    );
    
    // 原型类继承Element
    TaskBar.prototype = new Element();
} )();