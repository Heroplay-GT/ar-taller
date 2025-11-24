import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AlertController, LoadingController } from "@ionic/angular"
import { AuthService } from "../../core/services/auth.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage{


  ngOnInit() {
  }

  email = ""
  password = ""
  loading = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      await this.showAlert("Error", "Por favor completa todos los campos")
      return
    }

    this.loading = true
    const loader = await this.loadingController.create({
      message: "Iniciando sesión...",
    })
    await loader.present()

    try {
      await this.authService.login(this.email, this.password)
      await loader.dismiss()
      this.router.navigate(["/home"])
    } catch (error: any) {
      await loader.dismiss()
      this.loading = false
      let message = "Error al iniciar sesión"

      if (error.code === "auth/user-not-found") {
        message = "Usuario no encontrado"
      } else if (error.code === "auth/wrong-password") {
        message = "Contraseña incorrecta"
      } else if (error.code === "auth/invalid-email") {
        message = "Correo electrónico inválido"
      }

      await this.showAlert("Error", message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ["OK"],
    })
    await alert.present()
  }

}
