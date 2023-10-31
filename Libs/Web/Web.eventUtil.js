/*
    本文件主要用于定义EventUtil类
        公有：
          方法：
            getTarget         获取目标对象方法
            getEvent          获取事件对象方法
            addHandler        添加事件
            preventDefault    取消事件默认行为
            stopPropagation   取消事件进一步捕获或冒泡
*/
( function() {

    // 数据类引用
    eval( JPM.spaceUsing("Data" ,"guid") );
    
    
    
    
    // 事件处理生成器
    function eventHandlerBuild() {
        function eventHandler( event ) {
            for ( var i = 0; i < arguments.callee.handlers.length; i++ ) {
                this[arguments.callee.handlers[i]](event);
            }
        }
        eventHandler.handlers=new Array();
        return eventHandler;
    }
    
    
    // 添加事件
    function addHandler( element, type, handler ) {
        if ( !element["on"+type] ) {
           element["on"+type] = eventHandlerBuild();
        } else {
            var re = /^(\s*function\s*)([a-zA-Z]\w*)/;
            var eventHeandlerName = re.exec(element["on" + type].constructor.toString())[2];
            if ( "eventHandlerBuild" != eventHeandlerName ) {
                var hasHandler=guid.build();
                element[hasHandler] = element["on"+type];
                element["on" + type].handlers[element["on" + type].handlers.length] = hasHandler;
            }
        }
        var hasHandler = guid.build();
        element[hasHandler] = handler;
        element["on" + type].handlers[element["on"+type].handlers.length] = hasHandler;
    } 
    
    
    // 获取事件对象方法
    function getEvent( event ){
	    return event ? event : window.event;
    }
    
    
    // 获取目标对象
    function getTarget( event ){
	    return event.target || event.srcElement;
    }
    
    
    // 取消事件默认行为
    function preventDefault( event ){
	    if( event.preventDefault ){
		    event.preventDefault();
	    }else{
		    event.returnValue = false;
	    }
    }
    
    
    // 取消事件进行一步捕获或冒泡
    function stopPropagation( event ){
	    if( event.stopPropagation ){
		    event.stopPropagation();
	    }else{
		    event.cancelBubble = true;
	    }
    }
    
    
    // 定义eventUtil对象
    var eventUtil= {
            getEvent: getEvent,
            getTarget: getTarget,
            addHandler: addHandler,
            stopPropagation: stopPropagation,
            preventDefault: preventDefault
    }
    
    
    JPM.nameSpace(
        "Web",
        "eventUtil",eventUtil
    )
} )();

