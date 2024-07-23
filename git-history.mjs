import { simpleGit } from "simple-git";
import fs from "node:fs";

const dir = "C:\\Users\\hello\\Projects\\ethang\\eglove";

process.chdir(dir);

const git = simpleGit({
  baseDir: dir,
});
const log = await git.log();

const start = new Date();
start.setFullYear(start.getFullYear() - 1);

const end = new Date();

let found = 0;
let missing = 0;

console.log(log.latest);

while (start <= end) {
  const foundCommit = log.all.find((item) => {
    return (
      new Date(item.date).toLocaleDateString() === start.toLocaleDateString()
    );
  });

  if (foundCommit) {
    found += 1;
  } else {
    missing += 1;
    console.log(`Commiting for ${start.toLocaleString()}.`);
    fs.writeFileSync("fake-history.txt", start.toISOString());
    await git.add(".");
    await git.commit("Hmm...", {
      "--date": start.toISOString(),
    });
  }

  start.setDate(start.getDate() + 1);
}

await git.push();

console.log(`${found} commits found`);
console.log(`${missing} commits created`);
process.exit();
