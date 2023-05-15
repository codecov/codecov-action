## 3.1.4
### Fixes
- #967 Fix typo in README.md
- #971 fix: add back in working dir
- #969 fix: CLI option names for uploader

### Dependencies
- #970 build(deps-dev): bump @types/node from 18.15.12 to 18.16.3
- #979 build(deps-dev): bump @types/node from 20.1.0 to 20.1.2
- #981 build(deps-dev): bump @types/node from 20.1.2 to 20.1.4

## 3.1.3
### Fixes
- #960 fix: allow for aarch64 build

### Dependencies
- #957 build(deps-dev): bump jest-junit from 15.0.0 to 16.0.0
- #958 build(deps): bump openpgp from 5.7.0 to 5.8.0
- #959 build(deps-dev): bump @types/node from 18.15.10 to 18.15.12

## 3.1.2
### Fixes
- #718 Update README.md
- #851 Remove unsupported path_to_write_report argument
- #898 codeql-analysis.yml
- #901 Update README to contain correct information - inputs and negate feature
- #955 fix: add in all the extra arguments for uploader

### Dependencies
- #819 build(deps): bump openpgp from 5.4.0 to 5.5.0
- #835 build(deps): bump node-fetch from 3.2.4 to 3.2.10
- #840 build(deps): bump ossf/scorecard-action from 1.1.1 to 2.0.4
- #841 build(deps): bump @actions/core from 1.9.1 to 1.10.0
- #843 build(deps): bump @actions/github from 5.0.3 to 5.1.1
- #869 build(deps): bump node-fetch from 3.2.10 to 3.3.0
- #872 build(deps-dev): bump jest-junit from 13.2.0 to 15.0.0
- #879 build(deps): bump decode-uri-component from 0.2.0 to 0.2.2
- #889 build(deps): bump ossf/scorecard-action from 1.1.1 to 2.1.2
- #895 build(deps): bump json5 from 2.2.1 to 2.2.3
- #896 build(deps): bump actions/upload-artifact from 3.1.0 to 3.1.2
- #900 build(deps-dev): bump @vercel/ncc from 0.34.0 to 0.36.1
- #905 build(deps-dev): bump typescript from 4.7.4 to 4.9.5
- #911 build(deps-dev): bump @types/node from 16.11.40 to 18.13.0
- #922 build(deps-dev): bump @types/node from 18.13.0 to 18.14.0
- #924 build(deps): bump openpgp from 5.5.0 to 5.7.0
- #927 build(deps-dev): bump @types/node from 18.14.0 to 18.14.2
- #933 build(deps-dev): bump @types/node from 18.14.2 to 18.14.6
- #937 build(deps-dev): bump @types/node from 18.14.6 to 18.15.0
- #938 build(deps): bump node-fetch from 3.3.0 to 3.3.1
- #945 build(deps-dev): bump @types/node from 18.15.0 to 18.15.5
- #946 build(deps-dev): bump @types/node from 18.15.5 to 18.15.6
- #947 build(deps-dev): bump @types/node from 18.15.6 to 18.15.10
- #951 build(deps): bump ossf/scorecard-action from 2.1.2 to 2.1.3

## 3.1.1
### Fixes
- #661 Update deprecation warning
- #593 Create codeql-analysis.yml
- #712 README: fix typo
- #725 fix: Remove a blank row
- #726 Update README.md with correct badge version
- #633 Create scorecards-analysis.yml
- #747 fix: add more verbosity to validation
- #750 Regenerate scorecards-analysis.yml
- #774 Switch to v3
- #783 Fix network entry in table
- #791 Trim arguments after splitting them
- #769 Plumb failCi into verification function.

### Dependencies
- #713 build(deps-dev): bump typescript from 4.6.3 to 4.6.4
- #714 build(deps): bump node-fetch from 3.2.3 to 3.2.4
- #724 build(deps): bump github/codeql-action from 1 to 2
- #717 build(deps-dev): bump @types/jest from 27.4.1 to 27.5.0
- #729 build(deps-dev): bump @types/node from 17.0.25 to 17.0.33
- #734 build(deps-dev): downgrade @types/node to 16.11.35
- #723 build(deps): bump actions/checkout from 2 to 3
- #733 build(deps): bump @actions/github from 5.0.1 to 5.0.3
- #732 build(deps): bump @actions/core from 1.6.0 to 1.8.2
- #737 build(deps-dev): bump @types/node from 16.11.35 to 16.11.36
- #749 build(deps): bump ossf/scorecard-action from 1.0.1 to 1.1.0
- #755 build(deps-dev): bump typescript from 4.6.4 to 4.7.3
- #759 build(deps-dev): bump @types/node from 16.11.36 to 16.11.39
- #762 build(deps-dev): bump @types/node from 16.11.39 to 16.11.40
- #746 build(deps-dev): bump @vercel/ncc from 0.33.4 to 0.34.0
- #757 build(deps): bump ossf/scorecard-action from 1.1.0 to 1.1.1
- #760 build(deps): bump openpgp from 5.2.1 to 5.3.0
- #748 build(deps): bump actions/upload-artifact from 2.3.1 to 3.1.0
- #766 build(deps-dev): bump typescript from 4.7.3 to 4.7.4
- #799 build(deps): bump openpgp from 5.3.0 to 5.4.0
- #798 build(deps): bump @actions/core from 1.8.2 to 1.9.1

