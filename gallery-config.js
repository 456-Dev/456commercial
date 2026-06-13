/* ============================================================
   MSG PHOTO GALLERY — shared config (index.html + gallery.html)
   ------------------------------------------------------------
   Fill in cloudName + uploadPreset to switch the gallery on.
   Full click-by-click steps are in GALLERY_SETUP.md.

   Quick version (Cloudinary, free, ~5 min):
   1. Sign up at https://cloudinary.com
   2. Dashboard → copy "Cloud name" → paste as cloudName below.
   3. Settings ⚙ → Upload → Add upload preset → Signing Mode:
      UNSIGNED → Save → copy its Name → paste as uploadPreset below.
   4. Settings ⚙ → Security → allow "Resource list"
      (lets the gallery read the photo list).

   MODE: INSTANT publish (your choice). Uploads appear in the
   gallery right away — no approval step.
     • To re-gate it (approve-first) if it gets abused: set
       moderated:true and re-push. Then nothing shows until you
       add the "approved" tag to a photo in Cloudinary.
     • Kill switches: delete a bad photo in Cloudinary's Media
       Library (gone from the gallery on next load); or turn the
       upload preset off to stop all uploads instantly.
   ============================================================ */
window.MSG_GALLERY = {
  cloudName:    "dhya7wsfy", // Cloudinary cloud name ✓
  uploadPreset: "",          // <-- still need the unsigned upload preset name
  pendingTag:   "pending",   // (only used if moderated:true)
  galleryTag:   "approved",  // gallery shows photos with this tag
  moderated:    false        // false = instant publish (current). true = approve-first.
};
