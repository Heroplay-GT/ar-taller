import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AlertController, LoadingController } from "@ionic/angular"
import { AuthService } from "../../core/services/auth.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage{
  email = ""
  password = ""
  confirmPassword = ""
  loading = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) {}

  async onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      await this.showAlert("Error", "Por favor completa todos los campos")
      return
    }

    if (this.password !== this.confirmPassword) {
      await this.showAlert("Error", "Las contraseñas no coinciden")
      return
    }

    if (this.password.length < 6) {
      await this.showAlert("Error", "La contraseña debe tener al menos 6 caracteres")
      return
    }

    this.loading = true
    const loader = await this.loadingController.create({
      message: "Creando cuenta...",
    })
    await loader.present()

    try {
      await this.authService.register(this.email, this.password)
      await loader.dismiss()
      await this.showAlert("Éxito", "Cuenta creada exitosamente")
      this.router.navigate(["/home"])
    } catch (error: any) {
      await loader.dismiss()
      this.loading = false
      let message = "Error al crear la cuenta"

      if (error.code === "auth/email-already-in-use") {
        message = "Este correo ya está registrado"
      } else if (error.code === "auth/invalid-email") {
        message = "Correo electrónico inválido"
      } else if (error.code === "auth/weak-password") {
        message = "La contraseña es muy débil"
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
