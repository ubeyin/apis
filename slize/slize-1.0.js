/** Slize JS v1.0
* Copyright © by Ubeyin LLC.
* Licensed under Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.txt)
**/

(function() {
  "use strict";
  var Slize;
  var sl;

  sl = function (selector) {
    if (! (this instanceof sl)) {
      return new sl(selector);
    }
    if (typeof selector !== undefined) {
      this.text = selector;
      try {
        this.element = document.querySelectorAll(selector);
        this.name = selector;
        return this;
      } catch(e) {
        this.element = [selector];
        this.name = selector.id;
        return this;
      }
    }
    return this;
  };

  try {
    /** not supported in Internet Explorer **/
    Slize = class Slize {
      constructor (slize) {
        this.init = function() {
          /* Initialization */
          console.log("Slize JS is standing on your page. Your browser is not IE.");
        };

      }
    };
  } catch(e) {
    /** supported on all browsers */
    Slize = function (slize) {
      /** new Slize() **/
    };
    (function () {
      this.init = function () {
        /* Initialization */
        console.log("Slize JS is standing on your page. Your browser is IE.");
      };

    }).call(Slize.prototype);
  }

  (function () {
    /** DOM Property : this.element **/
    this.prototype.hide = function () {
      let e = this.element;
      for (var i = 0; i < e.length; i++) {
        e[i].style.display = "none";
      }
    };
    this.prototype.show = function () {
      let e = this.element;
      for (var i = 0; i < e.length; i++) {
        e[i].style.display = "block";
      }
    };
    this.prototype.css = function (x) {
      let e = this.element;
      if (typeof x === "object") {
        for (var i = 0; i < e.length; i++) {
          e[i].style[Object.keys(x)[0]] = Object.values(x);
        }
      }
    };
    this.prototype.on = function (x, y, z) {
      let e = this.element;
      if (x && y) {
        for (var i = 0; i < e.length; i++) {
          e[i].addEventListener(x, y, z);
        }
      }
    };
    this.prototype.toggle = function (start, end) {
      var xy = this.element;
      for (var i = 0; i < xy.length; i++) {
        let xyi = xy[i];
        if (xy[i].style.display == "none") {
          xyi.style.display = "";
          if (start) return start();
        } else {
          xyi.style.display = "none";
          if (end) return end();
        }
      }
    };
    this.prototype.val = function (x) {
      if (x != null && typeof x !== undefined) {
        return this.element.forEach(function (el) {
          try {
            el.innerHTML = x;
            el.value = x;
          } catch (e) {
            try {
              el.innerText = x;
            } catch (e) {
              el.textContent = x;
            }
          }
          return this;
        });
      } else {
        var y;
        this.element.forEach(function (el) {
          try {
            y = el.innerHTML;
          } catch (e) {
            try {
              y = el.value;
            } catch (e) {
              try {
                y = el.innerText;
              } catch (e) {
                y = el.textContent;
              }
            }
          }
        });
        try {
          return y.trim();
        } catch(e) {
          return y;
        }
      }
    };
    this.prototype.attr = function (x = 0) {
      let y;
      this.element.forEach((e) => {
        y = e.attributes[x];
      });
      return y;
    };
    this.prototype.addAttr = function (x = 0) {
      return this.element.forEach((e) => {
        if (typeof x !== "undefined") {
          e.setAttribute(x);
        }
      });
    };
    this.prototype.getAttr = function (att) {
      var arr = [],
      arrCount = -1,
      i,
      l,
      y = this.element.getElementsByTagName("*"),
      z = att.toUpperCase(); l = y.length; for (i = -1; i < l; i += 1) {
        if (i == -1) {
          y[i] = x;
        } if (y[i].getAttribute(z) !== null) {
          arrCount += 1; arr[arrCount] = y[i];
        }
      } return arr;
    };
    this.prototype.id = function (x) {
      return this.element.forEach((e) => {
        if (typeof x !== "undefined") {
          e.id = x;
        } else {
          return e.id;
        }
      });
    };
    this.prototype.setId = function (x) {
      return this.element.forEach((e) => {
        if (typeof x !== "undefined") {
          e.id = e.id.replace(x);
        }
      });
    };
    this.prototype.className = function (x) {
      return this.element.forEach((e) => {
        if (typeof x !== "undefined") {
          e.className = x;
        } else {
          return e.className;
        }
      });
    };
    this.prototype.addClass = function(y) {
      return this.element.forEach((e) => {
        e.classList.add(y);
      });
    };
    this.prototype.setClass = function(x,
      y) {
      return this.element.forEach((e) => {
        e.classList.replace(x, y);
      });
    };
    this.prototype.removeClass = function(x) {
      return this.element.forEach((e) => {
        e.classList.remove(x);
      });
    };
    /** Traversing : this.element **/
    this.prototype.sort = function(xy) {
      var a = this.element;
      var cc;
      var res;
      var i;
      var j;
      var k;
      var v1;
      var v2;
      var b;
      var y;
      for (i = 0; i < a.length; i++) {
        for (j = 0; j < 2; j++) {
          cc = 0; y = 1; while (y == 1) {
            y = 0; b = a[i].querySelectorAll(xy); for (k = 0; k < (b.length - 1); k++) {
              res = 0;
              v1 = b[k].innerText; v2 = b[k + 1].innerText;
              v1 = v1.toLowerCase(); v2 = v2.toLowerCase(); if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
                res = 1; break;
              }
            } if (res == 1) {
              b[k].parentNode.insertBefore(b[k + 1], b[k]); y = 1; cc++;
            }
          } if (cc > 0) {
            break;
          }
        }
      }
    };
    this.prototype.slide = function (ms, func) {
      var i,
      ss,
      x = this.element,
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
        }
        ss.x[n - 1].style.display = "block";
      }; ss.start();
      return ss;
    };
    this.prototype.showObj = function (obj) {
      let ax = this.element[0];
      let xa = sl(this.name);
      for (var x in obj) {
        if (xa.val().includes(x) == true) {
          xa.val(xa.val().replaceAll("{{"+x+"}}", obj[x]));
        }
        xa.setClass("{{"+x+"}}", obj[x]);
        xa.setId("{{"+x+"}}", obj[x]);
      }
    };
    /** Ajax Property : this.text **/
    this.prototype.includeHTML = function(cb) {
      var z,
      i,
      elmnt,
      file,
      xhttp; z = document.getElementsByTagName("*"); for (i = 0; i < z.length; i++) {
        elmnt = z[i]; file = elmnt.getAttribute(this.text);
        if (file) {
          xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
              if (this.status == 200) {
                elmnt.innerHTML = this.responseText;
                if (cb) return cb();
              } if (this.status == 404) {
                elmnt.innerHTML = "Page not found.";
              } elmnt.removeAttribute(this.text);
            }
          };
          xhttp.open("GET", file, true);
          xhttp.send(); return;
        }
      }
    };
    this.prototype.ajax = function (func, method, xml) {
      var httpObj; if (!method) {
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
        } httpObj.open(method, this.text, true); httpObj.send(xml);
      }
    };
    this.prototype.showAjax = function (file) {
      this.ajax(file, function (a) {
        if (a.readyState == 4 && a.status == 200) {
          this.showObj(JSON.parse(this.responseText));
        }
      });
    };
    /** Document Clips : this.element **/
    this.prototype.copy = function(load) {
      /** copyToClipboard: (supports)
      (1) IE+,
      (2) Chrome 42+, Edge 12+, Firefox 41+, IE 9+, Opera 29+, Safari 10+,
      (3) IE 10+, Chrome 43+, Firefox 41+, and Opera 29+
      **/
      let _tag = null;
      let _val;
      _val = sl(this.name).val();

      function copyToClipboard() {
        try {
          /* copyToClipboard : #3*/
          var valarea = document.createElement("textarea");
          valarea.innerText = _val;
          valarea.style.opacity = 0;
          valarea.style.position = "fixed";
          valarea.style.left = "-1000px";
          document.body.appendChild(valarea);
          valarea.select();
          valarea.disabled = true;
          _tag = 3;
          return document.execCommand("copy");
        } catch(e) {
          try {
            /* copyToClipboard : #1 */
            _tag = 1;
            return window.clipboardData.setData("text",
              _val);
          } catch(e) {
            try {
              /* copyToClipboard : #2 */
              if (!navigator.clipboard) {
                return;
              }
              _tag = 2;
              return navigator.clipboard.writeText(_val);
            } catch(e) {
              console.error("Copy to clipboard failed", e);
              return false;
            }
          }
        } finally {
          if (load != null && typeof(load) !== undefined) return load(_val, _tag);
        }
      }
      let trig = document.createElement("button");
      trig.onclick = function() {
        copyToClipboard();
        document.body.removeChild(trig);
      };
      trig.style.opacity = 0;
      trig.style.position = "fixed";
      trig.style.left = "-1000px";
      document.body.appendChild(trig);
      trig.click();
    };
    this.prototype.cursor = function (val) {
      for (var i = 0; i <= this.element.length; i++) {
        this.element[i].focus();
        this.element[i].setRangeText(val, this.element[i].selectionStart, this.element[i].selectionEnd, "end");
      }
    };
    this.prototype.download = function (name, extension) {
      var a = document.createElement("a");
      var val = this.text;
      var file;
      try {
        val = this.element.val();
      } catch(e) {
        val = this.text;
      }
      file = new Blob([val], {
        type: extension ? extension: "octet/stream"
      });
      a.href = URL.createObjectURL(file);
      a.innerHTML = name;
      a.download = name;
      var func = function() {
        document.body.appendChild(a);
      };
      if (document.body)func();
      else window.onload = func;
      a.onclick = function () {
        document.body.removeChild(a);
      };
      a.click();
    };
    this.prototype.blob = function (xyz) {
      var parts = xyz.split(/[:;,]/);
      var myBlob;
      var toString = function(a) {
        return String(a);
      };
      myBlob = (window.Blob || window.MozBlob || window.WebKitBlob || toString);
      myBlob = myBlob.call ? myBlob.bind(window): Blob;
      var type = parts[1],
      decoder = parts[2] == "base64" ? atob: decodeURIComponent,
      binData = decoder(parts.pop()),
      mx = binData.length,
      i = 0,
      uiArr = new Uint8Array(mx); for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i); return new myBlob([uiArr], {
        type: type
      });
    };

    /** Text Property : this.element, this.text **/
    this.prototype.upper = function() {
      try {
        return sl(this.name).val().toUpperCase();
      } catch(e) {
        try {
          return this.text.toUpperCase();
        } catch(e) {}
      }
    };
    this.prototype.lower = function() {
      try {
        return sl(this.name).val().toLowerCase();
      } catch(e) {
        try {
          return this.text.toLowerCase();
        } catch(e) {}
      }
    };
    this.prototype.arr = function() {
      try {
        return sl(this.name).val().split(/[ ]{1,}/);
      } catch(e) {
        try {
          return this.text.split(/[ ]{1,}/);
        } catch(e) {}
      }
    };
    this.prototype.num = function () {
      try {
        return parseFloat(sl(this.name).val());
      } catch(e) {
        try {
          return parseFloat(this.text.val());
        } catch(e) {}
      }
    };
    this.prototype.random = function(_in) {
      var max,
      myRandomPosition,
      min;
      if (_in == "word") {
        try {
          max = sl(this.name).val().arr().length-1;
        } catch(e) {
          try {
            max = this.text.arr().length-1;
          } catch(e) {}
        }
        myRandomPosition;
        min = 0;
        myRandomPosition = Math.floor(Math.random()*(max-min+1)+min);
        try {
          return sl(this.name).val().arr()[myRandomPosition];
        } catch(e) {
          try {
            return this.text.arr()[myRandomPosition];
          } catch(e) {}
        }
      } else {
        try {
          max = sl(this.name).val().length-1;
        } catch(e) {
          try {
            max = this.text.length-1;
          } catch(e) {}
        }
        myRandomPosition;
        min = 0;
        myRandomPosition = Math.floor(Math.random()*(max-min+1)+min);
        try {
          return sl(this.name).val()[myRandomPosition];
        } catch(e) {
          return this.text[myRandomPosition];
        }
      }
    };

  }).call(sl);

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Slize;
    module.exports = sl;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Slize, sl;
    });
  } else {
    window.Slize = Slize;
    window.sl = sl;
  }
} (typeof window !== 'undefined' ? window: this));
