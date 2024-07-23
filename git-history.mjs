import { simpleGit } from "simple-git";
import { DateTime } from "luxon";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const dir = "C:\\Users\\hello\\Projects\\ethang\\eglove";

process.chdir(dir);

let start = DateTime.now()
  .minus({ year: 1 })
  .set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

const git = simpleGit({
  baseDir: dir,
});

let isDone = false;

while (isDone === false) {
  const end = start.plus({ day: 1 });
  const result = await execSync(
    `git log --after="${start.toISO()}" --before="${end.toISO()}"`,
  ).toString();

  if (result.length <= 0) {
    console.log(`Commiting for ${start.toLocaleString()}.`);
    writeFileSync("fake-history.txt", start.toISO());
    await git.add(".");
    await git.commit("Hmm...", {
      "--date": start.toISO(),
    });
  }

  start = start.plus({ day: 1 });

  if (DateTime.now().diff(start, "day").values.days < 1) {
    isDone = true;
  }
}

await git.push();
process.exit();