## 3.1.0
### Features
- #699 Incorporate `xcode` arguments for the Codecov uploader

### Dependencies
- #694 build(deps-dev): bump @vercel/ncc from 0.33.3 to 0.33.4
- #696 build(deps-dev): bump @types/node from 17.0.23 to 17.0.25
- #698 build(deps-dev): bump jest-junit from 13.0.0 to 13.2.0

## 3.0.0
### Breaking Changes
- #689 Bump to node16 and small fixes

### Features
- #688 Incorporate `gcov` arguments for the Codecov uploader

### Dependencies
- #548 build(deps-dev): bump jest-junit from 12.2.0 to 13.0.0
- #603 [Snyk] Upgrade @actions/core from 1.5.0 to 1.6.0
- #628 build(deps): bump node-fetch from 2.6.1 to 3.1.1
- #634 build(deps): bump node-fetch from 3.1.1 to 3.2.0
- #636 build(deps): bump openpgp from 5.0.1 to 5.1.0
- #652 build(deps-dev): bump @vercel/ncc from 0.30.0 to 0.33.3
- #653 build(deps-dev): bump @types/node from 16.11.21 to 17.0.18
- #659 build(deps-dev): bump @types/jest from 27.4.0 to 27.4.1
- #667 build(deps): bump actions/checkout from 2 to 3
- #673 build(deps): bump node-fetch from 3.2.0 to 3.2.3
- #683 build(deps): bump minimist from 1.2.5 to 1.2.6
- #685 build(deps): bump @actions/github from 5.0.0 to 5.0.1
- #681 build(deps-dev): bump @types/node from 17.0.18 to 17.0.23
- #682 build(deps-dev): bump typescript from 4.5.5 to 4.6.3
- #676 build(deps): bump @actions/exec from 1.1.0 to 1.1.1
- #675 build(deps): bump openpgp from 5.1.0 to 5.2.1

## 2.1.0
### Features
- #515 Allow specifying version of Codecov uploader

### Dependencies
- #499 build(deps-dev): bump @vercel/ncc from 0.29.0 to 0.30.0
- #508 build(deps): bump openpgp from 5.0.0-5 to 5.0.0
- #514 build(deps-dev): bump @types/node from 16.6.0 to 16.9.0

## 2.0.3
### Fixes
- #464 Fix wrong link in the readme
- #485 fix: Add override OS and linux default to platform

### Dependencies
- #447 build(deps): bump openpgp from 5.0.0-4 to 5.0.0-5
- #458 build(deps-dev): bump eslint from 7.31.0 to 7.32.0
- #465 build(deps-dev): bump @typescript-eslint/eslint-plugin from 4.28.4 to 4.29.1
- #466 build(deps-dev): bump @typescript-eslint/parser from 4.28.4 to 4.29.1
- #468 build(deps-dev): bump @types/jest from 26.0.24 to 27.0.0
- #470 build(deps-dev): bump @types/node from 16.4.0 to 16.6.0
- #472 build(deps): bump path-parse from 1.0.6 to 1.0.7
- #473 build(deps-dev): bump @types/jest from 27.0.0 to 27.0.1
- #478 build(deps-dev): bump @typescript-eslint/parser from 4.29.1 to 4.29.2
- #479 build(deps-dev): bump @typescript-eslint/eslint-plugin from 4.29.1 to 4.29.2
- #481 build(deps-dev): bump @types/node from 16.6.0 to 16.6.2
- #483 build(deps-dev): bump @vercel/ncc from 0.29.0 to 0.29.2
- #484 build(deps): bump @actions/core from 1.4.0 to 1.5.0

