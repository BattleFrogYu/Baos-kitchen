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
  url: 'https://battlefrogyu.github.io/Baos-kitchen/',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttam5rZ3JieWZ4a2Z0eXB4bWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MTc2ODYsImV4cCI6MjA5OTk5MzY4Nn0.cJFSlYU0KJF5YnEhujrPOs_SmFyEayv0vbOEa-zcbec',
};
