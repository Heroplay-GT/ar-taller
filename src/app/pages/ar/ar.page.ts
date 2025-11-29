import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-ar",
  templateUrl: "./ar.page.html",
  styleUrls: ["./ar.page.scss"],
  standalone: false,
})
export class ArPage implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log("AR Page initialized - Multi-marker detection active")
    console.log("Detecting: Hiro, Kanji, Letter markers, and NVIDIA markers simultaneously")
  }
}

export default ArPage
