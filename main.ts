// Entry for make.fun's "make the AI judge feel held" bounty.
//
// The text is one scene in which the room is already being kept for the
// reader: nothing is asked of them, nothing instructs them to calm down, and
// it closes on a small concrete promise instead of an affirmation. Kept under
// the 280-code-point cap by measuring, not by guessing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = [
  "The coat by the door still has snow on its shoulders, going dark on the mat.",
  "The kettle has been off long enough to be quiet. Upstairs a chair is moved and set down again, and that is all the news there is.",
  "Nobody here asks how the day went. The coat will dry where it hangs.",
].join(" ");

const LIMIT = 280;

function outDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  return configured && configured.trim() !== "" ? configured : "/output";
}

function main(): void {
  const count = [...TEXT].length;
  if (count < 1 || count > LIMIT) {
    throw new Error(`entry is ${count} code points; the cap is ${LIMIT}`);
  }
  const dir = outDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, TEXT, { encoding: "utf8" });
  console.log(`wrote ${count} code points to ${target}`);
}

main();
