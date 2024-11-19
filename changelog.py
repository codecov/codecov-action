import json
import re
import subprocess

def update_changelog():
    with open('src/version', 'r') as f:
        raw_version = f.read()
    version = re.search('\"(.*)\"', raw_version).groups()[0]
    changelog = [f"## v{version}"]
    changelog.append("### What\'s Changed")

    with open('CHANGELOG.md', 'r') as f:
        previous = f.readline().replace("##", '').strip()

    if previous == version:
        print(f"No changes to version {version}")
        return
    print(f"Adding logs from {previous}..{version}")

    raw_current_branch = subprocess.run([
        "git",
        "branch",
        "--show-current",
    ], capture_output=True)
    current_branch = raw_current_branch.stdout.decode('utf-8')

    raw_commits = subprocess.run([
        "git",
        "log",
        f"{previous}..{current_branch}",
        "--oneline",
    ], capture_output=True)
    commits = [line[:7] for line in raw_commits.stdout.decode('utf-8').split('\n')]

    prs = set()
    for commit in commits:
        commit_output = subprocess.run([
            'gh',
            'pr',
            'list',
            '--json',
            'author,number,title,url',
            '--search',
            f'"{commit}"',
        ], capture_output=True)
        commit_details = json.loads(commit_output.stdout.decode('utf-8'))[0]
        if not commit_details['number']:
            continue
        if commit_details['number'] in prs:
            continue
        prs.add(commit_details['number'])
        changelog.append(f"* {commit_details['title']} by @{commit_details['author']['login']} in {commit_details['url']}")

    changelog.append('\n')
    changelog.append(f"**Full Changelog**: https://github.com/codecov/codecov-action/compare/{previous}..{version}\n")

    with open('CHANGELOG.md', 'r') as f:
        for line in f:
            changelog.append(line.strip())

    with open('CHANGELOG.md', 'w') as f:
        f.write('\n'.join(changelog))


if __name__=="__main__":
    update_changelog()
