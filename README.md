# Project Signal

An AI-powered content curator for AI Engineers.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Copy `.env.local` and fill in your keys:
    *   `OPENAI_API_KEY`: For Hype Filtering.
    *   `YOUTUBE_API_KEY`: For fetching videos.
    *   `RESEND_API_KEY`: For sending emails.
    *   `CRON_SECRET`: A random string to secure the cron endpoint.

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Architecture

*   **Curator Engine:** `src/lib/curator.ts` - Orchestrates fetching and filtering.
*   **Hype Filter:** `src/lib/openai.ts` - Uses GPT-4o-mini to score videos.
*   **Cron Job:** `src/app/api/cron/send-digest/route.ts` - Triggered daily to send emails.

## Testing the Cron
You can manually trigger the email by visiting:
`http://localhost:3000/api/cron/send-digest`
(Make sure to set the `Authorization: Bearer <CRON_SECRET>` header)
