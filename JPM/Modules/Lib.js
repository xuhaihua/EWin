/*--
    本文件主要用于定义Lib类[该类用于存储链接库信息]
        公有:
          属性:
            name                 类库名称
            catalog              类库目录url
            configFile           类库配制文件
            files                类库js文件集合[类型为数组]
            classConfig          类库中类配制集合[类型为List]
            constantConfig       类库中对象配制集合[类型为List]
            main                 项目主方法url
          方法:
            getType              获取对象类型
            loadData             类库数据加载方法
--*/
( function() {

    // 移除空隔(如果str是字符串则去除它的所有空间，反之返回原对象)[私有]
    function removeRoom( obj ) {
        if ( obj && (typeof obj)==="string" ) {
            return obj.replace(/\s+/g,"")
        } else {
            return obj;
        }
    }

    // 获取类型
    function getType() {
        return "Lib";
    }

    // 加载链接库数据
    function loadData(configText) {
        
        // 类库集合
        var libs = new Array();                                                                  
        
        var lib=this;
        
        // 配制节点解析方法
        function handler( node ) {

            // 解析include标签
            if(node.tagName && node.tagName=="include") {
            
                var webUrl = window[JPM.moduleSpaceName].url;
                
                // 解析file标签
                var fileNodes = node.getElementsByTagName("file");
                for ( var i = 0; i < fileNodes.length; i++ ) {                                            
                    var src = removeRoom( fileNodes[i].getAttribute( "src" ) );
                        lib.files.push( webUrl.parseAbs( src, lib.catalog) );
                }
                
                // 解析lib标签
                var libNodes = node.getElementsByTagName("lib");
                for(var i=0;i<libNodes.length;i++) {                                             
                    var name = removeRoom( libNodes[i].getAttribute("name") );
                    catalog = webUrl.parseAbs( removeRoom(libNodes[i].getAttribute("catalog")), lib.configFile );
                    
                    
                    // 创建动态链接库
                    libs[libs.length] = new window[JPM.moduleSpaceName].Lib( name, catalog, catalog + "config.js"); 
                    libs[libs.length - 1].catalog = catalog;               
                }
            } 
            
            // 解析classConfig标签
            if( node.tagName && node.tagName=="classConfig" ) {
                
                // 获取class标签集
                var classNodes = node.getElementsByTagName( "class" );                            
                for(var i=0;i<classNodes.length;i++){
                
                     // 获取受配制类的Url
                     var classUrl=removeRoom( classNodes[i].getAttribute("name") );                             
                     
                     // 解析property标签
                     var propertyConfigStack = new Array();                                      
                     var propertyNodes = classNodes[i].getElementsByTagName( "property" );         
                     for ( var j = 0; j < propertyNodes.length; j++ ) {
                        
                        // 获取class标签中的name、value属性值
                        var name = removeRoom( propertyNodes[j].getAttribute( "name" ) );
                        var value = removeRoom( propertyNodes[j].getAttribute( "value" ) );
                        
                        // 创建属性配制对象
                        var propertyConfig = {};
                        propertyConfig.name = name;
                        propertyConfig.value = value;
                        
                        // 将属性配制对象压入栈内
                        propertyConfigStack.push(propertyConfig);                                 
                     }
                     
                     // 将类的配制栈加入classConfig集合中(如果classConfig集合中已有对象的classUrl则在该classUrl对应栈内压入配制对象)
                     if(lib.classConfig[classUrl]) {
                        for(var j=0; j<propertyConfigStack.length; j++) {
                            lib.classConfig[classUrl].push(propertyConfigStack[j]);
                        }
                     } else {
                        lib.classConfig.add(classUrl,propertyConfigStack);
                     }
                }
            } 
            
            // 解析constantConfig标签
            if ( node.tagName && node.tagName === "constantConfig" ) {
                
                // 解析constant标签
                var constantNodes = node.getElementsByTagName( "constant" );                         
                for(var i=0;i<constantNodes.length;i++){
                
                     // constantUrl 获取受配制常量的Url
                     var constantUrl = removeRoom( constantNodes[i].getAttribute( "name" ) );
                     
                     // 解析property标签
                     var propertyConfigStack = new Array();
                     var propertyNodes=constantNodes[i].getElementsByTagName( "property" );
                     for ( var j = 0;j < propertyNodes.length; j++ ) {
                     
                        // 获取constant标签中的name、value属性值
                        var name = removeRoom( propertyNodes[j].getAttribute("name") );
                        var value = removeRoom( propertyNodes[j].getAttribute("value") );
                        
                        // 创建属性配制对象
                        var propertyConfig = {};
                        propertyConfig.name = name;
                        propertyConfig.value = value;
                        
                        // 将属性配制对象压入栈内
                        propertyConfigStack.push( propertyConfig );                                   
                     }
                     
                     // 将常量的配制压入加入constantConfig集合中(如果constantConfig集合中已有对象的constantUrl则在该constantUrl对应栈内压入配制对象)
                     if(lib.constantConfig[constantUrl]) {                                          
                        for(var j=0; j<propertyConfigStack.length; j++) {
                            lib.constantConfig[constantUrl].push(propertyConfigStack[j]);
                        }
                     } else {
                        lib.constantConfig.add(constantUrl,propertyConfigStack);
                     }
                }
                
            }
            
            // 解析main标签
            if(node.tagName && node.tagName == "main") {
                lib.main = removeRoom( node.getAttribute("name") );
            }
        }
        
        // 解析动态链接库
        xmlDom = window[JPM.moduleSpaceName].Xml.parseXMLText( configText );                       
        window[JPM.moduleSpaceName].Xml.traversals( xmlDom, handler );
        
        //返回引用的类库集
        return libs;
    }
    
    //定义Lib类
    window[JPM.moduleSpaceName].Lib = function (name,pack,configFile) {
    
        /*--属性定义开始--*/
        this.name = name;
        this.catalog = "";
        this.configFile = configFile;
        this.files = new Array();
        this.classConfig = new window[JPM.moduleSpaceName].List();
        this.constantConfig = new window[JPM.moduleSpaceName].List();
        this.main = "";
        /*--属性定义结束--*/
        
        /*--方法定义开始--*/
        this.getType = getType;
        this.loadData = loadData;
        /*--方法定义结束--*/
    }
} )();