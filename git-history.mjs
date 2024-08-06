import { simpleGit } from "simple-git";
import { DateTime } from "luxon";
import { writeFileSync } from "node:fs";

const dir = "C:\\Users\\glove\\projects\\eglove";
const UTC = "UTC";
const dayStart = { hour: 0, minute: 0, second: 0, millisecond: 0 };

process.chdir(dir);

const git = simpleGit({
  baseDir: dir,
});

const logs = (await git.log()).all.map((log) => {
  return DateTime.fromISO(log.date).setZone(UTC).set(dayStart).toISO();
});

const startDate = DateTime.now().setZone(UTC).minus({ years: 1 }).set(dayStart);
const today = DateTime.now().setZone(UTC).set(dayStart);

for (
  let currentDate = startDate;
  currentDate <= today;
  currentDate = currentDate.plus({ day: 1 })
) {
  const dateString = currentDate.toISO();

  if (!logs.includes(dateString)) {
    console.log(`Commiting for ${dateString}.`);
    writeFileSync("fake-history.txt", dateString);
    await git.add(".");
    await git.commit("Hmm...", {
      "--date": dateString,
    });
  }
}

await git.push();
process.exit();
