//go:build js && wasm

package main

import (
	"fmt"
	"io"
	"os"
	"syscall/js"

	"github.com/kkdai/youtube/v2"
)

func downloadVideo(this js.Value, args []js.Value) interface{} {
	client := youtube.Client{Debug: true}
	fmt.Println(args[0].String())

	video, err := client.GetVideo(args[0].String())

	if err != nil {
		panic(err)
	}

	formats := video.Formats.WithAudioChannels().FindByQuality("medium")
	stream, _, err := client.GetStream(video, formats)

	if err != nil {
		panic(err)
	}

	title := fmt.Sprintf("%v.mp4", video.Title)

	file, err := os.Create(title)

	if err != nil {
		panic(err)
	}

	defer file.Close()

	_, err = io.Copy(file, stream)

	if err != nil {
		panic(err)
	}
	return nil
}

func main() {
	c := make(chan int)
	js.Global().Set("downloadVideo", js.FuncOf(downloadVideo))
	<-c
}
