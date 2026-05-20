# App Store Submission Steps

This guide is the shortest path from the current repo to a real App Store submission.

## 1. Publish your support and privacy pages

Before submitting the app, make sure these two URLs are publicly reachable over `https`:

- `Support URL`
- `Privacy Policy URL`

If you keep the current Pages custom domain setup, the likely URLs are:

- `https://www.wasedchildren.top/link-game/support.html`
- `https://www.wasedchildren.top/link-game/privacy-policy.html`

If you publish under a subpath instead, update the URLs accordingly before filling App Store Connect.

## 2. Final Xcode project checks

Open:

- `ios/App/App.xcworkspace`

Then confirm:

- Team is correct
- Bundle Identifier is correct
- Version is `1.0`
- Build is `1` or the next unused build number
- App icon is the latest one
- Signing shows no red warnings

## 3. Build a release archive

In Xcode:

1. Choose `Any iOS Device (arm64)` or a real device target.
2. Click `Product -> Archive`.
3. Wait for Organizer to open.

If Archive fails, fix that before touching App Store Connect again.

## 4. Upload to App Store Connect

Inside Organizer:

1. Select the latest archive.
2. Click `Distribute App`.
3. Choose `App Store Connect`.
4. Choose `Upload`.
5. Keep the default validation options unless Xcode flags a real issue.
6. Complete the upload.

## 5. Fill App Store Connect metadata

In App Store Connect, complete:

- App name
- Subtitle
- Description
- Keywords
- Promotional text
- Support URL
- Privacy Policy URL
- Category
- Age rating
- App privacy questionnaire
- Screenshots

Use the draft copy from:

- `docs/APP_STORE_COPY.md`

## 6. Create a TestFlight build

After the upload finishes processing:

1. Open the app in App Store Connect.
2. Go to `TestFlight`.
3. Select the uploaded build.
4. Add internal testers first.

This lets you verify:

- English and Simplified Chinese UI
- Music toggle behavior
- Icon and launch experience
- Support/privacy links
- Real-device gameplay stability

## 7. Submit for review

When TestFlight looks good:

1. Go to the app's submission page in App Store Connect.
2. Attach the processed build.
3. Re-check the privacy answers.
4. Complete missing compliance prompts if Apple shows any.
5. Click `Submit for Review`.

## 8. Typical review timing

Once the app itself is submitted:

- many apps are reviewed within `24 to 48 hours`
- first releases can take longer
- metadata issues, broken links, or privacy mismatches often slow review down

## Recommended order for this repo

1. Push the current code and publish the Pages site.
2. Confirm the two public URLs open correctly.
3. Archive and upload from Xcode.
4. Test in TestFlight.
5. Submit for review.
