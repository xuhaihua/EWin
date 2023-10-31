/*--
    本文件主要用于定义css对象
        公有：
            方法：
                getNodeComputedStyles 获取节点计算后的样式
                addCssClass           向节点添加样式
                removeCssClass        从节点中移除样式
--*/
( function() {

    //获取节点计算后的样式
    function getNodeComputedStyles( node ){
        var computedStyle = null;
        if( document.defaultView ) {
            computedStyle = document.defaultView.getComputedStyle( node, null );
            
        } else {
            if( node.currentStyle ) {
                computedStyle = node.currentStyle;
            }
        }
        return computedStyle;
    }
    
    
    // 向节点添加样式
    function addCssClass( cssClass, node ) {
        var cssClassText = node.getAttribute( "class" );
        if ( cssClassText ) {
            cssClassText = cssClassText + " " + cssClass;
            node.setAttribute( "class", cssClassText );
        }
        return cssClass;
    }
    
    
    // 从节点中移除样式
    function removeCssClass( cssClass, node ) {
        var classText = node.getAttribute( "class" );
        if ( classText ) {
            var cssClasses = classText.split( " " );
            var newClassText = "";
            for ( var i = 0; i < cssClasses.length; i++ ) {
                if ( cssClasses[i] !=  cssClass){
                    if ( !newClassText ) {
                       newClassText =  cssClasses[i];
                    } else {
                        newClassText = newClassText + " " + cssClasses[i];
                    }
                }
            }
            node.setAttribute( "class", newClassText );
            return cssClass;
        }
        return "";
    }
    
    
    // css对象定义
    var css={
        getNodeComputedStyles:getNodeComputedStyles,
        addCssClass:addCssClass,
        removeCssClass:removeCssClass
    }
    
    JPM.nameSpace(
        "Web",
        "css", css
    )
} )();