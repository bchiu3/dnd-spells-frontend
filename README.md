# dnd-spells-frontend
 Frontend for the dnd-spells I'm making

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

## Env variables needed

* NEXT_PUBLIC_DND_SPELLS_URL
  * url to the backend
* NEXT_PUBLIC_DND_BUCKET_NAME
  * bucket name for s3 bucket if you have one
* NEXT_PUBLIC_DND_CREDITS
  * any credits you want to give for images and the like
  
## Files needed
* public/header-logo.png
  * header file of the page
* public/placeholder.png
  * placeholder for images if they do not appear
* public/range-type.png
  * range icon for aesthetic
* public/spell-range.png
  * spell icon for aesthetic

Check public/manifest for list of icons and screenshots for a web app

The ones below are for types of schools, cast type, etc
* public/spell_icons/abjuration.png
* public/spell_icons/action.png
* public/spell_icons/bonus.png
* public/spell_icons/concentration.png
* public/spell_icons/conjuration.png
* public/spell_icons/divination.png
* public/spell_icons/enchantment.png
* public/spell_icons/evocation.png
* public/spell_icons/illusion.png
* public/spell_icons/time.png
* public/spell_icons/transmutation.png
* public/spell_icons/unknown.png
* public/spell_icons/upcast.png
* public/spell_icons/ritual.png
* public/spell_icons/reaction.png
* public/spell_icons/necromancy.png

## Deploy on Vercel

Deploy using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).