import { Injectable } from "@angular/core"
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  user,
  UserCredential,
} from "@angular/fire/auth"
import type { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user$: Observable<User | null>

  constructor(private auth: Auth) {
    this.user$ = user(this.auth)
  }

  async register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async logout(): Promise<void> {
    return signOut(this.auth)
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser
  }

  async getIdToken(): Promise<string | null> {
    const user = this.getCurrentUser()
    if (user) {
      return user.getIdToken()
    }
    return null
  }
}
