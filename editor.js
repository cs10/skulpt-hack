        
function runWrap() {
    var press = jQuery.Event("keypress");
    press.ctrlKey = true;
    press.which = 13;
    $(window).trigger(press);
};

$(document).ready(function () {
    editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        parserfile: ["parsepython.js"],
        autofocus: true,
        theme: "solarized light",
        //path: "static/env/codemirror/js/",
        lineNumbers: true,
        textWrapping: false,
        indentUnit: 4,
        height: "200px",
        fontSize: "11pt",
        autoMatchParens: true,
        parserConfig: {'pythonVersion': 3, 'strictErrors': false},
        onKeyEvent: runIt
    });

    $("#toggledocs").click(function (e) {
        $("#quickdocs").toggle();
    });

    var exampleCode = function (id, text) {
        $(id).click(function (e) {
            editor.setValue(text);
            editor.focus(); // so that F5 works, hmm
        });
    };

    $('#clearoutput').click(function (e) {
        $('#edoutput').text('');
        $('#mycanvas').hide();
    });


    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }
    
    function runIt(editor, e) {
        t = this;
        console.log(t);
                Sk.python3 = true;
                if (e.keyCode === 13 && e.type === "keydown") {
                    var output = $('#edoutput');
                    var outf = function (text) {
                        output.text(output.text() + text);
                    };
                    Sk.configure({output: outf, read: builtinRead});
                    if (e.ctrlKey) {
                        e.stop();
                        Sk.canvas = "mycanvas";
                        Sk.pre = "edoutput";
                        Sk.importMainWithBody("<stdin>", false, editor.getValue());
                    }
                    else if (e.shiftKey) {
                        e.stop();
                        Sk.importMainWithBody("<stdin>", false, editor.selection());
                    }
                }
            }
            
            
    editor.focus();
});
