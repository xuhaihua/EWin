/*
    本文件主要用于定义List类
        公有：
            属性：
                length                              集合长度
            方法：
                add                                 加入元素
                remove                              移除元素
                getItemsName                        获取集合中所有项的名称
                getItemsValue                       获取集合中所有项的值
                
*/
( function() {

    var guid = window[JPM.moduleSpaceName].guid;                           

    // 添加对象[成功返回添加的对象返之则返回一个null]
    function add( attributeName, obj ) {
          
          if ( !this.items ) {
                this.items = new Object();                                
          }
    
          // 参数检查
          var errString="";
          if ( arguments.length > 2 ) {
                errString=errString + "传给List对象add方法的参数个数不正确!\n";
          } else {
                if ( arguments.length === 1 && (typeof arguments[0]) != "object" || arguments.length === 2 && (typeof arguments[0]) != "string"  &&  (typeof arguments[1]) != "object" ) {
                    alert("传给List对象add方法的参数类型不正确!");
                    return null;
                } 
          }
          
          // 向集合中添加项
          if ( arguments.length === 1 && (typeof arguments[0])==="object" ) {
            var indexGuid = guid.build();
            this[indexGuid] = arguments[0]
            this.items[indexGuid] = arguments[0]
            
          } else {
            if ( arguments.length === 2 && (typeof arguments[0]) === "string"  && ((typeof arguments[1]) === "object" || (typeof arguments[1]) === "function") ) {
                this[attributeName] = obj;
                this.items[attributeName] = obj;
             } 
          }
            
          this.length++;
          return obj;
    }
    
    // 移除对象[成功返回被移除的对象返之则返回一个null]
    function remove( attribute ) {
    
        if ( !this.items ) {
            this.items = new Object();                                
        }

        if ( arguments.length > 1 ) {
            alert( "传入给List对象remove方法的参数不正确!" );
            return null;
        }
        
        // isDeletedElement 对象下项删除成功标记
        // isDeletedItem    集合内项删除成功标记
        // result           被删除的项
        var isDeletedElement = false;
        var isDeletedItem = false;
        var result = null;
        
        // 参数类型为对象时的处理代码
        if( (typeof(arguments[0])) === "object" ) {
            for ( var n in this ) {
                if ( this[n] === arguments[0] ) {
                    
                    result = this[n];
                    isDeletedElement =  delete this[n];
                    if ( isDeletedElement ) {
                        isDeletedItem = delete this.items[n];
                    }
                    if ( !isDeletedItem ){
                        this[n] = this.items[n];
                    }
                    break;
                }
            }
        } 
        
        // 参数类型为项名时的处理代码
        if( (typeof(arguments[0])) === "string" ) {
            if ( this[attribute]) {
                var result = this[attribute];
                isDeletedElement =  delete this[attribute];
                if ( isDeletedElement ) {
                    isDeletedItem = delete this.items[attribute];
                }
                if ( !isDeletedItem ) {
                    this[attribute] = this.items[attribute];
                }
             }
        }
        
        if ( isDeletedElement && isDeletedItem ) {
        
            //长度递减
            this.length--;                                              
            return result;
        } else {
            return null;
        }
    }
    
    //获取List中所有项名称[返回类型为数组]
    function getItemsName() {
            
            var result = new Array();
            var test = {};   
            if ( !this.items ) {
                this.items=new Object();
            }
                                                             
            for(var attribute in this.items) {
               if( !test[attribute] ) {
                    result[result.length]=attribute;
               }
            }
            return result;
    }
    
    // 获取List中所有项的值
    function getItemsValue() {
    
            var result = new Array();
            var test = {};
            if ( !this.items ) {
                this.items=new Object();
            }
            
            for( var attribute in this.items ) {
               
               // 验证该属性是否在items的原属性中
               test = true;
               if( !test[attribute] ) {
                    result[result.length] = this.items[attribute];
               }
            }
            return result;
    }

    // 定义JPM专用数据集合类List
    window[JPM.moduleSpaceName].List = function() {
    
        /*--定义属性开始--*/
        this.length = 0;
        /*--定义属性结束--*/
        
        /*--定义方法开始--*/
        this.add = add;
        this.remove = remove;
        this.getItemsName = getItemsName;
        this.getItemsValue = getItemsValue;
        /*--定义方法结束--*/
    }
} )();