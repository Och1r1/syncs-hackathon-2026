# Games Across Time — Hackathon Website Draft

A visual-first static prototype based on the historical-artefact homepage direction.

## Run it

Simplest: open `index.html` in Chrome.

Recommended local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## What already works

- Interactive map hotspots for Vietnam, Japan and Ghana
- Clickable game cards synced with the selected-country exhibit
- Dynamic text and preview imagery
- Three-step "how it is played" interaction
- Video-preview placeholder interaction
- Project explainer modal
- "Explore the artefact" 3D exhibit modal with a fake drag-to-rotate interaction
- Responsive layout

## Best hackathon upgrades

1. Replace the preview placeholders with your actual short videos.
2. Export Tripo AI objects as `.glb` and use `<model-viewer>` or Three.js in the artefact modal.
3. Generate a separate historical game object image for each game before sending it to Tripo.
4. Add a 5–10 second animated transition when moving from the map into the 3D artefact view.
5. Keep only 3 polished countries rather than adding many unfinished ones.

## Project structure

- `index.html` — page markup
- `styles.css` — complete visual design
- `script.js` — prototype interactions/data
- `assets/` — AI-generated visual crops used as temporary assets

The AI-generated assets are placeholders based on the approved visual concept and can be replaced individually without restructuring the page.
