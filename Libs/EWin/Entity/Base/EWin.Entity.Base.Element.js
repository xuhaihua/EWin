
/*--
    本文件用于定义Element类,该类继承自Data.TreeNode
        所属名称空间:
            EWin.Entity.Base
        公有:
          方法:
            getType                            获取对象类型
            getLeft;                           获取元素X坐标
            getTop;                            获取元素Y坐标
            setLeft;                           设置元素X坐标
            setTop;                            设置元素Y坐标
            getWidth;                          获取元素宽度
            getHeight;                         获取元素高度
            setWidth;                          设置宽度
            setHeight;                         设置高度
            setWidthByOffset;                  按偏移量设置宽度
            setHeightByOffset;                 按偏移量设置高度
            show;                              元素显示
            hide;                              元素隐藏
            getChildElements;                  获取子元素集
            addElement;                        添加子元素方法
            removeElement;                     移除子元素方法
            load                               加载方法
        私有:
            upperFirstLetter                   首字母小写
--*/
( function() {
    // 类型及对象引用
    eval( JPM.spaceUsing("Web.DOM" , "HTMLDom,XMLDom") );
    eval( JPM.spaceUsing("Data" , "guid") );
    eval( JPM.spaceUsing("Web" , "css") );
    eval( JPM.spaceUsing("EWin" , "eWin,elementParse") );
    eval( JPM.spaceUsing("Data" , "List,TreeNode") );
    eval( JPM.spaceUsing("EWin.Entity.Base","Element") );
    eval( JPM.spaceUsing("EWin","IElement,elementParse") );
    
    
    
    
    // 获取对象类型
    function getType() { 
        return "Element";
    }

    // 获取元素X坐标
    function getLeft() {
        return parseInt( css.getNodeComputedStyles(this.tagNode)["left"].replace("px","") );
    }
    
    // 获取元素Y坐标
    function getTop() {
        return parseInt( css.getNodeComputedStyles(this.tagNode)["top"].replace("px","") );
    }
    
    // 设置元素X坐标
    function setLeft( left ) {this.tagNode.style.left = left+"px";}
    
    // 设置元素Y坐标
    function setTop( top ){ 
        this.tagNode.style.top = top+"px";
    }
    
    // 获取宽度
    function getHeight(tr) {
        return parseInt( css.getNodeComputedStyles(this.tagNode)["height"].replace( "px","" ) );
    }
    
    // 获取宽度
    function getWidth() {
        return parseInt( css.getNodeComputedStyles(this.tagNode)["width"].replace( "px","" ) );
    }
    
    // 设置宽度
    function setWidth( width ) { 
        this.tagNode.style.width = width + "px";
    }
    
    // 设置高度
    function setHeight( height ) {
        this.tagNode.style.height = height + "px";
    }
    
    // 按偏移量设置宽度
    function setWidthByOffset( offset ) { 
        this.setWidth( this.getWidth() + offset );
    }
    
    // 按偏移量设置高度
    function setHeightByOffset( offset ) {
        this.setHeight( this.getHeight() + offset );
    }
    
    // 元素显示
    function show() {
        this.tagNode.style.display = "block";
    }
    
    // 元素隐藏
    function hide() {this.tagNode.style.display="none"; }
    
    // 获取子元素集
    function getChildElements() {
         return this.getChilds();
    }
    
    // 添加项方法[当mode为insert时需要设置relElement参数(参照元素)]
    function addElement ( element, mode, relElement) {
       
       // 执行add事件
       this.addEvent();                     
    
       if ((typeof element) === "string" ) {
           var elementString = element;        
           var documentFragment = XMLDom.xmlStringToHTMLDom( elementString );
           var tagNode = null;
           var test = {};
           
           // 获取documentFragment下的第一个元素节点
           for ( var i = 0; i < documentFragment.childNodes.length; i++ ) {
              if( HTMLDom.getNodeType( childs[i]) === "ELEMENT_NODE" ) {
                 for ( var n in elementParse.map) {
                     if ( !test[n] ) {
                        var tagSign = elementParse.map[n]["sign"];
                        if ( eWin.checkElementStyleClass(upperFirstLetter(tagSign),nodeHTML) || tagSign.toLocaleUpperCase() == childs[i].tagName.toLocaleUpperCase() ) {
                            tagNode = childs[i];
                            break;
                        }
                     }
                 }
                 if ( tagNode ) {
                    break;
                 }
              }
           }
           
           // 添加该元素
           if ( tagNode ) {
                if ( mode === "insert" ) {
                    this.tagNode.insertBefore( tagNode, relElement.tagNode )
                } else {
                    this.tagNode.appendChild( tagNode )
                }
                this.load( elementParse.map, tagNode );
                
                // 如果该元素添加成功则返回该元素，反之则在Dom层中删除刚刚插入的节点
                if( tagNode.getAttribute("data-ewin-indexguid") ) {
                    return eWin.getElement( tagNode.getAttribute("data-ewin-indexguid") );
                } else {
                    this.tagNode.removeChild( tagNode );
                }
           }
           
           return null;
           
        } else {
            
            //  检索参数element是否为当前元素允许的子元素
            if ( !elementParse.map[this.getType()]["childElementList"][element.getType()] && !elementParse.map[this.getType()]["childElementList"]["any"] || elementParse.map[this.getType()]["childElementList"]["parentChildList"] && !elementParse.map[this.parentNode.getType()]["childElementList"][element.getType()]) { 
                return null;
            }
            
            // 添加该元素
            if( mode === "insert" ) {
                 this.tagNode.insertBefore( element.tagNode, relElement.tagNode);
                 this.insertBefore( element, relElement );
            } else {
                 this.tagNode.appendChild( element.tagNode ); 
                 this.append( element );
            }
            
            // 恢复element及其子元素在eWin中的引用
            var items = element.eWinIndexList.getItemsValue();
            for ( var i=0; i<items.length; i++ ) {
              eWin.addItem( items[i].tagNode.getAttribute("data-ewin-indexguid"), items[i] );
            }
            return element;
        }
    }
    
    // 移除项
    function removeElement( element ) {
        
        // 执行remove事件
        this.removeEvent();                 
    
        var list = new List();
        
        // 删除eWin中的相应项
        function handler(node) {
            var indexguid = node.getAttribute( "data-ewin-indexguid" );
            if( indexguid ) {
                var item = eWin.getItem( indexguid );
                list.add( item );  
                eWin.removeItem( item );
            }
        }
        HTMLDom.backwardTravevsal( element.tagNode, handler );
        
        // 移除element
        element.tagNode.parentNode.removeChild( element.tagNode );                    
        this.removeChild(element); 
        
        // eWinIndexList 元素在eWin中的索引集合                                                               
        element.eWinIndexList = list;                                                               
        
        return element;
    }
    
    //首字母小写[私有]
    function upperFirstLetter(str) {   
       return str.substring(0,1).toLowerCase() +  str.substring(1);   
    }  
   
    //加载方法
    function load( parseMap ) {
        
        // elementInfo  元素信息[包含：元素数量上限，允许的子元素，在加载时需要被赋值的属性]
        // iterators    加载处理片段集合
        // test         测试对象
        var elementInfo = parseMap[ this.getType() ];
       
        var iterators = new Array();
        if( arguments.length === 2 || arguments.length === 3 ) {
            if ( (typeof arguments[1]) === "function") {
                iterators.push( arguments[1] );
            }
        }

        var test = {}; 
        
        // 按parseMap中的信息动态创建处理器片段
        var currentElement = this;
        
        var childElementList = {};
        
        if ( elementInfo["childElementList"]["parentChildList"] && !elementInfo["childElementList"]["any"] ) {
            if ( this.parentNode ) {
               for ( var n in parseMap[ this.parentNode.getType() ]["childElementList"] ) {
                    if ( n != "parentChildList" && !test[n] ) {
                        childElementList[n] = parseMap[ this.parentNode.getType() ]["childElementList"][n];
                    }
               }
            }
        }
        
        if( !elementInfo["childElementList"]["any"] ) { 
            for ( var n in elementInfo["childElementList"] ) {
                if ( n != "parentChildList" && !test[n] ) {
                    childElementList[n] = elementInfo["childElementList"][n];
                }
            }
        } else {
            for ( var n in parseMap ) {
                if ( !test[n] ) {
                    childElementList[n] = parseMap[n];
                }
            }
        }
        
        for ( var n in childElementList ) {
            
            //  独立作用域环境
            ( function() {
                if ( !test[n] ) {
                    var ChildElement = childElementList[n];
                    
                    var superiorLimit = parseMap[n]["superiorLimit"];
                   
                    var tagSign = parseMap[n]["sign"]
                    
                    iterators[iterators.length] = function (nodeHTML) {
                        
                        // 定义元素数量统计变量
                        if ( superiorLimit != 0 && !elementCount ) {
                            var elementCount = 0;
                        }
                        
                        // 定义元素加载使能标记
                        if ( !isUnEnable ) {
                            var isUnEnable = false;
                        }
                        if ( !isUnEnable && (eWin.checkElementStyleClass(upperFirstLetter(tagSign),nodeHTML) || tagSign.toLocaleUpperCase() == nodeHTML.tagName.toLocaleUpperCase()) ) {
                            
                            if ( !nodeHTML.getAttribute("data-ewin-indexguid") ) {
                               
                                // 设置索引键indexguid
                                var indexGuid = guid.build();
                                nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                                
                                // 创建子元素对象
                                var childElement = new ChildElement( nodeHTML );
                                currentElement.append( childElement );
                                eWin.addItem( indexGuid, childElement );
                                
                                // 给元素相应属性赋值
                                for ( var i = 0; i < parseMap[currentElement.getType()]["assignmentList"].length; i++) {
                                    if ( parseMap[currentElement.getType()]["assignmentList"][i] === parseMap[childElement.getType()].sign ) {
                                        currentElement[ parseMap[currentElement.getType()]["assignmentList"][i] ] = childElement;
                                    }
                                }
                                
                                // 计算是否允许对本类元素再次加载
                                if ( elementCount ) {
                                    ++elementCount;
                                    if(elementCount === superiorLimit) {
                                        isUnEnable = true;
                                    }
                                }
                                
                                // 子元素加载
                                childElement.load(parseMap);
                                
                                // 放弃对当前节点的深度遍历
                                if(childElement.parentNode == currentElement) {
                                    return "giveUp"
                                }
                            }
                        }
                    }
                }
             } )();
        }
  
        // 定义处理器
        function handler( nodeHTML ) {
           if( HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE" ) {
               for ( var i = 0; i <iterators.length; i++ ) {
                     iterators[i]( nodeHTML );
               }
           }
           return true;
        }
        
        //定义查找的范围[防止遍历溢出]
        var tagNode = this.tagNode;
        if ( arguments.length === 2 || arguments.length === 3 ) {
            if ( (typeof arguments[1]) === "object" ) {
                tagNode = arguments[1];
            } else if ( (typeof arguments[2]) === "object" ) {
                tagNode = arguments[2];
            }
        }
        
        function range( node ) {
            if ( node === tagNode ) {
                return true;
            }
        }
        
        //解析执行
        HTMLDom.backwardTravevsal( this.tagNode, handler, range );
    }

    //定义Element类
    JPM.nameSpace(
        "EWin.Entity.Base",
        
        function Element() {
            this.getType = getType                            //获取对象类型
            this.getLeft = getLeft;                           //获取元素X坐标
            this.getTop = getTop;                             //获取元素Y坐标
            this.setLeft = setLeft;                           //设置元素X坐标
            this.setTop = setTop;                             //设置元素Y坐标
            this.getWidth=getWidth;                           //获取元素宽度
            this.getHeight=getHeight;                         //获取元素高度
            this.setWidth = setWidth;                         //设置宽度
            this.setHeight = setHeight;                       //设置高度
            this.setWidthByOffset = setWidthByOffset;         //按偏移量设置宽度
            this.setHeightByOffset = setHeightByOffset;       //按偏移量设置高度
            this.show=show;                                   //元素显示
            this.hide=hide;                                   //元素隐藏
            this.getChildElements=getChildElements;           //获取子元素集
            this.addElement = addElement;                     //添加子元素方法
            this.removeElement = removeElement;               //移除子元素方法
            this.load=load;                                   //加载
        }
    )
    
    Element.prototype = new TreeNode();
} )();