function Inject(tabId, scripts)
{
    function createCallbackJS(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        };
    }
    function createCallbackCSS(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.insertCSS(tabId, injectDetails, innerCallback);
        };
    }
    var callback = null;
    for (var i = scripts.length - 1; i >= 0; --i)

    	if (scripts[i].file.endsWith('.js')) {
    		callback = createCallbackJS(tabId, scripts[i], callback);
    	} else if (scripts[i].file.endsWith('.css')) {
    		callback = createCallbackCSS(tabId, scripts[i], callback);
    	}       
    if (callback !== null)
        callback();
}

chrome.browserAction.onClicked.addListener(function (tab) {
	Inject(null, [ 
        { file: "jquery-1.9.0.js"}, 
        { file: "select2.full.min.js"},
        { file: "select2.min.css"},
        { file: "extension.js"}
    ]);
});