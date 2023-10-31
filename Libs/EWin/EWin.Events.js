/*--
    本文件主要用于定义eWin中各元素的事件
--*/
(function () {
    eval(JPM.spaceUsing("EWin","eWin"));
    eval(JPM.spaceUsing("EWin.Event","WinEvent"));
    
    
    
    /*
        定义eWin事件对象类
            属性：
                target                          事件发生的目标对象
                eWin                            eWin对象
            方法：
                preventDefault                  阻止事件默认行为
    */
    JPM.nameSpace(
        "EWin.Event",
        
        function  WinEvent( target ) {
            this.target = target;
            this.eWin = eWin;
            
            //阻止事件默认行为
            this.preventDefault = function( arg ) {
                if ( arg && arg === "strong" ) {
                    arguments.callee.caller.isPreventDefault = "strong";
                    arguments.callee.caller.caller.isPreventDefault = "strong";
                } else {
                    arguments.callee.caller.isPreventDefault = true;
                    arguments.callee.caller.caller.isPreventDefault = true;
                }
            }
        }
    );
    
    
    // 定义Desktop元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function DesktopEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval( add ) };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval( remove ) };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function() {;} );        
            }
        }
    );


    // 定义WinSpace元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function WinSpaceEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval( add ) };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval( remove ) };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function() {;} );        
            }
        }
    );
    
    
    // 定义Icon元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function IconEvent() {
            var winEvent = new WinEvent ( this );
            this.winEvent = winEvent;
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if ( click ) {
                this.clickEvent = function() { eval(click) };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );       
            }
            
            var undrag = this.tagNode.getAttribute( "data-ewin-event-undrag" ) || this.tagNode.getAttribute( "undrag" );
            if ( undrag ) {
                this.undragEvent = function() { eval(undrag) };                  
            } else {
                JPM.virtualMethod( this, "undragEvent", function(){;} );        
            }
            
            var draging = this.tagNode.getAttribute( "data-ewin-event-draging" ) || this.tagNode.getAttribute( "draging" );
            if ( draging ) {
                this.dragingEvent = function() { eval(draging) };                  
            } else {
                JPM.virtualMethod( this, "dragingEvent", function(){;} );        
            }
            
            var draged = this.tagNode.getAttribute( "data-ewin-event-draged" ) || this.tagNode.getAttribute( "draged" )
            if( draged ) {
                this.dragedEvent = function() { eval(draged) };                  
            } else {
                JPM.virtualMethod( this, "dragedEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义Window元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function WindowEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;

            var loaded = this.tagNode.getAttribute( "data-ewin-event-loaded" ) || this.tagNode.getAttribute( "loaded" );
            if ( loaded ) {
                this.loadedEvent = function() { eval(loaded); };
            } else {
                JPM.virtualMethod( this, "loadedEvent", function() {;} );
            }

            var open = this.tagNode.getAttribute( "data-ewin-event-open" ) || this.tagNode.getAttribute( "open" );
            if ( open ) {
                this.openEvent = function() { eval(open); };
            } else {
                JPM.virtualMethod( this, "openEvent", function() {;} );
            }

            var actitave = this.tagNode.getAttribute( "data-ewin-event-actitave" ) || this.tagNode.getAttribute( "actitave" );
            if ( actitave ) { 
                this.actitaveEvent = function() { eval(actitave); };
            } else {
                JPM.virtualMethod( this, "actitaveEvent", function() {;} );
            }

            var close = this.tagNode.getAttribute( "data-ewin-event-close" ) || this.tagNode.getAttribute( "close" );
            if ( close ) {
                this.closeEvent = function() { eval(close); };
            } else {
                JPM.virtualMethod( this, "closeEvent", function() {;} );
            }

            var min = this.tagNode.getAttribute( "data-ewin-event-min" ) || this.tagNode.getAttribute( "min" );
            if ( min ) {
                this.minEvent = function() { eval(min); };
            } else {
                JPM.virtualMethod( this, "minEvent", function() {;} );
            }

            var max = this.tagNode.getAttribute( "data-ewin-event-max" ) || this.tagNode.getAttribute( "max" );
            if ( max ) {
                this.maxEvent = function() { eval(max); };
            } else {
                JPM.virtualMethod( this, "maxEvent", function() {;} );
            }

            var unmove = this.tagNode.getAttribute( "data-ewin-event-unmove" ) || this.tagNode.getAttribute( "unmove" );
            if ( unmove ) {
                this.unmoveEvent = function() { eval(unmove); };
            } else {
                JPM.virtualMethod( this, "unmoveEvent", function() {;} );
            }

            var moving = this.tagNode.getAttribute( "data-ewin-event-moving" ) || this.tagNode.getAttribute( "moving" );
            if ( moving ) {
                this.movingEvent = function() {eval(moving); };
            } else {
                JPM.virtualMethod( this, "movingEvent", function() {;} );
            }

            var moved = this.tagNode.getAttribute( "data-ewin-event-moved" ) || this.tagNode.getAttribute( "moved" );
            if ( moved ) {
                this.movedEvent = function() { eval(moved); };
            } else {
                JPM.virtualMethod( this, "movedEvent", function() {;} );
            }

            var unsize = this.tagNode.getAttribute( "data-ewin-event-unsize" ) || this.tagNode.getAttribute( "unsize" );
            if ( unsize ) {
                this.unsizeEvent = function() { eval(unsize); };
            } else {
                JPM.virtualMethod( this, "unsizeEvent", function() {; } );
            }

            var sizeing = this.tagNode.getAttribute( "data-ewin-event-sizeing" ) || this.tagNode.getAttribute( "sizeing" );
            if ( sizeing ) {
                this.sizeingEvent = function() { eval(sizeing); };
            } else {
                JPM.virtualMethod( this, "sizeingEvent", function() {;} );
            }

            var sizeed = this.tagNode.getAttribute( "data-ewin-event-sizeed" ) || this.tagNode.getAttribute( "sizeed" );
            if ( sizeed ) {
                this.sizeedEvent = function() { eval(sizeed); };
            } else {
                JPM.virtualMethod( this, "sizeedEvent",function() {;} );
            }
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval( add ) };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval( remove ) };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function() {;} );        
            }
        }
    );   
     
    
    // 定义TitleBar元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function TitleBarEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
        
            var dblClick = this.tagNode.getAttribute( "data-ewin-event-dblClick" ) || this.tagNode.getAttribute( "dblClick" );
            if( dblClick ) {
                this.dblClickEvent = function() { var winEvent = windowEvent; eval(dblClick); };        
            } else {
                JPM.virtualMethod( this, "dblClickEvent", function(){;} )
            }
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval( add ) };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval( remove ) };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function() {;} );        
            }
        }
    );
    
    
    // 定义Menu元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function MenuEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} )        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} )        
            }
        }
    );
    
    
    // 定义ChildMenu元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ChildMenuEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );       
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
        }
    );
    
    
    // 定义MenuItem元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function MenuItemEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );      
            }
            
            var click = this.tagNode.getAttribute("data-ewin-event-click") || this.tagNode.getAttribute("click");
            if ( click ) {
                this.clickEvent=function() { eval(click) };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );
            }
        }
    );
    
    
    // 定义ToolArea元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ToolAreaEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
        }
    );
    
    
    // 定义ToolBar元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ToolBarEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var undrag = this.tagNode.getAttribute( "data-ewin-event-undrag" ) || this.tagNode.getAttribute( "undrag" );
            if ( undrag ) {
                this.undragEvent = function() { eval(undrag); };                  
            } else {
                JPM.virtualMethod( this, "undragEvent", function(){;} );        
            }
            
            var draging = this.tagNode.getAttribute( "data-ewin-event-draging" ) || this.tagNode.getAttribute( "draging" );
            if ( draging ) {
                this.dragingEvent=function() { eval(draging) };                  
            } else {
                JPM.virtualMethod( this, "dragingEvent", function(){;} );        
            }
            
            var draged = this.tagNode.getAttribute( "data-ewin-event-draged" ) || this.tagNode.getAttribute( "draged" )
            if ( draged ) {
                this.dragedEvent = function() { eval(draged); };                  
            } else {
                JPM.virtualMethod( this, "dragedEvent", function(){;} );
            }
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent=function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义ToolItem元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ToolItemEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if ( click ) {
                this.clickEvent = function() { eval(click); };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );
            }
        }
    );
    
    
    // 定义WorkSpace元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function WorkSpaceEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add=this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent=function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
        }
    );
    

    
    // 定义TabControl元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function TabControlEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var closeAct = this.tagNode.getAttribute( "data-ewin-event-closeAct" ) || this.tagNode.getAttribute( "closeAct" );
            if ( closeAct ) {
                this.closeActEvent = function() { eval(closeAct); };                  
            } else {
                JPM.virtualMethod( this, "closeActEvent", function(){;} );
            }
            
            var tagAct = this.tagNode.getAttribute( "data-ewin-event-tagAct" ) || this.tagNode.getAttribute( "tagAct" );
            if ( tagAct ) {
                this.tagActEvent=function() { eval(tagAct); };                  
            } else {
                JPM.virtualMethod( this, "tagActEvent", function(){;} );        
            }
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval( add ) };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval( remove ) };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function() {;} );        
            }
         }
    );
    
    
    // 定义TabHead元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function TabHeadEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent=function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
        }
    );
    
    
    // 定义TabBody元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function TabBodyEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
        }
    );
    
    
    // 定义Tag元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function TagEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var undrag = this.tagNode.getAttribute( "data-ewin-event-undrag" ) || this.tagNode.getAttribute( "undrag" );
            if ( undrag ) {
                this.undragEvent = function() { eval(undrag); };                  
            } else {
                JPM.virtualMethod( this, "undragEvent", function(){;} );
            }
            
            var draging = this.tagNode.getAttribute( "data-ewin-event-draging" ) || this.tagNode.getAttribute( "draging" );
            if ( draging ) {
                this.dragingEvent=function() { eval(draging); };                  
            } else {
                JPM.virtualMethod( this, "dragingEvent", function(){;} );
            }
            
            var draged = this.tagNode.getAttribute( "data-ewin-event-draged" ) || this.tagNode.getAttribute( "draged" );
            if ( draged ) {
                this.dragedEvent = function() { eval(draged); };                  
            } else {
                JPM.virtualMethod( this, "dragedEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义SplitContainer元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function SplitContainerEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var unadjust = this.tagNode.getAttribute( "data-ewin-event-unadjust" ) || this.tagNode.getAttribute( "unadjust" );
            if ( unadjust ) {
                this.unadjustEvent = function() { eval(unadjust); };                  
            } else {
                JPM.virtualMethod( this, "unadjustEvent", function(){;} );        
            }
            
            var adjusting = this.tagNode.getAttribute( "data-ewin-event-adjusting" ) || this.tagNode.getAttribute( "adjusting" );
            if ( adjusting ) {
                this.adjustingEvent = function() { eval(adjusting); };                  
            } else {
                JPM.virtualMethod( this, "adjustingEvent", function(){;} );
            }
            
            var adjusted = this.tagNode.getAttribute( "data-ewin-event-adjusted" ) || this.tagNode.getAttribute( "adjusted" );
            if ( adjusted ) {
                this.adjustdEvent = function() { eval(adjusted); };                  
            } else {
                JPM.virtualMethod( this, "adjustedEvent", function(){;} );        
            }
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove=this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
        }
    );
    
    
    // 定义Panel元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function PanelEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
        }
    );
    
    
    // 定义ConfirmBut元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ConfirmButEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if ( click ) {
                this.clickEvent = function() { eval(click); };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );
            }
        }
    );
    
    
    // 定义CancelBut元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function CancelButEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if(click) {
                this.clickEvent=function() {eval(click)};                   
            } else {
                JPM.virtualMethod(this,"clickEvent",function(){;})        
            }
        }
    );
    
    
    // 定义CommonEvent元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function CommonEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if ( click ) {
                this.clickEvent=function() { eval(click); };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );
            }
            
            var undrag = this.tagNode.getAttribute( "data-ewin-event-undrag" ) || this.tagNode.getAttribute( "undrag" );
            if ( undrag ) {
                this.undragEvent = function() { eval(undrag); };                  
            } else {
                JPM.virtualMethod( this, "undragEvent", function(){;} );
            }
            
            var draging = this.tagNode.getAttribute( "data-ewin-event-draging" ) || this.tagNode.getAttribute( "draging" );
            if ( draging ) {
                this.dragingEvent=function() { eval(draging); };
            } else {
                JPM.virtualMethod( this, "dragingEvent", function(){;} );
            }
            
            var draged = this.tagNode.getAttribute( "data-ewin-event-draged" ) || this.tagNode.getAttribute( "draged" );
            if ( draged ) {
                this.dragedEvent = function() { eval(draged); };                  
            } else {
                JPM.virtualMethod( this, "dragedEvent", function(){;} );        
            }
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );
            }
            
        }
    );
    
    
    // 定义TaskBar元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function TaskBarEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent=function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent=function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义StartMenu元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function StartMenuEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义StartChildMenu元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function StartChildMenuEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义StartMenuItem元素事件类
    JPM.nameSpace(
        "EWin.Event",
       
        function StartMenuItemEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if ( click ) {
                this.clickEvent = function() { eval(click); };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义Thum元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ThumEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if ( click ) {
                this.clickEvent=function() { eval(click); };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义ShortcutMenu元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ShortcutMenuEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent = function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义ShortcutChildMenu元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ShortcutChildMenuEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent=function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
        }
    );
    
    
    // 定义ShortcutMenuItem元素事件类
    JPM.nameSpace(
        "EWin.Event",
        
        function ShortcutMenuItemEvent(){
            var winEvent = new WinEvent( this );
            this.winEvent = winEvent;
            
            var add = this.tagNode.getAttribute( "data-ewin-event-add" ) || this.tagNode.getAttribute( "add" );
            if ( add ) {
                this.addEvent=function() { eval(add); };                  
            } else {
                JPM.virtualMethod( this, "addEvent", function(){;} );        
            }
            
            var remove = this.tagNode.getAttribute( "data-ewin-event-remove" ) || this.tagNode.getAttribute( "remove" );
            if ( remove ) {
                this.removeEvent = function() { eval(remove); };                   
            } else {
                JPM.virtualMethod( this, "removeEvent", function(){;} );        
            }
            
            var click = this.tagNode.getAttribute( "data-ewin-event-click" ) || this.tagNode.getAttribute( "click" );
            if ( click ) {
                this.clickEvent = function() { eval(click); };                   
            } else {
                JPM.virtualMethod( this, "clickEvent", function(){;} );        
            }
        }
    );
} )();