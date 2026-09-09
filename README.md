# Investment Portal — Member

Premium member interface built on the existing Investment Portal API.

Authentication is intentionally preserved:
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/me
- POST /api/auth/logout
- PATCH /api/profile
- POST /api/auth/change-password
- POST /api/funding
- POST /api/withdrawals

Member UI:
- Home, Deposit, Send Money, Withdraw, Settings
- Arabic/English
- Light/dark theme
- Profile photo on this device
- Email/name/password settings
- Responsive mobile navigation
- Jivo live chat
- No fabricated account or transaction data

Note: the current Worker has no genuine member-to-member transfer endpoint, so Send Money does not pretend to move funds.
