/** Slize JS v1.0 * Copyright © by Ubeyin LLC. * Licensed under Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.txt) **/ (function() {
  "use strict"; var Slize; var sl; sl = function (selector) {
    if (! (this instanceof sl)) {
      return new sl(selector);
    } if (typeof selector !== undefined) {
      this.data = selector;
    } return this;
  }; try {
    /** not supported in Internet Explorer **/ Slize = class Slize {
      constructor (slize) {
        this.go = function(go) {
          /* Initialization */
          // Slize JS is standing on your page. Your browser is not IE.
          return go(sl);
        };
      }
    };
  } catch(e) {
    /** supported on all browsers */ Slize = function (slize) {
      /** new Slize() **/
    }; (function () {
        this.go = function (go) {
          /* Initialization */
          // Slize JS is standing on your page. Your browser is not IE.
          return go(sl);
        };
      }).call(Slize.prototype);
  } (function () {
      this.prototype.scope = function (_obj) {
        var valOf = function (element) {
          try {
            return element.value,
            element.innerHTML;
          } catch(e) {}
        }; var val = function(element, v) {
          if (v) {
            try {
              element.value = v;
              element.innerHTML = v;
            } catch(e) {}
          }
        };
        try {
          var _data = document.querySelectorAll(this.data.trim());
          for (var i = 0; i <= _data.length; i++) {
            let el = _data[i]; for (var x in _obj) {
              if (valOf(el).includes(x) == true) {
                val(el, valOf(el).replaceAll("{{"+x+"}}", _obj[x]));
              } el.classList.replace("{{"+x+"}}", _obj[x]);
            }
          }
        } catch(e) {}
      };
      this.prototype.copy = function(load) {
        /** copyToClipboard:
        * (2) Chrome 42+, Edge 12+, Firefox 41+, IE 9+, Opera 29+, Safari 10+,
        * (1) IE 10+, Chrome 43+, Firefox 41+, and Opera 29+ **/
        let _val = this.data;
        var valOf = function (element) {
          try {
            return element.value,
            element.innerHTML;
          } catch(e) {}
        }; var val = function(element, v) {
          if (v) {
            try {
              element.value = v;
              element.innerHTML = v;
            } catch(e) {}
          }
        };
        try {
          _val = valOf(document.querySelector(this.data)).trim();
        } catch(e) {}
        try {
          /* copyToClipboard : #1*/ var valarea = document.createElement("textarea"); valarea.innerText = _val; valarea.style.opacity = 0; valarea.style.position = "fixed"; valarea.style.left = "-1000px"; document.body.appendChild(valarea); valarea.select(); valarea.disabled = true; document.execCommand("copy"); document.body.removeChild(valarea);
          /* copyToClipboard : #2 */ if (!navigator.clipboard) {
            return;
          }
          navigator.clipboard.writeText(_val);
        } catch(e) {
          console.error("Copy to clipboard failed!"); return false;
        }
      };
      this.prototype.download = function (name, format) {
        try {
          var a = document.createElement("a"); var val = this.data; var file; val = this.data;
          var valOf = function (element) {
            try {
              return element.value,
              element.innerHTML;
            } catch(e) {}
          };
          try {
            val = valOf(document.querySelector(this.data)).trim();
          } catch(e) {}
          file = new Blob([val], {
            type: format ? format: "octet/stream"
          }); a.href = URL.createObjectURL(file); a.innerHTML = name; a.download = name; var func = function() {
            document.body.appendChild(a);
          }; if (document.body)func(); else window.onload = func; a.onclick = function () {
            document.body.removeChild(a);
          }; a.click();
        } catch(e) {
          console.error("Failed to downlonload!"); return false;
        }
      };
      this.prototype.share = function(title, text) {
        let _val = this.data;
        var valOf = function (element) {
          try {
            return element.value,
            element.innerHTML;
          } catch(e) {}
        };
        try {
          _val = valOf(document.querySelector(this.data)).trim();
        } catch(e) {}
        try {
          return navigator.share({
            title: title,
            text: text,
            url: _val,
          });
        } catch(e) {
          console.error("Failed to share!"); return false;
        }
      };
      this.prototype.fetch = function (func) {
        try {
          let _val = this.data;
          var valOf = function (element) {
            try {
              return element.value,
              element.innerHTML;
            } catch(e) {}
          };
          try {
            _val = valOf(document.querySelector(this.data)).trim();
          } catch(e) {}
          var httpObj; var method; if (!method) {
            method = "GET";
          } if (window.XMLHttpRequest) {
            httpObj = new XMLHttpRequest();
          } else if (window.ActiveXObject) {
            httpObj = new ActiveXObject("Microsoft.XMLHTTP");
          } if (httpObj) {
            if (func) {
              httpObj.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                  return func(this.responseText, this);
                }
              };
            }
            httpObj.open(method, _val, true); httpObj.send(null);
          }
        } catch(e) {
          console.error("Failed to fetch!"); return false;
        }
      };
      this.prototype.slide = function (ms, func) {
        try {
          var i,
          ss,
          x = document.querySelectorAll(this.data),
          l = x.length; ss = {}; ss.current = 1; ss.x = x; ss.ondisplaychange = func; if (!isNaN(ms) || ms == 0) {
            ss.milliseconds = ms;
          } else {
            ss.milliseconds = 1000;
          } ss.start = function() {
            ss.show(ss.current); if (ss.ondisplaychange) {
              ss.ondisplaychange();
            } if (ss.milliseconds > 0) {
              window.clearTimeout(ss.timeout); ss.timeout = window.setTimeout(ss.next, ss.milliseconds);
            }
          }; ss.next = function() {
            ss.current += 1; if (ss.current > ss.x.length) {
              ss.current = 1;
            } ss.start();
          }; ss.prev = function() {
            ss.current -= 1; if (ss.current < 1) {
              ss.current = ss.x.length;
            } ss.start();
          }; ss.show = function (n) {
            for (var i = 0; i < ss.x.length; i++) {
              ss.x[i].style.display = "none";
            } ss.x[n - 1].style.display = "block";
          }; ss.start();
          return ss;
        } catch(e) {
          console.error("Failed to slide!");
          return false;
        }
      };
      this.prototype.include = function(load) {
        try {
          var z,
          i,
          elmnt,
          file,
          xhttp; z = document.getElementsByTagName("*"); for (i = 0; i < z.length; i++) {
            elmnt = z[i]; file = elmnt.getAttribute(this.data); if (file) {
              xhttp = new XMLHttpRequest(); xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                  if (this.status == 200) {
                    elmnt.innerHTML = this.responseText; if (load) return load(this);
                  } if (this.status == 404) {
                    elmnt.innerHTML = "Page not found.";
                  } elmnt.removeAttribute(this.data);
                }
              }; xhttp.open("GET", file, true); xhttp.send(); return;
            }
          }
        } catch(e) {
          throw new Error("Failed to includes files!");
        }
      };
      this.prototype.sort = function(xy) {
        try {
          var a = document.querySelector(this.data);
          var cc; var res; var j; var k; var v1; var v2; var b; var y;
          for (j = 0; j < 2; j++) {
            cc = 0; y = 1; while (y == 1) {
              y = 0; b = a.querySelectorAll(xy); for (k = 0; k < (b.length - 1); k++) {
                res = 0; v1 = b[k].innerText; v2 = b[k + 1].innerText; v1 = v1.toLowerCase(); v2 = v2.toLowerCase(); if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
                  res = 1; break;
                }
              } if (res == 1) {
                b[k].parentNode.insertBefore(b[k + 1], b[k]); y = 1; cc++;
              }
            } if (cc > 0) {
              break;
            }
          }
        } catch(e) {
          console.error("Failed to sort!"+e); return false;
        }
      };
      this.prototype.cursor = function (val) {
        try {
          let _val;
          try {
            _val = document.querySelectorAll(this.data);
          } catch(e) {}
          for (var i = 0; i <= _val.length; i++) {
            _val[i].focus(); _val[i].setRangeText(val, _val[i].selectionStart, _val[i].selectionEnd, "end");
          }
        } catch(e) {}
      };
      this.prototype.gps = function (success, error) {
        const getPositionErrorMessage = code => {
          switch (code) {
            case 1: return 'Permission denied.'; break; case 2: return 'Position unavailable.'; break; case 3: return 'Timeout reached.'; break; default: return 'An unknown error'; break;
          }
        }; if ('geolocation' in navigator === false) {
          console.error(new TypeError('Geolocation is not supported by your browser.'));
        } return navigator.geolocation.getCurrentPosition(function (position) {
            return success(position.coords.latitude, position.coords.longitude, position);
          }, function(e) {
            return error(getPositionErrorMessage(e.code));
          });
      };
    }).call(sl);
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Slize;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Slize;
    });
  } else {
    window.Slize = Slize; window.sl = sl;
  }
} (typeof window !== 'undefined' ? window: this));
