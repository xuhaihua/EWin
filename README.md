# EWin
```
<!DOCTYPE html>
<html>
<head>
    <title>桌面系统简单示例</title>
    <link  type="text/css" rel="Stylesheet" href="../../Libs/EWin/Css/module.css"  />
    <link  type="text/css" rel="Stylesheet" href="../../Libs/EWin/Css/defaultStyle.css"  />
    <link  type="text/css" rel="Stylesheet" href="res/css/deskDemo.css"  />
</head>

<body>

    <!--
        本页面中，在对元素的属性及事件进行定义时，存在有
        侵扰式代码，原因是因为这个页面只是一个eWin的demo,
        为了直观的显示这些属性的应用所以未对他们进行隔离，
        但这个做法在正式场合下不见意使用!
    -->
    <ol id = "deskDemo" class = "deskTop" data-ewin-iconRoll = "300">
        <!--WinSpace区域-->
        <li class="winSpaceLay">
            <div class="winSpace" data-ewin-shortcutId="deskShortcut" >
            
                <!----------------------------------------------------------定义桌面图标开始---------------------------------------------------------->
                <dl class="icon" data-ewin-winpoint="noteWin">
                    <dd><img id="noteIcon" /></dd>
                    <dt>记事本</dt>
                </dl>
            
                <dl class="icon" data-ewin-winpoint="userManageWin">
                    <dd><img id="userManageIcon" /></dd>
                    <dt>用户管理</dt>
                </dl>
            
                <dl class="icon" data-ewin-winpoint="pictureManageWin">
                    <dd><img id="picBoxIcon" /></dd>
                    <dt>相删</dt>
                </dl>
                
                <dl class="icon" data-ewin-winpoint="includeSplitConWin">
                    <dd><img id = "webManageIcon" /></dd>
                    <dt>含框架窗体</dt>
                </dl>
                
                <dl class="icon" data-ewin-winpoint="includeChildWin">
                    <dd><img id="includeChildIcon" /></dd>
                    <dt>包含子窗体的窗体</dt>
                </dl>
                <!-----------------------------------------------------------定义桌面图标结束----------------------------------------------------------->
                
                
                <!----------------------------------------------------------定义桌面快捷菜单开始--------------------------------------------------------->
                <!--定义桌面快捷菜单-->
                <div id="deskShortcut" class="shortcutMenu">
                    <a class="shortcutMenuItem" data-ewin-event-click="openNoteWin(winEvent);">记事本</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="openUserManageWin(winEvent);">用户管理</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="openPictureManageWin(winEvent);">相册</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="openIncludeSplitConWin(winEvent);">Web管理</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="openIncludeChildWin(winEvent);">含子窗体的窗体</a>
                </div>
                <!-------------------------------------------------------定义桌面快捷菜单开始----------------------------------------------------------->
                
                
                <!----------------------------------------------------定义添加用户信息对话框开始------------------------------------------------------>
                <ol id="addUserDialog" class="window" data-ewin-type="dialog"  data-ewin-state="close">
                    <li class="titleBar"><span class="caption">创建新用户</span><a  class="closeBut"></a></li>
                    <li class="workSpace">
                        <ol id="add_userInfo">
                            <li><label>基本信息：</label></li>
                            <li>
                                <strong>账号*：</strong>
                                <input id="add_userName" type="text" />
                            </li>
                            <li>
                                <strong>密码*：</strong>
                                <input id="add_password" type="password" />
                            </li>
                            <li><label>系统设置：</label></li>
                            <li>
                               <span>背景：</span>
                               <input id="add_deskBg" type="file" name="file" />
                            </li>
                        </ol>
                        <div>
                            <div class="confirmBut" data-ewin-event-click="userManage.addUser()" ></div>
                            <div class="cancelBut"></div>
                        </div>
                    </li>
                </ol>
                <!----------------------------------------------------定义添加用户信息对话框结束------------------------------------------------------->
                
                
                <!----------------------------------------------------定义修改用户信息对话框开始------------------------------------------------------->
                <ol id="changeUserDialog" class="window" data-ewin-type="dialog"  data-ewin-state="close">
                    <li class="titleBar"><span class="caption">修改用户信息</span><a  class="closeBut"></a></li>
                    <li class="workSpace">
                       <ol id="change_userInfo">
                            <li><label>基本信息：</label></li>
                            <li>
                                <strong>账号*：</strong>
                                <input id="change_userName" type="text" />
                            </li>
                            <li>
                                <strong>密码*：</strong>
                                <input id="change_password" type="password" />
                            </li>
                            <li><label>系统设置：</label></li>
                            <li>
                               <span>背景：</span>
                               <input id="change_deskBg" type="file" name="file" />
                            </li>
                        </ol>
                        <div>
                            <div class="confirmBut" data-ewin-event-click="userManage.changeUserInfo()" ></div>
                            <div class="cancelBut"></div>
                        </div>
                    </li>
                </ol>
                <!----------------------------------------------------定义修改用户信息对话框结束------------------------------------------------------->
                
                
                <!----------------------------------------------------定义用户登陆信息对话框开始------------------------------------------------------->
                <ol id="landUserDialog" class="window" data-ewin-type="dialog"  data-ewin-state="close">
                    <li class="titleBar"><span class="caption">用户登陆：</span><a  class="closeBut"></a></li>
                    <li class="workSpace">
                        <ol id="land_userInfo">
                            <li>
                                <strong>账号*：</strong><input id="land_userName" type="text" />
                            </li>
                            <li>
                                 <strong>密码*：</strong><input id="land_password" type="password" />
                            </li>
                        </ol>
                        <div>
                            <div class="confirmBut" data-ewin-event-click="userManage.switchUser()"></div>
                            <div class="cancelBut"></div>
                        </div>
                    </li>
                </ol>
                <!----------------------------------------------------定义用户登陆信息对话框结束------------------------------------------------------->
                
                
                <!--------------------------------------------------------定义记事本应用窗体开始-------------------------------------------------------->
                <ol id="noteWin" class="window" data-ewin-thumPoint="noteWinThum" data-ewin-minWidth="100" data-ewin-minHeight="100"  data-ewin-state="close">
                
                    <!--定义标题栏-->
                    <li class="titleBar"><span class="caption">记事本 [含菜单的窗体]</span><a  class="closeBut"></a><a  class="maxBut"></a><a class="minBut"></a></li>
                    
                    <!--定义窗体主菜单-->
                    <li class="emenu">
                        <dl class="menuItem mainItem">
                            <dt class="menuText"><a>文件</a></dt>
                            
                            <!--定义文件子菜单-->
                            <dd class="childMenu">
                                 <dl class="menuItem" data-ewin-event-click="notepad.clearAll();">
                                    <dt class="menuText"><a>新建</a></dt>
                                 </dl>
                                 <dl class="menuItem" data-ewin-event-click="closeNoteWin(winEvent);">
                                    <dt class="menuText"><a>退出</a></dt>
                                 </dl>
                            </dd>
                        </dl>
                        
                        <hr />
                        <dl class="menuItem mainItem">
                            <dt class="menuText"><a>编辑</a></dt>
                            
                            <!--定义编辑子菜单-->
                            <dd class="childMenu">
                                <dl class="menuItem">
                                    <dt class="menuText"><a  id="notaSelectAll" >全选</a> </dt>
                                </dl>
                                <dl class="menuItem" data-ewin-event-click="notepad.cut();">
                                    <dt class="menuText"><a>剪切</a></dt>
                                </dl>
                                <dl class="menuItem" data-ewin-event-click="notepad.copy();">
                                    <dt class="menuText"><a>复制</a></dt>
                                </dl>
                                <dl class="menuItem" data-ewin-event-click="notepad.paste();">
                                    <dt class="menuText"><a>粘贴</a></dt>
                                </dl>
                            </dd>
                        </dl>
                        
                        <hr />
                        <dl class="menuItem mainItem">
                            <dt class="menuText"><a>帮助</a></dt>
                            <dd></dd>
                        </dl>
                    </li>
                    
                    <!--定义工作区-->
                    <li class="workSpace">
                    
                        <!--记事本文本输入区-->
                        <textArea id="textEdit" type="text"></textArea>
                        
                    </li>
                    
                </ol>
                <!----------------------------------------------------------定义记事本应用窗体结束------------------------------------------------------->
                
                
                <!---------------------------------------------------------定义用户管理应用窗体开始-------------------------------------------------------->
                <ol id="userManageWin" class="window" data-ewin-thumPoint="userManageWinThum" data-ewin-state="close">
                
                    <!--定义标题栏-->
                    <li class="titleBar"><span class="caption">用户管理 [含工具栏窗体]</span><a  class="closeBut"></a><a  class="maxBut"></a><a class="minBut"></a></li>
                    
                    <!--定义工具栏-->
                    <li class="toolArea">
                        <ul class="toolBar">
                            <li class="toolItem addUserTool" data-ewin-event-click="openAddUserDialog(winEvent);">添加</li>
                            <li class="toolItem changeUserTool" data-ewin-event-click="openChangeUserInfoDialog(winEvent);">修改</li>
                            <li class="toolItem landUserTool" data-ewin-event-click="openLandUserDialog(winEvent);">登陆</li>
                        </ul>
                    </li>
                    
                    <!--定义工作区-->
                    <li class="workSpace">
                    
                        <!--下面这个表格是用户信息的正文，属于demo的应用与eWin没有关系-->
                        <table id="userList"></table>
                        
                    </li>
                    
                </ol>
                <!---------------------------------------------------------定义用户管理应用窗体结束-------------------------------------------------------->
                
                
                <!-----------------------------------------------------------定义相删应用窗体开始--------------------------------------------------------->
                <ol id="pictureManageWin" class="window" data-ewin-thumPoint="pictureManageWinThum" data-ewin-state="close">
                
                    <!--定义标题栏-->
                    <li class="titleBar"><span class="caption">相册 [含标签窗体]</span><a  class="closeBut"></a><a  class="maxBut"></a><a class="minBut"></a></li>
                    
                    <!--定义工作区-->
                    <li class="workSpace">
                    
                        <!--定义标签-->
                        <ul class="tabControl">
                        
                            <!--定义标签头-->
                            <li class="tabHead">
                                <a id="animationTag" class="tag" data-ewin-substanceId="animation" data-ewin-actCss="act" >动漫</a>
                                <a id="sceneryTag" class="tag" data-ewin-substanceId="scenery" data-ewin-actCss="act" >风景</a>
                                <a id="lifeTag" class="tag" data-ewin-substanceId="life" data-ewin-actCss="act" >生活</a>
                            </li>
                            
                            <!--定义标签体-->
                            <li class="tabBody">
                                <div id="animation" class="substance">
                                    <div class="common">
                                    
                                        <!--这个img是动漫相册-->
                                        <img id="animationBox" />
                                        
                                    </div>
                                </div>
                                <div id="scenery" class="substance">
                                    <div class="common">
                                    
                                        <!--这个img是风景相册-->
                                        <img id="sceneryBox" />
                                        
                                    </div>
                                </div>
                                <div id="life" class="substance">
                                    <div class="common">
                                    
                                        <!--这个img是生活相册-->
                                        <img id="lifeBox" />
                                        
                                    </div>
                                </div>
                            </li>
                        </ul>
                        
                    </li>
                </ol>
                <!--------------------------------------------------------------定义相删应用窗体结束---------------------------------------------------------->
                
                
                <!-------------------------------------------------------------定义包含框架的窗体开始--------------------------------------------------------->
                <ol id="includeSplitConWin" class="window" data-ewin-thumPoint="includeSplitConWinThum" data-ewin-minWidth="300" data-ewin-minHeight="300" data-ewin-state="close">
                
                    <!--定义标题栏-->
                    <li class="titleBar"><span class="caption">包含SplitContainer窗体</span><a  class="closeBut"></a><a  class="maxBut"></a><a class="minBut"></a></li>
                    
                    <!--定义工作区-->
                    <li class="workSpace">
                    
                        <!--定义主框架-->
                        <ol id="mainSplitCon" class="splitContainer" data-ewin-height="414" data-ewin-topHeight="300" data-ewin-bottomHeight="106">
                        
                            <!--主框架顶部容器-->
                            <li id="topPanel" class="panel" >
                            
                                <!--子框架-->
                                <ol id="childSplitCon" class="splitContainer" data-ewin-width="488"  data-ewin-leftWidth="100" data-ewin-rightWidth="380">
                                
                                    <!--子框架左侧容器-->
                                    <li id="leftPanel" class="panel" data-ewin-flexMode="fixed">
                                        <div class="panelHead">常用导航</div>
                                    </li>
                                    
                                    <!--子框架分隔条-->
                                    <li class="hSpaceBar" ></li>
                                    
                                    <!--子框架右侧容器-->
                                    <li id="rightPanel" class="panel" >
                                        <div class="panelHead">浏览区</div>
                                    </li>
                                </ol>
                                
                            </li>
                            
                            <!--主框架分隔条-->
                            <li class="vSpaceBar"></li>
                            
                            <!--主框架底部容器-->
                            <li id="bottomPanel" class="panel" data-ewin-flexMode="fixed">
                                <div class="panelHead">网址输入区</div>
                            </li>
                        </ol>
                        
                    </li>
                </ol>
                <!-------------------------------------------------------------定义包含框架的窗体结束--------------------------------------------------------->
                
                
                <!-------------------------------------------------------------定义包含子窗体的窗体开始---------------------------------------------------------->
                <ol id="includeChildWin"  class="window" data-ewin-minWidth="100" data-ewin-minHeight="100"  data-ewin-thumPoint="includeChildWinThum" data-ewin-state="close">
                
                    <!--主窗体标题栏-->
                    <li  class="titleBar"><span class="caption">包含子窗体的窗体</span><a  class="closeBut"></a><a  class="maxBut"></a><a class="minBut"></a></li>
                    
                    <!--主窗体工具栏-->
                    <li class="toolArea">
                        <ul class="toolBar">
                            <li class="toolItem" data-ewin-event-click="openChildWin(winEvent);">打开子窗体</li>
                        </ul>
                    </li>
                    
                    <!--主窗体工作区-->
                    <li class="workSpace" >
                        
                        <!--子窗体-->
                        <ol id="childWin" data-ewin-minWidth="100" data-ewin-minHeight="100" class="window">
                        
                            <!--子窗体栏题栏-->
                            <li class="titleBar" ><span class="caption">子窗体</span><a  class="closeBut"></a><a  class="maxBut"></a><a class="minBut"></a></li>
                            
                            <!--子窗体工作区-->
                            <li class="workSpace"></li>
                        </ol>
                        
                    </li>
                </ol>
                <!-------------------------------------------------------------定义包含子窗体的窗体结束---------------------------------------------------------->
            
            </div>
        </li>
        
        
        <!--------------------------------------------------------------------------任务栏定义开始--------------------------------------------------------------->
        <li class="taskBarLay">
            <div id="deskTaskBar" class="taskBar" data-ewin-thumCountAsPage="0" >
            
                <!--定义开始菜单-->
                <div class="startMenu">
                    <dl class="startMenuItem">
                        <dt class="menuText"><img src="res/img/startMenu.jpg" /></dt>
                        
                        <!--定义开始菜单中的一级菜单-->
                        <dd class="startChildMenu">
                            <div class="menuCaption">开始菜单</div>
                            <a class="startMenuItem" data-ewin-event-click="openNoteWin(winEvent);">记事本</a>
                            <a class="startMenuItem" data-ewin-event-click="openUserManageWin(winEvent);">用户管理</a>
                            <a class="startMenuItem" data-ewin-event-click="openPictureManageWin(winEvent);">相册</a>
                            <a class="startMenuItem" data-ewin-event-click="openIncludeSplitConWin(winEvent);">包含框架的窗体</a>
                            <a class="startMenuItem" data-ewin-event-click="openIncludeChildWin(winEvent);">包含子窗体的窗体</a>
                        </dd>
                        
                    </dl>
                </div>
                
                
                <!--
                    以下代码分别为每个窗体定义缩略图的快捷菜单，其实在这里可以只定义一个快捷菜单然后写一段javascript代码把菜单里的指令与窗体对应起来
                -->
                
                <!--定义记事本窗体缩略图快捷菜单-->
                <div id="thumShortcutForNote" class="shortcutMenu" data-ewin-top="-125" >
                    <a class="shortcutMenuItem" data-ewin-event-click="resetWin(document.getElementById('noteWin'));">恢复</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="minWin(document.getElementById('noteWin'));">最小化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="maxWin(document.getElementById('noteWin'));">最大化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="closeWin(document.getElementById('noteWin'));">关闭</a>
                </div>
                
                <!--定义用户管理窗体缩略图快捷菜单-->
                <div id="thumShortcutForUserManage" class="shortcutMenu" data-ewin-top="-125" >
                    <a class="shortcutMenuItem" data-ewin-event-click="resetWin(document.getElementById('userManageWin'));">恢复</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="minWin(document.getElementById('userManageWin'));">最小化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="maxWin(document.getElementById('userManageWin'));">最大化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="closeWin(document.getElementById('userManageWin'));">关闭</a>
                </div>
                
                <!--定义相册窗体缩略图快捷菜单-->
                <div id="thumShortcutForPictureBox" class="shortcutMenu" data-ewin-top="-125" >
                    <a class="shortcutMenuItem" data-ewin-event-click="resetWin(document.getElementById('pictureManageWin'));">恢复</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="minWin(document.getElementById('pictureManageWin'));">最小化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="maxWin(document.getElementById('pictureManageWin'));">最大化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="closeWin(document.getElementById('pictureManageWin'));">关闭</a>
                </div>
                
                <!--定义包含框架的窗体缩略图快捷菜单-->
                <div id="thumShortcutForSplitCon" class="shortcutMenu" data-ewin-top="-125" >
                    <a class="shortcutMenuItem" data-ewin-event-click="resetWin(document.getElementById('includeSplitConWin'));">恢复</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="minWin(document.getElementById('includeSplitConWin'));">最小化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="maxWin(document.getElementById('includeSplitConWin'));">最大化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="closeWin(document.getElementById('includeSplitConWin'));">关闭</a>
                </div>
                
                <!--定义包含子窗体的窗体缩略图快捷菜单-->
                <div id="thumShortcutForIncludeChildWin" class="shortcutMenu" data-ewin-top="-125" >
                    <a class="shortcutMenuItem" data-ewin-event-click="resetWin(document.getElementById('includeChildWin'));">恢复</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="minWin(document.getElementById('includeChildWin'));">最小化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="maxWin(document.getElementById('includeChildWin'));">最大化</a>
                    <a class="shortcutMenuItem" data-ewin-event-click="closeWin(document.getElementById('includeChildWin'));">关闭</a>
                </div>
                
                <!--定义窗体缩略图-->
                <ul id="thums">
                    <li id="noteWinThum" class="thum" data-ewin-shortcutId="thumShortcutForNote">记事本</li>
                    <li id="userManageWinThum" class="thum" data-ewin-shortcutId="thumShortcutForUserManage">用户管理</li>
                    <li id="pictureManageWinThum" class="thum"  data-ewin-shortcutId="thumShortcutForPictureBox">相册</li>
                    <li id="includeSplitConWinThum" class="thum" data-ewin-shortcutId="thumShortcutForSplitCon">包含框架的窗体</li>
                    <li id="includeChildWinThum" class="thum" data-ewin-shortcutId="thumShortcutForIncludeChildWin">包含子窗体的窗体</li>
                </ul>
                
            </div>
        </li>
        <!--------------------------------------------------------------------------任务栏定义结束--------------------------------------------------------------->
        
    </ol>
    
    <!--加载deskDemo.js文件，这个文件包含了demo里的一些具体应用，例如：记事本、相删、用户管理器等，但这些与eWin没有任何关系-->
    <script type="text/javascript" src="res/js/deskDemo.js"></script>
    
    <!--
        eWin的文件及代码都托管给了JPM进行管理，所以在这里加载配制好的JPM，并由JPM启动eWin
    -->
    <script id="JPMScript" type="text/javascript"  src="../../JPM/JPM.js"></script>
</body>
</html>
```
