import { Component, OnInit, AfterViewInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-ar",
  templateUrl: "./ar.page.html",
  styleUrls: ["./ar.page.scss"],
  standalone: false,
})
export class ArPage implements OnInit, AfterViewInit {
  markerType: "preset" | "pattern" = "preset"
  markerValue = "hiro"

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const type = params["type"] as "preset" | "pattern"
      const value = params["value"] as string

      if (type && (type === "preset" || type === "pattern") && value) {
        this.markerType = type
        this.markerValue = value
      }
    })
  }

  ngAfterViewInit() {
    // Wait for A-Frame to initialize
    setTimeout(() => {
      this.forceFullScreenDimensions()
    }, 100)

    // Also check periodically in case A-Frame resets dimensions
    const interval = setInterval(() => {
      this.forceFullScreenDimensions()
    }, 500)

    // Stop checking after 5 seconds
    setTimeout(() => {
      clearInterval(interval)
    }, 5000)
  }

  private forceFullScreenDimensions() {
    // Force canvas elements to full width
    const canvases = document.querySelectorAll("canvas")
    canvases.forEach((canvas: HTMLCanvasElement) => {
      canvas.style.width = "100vw"
      canvas.style.height = "100vh"
      canvas.style.maxWidth = "100vw"
      canvas.style.position = "absolute"
      canvas.style.top = "0"
      canvas.style.left = "0"
      canvas.style.right = "0"
      canvas.style.bottom = "0"
      console.log("[v0] Canvas dimensions set:", canvas.style.width, canvas.style.height)
    })

    // Force video elements to full width
    const videos = document.querySelectorAll("video")
    videos.forEach((video: HTMLVideoElement) => {
      video.style.width = "100vw"
      video.style.height = "100vh"
      video.style.maxWidth = "100vw"
      video.style.position = "absolute"
      video.style.top = "0"
      video.style.left = "0"
      video.style.right = "0"
      video.style.bottom = "0"
      video.style.objectFit = "cover"
      console.log("[v0] Video dimensions set:", video.style.width, video.style.height)
    })

    // Force a-scene to full width
    const aScene = document.querySelector("a-scene")
    if (aScene) {
      ;(aScene as HTMLElement).style.width = "100vw"
      ;(aScene as HTMLElement).style.height = "100vh"
      ;(aScene as HTMLElement).style.maxWidth = "100vw"
      ;(aScene as HTMLElement).style.position = "absolute"
      ;(aScene as HTMLElement).style.top = "0"
      ;(aScene as HTMLElement).style.left = "0"
      console.log("[v0] A-Scene dimensions set")
    }
  }
}

export default ArPage
