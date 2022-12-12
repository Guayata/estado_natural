
var loadScript = function(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState){  // IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Others
        script.onreadystatechange = callback;
        script.onload = callback;
    }

    script.src = url;
    var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(script, x);
};

var replacer = function(finder, element, blackList) {
    if (!finder) {
      return
    }

    var regex = (typeof finder == 'string') ? new RegExp(finder, 'g') : finder;
    var regex2 = (typeof finder == 'string') ? new RegExp(finder, 'g') : finder;
    
    var childNodes = element.childNodes;

    var len = childNodes.length;
    
    var list = typeof blackList == 'undefined' ? 'html,head,style,title,link,meta,script,object,iframe,pre,a,' : blackList ;
    
    while (len--) {
        var node = childNodes[len];

        if (node.nodeType === 1 && true || (list.indexOf(node.nodeName.toLowerCase()) === -1)) {
            replacer(finder, node, list);
        }
        if (node.nodeType !== 3 || !regex.test(node.data)) {
            continue;
        }
        var frag = (function(){
            var wrap = document.createElement('span');
            var frag = document.createDocumentFragment();
            var sliderId = regex2.exec(node.data)[1];
            wrap.innerHTML = '<div class="ndn-bannerslider" id="ndn-bannerslider-'+sliderId+'"></div>';    
            while (wrap.firstChild) {
              frag.appendChild(wrap.firstChild);
            }    
            return frag;
        })();        
        var parent = node.parentNode;
        parent.insertBefore(frag, node);
        parent.removeChild(node);
    }
};

