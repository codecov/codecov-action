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
