const {app, BrowserWindow, Menu, ipcMain} = require("electron")

function createWindow() {
    // Create browser window
    win = new BrowserWindow({width:400,height:300,resizable:false})
    
    win.loadFile("index.html")
    win.on("close", () => {
        win=null
    })
}
ipcMain.on("async",(event,arg) => {
    let win2 = new BrowserWindow({width:0,height:0,transparent:true, frame:false});
    win2.loadURL(arg);
    setTimeout(() => {
        win2.close()
        win.show()
    },100)

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
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];
    
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    
    createWindow()
})

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
