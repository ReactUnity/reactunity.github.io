function createUnityInstance(canvas, config, onProgress) {
  onProgress = onProgress || function () {};

  var Module = {
    canvas: canvas,
    webglContextAttributes: {
      preserveDrawingBuffer: false,
    },
    cacheControl: function (url) {
      return url == Module.dataUrl ? "must-revalidate" : "no-store";
    },
    streamingAssetsUrl: "StreamingAssets",
    downloadProgress: {},
    deinitializers: [],
    intervals: {},
    setInterval: function (func, ms) {
      var id = window.setInterval(func, ms);
      this.intervals[id] = true;
      return id;
    },
    clearInterval: function(id) {
      delete this.intervals[id];
      window.clearInterval(id);
    },
    preRun: [],
    postRun: [],
    print: function (message) {
      console.log(message);
    },
    printErr: function (message) {
      console.error(message);
    },
    locateFile: function (url) {
      return (
        url == "build.wasm" ? this.codeUrl :
        url
      );
    },
    disabledCanvasEvents: [
      "contextmenu",
      "dragstart",
    ],
  };

  for (var parameter in config)
    Module[parameter] = config[parameter];

  Module.streamingAssetsUrl = new URL(Module.streamingAssetsUrl, document.URL).href;

  Module.disabledCanvasEvents.forEach(function (disabledCanvasEvent) {
    canvas.addEventListener(disabledCanvasEvent, function (e) { e.preventDefault(); });
  });

  var unityInstance = {
    Module: Module,
    SetFullscreen: function () {
      if (Module.SetFullscreen)
        return Module.SetFullscreen.apply(Module, arguments);
      Module.print("Failed to set Fullscreen mode: Player not loaded yet.");
    },
    SendMessage: function () {
      if (Module.SendMessage)
        return Module.SendMessage.apply(Module, arguments);
      Module.print("Failed to execute SendMessage: Player not loaded yet.");
    },
    Quit: function () {
      return new Promise(function (resolve, reject) {
        Module.shouldQuit = true;
        Module.onQuit = resolve;
      });
    },
  };

  // The Unity WebGL generated content depends on SystemInfo, therefore it should not be changed. If any modification is necessary, do it at your own risk.
  Module.SystemInfo = (function () {
    var unknown = "-";
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = navigator.appVersion;
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
      browser = "Edge";
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browser = "Safari";
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf("Trident/") != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(nAgt.indexOf("rv:") + 3);
    } else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    if ((ix = version.indexOf(";")) != -1)
      version = version.substring(0, ix);
    if ((ix = version.indexOf(" ")) != -1)
      version = version.substring(0, ix);
    if ((ix = version.indexOf(")")) != -1)
      version = version.substring(0, ix);
    majorVersion = parseInt("" + version, 10);
    if (isNaN(majorVersion)) {
      version = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    else version = "" + parseFloat(version);
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
    var os = unknown;
    var clientStrings = [
      {s: "Windows 3.11", r: /Win16/},
      {s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/},
      {s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/},
      {s: "Windows 98", r: /(Windows 98|Win98)/},
      {s: "Windows CE", r: /Windows CE/},
      {s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/},
      {s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/},
      {s: "Windows Server 2003", r: /Windows NT 5.2/},
      {s: "Windows Vista", r: /Windows NT 6.0/},
      {s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/},
      {s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/},
      {s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/},
      {s: "Windows 10", r: /(Windows 10|Windows NT 10.0)/},
      {s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
      {s: "Windows ME", r: /Windows ME/},
      {s: "Android", r: /Android/},
      {s: "Open BSD", r: /OpenBSD/},
      {s: "Sun OS", r: /SunOS/},
      {s: "Linux", r: /(Linux|X11)/},
      {s: "iOS", r: /(iPhone|iPad|iPod)/},
      {s: "Mac OS X", r: /Mac OS X/},
      {s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
      {s: "QNX", r: /QNX/},
      {s: "UNIX", r: /UNIX/}, 
      {s: "BeOS", r: /BeOS/},
      {s: "OS/2", r: /OS\/2/},
      {s: "Search Bot", r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }
    var osVersion = unknown;
    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = "Windows";
    }
    switch (os) {
    case "Mac OS X":
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
      break;
    case "Android":
      osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
      break;
    case "iOS":
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
      break;
    }
    return {
      width: screen.width ? screen.width : 0,
      height: screen.height ? screen.height : 0,
      browser: browser,
      browserVersion: version,
      mobile: mobile,
      os: os,
      osVersion: osVersion,
      gpu: (function() {
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("experimental-webgl");
        if(gl) {
          var renderedInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if(renderedInfo) {
            return gl.getParameter(renderedInfo.UNMASKED_RENDERER_WEBGL);
          }
        }
        return unknown;
      })(),
      language: window.navigator.userLanguage || window.navigator.language,
      hasWebGL: (function() {
        if (!window.WebGLRenderingContext) {
          return 0;
        }
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl2");
        if (!gl) {
          gl = canvas.getContext("experimental-webgl2");
          if (!gl) {
            gl = canvas.getContext("webgl");
            if (!gl) {
              gl = canvas.getContext("experimental-webgl");
              if (!gl) {
                return 0;
              }
            }
            return 1;
          }
          return 2;
        }
        return 2;
      })(),
      hasCursorLock: (function() {
        var e = document.createElement("canvas");
        if (e["requestPointerLock"] || e["mozRequestPointerLock"] || e["webkitRequestPointerLock"] || e["msRequestPointerLock"]) return 1; else return 0;
      })(),
      hasFullscreen: (function() {
        var e = document.createElement("canvas");
        if (e["requestFullScreen"] || e["mozRequestFullScreen"] || e["msRequestFullscreen"] || e["webkitRequestFullScreen"]) {
          if (browser.indexOf("Safari") == -1 || version >= 10.1) return 1;
        }
        return 0;
      })(),
      hasThreads: typeof SharedArrayBuffer !== 'undefined',
      hasWasm: typeof WebAssembly == "object" && typeof WebAssembly.validate == "function" && typeof WebAssembly.compile == "function",
      hasWasmThreads: (function(){
        if (typeof WebAssembly != "object") return false;
        if (typeof SharedArrayBuffer === 'undefined') return false;

        var wasmMemory = new WebAssembly.Memory({"initial": 1, "maximum": 1, "shared": true});
        var isSharedArrayBuffer = wasmMemory.buffer instanceof SharedArrayBuffer;
        delete wasmMemory;
        return isSharedArrayBuffer;
      })(),
    };
  })();

  function errorHandler(message, filename, lineno) {
    if (Module.startupErrorHandler) {
      Module.startupErrorHandler(message, filename, lineno);
      return;
    }
    if (Module.errorHandler && Module.errorHandler(message, filename, lineno))
      return;
    console.log("Invoking error handler due to\n" + message);
    if (typeof dump == "function")
      dump("Invoking error handler due to\n" + message);
    // Firefox has a bug where it's IndexedDB implementation will throw UnknownErrors, which are harmless, and should not be shown.
    if (message.indexOf("UnknownError") != -1)
      return;
    // Ignore error when application terminated with return code 0
    if (message.indexOf("Program terminated with exit(0)") != -1)
      return;
    if (errorHandler.didShowErrorMessage)
      return;
    var message = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + message;
    if (message.indexOf("DISABLE_EXCEPTION_CATCHING") != -1) {
      message = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.";
    } else if (message.indexOf("Cannot enlarge memory arrays") != -1) {
      message = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.";
    } else if (message.indexOf("Invalid array buffer length") != -1  || message.indexOf("Invalid typed array length") != -1 || message.indexOf("out of memory") != -1 || message.indexOf("could not allocate memory") != -1) {
      message = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings.";
    }
    alert(message);
    errorHandler.didShowErrorMessage = true;
  }

  function errorListener(e) {
    var error = e.type == "unhandledrejection" && typeof e.reason == "object" ? e.reason : typeof e.error == "object" ? e.error : null;
    var message = error ? error.toString() : typeof e.message == "string" ? e.message : typeof e.reason == "string" ? e.reason : "";
    if (error && typeof error.stack == "string")
      message += "\n" + error.stack.substring(!error.stack.lastIndexOf(message, 0) ? message.length : 0).replace(/(^\n*|\n*$)/g, "");
    if (!message || !Module.stackTraceRegExp || !Module.stackTraceRegExp.test(message))
      return;
    var filename =
      e instanceof ErrorEvent ? e.filename :
      error && typeof error.fileName == "string" ? error.fileName :
      error && typeof error.sourceURL == "string" ? error.sourceURL :
      "";
    var lineno =
      e instanceof ErrorEvent ? e.lineno :
      error && typeof error.lineNumber == "number" ? error.lineNumber :
      error && typeof error.line == "number" ? error.line :
      0;
    errorHandler(message, filename, lineno);
  }

  Module.abortHandler = function (message) {
    errorHandler(message, "", 0);
    return true;
  };

  window.addEventListener("error", errorListener);
  window.addEventListener("unhandledrejection", errorListener);
  Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50);

  function progressUpdate(id, e) {
    if (id == "symbolsUrl")
      return;
    var progress = Module.downloadProgress[id];
    if (!progress)
      progress = Module.downloadProgress[id] = {
        started: false,
        finished: false,
        lengthComputable: false,
        total: 0,
        loaded: 0,
      };
    if (typeof e == "object" && (e.type == "progress" || e.type == "load")) {
      if (!progress.started) {
        progress.started = true;
        progress.lengthComputable = e.lengthComputable;
        progress.total = e.total;
      }
      progress.loaded = e.loaded;
      if (e.type == "load")
        progress.finished = true;
    }
    var loaded = 0, total = 0, started = 0, computable = 0, unfinishedNonComputable = 0;
    for (var id in Module.downloadProgress) {
      var progress = Module.downloadProgress[id];
      if (!progress.started)
        return 0;
      started++;
      if (progress.lengthComputable) {
        loaded += progress.loaded;
        total += progress.total;
        computable++;
      } else if (!progress.finished) {
        unfinishedNonComputable++;
      }
    }
    var totalProgress = started ? (started - unfinishedNonComputable - (total ? computable * (total - loaded) / total : 0)) / started : 0;
    onProgress(0.9 * totalProgress);
  }

    Module.XMLHttpRequest = function () {
    var UnityCacheDatabase = { name: "UnityCache", version: 2 };
    var XMLHttpRequestStore = { name: "XMLHttpRequest", version: 1 };
    var WebAssemblyStore = { name: "WebAssembly", version: 1 };
    
    function log(message) {
      console.log("[UnityCache] " + message);
    }
    
    function resolveURL(url) {
      resolveURL.link = resolveURL.link || document.createElement("a");
      resolveURL.link.href = url;
      return resolveURL.link.href;
    }
    
    function isCrossOriginURL(url) {
      var originMatch = window.location.href.match(/^[a-z]+:\/\/[^\/]+/);
      return !originMatch || url.lastIndexOf(originMatch[0], 0);
    }

    function UnityCache() {
      var cache = this;
      cache.queue = [];

      function initDatabase(database) {
        if (typeof cache.database != "undefined")
          return;
        cache.database = database;
        if (!cache.database)
          log("indexedDB database could not be opened");
        while (cache.queue.length) {
          var queued = cache.queue.shift();
          if (cache.database) {
            cache.execute.apply(cache, queued);
          } else if (typeof queued.onerror == "function") {
            queued.onerror(new Error("operation cancelled"));
          }
        }
      }
      
      try {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        function upgradeDatabase() {
          var openRequest = indexedDB.open(UnityCacheDatabase.name, UnityCacheDatabase.version);
          openRequest.onupgradeneeded = function (e) {
            var database = e.target.result;
            if (!database.objectStoreNames.contains(WebAssemblyStore.name))
              database.createObjectStore(WebAssemblyStore.name);
          };
          openRequest.onsuccess = function (e) { initDatabase(e.target.result); };
          openRequest.onerror = function () { initDatabase(null); };
        }
        var openRequest = indexedDB.open(UnityCacheDatabase.name);
        openRequest.onupgradeneeded = function (e) {
          var objectStore = e.target.result.createObjectStore(XMLHttpRequestStore.name, { keyPath: "url" });
          ["version", "company", "product", "updated", "revalidated", "accessed"].forEach(function (index) { objectStore.createIndex(index, index); });
        };
        openRequest.onsuccess = function (e) {
          var database = e.target.result;
          if (database.version < UnityCacheDatabase.version) {
            database.close();
            upgradeDatabase();
          } else {
            initDatabase(database);
          }
        };
        openRequest.onerror = function () { initDatabase(null); };
      } catch (e) {
        initDatabase(null);
      }
    };
    
    UnityCache.prototype.execute = function (store, operation, parameters, onsuccess, onerror) {
      if (this.database) {
        try {
          var target = this.database.transaction([store], ["put", "delete", "clear"].indexOf(operation) != -1 ? "readwrite" : "readonly").objectStore(store);
          if (operation == "openKeyCursor") {
            target = target.index(parameters[0]);
            parameters = parameters.slice(1);
          }
          var request = target[operation].apply(target, parameters);
          if (typeof onsuccess == "function")
            request.onsuccess = function (e) { onsuccess(e.target.result); };
          request.onerror = onerror;
        } catch (e) {
          if (typeof onerror == "function")
            onerror(e);
        }
      } else if (typeof this.database == "undefined") {
        this.queue.push(arguments);
      } else if (typeof onerror == "function") {
        onerror(new Error("indexedDB access denied"));
      }
    };
    
    var unityCache = new UnityCache();
    
    function createXMLHttpRequestResult(url, company, product, timestamp, xhr) {
      var result = { url: url, version: XMLHttpRequestStore.version, company: company, product: product, updated: timestamp, revalidated: timestamp, accessed: timestamp, responseHeaders: {}, xhr: {} };
      if (xhr) {
        ["Last-Modified", "ETag"].forEach(function (header) { result.responseHeaders[header] = xhr.getResponseHeader(header); });
        ["responseURL", "status", "statusText", "response"].forEach(function (property) { result.xhr[property] = xhr[property]; });
      }
      return result;
    }

    function CachedXMLHttpRequest(objParameters) {
      this.cache = { enabled: false };
      if (objParameters) {
        this.cache.control = objParameters.cacheControl;
        this.cache.company = objParameters.companyName;
        this.cache.product = objParameters.productName;
      }
      this.xhr = new XMLHttpRequest(objParameters);
      this.xhr.addEventListener("load", function () {
        var xhr = this.xhr, cache = this.cache;
        if (!cache.enabled || cache.revalidated)
          return;
        if (xhr.status == 304) {
          cache.result.revalidated = cache.result.accessed;
          cache.revalidated = true;
          unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result]);
          log("'" + cache.result.url + "' successfully revalidated and served from the indexedDB cache");
        } else if (xhr.status == 200) {
          cache.result = createXMLHttpRequestResult(cache.result.url, cache.company, cache.product, cache.result.accessed, xhr);
          cache.revalidated = true;
          unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result], function (result) {
            log("'" + cache.result.url + "' successfully downloaded and stored in the indexedDB cache");
          }, function (error) {
            log("'" + cache.result.url + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + error);
          });
        } else {
          log("'" + cache.result.url + "' request failed with status: " + xhr.status + " " + xhr.statusText);
        }
      }.bind(this));
    };
    
    CachedXMLHttpRequest.prototype.send = function (data) {
      var xhr = this.xhr, cache = this.cache;
      var sendArguments = arguments;
      cache.enabled = cache.enabled && xhr.responseType == "arraybuffer" && !data;
      if (!cache.enabled)
        return xhr.send.apply(xhr, sendArguments);
      unityCache.execute(XMLHttpRequestStore.name, "get", [cache.result.url], function (result) {
        if (!result || result.version != XMLHttpRequestStore.version) {
          xhr.send.apply(xhr, sendArguments);
          return;
        }
        cache.result = result;
        cache.result.accessed = Date.now();
        if (cache.control == "immutable") {
          cache.revalidated = true;
          unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result]);
          xhr.dispatchEvent(new Event('load'));
          log("'" + cache.result.url + "' served from the indexedDB cache without revalidation");
        } else if (isCrossOriginURL(cache.result.url) && (cache.result.responseHeaders["Last-Modified"] || cache.result.responseHeaders["ETag"])) {
          var headXHR = new XMLHttpRequest();
          headXHR.open("HEAD", cache.result.url);
          headXHR.onload = function () {
            cache.revalidated = ["Last-Modified", "ETag"].every(function (header) {
              return !cache.result.responseHeaders[header] || cache.result.responseHeaders[header] == headXHR.getResponseHeader(header);
            });
            if (cache.revalidated) {
              cache.result.revalidated = cache.result.accessed;
              unityCache.execute(XMLHttpRequestStore.name, "put", [cache.result]);
              xhr.dispatchEvent(new Event('load'));
              log("'" + cache.result.url + "' successfully revalidated and served from the indexedDB cache");
            } else {
              xhr.send.apply(xhr, sendArguments);
            }
          }
          headXHR.send();
        } else {
          if (cache.result.responseHeaders["Last-Modified"]) {
            xhr.setRequestHeader("If-Modified-Since", cache.result.responseHeaders["Last-Modified"]);
            xhr.setRequestHeader("Cache-Control", "no-cache");
          } else if (cache.result.responseHeaders["ETag"]) {
            xhr.setRequestHeader("If-None-Match", cache.result.responseHeaders["ETag"]);
            xhr.setRequestHeader("Cache-Control", "no-cache");
          }
          xhr.send.apply(xhr, sendArguments);
        }
      }, function (error) {
        xhr.send.apply(xhr, sendArguments);
      });
    };
    
    CachedXMLHttpRequest.prototype.open = function (method, url, async, user, password) {
      this.cache.result = createXMLHttpRequestResult(resolveURL(url), this.cache.company, this.cache.product, Date.now());
      this.cache.enabled = ["must-revalidate", "immutable"].indexOf(this.cache.control) != -1 && method == "GET" && this.cache.result.url.match("^https?:\/\/")
        && (typeof async == "undefined" || async) && typeof user == "undefined" && typeof password == "undefined";
      this.cache.revalidated = false;
      return this.xhr.open.apply(this.xhr, arguments);
    };
    
    CachedXMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      this.cache.enabled = false;
      return this.xhr.setRequestHeader.apply(this.xhr, arguments);
    };
    
    var xhr = new XMLHttpRequest();
    for (var property in xhr) {
      if (!CachedXMLHttpRequest.prototype.hasOwnProperty(property)) {
        (function (property) {
          Object.defineProperty(CachedXMLHttpRequest.prototype, property, typeof xhr[property] == "function" ? {
            value: function () { return this.xhr[property].apply(this.xhr, arguments); },
          } : {
            get: function () { return this.cache.revalidated && this.cache.result.xhr.hasOwnProperty(property) ? this.cache.result.xhr[property] : this.xhr[property]; },
            set: function (value) { this.xhr[property] = value; },
          });
        })(property);
      }
    }
    
    return CachedXMLHttpRequest;
  } ();



  function downloadBinary(urlId) {
    return new Promise(function (resolve, reject) {
      progressUpdate(urlId);
      var xhr = Module.companyName && Module.productName ? new Module.XMLHttpRequest({
        companyName: Module.companyName,
        productName: Module.productName,
        cacheControl: Module.cacheControl(Module[urlId]),
      }) : new XMLHttpRequest();
      xhr.open("GET", Module[urlId]);
      xhr.responseType = "arraybuffer";
      xhr.addEventListener("progress", function (e) {
        progressUpdate(urlId, e);
      });
      xhr.addEventListener("load", function(e) {
        progressUpdate(urlId, e);
        resolve(new Uint8Array(xhr.response));
      });
      xhr.send();
    });
  }

  function downloadFramework() {
      return new Promise(function (resolve, reject) {
        var script = document.createElement("script");
        script.src = Module.frameworkUrl;
        script.onload = function () {
          delete script.onload;
          resolve(unityFramework);
        }
        document.body.appendChild(script);
        Module.deinitializers.push(function() {
          document.body.removeChild(script);
        });
      });
  }

  function loadBuild() {
    downloadFramework().then(function (unityFramework) {
      unityFramework(Module);
    });

    var dataPromise = downloadBinary("dataUrl");
    Module.preRun.push(function () {
      Module.addRunDependency("dataUrl");
      dataPromise.then(function (data) {
        var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        var pos = 0;
        var prefix = "UnityWebData1.0\0";
        if (!String.fromCharCode.apply(null, data.subarray(pos, pos + prefix.length)) == prefix)
          throw "unknown data format";
        pos += prefix.length;
        var headerSize = view.getUint32(pos, true); pos += 4;
        while (pos < headerSize) {
          var offset = view.getUint32(pos, true); pos += 4;
          var size = view.getUint32(pos, true); pos += 4;
          var pathLength = view.getUint32(pos, true); pos += 4;
          var path = String.fromCharCode.apply(null, data.subarray(pos, pos + pathLength)); pos += pathLength;
          for (var folder = 0, folderNext = path.indexOf("/", folder) + 1 ; folderNext > 0; folder = folderNext, folderNext = path.indexOf("/", folder) + 1)
            Module.FS_createPath(path.substring(0, folder), path.substring(folder, folderNext - 1), true, true);
          Module.FS_createDataFile(path, null, data.subarray(offset, offset + size), true, true, true);
        }
        Module.removeRunDependency("dataUrl");
      });
    });
  }

  return new Promise(function (resolve, reject) {
    if (!Module.SystemInfo.hasWebGL) {
      reject("Your browser does not support WebGL.");
    } else if (!Module.SystemInfo.hasWasm) {
      reject("Your browser does not support WebAssembly.");
    } else {
      if (Module.SystemInfo.hasWebGL == 1)
        Module.print("Warning: Your browser does not support \"WebGL 2.0\" Graphics API, switching to \"WebGL 1.0\"");
      Module.startupErrorHandler = reject;
      onProgress(0);
      Module.postRun.push(function () {
        onProgress(1);
        delete Module.startupErrorHandler;
        resolve(unityInstance);
      });
      loadBuild();
    }
  });
}
