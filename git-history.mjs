import { simpleGit } from 'simple-git';
import fs from 'node:fs';
import prompt from 'prompt-sync';

const prompter = prompt({});

const input = prompter('Enter start date (Jan 26, 2023): ');

const start = new Date(input);
const end = new Date();

const createCommit = async (start) => {
  fs.writeFileSync('fake-history.txt', start.toISOString());
  await simpleGit().add('.');
  await simpleGit().commit('Hmm...', {
    '--date': start.toISOString(),
  })
  await simpleGit().push()
  console.log(`Commited for ${start.toLocaleString()}.`)
}

const promises = [];

while (start <= end) {
  promises.push(createCommit(start));
  start.setDate(start.getDate() + 1);
}

await Promise.allSettled(promises);

process.exit();
