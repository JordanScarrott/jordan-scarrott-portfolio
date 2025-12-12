## 2024-05-23 - Content Security Policy (CSP) for Static Site
**Vulnerability:** Missing Content Security Policy (CSP) headers or meta tags in a static React application.
**Learning:** Even static sites (SPA) are vulnerable to XSS if an attacker can inject scripts (e.g. via compromised dependencies or other vectors). CSP acts as a defense-in-depth layer to restrict where scripts, styles, and other resources can be loaded from.
**Prevention:** Add a `<meta http-equiv="Content-Security-Policy" ...>` tag to `index.html` with strict rules (e.g. `script-src 'self'`). For development, looser rules (like `'unsafe-inline'`) might be needed for hot reloading, but production should be strict.
