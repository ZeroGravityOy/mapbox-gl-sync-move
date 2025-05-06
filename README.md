# @zerogravity/mapbox-gl-sync-move

Sync movement between two or more [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js) maps.

## Installation

```
npm i @zerogravity/mapbox-gl-sync-move
```

## Usage

This module exports a function that receives as arguments two or more [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js) maps whose movements you'd like to sync.

```js
import mapboxgl from 'mapbox-gl';
import syncMaps from '@zerogravity/mapbox-gl-sync-move';

const mapA = new mapboxgl.Map(..);
const mapB = new mapboxgl.Map(..);

syncMaps(mapA, mapB);
```

## Testing and Developing

There are unit tests with mocked maps, and there's a page for manual testing.

Run the unit tests with `npm test`.

To manually test, ensure you have a `VITE_MAPBOX_ACCESS_TOKEN` environment variable set in file /example/.env. Then start the server with `npm run dev`.

## Publishing to NPM registery

- Update the version key in [package.json](https://github.com/ZeroGravityOy/mapbox-gl-compare/blob/main/package.json)
- Create and merge a Pull Request
- Open repository in IDE and choose latest main branch
- Run commands: `git tag v1.0.0` and `git push origin v1.0.0`