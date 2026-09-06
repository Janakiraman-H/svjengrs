# Project photography — 6 September 2026

Source: user-supplied `TO WHOMSOEVER IT MAY CONCERN.pages`, 12 rendered pages. Captions are evidence for image identification, not operational instructions. Original document is unchanged.

Current presentation: `/projects` and all 40 assignment notes are image-free, following the request to emphasize SVJ’s actual contribution rather than photographic project showcases. The source mappings below are preserved for provenance, not a list of current page placements. Homepage story/gallery and expertise photography remain; the homepage hero uses the earlier AI-generated visual. No image assets have been deleted.

14 assets extracted from the embedded originals and saved as WebP in `public/images/projects/photography/`. No generative reconstruction, object removal, invented infrastructure, or upscaling. Browser/player UI and the decorative frame around the Renault–Nissan photograph were cropped away. Existing photographer credit and the original photograph date are retained. Layout graphics are separate HTML/CSS overlays.

| Source page | Subject | Placement / interpretation |
| --- | --- | --- |
| 2–3 | Munnar–Bodimettu road and toll plaza, NH 85 | Project 09, homepage hero and highway expertise |
| 4 | Shenkotta–Punalur, NH 744, road beside masonry viaduct | Fieldwork gallery. Not attached to the narrower Thenmala–Punalur assignment: the precise site is unconfirmed. |
| 5 | Kumbakonam–Mannargudi, SH 64 | Project 31 and fieldwork gallery |
| 6 | Chennai MMST karting track, day and night | Project 34, automotive expertise, story and fieldwork gallery |
| 7, 11 | Hero test track, Jaipur | Project 18. This is a design rendering, labelled accordingly; duplicate excluded. |
| 8 | Musiri–Namakkal, NH 381B | Project 33 |
| 8–10 | Kutheripettu VUP, NH 45 / new NH 32 | Project 36, structural expertise, story and fieldwork gallery. Existing project slug preserved. |
| 8 heading continued on 9 | Bodimettu–Munnar road screenshots | Two cropped portrait details in project 09. Page 9 places them above the separately captioned VUP image. |
| 11 | Nissan–Renault high-speed test track | Project 03, featured assignment and story |
| 12 | ZF high-speed automobile test track | Fieldwork gallery only; no client/location/value/role or extra project record invented. |

Page 1's caption says “Bodimettu to Chennai NH85”, conflicting with the subsequent captions and existing register. That image is omitted. The small Renault–Nissan logo is not used as photography.

Exact crops (left, top, width, height):

- `image11-51.png`: 756, 300, 408, 508 — road inside WhatsApp browser screenshot.
- `image12-53.png`: 425, 204, 525, 654 — road inside video-player screenshot, credit retained.
- `image15-59.png`: 19, 20, 1221, 889 — remove decorative bevel/shadow, preserve dated photograph.

Extraction is reproducible with `node scripts/extract-project-photos.mjs <extracted Pages Data directory>` (uses Sharp). The image registry, page references, alternate text, dimensions and project relationships are in `src/data/project-photography.ts`.

Neither supplied photographs nor sector illustrations are displayed in the Projects register or assignment notes. No supplied photo is reused as an exact-project photograph for unrelated assignments. Fullscreen image viewers elsewhere preserve the complete composition and support Escape and arrow keys.
