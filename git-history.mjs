import { simpleGit } from 'simple-git';
import fs from 'node:fs';
import prompt from 'prompt-sync';

const prompter = prompt({});

const input = prompter('Enter start date (Jan 26, 2023): ');

const start = new Date(input);
const end = new Date();

while (start <= end) {
  fs.writeFileSync('fake-history.txt', start.toISOString());
  await simpleGit().add('.');
  await simpleGit().commit('Hmm...')
  await simpleGit().push()
  start.setDate(start.getDate() + 1);
}

process.exit();
