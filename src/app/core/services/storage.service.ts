import { Injectable } from "@angular/core"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { environment } from "../../../environments/environment.example"
import { AuthService } from "./auth.service"

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private supabase: SupabaseClient

  constructor(private authService: AuthService) {
    this.supabase = createClient(environment.supabase.url, environment.supabase.key)
  }

  async uploadImage(file: File, trackerId: string): Promise<string> {
    const user = this.authService.getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    const token = await this.authService.getIdToken()
    if (!token) {
      throw new Error("Could not get auth token")
    }

    // Set custom headers with Firebase JWT
    this.supabase = createClient(environment.supabase.url, environment.supabase.key, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const fileExt = file.name.split(".").pop()
    const fileName = `${user.uid}/${trackerId}_${Date.now()}.${fileExt}`

    const { data, error } = await this.supabase.storage.from(environment.supabase.bucket).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      throw error
    }

    return fileName
  }

  async getPublicUrl(path: string): Promise<string> {
    const { data } = this.supabase.storage.from(environment.supabase.bucket).getPublicUrl(path)

    return data.publicUrl
  }

  async deleteImage(path: string): Promise<void> {
    const token = await this.authService.getIdToken()
    if (!token) {
      throw new Error("Could not get auth token")
    }

    this.supabase = createClient(environment.supabase.url, environment.supabase.key, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const { error } = await this.supabase.storage.from(environment.supabase.bucket).remove([path])

    if (error) {
      throw error
    }
  }
}
