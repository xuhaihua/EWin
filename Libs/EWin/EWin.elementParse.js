/*--
    本文件主要用于定义eWin元素解析对象[elementParse]
        属性：
            parseMap    解析地图
        方法：
            start       解析启动方法
--*/
( function () {
    // 引用相关类型或对象
    eval( JPM.spaceUsing("Web.DOM","HTMLDom") );
    eval( JPM.spaceUsing("Data","guid") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.ShortcutMenu", "ShortcutChildMenu,ShortcutMenuItem") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar.StartMenu", "StartChildMenu,StartMenuItem") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.TaskBar", "NextPage,PrePage,StartMenu,Thum") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop.WinSpace", "Icon") );
    eval( JPM.spaceUsing("EWin.Entity.Desktop", "ShortcutMenu,TaskBar,WinSpace") );
    eval( JPM.spaceUsing("EWin.Entity.Win.Menu", "ChildMenu,MenuItem") );
    eval( JPM.spaceUsing("EWin.Entity.Win.TitleBar", "TitleCaption,TitleCloseBut,TitleMaxBut,TitleMinBut") );
    eval( JPM.spaceUsing("EWin.Entity.Win.ToolBar", "ToolControlBlock") );
    eval( JPM.spaceUsing("EWin.Entity.Win.ToolBar", "ToolItem") );
    eval( JPM.spaceUsing("EWin.Entity.Win.ToolArea", "ToolBar") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.SplitContainer", "Panel,SpaceBar") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace.TabControl", "TabBody,TabCloseBut,TabHead,TabSubstance,Tag") );
    eval( JPM.spaceUsing("EWin.Entity.Win.WorkSpace", "CancelBut,ConfirmBut,SplitContainer,TabControl,Common") );
    eval( JPM.spaceUsing("EWin.Entity.Win", "Menu,TitleBar,ToolArea,WorkSpace") );
    eval( JPM.spaceUsing("EWin.Entity", "Desktop,Window") );
    
    


    // 定义元素解析地图
    var map = {
        
        Common: {
            superiorLimit: 1,
            sign: "common",
            childElementList: {
            
                parentChildList: {}
            
            },
            assignmentList: []
        },
        
        CancelBut: {
            superiorLimit: 0,
            sign: "cancelBut",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        ConfirmBut: {
            superiorLimit: 0,
            sign: "confirmBut",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        Desktop: {
            superiorLimit: 1,
            sign: "deskTop",
            childElementList: {
                TaskBar: TaskBar,
                WinSpace: WinSpace,
                Common: Common
            },
            assignmentList: ["winSpace"]
        },

        ShortcutMenu: {
            superiorLimit: 0,
            sign: "shortcutMenu",
            childElementList: {
                Common: Common,
                ShortcutMenuItem: ShortcutMenuItem
            },
            assignmentList: []
        },

        ShortcutMenuItem: {
            superiorLimit: 0,
            sign: "shortcutMenuItem",
            childElementList: {
                Common: Common,
                ShortcutChildMenu: ShortcutChildMenu
            },
            assignmentList: ["shortcutChildMenu"]
        },

        ShortcutChildMenu: {
            superiorLimit: 1,
            sign: "shortcutChildMenu",
            childElementList: {
                Common: Common,
                ShortcutMenuItem: ShortcutMenuItem
            },
            assignmentList: []
        },

        WinSpace: {
            superiorLimit: 1,
            sign: "winSpace",
            childElementList: {
                Window: Window,
                Icon: Icon,
                Menu: Menu,
                TabControl: TabControl,
                SplitContainer: SplitContainer,
                ToolBar:ToolBar,
                Common: Common,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        },
        
        Icon: {
            superiorLimit: 0,
            sign: "icon",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        Window: {
            superiorLimit: 0,
            sign: "window",
            childElementList: {
                Common: Common,
                TitleBar: TitleBar,
                Menu: Menu,
                ToolArea: ToolArea,
                WorkSpace: WorkSpace
            },
            assignmentList: ["menu", "titleBar", "toolArea", "workSpace"]
        },

        Menu: {
            superiorLimit: 0,
            sign: "emenu",
            childElementList: {
                Common: Common,
                MenuItem: MenuItem,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        },

        ChildMenu: {
            superiorLimit: 1,
            sign: "childMenu",
            childElementList: {
                Common: Common,
                MenuItem: MenuItem
            },
            assignmentList: []
        },

        MenuItem: {
            superiorLimit: 0,
            sign: "menuItem",
            childElementList: {
                Common: Common,
                ChildMenu: ChildMenu
            },
            assignmentList: ["childMenu"]
        },

        TitleBar: {
            superiorLimit: 1,
            sign: "titleBar",
            childElementList: {
                Common: Common,
                TitleCaption: TitleCaption,
                TitleCloseBut: TitleCloseBut,
                TitleMaxBut: TitleMaxBut,
                TitleMinBut: TitleMinBut,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: ["controlBlock"]
        },

        TitleCaption: {
            superiorLimit: 1,
            sign: "titleCaption",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        TitleCloseBut: {
            superiorLimit: 1,
            sign: "closeBut",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        TitleMaxBut: {
            superiorLimit: 1,
            sign: "maxBut",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        TitleMinBut: {
            superiorLimit: 1,
            sign: "minBut",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        ToolArea: {
            superiorLimit: 1,
            sign: "toolArea",
            childElementList: {
                Common: Common,
                ToolBar: ToolBar,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        },

        ToolBar: {
            superiorLimit: 0,
            sign: "toolBar",
            childElementList: {
                Common: Common,
                ToolItem: ToolItem,
                ToolControlBlock: ToolControlBlock,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        },

        ToolItem: {
            superiorLimit: 0,
            sign: "toolItem",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        ToolControlBlock: {
            superiorLimit: 1,
            sign: "controlBlock",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        WorkSpace: {
            superiorLimit: 1,
            sign: "workSpace",
            childElementList: {
                Window: Window,
                CancelBut: CancelBut,
                ConfirmBut: ConfirmBut,
                Common: Common,
                TabControl: TabControl,
                SplitContainer: SplitContainer,
                Menu: Menu,
                ToolBar: ToolBar,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        },
 
        SplitContainer: {
            superiorLimit: 0,
            sign: "splitContainer",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        Panel: {
            superiorLimit: 2,
            sign: "panel",
            childElementList: {
                TabControl: TabControl,
                SplitContainer: SplitContainer,
                CancelBut: CancelBut,
                ConfirmBut: ConfirmBut,
                Common: Common,
                Menu: Menu,
                ToolBar: ToolBar,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        },

        TabControl: {
            superiorLimit: 0,
            sign: "tabControl",
            childElementList: {
                Common: Common,
                TabHead: TabHead,
                TabBody: TabBody
            },
            assignmentList: ["tabHead", "tabBody"]
        },

        TabHead: {
            superiorLimit: 1,
            sign: "tabHead",
            childElementList: {
                Common: Common,
                Tag: Tag,
                TabCloseBut: TabCloseBut,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: ["tabCloseBut"]
        },

        Tag: {
            superiorLimit: 0,
            sign: "tag",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        TabCloseBut: {
            superiorLimit: 1,
            sign: "closeBut",
            childElementList: {
                Common: Common
            },
            assignmentList: []
        },

        TabBody: {
            superiorLimit: 1,
            sign: "tabBody",
            childElementList: {
                Common: Common,
                TabSubstance: TabSubstance
            },
            assignmentList: []
        },

        TabSubstance: {
            superiorLimit: 0,
            sign: "substance",
            childElementList: {
                CancelBut: CancelBut,
                ConfirmBut: ConfirmBut,
                Common: Common,
                Menu: Menu,
                ToolBar: ToolBar,
                ShortcutMenu: ShortcutMenu,
                Common: Common
            },
            assignmentList: []
        },

        TaskBar: {
            superiorLimit: 1,
            sign: "taskBar",
            childElementList: {
                Common: Common,
                StartMenu: StartMenu,
                Thum: Thum,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: ["startMenu"]
        },

        StartMenu: {
            superiorLimit: 1,
            sign: "startMenu",
            childElementList: {
                Common: Common,
                StartMenuItem: StartMenuItem,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        },

        StartChildMenu: {
            superiorLimit: 1,
            sign: "startChildMenu",
            childElementList: {
                Common: Common,
                StartMenuItem: StartMenuItem
            },
            assignmentList: []
        },

        StartMenuItem: {
            superiorLimit: 0,
            sign: "startMenuItem",
            childElementList: {
                Common: Common,
                StartChildMenu: StartChildMenu
            },
            assignmentList: ["startChildMenu"]
        },

        Thum: {
            superiorLimit: 0,
            sign: "thum",
            childElementList: {
                Common: Common,
                ShortcutMenu: ShortcutMenu
            },
            assignmentList: []
        }
    };

    // 解析启动方法
    function start() {
    
        // 定义解析处理器
        function handler ( nodeHTML ) {
            var isFindedDeskTop = false;
            if ( HTMLDom.getNodeType(nodeHTML) === "ELEMENT_NODE" ) {
                var signName = nodeHTML.tagName;
                if ( !isFindedDeskTop && (signName.toLocaleUpperCase() === "DESKTOP" || eWin.checkElementStyleClass("deskTop",nodeHTML)) ) {
                    
                    if(!nodeHTML.getAttribute("data-ewin-indexguid")) {
                        
                        // 设置索引键indexguid
                        var indexGuid=guid.build();
                        nodeHTML.setAttribute( "data-ewin-indexguid", indexGuid );
                        
                        // 创建桌面对象Desktop
                        var deskTop = new Desktop( nodeHTML );
                        eWin.deskTop = deskTop;
                        eWin.addItem( indexGuid, deskTop );
                        
                        deskTop.load( map );
                        isFindedDeskTop = true;
                     }
                }
            }
            if ( isFindedDeskTop ) {
                return false;
            } else {
                return true;
            }
        }
        
        // 定义查找的范围[防止遍历溢出]
        function range( node ){
            if ( node === document.body ) {
                return true;
            }
        }
        
        // 解析执行
        HTMLDom.backwardTravevsal( document.body, handler, range )
    } 
    
    // 定义elementParse对象
    JPM.nameSpace(
        "EWin",
        "elementParse", {
                            map: map,
                            start: start
                        }
    )
} )();