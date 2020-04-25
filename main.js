const {app, BrowserWindow, Menu, ipcMain} = require("electron")
var mjAPI = require("mathjax-node");
mjAPI.start();

var math_format = "AsciiMath"

var win = null
function createWindow() {
    // Create browser window
    win = new BrowserWindow({width:400,height:300,resizable:true,title:"Equation Renderer for Bear <3"})
    win.loadFile("index.html")
    win.on("close", () => {
        win=null
    })
}
ipcMain.on("exportClicked",(event,arg) => {
    let win2 = new BrowserWindow({width:0,height:0,transparent:false, frame:true});
    win2.loadURL(arg);
    setTimeout(() => {
        win2.close()
        win.show()
    },500)

})
var isErroring = false
var errorTimer = null
function startErrorState() {
    if (isErroring) return;

    errorTimer = setInterval(function() {
        mjAPI.start()
    },500);
}
function stopErrorState() {
    if (!isErroring || errorTimer == null) return;
    clearInterval(errorTimer)
}
ipcMain.on("textChanged",function(event,data) {
    try {
        mjAPI.typeset({svg:true,format:math_format,linebreaks:true,width:45,timeout:1000,math:data},function(math_rendered) {
            event.sender.send("textChangedReply",math_rendered);
            stopErrorState();
        });
    }
    catch (e) {
        win.webContents.send("error","Error state!");
        startErrorState();
    }
})
app.on("ready",() => {
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Select Format",
                submenu: [
                    {label: "AsciiMath", accelerator: "CmdOrCtrl+Shift+A", click: function() { setTypsetFormat("AsciiMath") }},
                    {label: "LaTeX", accelerator: "CmdOrCtrl+Shift+L", click: function() { setTypsetFormat("TeX") }},
                    {label: "MathML", accelerator: "CmdOrCtrl+Shift+M", click: function() { setTypsetFormat("MathML") }}
                ]},
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];
    
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    
    createWindow()
})

function setTypsetFormat(format) {
    math_format = format;
    win.webContents.send("updateFormat");
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
    app.quit()
}
})
app.on('activate', () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (win === null) {
    createWindow()
}
})// Quit when all windows are closed.
app.on('window-all-closed', () => {
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
    app.quit()
}
})
app.on('activate', () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (win === null) {
    createWindow()
}
})
