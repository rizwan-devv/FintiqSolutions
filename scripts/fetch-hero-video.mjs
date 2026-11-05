import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const media = path.join(__dirname, "..", "public", "media");

/** Three dark cinematic loops for the rotating hero themes. */
const clips = [
  {
    file: "hero-1.mp4",
    url: "https://videos.pexels.com/video-files/5538825/5538825-hd_1920_1080_30fps.mp4",
  },
  {
    file: "hero-2.mp4",
    url: "https://videos.pexels.com/video-files/3258634/3258634-hd_1920_1080_24fps.mp4",
  },
  {
    file: "hero-3.mp4",
    url: "https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4",
  },
];

for (const clip of clips) {
  const out = path.join(media, clip.file);
  console.log("downloading", clip.url);
  const res = await fetch(clip.url);
  if (!res.ok || !res.body) {
    console.error("download failed", clip.file, res.status);
    process.exit(1);
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(out));
  console.log("saved", out);
}
