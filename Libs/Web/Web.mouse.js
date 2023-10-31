/*--
    本文件主要用于定义Mouse类
        公有：
            方法：
            getButton                   获取按键
            getAction                   获取鼠标行为
            getOffsetX                  获取相对于节点边界X坐标
            getOffsetY                  获取相对于节点边界Y坐标
            getPointerClientX           获取指针在客户区中的X坐标
            getPointerClientY           获取指针在客户区中的Y坐标
--*/
(function () {
    
    // 获取鼠标按钮状态
    function getButton( event )
    {
        if ( document.implementation.hasFeature("MouseEvents", "2.0") ){
            return event.button;
        }
        else{
            switch( event.button ){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
        return -1;
    }
    
    
    // 获取行为方法
    function getAction( event ) {
        if ( event.type === "mousedown" ) {
            return "MOUSEDOWN";
        }
        if ( event.type === "mousemove" ) {
            return "MOUSEMOVE";
        }
        if ( event.type === "mouseover" ) {
            return "MOUSEOVER";
        }
        if ( event.type === "mouseout" ) {
            return "MOUSEOUT";
        }
        if ( event.type === "mouseup" ) {
            return "MOUSEUP"
        }
    }
    

    // 获取指针在客户区中的X坐标
    function getPointerClientX( event ) {
        return event.clientX;
    }
    
    
    // 获取指针在客户区中的Y坐标
    function getPointerClientY( event ) {
        return event.clientY
    }
    
    
    // 获取相对于节点边界X坐标
    function getOffsetX( node, event ) {
        var actualLeft = node.offsetLeft;
        var current=node.offsetParent;
        while ( current != null){
            actualLeft += current.offsetLeft;
            current=current.offsetParent;
        }
        return event.clientX - actualLeft;
    }
    
    
    // 获取相对于节点边界Y坐标
    function getOffsetY( node, event ) {
        var actualTop = node.offsetTop;
        var current = node.offsetParent;
        while ( current != null ) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return event.clientY - actualTop;
    }
    
    
    // mouse对象定义
    var mouse={
            getButton: getButton,
            getAction: getAction,
            getOffsetX: getOffsetX,
            getOffsetY: getOffsetY,
            getPointerClientX: getPointerClientX,
            getPointerClientY: getPointerClientY
     }
    
    // 定义Mouse类
    JPM.nameSpace(
        "Web",
        "mouse",mouse
    )
})();