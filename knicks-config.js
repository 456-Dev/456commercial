/* ============================================================
   THE CRAZIEST KNICKS VIDEOS — config (used by /knicks/)
   ------------------------------------------------------------
   Media storage = Cloudinary (already set up, shared account).
   Uploads are tagged "knicks" so they stay separate from the
   Big Body Brunson gallery ("approved").

   Votes = a free, no-account shared counter (abacus). Each clip's
   vote tally lives at  voteBase/get/<voteNamespace>/<public_id>.
   Nothing to set up — it just works. If you ever want sturdier,
   account-backed voting, this is the one spot to swap.
   ============================================================ */
window.KNICKS = {
  cloudName:     "dhya7wsfy",      // Cloudinary cloud (shared)
  uploadPreset:  "msg_uploads",    // unsigned preset (shared)
  tag:           "knicks",         // contest entries use this tag
  voteNamespace: "knx456crazy",    // counter namespace for this contest
  voteBase:      "https://abacus.jasoncameron.dev"
};
