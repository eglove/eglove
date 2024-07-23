import { simpleGit } from "simple-git";
import { DateTime } from "luxon";
import { writeFile } from "node:fs";
import { exec } from "node:child_process";

const dir = "C:\\Users\\hello\\Projects\\ethang\\eglove";
const gitFormat = "yyyy-MM-dd HH:mm";

process.chdir(dir);

let start = DateTime.now().minus({ year: 1 });
const end = DateTime.now();

const git = simpleGit({
  baseDir: dir,
});

while (end.diff(start, "day").values.days > 0) {
  const result = await exec(
    `git log --after="${start.toISO()}" --before="${end.toISO()}"`,
  );

  if (result.toString() === "") {
    console.log(`Commiting for ${start.toLocaleString()}.`);
    await writeFile("fake-history.txt", start.toISO());
    await git.add(".");
    await git.commit("Hmm...", {
      "--date": start.toISO(),
    });
  }

  start = start.plus({ day: 1 });
}

await git.push();
process.exit();
