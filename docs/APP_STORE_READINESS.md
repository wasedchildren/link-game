# App Store Readiness Checklist

This checklist reflects the current state of the repository on May 15, 2026.

## Already in Place

- React + Vite game shell is building successfully.
- Capacitor iOS wrapper is already wired into the project.
- App icon assets have been updated.
- English and Simplified Chinese translations are present in the app UI.
- iOS display name localization is present through `InfoPlist.strings`.
- Static support and privacy policy pages now exist in `public/`.

## Still Recommended Before Submission

### 1. Upload and host your support and privacy pages

App Store Connect requires reachable public URLs. After deployment, you should have public URLs such as:

- `https://wasedchildren.top/link-game/support.html`
- `https://wasedchildren.top/link-game/privacy-policy.html`
- `https://www.children.top/support.html`
- `https://www.children.top/privacy-policy.html`

The current support page already uses the public support email:

- `wasedchilden@gmail.com`

### 2. Confirm your final public domain choice

This repo now supports GitHub Pages style deployment and includes a `public/CNAME` file for a custom domain.

- Keep `public/CNAME` as `www.children.top` if that is the domain you want GitHub Pages to serve directly.
- Remove or replace that file if you decide the public URLs should live under another domain such as `wasedchildren.top`.

### 3. Prepare App Store screenshots

Recommended first batch:

- Main menu
- Level select
- In-game board
- Result screen
- Music toggle / bilingual UI

### 4. Confirm App Store privacy answers

Based on the current codebase, the app appears to:

- use local on-device save data only
- avoid account creation
- avoid analytics SDKs
- avoid ad SDKs
- avoid third-party tracking

Re-check these answers before submission if you add:

- analytics
- ads
- push notifications
- in-app purchases
- cloud save
- sign-in

### 5. Review unfinished local changes

Before creating the submission build, review current working tree changes and make sure only intended app changes are included.

### 6. Final Xcode checks

Before uploading:

- verify signing
- verify bundle identifier
- verify version and build number
- archive a Release build
- install the archived build through TestFlight or Organizer validation

## Notes on This Repo

### Support URL

You now have a support page in:

- `public/support.html`

### Privacy Policy URL

You now have a privacy page in:

- `public/privacy-policy.html`

### Custom Domain

The Pages custom domain file is now stored in:

- `public/CNAME`

### App Store Copy Draft

The initial copy draft is stored in:

- `docs/APP_STORE_COPY.md`
