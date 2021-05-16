/*
   DOM JS (Document Model JavaScript)
   Version : 1.0 (first)
   Copyright by Ubeyin LLC.
   Licensed under Apache 2.0, Creative Commons.
   Created on May 2021.
*/


(function(window) {
  "use strict";

  let _DOMJS = true;

  var cors = "https://cors-anywhere.herokuapp.com/";

  class DOMJS {
    _DOMJS = true;
    constructor(__dom) {
      this.init = function (__init) {
        return __init();
      };
      this.enc = function (_v) {
        return encodeURIComponent(_v);
      };
      this.dec = function (_v) {
        return decodeURIComponent(_v);
      };
      this.toURL = function(object) {
        let urlData = '';
        if (!object) {
          return '';
        }
        for (let x in object) {
          urlData = urlData + x + '=' + encodeURIComponent(object[x]) + '&';
        }
        urlData = urlData.substr(0, (urlData.length - 1));
        return urlData;
      };
      this.isNull = function (object) {
        for (let x in object) {
          if (object.hasOwnProperty(x)) {
            return false;
          }
        }
        return true;
      };
      this.fetch = function(url, data, full) {
        function toUrl(object) {
          let urlData = '';
          if (!object) {
            return '';
          }
          for (let x in object) {
            urlData = urlData + x + '=' + encodeURIComponent(object[x]) + '&';
          }
          urlData = urlData.substr(0, (urlData.length - 1));
          return urlData;
        };
        if (data && data != null) {
          url = url + '?' + toUrl(data);
        }
        let xhr = fetch(url);
        if (typeof full == "object") {
          xhr = fetch(url, full);
        }
        let fn = {
          on: function(types, event, error) {
            xhr.then(eval("response => response."+types)).then(function(response) {
              return event(response);
            });
            xhr.catch(function(e) {
              if (error) {
                return error();
              }
            });
          },
        };
        return fn;
      };
      this.gps = function ( {
        load,
        error
      }) {
        const getPositionErrorCode = code => {
          let codes;
          switch (code) {
            case 1:
              codes = 101;
              break;
            case 2:
              codes = 503;
              break;
            case 3:
              codes = 408;
              break;
            default:
              codes = 500;
              break;
          }
          return codes;
        };
        const getPositionErrorMessage = code => {
          let codes;
          switch (code) {
            case 1:
              message = 'Permission denied.';
              break;
            case 2:
              message = 'Position unavailable.';
              break;
            case 3:
              message = 'Timeout reached.';
              break;
            default:
              message = 'An unknown error';
              break;
          }
          return message;
        };
        if ('geolocation' in navigator === false) {
          console.error(new TypeError('Geolocation is not supported by your browser.'));
          if (error) {
            return error('Geolocation is not supported by your browser.');
          }
        }
        return navigator.geolocation.getCurrentPosition(function (position) {
          Ub.fetch("https://us1.locationiq.com/v1/reverse.php", {
            key: "pk.841faf5c95235f9459953b664d1ec98c",
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            format: "json"
          }).then("json()", function(data) {
            result = data.display_name;
            if (load) {
              return load(position.coords.latitude, position.coords.longitude, data.display_name, position);
            }
          },
            function(e) {
              if (error) {
                return error(position.coords.latitude, position.coords.longitude, "Not found", position);
              }
            });
        }, function(e) {
          if (error) {
            return error(getPositionErrorCode(e.code), getPositionErrorMessage(e.code));
          }
        });
      };
      this.viewport = function(load) {
        if (load) {
          let mobile,
          tablet,
          laptop,
          ipad,
          dekstop,
          otherwise;
          mobile = load.mobile;
          tablet = load.tablet;
          laptop = load.laptop;
          ipad = load.ipad;
          dekstop = load.dekstop;
          otherwise = load.other;

          if (mobile || tablet || laptop || ipad || dekstop || otherwise) {
            let onl = function() {
              if (window.innerWidth <= 400) {
                if (mobile) {
                  // mobile window
                  mobile(window);
                }
              } else if (window.innerWidth <= 870 && window.innerWidth >= 400) {
                if (tablet) {
                  // tablet window
                  tablet(window);
                }
              } else if (window.innerWidth <= 970 && window.innerWidth >= 870) {
                if (ipad) {
                  // ipad window
                  ipad(window);
                }
              } else if (window.innerWidth <= 1100 && window.innerWidth >= 970) {
                if (laptop) {
                  // laptop window
                  laptop(window);
                }
              } else if (window.innerWidth <= 1200 && window.innerWidth >= 1100) {
                if (dekstop) {
                  // dekstop window
                  dekstop(window);
                }
              } else {
                if (otherwise) {
                  // other window
                  otherwise(window);
                }
              }
            };
            if (document.body) onl();
            else window.onload = onl;
          } else {}
        }
      };

      this.load = function (reg) {
        if ("function" === typeof reg) {
          if (document.body) {
            reg(document.body);
          } else {
            window.onload = function () {
              return reg(window);
            };
          }
        } else {
          throw new TypeError("Cannot read property load() of undefined");
        }
      };

      this.agent = function () {
        let device = "Unknown";
        const ua = {
          "Generic Linux": /Linux/i,
          "Android": /Android/i,
          "BlackBerry": /BlackBerry/i,
          "Bluebird": /EF500/i,
          "Chrome OS": /CrOS/i,
          "Datalogic": /DL-AXIS/i,
          "Honeywell": /CT50/i,
          "iPad": /iPad/i,
          "iPhone": /iPhone/i,
          "iPod": /iPod/i,
          "macOS": /Macintosh/i,
          "Windows": /IEMobile|Windows/i,
          "Zebra": /TC70|TC55/i,
          "Opera": /Opera Mini/i
        };
        Object.keys(ua).map(v => navigator.userAgent.match(ua[v]) && (device = v));
        return device;
      };

      this.weather = function ( {
        type, key, value, unit, days
      }) {
        if (!key) {
          key = "64d768ea2ce5401588882604210405";
        }
        if (unit == 1) {
          unit = "metric";
        }
        if (unit == 2) {
          unit == "imperial"
        }
        if (!days) {
          days = 3;
        }
        if (!type) {
          type = "forecast.json";
        }
        let XMLHttp = new XMLHttpRequest();
        XMLHttp.open("GET", "https://api.weatherapi.com/v1/"+type+"?key="+key+"&"+value+"&units="+unit+"&aqi=yes&alert=yes&days="+days);
        let fn = {
          then: function( {
            load, error, hour
          }) {
            XMLHttp.onload = function() {
              if (XMLHttp.status == 200) {
                if (load) {
                  load(JSON.parse(XMLHttp.responseText));
                }
              } else {
                if (error) {
                  return error(XMLHttp.status);
                }
              }
              if (XMLHttp.status == 200) {
                if (hour) {
                  // i <= 24 per 1 day
                  for (var i = 0; i <= 24; i++) {
                    hour(i, JSON.parse(XMLHttp.responseText).forecast.forecastday);
                  }
                }
              }
            }
          },
        };
        XMLHttp.send();
        return fn;
      };
    }
  }

  (function() {}());

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = DOMJS;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return DOMJS;
    });
  } else {
    window.DOMJS = DOMJS;
  }
} (typeof window !== 'undefined' ? window: this));
let $;
$ = function (_el) {
  return document.querySelector(_el);
};
(function() {
  /* @Object + DOM (Objective)
      ** val: (DOM) + Set value.
      ** upper: (DOM) + Make upper case.
      ** Lower: (DOM) + Make lower case.
      ** Arr: (DOM)(object) Convert to array.
      ** Num: (DOM) + Convert to number.
      ** Str: (DOM)(object) + Convert to string.
      ** Random: (DOM)(object) + Random text
 */
  this.val = function(_val) {
    if (_val && _val != null) {
      if ("object" === typeof _val) {
        _val = JSON.stringify(_val);
      } else {
        _val = _val;
      }
      try {
        this.innerHTML = _val;
        this.value = _val;
      } catch(e) {
        try {
          this.textContent = _val;
        } catch(e) {
          try {
            this.innerText = _val;
          } catch(e) {
            return false;
          }
        }
      }
    } else {
      try {
        return this.value ? this.value: this.innerHTML.trim();
      } catch(e) {
        try {
          return this.textContent;
        } catch(e) {
          try {
            return this.innerText;
          } catch(e) {
            return this;
          }
        }
      }
    }
  };
  this.upper = function() {
    try {
      return this.val().toUpperCase();
    } catch(e) {
      /* Not DOM */
    }
    return this.toUpperCase();
  };
  this.lower = function() {
    try {
      return this.val().toLowerCase();
    } catch(e) {
      /* Not DOM */
    }
    return this.toLowerCase();
  };
  this.arr = function() {
    try {
      return this.val().split(/[ ]{1,}/);
    } catch(e) {
      /* Not DOM */
    }
    return this.split(/[ ]{1,}/);
  };
  this.str = function () {
    var myResult = "";
    var n = this.length;
    var i = 0;
    for (i; i < n; i++) {
      myResult += this[i];
    }
    return myResult;
  };
  this.num = function () {
    try {
      return parseFloat(this.val());
    } catch(e) {
      /* Not DOM */
    }
    return parseFloat(this);
  };
  this.random = function(_in) {
    if (_in == "word") {
      var max = this.arr().length-1;
      var myRandomPosition;
      var min = 0;
      try {
        max = this.val().arr().length-1;
      } catch (e) {
        /* Not DOM */
      }
      myRandomPosition = Math.floor(Math.random()*(max-min+1)+min);
      try {
        return this.val().arr()[myRandomPosition]
      } catch(e) {
        /* Not DOM */
      }
      return this.arr()[myRandomPosition]
    } else {
      var max = this.length-1;
      var myRandomPosition;
      var min = 0;
      try {
        max = this.val().length-1;
      } catch (e) {
        /* Not DOM */
      }
      myRandomPosition = Math.floor(Math.random()*(max-min+1)+min);
      try {
        return this.val()[myRandomPosition]
      } catch(e) {
        /* Not DOM */
      }
      return this[myRandomPosition];
    }
  };
  this.add = function (_val) {
    switch (_val[0]) {
      case '.':
        return this.classList.add(_val.replace(".", ""));
        break;
      case '<':
        return this.appendChild(document.createElement(_val.replace("<", "").replace(">", "")));
        break;
      case '=':
        return this.val(this.val()+_val.replace("=", ""));
        default:
          /* none */
          break;
    }
  };
  /** copyToClipboard:
  Supports on-
  (1) IE+,
  (2) Chrome 42+, Edge 12+, Firefox 41+, IE 9+, Opera 29+, Safari 10+,
  (3) IE 10+, Chrome 43+, Firefox 41+, and Opera 29+
  **/
  this.copy = function(load) {
    let _tag = null;
    let _a;
    try {
      _a = this.val();
    } catch(e) {
      /* Not DOM */
      _a = this;
    }
    /* copyToClipboard : #3 */
    try {
      try {
        _a.select();
    } catch(e) {
      var valarea = document.createElement("textarea");
      valarea.innerText = _a;
      valarea.style.opacity = 0;
      valarea.style.position = "fixed";
      document.body.appendChild(valarea);
      valarea.select();
    }
    _tag = 3;
    return document.execCommand("copy");
  } catch(e) {
    /**/
  }
  try {
    /* copyToClipboard : #1 */
    _tag = 1;
    return window.clipboardData.setData("text", _a);
  } catch(e) {
    try {
      /* copyToClipboard : #2 */
      if (!navigator.clipboard) {
        return;
      }
      _tag = 2;
      return navigator.clipboard.writeText(_a);
    } catch(e) {
      console.error("Copy to clipboard failed");
      return false;
    }
  } finally {
    if (load) return load(_a, _tag);
  }
};
  this.cursor = function (_val) {
    var _v;
    _v = this;
    _v.setRangeText(_val,
      _v.selectionStart,
      _v.selectionEnd,
      "end");
    _v.focus();
  };

  this.enc = function (_v) {
    try {
      return encodeURIComponent(this.val());
    } catch(e) {
      /* Not DOM */
      return encodeURIComponent(this);
    }
  };
  this.dec = function (_v) {
    try {
      return decodeURIComponent(this.val());
    } catch(e) {
      /* Not DOM */
      return decodeURIComponent(this);
    }
  };
}).call(Object.prototype);