var showBannerSliders = function(jQuery){    
    
    var B64={alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",lookup:null,ie:/MSIE /.test(navigator.userAgent),ieo:/MSIE [67]/.test(navigator.userAgent),encode:function(a){var e,f,g,b=B64.toUtf8(a),c=-1,d=b.length,h=[,,];if(B64.ie){for(var i=[];++c<d;)e=b[c],f=b[++c],h[0]=e>>2,h[1]=(3&e)<<4|f>>4,isNaN(f)?h[2]=h[3]=64:(g=b[++c],h[2]=(15&f)<<2|g>>6,h[3]=isNaN(g)?64:63&g),i.push(B64.alphabet.charAt(h[0]),B64.alphabet.charAt(h[1]),B64.alphabet.charAt(h[2]),B64.alphabet.charAt(h[3]));return i.join("")}for(var i="";++c<d;)e=b[c],f=b[++c],h[0]=e>>2,h[1]=(3&e)<<4|f>>4,isNaN(f)?h[2]=h[3]=64:(g=b[++c],h[2]=(15&f)<<2|g>>6,h[3]=isNaN(g)?64:63&g),i+=B64.alphabet[h[0]]+B64.alphabet[h[1]]+B64.alphabet[h[2]]+B64.alphabet[h[3]];return i},decode:function(a){if(a.length%4)throw new Error("InvalidCharacterError: 'B64.decode' failed: The string to be decoded is not correctly encoded.");var b=B64.fromUtf8(a),c=0,d=b.length;if(B64.ieo){for(var e=[];d>c;)b[c]<128?e.push(String.fromCharCode(b[c++])):b[c]>191&&b[c]<224?e.push(String.fromCharCode((31&b[c++])<<6|63&b[c++])):e.push(String.fromCharCode((15&b[c++])<<12|(63&b[c++])<<6|63&b[c++]));return e.join("")}for(var e="";d>c;)e+=b[c]<128?String.fromCharCode(b[c++]):b[c]>191&&b[c]<224?String.fromCharCode((31&b[c++])<<6|63&b[c++]):String.fromCharCode((15&b[c++])<<12|(63&b[c++])<<6|63&b[c++]);return e},toUtf8:function(a){var d,b=-1,c=a.length,e=[];if(/^[\x00-\x7f]*$/.test(a))for(;++b<c;)e.push(a.charCodeAt(b));else for(;++b<c;)d=a.charCodeAt(b),128>d?e.push(d):2048>d?e.push(192|d>>6,128|63&d):e.push(224|d>>12,128|63&d>>6,128|63&d);return e},fromUtf8:function(a){var c,b=-1,d=[],e=[,,];if(!B64.lookup){for(c=B64.alphabet.length,B64.lookup={};++b<c;)B64.lookup[B64.alphabet.charAt(b)]=b;b=-1}for(c=a.length;++b<c&&(e[0]=B64.lookup[a.charAt(b)],e[1]=B64.lookup[a.charAt(++b)],d.push(e[0]<<2|e[1]>>4),e[2]=B64.lookup[a.charAt(++b)],64!=e[2])&&(d.push((15&e[1])<<4|e[2]>>2),e[3]=B64.lookup[a.charAt(++b)],64!=e[3]);)d.push((3&e[2])<<6|e[3]);return d}};

    var html = {"3480":"PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgogICAgICAgICAgdmFyIGljb25fcGF0aCA9ICJodHRwczovL2QxYmx1OXZxZWYyNXB4LmNsb3VkZnJvbnQubmV0L2ltYWdlcy9pY29ucy8iOwogICAgICA8L3NjcmlwdD4KICAgICAgPCEtLSBTaW1wbGUgRmFkZSBTbGlkZVNob3cgPT0+IFdhdmUgU2xpZGVzaG93LS0+CiAgICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgdHlwZT0idGV4dC9jc3MiIGhyZWY9Imh0dHBzOi8vZDFibHU5dnFlZjI1cHguY2xvdWRmcm9udC5uZXQvY3NzL2Zyb250ZW5kL3NpbXBsZV9mYWRlLmNzcyI+CiAgICA8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+CiAgICAgICAganNzb3JfMV9zbGlkZXJfaW5pdCA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICB2YXIganNzb3JfMzQ4MF9TbGlkZXNob3dUcmFuc2l0aW9ucyA9IFsKICAgICAgICAgICAgICAgICAgICAgICAgICB7JER1cmF0aW9uOjgwMCwkT3BhY2l0eToyfSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgXTsKCiAgICAgICAgICAgIHZhciBqc3Nvcl8zNDgwX29wdGlvbnMgPSB7CiAgICAgICAgICAgICAgJEF1dG9QbGF5OiAxLAogICAgICAgICAgICAgICRJZGxlOiA4MDAwLAogICAgICAgICAgICAgICRTbGlkZXNob3dPcHRpb25zOiB7CiAgICAgICAgICAgICAgICAkQ2xhc3M6ICRKc3NvclNsaWRlc2hvd1J1bm5lciQsCiAgICAgICAgICAgICAgICAkVHJhbnNpdGlvbnM6IGpzc29yXzM0ODBfU2xpZGVzaG93VHJhbnNpdGlvbnMsCiAgICAgICAgICAgICAgICAkVHJhbnNpdGlvbnNPcmRlcjogMQogICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgJEFycm93TmF2aWdhdG9yT3B0aW9uczogewogICAgICAgICAgICAgICAgJENsYXNzOiAkSnNzb3JBcnJvd05hdmlnYXRvciQKICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICRCdWxsZXROYXZpZ2F0b3JPcHRpb25zOiB7CiAgICAgICAgICAgICAgICAkQ2xhc3M6ICRKc3NvckJ1bGxldE5hdmlnYXRvciQKICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICRUaHVtYm5haWxOYXZpZ2F0b3JPcHRpb25zOiB7CiAgICAgICAgICAgICAgICAkQ2xhc3M6ICRKc3NvclRodW1ibmFpbE5hdmlnYXRvciQsCiAgICAgICAgICAgICAgICAkT3JpZW50YXRpb246IDIsCiAgICAgICAgICAgICAgICAkTm9EcmFnOiB0cnVlCiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwoKICAgICAgICAgICAgdmFyIGpzc29yXzM0ODBfc2xpZGVyID0gbmV3ICRKc3NvclNsaWRlciQoImpzc29yXzM0ODAiLCBqc3Nvcl8zNDgwX29wdGlvbnMpOwogICAgICAgICAgICB2YXIgTUFYX1dJRFRIID0gMjQ4NTsKCiAgICAgICAgICAgIGZ1bmN0aW9uIFNjYWxlU2xpZGVyKCkgewogICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lckVsZW1lbnQgPSBqc3Nvcl8zNDgwX3NsaWRlci4kRWxtdC5wYXJlbnROb2RlOwogICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyRWxlbWVudC5jbGllbnRXaWR0aDsKCiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyV2lkdGgpIHsKCiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cGVjdGVkV2lkdGggPSBNYXRoLm1pbihNQVhfV0lEVEggfHwgY29udGFpbmVyV2lkdGgsIGNvbnRhaW5lcldpZHRoKTsKCiAgICAgICAgICAgICAgICAgICAganNzb3JfMzQ4MF9zbGlkZXIuJFNjYWxlV2lkdGgoZXhwZWN0ZWRXaWR0aCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChTY2FsZVNsaWRlciwgMzApOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CgogICAgICAgICAgICBTY2FsZVNsaWRlcigpOwoKICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQod2luZG93LCAibG9hZCIsIFNjYWxlU2xpZGVyKTsKICAgICAgICAgICAgJEpzc29yJC4kQWRkRXZlbnQod2luZG93LCAicmVzaXplIiwgU2NhbGVTbGlkZXIpOwogICAgICAgICAgICAkSnNzb3IkLiRBZGRFdmVudCh3aW5kb3csICJvcmllbnRhdGlvbmNoYW5nZSIsIFNjYWxlU2xpZGVyKTsKICAgICAgICAgICAgCiAgICAgICAgfTsKICAgIDwvc2NyaXB0PgogICAgPHN0eWxlIHR5cGU9InRleHQvY3NzIiBtZWRpYT0ic2NyZWVuIj4KICAgICAgI2pzc29yXzM0ODAgYXsKICAgICAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxkaXYgc3R5bGU9IndpZHRoOiAxMDAlO21hcmdpbjphdXRvIj4KICAgICAgICA8ZGl2IGlkPSJqc3Nvcl8zNDgwIiBjbGFzcz0ibmRuYXBwcy1zbGlkZXIiIHN0eWxlPSJwb3NpdGlvbjpyZWxhdGl2ZTttYXJnaW46MCBhdXRvO3RvcDowcHg7bGVmdDowcHg7d2lkdGg6MjQ4NXB4O2hlaWdodDo2MjVweDtvdmVyZmxvdzpoaWRkZW47dmlzaWJpbGl0eTpoaWRkZW47Ij4KICAgICAgICA8ZGl2IGRhdGEtdT0ibG9hZGluZyIgY2xhc3M9Impzc29ybC0wMDktc3BpbiIgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlO3RvcDowcHg7bGVmdDowcHg7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsMC43KTsiPgogICAgICAgICAgPGltZyBzdHlsZT0ibWFyZ2luLXRvcDotMTlweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NTAlO3dpZHRoOjM4cHg7aGVpZ2h0OjM4cHg7IiBzcmM9Imh0dHBzOi8vZDFibHU5dnFlZjI1cHguY2xvdWRmcm9udC5uZXQvaW1hZ2VzL2Jhbm5lci1pdGVtcy9sb2FkaW5nL3NwaW4uc3ZnIiAvPgogICAgICAgIDwvZGl2PgogICAgICAgIDxzcGFuIHN0eWxlPSJkaXNwbGF5OiBub25lIj5uZG5hcHBzX2Jhbm5lcl9wdWJsaXNodG9zaG9wPC9zcGFuPgogICAgICAgIDxkaXYgZGF0YS11PSJzbGlkZXMiIHN0eWxlPSJjdXJzb3I6ZGVmYXVsdDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6MHB4O2xlZnQ6MHB4O3dpZHRoOjI0ODVweDtoZWlnaHQ6NjI1cHg7b3ZlcmZsb3c6aGlkZGVuOyI+CiAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgPC9kaXY+ICAgICAgICAKICAgICAgICA8IS0tIEFycm93IE5hdmlnYXRvciAtLT4KICAgICAgICA8c3R5bGU+DQogICAgLmpzc29yYjAzMSB7cG9zaXRpb246YWJzb2x1dGU7fQ0KICAgIC5qc3NvcmIwMzEgLmkge3Bvc2l0aW9uOmFic29sdXRlO2N1cnNvcjpwb2ludGVyO30NCiAgICAuanNzb3JiMDMxIC5pIC5iIHtmaWxsOiMwMDA7ZmlsbC1vcGFjaXR5OjAuNTtzdHJva2U6I2ZmZjtzdHJva2Utd2lkdGg6MTIwMDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utb3BhY2l0eTowLjM7fQ0KICAgIC5qc3NvcmIwMzEgLmk6aG92ZXIgLmIge2ZpbGw6I2ZmZjtmaWxsLW9wYWNpdHk6Ljc7c3Ryb2tlOiMwMDA7c3Ryb2tlLW9wYWNpdHk6LjU7fQ0KICAgIC5qc3NvcmIwMzEgLmlhdiAuYiB7ZmlsbDojZmZmO3N0cm9rZTojMDAwO2ZpbGwtb3BhY2l0eToxO30NCiAgICAuanNzb3JiMDMxIC5pLmlkbiB7b3BhY2l0eTouMzt9DQo8L3N0eWxlPg0KPGRpdiBkYXRhLXU9Im5hdmlnYXRvciIgY2xhc3M9Impzc29yYjAzMSIgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMnB4O3JpZ2h0OjEycHg7IiBkYXRhLWF1dG9jZW50ZXI9IjEiIGRhdGEtc2NhbGU9IjAuNSIgZGF0YS1zY2FsZS1ib3R0b209IjAuNzUiPg0KICAgIDxkaXYgZGF0YS11PSJwcm90b3R5cGUiIGNsYXNzPSJpIiBzdHlsZT0id2lkdGg6MTZweDtoZWlnaHQ6MTZweDsiPg0KICAgICAgICA8c3ZnIHZpZXdCb3g9IjAgMCAxNjAwMCAxNjAwMCIgc3R5bGU9InBvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlOyI+DQogICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPSJiIiBjeD0iODAwMCIgY3k9IjgwMDAiIHI9IjU4MDAiPjwvY2lyY2xlPg0KICAgICAgICA8L3N2Zz4NCiAgICA8L2Rpdj4NCjwvZGl2Pg0KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICAgICAgPCEtLSBTaW1wbGUgRmFkZSBTbGlkZVNob3cgPT0+IFdhdmUgU2xpZGVzaG93IC0tPgogICAgICA8IS0tIEltYWdlIEdhbGxlcnkgLS0+CiAgICAgICAgIAogICAgICA8IS0tIEVuZCBJbWFnZSBHYWxsZXJ5IC0tPiAKICAgICAgPCEtLSBMaXN0IHNsaWRlciAtLT4KICAgICAgICAgCiAgICAgIDwhLS0gRW5kIExpc3Qgc2xpZGVyIC0tPgogICAgICA8IS0tICBHYWxsZXJ5IFdpdGggVmVydGljYWwgVGh1bWJuYWlsICAtLT4KICAgICAgIAogICAgICA8IS0tICBFbmQgR2FsbGVyeSBXaXRoIFZlcnRpY2FsIFRodW1ibmFpbCAgLS0+CiAgICAgIDwhLS0gU2Nyb2xsaW5nIExvZ28vVGh1bWJuYWlsIFNsaWRlciAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgU2Nyb2xsaW5nIExvZ28vVGh1bWJuYWlsIFNsaWRlciAtLT4KICAgICAgPCEtLSAzRCBTbGlkZXIgLS0+ICAgCiAgICAgICAgICAgIDwhLS0gRW5kIDNEIFNsaWRlciAtLT4gIAogICAgICA8IS0tIFRhYiBTbGlkZXIgLS0+ICAKICAgICAgICAgICAgPCEtLSBFbmQgVGFiIFNsaWRlciAtLT4KICAgICAgPCEtLSBDYW1lcmEtU2xpZGVzaG93IC0tPgogICAgICAgICAgICA8IS0tIEVuZCBDYW1lcmEtU2xpZGVzaG93IC0tPgogICAgICA8IS0tIFJvdGF0ZS1DYXJvdXNlbCAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgUm90YXRlLUNhcm91c2VsIC0tPgogICAgICA8IS0tIEZ1bGwgV2lkdGggQ2Fyb3VzZWwgLS0+CiAgICAgICAgICAgIDwhLS0gRW5kIEZ1bGwgV2lkdGggQ2Fyb3VzZWwgLS0+CiAgICAgIDwhLS0gS2VuIEJ1cm5zIEVmZmVjdCBDYXJvdXNlbCAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgS2VuIEJ1cm5zIEVmZmVjdCBDYXJvdXNlbCAtLT4KICAgICAgPCEtLSBQb3N0IENhcm91c2VsIC0tPgogICAgICAgICAgICA8IS0tIEVuZCBQb3N0IENhcm91c2VsIC0tPgogICAgICA8IS0tIFBob3RvIEdhbGxlcnkgRHJpdmUgUm90YXRlIC0tPgogICAgICAgICAgICA8IS0tIEVuZCBQaG90byBHYWxsZXJ5IERyaXZlIFJvdGF0ZSAtLT4KICAgICAgPCEtLSBDb29sIHNsaWRlciAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgQ29vbCBzbGlkZXIgLS0+CiAgICAgIDwhLS0gSW1hZ2UgU2xpZGVyIENvbnRlbnQgUmlnaHQgLS0+CiAgICAgICAgICAgIDwhLS0gRW5kIEltYWdlIFNsaWRlciBDb250ZW50IFJpZ2h0IC0tPgogICAgICA8IS0tIEltYWdlIFNsaWRlciBDb250ZW50IExlZnQgLS0+CiAgICAgICAgICAgIDwhLS0gRW5kIEltYWdlIFNsaWRlciBDb250ZW50IExlZnQgLS0+CiAgICAgIDwhLS0gSW1hZ2UgU2xpZGVyIENvbnRlbnQgTGVmdCBBbmQgUmlnaHQgLS0+CiAgICAgICAgICAgIDwhLS0gRW5kIEltYWdlIFNsaWRlciBDb250ZW50IExlZnQgQW5kIFJpZ2h0IC0tPgogICAgICA8IS0tIFZpZGVvIFNsaWRlciBGdWxsIFNjcmVlbiAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgVmlkZW8gU2xpZGVyIEZ1bGwgU2NyZWVuIC0tPgogICAgICA8IS0tIFZpZGVvIEdhbGxlcnkgV2l0aCBIb3Jpem9udGFsIERhcmtuZXNzIFNraW4gLS0+CiAgICAgICAgICAgIDwhLS0gRW5kIFZpZGVvIEdhbGxlcnkgV2l0aCBIb3Jpem9udGFsIERhcmtuZXNzIFNraW4gLS0+CiAgICAgIDwhLS0gVmlkZW8gR2FsbGVyeSBXaXRoIEhvcml6b250YWwgTGlnaHQgU2tpbiAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgVmlkZW8gR2FsbGVyeSBXaXRoIEhvcml6b250YWwgTGlnaHQgU2tpbiAtLT4KICAgICAgPCEtLSBWaWRlbyBWZXJ0aWNhbCBTa2luIC0tPgogICAgICAgICAgICA8IS0tIEVuZCBWaWRlbyBWZXJ0aWNhbCBTa2luIC0tPgogICAgICA8IS0tIEZ1bGwgV2luZG93IEZvciBNb2JpZSAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgRnVsbCBXaW5kb3cgRm9yIE1vYmllIC0tPgogICAgICA8IS0tIEltYWdlIFZlcnRpY2FsIFNsaWRlciAtLT4KICAgICAgICAgICAgPCEtLSBFbmQgSW1hZ2UgVmVydGljYWwgU2xpZGVyIC0tPgogICAgICA8IS0tIE5lYXJieSBJbWFnZSBQYXJ0aWFsIFZpc2libGUgU2xpZGVyIC0tPgogICAgICAgICAgICA8IS0tIEVuZCBOZWFyYnkgSW1hZ2UgUGFydGlhbCBWaXNpYmxlIFNsaWRlciAtLT4KICAgICAgPCEtLSBDYXJvdXNlbCBTbGlkZXIgLS0+CiAgICAgICAgICAgIDwhLS0gRW5kIENhcm91c2VsIFNsaWRlciAtLT4KICAgICAgPCEtLSBTbGlkZXNob3cgUGFyYWxsYXggLS0+CiAgICAgICAgICAgIDwhLS0gRW5kIFNsaWRlc2hvdyBQYXJhbGxheCAtLT4KICAgICAgPCEtLSBWaWRlbyBHYWxsZXJ5IC0tPgogICAgICAgICAgICA8IS0tIEVuZCBWaWRlbyBHYWxsZXJ5IC0tPgo8cCBjbGFzcz0iY29weXJpZ2h0IiBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyO2ZvbnQtc2l6ZTogMTJweDtkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50OyI+CiAgIDxhIGhyZWY9Imh0dHBzOi8vYXBwcy5zaG9waWZ5LmNvbS9iYW5uZXItc2xpZGVyLTEiIHRhcmdldD0iX2JsYW5rIiBzdHlsZT0iY29sb3I6ICM5OTk7ZGlzcGxheTogaW5saW5lLWJsb2NrICFpbXBvcnRhbnQ7Ij5CYW5uZXIgU2xpZGVyIGJ5IE5ETkFQUFM8L2E+CjwvcD4KICAgIAo8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+anNzb3JfMV9zbGlkZXJfaW5pdCgpOzwvc2NyaXB0Pgo8IS0tICAtLT4KCg=="};
    var add_css_setting_theme = "PHN0eWxlPjwvc3R5bGU+";
    // jQuery.ajaxSetup({
    //     cache: true
    //     });
    jQuery('head').append(B64.decode(add_css_setting_theme));
    var blackList;
    jQuery('body').each(function(){
        replacer('\\[ndn-bannerslider-(\\d+)\\]', jQuery(this).get(0), blackList);            
    });
    var array = [];      
    jQuery('body').each(function(){
        replacer('\\[ndn-bannerslider-(\\d+)\\]', jQuery(this).get(0), blackList);            
    });
    var array = [];

    jQuery(".ndn-bannerslider").each(function(index) {
        var id = jQuery(this).attr('id');
        var numb = id.match(/\d+$/)[0];
        array[index] = numb;                      
    });
    var idslider = array.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
    },[]);
    idslider.forEach(function(id) {
        if(html[id]){
            var html_banner = B64.decode(html[id]);
            var regex = RegExp('ndnapps_banner_publishtoshop*');
            if(regex.test(html_banner) == true){
            jQuery("#ndn-bannerslider-"+id).append(html_banner);
            }  
        }
          
    });
    jQuery.ajaxSetup({
        cache: false
    });
};

if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
    loadScript('//code.jquery.com/jquery-3.4.1.min.js', function(){
      NDNAPPS = jQuery.noConflict(true);
      NDNAPPS(document).ready(function() {
          showBannerSliders(NDNAPPS);
      });
    });
  } else {
      showBannerSliders(jQuery);
  }