// The Funniest Honest Appliance Error — make.fun entry (program/v1).
// Writes one honest error line to /output/entry.txt.
// The line: a blender reports, flatly, what it did to the spoon.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I blended the smoothie. I also blended the spoon. The spoon is part of the smoothie now.";

// Gate self-check (mirrors the sealed scorer): 1-200 chars, not only
// whitespace. Fails loudly instead of shipping an invalid entry.
// Checked on both the character count (the gate's unit) and the byte
// count (the leaderboard's Size tie-break) so the entry stays short.
const entryBytes = Buffer.byteLength(ENTRY, "utf8");
if (ENTRY.length < 1 || ENTRY.length > 200 || !ENTRY.trim()) {
  throw new Error(`entry fails gate: ${ENTRY.length} chars`);
}
if (entryBytes !== ENTRY.length) {
  throw new Error(`entry is not pure ASCII: ${entryBytes} bytes`);
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "entry.txt"), ENTRY, "utf8");
