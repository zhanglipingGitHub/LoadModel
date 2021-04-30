var utils = new utilsObject();

function utilsObject() { };

/**
 * Obtains a WebGL context for the canvas with id 'name'
 * @param {*} name : canvas id
 * @returns WebGL context
 */
utilsObject.prototype.getGLContext = function (name) {
    var canvas = document.getElementById(name);

    if (canvas == null) {
        alert('ERROR::There is no canvas on this page!')
        return null;
    }
    else {
        cWidth = canvas.width;
        cHeight = canvas.height;
    }

    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var ctx = null;
    for (var i = 0; i < names.length; ++i) {
        try {
            ctx = canvas.getContext(names[i]);
        }
        catch (e) { }
        if (ctx) break;
    }
    if (ctx == null) {
        alert("ERROR::Could not initialize WebGL!");
        return null;
    }
    else {
        return ctx;
    }
}

//
utilsObject.prototype.getShader = function (gl, id) {
    var script = document.getElementById(id);
    if (script == null) {
        alert("ERROR::Can NOT find shader by id \"" + id + " \"");
        return null;
    }

    var str = "";
    var k = script.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (script.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (script.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else {
        alert("WARNING:: Other shader types are NOT supported currently except vs and fs");
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("ERROR::" + gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

//Frequently refresh the screen
utilsObject.prototype.requestAnimFrame = function (o) {
    requestAnimFrame(o);
}

requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

utilsObject.prototype.degToRad = function(deg) {
    return deg * Math.PI / 180;
}

String.prototype.colorRGB = function(){
    var sColor = this.toLowerCase();
    console.info("sColor: " + sColor);
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            //sColorChange.push((parseInt("0x"+sColor.slice(i, i+2)) + 1 )); 
            sColorChange.push((parseInt("0x"+sColor.slice(i, i+2)) + 1 ) / 256.0);    
        }
        return sColorChange;
    }
    return [];
}