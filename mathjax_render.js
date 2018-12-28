window.MathJax = {
    "fast-preview": {
               disabled: true
    },
    AuthorInit: function() {
        MathJax.Hub.Register.StartupHook('End', function() {
            MathJax.Hub.processSectionDelay = 0
            var demoSource = document.getElementById('math-input')
            var demoRendering = document.getElementById('render-output')
            var math = MathJax.Hub.getAllJax('render-output')[0]
            demoSource.addEventListener('input', function() {
                MathJax.Hub.Queue(['Text', math, demoSource.value])
            })
        })
    }
}