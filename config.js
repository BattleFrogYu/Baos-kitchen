// ─────────────────────────────────────────────────────────────────────────
//  Cloud sync settings
//
//  Leave these blank and the app runs entirely on this device — exactly as
//  it does today. Fill them in and both phones share one live menu.
//
//  Get both values from your Supabase project:
//      Dashboard → Settings → API
//
//  Paste the "Project URL" and the "anon / public" key. Both are meant to be
//  visible in browser code, so it is fine that they end up on GitHub.
//
//  ⚠ Never paste the "service_role" key here. That one is a secret and would
//    give anyone who found it full control of your database.
// ─────────────────────────────────────────────────────────────────────────
window.NIUS_CONFIG = {
  url: '',
  anonKey: '',
};
