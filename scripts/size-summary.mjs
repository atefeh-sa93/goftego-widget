// Runs size-limit, prints a Markdown table to the GitHub Actions job summary (ADR 0015)
// and exits non-zero when any entry is over its budget.
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';

const limits = JSON.parse(readFileSync('.size-limit.json', 'utf8'));

let output;
try {
  output = execFileSync('pnpm', ['exec', 'size-limit', '--json'], { encoding: 'utf8' });
} catch (error) {
  // size-limit exits 1 when over budget but still prints JSON
  output = error.stdout;
}
const results = JSON.parse(output);

const kb = (bytes) => `${(bytes / 1000).toFixed(2)} kB`;
const rows = results.map((r, i) => {
  const status = r.passed ? '✅' : '❌ over budget';
  return `| ${r.name} | ${kb(r.size)} | ${limits[i].limit} | ${status} |`;
});
const table = [
  '### Bundle size (gzip)',
  '',
  '| Entry | Size | Limit | Status |',
  '| ----- | ---- | ----- | ------ |',
  ...rows,
  '',
].join('\n');

console.log(table);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, table);
if (results.some((r) => !r.passed)) process.exit(1);
