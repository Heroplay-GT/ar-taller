import { Injectable } from "@angular/core"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { environment } from "../../../environments/environment"
import { AuthService } from "./auth.service"

export interface ARTarget {
  id?: string
  tracker_id: string
  image_path: string
  description?: string
  firebase_uid: string
  created_at?: string
}

@Injectable({
  providedIn: "root",
})
export class ArTargetService {
  private supabase: SupabaseClient

  constructor(private authService: AuthService) {
    this.supabase = createClient(environment.supabase.url, environment.supabase.key)
  }

  private async getAuthenticatedClient(): Promise<SupabaseClient> {
    const token = await this.authService.getIdToken()
    if (!token) {
      throw new Error("User not authenticated")
    }

    return createClient(environment.supabase.url, environment.supabase.key, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }

  async createTarget(target: ARTarget): Promise<ARTarget> {
    const client = await this.getAuthenticatedClient()

    const { data, error } = await client.from("ar_targets").insert([target]).select().single()

    if (error) {
      throw error
    }

    return data
  }

  async getUserTargets(): Promise<ARTarget[]> {
    const user = this.authService.getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    const client = await this.getAuthenticatedClient()

    const { data, error } = await client
      .from("ar_targets")
      .select("*")
      .eq("firebase_uid", user.uid)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data || []
  }

  async getTargetByTrackerId(trackerId: string): Promise<ARTarget | null> {
    const user = this.authService.getCurrentUser()
    if (!user) {
      throw new Error("User not authenticated")
    }

    const client = await this.getAuthenticatedClient()

    const { data, error } = await client
      .from("ar_targets")
      .select("*")
      .eq("firebase_uid", user.uid)
      .eq("tracker_id", trackerId)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned"
      throw error
    }

    return data
  }

  async updateTarget(id: string, updates: Partial<ARTarget>): Promise<ARTarget> {
    const client = await this.getAuthenticatedClient()

    const { data, error } = await client.from("ar_targets").update(updates).eq("id", id).select().single()

    if (error) {
      throw error
    }

    return data
  }

  async deleteTarget(id: string): Promise<void> {
    const client = await this.getAuthenticatedClient()

    const { error } = await client.from("ar_targets").delete().eq("id", id)

    if (error) {
      throw error
    }
  }
}
