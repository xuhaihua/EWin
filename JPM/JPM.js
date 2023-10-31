/*--
    本文件主要用于定义JPM对象，该对象用于加载及管理项目，并对外开放用户操作接口
        公有： 
            属性：
               jpmCodeKey        JPM唯一标识符
               moduleSpaceName   JPM组件空间名称
               start             JPM状态
            方法
               IConfig           接口配制方法                          
               JConfig           JPM配制方法
               PConfig           项目配制方法
               setDefault        设置默认项目方法
               nameSpace         名称空间创建方法
               spaceUsing        名称空间使用方法
               virtualProperty   虚属性用户操作接口
               virtualMethod     虚方法用户操作接口
               addBufferList     缓冲对象添加方法
        私有：
            属性：
                jpmConfig       JPM配制实体
                projects        项目集合对象
                projectStack    项目栈
                fileStack       文件栈
                parseStack      解析栈
                tempStack       临时栈
                handleProject   目标项目[JPM在对项目加载期间该变量存诸着对当前项目对象的引用]
                handle          目标[JPM在对项目加载期间该变量主要用于存诸当前项目或链接库]
                jpmCatalog      JPM在站点中的所在目录
                objBufferList   对象引用缓冲列表[该列表主要存储已经使用了spaceUsing指令引用了某个对象但该对象却还尚未被加载]
            方法：
                guid            全球唯一标识符
                createInterface 接口实体工厂
                exeMain         项目或链接库的主函数执行方法
                load            加载方法
--*/
( function() {

    // 只能有一个JPM对象
    if ( window["JPM"] ) {
        alert( "在全局作用域下已经有了JPM本次加载未能成功!" )
        return ;
    }

    var projects ={};                     
    var projectStack = new Array();       
    var fileStack = new Array();
    var parseStack = new Array();         
    var tempStack = new Array();          
    var handleProject = null;             
    var handle = null;                    
    var jpmCatalog="";                   
    var objBufferList={}; 
    var checkBufferList = [];
       
    
    // 定义JPM配制实体对象[私有]
    var jpmConfig = {
         siteSpace: "",
         libsCatalog: "",
         projects: new Array(),
         defaultProject: {}
    } 
    
    
    // guid生成器[私有]
    var guidEndDate = 0;
    function guid() {
        var s = []; 
        var hexDigits = "0123456789abcdef"; 
        for (var i = 0; i < 36; i++) { 
            s[i] = hexDigits.substr( Math.floor(Math.random() * 0x10), 1 ); 
        } 
        s[14] = "4";  
        s[19] = hexDigits.substr( (s[19] & 0x3) | 0x8, 1 );  
        s[8] = s[13] = s[18] = s[23] = "-"; 
      
        guidEndDate++;
        var guid = s.join( "" ) + "-" + guidEndDate.toString();
        
        return "gu" + guid;
    }   
    
    // 移除空隔(如果str是字符串则去除它的所有空间，反之返回原对象)[私有]
    function removeRoom( obj ) {
        if ( obj && (typeof obj)==="string" ) {
            return obj.replace(/\s+/g,"")
        } else {
            return obj;
        }
    }
    
    // checkedTypes 检查过的类型集合      
    var checkedTypes = {};
    
    // 接口实体工厂[私有]
    function createInterface( space, name, inherit, properties, methods ) {
        
        function interFace(handleTypeName,err) {
            
            // 实例在具体类型中被直接继承时，将该类型的构造器添加至checkedTypes集合中
            if( (typeof handleTypeName) === "undefined" ) {
                var err={text: ""};
                var re=/^(\s*function\s*)([a-zA-Z]\w*)/;
                var result = re.exec( arguments.callee.caller.toString() );
                if(result.length > 2) {
                      var handleTypeName = result[2];
                      if ( !checkedTypes[name] ) {
                         checkedTypes[name] = arguments.callee.caller;
                      } else {
                         return true;
                      }
                } 
            }
            
            // 对接口中描述的属性进行验证
            for ( var i=0; i < properties.length; i++ ) {
            
                if( (typeof this[properties[i].name]) === "undefined" ){
                    err.text = err.text + "JPM提示：类型" + handleTypeName + "尚未实现" + name + "接口中定义的" + properties[i].name + "属性!\n";
                }
                
                
                // 对属性的类型验证
                if ( (typeof this[properties[i].name]) != "undefined" ) {
                
                    var propertieType = properties[i].value;
                
                    // 引用类型标识 
                    var isRelType = !(propertieType === "number" ||  propertieType === "string" || propertieType === "boolean");
                
                    if( !(this[properties[i].name] === null && isRelType) ) {
                
                        if ( properties[i].value != "any" && ( properties[i].value === "number" || properties[i].value === "object" || properties[i].value === "function" || properties[i].value === "string" || properties[i].value=== "boolean") ) {   
                            
                            //  基础类型验证
                            if ( (typeof this[properties[i].name]) != properties[i].value ) {   
                                err.text = err.text + "JPM提示：类型" + handleTypeName +"未正确的实现"+ name +"接口中定义的"  + properties[i].name + "属性的类型!\n";
                            } 
                        } else {
                            
                            // 引用类型验证
                            if ( properties[i].value != "any" ) {
                                
                                 // 类型url分析
                                 var typeUrl = properties[i].value;
                                 var typeUrlParts = typeUrl.split(".");
                                 var typeName = "";
                                 var typeSpaceUrl = "";
                                 if ( typeUrlParts.length > 0 ) {
                                    typeName=typeUrlParts[typeUrlParts.length-1];
                                    if ( typeUrlParts.length > 1 ) {
                                        for ( var j = 0; j < typeUrlParts.length - 1; j++ ) {
                                            if ( !typeSpaceUrl ) {
                                                typeSpaceUrl = typeSpaceUrl + typeUrlParts[j];
                                            } else {
                                                typeSpaceUrl = typeSpaceUrl + "." + typeUrlParts[j];
                                            }
                                        }
                                    }
                                 }
                                 
                                 // 获取类型
                                 var value = JPM.spaceUsing(typeSpaceUrl)[typeName]
                                 
                                 if ( value && !(this[properties[i].name] instanceof value) ) {
                                    err.text = err.text + "JPM提示：类型" + handleTypeName +"未正确的实现"+ name +"接口中定义的"  + properties[i].name + "属性的类型!\n";
                                 } else {
                                    if ( !value ) {
                                        err.text = err.text+"JPM提示：系统中不存在" + name + "接口的" + properties[i].name + "属性所指定类型\n";
                                    }
                                 }
                            }
                        }
                    }
                }
            }
            
            // 对方法进行验证
            for ( var i = 0; i < methods.length; i++ ) {
            
                if( (typeof this[methods[i].name]) === "undefined" ) {
                    err.text = err.text + "JPM提示：类型" + handleTypeName + "尚未实现" + name + "接口中定义的" + methods[i].name+"方法!\n";
                } else {
                
                     // 对方法类型验证
                    if ( (typeof this[methods[i].name]) != "function" ) {
                        err.text = err.text + "JPM提示：" + methods[i].name + "方法的类型只能是function!\n";
                    }
                }
            }

            // 对继承处理
            if( inherit ) {
                var inheritParts = inherit.split(",");
                for ( var i = 0; i < inheritParts.length; i++ ) {
                
                    var inheritPart = inheritParts[i];
                    var iName = "";
                    var space = "";
                    var urlPart = inheritPart.split(".");
                    
                    // url分析
                    if ( urlPart.length > 0 ) {
                        iName = urlPart[urlPart.length - 1];
                        if ( urlPart.length > 1 ) {
                            for ( var j = 0; j < urlPart.length-1; j++) {
                                if ( j != 0 ) {
                                    space = space+"."+ urlPart[j];
                                } else {
                                    space = space + urlPart[j];
                                }
                                
                            }
                        }
                     }
                     
                     var inheritInterface = JPM.spaceUsing( space )[iName];
                     
                     if ( inheritInterface ) {
                        inheritInterface.call( this,handleTypeName,err );
                     } else {
                     
                        
                        alert( "JPM提示：没有找到父接口:"+iName+"!\n" )
                     }
                 }
            }
            
            
            // JPM报错
            if( err.text && arguments.length === 0 ) {
                alert( err.text );
            }
            
        }
        
        return interFace;
    }
    

    // 主函数执行方法[私有]
    function exeMain() {
        if ( handle.main ) {
        
           // spaceName  空间名称
           // methodName 方法名称
           var spaceName = "";
           var methodName = "";
           
           // url分析
           var urls = handle.main.split(".");
           if ( urls.length > 1 ) {
               for ( var i=0; i<urls.length-1; i++ ) {
                    if(i == 0) {
                        spaceName = spaceName + urls[i];
                    } else {
                        spaceName = spaceName + "." + urls[i];
                    }
               }
               methodName = urls[urls.length-1];
           } else {
               methodName = handle.main;
           }
           
           // 获取主方法并执行
           var mainMethod =  JPM.spaceUsing( spaceName )[methodName];
           if ( (typeof mainMethod === "function") ) {
               mainMethod();
           }
        }
    }
    
    
    // 设置默认项目
    function setDefault( projectName ) {
        if(projects[projectName]) {
            jpmConfig.defaultProject = projects[projectName];
        } else {
            alert("JPM提示:"+"您设置的名为:"+projectName+"项目不存在!");
        }
    }
    
    
    // JPM配制方法
    function JConfig( configText ) { 
        var webUrl = window[JPM.moduleSpaceName].url;
        
        // 处理器定义
        function handler( node ) {

            // 解析websit标签
            if ( node.tagName && node.tagName === "website" ) {
            
                // 获取和设置站点所在的空间
                space = removeRoom( node.getAttribute( "siteSpace" ) );
                if ( space ) {
                    jpmConfig.siteSpace = space;  
                }  
            } 
            
            // 解析projects标签
            if ( node.tagName && node.tagName === "projects" ) {
                var projectsNodes = node.getElementsByTagName( "project" );
                for ( var i=0; i < projectsNodes.length; i++ ) {
                
                    // 计算项目名称、项目路径、项目配制文件地址
                    var name = removeRoom( projectsNodes[i].getAttribute("name") );
                    
                    var catalog = webUrl.parseAbs( removeRoom(projectsNodes[i].getAttribute("catalog")), jpmCatalog );
                    
                    var configFile = catalog + "config.js";
                    
                    // 创建项目并将项目压入JPM配制信息中去
                    var project = new window[JPM.moduleSpaceName].Project( name, catalog, configFile ); 
                    project.catalog =  catalog;
                    jpmConfig.projects.push( project );
                    
                    // 设置默认项目;
                    var isDefault = removeRoom(projectsNodes[i].getAttribute( "isDefault" ));
                    if( isDefault && isDefault === "true" ) {                     
                        jpmConfig.defaultProject = project;
                    }
                    
                    //将项目加入项目集合中去
                    projects[project.name] = project;                                          
                }
            } 
        }
        
        // 编历解析JPM配制信息
        xmlDom = window[JPM.moduleSpaceName].Xml.parseXMLText( configText );  
        window[JPM.moduleSpaceName].Xml.traversals( xmlDom.getElementsByTagName( "JPM" )[0], handler );
        
        //当配制中没有指明默认项目时将第一个项目作为默认项目
        if( !jpmConfig.defaultProject ) {                                                        
            jpmConfig.defaultProject = jpmConfig.projects[0];
        }
    }
    
    
    //项目配制方法[公有]
    function PConfig(configText) {
    
        // 对目标库或项目进行数据加载
        var libs = handle.loadData( configText );                                                
        
        // 当项目中该类库不存在时则压入解析栈
        for(var i = 0; i < libs.length; i++) {  
            if( !handleProject.libs[libs[i].configFile] ) {   
                handleProject.libs[libs[i].configFile] = libs[i];
                parseStack.push(libs[i]);  
            }
        }
    }
    
    
    // 接口定义配制方法
    function IConfig( iConfigText ) {

        // 处理器定义
        function handler( node ) {
            
            // 解析interface标签
            if ( node.tagName && node.tagName === "interface" ) {
            
                // name         节点属性名
                // inherit      继承的接口url
                // space     接口的名称空间url
                
                name = removeRoom( node.getAttribute( "name" ) );
                inherit = removeRoom( node.getAttribute( "inherit" ) );
                space = removeRoom( node.getAttribute( "space" ) );
            }
            
            // 解析properties标签
            if ( node.tagName && node.tagName == "properties" ) {
            
                var propertyNodes = node.getElementsByTagName( "property" );
                for ( var i = 0; i < propertyNodes.length; i++ ) {
                    var property = {};                                              
                    var value = removeRoom( propertyNodes[i].getAttribute( "value" ) );
                    
                    //给属性对象赋值
                    if ( value ) {
                        property["value"] = value;
                    } else {
                        property["value"] = "any";
                    }
                    
                    property["name"] = removeRoom( propertyNodes[i].getAttribute( "name" ) );       
                    properties.push( property );
                }
            }
            
            // 解析methodes标签
            if ( node.tagName && node.tagName === "methods" ) {
                var methodNodes = node.getElementsByTagName( "method" );
                for ( var i = 0; i < methodNodes.length; i++ ) {
                    var method = {};                                             
                    method.name = removeRoom( methodNodes[i].getAttribute("name") );         
                    methods.push( method );
                }
            }
        }
        
        xmlDom = window[JPM.moduleSpaceName].Xml.parseXMLText(iConfigText);                  
        var interfaceNodes = xmlDom.getElementsByTagName( "interfaces" )[0].getElementsByTagName( "interface" );
        
        // 编历解析每个interface
        for ( var i=0; i<interfaceNodes.length; i++ ) {
             var name = "";
             var inherit = "";
             var space = "";
             var properties = new Array();
             var methods = new Array();

            window[JPM.moduleSpaceName].Xml.traversals( interfaceNodes[i], handler );
            
            
            var iface = createInterface( space, name, inherit, properties, methods );
            
            //将接口加入名称空间
            JPM.nameSpace( space, name, iface );
        }
       
        return true;
    }
    
    
    // 添加缓冲引用对象的方法
    function addBufferList ( projectName, url, variableName, bufferHandle ) {
        if(!objBufferList[projectName]) {
            objBufferList[projectName] = {};
        }
        if(!objBufferList[projectName][url]) {
            objBufferList[projectName][url] = {};
        }
        
        if(!objBufferList[projectName][url][variableName]) {
            objBufferList[projectName][url][variableName] = new Array();
        }
        
        objBufferList[projectName][url][variableName].push(bufferHandle);
    }
    
    // 名称空间创建方法[成功返回true,反之则返回false]
    function nameSpace( url ) {
    
        // isQuote          项目引用逻辑标记
        // quoteProjectName 引用项目名称
        // lastarg          方法最后参数
        var isQuote = false; 
        var quoteProjectName = null;                      
        var lastarg = arguments[arguments.length-1];      
        
        if ( JPM.start != "run" ) {
            alert("JPM报警：JPM尚未被运行所以创建名称空间失败,请先运行JPM! JPM.run  !\n");
            return false;
        }
        
        // 对url验证
        if ( (typeof url) != "string" ) {
            alert("JPM报警：在创建名称空间时,参数url必须为string类型!\n");
            return false;
        }
        
        // 对参数数据进行验证
        if ( !(arguments.length >= 2) ) {
            alert( "JPM报警：在创建名称空间时,传入的参数个数必须大于或等于2!\n" );
            return false;
        }
        
        // 项目引用解析
        if ( (typeof lastarg) === "string" ){
            var re=/^(\s*quote\s+)([a-zA-Z]\w*)/;
            var isQuote = re.test(lastarg);
            if ( isQuote ) {
                var results = re.exec( lastarg );
                quoteProjectName = removeRoom( results[2] );
            }
        }
        
        // 引用验证
        if( isQuote ) {
            if( !quoteProjectName ) {
                alert( "JPM报警：在创建名称空间时,未指定明确的引用项目!\n" );
                return false;
            }
            if( !projects[quoteProjectName] ) {
                alert( "JPM报警：在创建名称空间时,未找到指定的引用项目!\n" );
                return false;
            }
        }
        
        // 方法参数解析[获取并保存对象名、值对]
        var args = new Array();
        var length = 0;
        if ( isQuote ) {
            length = arguments.length - 1;
        } else {
            length = arguments.length;
            
        }
        for(var i = 1; i < length; i++) {
            args[args.length] = arguments[i];
        }

        //验证方法参数并同时获取加入空间的对象键值表
        // test 方法参数格式验证逻辑标记
        // name_valueKeys对象键值表
        var test = true;
        var name_valueKeys = new  window[JPM.moduleSpaceName].List(); 
        for ( var i = 0; i < args.length; i++ ) {
            if( (typeof args[i])==="string" &&  removeRoom( args[i] ) != "" && args[i+1] ) {
                name_valueKeys.add( removeRoom( args[i] ), args[i+1] );
                i++;
            } else {
                if( (typeof args[i]) === "function" ) {
                    var re=/^(\s*function\s*)([a-zA-Z]\w*)/;
                    var result = re.exec(args[i].toString());
                    if(result.length > 2) {
                       name_valueKeys.add(result[2],args[i]);
                    } else {
                        test=false;
                    }
                }
            }
        }
        if( !test ) {
            alert( "JPM报警：在创建名称空间时,传入的参数不正确!\n" );
        }
        
        // 计算目标项目
        var target = null;
        if ( handle && !isQuote )  {
            target = handleProject;
        } else {
            if ( isQuote ) {
                target = projects[quoteProjectName];
            } else {
                target = jpmConfig.defaultProject;
            }
        }
        
        // 将类型或对象添加到对应的名称空间中去
        var names  = name_valueKeys.getItemsName();
        for ( var i = 0; i<names.length; i++ ) {
        
            // 将对象加入目标项目的名称空间中去
            target.nameSpace( url, names[i], name_valueKeys[names[i]] );                  
           
            // 刷新需要缓冲加载的对象
            if ( objBufferList[target.name] && objBufferList[target.name][url] && objBufferList[target.name][url][names[i]] ) {
               var bufferHandles = objBufferList[target.name][url][names[i]];
               while ( bufferHandles.length > 0 ) {
                    bufferHandles.pop()( name_valueKeys[names[i]] );
               }
               delete objBufferList[target.name][url][names[i]];
            }
        }
        
        // 刷新缓冲执行方法
        var tempArr = [];
        for(var i=0; i< checkBufferList.length; i++) {
        
            if(checkBufferList[i]()) {
                checkBufferList[i] = null;
            } else {
                tempArr[tempArr.length] = checkBufferList[i]
            }
        }
        
        while(checkBufferList.length>0) {
            checkBufferList.pop();
        }
        
        for(var i=0; i<tempArr.length; i++) {
            checkBufferList[checkBufferList.length] = tempArr[i];
        }
        
        return true;
    }
    
    // 添加缓冲执行方法
    function addCheckBufferList(f) {
        checkBufferList.unshift(f);
    }
    
    function check() {
    
        if(arguments<1) {
            alert( "JPM报警：check传参不正确  !\n" );
            return;
        }
    
        var code = "function checkFunction () { var isVaild = true; ";
        for(var i=0;i<arguments[0].length; i++) {
            code = code + "if (!" + arguments[0][i] +") {isVaild = false;};"
        }
        code = code + "if(isVaild) { try{"+arguments[arguments.length-1]+"();}catch(e){alert(e.message);}; return true;}};";
        
        code = code + "if(!checkFunction()) {" +
            "JPM.addCheckBufferList(checkFunction);" +
        "}"
        
        return code;
    }
    
    
    // 命名空间使用方法[成功返回对象，反之则返回false]
    function spaceUsing( url ) {
    
        // isQuote          项目引用逻辑标记
        // quoteProjectName 项目引用名
        // lastarg          最后参数
        var project = null;
        var isQuote = false;
        var quoteProjectName = null;
        var lastarg = arguments[arguments.length-1];
        
        if ( JPM.start != "run" ) {
            alert( "JPM报警：JPM尚未被运行所以创建名称空间失败,请先运行JPM! JPM.run  !\n" );
            return false;
        }
        
        // 对参数类型进行验证
        if ( arguments.length > 3 ) {
            alert("JPM报警：在使用名称空间时,传入的参数个数不能大于3!\n");
            return false;
        } else {
            for ( var i = 0; i < arguments.length; i++ ) {
                if ( (typeof arguments[i]) != "string" ) {
                    alert("JPM报警：在使用名称空间时,传入的参数类型只能为string\n");
                    return false;
                }
            }
        }
       
        // 项目引用解析
        if ( arguments.length > 1){
            var re=/^(\s*quote\s+)([a-zA-Z]\w*)/;
            var isQuote = re.test(lastarg);
            if(isQuote){
                var results = re.exec(lastarg);
                quoteProjectName = removeRoom( results[2] );
            }
        }
        
        // 当参数个数为3时第三个参数只能是引用说明
        if( arguments.length === 3 && !isQuote ) {
            alert( "JPM报警：传入spaceUsing的第三个参数格式不正确!\n" );
            return false;
        }
        
        
        // 对引用进行验证
        if ( isQuote ) {
            if ( !quoteProjectName ) {
                alert( "JPM报警：在使用名称空间时,未指定明确的引用项目!\n" );
                return false;
            } 
            if ( !projects[quoteProjectName] ) {
                alert( "JPM报警：在创建名称空间时,未找到指定的引用项目!\n" );
                return false;
            } 
        }
        
        // 计算目标项目
        var target = null;
        if(handle && !isQuote)  {
            target = handleProject;
        } else {
            if(isQuote) {
                target=projects[quoteProjectName];
            } else {
                target = jpmConfig.defaultProject;
            }
        }
        
        // eval模式下该方法返回的执行数据
        var evalString = "";
        if( arguments.length === 3 ||  arguments.length === 2 && !isQuote ) {
            var argValue = removeRoom( arguments[1] );
            
            // 还原引用
            var quoteString = "";
            if ( isQuote ) {
                quoteString = ",'" + arguments[arguments.length-1] + "'";
            }
            
            var argParts = argValue.split(",");
            if ( argParts.length > 0 && argValue != "*" ) {  
                
                // 返回列表中指定的对象            
                for ( var i = 0; i < argParts.length; i++ ) {
                    evalString = evalString +
                    "var " + argParts[i] + "=" + "JPM.spaceUsing('" + url+"'" + quoteString + ")['" +argParts[i]+"'];" +
                    "if(!"+argParts[i]+") {" +
                    
                            "JPM.addBufferList('" + target.name + "','" + url + "','" + argParts[i] + "'," +
                                "function (updateObj) {" +
                                    argParts[i] + "= updateObj;" +
                                "}" +
                            ");" +
                    "}"
                }
                
            } else {
                if ( argValue === "*" ) {     
                
                    // 返回此刻对应空间下的所有对象                          
                    var names = target.spaceUsing( url ).getItemsName();
                    for ( var i = 0; i < names.length; i++ ) {
                        evalString = evalString +
                        "var " + names[i] + "=" + "JPM.spaceUsing('" + url+"'" + quoteString + ")['" +names[i]+"'];" +
                        "if(!" + names[i] + ") {" +
                                
                             "JPM.addBufferList('" + target.name + "','" + url + "','" + names[i] + "'," +
                                "function (updateObj) {" +
                                    names[i] + "= updateObj;" +
                                "}" +
                            ");" +
                                
                        "}"
                    }
                }
            }
            
            return evalString;
        } 
        
        return target.spaceUsing( url );
    }
    
    
    // 虚属性
    function virtualProperty( currentObj, property, value ) {
        if ( arguments.callee.caller[JPM.jpmCodeKey] && arguments.callee.caller[JPM.jpmCodeKey]["classConfig"] && arguments.callee.caller[JPM.jpmCodeKey]["classConfig"][property] ){
            currentObj[property] = arguments.callee.caller[JPM.jpmCodeKey]["classConfig"][property];
        } else {
            currentObj[property] = value;
        }
    }
    
    
    // 虚方法
    function virtualMethod( currentObj, property, value ) {
        if ( arguments.callee.caller[JPM.jpmCodeKey] && arguments.callee.caller[JPM.jpmCodeKey]["classConfig"] && arguments.callee.caller[JPM.jpmCodeKey]["classConfig"][property] ){
            currentObj[property] = arguments.callee.caller[JPM.jpmCodeKey]["classConfig"][property];
        } else {
            currentObj[property] = value;
        }
    }
    
    
    // 常量配制
    function configConstant(){
    
       // 获取项目中受配制的常量的url
       var constantUrls = handle.constantConfig.getItemsName();                    
       
       for ( var i = 0; i < constantUrls.length; i++ ) {
             
             // constantUrl             获取受配制常量的url
             // constantUrlParts        获取受配制常量的url段
             // constantName            受配制常量的名称
             // constantSpaceUrl        受配制常量的名称空间url
             var constantUrl = constantUrls[i];
             var constantUrlParts = constantUrl.split(".");
             var constantName = "";
             var constantSpaceUrl = "";
             
             // 计算受配制的类名和名称空间
             if ( constantUrlParts.length > 0 ) {
                constantName=constantUrlParts[constantUrlParts.length-1];
                if ( constantUrlParts.length > 1 ) {
                    for ( var i = 0; i < constantUrlParts.length - 1; i++ ) {
                        if( !constantSpaceUrl ) {
                            constantSpaceUrl = constantSpaceUrl + constantUrlParts[i];
                        } else {
                            constantSpaceUrl = constantSpaceUrl + "." + constantUrlParts[i];
                        }
                    }
                }
             }
             
             // 获取常量
             var constant = handleProject.spaceUsing(constantSpaceUrl)[constantName];
             
             if ( constant ) {
             
                 // 获取属性配制集合
                 var attConfigStack = handle.constantConfig[constantUrl];                  
                 
                 while ( attConfigStack.length > 0 ) {
                    
                    // attConfig        从集合中弹出一个属性配制
                    // attName          获取要配制的属性的名称
                    // valueUrl         获取新值的url
                    // valueUrlParts    获取新值url段
                    // valueName        新值对象名
                    // valueSpaceUrl    新值名称空间url
                    // value            新值对象
                    var attConfig = attConfigStack.pop();
                    var attName = attConfig.name;
                    var valueUrl = attConfig.value;
                    var valueUrlParts = valueUrl.split(".");
                    var valueName = "";
                    var valueSpaceUrl = "";
                    var value = null;
                    
                    // 计逄新值的名称和名称空间url
                    if ( valueUrlParts.length > 0 ) {
                        valueName = valueUrlParts[valueUrlParts.length - 1];
                        if ( valueUrlParts.length > 1 ) {
                            for ( var i = 0; i < valueUrlParts.length - 1; i++ ) {
                                if ( !valueSpaceUrl ) {
                                    valueSpaceUrl = valueSpaceUrl + valueUrlParts[i];
                                } else {
                                    valueSpaceUrl = valueSpaceUrl + "." + valueUrlParts[i];
                                }
                            }
                        }
                    }
                    
                     // 完成配制
                    var value = handleProject.spaceUsing( valueSpaceUrl )[valueName];         
                    constant[attName] = value;                                              
                }
             }
       }
    }
    
    
    // 类配制
    function configClass(){
    
       //获取项目中受配制的类的url
       var classUrls = handle.classConfig.getItemsName(); 
                                   
       for ( var i = 0; i < classUrls.length; i++ ) {
       
             // classUrl        获取受配制类型的url
             // classUrlParts   获取受配制类型的url段
             // className       受配制类型的名称
             // classSpaceUrl   受配制类型的名称空间url
             var classUrl = classUrls[i];                                             
             var classUrlParts = classUrl.split(".");                                 
             var className = "";                                                      
             var classSpaceUrl = "";                                                  
             
             //计算受配制的类名和名称空间
             if ( classUrlParts.length > 0 ) {
                className = classUrlParts[classUrlParts.length - 1];
                if ( classUrlParts.length > 1 ) {
                    for ( var i = 0; i < classUrlParts.length - 1; i++ ) {
                        if( !classSpaceUrl ) {
                            classSpaceUrl = classSpaceUrl + classUrlParts[i];
                        } else {
                            classSpaceUrl = classSpaceUrl + "." + classSpaceUrl;
                        }
                    }
                }
             }
             
             //获取受配制的类型
             var cs = handleProject.spaceUsing( classSpaceUrl )[className];
             
             if(cs) {
                
                 // 获取属性配制集合
                 var attConfigStack = handle.classConfig[classUrl];                        
                 
                 // attConfig       从集合中弹出一个属性配制
                 // attName         获取要配制的属性的名称
                 // valueUrl        获取新值的url
                 // valueUrlParts   获取新值url段
                 // valueName       新值对象名
                 // valueSpaceUrl   新值名称空间url
                 // value           新值对象
                 while ( attConfigStack.length > 0 ) {
                 
                    var attConfig = attConfigStack.pop();
                    var attName = attConfig.name;
                    var valueUrl = attConfig.value;
                    var valueUrlParts = valueUrl.split(".");
                    var valueName = "";
                    var valueSpaceUrl = "";
                    var value = null;
                    
                    // 计算新值的名称和名称空间url
                    if ( valueUrlParts.length > 0 ) {
                        valueName = valueUrlParts[valueUrlParts.length - 1];
                        if ( valueUrlParts.length > 1 ) {
                            for ( var i = 0; i < valueUrlParts.length - 1; i++ ) {
                                if ( !valueSpaceUrl ) {
                                    valueSpaceUrl = valueSpaceUrl + valueUrlParts[i];
                                } else {
                                    valueSpaceUrl=valueSpaceUrl + "." +valueUrlParts[i];
                                }
                            }
                        }
                    }
                    
                    // 获取新值对象
                    var value = handleProject.spaceUsing( valueSpaceUrl )[valueName];                                  
                    
                    if ( !cs[JPM.jpmCodeKey] ) {
                        cs[JPM.jpmCodeKey] = {};
                        cs[JPM.jpmCodeKey]["classConfig"] = {};
                    }
                    
                    // 完成配制
                    cs[JPM.jpmCodeKey]["classConfig"][attName] = value;                                              
                }
           }
       }
    }
    

    /*--定义load方法开始--*/
    // oldProgress      上次解析进度标识
    // parseProgress    当前解析进度标识
    var oldProgress="finish";
    var parseProgress="parseConfig"; 
    
    // 定义load方法回调函数[私有]                                                       
    function loadCallBack( arg ){
        
        // 回调时对数组的处理
        if ( arg instanceof Array ) {
            if( arg.length > 0 ) {
                load(arg);
                return;
            }
        }
        
        // 将项目压入解析栈
        if( parseStack.length === 0 && jpmConfig.projects.length != 0 ) {
            parseStack.push( jpmConfig.projects.pop() );
        }
        
        //配制文件解析
        if ( parseProgress === "parseConfig" ) {                       
                    
            if ( parseStack.length > 0 ) {
                
                // 从解析栈内弹出项目或类库
                handle = parseStack.pop();                            
                
                // 设置目标项目
                if ( handle.getType() === "Project" ) {                  
                    handleProject = handle;
                    projectStack.push( handleProject );
                }
                
                // 将弹出链接库压入临时栈内
                tempStack.push( handle );
                
                //加载配制文件                             
                load( handle.configFile );                            
                return;    
                    
            } else {
            
                    //将临时栈赋给解析栈
                    parseStack = tempStack;
                    
                    //设置当前解析进度为加载JS                                   
                    parseProgress = "loadJS";
                                                   
                    handleProject = projectStack.pop();
            }
            
            oldProgress = "parseConfig";
        }
        
        // 解析加载文件
        if ( parseProgress === "loadJS" ) {             
                   
           // 当库或项目的配制文件中所有js文件被加载完成时这段代码被执行
           if ( fileStack.length === 0 && oldProgress != "parseConfig" ) {   
           
                // 执行数据配制[类配制、常量配制]         
                configClass();
                configConstant();
                
                // 执行配制文件中的main方法
                exeMain(); 
                                                                    
                // 计算目标项目
                if ( handle.getType() === "Project" ) {
                    handleProject = projectStack.pop();
                }
           }
           
           oldProgress="loadJS";
           
           if ( parseStack.length>0 && fileStack.length === 0 ){
               // 获取要加载的JS文件集及设置处理项目
               while ( fileStack.length === 0 && parseStack.length > 0 ) {               

                  handle=parseStack.pop();
                  
                  for ( var i = handle.files.length - 1; i > -1; i-- ) {
                    fileStack[fileStack.length] = handle.files[i];
                  }
                  
                  // 当配制文件中没有包含任何js文件时这段代码被执行
                  if ( fileStack.length === 0 ) {    
                  
                        // 执行数据配制[类配制、常量配制]                                   
                        configClass();
                        configConstant();
                        
                        // 执行配制文件中的main方法
                        exeMain();                                                
                        
                        // 计算目标项目
                        if (handle.getType() === "Project" ) {
                            handleProject = projectStack.pop();
                        }
                  }
               }
            }
            
            // 加载JS文件
            if ( fileStack.length > 0 ) {
                load( fileStack.pop() );
                return;
            } else {
                if ( parseStack.length === 0 && fileStack.length === 0 ) {
                    parseProgress = "finish";
                }
            }
        }
        
        if ( parseProgress === "finish" ) {
            handle=null;
            parseProgress = "finish";
            
            //完成
            oldProgress= "finish";
        }
    }
    
    //项目加载方法 [!这个方法非常重要选用的指令和实现与跨平台直接有关系!]
    function load( arg ){
        
        // 获取加载路径
        var src = "";
        if( arg instanceof Array ) {
            src = arg.pop();
        } else {
            src = arg;
        }
        
        // 加载处理
        var script = document.createElement( "script" );
        var head = document.getElementsByTagName( "head" )[0];
        script.setAttribute( "type","text/javascript" );
        script.setAttribute( "src", src );
        head.appendChild( script );

        //加载完成回调方法
        script.onload = function(){
            script.onreadystatechange = null;
            if ( !(this.readyState) || (this.readyState=="complete" || this.readyState=="loaded") ){
               // 调用回调方法
               loadCallBack( arg );       
            }
        }
        
        // 加载完成回调方法
        script.onreadystatechange = function(){
            script.onload = null;
            if ( !(this.readyState) || (this.readyState=="complete" || this.readyState=="loaded") ){
               // 调用回调方法
               loadCallBack( arg );       
            }
        }
    }
    /*--定义load方法结束--*/
    
    
    //定义JPM对象
    JPM = {
    
        /*--属性定义开始--*/
        jpmCodeKey: guid(),
        moduleSpaceName: guid(),
        start: "stop",
        /*--属性定义结束--*/
        
        /*--方法定义开始--*/
        IConfig: IConfig,                       
        JConfig: JConfig,
        PConfig: PConfig,
        setDefault: setDefault,
        nameSpace: nameSpace,
        spaceUsing: spaceUsing,
        check:check,
        virtualProperty: virtualProperty,
        virtualMethod: virtualMethod,
        addBufferList: addBufferList,
        addCheckBufferList:addCheckBufferList
        /*--方法定义结束--*/ 
    };
    
    
    // 运行
    ( function run(){
        
        // 设置JPM状态
        JPM.start = "run"; 
        
        // 为JPM组件创建唯一对象包
        window[JPM.moduleSpaceName]={}; 
        
        // 获取JPM在当前站点中的目录
        var jpmScriptSrc = document.getElementById("JPMScript").src;
        for( var i = jpmScriptSrc.length - 1; i > 0; i-- ) {
            if ( jpmScriptSrc[i] === "/" ) {
                jpmCatalog = jpmScriptSrc.substring( 0, i + 1);
                break;
            }
        }
        
        // 定义组件集合
        var JPMModules = [jpmCatalog + "config.js",
                          jpmCatalog + "Modules/url.js",
                          jpmCatalog + "Modules/Lib.js",
                          jpmCatalog + "Modules/Project.js",
                          jpmCatalog + "Modules/Space.js",
                          jpmCatalog + "DataStructure/XML.js",
                          jpmCatalog + "DataStructure/guid.js",
                          jpmCatalog + "DataStructure/List.js",
                          jpmCatalog + "DataStructure/XML.js"];
        
        // 加载                
        load( JPMModules );                                               
    } )();                     
} )();