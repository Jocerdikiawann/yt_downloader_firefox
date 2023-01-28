(async function () {
    const go = new Go()
    const result = await WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        go.importObject
    )
    go.run(result.instance)
    console.log("Load wasm...")
})();

async function getUrl() {
    browser.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var currentTab = tabs[0];
        var currentUrl = currentTab.url;
        browser.runtime.sendMessage({ url: currentUrl, msg: "found-url" });
    });
}