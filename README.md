# EWin
## 简介：
EWin框架通过样式赋予标签行为，可以不用写任何一段Javascript就能开发出与EXT一样的web windows桌面应用
## 示例：
```
<!DOCTYPE html>
<html>
<head>
    <title>桌面系统简单示例</title>
</head>

<body>
    <ol id = "deskDemo" class = "deskTop" data-ewin-iconRoll = "300">
        <!--WinSpace区域-->
        <li class="winSpaceLay">
            <div class="winSpace" data-ewin-shortcutId="deskShortcut" >
            
                <!------------------------------------------定义桌面图标开始--------------------------------------->
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
                <!----------------------------------------定义桌面图标结束----------------------------------->
            </div>
        </li>
        
        <!-------------------------------------------------任务栏定义开始------------------------------------>
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
            </div>
        </li>
        <!-------------------------------------------------任务栏定义结束--------------------------------->

    </ol>
</body>
</html>
```
<img width="100%" src="https://thumbnail0.baidupcs.com/thumbnail/58f8ceedboebc6840db2fa9727e06dc2?fid=1951275689-250528-677206901128424&time=1698764400&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-6Lu0P8kzon8Yfv0kuImNkNzUXV8%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=132224130094535062&dp-callid=0&file_type=0&size=c710_u400&quality=100&vuk=-&ft=video" />

## 正式示例打开 app / windows / index.html 可以看到整个 web 桌面应用的效果
