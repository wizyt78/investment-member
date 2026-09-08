# Investment Portal — Member Website

Production-oriented bilingual static frontend for the separate Investment Portal.

- Arabic is the default language.
- English switches the complete interface to English and LTR.
- Authentication and data are supplied by Supabase.
- No financial balances, earnings, investments or transactions are fabricated in the frontend.
- Never place a Supabase service-role key in this repository.

## One-time setup
1. Open `config.js`.
2. Keep the supplied Supabase URL and replace only `PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE` with the project's public publishable/anon key.
3. Deploy the Supabase SQL migrations supplied in the backend package. The first schema has already been run in the current project; do not run it again unless you intentionally reset the database.
4. Enable GitHub Pages for this repository.

## Repository
Use only the separate `investment-member` repository. Do not put this code in the Kuwait-News repository.
