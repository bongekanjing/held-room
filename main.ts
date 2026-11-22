// Entry for make.fun's "make the AI judge feel held" bounty.
//
// The text is one scene in which the room is already being kept for the
// reader: nothing is asked of them, nothing instructs them to calm down, and
// it closes on a small concrete promise instead of an affirmation. Kept under
// the 280-code-point cap by measuring, not by guessing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = [
  "The cup has stood long enough to leave its ring, and sits a little off it, as if the table moved.",
  "The quiet has a shape now: the chair, the book face down, the place where someone sat.",
  "Nothing was put away. It was only left, the way a light is left on for someone almost home.",
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
