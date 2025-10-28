// service/tokenService.js — versão estável final
import { decode as atob } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = ["userToken", "userEmail", "userRole", "userId"];

async function debugDump(label) {
  try {
    const entries = await Promise.all(KEYS.map(async k => [k, await AsyncStorage.getItem(k)]));
    console.log(`📦 [tokenService] ${label}`, Object.fromEntries(entries));
  } catch {}
}

class TokenService {
  async getToken() {
    return AsyncStorage.getItem("userToken");
  }

  decodeToken(token) {
    try {
      if (!token || !token.includes(".")) return null;
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }

  async isTokenExpired(token) {
    try {
      const t = token || (await this.getToken());
      if (!t) return true;
      const payload = this.decodeToken(t);
      if (!payload?.exp) return true;
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  }

  async getUserData() {
    const [id, email, role] = await Promise.all([
      AsyncStorage.getItem("userId"),
      AsyncStorage.getItem("userEmail"),
      AsyncStorage.getItem("userRole"),
    ]);
    return { id, email, role };
  }

  async setAuthData(token, extra = {}) {
    console.group("💾 tokenService.setAuthData");
    try {
      const payload = this.decodeToken(token) || {};
      await AsyncStorage.multiSet([
        ["userToken", token],
        ["userEmail", payload.email || extra.email || ""],
        ["userRole", payload.cargo || extra.role || ""],
        ["userId", (payload.id ?? extra.id ?? "").toString()],
      ]);
      await debugDump("após setAuthData");
    } finally {
      console.groupEnd();
    }
  }

  async clearAuthData() {
    console.group("🧹 tokenService.clearAuthData");
    try {
      await debugDump("antes clear");
      await AsyncStorage.multiRemove(KEYS);
      if (typeof localStorage !== "undefined") {
        KEYS.forEach((k) => localStorage.removeItem(k));
      }
      await debugDump("depois clear");
    } finally {
      console.groupEnd();
    }
  }
}

export default new TokenService();
