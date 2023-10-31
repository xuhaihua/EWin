﻿/**
    * 本文件主要用于定义ToolControlBlock实体，该实体继承自EWin.Entity.Base.Element
    * 所属空间：EWin.Entity.Win.ToolBar
        * 属性：
            * tagNode     元素dom节点
        * 方法：
            * format      规格
            * getType     获取类型
 */
( function() {
    // 相关对象或类型引用
    eval( JPM.spaceUsing("Data", "guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Win.ToolBar", "ToolControlBlock") );
    eval( JPM.spaceUsing("EWin.Entity.Base", "Element") );
    
    
    
    
    // 规格
    function format() {
        var errString = "";
        return errString;
    }
    
    
    // 获取类型
    function getType() {
        return "ToolControlBlock";
    }
    
    
    // ToolControlBlock类定义
    JPM.nameSpace(
        "EWin.Entity.Win.ToolBar",
        
         function ToolControlBlock( tagNode ) {
            
            this.tagNode = tagNode;
            
            /*--定义方法开始--*/
            this.format = format;
            this.getType = getType;
            /*--定义方法结束--*/

            var err = this.format();
            if( err ) {
                alert( err );
            }
        }
    )
    
    // 原型继承自Element
    ToolControlBlock.prototype = new Element();
} )();