
/*--
    本文件主要用于定义TreeNode类
        公有：
          属性：
            parentNode      父节点
            previousNode    前一个兄弟节点
            nextNode        后一个兄弟节点
            firstNode       第一个子节点
            lastNode        最后一个子节点
          方法：
            append          添加节点
            insertBefore    插入节点
            removeChild     移除子节点
            getChilds       获取子节点集合
--*/
( function() {

    eval( JPM.spaceUsing("Data", "TreeNode") );
    
    

    // 追加子节点方法
    function append ( node ) {
       if( !node || !(node instanceof TreeNode) ) {
            alert("传入append方法的参数不正确")
            return null;
       }
       if( !this.firstNode ) {
          this.firstNode  = node;
          node.parentNode = this;
       } else {
          this.lastNode.nextNode = node;
          node.previousNode = this.lastNode;
          node.parentNode = this;
       }
       this.lastNode = node;
       return node;
    }
    
    // 插入节点方法
    function insertBefore ( node, refNode ) {
        if ( !node || !(node instanceof TreeNode) ) {
            alert( "传入insertBefore方法的参数不正确" )
            return null;
        }
        var oldRefPrevious = refNode.previousNode;
        node.parentNode = this;
        node.nextNode = refNode;
        refNode.previousNode = node;
        if ( oldRefPrevious ) {
            oldRefPrevious.nextNode = node;
            node.previousNode = oldRefPrevious;
        }else {
            this.firstNode = node;
        }
        return node;
    }
    
    // 移除节点方法
    function removeChild( node ) {
        if( !node.parentNode ) {
            alert( "执行del指令失败!要删除的节点不在树中!" )
            return null;
        }
        var isExe = false;
        if ( !isExe && node === this.lastNode && this.firstNode != this.lastNode ) {
            this.lastNode = node.previousNode;
            this.lastNode.nextNode = null;
            isExe = true;
        } 
        if ( !isExe && node === this.lastNode && this.firstNode === this.lastNode ) {
            this.lastNode = null;
            this.firstNode = null;
            isExe = true;
        }
        if ( !isExe ) {
            var previouseNode = node.previousNode;
            var nextNode = node.nextNode;
            if ( previouseNode ) {
                 previouseNode.nextNode = nextNode;
                 nextNode.previousNode = previouseNode;
            } else {
                 this.firstNode = nextNode;
                 nextNode.previousNode = null;
            }
        }
        node.parentNode = null;
        node.previousNode = null;
        node.nextNode = null;
        return node;
    }
    
    // 获取子节点方法
    function getChilds() {
        var list = new Array();
        var childNode = this.firstNode;
        while ( childNode ) {
            list.push( childNode );
            childNode = childNode.nextNode;
        }
        return list;
    }
    
    //定义TreeNode类[树节点的基类类型]
    JPM.nameSpace(
        "Data",
        
        function TreeNode() {
        
           /*--属性定义开始--*/
           this.parentNode = null;
           this.previousNode = null;
           this.nextNode = null;
           this.firstNode = null;
           this.lastNode = null;
           /*--属性定义结束--*/                 
           
           /*--方法定义开始--*/
           this.append = append;
           this.insertBefore = insertBefore;
           this.removeChild = removeChild;
           this.getChilds = getChilds;
           /*--方法定义结束--*/
        }  
    );
} )();