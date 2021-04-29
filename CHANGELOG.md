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
