let {ipcRenderer, remote} = require('electron')

function onTextInput() {
    let math_text = document.getElementById("math-input").value
    let math_rendered = ipcRenderer.send("textChanged",math_text);  
}

ipcRenderer.on("updateFormat", function(event) {
    onTextInput()
})

function disableTyping(key) {
    if( key.keyCode >= 37 && key.keyCode <= 40 ) {
        return; // arrow keys
    }
    if( key.keyCode === 8 || key.keyCode === 46 ) {
        return; // backspace (8) / delete (46)
    }
    key.preventDefault();
}
ipcRenderer.on("error", function(event,data) {
    document.getElementById("error-state-display").style.visibility = "visible"
    document.getElementById("math-input").addEventListener("keydown",disableTyping)
})

ipcRenderer.on("textChangedReply",function(event,data) {
    
    let div = document.getElementById("render-output");
    let styled_svg = "<svg id=\"svg\"" + data.svg.substring(4);
    div.innerHTML = styled_svg;
    document.getElementById("error-state-display").style.visibility = "hidden";
    document.getElementById("math-input").removeEventListener("keydown",disableTyping);

    
})

function onExportButtonClicked() {
    html2canvas(document.getElementById('render-output')).then(function(canvas) {
        let length = "data:image/png;base64,".length;
        let id = document.getElementById("note-id").value;
        if (id == "" || id == " ") return;
        let data = encodeURIComponent(canvas.toDataURL("image/png").substr(length));
        let url = "bear://x-callback-url/add-file?filename=eq.png&id=" + id +"&mode=append&file="+data + "&show_window=no";
        ipcRenderer.send("exportClicked",url)
    
    });
}

