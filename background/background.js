let resultGo

(async function () {
    const go = new Go()
    resultGo = await WebAssembly.instantiateStreaming(
        fetch("background/main.wasm"),
        go.importObject
    )
    go.run(resultGo.instance)
})();

let portFromCs;

function connected(p) {
    portFromCs = p
    portFromCs.onMessage.addListener((m) => {
        if (m.msg === "clear-results") {
            console.log("gagal ambil")
        }
        if (m.msg === "found-result") {
            downloadVideo(m.url)
        }
    })
}

browser.runtime.onConnect.addListener(connected);