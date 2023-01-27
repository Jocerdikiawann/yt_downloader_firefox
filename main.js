var downloadButton = document.createElement("button")
downloadButton.innerHTML = "Download"
downloadButton.style.marginTop = "10px"
downloadButton.style.backgroundColor = "#4CAF50";
downloadButton.style.color = "white"
downloadButton.style.border = "none"
downloadButton.style.textDecoration = "none";

var player = document.getElementById("player")
player.appendChild(downloadButton)

downloadButton.addEventListener("click", function () {
    downloadVideo(window.location.href)
})