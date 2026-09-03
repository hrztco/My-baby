# ♡ Monthsary Scrapbook — VS Code Project

This project recreates the overall sequence and visual style of the reference video:
1. Dark cinematic intro with "POV: It's your monthsary"
2. Bouquet / card reveal
3. Letter with typewriter animation
4. Animated scrapbook / Polaroid photo wall
5. Final film-strip style memory
6. Optional background music

## Folder structure

monthsary_scrapbook/
│
├── index.html
├── style.css
├── script.js
│
└── assets/
    ├── photos/
    │   ├── photo-01.jpg
    │   ├── photo-02.jpg
    │   ├── photo-03.jpg
    │   ├── photo-04.jpg
    │   ├── photo-05.jpg
    │   ├── photo-06.jpg
    │   ├── photo-07.jpg
    │   └── photo-08.jpg
    │
    └── music/
        └── background.mp3

## How to use in VS Code

1. Extract the ZIP.
2. Open the extracted `monthsary_scrapbook` folder in VS Code.
3. Put your own photos inside:
   `assets/photos/`
4. Rename your photos to the filenames used in `script.js`, OR edit the filenames in `CONFIG.photos`.
5. Put your background song here:
   `assets/music/background.mp3`
6. Open `index.html` using the VS Code Live Server extension.
   - Right-click `index.html`
   - Choose "Open with Live Server"
7. Click the first screen. The music will attempt to start after your interaction.

## IMPORTANT: customize everything from script.js

At the top of `script.js`, edit:

- `letter` = your personal message
- `finalCaption` = final message
- `photos` = your photos, captions, positions, and rotations
- `finalPhoto` = image shown in the final film frame
- `photoStagger` = delay between each photo appearing
- `typewriterSpeed` = letter typing speed
- `transitionSpeed` = scene transition speed

Example:

{
  file: "my-photo.jpg",
  caption: "our first date",
  x: 31,
  y: 2,
  r: 5
}

`x` controls left/right position.
`y` controls up/down position.
`r` controls rotation in degrees.

## If you want more photos

Copy another photo object into the `photos` array.

The layout automatically creates the Polaroid and animates it.

## If music does not play

This is usually browser autoplay protection.

Do NOT expect audio to autoplay before the user interacts with the page. This project intentionally starts music after the first click.

Make sure the file is actually:

assets/music/background.mp3

If your song is named `song.mp3`, either rename it to `background.mp3` or change the `<source>` in `index.html`.

## Recommended workflow

Use Live Server instead of opening the HTML directly with `file://`.

Chrome/Edge:
- Install "Live Server"
- Right-click index.html
- Open with Live Server

## Editing the look

Most visual values are at the top of `style.css`:

--bg = background
--paper = paper color
--gold = accent
--scene-speed = transition duration
--photo-speed = photo animation duration

The CSS contains:
- fade + scale scene transitions
- bouquet entrance
- floating flowers
- letter paper entrance
- typewriter text
- staggered Polaroid animations
- hover zoom
- final film-frame entrance
- subtle film grain
- vignette
- reduced-motion support
- responsive mobile layout

## Notes about the reference

The provided reference is a video recording rather than source HTML/CSS, so this is a recreation of the visible interaction, timing style, layout and animation language rather than the original creator's source code.

The project is deliberately structured so you can replace the photos, letter, captions, music and animation timings without rewriting the core application.
