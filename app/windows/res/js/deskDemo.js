/*--
    本文件中的js代码为常规代码，只为demo的应用而定义，具体与eWin没有任何关系
--*/


/*----------------------------------------------------与demo相关的类型定义开始-------------------------------------------*/
       
/**
  * Notepad类定义
  * 属性：
       * copyContent        剪切析
  * 方法：
       * getSelPositions    获取选区位置对象
       * clearAll           清除文本区
       * allSelect          全选
       * copy               复制
       * cut                剪切
       * paste              粘贴             
 */
var Notepad = null; 
(function() {

    // 选区位置对象[包括选区的起始坐标、结束坐标][私有]
    selPosition = {
        start: 0,
        //开始位置
        end: 0 //结束位置
    };
    
    var textEditer = document.getElementById("textEdit");
    
    // 获取所选文本的开始和结束位置方法
    function getSelPositions() {
        var el = textEditer;
        var startPosition = 0; 
        var endPosition = 0; 
        if (document.selection) { 
            var range = document.selection.createRange();
            var drange = range.duplicate(); 
            drange.moveToElementText(el); 
            drange.setEndPoint('EndToEnd', range);

            startPosition = drange.text.length - range.text.length;
            endPosition = startPosition + range.text.length;
        } else if (window.getSelection) { 
            startPosition = el.selectionStart;
            endPosition = el.selectionEnd;
        }
        selPosition.start = startPosition;
        selPosition.end = endPosition;
    }

    // 全选方法
    function allSelect() {
        textEditer.focus();
        textEditer.select();
        getSelPositions();
    }

    // 清除文本方法
    function clearAll() {
        textEditer.value = "";
    }

    // 复制方法
    function copy() {
        if (selPosition.start != selPosition.end) {
            var text = textEditer.value;
            var centerText = "";
            var charCount = 0;
            for (var i = 0; i < text.length; i++) {
                if (text.charCodeAt(i) == 10) {
                    charCount = charCount + 2;
                } else {++charCount;
                }

                if (charCount > selPosition.start && charCount <= selPosition.end) {
                    centerText = centerText + text[i];
                }
            }
            this.copyContent = centerText;
        }
    }

    // 剪切方法
    function cut() {
        if (selPosition.start != selPosition.end) {
            var text = textEditer.value;
            var leftText = "";
            var centerText = "";
            var rightText = "";
            var charCount = 0;
            for (var i = 0; i < text.length; i++) {
                if (text.charCodeAt(i) == 10) {
                    charCount = charCount + 2;
                } else {++charCount;
                }
                if (charCount <= selPosition.start) {
                    leftText = leftText + text[i];
                } else {
                    if (charCount <= selPosition.end) {
                        centerText = centerText + text[i];
                    } else {
                        rightText = rightText + text[i];
                    }

                }
            }
            this.copyContent = centerText;
            textEditer.value = leftText + rightText;
        }
    }

    // 粘贴方法
    function paste() {
        var start = selPosition.end;
        var text = textEditer.value;
        var leftText = "";
        var rightText = "";
        var charCount = 0;
        for (var i = 0; i < text.length; i++) {

            if (charCount < start) {
                leftText = leftText + text[i];
            } else {
                rightText = rightText + text[i];
            }

            if (text.charCodeAt(i) == 10) {
                charCount = charCount + 2;
            } else {++charCount;
            }
        }
        textEditer.value = leftText + this.copyContent + rightText;
    }

    // 记事本类定义
    Notepad = function() {
        
        /*--属性定义开始--*/
        this.copyContent = "";
        /*--属性定义结束--*/
        
        /*--方法定义开始--*/
        this.clearAll = clearAll;
        this.allSelect = allSelect;
        this.getSelPositions = getSelPositions;
        this.copy = copy;
        this.cut = cut;
        this.paste = paste;
        /*--方法定义结束--*/
    }
})();


/**
  * 属性：
      * UserManage      用户管理类定义
      * currentUser     当前用户
  * 方法：
      * addUser         添加用户
      * changeUserInfo  修改用户
      * switchUser      切换用户
 */ 
