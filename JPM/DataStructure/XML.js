/*--
    本文件主要用于定义Xml对象
        公有:
            方法:
                parseXMLText        将xml字符串转换为XMLDom
                traversals          对指定相节点进行编历
--*/

( function() {   
    // 定义Xml对象
    window[JPM.moduleSpaceName].Xml={
        
        // 将xmlText转换为xmlDom方法 [!这个方法非常重要选用的指令和实现与跨平台直接有关系!]
        parseXMLText:function( xmlText ) {
            var xmlDom=null;
            if(document.all){
                xmlDom = new ActiveXObject("Microsoft.xmlDOM");
                xmlDom.loadXML(xmlText);
            }
            else{
                xmlDom = new DOMParser().parseFromString(xmlText,"text/xml");           
            }
            
            return xmlDom;
        },

        // Dom编历[参数：node为要编辑的节点，handle为节点处理器类型为方法]
        traversals:function( node, handle ) {
            var startNode  = node;                    //起始节点
            while ( node ) {
            
                //向下获取节点
                while ( node ) {
                    if( node.nodeType === 1) {
                         handle(node);
                     }
                     if(node.firstChild) {
                         node=node.firstChild;
                     }else{
                        break;
                     }
                }
        		
                //向前逐级向后获取兄弟节点
                while ( node ) {
                     if ( node === startNode ) {
                        node = null;
                        break;
                     }
                
                     if ( node.nextSibling ) {
	                      node=node.nextSibling;
	                      break;
                      }
                     node=node.parentNode;
                     if ( node === startNode ) {
                        node = null;
                        break;
                     }
                 }
            }
        }
     }
} )();