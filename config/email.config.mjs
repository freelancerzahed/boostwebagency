import fs from "fs"
import path from "path"

const env = process.env

// Base config reads from environment variables (supports uppercase and lowercase)
let config = {
  EMAIL_TEST_MODE: env.EMAIL_TEST_MODE ?? env.email_test_mode ?? null,
  EMAIL_USER: env.EMAIL_USER ?? env.email_user ?? null,
  EMAIL_PASSWORD: env.EMAIL_PASSWORD ?? env.email_password ?? null,
  COMPANY_EMAIL: env.COMPANY_EMAIL ?? env.company_email ?? null,
}

// Try loading a local config file `config/email.local.json` if present.
// This file should NOT be committed and is intended for storing secrets on the server.
const localPath = path.join(process.cwd(), "config", "email.local.json")
if (fs.existsSync(localPath)) {
  try {
    const file = JSON.parse(fs.readFileSync(localPath, "utf8"))
    config = { ...config, ...file }
  } catch (err) {
    // ignore parse errors; prefer environment variables
    console.warn("Could not parse config/email.local.json:", err)
  }
}

export default config
