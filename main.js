function wrap(x, baseval) {
    while(x < baseval) {
        x += 26;
    }
    while(x > baseval + 25) {
        x -= 26;
    }
    return x;
}

function add(achar, bchar, baseval) {
    var aint = achar.charCodeAt() - "a".charCodeAt() + baseval;
    var bint = bchar.charCodeAt() - "a".charCodeAt() + baseval;
    var rint = wrap(aint + bint, baseval);
    return String.fromCharCode(rint + "a".charCodeAt() - baseval);
}

function subtract(achar, bchar, baseval) {
    var aint = achar.charCodeAt() - "a".charCodeAt() + baseval;
    var bint = bchar.charCodeAt() - "a".charCodeAt() + baseval;
    var rint = wrap(aint - bint, baseval);
    return String.fromCharCode(rint + "a".charCodeAt() - baseval);
}

function revsubtract(a, b, baseval) {
    return subtract(b, a, baseval);
}

function combineWords(word1, word2, operator, baseval) {
    var letters1 = word1.replace(/\W/g, '').toLowerCase();
    var letters2 = word2.replace(/\W/g, '').toLowerCase();
    
    var text = letters1;
    var key = letters2;
    if (letters2.length > letters1.length) {
        text = letters2;
        key = letters1;
    }
    var output = "";
    var key_i = 0;
    for (var i = 0; i < text.length; ++i) {
        var a = text[i];
        var b = key[key_i];
        var r = operator(a, b, baseval);
        output += r;
        ++key_i;
        if (key_i >= key.length) {
            key_i = 0;
        }
    }
    console.log(output);
    return output + "<br>";
}

function dothing() {
    var input = document.getElementById("texts").value;
    var lines = input.split(/[\r?\n]+/);
    var output = "";
    for(var i = 0; i < lines.length; ++i) {
        for(var j = i+1; j < lines.length; ++j) {
            var word1 = lines[i];
            var word2 = lines[j];
            output += combineWords(word1, word2, add, 0);
            output += combineWords(word1, word2, subtract, 0);
            output += combineWords(word1, word2, revsubtract, 0);
            output += combineWords(word1, word2, add, 1);
            output += combineWords(word1, word2, subtract, 1);
            output += combineWords(word1, word2, revsubtract, 1);
        }
    }; 
    document.getElementById("results").innerHTML = output;
}