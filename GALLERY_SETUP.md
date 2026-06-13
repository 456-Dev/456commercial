# Gallery setup — switch the photo wall on (~5 minutes)

The site is built. The only thing left is connecting **Cloudinary** (free) so uploads
are stored and shown in the gallery. You'll paste **two values** into
`gallery-config.js` and you're done.

Mode is **instant publish**: photos appear in the gallery the moment they're uploaded.

---

## Step 1 — Make a free Cloudinary account
1. Go to **https://cloudinary.com** → **Sign up for free** (Google sign-in is fastest).
2. If it asks what you're doing, pick **Programmable Media / Image and video**.

## Step 2 — Copy your Cloud name
1. On the **Dashboard** (home), near the top you'll see **Cloud name: `something`**.
2. Copy that value. (You'll paste it as `cloudName`.)

## Step 3 — Create an UNSIGNED upload preset
1. Click the **⚙ Settings** (gear, top right) → **Upload** tab.
2. Scroll to **Upload presets** → **Add upload preset**.
3. Set **Signing Mode → Unsigned**. (This is what lets phones upload without a password.)
4. *(Optional)* set **Folder** to `msg` so the photos stay organized.
5. **Save**, then copy the preset's **Name** (e.g. `msg_uploads`). (You'll paste it as `uploadPreset`.)

## Step 4 — Let the gallery read the photo list
1. **⚙ Settings → Security** tab.
2. Find **Resource list** (under restricted media types) and make sure it's
   **allowed / enabled** (not restricted). The gallery uses this to list photos.

## Step 5 — Paste the two values
Open **`gallery-config.js`** and fill in:
```js
cloudName:    "your-cloud-name",
uploadPreset: "your-preset-name",
```
Leave `moderated: false` (instant mode, your choice).

## Step 6 — Go live
Commit + push to `main` (or ask Claude to). GitHub Pages updates in ~1 minute.

## Test it
Open the site → upload a photo → open the **Gallery**. It should appear within a few seconds.

---

## Safety kill-switches (instant + public = keep these handy)
- **Delete a bad photo:** Cloudinary → **Media Library** → select it → **Delete**.
  It disappears from the gallery on the next load.
- **Stop ALL uploads instantly:** Settings → Upload → your preset → turn it **off**
  (or switch it to **Signed**). No one can upload until you turn it back on.
- **Re-gate everything (approve-first):** set `moderated: true` in `gallery-config.js`
  and push. Now uploads are hidden until you add the **`approved`** tag to a photo
  in the Media Library.

## Heads-up on abuse
Because uploads are unsigned + instant + public, anyone who finds the link could
upload junk, and it would appear immediately. The kill-switches above are your
defense. If a stunt account starts spamming, flip `moderated: true` and push — that
turns it back into an approve-first queue in one line.
