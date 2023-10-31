/*--
    本文件中的代码主要用于定义EWin的默认行为
--*/
( function() {
    eval( JPM.spaceUsing("Web.DOM", "HTMLDom") );
    eval( JPM.spaceUsing("Web", "css") );
    eval( JPM.spaceUsing("EWin", "eWin") );
    
    
    
    var dBehaviour={
    
        // win打开默认行为
        winOpen: {
            action: function( win ) {
                if ( win.state === "close" ) {
                    win.open();
                    win.reset();
                    win.actitave(win);
                }
            }
        },
        
        
        // 还原最小化窗体
        resetMinWin: {
            action: function( win ) {
            
                if( win.state === "min" ) {
                    win.reset(); 
                    win.actitave(win);
                } 
            }
        },
        

        // 定义图标单击默认行为
        iconClick: {
            action: function( win ) {
                if ( win.state === "close" || win.state === "min" ) {
                
                    win.open();
                    win.reset();
                    win.actitave(win);
                } else {
                    
                    // 激活窗体
                    win.actitave();
                }
            }
        },
        
        
        // 定义图标滚动默认行为
        iconsScroll: {
            
            // 图标滚动起始行为
            start: function( mouseX, mouseY, oldMouseX, oldMouseY ) {
                eWin.deskTop.startMouseX = mouseX;
                eWin.deskTop.isIconScrollStart = false;
            },
            
            // 图标滚动过程行为
            process: function( mouseX, mouseY, oldMouseX, oldMouseY ) {
                
                // 设置图标滚动指令标记
                if ( Math.abs(mouseX - eWin.deskTop.startMouseX) > 50 && !eWin.deskTop.isIconScrollStart && !eWin.deskTop.winSpace.isIconScroll && eWin.deskTop.iconRoll != 0 ) {
                
                    // 获取图标集及操作图标
                    eWin.deskTop.winSpace.icons = new Array();
                    var items = eWin.deskTop.winSpace.getChildElements();
                    for ( var i = 0; i < items.length; i++ ) {
                        if ( items[i].getType() === "Icon" ) {
                            eWin.deskTop.winSpace.icons[eWin.deskTop.winSpace.icons.length] = items[i];
                        }
                    }
                    
                    if ( eWin.deskTop.winSpace.icons.length > 0 ) {
                        for ( var i = 0;i < eWin.deskTop.winSpace.icons.length; i++ ) {
                            eWin.deskTop.winSpace.icons[i].scroolStartLeft = eWin.deskTop.winSpace.icons[i].getLeft();
                        }
                        eWin.deskTop.isIconScrollStart = true;
                       
                    } 
                }
                
                // 图标移动
                if ( eWin.deskTop.isIconScrollStart && !eWin.deskTop.winSpace.isIconScroll ) {
                    eWin.deskTop.winSpace.offsetX = mouseX - eWin.deskTop.startMouseX;
                    for ( var i = 0; i < eWin.deskTop.winSpace.icons.length; i++ ) {
                        var left = eWin.deskTop.winSpace.icons[i].getLeft();
                        eWin.deskTop.winSpace.icons[i].setLeft( left + mouseX - oldMouseX );
                    }
                }
            },
            
            
            // 图标滚动结束方法
            end: function( mouseX, mouseY, oldMouseX, oldMouseY ) {
            
                // 图标滚动执行
                if(eWin.deskTop.isIconScrollStart) {
                    
                    var iconTagNodes = new Array();
                    for(var i = 0 ;i < eWin.deskTop.winSpace.icons.length; i++) {
                        iconTagNodes[iconTagNodes.length] = eWin.deskTop.winSpace.icons[i].tagNode;
                    }
                    
                    var icons = eWin.deskTop.winSpace.icons;
                    
                    // 计算动画中图标的平移量
                    var dirCode = eWin.deskTop.winSpace.offsetX / Math.abs( eWin.deskTop.winSpace.offsetX );
                    var offsetX = dirCode *( eWin.deskTop.iconRoll -  Math.abs(icons[0].getLeft() - icons[0].scroolStartLeft) % eWin.deskTop.iconRoll )
                    
                    // 计算滚动的终点坐标
                    var icons = eWin.deskTop.winSpace.icons;
                    for ( var i = 0; i < icons.length; i++ ) {
                       icons[i].scroolEndLeft = icons[i].getLeft() + offsetX;
                       icons[i].scroolStartLeft = null;
                    }
                    
                    // 执行动画
                    eWin.deskTop.winSpace.isIconScroll = true;
                    var deputes = [function () {
                                        for( var i = 0; i < icons.length; i++ ) {
                                            icons[i].setLeft( icons[i].scroolEndLeft );
                                            icons[i].scroolEndLeft = null;
                                        }
                                        eWin.deskTop.winSpace.isIconScroll = false;
                                    }
                                  ]
                    eWin.animation.levelMove( iconTagNodes, offsetX, 0, 100, deputes, 0.5);
                }
                
                // 销毁deskTop相关临时属性
                delete eWin.deskTop.startMouseX;
                delete eWin.deskTop.winSpace.offsetX;
                delete eWin.deskTop.winSpace.icons;
                delete eWin.deskTop.isIconScrollStart;
            }
        },
     
        // 定义缩略图单击默认行为
        thumClick: {
            action: function( win ) {
                if( win.state === "min") {
                    win.reset();
                    win.actitave(win);
                } else {
                    if ( win.state != "close" ) {
                        if( win.state === "max" ) {
                            // 检索父对象下的所有主窗体
                            var items = new Array();
                            items = win.parentNode.getChildElements();
                           
                            // 对除目标窗体外的所有主窗体进行最大化
                            for ( var i = 0; i < items.length; i++ ) {
                                if ( items[i].getType() === "Window" && items[i].state != "close" && items[i].state != "min" && items[i].type != "dialog" ) {
                                     items[i].hide();
                                }
                            }
                        }
                        win.show();
                        win.actitave(win);
                    }
                }
            }
        },

        // 定义标题栏双击默认行为
        resetMaxWin:{
            action:function( win ) {
                 win.reset();
                 win.actitave( win );
            }
        },
        
        
        // 定义标题栏双击默认行为
        titleDlClick:{
            action:function( win ) {
                if ( win.state === "max" ) {
                    win.reset(); 
                    win.actitave( win ); 
                } else {
                    win.max();
                }
            }
        },
        
        
        // 定义窗体激活默认行为
        winActitave: {
            action:function ( win ) {
                win.actitave();
            }
        },
        
        
        // 定义窗体关闭默认行为
        winClose: {
            action: function( win ){
                win.close();
            }
        },
        
        
        // 定义窗体最小化默认行为
        winMin: {
            action: function( win ) {
            
                win.min();
            }
        },
        
        
        // 定义窗体最大化默认行为
        winMax: {
            action: function( win ){
                win.max();
            }
        },
        
        
        // 定义窗体移动默认行为
        winMove: {
            
            // 窗体移动起始方法
            start: function( mouseX, mouseY, oldMouseX, oldMouseY, win ) {
                win.startLeft = win.getLeft();
                win.startTop = win.getTop();
                win.startX = mouseX;
                win.startY = mouseY;
            },
        
            // 窗体移动过程方法
            process:function( mouseX, mouseY, oldMouseX, oldMouseY, win) {
                win.setLeft( win.startLeft + (mouseX - win.startX) );
                win.setTop( win.startTop + (mouseY - win.startY) );
            },
            
            // 窗体移动结束方法
            end:function( mouseX, mouseY, oldMouseX, oldMouseY, win) {
            
                // 消毁临时属性
                delete win.startLeft;
                delete win.startTop;
                delete win.startX;
                delete win.startY;
            }
        },
        

        // 定义窗体尺寸调整默认行为
        winSizeChange:{
        
            // 尺寸调整开始方法
            start: function( mouseX, mouseY, oldMouseX, oldMouseY, ajsutDirection, win ) {
                win.startWidth = HTMLDom.getNodeWidth(win.tagNode);
                win.startHeight = HTMLDom.getNodeHeight(win.tagNode);
                win.startLeft = win.getLeft();
                win.startTop = win.getTop();
                win.startX = mouseX;
                win.startY = mouseY;
            },
            
            
            // 尺寸调整过程方法
            process: function( mouseX, mouseY, oldMouseX, oldMouseY, ajsutDirection, win ) {
                
                if ( ajsutDirection === "RightHandle" ) {
                    var resultWidth = win.startWidth + (mouseX - win.startX);
                    win.widthFlex( resultWidth - win.getWidth() );
                }
                
                if ( ajsutDirection === "BottomHandle" ) {
                    var resultHeight = win.startHeight + (mouseY - win.startY);
                    win.heightFlex( resultHeight - win.getHeight() );
                }
                
                if ( ajsutDirection === "UpHandle" ){
                    if( win.hFlex ) {
                        win.setTop( win.startTop + (mouseY - win.startY) );
                        var resultHeight = win.startHeight + (win.startY - mouseY);
                        win.heightFlex( resultHeight -  win.getHeight() );
                    }
                }
                
                if ( ajsutDirection === "LeftHandle" ) {
                    if( win.wFlex ) {
                        win.setLeft( win.startLeft + (mouseX - win.startX) );
                        var resultWidth = win.startWidth + (win.startX - mouseX);
                        win.widthFlex( resultWidth - win.getWidth() );
                    }
                }
                
                if ( ajsutDirection === "RightBottomHandle" ) {
                    var resultWidth = win.startWidth + (mouseX - win.startX);
                    var resultHeight = win.startHeight + (mouseY - win.startY);
                    win.widthFlex( resultWidth - win.getWidth() );
                    win.heightFlex( resultHeight - win.getHeight() );
                }
                
                if ( ajsutDirection === "RightTopHandle" ){
                    if( win.hFlex ) {
                        win.setTop( win.startTop + (mouseY - win.startY) );
                        var resultHeight = win.startHeight + (win.startY - mouseY);
                        win.heightFlex( resultHeight - win.getHeight() );
                    }
                    
                    var resultWidth = win.startWidth + (oldMouseX - win.startX);
                    win.widthFlex( resultWidth - win.getWidth() );
                   
                }
                
                if ( ajsutDirection === "LeftTopHandle" ) {
                    if( win.wFlex ) {
                        win.setLeft( win.startLeft + (mouseX - win.startX) );
                        var resultWidth = win.startWidth + (win.startX - mouseX);
                        win.widthFlex( resultWidth - win.getWidth() );
                    }
                    if( win.hFlex ) {
                        win.setTop( win.startTop + (mouseY - win.startY) );
                        var resultHeight = win.startHeight + (win.startY - mouseY);
                        win.heightFlex( resultHeight - win.getHeight() );
                    }
                }
                
                if ( ajsutDirection === "LeftBottomHandle" ){
                    if( win.wFlex ) {
                        win.setLeft( win.startLeft + (mouseX - win.startX) );
                        var resultWidth = win.startWidth + (win.startX - mouseX);
                        var widthOffset = resultWidth - win.getWidth();
                        win.widthFlex( widthOffset );
                    }
                    var resultHeight = win.startHeight + (mouseY - win.startY);
                    var heightOffset = resultHeight - win.getHeight();
                    win.heightFlex( heightOffset );
                }
            },
            
            // 尺寸调整结束方法
            end: function( mouseX, mouseY, oldMouseX, oldMouseY, ajsutDirection, win ){
            
                // 消毁临时属性
                delete win.startWidth;
                delete win.startHeight;
                delete win.startLeft;
                delete win.startTop;
                delete win.startX;
                delete win.startY;
            }
        },
        
        
        // 定义标签激活默认行为
        tagActitave: {
            action: function( tag ) {
                
                var tabControl =  tag.parentNode.parentNode;
                
                if ( tabControl && tabControl.getType() === "TabControl" ){
                    ;
                    tabControl.actitaveTag( tag );         
                }
            }
        },
        
        
        // 定义关闭标签默认行为
        closeActTag: {
            action: function(tag) {
                var tabControl = tag.parentNode.parentNode;
                if ( tabControl && tabControl.getType() === "TabControl" ){
                    tabControl.closeActTag();         
                }
            }
        },
        
        // 定义标签拖动默认行为
        tagDrag: {
            
            // 标签拖动起始方法
            start: function( mouseX, mouseY, oldMouseX, oldMouseY, tag ) {
            
                // 记录标签相关的原始位置信息
                tag.startLeft = tag.getLeft();
                tag.startX = mouseX;
            },
            
            // 标签拖动过程方法
            process: function (  mouseX, mouseY, oldMouseX, oldMouseY, tag ) {
                tag.tagDragoffsetX = mouseX - oldMouseX;
                tag.setLeft( tag.startLeft + (mouseX - tag.startX) );
            },
            
            // 标签拖动结束方法
            end: function (  mouseX, mouseY, oldMouseX, oldMouseY, tag ) {
                // 获取Tag集合
                var items = tag.parentNode.getChildElements();
                var tags = new Array();
                for ( var i = 0;i< items.length; i++ ) {
                    if ( items[i].getType() === "Tag" ) {
                        tags.push(items[i]);
                    }
                }
                
                // 将标签插入到相应的位置
                if ( tag.tagDragoffsetX != 0 ) {
                    var relTag = null;
                    if ( tag.tagDragoffsetX < 0 ) {
                    
                        // 计算并获取参照标签
                        var tagOffsetLeft = tag.tagNode.offsetLeft;
                        for ( var i = 0; i < tags.length; i++ ) {
                            if ( tags[i] && tags[i] != tag && tagOffsetLeft > tags[i].tagNode.offsetLeft && tagOffsetLeft < tags[i].tagNode.offsetLeft + tags[i].tagNode.offsetWidth ) {
                                relTag = tags[i];
                            }
                        }
                        
                        // 将目标标签插入至参照标签处
                        if ( relTag ) {
                            relTag.parentNode.removeElement( tag );
                            relTag.parentNode.addElement( tag, "insert", relTag )
                        } 
                    }    
                
                    if ( tag.tagDragoffsetX > 0 ) {
                    
                        // 计算并获取参照标签
                        var tagOffsetRight = tag.tagNode.offsetLeft + tag.tagNode.offsetWidth;
                        for ( var i = 0; i < tags.length; i++ ) {
                            if ( tags[i] && tags[i] != tag && tagOffsetRight > tags[i].tagNode.offsetLeft && tagOffsetRight < tags[i].tagNode.offsetLeft + tags[i].tagNode.offsetWidth ) {
                                relTag = tags[i];
                            }
                        }
                        
                        // 将目标标签添加或插入至参照标签处
                        if ( relTag ) {
                            if ( relTag.nextNode ) {
                                relTag.parentNode.removeElement( tag );
                                relTag.parentNode.addElement( tag, "insert", relTag.nextNode);
                            } else {
                                relTag.parentNode.removeElement( tag );
                                relTag.parentNode.addElement( tag );
                            }
                        } 
                    }
                 }
                 
                 // 还原标签原X坐标
                 if( tag.startLeft != null && !isNaN(tag.startLeft) ) {
                    
                    tag.setLeft( tag.startLeft );       
                 }
                 
                 // 消毁对象临时属性
                 delete tag.startLeft;
                 delete tag.tagDragoffsetX;
            }
        },


        // 定义框架分隔条拖动默认行为
        SplitSpaceBarDarg: {
            
            // 分隔条拖动起始方法
            start: function( mouseX, mouseY, oldMouseX, oldMouseY, splitCon ){
                ;
            },
        
            // 分隔条拖动过程方法
            process: function( mouseX, mouseY, oldMouseX, oldMouseY, splitCon ) {
                 splitCon.sizeAdjust( oldMouseX - mouseX, oldMouseY - mouseY );
            },
            
            // 分隔条拖动结束方法
            end: function( mouseX, mouseY, oldMouseX, oldMouseY, splitCon ) {
                ;
            }
        } 
    }

    // dBehaviour对象定义[默认行为对象]
    JPM.nameSpace(
        "EWin",
        "dBehaviour",dBehaviour
    );
} )();