## 2.0.2
### Fixes
- Underlying uploader fixes issues with tokens not being sent properly for users seeing
  `Error!: Error: Error uploading to https://codecov.io: Error: Error uploading to Codecov: Error: Not Found`
- #440 fix: Validation ordering

## 2.0.1
### Fixes
- #424 fix: Issue in building all deep dependencies

## 2.0.0
On February 1, 2022, the `v1` uploader will be full sunset and no longer function. This is due
to the deprecation of the underlying bash uploader. This version uses the new [uploader](https://github.com/codecov/uploader).

The `v2` Action downloads, verifies, and runs the Codecov binary.

### Breaking Changes
- Multiple fields have not been transferred from the bash uploader or have been deprecated. Notably
many of the `functionalities` and `gcov_` arguments have been removed. Please check the documentation
for the full list.

### Features
- `dry-run` argument allows Codecov flow without uploading reports to Codecov
- (Enterprise only) `slug` allows specifying the repository slug manually
- (Enterprise only) `url` allows changing the upload host

## 1.5.2
### Fixes
- # fix: Import version properly as string not object

## 1.5.1
### Fixes
- #320 doc: add github actions badge
- #336 Update bash uploader to 1.0.3
- #339 fix: Add action version

### Dependencies
- #302 Bump @typescript-eslint/eslint-plugin from 4.22.0 to 4.22.1
- #303 Bump @typescript-eslint/parser from 4.22.0 to 4.22.1
- #304 Bump ts-jest from 26.5.5 to 26.5.6
- #309 Bump lodash from 4.17.19 to 4.17.21
- #310 Bump hosted-git-info from 2.8.8 to 2.8.9
- #311 Bump @actions/github from 4.0.0 to 5.0.0
- #314 Bump eslint from 7.25.0 to 7.27.0
- #315 Bump @actions/core from 1.2.7 to 1.3.0
- #316 Bump @typescript-eslint/parser from 4.22.1 to 4.25.0
- #317 Bump @typescript-eslint/eslint-plugin from 4.22.1 to 4.25.0
- #319 Bump jest-junit from 12.0.0 to 12.1.0
- #321 Bump typescript from 4.2.4 to 4.3.2
- #323 Bump ws from 7.3.1 to 7.4.6
- #331 Bump eslint from 7.27.0 to 7.28.0
- #332 Bump @actions/exec from 1.0.4 to 1.1.0
- #333 Bump @typescript-eslint/parser from 4.25.0 to 4.26.1
- #334 Bump @typescript-eslint/eslint-plugin from 4.25.0 to 4.26.1
- #335 Bump @actions/core from 1.3.0 to 1.4.0
- #337 Bump glob-parent from 5.1.1 to 5.1.2

## 1.5.0
### Features
- #299 Pull Codecov bash script into the action

### Dependencies
- #271 Bump typescript from 4.2.3 to 4.2.4
- #277 Bump @typescript-eslint/eslint-plugin from 4.16.1 to 4.22.0
- #278 Bump @typescript-eslint/parser from 4.20.0 to 4.22.0
- #279 Bump @actions/core from 1.2.6 to 1.2.7
- #292 Bump ts-jest from 26.5.3 to 26.5.5
- #293 Bump eslint from 7.21.0 to 7.25.0
- #297 Bump @types/jest from 26.0.20 to 26.0.23
- #298 Upgrade to GitHub-native Dependabot

## 1.4.1
### Fixes
- #287 Update VERSION regex to restrict on digits and dot and move checksums into script

## 1.4.0
### Features
- #282 Add checksum verification of bash script

## 1.3.2
### Fixes
- #264 Overwrites pr number for pull_request_target events

## 1.3.1
### Fixes
- #253 Add `network_filter` to action manifest

## 1.3.0
### Features
- #252 Add "network_filter" input

## 1.2.2
### Fixes
- #241 pass root_dir using proper bash arg
- #244 Overwrite the commit on pull_request* events

## 1.2.1
### Fixes
- #196 Add parameters to the action.yml

## 1.2.0
### Features
- #193 Add all the bash params

### Fixes
- #193 Fixes issue with working-directory

## 1.1.1
### Fixes
- #184 Add automations ensure proper builds and deployments
- #184 Fixes verbose flag

## 1.1.0
### Features
- #110 Add "working-directory:" input
- #174 Support Xcode specificed parameters

### Fixes
- #172 File is saved as text

### Dependencies and Misc
- #166 Bump requestretry from 4.1.1 to 4.1.2
- #169 Bump typescript from 4.0.5 to 4.1.2
- #178 Bump @types/jest from 26.0.15 to 26.0.19
