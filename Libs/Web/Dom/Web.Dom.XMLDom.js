/*--
    本类主要用定义XMLDom对象
        公有:
          方法:
            parseXMLText                                    //将一段XML字符串转换为XMLDom
            xmlStringToHTMLDom                              //将一段XML字符串转换为HTMLDom
            backwardTravevsal                               //从上到下从左往右对指节点遍历
            getNodeFullName                                 //获取节点全称
            getNodeName                                     //获取节点名
            getNodeNameSpace                                //获取节点名称空间
            getNodeType                                     //获取节点类型
--*/
( function() {

   // 引用相关类或对象
   eval( JPM.spaceUsing("Data","List,guid") );
   
   

   var XMLDom = {
	    
        // 良构XML字符串转XMLDOM方法
        parseXMLText: function( xmlText ) {

                            var xmlDom=null;
                            if ( document.all ) {
                                xmlDom = new ActiveXObject("Microsoft.xmlDOM");
                                xmlDom.loadXML(xmlText);
                            }
                            else{
                                xmlDom = new DOMParser().parseFromString(xmlText,"text/xml");
                            }
                            return xmlDom;
                        },
                        
                        
        // 将xml字符串转HTMLDom
        xmlStringToHTMLDom: function( xmlString ) {
                                var xmlDom = XMLDom.parseXMLText( "<parseText>" + xmlString + "</parseText>" );
                                var documentFragment = null;
                                var handleNode = null;
                                var list = new List();
                                if ( xmlDom ) {
                                    function handler( node ) {
                                        if ( XMLDom.getNodeType(node) === "ELEMENT_NODE" ) {
                                        
                                            if ( node.tagName === "parseText") {
                                                documentFragment = document.createDocumentFragment();
                                            } else {
                                                if ( documentFragment ) {
                                                    var nodeHTML = document.createElement(node.tagName);
                                                    var styleText = node.getAttribute( "style" );
                                                    var styles = new Array();
                                                    if ( styleText ) {
                                                        var styleParts = styleText.split( ";" );
                                                        for ( var i = 0; i < styleParts.length; i++ ) {
                                                            var stylePart = styleParts[i].split( ":" );
                                                            if ( stylePart.length === 2 ) {
                                                                styles.push( stylePart );
                                                            }
                                                        }
                                                    }
                                                    while ( styles.length > 0 ) {
                                                        var stylePart = styles.pop();
                                                        var styleName = stylePart[0];
                                                        var styleValue = stylePart[1];
                                                        nodeHTML.style[styleName] = styleValue;
                                                    }
                                                    for ( var i = 0; i < node.attributes.length; i++ ) {
                                                        var attName = node.attributes[i].nodeName;
                                                        var attValue = node.attributes[i].nodeValue;
                                                        if ( node.attributes[i].specified ) {
                                                            if ( attName.toLocaleUpperCase() != "STYLE" ) {
                                                                nodeHTML.setAttribute( attName, attValue );
                                                            } 
                                                        }
                                                    }
                                                    var indexGuid = guid.build();
                                                    node.setAttribute( "index", indexGuid );
                                                    var info = new Array( 1 );
                                                    info[0] = nodeHTML;
                                                    list.add( indexGuid, info );
                                                    
                                                    if ( node.parentNode.tagName.toLocaleUpperCase() === "PARSETEXT" ) {
                                                        handleNode = documentFragment;
                                                    } else {
                                                        handleNode = list[node.parentNode.getAttribute("index")][0]
                                                    }
                                                    handleNode.appendChild( nodeHTML );
                                                }
                                            }  
                                        } else {
                                            if ( XMLDom.getNodeType(node) === "TEXT_NODE" ) {
                                                var text = node.nodeValue;
                                                var textNode = document.createTextNode( text );
                                                
                                                if ( node.parentNode.tagName.toLocaleUpperCase() === "PARSETEXT" ) {
                                                    handleNode = documentFragment;
                                                } else {
                                                    handleNode = list[node.parentNode.getAttribute("index")][0]
                                                }
                                                handleNode.appendChild( textNode );
                                            }
                                        }
                                    }
                                    
                                    XMLDom.backwardTravevsal( xmlDom, handler );
                                }
                                return documentFragment;
                          },
                          
        
        // 向后遍历                
        backwardTravevsal: function( node, handle ) {
                        while(node) {
                            
                            // 向下获取节点
                            while ( node ) {
                                if ( node.nodeType === 1 || node.nodeType === 3 ) {
                                     handle( node );
                                 }
                                
                                 if ( node.firstChild ) {
                                     node = node.firstChild;
                                 }else{
                                    break;
                                 }
                            }
                    		
                            // 向前逐级向后获取兄弟节点
                            while ( node ) {
                                 if ( node.nextSibling ) {
	                                  node=node.nextSibling;
	                                  break;
                                  }
                                 node = node.parentNode;
                             }
                        }
                    },
                    
        
        // 获取节全名            
        getNodeFullName: function( nodeXML ) {
        
             // 创建无素节点
             if ( nodeXML.nodeType === 1 || nodeXML.nodeType === 3 ) {
                return this.getNodeNameSpace(nodeXML) + ":" + this.getNodeName( nodeXML )
             }
             return null;
        },
        
        
        // 获取节点名
        getNodeName: function( nodeXML ) {
            var nodeName="";
            var values = Array();
            if ( nodeXML.nodeType === 1 ) {
                values = nodeXML.tagName.split( ":" );
                
                if ( values && values.length === 1 ) {
                   nodeName=values[0];
                }
                else {
                    if( values && values.length > 1 ) {
                        nodeName=values[1];
                    }
                }
            }
            if ( nodeXML.nodeType === 3 ) {
                nodeName = "word";
            }
            return nodeName;
        },
        
        
        // 获取节点名称空间
        getNodeNameSpace: function( nodeXML ) {
            var nameSpace = "";             
            var values = new Array();
            if ( nodeXML.nodeType === 1 ) {
                values = nodeXML.tagName.split( ":" );
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
        
        
        // 获取节点属性对
        getNodeAttributekeyValues: function( nodeXML ) {
            var nodeAttributekeyValues = new spaceData.List();
            for ( var i = 0; i < nodeXML.attributes.length; i++ ) {
                nodeAttributekeyValues.add( nodeXML.attributes[i].nodeName, nodeXML.attributes[i].nodeValue );
            }
            return nodeAttributekeyValues;
        },
        
        
        // 获取节点类型信息
        getNodeType: function( node ){
	                        if( node ){
		                        if ( node.nodeType === 1 ) {
			                        return "ELEMENT_NODE";							
		                        }
		                        if ( node.nodeType === 2 ) {
			                        return "ATTRIBUTE_NODE";						
		                        }
		                        if ( node.nodeType === 3 ) {
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
		                        if ( node.nodeType ===7 ) {
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
                        }
   }
   
   JPM.nameSpace(
        "Web.DOM",
        "XMLDom",XMLDom
        );
} )();