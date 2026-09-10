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


## Member profile photos

The Home member carousel uses eight files in `profiles/`. Replace each JPG with the correct real profile photo while keeping the exact filename:

- `owner.jpg`
- `manager.jpg`
- `khalid-f.jpg`
- `amira-hassan.jpg`
- `omar-al-sabah.jpg`
- `layla-ahmed.jpg`
- `daniel-morgan.jpg`
- `mariam-khalil.jpg`

No HTML editing is required when replacing a photo.


## Session persistence
Normal page refreshes keep the saved member session. The token is only cleared after a confirmed authentication failure; transient server/network errors do not erase it. Log out still clears the session.
