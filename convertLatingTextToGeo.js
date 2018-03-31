
  var geoToLatinBinding = [
    'a', 'b', 'g', 'd', 'e', 'v', 'z', 'T', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'J', 'r', 's', 't', 'u', 'f', 'q', 'R', 'y', 'S', 'C', 'c', 'Z', 'w', 'W', 'x', 'j', 'h'
  ];
  var latinToGeoBinding = [
    'A', 'B', 'ჩ', 'D', 'E', 'F', 'G', 'H', 'I', 'ჟ', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'ღ', 'შ', 'თ', 'U', 'V', 'ჭ', 'X', 'Y', 'ძ', '[', '\\', ']', '^', '_', '`', 'ა', 'ბ', 'ც', 'დ', 'ე', 'ფ', 'გ', 'ჰ', 'ი', 'ჯ', 'კ', 'ლ', 'მ', 'ნ', 'ო', 'პ', 'ქ', 'რ', 'ს', 'ტ', 'უ', 'ვ', 'წ', 'ხ', 'ყ', 'ზ'
  ];

var toGeorgian = function(latinWord) {
    return convert(latinWord, latinToGeoBinding, 'A', 'z', 65);
  }

  function convert(word, binding, min, max, charNum) {
    var buffer = []
    var i = 0;
    word.split('').forEach(function(c) {
      if (c >= min && c <= max) {
        buffer[i++] = binding[c.charCodeAt(0) - charNum];
      } else {
        buffer[i++] = c;
      }
    });
    return buffer.join('');
  }


function replaceText(node){
var node = node||document.body; // base node

  var childs = node.childNodes, i = 0;

  while(node = childs[i]){ 
    if (node.nodeType == 3){ // text node found, do the replacement
      if (node.textContent && node.textContent.indexOf(' da ') !== -1 ) {
       
        node.textContent = node.textContent.replace(/sh/g, 'შ')
        node.textContent = node.textContent.replace(/dz/g, 'ძ')
        node.textContent = node.textContent.replace(/ch/g, 'ჩ')

        node.textContent = toGeorgian(node.textContent)
      } 
    } else { // not a text mode, look forward
      replaceText(node); 
    } 
    i++; 
  } 
}

replaceText()
