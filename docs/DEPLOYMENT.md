# Deployment Guide — push to main → auto-deploy to your server

This repo ships with `.github/workflows/deploy.yml`:

- **Build job** (always runs on push to `main`): `npm ci` → `npm run build` →
  stores `dist/` as an artifact. Even before you set up the server, every push
  is CI-checked for type/build errors.
- **Deploy job** (dormant until enabled): rsyncs `dist/` to your server over
  SSH. It only runs when the repo variable `DEPLOY_ENABLED` is `true`.

## One-time setup (~10 minutes)

### 1. Prepare the server

Pick the directory your web server will serve, e.g. `/var/www/jimmywu.hk`.
Make sure the deploy user can write to it.

The site is a plain static build in `dist/`. Because it uses client-side
routing (`/projects/aerorelief` etc.), your web server needs an SPA fallback:

**nginx**

```nginx
server {
    listen 80;
    server_name jimmywu.hk www.jimmywu.hk;
    root /var/www/jimmywu.hk;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;   # SPA fallback
    }
}
```

**Apache (`.htaccess` in the deploy root)**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 2. Create a deploy SSH key

On your Mac:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/jimmywu-site-deploy -N ""
```

Copy the **public** key onto the server:

```bash
ssh-copy-id -i ~/.ssh/jimmywu-site-deploy.pub user@your-server
```

### 3. Add secrets & variables to the GitHub repo

Repo → **Settings → Secrets and variables → Actions**:

Secrets (New repository secret):

| Name | Value |
|---|---|
| `SSH_HOST` | your server IP / hostname |
| `SSH_USER` | deploy user, e.g. `ubuntu` |
| `SSH_KEY` | contents of `~/.ssh/jimmywu-site-deploy` (the **private** key) |
| `DEPLOY_PATH` | e.g. `/var/www/jimmywu.hk` |
| `SSH_PORT` | (optional, default 22) |

Variables (Variables tab):

| Name | Value |
|---|---|
| `DEPLOY_ENABLED` | `true` |

### 4. Done

Every `git push` to `main` now builds and rsyncs `dist/` to your server
(`--delete` keeps it in sync). You can also trigger a deploy manually:
Actions → Build & Deploy → Run workflow.

## Notes

- Keep `DEPLOY_ENABLED` unset/false while experimenting — pushes then only
  run the build check, nothing touches the server.
- `/admin` edits live in the browser, not in the repo. To make content
  changes permanent, commit them to `src/content/` (see docs/MAINTENANCE.md).
- If you ever want a zero-server option, the same `dist/` works on Vercel,
  Netlify, Cloudflare Pages or GitHub Pages (use HashRouter or their SPA
  redirect for GitHub Pages).
