A dashboard for HomeAssistant, written for a very specific purpose, but adaptable to your needs c:

In its current state it shows:

- The time and date in a header
- A series of gauges that can display any numeric entity state value from home assistant
- A media control component
- A funky webgl background that automatically changes color with the album art from currently playing media

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Config

The app expects a file named `.env.local.ts` to be present in the root directory, with the following structure:

```typescript
export const url = ""; // string, url of your homeassistant instance

export const token = ""; // string, long-lived access token for your homeassistant instance

export const config = {
  default_colors: [], // number[], list of colors to use in the background by default, in the format 0xhexcode, e.g. 0x000000 for black
  gauges: [
    // gauge[], list of gauge configs
    {
      entity: "", // string, homeassistant entity name
      icon: "", // string, icon matching an icon in the iconMap variable in page.tsx
      minValue: 0, // number, minimum value of the gauge
      maxValue: 100, // number, maximum value of the gauge
      // any other props accepted by [react-circular-gauge](https://github.com/arcturus3/react-circular-gauge) will be passed through
    },
  ],
  media_players: [], // string[], list of entity ids of media players in homeassistant
};
```
