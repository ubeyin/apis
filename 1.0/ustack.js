/*
   Ustack JS (Ubeyin Stack Development JS)
   Version : 1.0 (first)
   Powered by : Ubeyin LLC
   Licensed under : Apache 2.0, Creative Commons
   Created by : mohammad sefatullah on May 2021

 # New features :
   * Fetch URLS.
   * Tracks Current Location lat, long and name.
   * Handle elements in many size of windows.
   * Load a function on window.
   * Copy To Clipboard Function.
   * Get weathers and 3 day forecast.
   * Get Navigator Device Agent.

 # More features :
   * Using functions 'new Ubeyin()' or Ub
*/

let Ubeyin, Ub;
let version;

(function(window) {
  Ubeyin = function() {
    return true;
  };
  Ub = new Ubeyin(), version = "1.0", cors = "https://cors-anywhere.herokuapp.com/";
  function isEmpty(object) {
    for (let x in object) {
      if (object.hasOwnProperty(x)) {
        return false;
      }
    }
    return true;
  }
  function urlEncode(object) {
    let urlData = '';
    if (!object) {
      return '';
    }
    for (let x in object) {
      urlData = urlData + x + '=' + encodeURIComponent(object[x]) + '&';
    }
    urlData = urlData.substr(0, (urlData.length - 1));
    return urlData;
  }
  (function() {
    /** FETCH URLS
    * SYSTEM NAME : XML HTTP REQUEST
    **/
    this.fetch = function(url, data, full) {
      if (data && !isEmpty(data)) {
        url = url + '?' + urlEncode(data);
      }
      let xhr = fetch(url);
      if (typeof full == "object") {
        xhr = fetch(url, full);
      }
      let fn = {
        then: function(types, event, error) {
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
    /** GEO LOCATION :
    * PLACE NAME BY : locationiq.com
    * LAT AND LON BY : own device
    * SYSTEM NAME : navigator
    **/
    this.gps = function() {
      let fn = {
        then: function ( {
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
        },
      };
      return fn;
    };
    /** WINDOW LAYOUT SIZING
    * SYSTEM NAME : window
    **/
    this.window = {
      onsize: function(load) {
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
      }
    };
    /** LOAD A FUNCTION
    * SYSTEM NAME : window.onload
    **/
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
    }
    /** COPY TO CLIPBOARD
    * SYSTEM NAME : window.clipboardData && document.execCommand
    * WARNING : WORKS ONLY EVENT FUNCTION
    **/
    this.copyToClipboard = function(_a, load) {
      let _tag = null;
      try {
        // copyToClipboard : #1
        _tag = 1;
        return window.clipboardData.setData("text", _a);
      } catch(e) {
        try {
          // copyToClipboard : #2
          if (!navigator.clipboard) {
            return;
          }
          _tag = 2;
          return navigator.clipboard.writeText(_a);
        } catch(e) {
          try {
            // copyToClipboard : #3
            var valarea = document.createElement("textarea");
            valarea.innerText = _a;
            valarea.style.opacity = 0;
            valarea.style.position = "fixed";
            document.body.appendChild(valarea);
            valarea.select();
            _tag = 3;
            return document.execCommand("copy");
          } catch(e) {
            console.error("Copy to clipboard failed");
            return false;
          }
        }
      } finally {
        if (load) return load(_a, _tag);
      }
    };
    /** NAVIGATOR && DEVICE AGENT
    * SYSTEM NAME : navigator && navigator.userAgent
    **/
    this.navigator = function (type) {
      if (type == "agent") {
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
      }
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

  }).call(Ubeyin.prototype);
  (function() {
    //if ("undefined" == typeof Ubeyin) throw new TypeError("Ustack JS are required.");
  }());
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Ubeyin;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Ubeyin;
    });
  } else if (!window.Ubeyin) {
    window.Ubeyin = Ubeyin;
  }
} (typeof window !== 'undefined' ? window: this));