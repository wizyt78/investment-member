# Investment Portal — Member

Premium member frontend for the Investment Portal.

Authentication and account data remain server-backed through the configured Cloudflare Worker in `config.js`.

Included:
- Working username/password signup and sign-in flow
- Premium responsive member dashboard
- Home, Deposit, Send Money, Withdraw, Settings navigation
- Light/dark theme preference
- Arabic default with complete English/Arabic UI strings
- Profile photo upload compressed to fit the current avatar field limit
- Profile email/name editing
- Password change using the existing server endpoint and refreshed session
- Funding and withdrawal request forms
- JivoSite live chat integration
- Replaceable `logo.svg`

Important: the current API does not expose a server-side send-money endpoint, so the Member UI does not fabricate or record transfers. The Send Money page clearly reports that limitation until the API is extended.
