Investment Portal — Member Site (Final)
============================================

This build is aligned with the deployed Cloudflare Worker:
https://investment-portal-api.helpinghandssupportnetwork.workers.dev

Important:
- Upload the contents of this folder to the separate `investment-member` GitHub repository.
- Do NOT put Cloudflare secrets, admin setup keys, or database credentials in this repository.
- The frontend uses the public Worker URL only.
- Member authentication uses username + password.
- Signup collects full name, email, username, optional phone, and password.
- Financial values are read from the backend/D1; this frontend does not fabricate balances.

Backend routes used:
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET /api/me
PATCH /api/profile
POST /api/funding
POST /api/withdrawals
