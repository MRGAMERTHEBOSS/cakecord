# CakeCord Website

Landing page for a Discord birthday bot, built with React, TypeScript, Vite, and Tailwind CSS.

## Stack

- React + TSX
- Vite
- Tailwind CSS (via `@tailwindcss/vite`)

## Scripts

- `npm run dev` - Start Team API and development server together
- `npm run dev:web` - Start frontend only
- `npm run team-api` - Start Team API only
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

If port `5173` is already in use, the frontend dev server will automatically use the next available port.

## Project Structure

- `src/App.tsx` - Main page composition
- `src/components/SiteHeader.tsx` - Top navigation and action button
- `src/components/HeroSection.tsx` - Hero messaging and bot status cards
- `src/components/FeatureGrid.tsx` - Key bot feature cards
- `src/components/CommandPreview.tsx` - Quick setup command section
- `src/components/FooterCTA.tsx` - Final call-to-action section
- `src/index.css` - Tailwind import and global font/theme setup

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Run locally:

```bash
npm run dev
```

## Team Page API

The Team page fetches live members from `VITE_TEAM_API_URL`.

- Default fallback endpoint: `/api/team`
- Expected response:

```json
[
	{
		"id": "founder",
		"name": "William",
		"role": "Founder",
		"bio": "Builds CakeCord and leads roadmap.",
		"avatarUrl": "https://cdn.discordapp.com/avatars/...png",
		"profileUrl": "https://discord.com/users/..."
	}
]
```

You can also return:

```json
{
	"members": []
}
```

## Discord Bot Avatar Fetch (By Discord ID)

This repo now includes a local Team API server that uses your bot token to fetch Discord avatars by `discordId`.

1. Set backend env vars before running the API server:

```bash
DISCORD_BOT_TOKEN=your_bot_token_here
TEAM_API_PORT=3040
```

2. Run the Team API server:

```bash
npm run team-api
```

3. Set frontend endpoint:

```bash
VITE_TEAM_API_URL=http://localhost:3040/api/team
```

4. Put your team members and Discord IDs in [public/team-members.json](public/team-members.json).

This file is the single source of truth:

- Frontend Team page uses it as fallback when API is unavailable.
- Backend Team API uses it to resolve Discord avatars via bot token.

The API route [server/team-api.mjs](server/team-api.mjs) matches each member by `discordId` (or numeric `id`), fetches the user via Discord API, and returns `avatarUrl` for each profile card.

## Production Deployment Notes

- The production container now runs `server/team-api.mjs`, which serves both the website and `/api/team` on port `3040`.
- Set `DISCORD_BOT_TOKEN` in your deployment environment (or `.env`) so team avatars can be resolved on the live site.
- Rebuild and redeploy after env changes so the runtime picks them up.
