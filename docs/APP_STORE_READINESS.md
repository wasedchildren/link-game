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

### 1. Replace placeholder support contact

The support page currently contains a placeholder:

- `public/support.html`

Use `wasedchilden@gmail.com` as the public support contact before submission.

### 2. Upload and host your support and privacy pages

App Store Connect requires reachable public URLs. After deployment, you should have public URLs such as:

- `https://your-domain.com/support.html`
- `https://your-domain.com/privacy-policy.html`

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

### App Store Copy Draft

The initial copy draft is stored in:

- `docs/APP_STORE_COPY.md`
