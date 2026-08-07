/**
 * Generates public/favicon.ico (PNG-encoded ICO, 32x32 + 16x16).
 * Run with: node scripts/generate-favicon.mjs
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BG = [5, 8, 22];
const STOPS = [
  [0.0, [124, 58, 237]],
  [0.55, [6, 182, 212]],
  [1.0, [34, 197, 94]],
];

/** Sample the brand gradient at t in [0, 1]. */
function gradient(t) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [t0, c0] = STOPS[i];
    const [t1, c1] = STOPS[i + 1];
    if (t >= t0 && t <= t1) {
      const k = (t - t0) / (t1 - t0);
      return c0.map((c, j) => Math.round(c + (c1[j] - c) * k));
    }
  }
  return STOPS[STOPS.length - 1][1];
}

/** 5x7 bitmap font for the letters we need. */
const GLYPHS = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
};

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

/** Render the icon at the given size as an RGBA pixel buffer. */
function render(size) {
  const px = Buffer.alloc(size * size * 4);
  const radius = size * 0.25;

  const set = (x, y, [r, g, b], a = 255) => {
    const i = (y * size + x) * 4;
    const srcA = a / 255;
    const dstA = px[i + 3] / 255;
    const outA = srcA + dstA * (1 - srcA);
    if (outA === 0) return;
    px[i] = Math.round((r * srcA + px[i] * dstA * (1 - srcA)) / outA);
    px[i + 1] = Math.round((g * srcA + px[i + 1] * dstA * (1 - srcA)) / outA);
    px[i + 2] = Math.round((b * srcA + px[i + 2] * dstA * (1 - srcA)) / outA);
    px[i + 3] = Math.round(outA * 255);
  };

  // Rounded background
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = Math.max(radius - x - 0.5, x + 0.5 - (size - radius), 0);
      const dy = Math.max(radius - y - 0.5, y + 0.5 - (size - radius), 0);
      const dist = Math.hypot(dx, dy);
      if (dist > radius) continue;
      const alpha = dist > radius - 1 ? Math.round((radius - dist) * 255) : 255;
      set(x, y, BG, alpha);
    }
  }

  // Gradient border
  const inset = Math.max(1, Math.round(size * 0.06));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = Math.max(radius - x - 0.5, x + 0.5 - (size - radius), 0);
      const dy = Math.max(radius - y - 0.5, y + 0.5 - (size - radius), 0);
      const dist = Math.hypot(dx, dy);
      const onEdge =
        dist <= radius &&
        (dist > radius - inset ||
          x < inset ||
          y < inset ||
          x >= size - inset ||
          y >= size - inset);
      if (!onEdge) continue;
      set(x, y, gradient((x + y) / (size * 2)));
    }
  }

  // "AK" monogram
  const scale = Math.max(1, Math.floor(size / 16));
  const glyphW = 5 * scale;
  const glyphH = 7 * scale;
  const gap = scale;
  const totalW = glyphW * 2 + gap;
  const startX = Math.round((size - totalW) / 2);
  const startY = Math.round((size - glyphH) / 2);

  ["A", "K"].forEach((letter, index) => {
    const rows = GLYPHS[letter];
    const ox = startX + index * (glyphW + gap);
    rows.forEach((row, ry) => {
      [...row].forEach((cell, rx) => {
        if (cell !== "1") return;
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const x = ox + rx * scale + sx;
            const y = startY + ry * scale + sy;
            if (x < 0 || y < 0 || x >= size || y >= size) continue;
            set(x, y, gradient(x / size));
          }
        }
      });
    });
  });

  return px;
}

/** Encode an RGBA buffer as a PNG. */
function encodePng(size, rgba) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Wrap PNG buffers into an ICO container. */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dir = [];
  for (const { size, png } of entries) {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e[2] = 0;
    e[3] = 0;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += png.length;
  }

  return Buffer.concat([header, ...dir, ...entries.map((e) => e.png)]);
}

const sizes = [16, 32, 48];
const entries = sizes.map((size) => ({
  size,
  png: encodePng(size, render(size)),
}));

const publicDir = resolve(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

writeFileSync(resolve(publicDir, "favicon.ico"), buildIco(entries));
writeFileSync(resolve(publicDir, "apple-icon.png"), encodePng(180, render(180)));

console.log("Generated public/favicon.ico and public/apple-icon.png");