var UserManage = null; 
(function() {

    var users = {};
    var currentUserCell = null;
    
    // 初始化用户列表表格
    var userList = document.getElementById("userList");
    userList.setAttribute("cellpadding","0");
    userList.setAttribute("cellspacing","2");
    var thead = document.createElement("thead");
    userList.appendChild(thead);
    var tr = document.createElement("tr");
    thead.appendChild(tr);
    var th = document.createElement("th");
    tr.appendChild(th);
    th.appendChild(document.createTextNode("用户名"));
    var th = document.createElement("th");
    tr.appendChild(th);
    th.appendChild(document.createTextNode("状态"));
    var th = document.createElement("th");
    tr.appendChild(th);
    th.appendChild(document.createTextNode("桌面背景"));
    var th = document.createElement("th");
    tr.appendChild(th);
    th.appendChild(document.createTextNode("创建日期"));
    var tr = document.createElement("tr");
    userList.appendChild(tr);
    var td = document.createElement("td");
    tr.appendChild(td);
    td.appendChild(document.createTextNode("admin"));
    var td = document.createElement("td");
    td.setAttribute("id","defaultCurrentUserCell");
    tr.appendChild(td);
    td.appendChild(document.createTextNode("当前用户"));
    var td = document.createElement("td");
    tr.appendChild(td);
    var img = document.createElement("img");
    img.src = src="../../Libs/EWin/Css/img/deskTopBg.jpg";
    img.style.width = "30px";
    img.style.height = "30px";
    td.appendChild(img);
    var td = document.createElement("td");
    tr.appendChild(td);
    td.appendChild(document.createTextNode("2015年10月23日"));
                              
    // 创建用户信息
    function createUser(userName, password, deskBgUrl) {
        var userInfo = {
            userName: userName,
            password: password,
            deskBgUrl: deskBgUrl,
            stateCell: null
        };
        return userInfo;
    }

    // 修改用户信息
    function changeUserInfo() {
        var userName = document.getElementById("change_userName").value;
        var password = document.getElementById("change_password").value;
        var deskBgUrl = document.getElementById("change_deskBg").value;
        if (userName && password) {
            this.currentUser.userName = userName;
            this.currentUser.password = password;
            this.currentUser.deskBgUrl = deskBgUrl;
            if (!this.currentUser.stateCell) {
                this.currentUser.stateCell = document.getElementById("defaultCurrentUserCell");
            }
            var userNameCell = this.currentUser.stateCell.previousSibling;
            while (userNameCell.nodeType != 1) {
                userNameCell = userNameCell.previousSibling
            }
            for (var i = 0; i < userNameCell.childNodes.length; i++) {
                userNameCell.removeChild(userNameCell.childNodes[i]);
            }
            userNameCell.appendChild(document.createTextNode(userName));
            var imgCell = this.currentUser.stateCell.nextSibling;
            while (imgCell.nodeType != 1) {
                imgCell = imgCell.nextSibling
            }
            for (var i = 0; i < imgCell.childNodes.length; i++) {
                imgCell.removeChild(imgCell.childNodes[i]);
            }
            var img = document.createElement("img");
            img.src = this.currentUser.deskBgUrl;
            img.style.width = "30px";
            img.style.height = "30px";
            img.style.marginTop = "8px";
            img.style.marginBottom = "8px";
            imgCell.appendChild(img);
            users[userName] = this.currentUser;
            
        }
    }

    // 切换用户
    function switchUser() {
        var userName = document.getElementById("land_userName").value.replace(/\s+/g,"");
        var password = document.getElementById("land_password").value.replace(/\s+/g,"");
        if (!this.currentUser.stateCell) {
            this.currentUser.stateCell = document.getElementById("defaultCurrentUserCell");
        }
        if (userName && password && users[userName.replace(/\s+/g,"")] && users[userName].password == password.replace(/\s+/g,"")) {
            var desk = document.getElementById("deskDemo");
            desk.style.backgroundImage = "url('" + users[userName].deskBgUrl.replace(/\\/g, "/") + "')";

            for (var i = 0; i < this.currentUser.stateCell.childNodes.length; i++) {
                this.currentUser.stateCell.removeChild(this.currentUser.stateCell.childNodes[i]);
            }
            this.currentUser.stateCell.appendChild(document.createTextNode("待登陆"));
            this.currentUser = users[userName.replace(/\s+/g,"")];
            for (var i = 0; i < this.currentUser.stateCell.childNodes.length; i++) {
                this.currentUser.stateCell.removeChild(this.currentUser.stateCell.childNodes[i]);
            }
            this.currentUser.stateCell.appendChild(document.createTextNode("当前用户"));
        }
    }

    // 添加用户
    function addUser() {
        var userName = document.getElementById("add_userName").value.replace(/\s+/g,"");
        var password = document.getElementById("add_password").value.replace(/\s+/g,"");
        var deskBgUrl = document.getElementById("add_deskBg").value.replace(/\s+/g,"");
        if (userName && password) {
            var userInfo = createUser(userName, password, deskBgUrl);
            users[userInfo.userName] = userInfo;
            var userList = document.getElementById("userList");
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            tr.appendChild(td);
            var text = document.createTextNode(userInfo.userName);
            td.appendChild(text);
            var td = document.createElement("td");
            tr.appendChild(td);
            var text = document.createTextNode("待登陆");
            td.appendChild(text);
            userInfo.stateCell = td;
            var td = document.createElement("td");
            tr.appendChild(td);
            var img = document.createElement("img");
            img.src = userInfo.deskBgUrl;
            img.style.width = "30px";
            img.style.height = "30px";
            img.style.marginTop = "8px";
            img.style.marginBottom = "8px";
            td.appendChild(img);
            var td = document.createElement("td");
            tr.appendChild(td);
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var date = myDate.getDate();
            var text = document.createTextNode(year + "年" + month + "月" + date + "日");
            td.appendChild(text);
            userList.appendChild(tr);
        }
    }

    // 用户管理类定义
    UserManage = function() {
        users["admin"] = createUser("admin", "admin", "img/deskTopBg.jpg");
        
        /*--定义属性开始--*/
        this.currentUser = users["admin"];
        /*--定义属性结束--*/
        
        /*--定义方法开始--*/
        this.addUser = addUser;
        this.changeUserInfo = changeUserInfo;
        this.switchUser = switchUser;
        /*--定义方法结束--*/
    }
})();


