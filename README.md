# Login Form SPA

![Demo Screenshot](/public/screenshot.png)

A responsive email/password sign‑in SPA with accessibility, validation, and mocked API.

## Features

-   **Comprehensive Form UX**

    -   Proper labels and focus states
    -   Accessible errors with `aria-describedby` and `aria-errormessage`
    -   Password visibility toggle with `aria-pressed`

-   **Advanced Validation**

    -   Email format validation
    -   Password length rules
    -   Realtime validation on blur/change

-   **Client-Side Behaviors**

    -   Loading state and disabled submit
    -   Keyboard and screen reader support
    -   Confetti feedback on success

-   **API Integration (mocked)**
    -   `fetch()` mocked with success/error paths
    -   Graceful error handling
    -   Type-safe request/response shapes

## Technical Implementation

### Key Decisions

1. **Frontend Architecture**

    - Next.js App Router
    - TypeScript throughout
    - TailwindCSS utilities for styling

2. **Auth Handling**

    - Mocked `fetch()` for email/password
    - No external services required
    - GitHub Pages–compatible static export


## Setup Instructions

1. Clone repository:

    ```bash
    git clone https://github.com/ellacmd/login-form.git
    cd login-form
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Environment variables:

    This project does not require environment variables.

4. Run development server

    ```bash
    npm run dev
    # open http://localhost:3000
    ```



## SPA Login Form (Email/Password) — Next.js, No UI library, GH Pages

Single-page app with an accessible email/password login form.

-   **No UI library**: pure CSS/Tailwind utility classes already in the repo
-   **Accessible fields**: labels associated with inputs, error states with `aria` attributes
-   **Mocked authentication**: `fetch()` is mocked; no real backend required
-   **Static export**: built as a static site and deployed to **GitHub Pages**

### Live demo and sources

-   Interface: add your GitHub Pages URL here after first deployment
-   Sources: this repository

### Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

### Credentials (mock)

-   Email: `demo@example.com`
-   Password: `password`

### How auth works (mocked)

The form uses a local `mockFetch` that resolves after 1s. If the credentials match the demo pair above, it returns 200; otherwise 401. See `app/components/login-form.tsx`.

### Build (static export)

```bash
npm run build
# output in ./out for GitHub Pages
```

### Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/gh-pages.yml` that:

-   Builds the site with `NEXT_PUBLIC_BASE_PATH=/<repo>` for correct asset paths
-   Uploads the static `out/` artifact
-   Publishes to GitHub Pages

Steps:

1. Push to `main`
2. In GitHub: Settings → Pages → Build and deployment → Source: GitHub Actions
3. Wait for the workflow to complete; copy the Pages URL and add it above under “Live demo”

If your repository name is, for example, `login-form`, the final URL will be:
`https://<your-username>.github.io/login-form/`

### Notes on accessibility

-   Inputs expose `name`, `required`, `autoComplete`, `inputMode`
-   Errors are tied via `aria-describedby` and `aria-errormessage`
-   Password toggle button has `aria-pressed`, labelled action, and icons are `aria-hidden`
