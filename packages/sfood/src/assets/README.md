# SFood Image Policy

- Use static image URLs in typed `ImageAsset` content objects until local licensed assets are available.
- Every image must include descriptive Korean `alt` text that still communicates the content if the image fails.
- Hero imagery may use `loading: "eager"` because it supports the initial brand message.
- Card and news imagery should use `loading: "lazy"` to keep initial rendering light.
- Replace placeholder sources with licensed brand photography before production launch.