/**
  * ImageBox 相册类定义
  * 属性：
      * currentImageBox     当前相册
  * 方法：
      * setCurrentImageBox  设置当前相册
      * preImage            前一张照片
      * nextImage           后一张照片
 */
var ImageBox = null; 
(function() {
    var currentImageBox = null;
    
    function preImage() {
        if (!currentImageBox) {
            currentImageBox = document.getElementById("animationBox");
        }
        
        var images = currentImageBox.getAttribute("data-images").split(",");
        var preIndex = 0;
        for (var i = 0; i < images.length; i++) {
            if (currentImageBox.src.split("/")[currentImageBox.src.split("/").length - 1] == images[i].split("/")[images[i].split("/").length - 1]) {
                if (i != 0) {
                    preIndex = i - 1;
                    break;
                }
            }
        }
        currentImageBox.src = images[preIndex];
    }

    function nextImage() {
        if (!currentImageBox) {
            currentImageBox = document.getElementById("animationBox");
        }
        
        var images = currentImageBox.getAttribute("data-images").split(",");
        var nextIndex = images.length - 1;
        for (var i = 0; i < images.length; i++) {
            if (currentImageBox.src.split("/")[currentImageBox.src.split("/").length - 1] == images[i].split("/")[images[i].split("/").length - 1]) {
                if (i != images.length - 1) {
                    nextIndex = i + 1;
                    break;
                }
            }
        }
        currentImageBox.src = images[nextIndex];
    }

    function setCurrentImageBox(imageBox) {
        currentImageBox = imageBox;
    }

    ImageBox = function() {
        
        /*--属性定义开始--*/
        currentImageBox = null;
        /*--属性定义结束--*/

        /*--方法定义开始--*/
        this.setCurrentImageBox = setCurrentImageBox;
        this.preImage = preImage;
        this.nextImage = nextImage;
        /*--方法定义结束--*/
    }
})();
/*----------------------------------------------------与demo相关的类型定义结束-------------------------------------------*/


// 定义记事本对象
var notepad = new Notepad();     

// 定义用户管理对象  
var userManage = new UserManage();

// 定义相册对象
var imageBox = new ImageBox();



/*-------------------------------------------------客户端元素事件执行函数定义开始---------------------------------------*/

// 添加用户对话框打开函数
function openAddUserDialog(winEvent) {

    // 获取对话框对象
    var addUserNode = document.getElementById("addUserDialog");
    var dailog = winEvent.eWin.getWin(addUserNode);
    
    // 打开对话框
    dailog.open();
}


// 用户登陆对话框打开函数
function openLandUserDialog(winEvent) {
    
    // 获取对话框对象
    var landUserNode = document.getElementById("landUserDialog");
    var dailog = winEvent.eWin.getWin(landUserNode);
    
    // 打开对话框
    dailog.open();
}


// 用户信息修改对话框打开函数
function openChangeUserInfoDialog(winEvent) {
    
    // 设置对话框中的相应字段
    document.getElementById("change_userName").value = userManage.currentUser.userName;
    document.getElementById("change_password").value = userManage.currentUser.password;
    // document.getElementById("change_deskBg").value = userManage.currentUser.deskBgUrl;

    // 获取对话框对象
    var changeUserInfoNode = document.getElementById("changeUserDialog");
    var dailog = winEvent.eWin.getWin(changeUserInfoNode);
    
    // 打开对话框
    dailog.open();
}


