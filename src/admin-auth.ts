/**
 * Admin gate.
 *
 * The /admin route is NOT linked anywhere on the site, and this module gates
 * it with a password. The password is stored as a SHA-256 hash — set your own:
 *
 *   1. Choose a password, e.g. "my-secret"
 *   2. Hash it:  echo -n "my-secret" | shasum -a 256
 *   3. Paste the hex digest into ADMIN_HASH below
 *
 * Honest note: this is a static site, so the gate lives in client-side code —
 * it keeps the editing UI out of reach of casual visitors, but a determined
 * person reading the JS bundle could bypass it. That's acceptable here because
 * Admin edits only ever touch the visitor's OWN browser localStorage; the real
 * content is the code in src/content/. If you later deploy publicly and want
 * hard security, put /admin behind server-side auth (or basic auth on the host).
 */

// SHA-256 of the admin password. Default below is "aerorelief-admin" — change it.
const ADMIN_HASH = 'f64a1476a6f8e22aadb54cf37270641ca6a57a02b8d4cab0ba2fc9a041628ca3'
const SESSION_KEY = 'jw-admin-auth'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function checkAdminPassword(input: string): Promise<boolean> {
  return (await sha256(input)) === ADMIN_HASH
}

export function isAdminAuthed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1'
}

export function setAdminAuthed(v: boolean) {
  if (v) sessionStorage.setItem(SESSION_KEY, '1')
  else sessionStorage.removeItem(SESSION_KEY)
}
