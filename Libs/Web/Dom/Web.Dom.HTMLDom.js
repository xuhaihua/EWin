/*--
    本文件主要用于定义HTMLDom对象
        公有:
          方法:
            getNodeType             获取节点类型
            getNodeOuterSize        获取节点外尺寸
            getNodeWidth            获取节点宽度
            getNodeHeight           获取节点高度
            getNodeFullName         获取节点全称
            getNodeName             获取节点名
            getNodeNameSpace        获取节点名称空间
            verticalInsertNode      垂直插入节点
            verticalDeleteNode      垂直删除节点
            upwardTravevsal         垂直向上遍历
            downwardTravevsal       垂直向下遍历
            forwardTravevsal        从上到下从右往左遍历指定节点
            backwardTravevsal       从上到下从左入右遍历指定节点
--*/
( function() {

    //相关对象或类的引用
    eval( JPM.spaceUsing("Web", "css") );
    
    

    var HTMLDom={
        
        //获取节点类型信息
        getNodeType: function( node ){
	                        if ( node ){
		                        if ( node.nodeType === 1 ) {
			                        return "ELEMENT_NODE";							
		                        }
		                        if ( node.nodeType === 2 ) {
			                        return "ATTRIBUTE_NODE";						
		                        }
		                        if (node.nodeType === 3 ) {
			                        return "TEXT_NODE";								
		                        }
		                        if ( node.nodeType === 4 ) {
			                        return "CDATA_SECTION_NODE";					
		                        }
		                        if ( node.nodeType === 5 ) {
			                        return "ENTITY_REFERENCE_NODE";					
		                        }
		                        if ( node.nodeType === 6 ) {
			                        return "ENTITY_NODE";							
		                        }
		                        if ( node.nodeType === 7 ) {
			                        return "PROCESSING_INSTRUCTION_NODE";			
		                        }
		                        if ( node.nodeType === 8 ) {
			                        return "COMMENT_NODE";							
		                        }
		                        if ( node.nodeType === 9 ) {
			                        return "DOCUMENT_NODE";							
		                        }
		                        if ( node.nodeType === 10 ) {
		                            return "DOCUMENT_TYPE";
		                        }
		                        if ( node.nodeType === 11 ) {
			                        return "DOCUMENT_FRAGMENT";							
		                        }
		                        if ( node.nodeType === 12 ) {
		                            return "NOTATION";
		                        }
	                        }
                        },
                        
    
        // 获取节全名            
        getNodeFullName: function( node ) {
             // 创建无素节点
             if ( nodeXML.nodeType === 1 ) {
                return node.tagName.toLocaleUpperCase();
             } else {
                alert( "在getNodeFullName方法中参数必须是节点类型!" )
                return null;
            }
        },
        
        
        // 获取节点名
        getNodeName: function( nodeXML ) {
            var nodeName="";                   
            var values = Array();
            if ( nodeXML.nodeType === 1 ) {
                values = nodeXML.tagName.split( ":" );
                
                if ( values && values.length === 1 ) {
                   nodeName = values[0];
                }
                else {
                     if( values && values.length > 1 ) {
                        nodeName=values[1];
                     }
                }
                
                return nodeName.toLocaleUpperCase();;
                
            } else {
                alert( "在getNodeName方法中参数必须是节点类型!" )
                return null;
            }
        },
        
        
        //获取节点名称空间
        getNodeNameSpace: function( nodeXML ) {
            var nameSpace = "";            
            var values = new Array();
            
            if ( nodeXML.nodeType === 1 ) {
                values = nodeXML.tagName.split(":");
            } else {
                alert( "在getNodeNameSpace方法中参数必须是节点类型!" )
                return null;
            }
            
            if ( values && values.length === 1 || nodeXML.nodeType === 3 ) {
                nameSpace = "html";
            }
            else {
                if ( values && values.length > 1 ) {
                    nameSpace=values[0];
                }
            }
            
            return nameSpace;
        },
        
        
        // 获取元素的外尺寸
        getNodeOuterSize: function( node ) {
            if ( HTMLDom.getNodeType(node) === "ELEMENT_NODE" ) {
                var info = {};
            
                var styles = css.getNodeComputedStyles( node );
                info.topBorderWidth=0;
                info.bottomBorderWidth=0;
                info.leftBorderWidth=0;
                info.rightBorderWidth=0;
                
                info.bottomPaddingWidth=0;
                info.rightPaddingWidth=0;
                info.topPaddingWidth = 0;
                info.leftPaddingWidth=0;
            
                if ( styles["borderTopColor"] && styles["borderTopWidth"] ) {
                   info.topBorderWidth = styles["borderTopWidth"].replace("px", "");
                }
                if ( styles["borderBottomColor"] && styles["borderBottomWidth"] ) {
                   info.bottomBorderWidth = styles["borderBottomWidth"].replace("px" ,"");
                }
                if ( styles["borderRightColor"] && styles["borderRightWidth"] ) {
                   info.rightBorderWidth = styles["borderRightWidth"].replace("px", "");
                }
                if ( styles["borderLeftColor"] && styles["borderLeftWidth"] ) {
                   info.leftBorderWidth = styles["borderLeftWidth"].replace("px", "");
                }
                
                if ( styles["paddingTop"] ) {
                   info.topPaddingWidth = styles["paddingTop"].replace("px", "");
                }
                 if ( styles["paddingLeft"] ) {
                   info.leftPaddingWidth = styles["paddingLeft"].replace("px", "");
                }
                if ( styles["paddingBottom"] ) {
                   info.bottomPaddingWidth = styles["paddingBottom"].replace("px", "");
                }
                 if ( styles["paddingRight"] ) {
                   info.rightPaddingWidth = styles["paddingRight"].replace("px", "");
                }
                
                return info;
            }
            
            return null;
        },
        

        // 获取节点内盒宽度
        getNodeWidth: function( node ){
            if ( HTMLDom.getNodeType(node) === "ELEMENT_NODE" ) {
               var nodeOuterSize = HTMLDom.getNodeOuterSize( node );
               return node.offsetWidth - nodeOuterSize.leftBorderWidth - nodeOuterSize.rightBorderWidth - nodeOuterSize.leftPaddingWidth - nodeOuterSize.rightPaddingWidth;
            } else {
                alert( "传入getNodeWidth方法的参数类型不正确!" + node );
                return null;
            }
        },
        
        
        // 获取节点内盒高度
        getNodeHeight: function( node ){
            if ( HTMLDom.getNodeType(node) === "ELEMENT_NODE" ) {
                var nodeOuterSize = HTMLDom.getNodeOuterSize( node );
                return node.offsetHeight - nodeOuterSize.topBorderWidth - nodeOuterSize.bottomBorderWidth - nodeOuterSize.topPaddingWidth - nodeOuterSize.bottomPaddingWidth;
            } else {
                alert( "传入getNodeWidth方法的参数类型不正确!" );
                return null;
            }
        },
        
        
        // 垂直插入节点[插入位置在参照节点之上]
        verticalInsertNode: function( ReferenceNode, node ) {
                                                var refParentNode = ReferenceNode.parentNode;
                                                if ( refParentNode ) {
                                                    refParentNode.insertBefore( node, ReferenceNode );
                                                }
                                                node.appendChild( ReferenceNode );
                                                return node;
                                            },
                                            
                                            
        //垂直删除节点
        verticalDeleteNode: function( node ) {
                                    var delNode = null;
                                    if ( node.parentNode ) {
                                        var nodeChildLength = node.childNodes.length;
		                                for ( var i = 0; i < nodeChildLength; i++)
		                                {
		                                    node.parentNode.insertBefore( node.childNodes[0], node );
		                                }
		                                delNode = node.parentNode.removeChild( node );
		                            }
		                            else {
		                                if ( node.firstChild ) {
		                                    node.firstChild.appendChild( node );
		                                    delNode=node.parentNode.removeChild( node );
		                                }
		                            }
		                            return delNode;
                            },
                            
    
        //垂直向上遍历
        upwardTravevsal: function( startNode, disposeFun ) {
                                var node = startNode;
                                arguments.callee.isTravevsal = true;
                                
                                while ( arguments.callee.isTravevsal && node ) {
                                
	                               arguments.callee.isTravevsal = disposeFun( node );
	                                node = node.parentNode;
	                            }
                        	    
	                            //遍历结束处理
	                            if ( node === null ) {
	                                disposeFun( node );
	                                arguments.callee.isTravevsal = false;
	                            }
                        },
                        
         
         //垂直向下遍历
         downwardTravevsal: function( startNode, disposeFun ){
                                    var node = startNode;
                                    var isRangeFinish = false; 
                                    arguments.callee.isTravevsal = true;
                                    
                                    while ( arguments.callee.isTravevsal && node ) {
                                        
                                       arguments.callee.isTravevsal = disposeFun( node );
                                        node = node.firstChild;
                                    }
                            	    
                                    //遍历结束处理
                                    if(node === null){
                                        disposeFun( node );
                                        arguments.callee.isTravevsal = false;
                                    }
                            },
                            
                            
        // 向前遍历
        forwardTravevsal: function( startNode, disposeFun, rangeDisposeFun ){

                            var node = startNode;
                            var isRangeFinish = false;                                        
                            arguments.callee.isTravevsal=true;                              
                            
                            while ( arguments.callee.isTravevsal && node ){
                        	
                                // 向下获取节点
                                while ( arguments.callee.isTravevsal && arguments.callee.isTravevsal != "giveUp" && node ) {
                                    arguments.callee.isTravevsal = disposeFun( node );
	                                if ( node.lastChild ) {
		                                node=node.lastChild;
	                                }else{
	                                    break;
	                                }
                                }
                                
                                // 向前逐级向前获取兄弟节点
                                while( arguments.callee.isTravevsal && node){
                                
                                    if ( rangeDisposeFun && rangeDisposeFun(node) ) {
		                                arguments.callee.isTravevsal = false;
		                                isRangeFinish = true;
	                                }
                                
	                                if ( node.previousSibling ){
		                                node = node.previousSibling;
		                                break;
	                                }
	                                node = node.parentNode;
                        			
	                                if ( rangeDisposeFun && rangeDisposeFun(node) ) {
		                                arguments.callee.isTravevsal = false;
		                                isRangeFinish = true;
	                                }
                                }
                            }
                        	
                            // 遍历结束处理
                            if ( node === null || isRangeFinish ){
                                disposeFun( node );
                                arguments.callee.isTravevsal = false;
                            }
                        },
                        
                        
        // 向后遍历
        backwardTravevsal: function( startNode, disposeFun, rangeDisposeFun ) {

                                var node = startNode;
                                var isRangeFinish = false;
                                arguments.callee.isTravevsal = true;
                                
	                            while ( arguments.callee.isTravevsal && node ) {
                        	    
	                                // 向下获取节点
		                            while(arguments.callee.isTravevsal && node) {
	                                     arguments.callee.isTravevsal = disposeFun( node );
	                                     
	                                     if ( arguments.callee.isTravevsal === "giveUp" ) {
	                                        break;
	                                     }
	                                     
			                             if ( node.firstChild ) {
				                             node = node.firstChild;
			                             }else{
			                                break;
			                             }
		                            }
                            		
    		                        // 向前逐级向后获取兄弟节点
		                            while(arguments.callee.isTravevsal && node) {
		                            
		                                if ( rangeDisposeFun && rangeDisposeFun(node) ) {
				                            arguments.callee.isTravevsal = false;
				                            isRangeFinish = true;
				                            break;
				                         }
		                            
				                         if ( node.nextSibling ) {
					                          node = node.nextSibling;
					                          break;
				                          }
				                         node = node.parentNode;
                        				 
				                         if ( rangeDisposeFun && rangeDisposeFun(node) ) {
				                            arguments.callee.isTravevsal = false;
				                            isRangeFinish = true;
				                         }
			                         }
	                            }
                        	    
	                            //遍历结束处理
	                            if ( node === null || isRangeFinish ){
		                            arguments.callee.isTravevsal = false;
	                            }
                        }
    }
    
    JPM.nameSpace(
        "Web.DOM",
        "HTMLDom",HTMLDom
        );
} )();