// 记事本窗体打开函数
function openNoteWin(winEvent) {

    // 获取窗体对象
    var win = winEvent.eWin.getWin(document.getElementById("noteWin"));
    
    // 打开窗体
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    dBehaviour.winOpen.action( win );
}

// 退出方法
function closeNoteWin(winEvent) {
    // 获取窗体对象
    var win = winEvent.eWin.getWin(document.getElementById("noteWin"));
    
    // 关闭窗体
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    dBehaviour.winClose.action( win);
}


// 用户管理窗体打开函数
function openUserManageWin(winEvent) {
    
    // 获取窗体对象
    var win = winEvent.eWin.getWin(document.getElementById("userManageWin"));
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    
    // 打开窗体
    dBehaviour.winOpen.action( win);
}


// 相册窗体打开函数
function openPictureManageWin(winEvent) {

    // 获取窗体对象
    var win = winEvent.eWin.getWin(document.getElementById("pictureManageWin"));
    
    // 打开窗体
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    dBehaviour.winOpen.action( win);
}


// 包含框架的窗体打开函数
function openIncludeSplitConWin(winEvent) {

    // 获取窗体对象
    var win = winEvent.eWin.getWin(document.getElementById("includeSplitConWin"));
    
    // 打开窗体
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    dBehaviour.winOpen.action( win);
}


// 子窗体打开函数
function openChildWin(winEveint) {

    // 获取窗体对象
    var childWin = winEveint.eWin.getWin(document.getElementById("childWin"));
    
    // 打开窗体
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    if (childWin.state == "close") {
        dBehaviour.winOpen.action(childWin);
    }
    if (childWin.state == "min") {
        dBehaviour.resetMinWin.action( childWin);
    }
}


// 包含子窗体窗体打开函数
function openIncludeChildWin(winEvent) {

    // 获取窗体对象
    var win = winEvent.eWin.getWin(document.getElementById("includeChildWin"));
    
    // 打开窗体
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    dBehaviour.winOpen.action(win);
    
}
    
function resetWin( winTagNode ){
    var eWin = JPM.spaceUsing("EWin")["eWin"];
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    var win = eWin.getWin( winTagNode );
    if ( win.state != "max" ) {
        if ( win && (typeof win.winPoint) === "object" ) {
            var items = new Array();
            items = win.winPoint.parentNode.getChildElements();
            for ( var i = 0; i < items.length; i++ ) {
                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && win.winPoint != items[i] && items[i].type != "dialog" ) {
                    if(items[i].state === "max") {
                        items[i].reset();
                    } else {
                         items[i].show();
                    }
                }
            }
        }
        dBehaviour.thumClick.action( win );
    } else {
        var items = new Array();
        items = win.parentNode.getChildElements();
        if ( win.state != "max" ) {
            for ( var i = 0; i < items.length; i++ ) {
                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i].type != "dialog" ) {
                     items[i].hide();
                }
            }
        } else {
            for ( var i = 0; i < items.length; i++ ) {
                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i] !=  win && items[i].type != "dialog" ) {
                    if(items[i].state === "max") {
                        items[i].reset();
                    } else {
                        items[i].show();
                    }
                }
            }
        }
        dBehaviour.titleDlClick.action( win );
        eWin.sizeHandle.hide();
    }
}

function closeWin( winTagNode ) {
    var eWin = JPM.spaceUsing("EWin")["eWin"];
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    var win = eWin.getWin( winTagNode );
    win.closeEvent();                                                   
    var isPreventDefault = win.closeEvent.isPreventDefault;
    if ( isPreventDefault != "strong" ) {
        if ( win.state === "max" ) {
            var items = new Array();
            items = win.parentNode.getChildElements();
            for ( var i = 0; i < items.length; i++) {
                 
                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i] !=  win && items[i].type != "dialog" ) {
                    if(items[i].state === "max") {
                        items[i].reset();
                    } else {
                        items[i].show();
                    }
                }
            }
        }
    }
    if(!isPreventDefault){
        dBehaviour.winClose.action( win );
    } else {
        win.closeEvent.isPreventDefault = false;
    }
    eWin.sizeHandle.hide();
}

