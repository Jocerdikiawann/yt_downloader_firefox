let currentUrl
let backgroundPage = browser.extension.getBackgroundPage();

browser.browserAction.onClicked.addListener(() => {
    backgroundPage.getUrl()
});



document.getElementById("yt_view").src = currentUrl


downloadButton = document.getElementById("download")

downloadButton.addEventListener("click", function () {
    downloadVideo(currentUrl)
})

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === "found-url") {
        console.log("Received URL : " + request.url);
    }
});
