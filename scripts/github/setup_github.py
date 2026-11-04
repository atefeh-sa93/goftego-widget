#!/usr/bin/env python3
"""Create labels, milestones and issues for goftego-widget from tasks.json.

Usage:
  python3 setup_github.py OWNER/REPO            # dry run, prints what it would do
  python3 setup_github.py OWNER/REPO --apply    # actually creates them with gh
  python3 setup_github.py OWNER/REPO --apply --project "goftego-widget"
                                                # also adds every issue to a Project board
Requires: gh logged in (gh auth status). --project needs: gh auth refresh -s project
"""
import json
import pathlib
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent


def gh(args, apply, capture=False):
    print("  $ gh " + " ".join(a if " " not in a else repr(a) for a in args))
    if not apply:
        return ""
    res = subprocess.run(["gh", *args], check=True, text=True, capture_output=True)
    return res.stdout.strip()


def issue_body(task, milestone):
    checklist = "\n".join(f"- [ ] {t}" for t in task["tasks"])
    return (
        f"**Milestone:** {milestone['title']}\n\n"
        f"> {task['fa']}\n\n"
        f"### Acceptance criteria\n{checklist}\n\n"
        f"### Definition of done\n"
        f"- [ ] Decisions agreed before coding, recorded in `docs/decisions/` and the PR **Decisions** section\n"
        f"- [ ] Branch `{task['n']}-...` → PR with `Closes #{task['n']}` in the description\n"
        f"- [ ] CI green (lint, typecheck, unit, build, size, e2e)\n"
        f"- [ ] Squash-merged into `main`\n"
    )


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    repo = sys.argv[1]
    apply = "--apply" in sys.argv
    project = None
    if "--project" in sys.argv:
        project = sys.argv[sys.argv.index("--project") + 1]

    data = json.loads((HERE / "tasks.json").read_text(encoding="utf-8"))
    milestones = {m["key"]: m for m in data["milestones"]}
    print(("APPLYING" if apply else "DRY RUN") + f" on {repo}\n")

    print("Labels")
    for label in data["labels"]:
        gh(["label", "create", label["name"], "--color", label["color"], "--force", "-R", repo], apply)

    print("\nMilestones")
    for m in data["milestones"]:
        gh(["api", f"repos/{repo}/milestones", "-f", f"title={m['title']}",
            "-f", f"description={m['description']}"], apply)

    project_number = None
    if project:
        owner = repo.split("/")[0]
        print("\nProject")
        out = gh(["project", "create", "--owner", owner, "--title", project, "--format", "json"], apply)
        if apply:
            project_number = str(json.loads(out)["number"])
            gh(["project", "link", project_number, "--owner", owner, "--repo", repo], apply)

    print("\nIssues (created in order so #numbers match tasks.json)")
    for task in sorted(data["tasks"], key=lambda t: t["n"]):
        m = milestones[task["m"]]
        args = ["issue", "create", "-R", repo, "--title", task["title"],
                "--body", issue_body(task, m), "--milestone", m["title"]]
        for label in task["labels"]:
            args += ["--label", label]
        url = gh(args, apply)
        if project_number and url:
            gh(["project", "item-add", project_number, "--owner", repo.split("/")[0], "--url", url], apply)

    print("\nDone." if apply else "\nDry run finished. Re-run with --apply to create them.")


if __name__ == "__main__":
    main()
