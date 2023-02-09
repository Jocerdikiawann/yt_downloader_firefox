let buttonNodeExist = false


function addLocationObserver(callback) {
    const config = { attributes: false, childList: true, subtree: false }
    const observer = new MutationObserver(callback)
    observer.observe(document.body, config)
}

function observerCallback() {

    if (window.location.href.startsWith('https://www.youtube.com/watch')) {
        try {
            console.log("observer-runing")

            if (buttonNodeExist) {
                return
            }

            let myPort = browser.runtime.connect({ name: "port-from-cs" });
            myPort.postMessage({ msg: "clear-result" });

            myPort.onMessage.addListener((m) => {
                console.log("In content script, received message from background script: ");
                console.log(m.greeting);
            });

            let injectElement = document.createElement("div")
            let buttonNode = document.createElement("button")
            buttonNode.className = "wasmDownload"
            buttonNode.innerHTML = "Download"

            injectElement.appendChild(buttonNode)

            let playerNode = document.getElementById("primary-inner")
            playerNode.insertBefore(injectElement, playerNode.children[0])


            buttonNode.addEventListener("click", function () {
                myPort.postMessage({ msg: "found-result", url: window.location.href })
            })
            buttonNodeExist = true
        } catch (error) {
            console.log(`Error disini : ${error}`)
        }
    }
}

addLocationObserver(observerCallback)
observerCallback()