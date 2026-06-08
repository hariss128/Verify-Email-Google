# Google Email Verification

One-click Google sign-in for email verification. No sign-up form — users authenticate with their existing Google account.

## Folder structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts   # Auth.js API routes
│   ├── verified/page.tsx                   # Post-verification page
│   ├── page.tsx                            # Landing page with Google button
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── GoogleSignInButton.tsx              # Google OAuth button
│   └── SignOutButton.tsx
├── auth.ts                                 # Auth.js config + Google provider
├── auth.config.ts                          # Edge-safe auth config
├── middleware.ts                           # Protect /verified route
└── types/next-auth.d.ts                    # Session type extensions
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → **APIs & Services** → **Credentials**
3. **Create Credentials** → **OAuth client ID** → **Web application**
4. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. Copy Client ID and Client Secret

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Continue with Google**.

## How it works

1. User clicks the Google button on `/`
2. Auth.js redirects to Google's OAuth consent screen
3. Google redirects back to `/api/auth/callback/google`
4. Session is created (JWT, no database needed)
5. User lands on `/verified` with their email confirmed
