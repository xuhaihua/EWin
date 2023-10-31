JPM.IConfig(
    '<interfaces>'+
    
        // 定义IElement接口
        '<interface space="EWin" name="IElement">'+
            '<properties>'+
                '<property name="tagNode" value="object"></property>'+
            '</properties>'+
            '<methods>'+
                '<method  name="getType"></method>'+
                '<method  name="format"></method>'+
                
                '<method  name="getLeft"></method>'+
                '<method  name="getTop"></method>'+
                '<method  name="setLeft"></method>'+
                '<method  name="setTop"></method>'+
                '<method  name="getWidth"></method>'+
                '<method  name="getHeight"></method>'+
                '<method  name="setWidth"></method>'+
                '<method  name="setHeight"></method>'+
                '<method  name="setWidthByOffset"></method>'+
                '<method  name="setHeightByOffset"></method>'+
                
                '<method  name="show"></method>'+
                '<method  name="hide"></method>'+
                
                '<method  name="getChildElements"></method>'+
                '<method  name="addElement"></method>'+
                '<method  name="removeElement"></method>'+
                
                '<method  name="load"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IDesktopEvent接口
        '<interface space="EWin" name="IDesktopEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IDesktop接口
        '<interface space="EWin" name="IDesktop" inherit="EWin.IElement,EWin.IDesktopEvent">'+
            '<properties>'+
                '<property name="winSpace" value="EWin.Entity.Desktop.WinSpace"></property>'+
                '<property name="iconRoll" value="number"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
      
        // 定义IMenuEvent接口
        '<interface space="EWin" name="IWinSpaceEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
            
        // 定义IWinSpace接口
        '<interface space="EWin" name="IWinSpace" inherit="EWin.IElement,EWin.IWinSpaceEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuEvent接口
        '<interface space="EWin" name="IIconEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="clickEvent"></method>'+
                '<method  name="undragEvent"></method>'+
                '<method  name="dragingEvent"></method>'+
                '<method  name="dragedEvent"></method>'+
            '</methods>'+
        '</interface>'+
            
        // 定义IWinSpace接口
        '<interface space="EWin" name="IIcon" inherit="EWin.IElement,EWin.IIconEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuEvent接口
        '<interface space="EWin" name="IShortcutMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenu接口
        '<interface space="EWin" name="IShortcutMenu" inherit="EWin.IElement,EWin.IShortcutMenuEvent">'+
            '<properties>'+
                //'<property name="top" value="number"></property>'+
                //'<property name="left" value="number"></property>'+
                '<property name="offsetX" value="number"></property>'+
                '<property name="offsetY" value="number"></property>'+
            '</properties>'+
            '<methods>'+
                '<method  name="furl"></method>'+
                '<method  name="spread"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IChildMenuEvent接口
        '<interface space="EWin" name="IShortcutChildMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IChildMenu接口
        '<interface space="EWin" name="IShortcutChildMenu" inherit="EWin.IElement,EWin.IShortcutChildMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuItemEvent接口
        '<interface space="EWin" name="IShortcutMenuItemEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
                '<method  name="clickEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuItem接口
        '<interface space="EWin" name="IShortcutMenuItem" inherit="EWin.IElement,EWin.IShortcutMenuItemEvent">'+
            '<properties>'+
                '<property name="shortcutChildMenu" value="EWin.Entity.Desktop.ShortcutMenu.ShortcutMenuItem"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IWindowEvent接口
        '<interface space="EWin" name="IWindowEvent">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="loadedEvent"></method>'+
                '<method  name="openEvent"></method>'+
                '<method  name="actitaveEvent"></method>'+
                '<method  name="closeEvent"></method>'+
                '<method  name="minEvent"></method>'+
                '<method  name="maxEvent"></method>'+
                '<method  name="unmoveEvent"></method>'+
                '<method  name="movingEvent"></method>'+
                '<method  name="movedEvent"></method>'+
                '<method  name="unsizeEvent"></method>'+
                '<method  name="sizeingEvent"></method>'+
                '<method  name="sizeedEvent"></method>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IWindow接口
        '<interface space="EWin" name="IWindow" inherit="EWin.IElement,EWin.IWindowEvent">'+
            '<properties>'+
                '<property name="tagNode" value="object"></property>'+
                '<property name="titleBar" value="EWin.Entity.Win.TitleBar"></property>'+
                '<property name="toolArea" value="EWin.Entity.Win.ToolArea"></property>'+
                '<property name="menu" value="EWin.Entity.Win.Menu"></property>'+
                '<property name="workSpace" value="EWin.Entity.Win.WorkSpace"></property>'+
                '<property name="state" value="string"></property>'+
                '<property name="type" value="string"></property>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
                '<property name="thumPoint" value="string"></property>'+
            '</properties>'+
             '<methods>'+
                '<method  name="actitave"></method>'+
                '<method  name="open"></method>'+
                '<method  name="min"></method>'+
                '<method  name="max"></method>'+
                '<method  name="close"></method>'+
                '<method  name="reset"></method>'+
                '<method  name="widthFlex"></method>'+
                '<method  name="heightFlex"></method>'+
                
                '<method  name="saveSize"></method>'+
            '</methods>'+
        '</interface>'+
        
        
        // 定义ITitleBarEvent接口
        '<interface space="EWin" name="ITitleBarEvent">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="dblClickEvent"></method>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        
        // 定义ITitleBar接口
        '<interface space="EWin" name="ITitleBar" inherit="EWin.IElement,EWin.ITitleBarEvent">'+
            '<properties>'+
                '<property name="caption" value="EWin.Entity.Win.TitleBar.TitleCaption"></property>'+
                '<property name="minBut" value="EWin.Entity.Win.TitleBar.TitleMinBut"></property>'+
                '<property name="maxBut" value="EWin.Entity.Win.TitleBar.TitleMaxBut."></property>'+
                '<property name="closeBut" value="EWin.Entity.Win.TitleBar.TitleCloseBut"></property>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        
        // 定义ITitleBar接口
        '<interface space="EWin" name="ITitleCaption" inherit="EWin.IElement">'+
             '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITitleMinBut接口
        '<interface space="EWin" name="ITitleMinBut" inherit="EWin.IElement">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITitleMaxBut接口
        '<interface space="EWin" name="ITitleMaxBut" inherit="EWin.IElement">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITitleCloseBut接口
        '<interface space="EWin" name="ITitleCloseBut" inherit="EWin.IElement">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuEvent接口
        '<interface space="EWin" name="IMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenu接口
        '<interface space="EWin" name="IMenu" inherit="EWin.IElement,EWin.IMenuEvent">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
            '<methods>'+
                '<method  name="furl"></method>'+
                '<method  name="spread"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IChildMenuEvent接口
        '<interface space="EWin" name="IChildMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IChildMenu接口
        '<interface space="EWin" name="IChildMenu" inherit="EWin.IElement,EWin.IChildMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuItemEvent接口
        '<interface space="EWin" name="IMenuItemEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
                '<method  name="clickEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuItem接口
        '<interface space="EWin" name="IMenuItem" inherit="EWin.IElement,EWin.IMenuItemEvent">'+
            '<properties>'+
                '<property name="childMenu" value="EWin.Entity.Win.Menu.ChildMenu"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IMenuItemEvent接口
        '<interface space="EWin" name="IToolAreaEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IToolArea接口
        '<interface space="EWin" name="IToolArea" inherit="EWin.IElement,EWin.IToolAreaEvent">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
        '</interface>'+
        
        // 定义IWorkSpaceEvent接口
        '<interface space="EWin" name="IWorkSpaceEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IWorkSpace接口
        '<interface space="EWin" name="IWorkSpace" inherit="EWin.IElement,EWin.IWorkSpaceEvent">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
        '</interface>'+
        
        // 定义ITabControlEvent接口
        '<interface space="EWin" name="ITabControlEvent" >'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="closeActEvent"></method>'+
                '<method  name="tagActEvent"></method>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IWindow接口
        '<interface space="EWin" name="ITabControl" inherit="EWin.IElement,EWin.ITabControlEvent">'+
            '<properties>'+
                '<property name="tabHead" value="EWin.Entity.Win.WorkSpace.TabControl.TabHead"></property>'+
                '<property name="tabBody" value="EWin.Entity.Win.WorkSpace.TabControl.TabBody"></property>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
                '<property name="act" value="string"></property>'+
            '</properties>'+
             '<methods>'+
                '<method  name="actitaveTag"></method>'+
                '<method  name="closeActTag"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITabHeadEvent接口
        '<interface space="EWin" name="ITabHeadEvent" >'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IWindow接口
        '<interface space="EWin" name="ITabHead" inherit="EWin.IElement,EWin.ITabHeadEvent">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITagEvent接口
        '<interface space="EWin" name="ITagEvent" >'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="undragEvent"></method>'+
                '<method  name="dragingEvent"></method>'+
                '<method  name="dragedEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITag接口
        '<interface space="EWin" name="ITag" inherit="EWin.IElement,EWin.ITagEvent">'+
            '<properties>'+
                '<property name="actCss" value="string"></property>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IWindow接口
        '<interface space="EWin" name="ITabCloseBut" inherit="EWin.IElement">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITabBody接口
        '<interface space="EWin" name="ITabBodyEvent" >'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
      
       // 定义ITabBody接口
        '<interface space="EWin" name="ITabBody" inherit="EWin.IElement,EWin.ITabBodyEvent">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITabSubstance接口
        '<interface space="EWin" name="ITabSubstance" inherit="EWin.IElement">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ISplitContainerEvent接口
        '<interface space="EWin" name="ISplitContainerEvent">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="unadjustEvent"></method>'+
                '<method  name="adjustingEvent"></method>'+
                '<method  name="adjustedEvent"></method>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ISplitContainer接口
        '<interface space="EWin" name="ISplitContainer" inherit="EWin.IElement,EWin.ISplitContainerEvent">'+
            '<properties>'+
                '<property name="firstPanel" value="EWin.Entity.Win.WorkSpace.SplitContainer.Panel"></property>'+
                '<property name="secondPanel" value="EWin.Entity.Win.WorkSpace.SplitContainer.Panel"></property>'+
                '<property name="spaceBar" value="EWin.Entity.Win.WorkSpace.SplitContainer.SpaceBar"></property>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
             '<methods>'+
                '<method  name=" sizeAdjust "></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IPanelEvent接口
        '<interface space="EWin" name="IPanelEvent">'+
            '<properties>'+
            '</properties>'+
             '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IPanel接口
        '<interface space="EWin" name="IPanel" inherit="EWin.IElement,EWin.IPanelEvent">'+
            '<properties>'+
                '<property name="splitContainer" value="EWin.Entity.Win.WorkSpace.SplitContainer"></property>'+
                '<property name="tabControl" value="EWin.Entity.Win.WorkSpace.TabControl"></property>'+
                '<property name="flexMode" value="string"></property>'+
                '<property name="minSize" value="number"></property>'+
            '</properties>'+
             '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ISpaceBar接口
        '<interface space="EWin" name="ISpaceBar" inherit="EWin.IElement">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IConfirmButEvent接口
        '<interface space="EWin" name="IConfirmButEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="clickEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IConfirmBut接口
        '<interface space="EWin" name="IConfirmBut" inherit="EWin.IElement,EWin.IConfirmButEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ICancelButEvent接口
        '<interface space="EWin" name="ICancelButEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="clickEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ICancelBut接口
        '<interface space="EWin" name="ICancelBut" inherit="EWin.IElement,EWin.ICancelButEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ICommonEvent接口
        '<interface space="EWin" name="ICommonEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="clickEvent"></method>'+
                '<method  name="undragEvent"></method>'+
                '<method  name="dragingEvent"></method>'+
                '<method  name="dragedEvent"></method>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ICommon接口
        '<interface space="EWin" name="ICommon" inherit="EWin.IElement,EWin.ICommonEvent">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
            
        // 定义IToolBarEvent接口
        '<interface space="EWin" name="IToolBarEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="undragEvent"></method>'+
                '<method  name="dragingEvent"></method>'+
                '<method  name="dragedEvent"></method>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IToolBar接口
        '<interface space="EWin" name="IToolBar" inherit="EWin.IElement,EWin.IToolBarEvent">'+
            '<properties>'+
                '<property name="wFlex" value="boolean"></property>'+
                '<property name="hFlex" value="boolean"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IToolItemEvent接口
        '<interface space="EWin" name="IToolItemEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="clickEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IToolItem接口
        '<interface space="EWin" name="IToolItem" inherit="EWin.IElement,EWin.IToolItemEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义ITaskBarEvent接口
        '<interface space="EWin" name="ITaskBarEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
            
        // 定义ITaskBar接口
        '<interface space="EWin" name="ITaskBar" inherit="EWin.IElement,EWin.ITaskBarEvent">'+
            '<properties>'+
                '<property name="startMenu" value="EWin.Entity.Desktop.TaskBar.StartMenu"></property>'+
                '<property name="thumCount" value="number"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IStartMenuEvent接口
        '<interface space="EWin" name="IStartMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IStartMenu接口
        '<interface space="EWin" name="IStartMenu" inherit="EWin.IElement,EWin.IStartMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="furl"></method>'+
                '<method  name="spread"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IStartChildMenuEvent接口
        '<interface space="EWin" name="IStartChildMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IStartChildMenu接口
        '<interface space="EWin" name="IStartChildMenu" inherit="EWin.IElement,EWin.IStartChildMenuEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IStartMenuItemEvent接口
        '<interface space="EWin" name="IStartMenuItemEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="addEvent"></method>'+
                '<method  name="removeEvent"></method>'+
                '<method  name="clickEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IStartMenuItem接口
        '<interface space="EWin" name="IStartMenuItem" inherit="EWin.IElement,EWin.IStartMenuItemEvent">'+
            '<properties>'+
                '<property name="startChildMenu" value="EWin.Entity.Win.Menu.ChildMenu"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IThumEvent接口
        '<interface space="EWin" name="IThumEvent">'+
            '<properties>'+
            '</properties>'+
            '<methods>'+
                '<method  name="clickEvent"></method>'+
            '</methods>'+
        '</interface>'+
        
        // 定义IThum接口
        '<interface space="EWin" name="IThum" inherit="EWin.IElement,EWin.IThumEvent">'+
            '<properties>'+
                '<property name="state" value="string"></property>'+
            '</properties>'+
            '<methods>'+
            '</methods>'+
        '</interface>'+
        
    '</interfaces>'
);

