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

      console.log("[AR] markerType:", this.markerType, "markerValue:", this.markerValue)
    })
  }

  ngAfterViewInit() {
    // Solo ajustamos el a-scene, NO tocamos canvas ni video
    setTimeout(() => {
      this.forceFullScreenDimensions()
    }, 200)
  }

  private forceFullScreenDimensions() {
    const aScene = document.querySelector("a-scene")
    if (aScene) {
      const el = aScene as HTMLElement
      el.style.width = "100vw"
      el.style.height = "100vh"
      el.style.position = "absolute"
      el.style.top = "0"
      el.style.left = "0"
      el.style.maxWidth = "100vw"
      console.log("[AR] A-Scene dimensions set")
    }
  }
}

export default ArPage