function minWin( winTagNode ) {
    var eWin = JPM.spaceUsing("EWin")["eWin"];
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    var win = eWin.getWin( winTagNode );
    win.minEvent();
    var isPreventDefault = win.minEvent.isPreventDefault;
    if ( isPreventDefault != "strong" ) {                                      
        var items = new Array();
        items = win.parentNode.getChildElements();
        for ( var i = 0; i < items.length; i++) {
            if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i] !=  win && items[i].type != "dialog" ) {
                if ( items[i].state === "max" ) {
                    items[i].reset();
                } else {
                    items[i].show();
                }
            }
        }
    }                  
    if(!isPreventDefault) {
         dBehaviour.winMin.action( win );
    } else {
        win.minEvent.isPreventDefault = false;
    }  
    eWin.sizeHandle.hide();
}

function maxWin( winTagNode ) {
    var eWin = JPM.spaceUsing("EWin")["eWin"];
    var dBehaviour = JPM.spaceUsing("EWin")["dBehaviour"];
    var win = eWin.getWin( winTagNode );
    win.maxEvent();                                                  
    var isPreventDefault = win.maxEvent.isPreventDefault;
    if ( isPreventDefault != "strong" ) {
        var items = new Array();
        items = win.parentNode.getChildElements();
        for ( var i = 0; i < items.length; i++ ) {
            if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i].type != "dialog" ) {
                 items[i].hide();
            }
        }
    }
    if(!isPreventDefault) {   
        dBehaviour.winMax.action( win );
    } else {
        win.maxEvent.isPreventDefault = false;
    }
    eWin.sizeHandle.hide();
}

/*-------------------------------------------------客户端元素事件执行函数定义结束---------------------------------------*/


/*---------------------------------------------------元素相关属性及事件设置开始-----------------------------------------*/

// 对图标的设置
document.getElementById("noteIcon").src = "res/img/boxIcon.png";
document.getElementById("userManageIcon").src = "res/img/userManageIcon.png";
document.getElementById("picBoxIcon").src = "res/img/picBoxIcon.png";
document.getElementById("webManageIcon").src = "res/img/webManageIcon.png";
document.getElementById("includeChildIcon").src = "res/img/inChildWinIcon.png";

// 对记事本的设置
var notaSelectAll = document.getElementById("notaSelectAll");
notaSelectAll.onmousedown=notepad.allSelect;

var textEdit = document.getElementById("textEdit");
textEdit.onmouseup = notepad.getSelPositions;

// 对标签的设置
var animationTag = document.getElementById("animationTag");
animationTag.onclick = function () {
    imageBox.setCurrentImageBox( document.getElementById('animationBox') );
}
var sceneryTag = document.getElementById("sceneryTag");
sceneryTag.onclick = function() {
    imageBox.setCurrentImageBox( document.getElementById('sceneryBox') );
}
var lifeTag = document.getElementById("lifeTag");
lifeTag.onclick = function () {
    imageBox.setCurrentImageBox( document.getElementById('lifeBox') );
}

// 对相册的设置
var animationBox = document.getElementById("animationBox");
animationBox.setAttribute("data-images" , "res/img/am1.jpg,res/img/am2.jpg,res/img/am3.jpg");
animationBox.src="res/img/am2.jpg"

var sceneryBox = document.getElementById("sceneryBox");
sceneryBox.setAttribute("data-images" ,"res/img/scenery1.jpg,res/img/scenery2.jpg,res/img/scenery3.jpg");
sceneryBox.src="res/img/scenery2.jpg"

var lifeBox = document.getElementById("lifeBox");
lifeBox.setAttribute("data-images" ,"res/img/life1.jpg,res/img/life2.jpg,res/img/life3.jpg");
lifeBox.src="res/img/life2.jpg"

var picBoxs = [animationBox,sceneryBox,lifeBox];
for( var i = 0; i < picBoxs.length; i++) {
    var perControl = document.createElement("div");
    perControl.style.width = "50%";
    perControl.style.height = "100%";
	perControl.style.position = "absolute";
    perControl.style.zIndex = "3000";
    perControl.style.backgroundColor = "#fff"
    perControl.style.filter = 'alpha(opacity=1)';
    perControl.style.opacity = 0.00001;
    perControl.onclick = imageBox.preImage;

    var nextControl = document.createElement("div");
    nextControl.style.width = "50%";
    nextControl.style.height = "100%";
    nextControl.style.right = "0";
    nextControl.style.position = "absolute";
    nextControl.style.backgroundColor = "#fff"
    nextControl.style.filter = 'alpha(opacity=1)';
    nextControl.style.opacity = 0.0000001;
    
    nextControl.style.zIndex = "3000";
    nextControl.onclick = imageBox.nextImage;
    
    picBoxs[i].parentNode.parentNode.parentNode.appendChild(perControl);
    picBoxs[i].parentNode.parentNode.parentNode.appendChild(nextControl);
}
/*---------------------------------------------------元素相关属性及事件设置结束-----------------------------------------*/