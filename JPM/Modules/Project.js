/*--
    本文件主要用于定义Project类[该类用于存储项目信息]
        公有：
          属性：
            name                 项目名称
            catalog              项目目录Url
            configFile           项目配制文件
            files                项目js文件集合[类型为数组]
            libs                 动态链接库集合
            classConfig          项目中类配制集合
            constantConfig       项目中对象配制集合
            main                 项目主方法url
          方法：
            getType              获取对象类型
            nameSpace            名称空间方法
            spaceUsing           名称空间使用方法
            loadData             项目数据加载方法
        私有：
          属性：
            space                项目空间
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
        return "Project";
    }

    // 加载链接库数据
    function loadData( configText ) {
    
        // 类库集合
        var libs = new Array();                                                                  
        
        var project=this;
        
        // 配制节点解析方法
        function handler( node ) {

            // 解析include标签
            if(node.tagName && node.tagName === "include") {
                
                var webUrl = window[JPM.moduleSpaceName].url;
            
                // 解析file标签
                var fileNodes = node.getElementsByTagName( "file" );
                for ( var i = 0; i < fileNodes.length; i++ ) {                                            
                    var src = removeRoom( fileNodes[i].getAttribute( "src" ) );
                    if( src ) {
                        project.files.push( webUrl.parseAbs( src, project.configFile ) );
                    }
                }
                
                 // 解析lib标签
                var libNodes = node.getElementsByTagName("lib");
                for ( var i = 0; i < libNodes.length; i++ ) {                                            
                    var name = removeRoom( libNodes[i].getAttribute("name") );
                    catalog = webUrl.parseAbs( removeRoom(libNodes[i].getAttribute( "catalog" )), project.configFile );
                    
                    // 创建动态链接库
                    libs[libs.length] = new window[JPM.moduleSpaceName].Lib( name, catalog, catalog + "config.js" );
                    libs[libs.length - 1].catalog = catalog;                
                }
            } 
            
            // 解析classConfig标签
            if(node.tagName && node.tagName === "classConfig") {
                
                // 解析class标签
                var classNodes = node.getElementsByTagName( "class" );                             
                for(var i=0;i<classNodes.length;i++){
                
                     // classUrl                获取受配制类的Url
                     // propertyConfigStack     创建属性配制栈
                     // propertyNodes           获取属性节点
                     var classUrl = removeRoom( classNodes[i].getAttribute( "name" ) );
                     
                     // 解析property标签
                     var propertyConfigStack = new Array();
                     var propertyNodes = classNodes[i].getElementsByTagName( "property" );
                     for ( var j=0; j < propertyNodes.length; j++ ) {
                        
                        // 获取class标签中的name、value属性值
                        var name = removeRoom( propertyNodes[j].getAttribute( "name" ) );
                        var value = removeRoom( propertyNodes[j].getAttribute( "value" ) );
                        
                        // 创建属性配制对象
                        var propertyConfig = {};
                        propertyConfig.name = name;
                        propertyConfig.value = value;
                        
                        //将属性配制对象压入栈内
                        propertyConfigStack.push(propertyConfig);                                 
                     }
                     
                     // 将类的配制压加入classConfig集合中(如果classConfig集合中已有对象的classUrl则在该classUrl对应栈内压入配制对象)
                     if ( project.classConfig[classUrl] ) {
                        for ( var j = 0; j < propertyConfigStack.length; j++ ) {
                            project.classConfig[classUrl].push(propertyConfigStack[j]);
                        }
                     } else {
                        project.classConfig.add(classUrl,propertyConfigStack);
                     }
                }
            } 
            
            // 解析constantConfig标签
            if(node.tagName && node.tagName=="constantConfig") {
                
                // 解析constant标签
                var constantNodes = node.getElementsByTagName("constant");                         
                for ( var i = 0; i < constantNodes.length; i++ ){
                
                     // constantUrl             受配制常量的Url
                     // propertyNodes           受属性属性集合
                     // propertyConfigStack     属性配制栈
                     var constantUrl = removeRoom( constantNodes[i].getAttribute("name") );
                     
                     // 解析property标签
                     var propertyNodes=constantNodes[i].getElementsByTagName("property");
                     var propertyConfigStack = new Array();
                     for ( var j = 0; j < propertyNodes.length; j++ ) {
                     
                        //获取constant标签中的name、value属性值
                        var name = removeRoom( propertyNodes[j].getAttribute("name") );
                        var value = removeRoom( propertyNodes[j].getAttribute("value") );
                        
                        //创建属性配制对象
                        var propertyConfig={};
                        propertyConfig.name = name;
                        propertyConfig.value = value;
                        
                        //将属性配制对象压入栈内
                        propertyConfigStack.push(propertyConfig);                                   
                     }
                     
                     // 将常量的配制压加入constantConfig集合中(如果constantConfig集合中已有对象的constantUrl则在该constantUrl对应栈内压入配制对象)
                     if ( project.constantConfig[constantUrl] ) {
                        for ( var j = 0; j < propertyConfigStack.length; j++ ) {
                            project.constantConfig[constantUrl].push(propertyConfigStack[j]);
                        }
                     } else {
                        project.constantConfig.add(constantUrl, propertyConfigStack);
                     }
                }
                
            }
            
            // 解析main标签
            if(node.tagName && node.tagName === "main") {
                project.main = removeRoom( node.getAttribute( "name" ) );
            }
        }
        
        // 解析项目
        xmlDom = window[JPM.moduleSpaceName].Xml.parseXMLText( configText );                  
        window[JPM.moduleSpaceName].Xml.traversals( xmlDom, handler );
        
        return libs;
    }
    
    // 定义Project类
    window[JPM.moduleSpaceName].Project = function ( name, catalog, configFile) { 
    
        var space = new window[JPM.moduleSpaceName].Space();
    
        /*--属性定义开始--*/
        this.name = name
        this.catalog = "";
        this.configFile = configFile;
        this.files = new Array();
        this.classConfig = new window[JPM.moduleSpaceName].List();
        this.constantConfig = new window[JPM.moduleSpaceName].List();
        this.libs= new window[JPM.moduleSpaceName].List();
        /*--属性定义结束--*/
        
        /*--定义方法开始--*/
        this.getType = getType;
        this.nameSpace = function(url,name,obj) {space.nameSpace(url,name,obj)};
        this.spaceUsing = function (url) {return space.spaceUsing(url);};
        this.loadData = loadData;
        this.main = "";
        /*--定义方法结束--*/
    }
} )();