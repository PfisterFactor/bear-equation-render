let {ipcRenderer, remote} = require('electron')


function onExportButtonClicked() {
    html2canvas(document.getElementById('render-output')).then(function(canvas) {
        let length = "data:image/png;base64,".length;
        let id = document.getElementById("note-id").value;
        if (id == "" || id == " ") return;

        let data = encodeURIComponent(canvas.toDataURL("image/png").substr(length));
        let url = "bear://x-callback-url/add-file?filename=eq.png&id=" + id +"&mode=append&file="+data + "&show_window=no";
        ipcRenderer.send("async",url)
        window.setTimeout(() => {
            win.close();
        },100);
    
    });
}

