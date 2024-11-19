## v5.0.3
### What's Changed
* fix: update OIDC audience by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1675
* fix: use double-quotes for OIDC by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1669
* fix: prevent always setting tokenless to be true by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1673
* fix: update CHANGELOG and automate by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1674
* fix: bump to v5 and update README by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1655
* build(deps): bump github/codeql-action from 3.27.0 to 3.27.4 by @app/dependabot in https://github.com/codecov/codecov-action/pull/1665
* fix: typo in `inputs.disable_safe_directory` by @mkroening in https://github.com/codecov/codecov-action/pull/1666


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v5.0.2..v5.0.3

## v5.0.2
### What's Changed
* fix: override commit and pr values for PR cases by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1657


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v5.0.1...v5.0.2

## v5.0.1
### What's Changed
* fix: use marketplace v5 badge by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1646
* fix: update tokenless branch logic by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1650
* chore(release): 5.0.1 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1656


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v5.0.0...v5.0.1

## v5.0.0
### v5 Release
`v5` of the Codecov GitHub Action will use the [Codecov Wrapper](https://github.com/codecov/wrapper) to encapsulate the [CLI](https://github.com/codecov/codecov-cli). This will help ensure that the Action gets updates quicker.

### Migration Guide
The `v5` release also coincides with the opt-out feature for tokens for public repositories. In the `Global Upload Token` section of the settings page of an organization in codecov.io, you can set the ability for Codecov to receive a coverage reports from any source. This will allow contributors or other members of a repository to upload without needing access to the Codecov token. For more details see [how to upload without a token](https://docs.codecov.com/docs/codecov-tokens#uploading-without-a-token).

> [!WARNING]
> **The following arguments have been changed**
> - `file` (this has been deprecated in favor of `files`)
> - `plugin` (this has been deprecated in favor of `plugins`)

The following arguments have been added:

- `binary`
- `gcov_args`
- `gcov_executable`
- `gcov_ignore`
- `gcov_include`
- `report_type`
- `skip_validation`
- `swift_project`

You can see their usage in the `action.yml` [file](https://github.com/codecov/codecov-action/blob/main/action.yml).

## What's Changed
* chore(deps): bump to eslint9+ and remove eslint-config-google by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1591
* build(deps-dev): bump @octokit/webhooks-types from 7.5.1 to 7.6.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1595
* build(deps-dev): bump typescript from 5.6.2 to 5.6.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1604
* build(deps-dev): bump @typescript-eslint/parser from 8.8.0 to 8.8.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1601
* build(deps): bump @actions/core from 1.11.0 to 1.11.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1597
* build(deps): bump github/codeql-action from 3.26.9 to 3.26.11 by @dependabot in https://github.com/codecov/codecov-action/pull/1596
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.8.0 to 8.8.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1600
* build(deps-dev): bump eslint from 9.11.1 to 9.12.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1598
* build(deps): bump github/codeql-action from 3.26.11 to 3.26.12 by @dependabot in https://github.com/codecov/codecov-action/pull/1609
* build(deps): bump actions/checkout from 4.2.0 to 4.2.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1608
* build(deps): bump actions/upload-artifact from 4.4.0 to 4.4.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1607
* build(deps-dev): bump @typescript-eslint/parser from 8.8.1 to 8.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1612
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.8.1 to 8.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1611
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.9.0 to 8.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1615
* build(deps-dev): bump eslint from 9.12.0 to 9.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1618
* build(deps): bump github/codeql-action from 3.26.12 to 3.26.13 by @dependabot in https://github.com/codecov/codecov-action/pull/1617
* build(deps-dev): bump @typescript-eslint/parser from 8.9.0 to 8.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1614
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.10.0 to 8.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1620
* build(deps-dev): bump @typescript-eslint/parser from 8.10.0 to 8.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1619
* build(deps-dev): bump @types/jest from 29.5.13 to 29.5.14 by @dependabot in https://github.com/codecov/codecov-action/pull/1622
* build(deps): bump actions/checkout from 4.2.1 to 4.2.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1625
* build(deps): bump github/codeql-action from 3.26.13 to 3.27.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1624
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.11.0 to 8.12.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1626
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.12.1 to 8.12.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1629
* build(deps-dev): bump @typescript-eslint/parser from 8.11.0 to 8.12.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1628
* build(deps-dev): bump @typescript-eslint/parser from 8.12.2 to 8.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1635
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.12.2 to 8.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1634
* feat: use wrapper by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1621
* Update README.md by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1639
* fix: add missing vars by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1638
* fix: update container builds by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1640
* fixL use the correct source by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1642
* chore(deps): bump wrapper to 0.0.23 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1644


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.6.0...v5.0.0

## v5.0.0-beta (Prerelease)
### What's Changed
* chore(deps): bump to eslint9+ and remove eslint-config-google by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1591
* build(deps-dev): bump @octokit/webhooks-types from 7.5.1 to 7.6.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1595
* build(deps-dev): bump typescript from 5.6.2 to 5.6.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1604
* build(deps-dev): bump @typescript-eslint/parser from 8.8.0 to 8.8.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1601
* build(deps): bump @actions/core from 1.11.0 to 1.11.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1597
* build(deps): bump github/codeql-action from 3.26.9 to 3.26.11 by @dependabot in https://github.com/codecov/codecov-action/pull/1596
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.8.0 to 8.8.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1600
* build(deps-dev): bump eslint from 9.11.1 to 9.12.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1598
* build(deps): bump github/codeql-action from 3.26.11 to 3.26.12 by @dependabot in https://github.com/codecov/codecov-action/pull/1609
* build(deps): bump actions/checkout from 4.2.0 to 4.2.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1608
* build(deps): bump actions/upload-artifact from 4.4.0 to 4.4.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1607
* build(deps-dev): bump @typescript-eslint/parser from 8.8.1 to 8.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1612
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.8.1 to 8.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1611
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.9.0 to 8.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1615
* build(deps-dev): bump eslint from 9.12.0 to 9.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1618
* build(deps): bump github/codeql-action from 3.26.12 to 3.26.13 by @dependabot in https://github.com/codecov/codecov-action/pull/1617
* build(deps-dev): bump @typescript-eslint/parser from 8.9.0 to 8.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1614
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.10.0 to 8.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1620
* build(deps-dev): bump @typescript-eslint/parser from 8.10.0 to 8.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1619
* build(deps-dev): bump @types/jest from 29.5.13 to 29.5.14 by @dependabot in https://github.com/codecov/codecov-action/pull/1622
* build(deps): bump actions/checkout from 4.2.1 to 4.2.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1625
* build(deps): bump github/codeql-action from 3.26.13 to 3.27.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1624
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.11.0 to 8.12.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1626
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.12.1 to 8.12.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1629
* build(deps-dev): bump @typescript-eslint/parser from 8.11.0 to 8.12.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1628
* build(deps-dev): bump @typescript-eslint/parser from 8.12.2 to 8.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1635
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 8.12.2 to 8.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1634
* feat: use wrapper by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1621
* Update README.md by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1639
* fix: add missing vars by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1638
* fix: update container builds by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1640
* fixL use the correct source by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1642


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.6.0...v5.0.0-beta

## v4.6.0
### What's Changed
* build(deps): bump github/codeql-action from 3.25.8 to 3.25.10 by @dependabot in https://github.com/codecov/codecov-action/pull/1481
* build(deps): bump actions/checkout from 4.1.6 to 4.1.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1480
* build(deps-dev): bump ts-jest from 29.1.4 to 29.1.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1479
* build(deps-dev): bump @typescript-eslint/parser from 7.13.0 to 7.13.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1485
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.13.0 to 7.13.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1484
* build(deps-dev): bump typescript from 5.4.5 to 5.5.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1490
* build(deps-dev): bump @typescript-eslint/parser from 7.13.1 to 7.14.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1493
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.13.1 to 7.14.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1492
* build(deps): bump github/codeql-action from 3.25.10 to 3.25.11 by @dependabot in https://github.com/codecov/codecov-action/pull/1496
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.14.1 to 7.15.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1501
* build(deps-dev): bump typescript from 5.5.2 to 5.5.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1500
* build(deps-dev): bump @typescript-eslint/parser from 7.14.1 to 7.15.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1499
* build(deps): bump actions/upload-artifact from 4.3.3 to 4.3.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1502
* build(deps-dev): bump ts-jest from 29.1.5 to 29.2.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1504
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.15.0 to 7.16.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1503
* build(deps-dev): bump ts-jest from 29.2.0 to 29.2.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1507
* build(deps-dev): bump @typescript-eslint/parser from 7.15.0 to 7.16.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1505
* build(deps): bump github/codeql-action from 3.25.11 to 3.25.12 by @dependabot in https://github.com/codecov/codecov-action/pull/1509
* chore(ci): restrict scorecards to codecov/codecov-action by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1512
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.16.0 to 7.16.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1514
* build(deps-dev): bump @typescript-eslint/parser from 7.16.0 to 7.16.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1513
* test: `versionInfo` by @marcobiedermann in https://github.com/codecov/codecov-action/pull/1407
* build(deps-dev): bump ts-jest from 29.2.2 to 29.2.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1515
* build(deps): bump github/codeql-action from 3.25.12 to 3.25.13 by @dependabot in https://github.com/codecov/codecov-action/pull/1516
* build(deps-dev): bump typescript from 5.5.3 to 5.5.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1521
* build(deps-dev): bump @typescript-eslint/parser from 7.16.1 to 7.17.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1520
* build(deps-dev): bump @typescript-eslint/parser from 7.17.0 to 7.18.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1528
* build(deps): bump github/codeql-action from 3.25.13 to 3.25.15 by @dependabot in https://github.com/codecov/codecov-action/pull/1526
* build(deps): bump ossf/scorecard-action from 2.3.3 to 2.4.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1525
* build(deps-dev): bump ts-jest from 29.2.3 to 29.2.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1532
* build(deps): bump actions/upload-artifact from 4.3.4 to 4.3.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1534
* build(deps): bump github/codeql-action from 3.25.15 to 3.26.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1542
* build(deps): bump actions/upload-artifact from 4.3.5 to 4.3.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1541
* ref: Tidy up types and remove string coercion by @nicholas-codecov in https://github.com/codecov/codecov-action/pull/1536
* build(deps-dev): bump @octokit/webhooks-types from 3.77.1 to 7.5.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1545
* build(deps): bump github/codeql-action from 3.26.0 to 3.26.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1551
* feat: pass tokenless value as branch override by @joseph-sentry in https://github.com/codecov/codecov-action/pull/1511
* build(deps): bump actions/upload-artifact from 4.3.6 to 4.4.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1563
* Create makefile.yml by @Hawthorne001 in https://github.com/codecov/codecov-action/pull/1555
* build(deps): bump github/codeql-action from 3.26.2 to 3.26.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1562
* build(deps-dev): bump ts-jest from 29.2.4 to 29.2.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1557
* Spell `evenName` in the logs correctly by @webknjaz in https://github.com/codecov/codecov-action/pull/1560
* build(deps-dev): bump typescript from 5.5.4 to 5.6.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1566
* build(deps-dev): bump @types/jest from 29.5.12 to 29.5.13 by @dependabot in https://github.com/codecov/codecov-action/pull/1567
* build(deps): bump github/codeql-action from 3.26.6 to 3.26.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1569
* build(deps-dev): bump eslint from 8.57.0 to 8.57.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1571
* build(deps): bump github/codeql-action from 3.26.7 to 3.26.8 by @dependabot in https://github.com/codecov/codecov-action/pull/1575
* build(deps-dev): bump @vercel/ncc from 0.38.1 to 0.38.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1577
* chore: fix typo of OSS by @shoothzj in https://github.com/codecov/codecov-action/pull/1578
* build(deps): bump github/codeql-action from 3.26.8 to 3.26.9 by @dependabot in https://github.com/codecov/codecov-action/pull/1584
* build(deps): bump actions/checkout from 4.1.7 to 4.2.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1583
* fix: bump eslint parser deps by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1586
* chore(release):4.6.0 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1587

## New Contributors
* @nicholas-codecov made their first contribution in https://github.com/codecov/codecov-action/pull/1536
* @Hawthorne001 made their first contribution in https://github.com/codecov/codecov-action/pull/1555
* @webknjaz made their first contribution in https://github.com/codecov/codecov-action/pull/1560
* @shoothzj made their first contribution in https://github.com/codecov/codecov-action/pull/1578

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.5.0...v4.6.0

## v4.5.0
### What's Changed
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.9.0 to 7.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1446
* build(deps-dev): bump ts-jest from 29.1.2 to 29.1.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1443
* build(deps-dev): bump @typescript-eslint/parser from 7.9.0 to 7.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1445
* build(deps-dev): bump @typescript-eslint/parser from 7.10.0 to 7.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1459
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.10.0 to 7.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1458
* build(deps): bump github/codeql-action from 3.25.5 to 3.25.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1456
* build(deps-dev): bump ts-jest from 29.1.3 to 29.1.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1460
* build(deps): bump github/codeql-action from 3.25.6 to 3.25.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1466
* build(deps-dev): bump @typescript-eslint/parser from 7.11.0 to 7.12.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1467
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.11.0 to 7.12.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1468
* build(deps): bump github/codeql-action from 3.25.7 to 3.25.8 by @dependabot in https://github.com/codecov/codecov-action/pull/1472
* fix: handle trailing commas by @joseph-sentry in https://github.com/codecov/codecov-action/pull/1470
* build(deps-dev): bump @typescript-eslint/parser from 7.12.0 to 7.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1474
* build(deps-dev): bump braces from 3.0.2 to 3.0.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1475
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.12.0 to 7.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1473
* feat: add support for tokenless v3 by @joseph-sentry in https://github.com/codecov/codecov-action/pull/1410
* Use an existing token even if the PR is from a fork by @leofeyer in https://github.com/codecov/codecov-action/pull/1471
* chore(release): bump to 4.5.0 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1477

## New Contributors
* @joseph-sentry made their first contribution in https://github.com/codecov/codecov-action/pull/1470
* @leofeyer made their first contribution in https://github.com/codecov/codecov-action/pull/1471

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.4.1...v4.5.0

## v4.4.1
### What's Changed
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.8.0 to 7.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1427
* fix: prevent xlarge from running on forks by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1432
* build(deps): bump github/codeql-action from 3.25.4 to 3.25.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1439
* build(deps): bump actions/checkout from 4.1.5 to 4.1.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1438
* fix: isPullRequestFromFork returns false for any PR by @shahar-h in https://github.com/codecov/codecov-action/pull/1437
* chore(release): 4.4.1 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1441

## New Contributors
* @shahar-h made their first contribution in https://github.com/codecov/codecov-action/pull/1437

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.4.0...v4.4.1

## What's Changed
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.8.0 to 7.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1427
* fix: prevent xlarge from running on forks by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1432
* build(deps): bump github/codeql-action from 3.25.4 to 3.25.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1439
* build(deps): bump actions/checkout from 4.1.5 to 4.1.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1438
* fix: isPullRequestFromFork returns false for any PR by @shahar-h in https://github.com/codecov/codecov-action/pull/1437
* chore(release): 4.4.1 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1441

## New Contributors
* @shahar-h made their first contribution in https://github.com/codecov/codecov-action/pull/1437

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.4.0...v4.4.1

## v4.4.0
### What's Changed
* chore: Clarify isPullRequestFromFork by @jsoref in https://github.com/codecov/codecov-action/pull/1411
* build(deps): bump actions/checkout from 4.1.4 to 4.1.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1423
* build(deps): bump github/codeql-action from 3.25.3 to 3.25.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1421
* build(deps): bump ossf/scorecard-action from 2.3.1 to 2.3.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1420
* feat: remove GPG and run on spawn by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1426
* build(deps-dev): bump @typescript-eslint/parser from 7.8.0 to 7.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1428
* chore(release): 4.4.0 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1430


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.3.1...v4.4.0

## v4.3.1
### What's Changed
* build(deps-dev): bump typescript from 5.4.4 to 5.4.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1370
* fix: more verbose log message when failing to import pgp key by @ReenigneArcher in https://github.com/codecov/codecov-action/pull/1371
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.6.0 to 7.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1374
* build(deps-dev): bump @typescript-eslint/parser from 7.6.0 to 7.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1375
* build(deps): bump actions/checkout from 4.1.2 to 4.1.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1382
* build(deps): bump github/codeql-action from 3.24.10 to 3.25.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1381
* build(deps): bump actions/upload-artifact from 4.3.1 to 4.3.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1380
* build(deps-dev): bump @typescript-eslint/parser from 7.7.0 to 7.7.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1384
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.7.0 to 7.7.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1383
* Update README.md to point to docs about tokenless by @rohan-at-sentry in https://github.com/codecov/codecov-action/pull/1395
* build(deps): bump actions/upload-artifact from 4.3.2 to 4.3.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1393
* build(deps): bump actions/checkout from 4.1.3 to 4.1.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1392
* build(deps): bump github/codeql-action from 3.25.1 to 3.25.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1391
* style: Node Packages by @marcobiedermann in https://github.com/codecov/codecov-action/pull/1394
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.7.1 to 7.8.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1402
* build(deps-dev): bump @typescript-eslint/parser from 7.7.1 to 7.8.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1401
* docs: Type Annotations by @marcobiedermann in https://github.com/codecov/codecov-action/pull/1397
* docs: main branch by @marcobiedermann in https://github.com/codecov/codecov-action/pull/1396
* fix: bypass token checks for forks and OIDC by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1404
* chore(release): 4.3.1. by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1405

## New Contributors
* @ReenigneArcher made their first contribution in https://github.com/codecov/codecov-action/pull/1371
* @rohan-at-sentry made their first contribution in https://github.com/codecov/codecov-action/pull/1395
* @marcobiedermann made their first contribution in https://github.com/codecov/codecov-action/pull/1394

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.3.0...v4.3.1

## v4.3.0
### What's Changed
* fix: automatically detect if using GitHub enterprise by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1356
* build(deps-dev): bump typescript from 5.4.3 to 5.4.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1355
* build(deps): bump github/codeql-action from 3.24.9 to 3.24.10 by @dependabot in https://github.com/codecov/codecov-action/pull/1360
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 7.5.0 to 7.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1364
* build(deps-dev): bump @typescript-eslint/parser from 7.5.0 to 7.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1363
* feat: add network params by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1365
* build(deps): bump undici from 5.28.3 to 5.28.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1361
* chore(release): v4.3.0 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1366


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.2.0...v4.3.0

## v4.2.0
### What's Changed
* chore(deps): update deps by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1351
* feat: allow for authentication via OIDC token by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1330
* fix: use_oidc shoudl be required false by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1353


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.1.1...v4.2.0

## v4.1.1
### What's Changed
* build(deps): bump github/codeql-action from 3.24.5 to 3.24.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1315
* build(deps-dev): bump typescript from 5.3.3 to 5.4.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1319
* Removed mention of Mercurial by @drazisil-codecov in https://github.com/codecov/codecov-action/pull/1325
* build(deps): bump github/codeql-action from 3.24.6 to 3.24.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1332
* build(deps): bump actions/checkout from 4.1.1 to 4.1.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1331
* fix: force version by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1329
* build(deps-dev): bump typescript from 5.4.2 to 5.4.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1334
* build(deps): bump undici from 5.28.2 to 5.28.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1338
* build(deps): bump github/codeql-action from 3.24.7 to 3.24.9 by @dependabot in https://github.com/codecov/codecov-action/pull/1341
* fix: typo in disable_safe_directory by @mkroening in https://github.com/codecov/codecov-action/pull/1343
* chore(release): 4.1.1 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1344

## New Contributors
* @mkroening made their first contribution in https://github.com/codecov/codecov-action/pull/1343

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.1.0...v4.1.1

## v4.1.0
### What's Changed
* fix: set safe directory by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1304
* build(deps): bump github/codeql-action from 3.24.3 to 3.24.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1306
* build(deps-dev): bump eslint from 8.56.0 to 8.57.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1305
* chore(release): v4.1.0 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1307


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.0.2...v4.1.0

## v4.0.2
### What's Changed
* Update README.md by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1251
* build(deps-dev): bump @types/jest from 29.5.11 to 29.5.12 by @dependabot in https://github.com/codecov/codecov-action/pull/1257
* build(deps): bump github/codeql-action from 3.23.2 to 3.24.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1266
* Escape pipes in table of arguments by @jwodder in https://github.com/codecov/codecov-action/pull/1265
* Add link to docs on Dependabot secrets by @ianlewis in https://github.com/codecov/codecov-action/pull/1260
* fix: working-directory input for all stages by @Bo98 in https://github.com/codecov/codecov-action/pull/1272
* build(deps-dev): bump @typescript-eslint/parser from 6.20.0 to 6.21.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1271
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.20.0 to 6.21.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1269
* build(deps): bump github/codeql-action from 3.24.0 to 3.24.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1298
* Use updated syntax for GitHub Markdown notes by @jamacku in https://github.com/codecov/codecov-action/pull/1300
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.21.0 to 7.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1290
* build(deps): bump actions/upload-artifact from 4.3.0 to 4.3.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1286
* chore(release): bump to 4.0.2 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1302

## New Contributors
* @jwodder made their first contribution in https://github.com/codecov/codecov-action/pull/1265
* @ianlewis made their first contribution in https://github.com/codecov/codecov-action/pull/1260
* @Bo98 made their first contribution in https://github.com/codecov/codecov-action/pull/1272
* @jamacku made their first contribution in https://github.com/codecov/codecov-action/pull/1300

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.0.1...v4.0.2

## v4.0.1
### What's Changed
* Update README.md by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1243
* Add all args by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1245
* fix: show both token uses in readme by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1250


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.0.0...v4.0.1

## v4.0.0
#v4 of the Codecov Action uses the [CLI](https://docs.codecov.com/docs/the-codecov-cli) as the underlying upload. The CLI has helped to power new features including local upload, the global upload token, and new upcoming features.

## Breaking Changes

- The Codecov Action runs as a `node20` action due to `node16` deprecation. See [this post from GitHub](https://github.blog/changelog/2023-09-22-github-actions-transitioning-from-node-16-to-node-20/) on how to migrate.
- Tokenless uploading is unsupported. However, PRs made from forks to the upstream public repos will support tokenless (e.g. contributors to OS projects do not need the upstream repo's Codecov token). This [doc](https://docs.codecov.com/docs/adding-the-codecov-token#github-actions) shows instructions on how to add the Codecov token.
- OS platforms have been added, though some may not be automatically detected. To see a list of platforms, see our [CLI download page](https://cli.codecov.io)
- Various arguments to the Action have been changed. Please be aware that the arguments match with the CLI's needs

`v3` versions and below will not have access to CLI features (e.g. global upload token, ATS).

## What's Changed
* build(deps): bump openpgp from 5.8.0 to 5.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/985
* build(deps): bump actions/checkout from 3.0.0 to 3.5.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1000
* build(deps): bump ossf/scorecard-action from 2.1.3 to 2.2.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1006
* build(deps): bump tough-cookie from 4.0.0 to 4.1.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1013
* build(deps-dev): bump word-wrap from 1.2.3 to 1.2.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1024
* build(deps): bump node-fetch from 3.3.1 to 3.3.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1031
* build(deps-dev): bump @types/node from 20.1.4 to 20.4.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1032
* build(deps): bump github/codeql-action from 1.0.26 to 2.21.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1033
* build commit,report and upload args based on codecovcli by @dana-yaish in https://github.com/codecov/codecov-action/pull/943
* build(deps-dev): bump @types/node from 20.4.5 to 20.5.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1055
* build(deps): bump github/codeql-action from 2.21.2 to 2.21.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1051
* build(deps-dev): bump @types/node from 20.5.3 to 20.5.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1058
* chore(deps): update outdated deps by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1059
* build(deps-dev): bump @types/node from 20.5.4 to 20.5.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1060
* build(deps-dev): bump @typescript-eslint/parser from 6.4.1 to 6.5.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1065
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.4.1 to 6.5.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1064
* build(deps): bump actions/checkout from 3.5.3 to 3.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1063
* build(deps-dev): bump eslint from 8.47.0 to 8.48.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1061
* build(deps-dev): bump @types/node from 20.5.6 to 20.5.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1062
* build(deps): bump openpgp from 5.9.0 to 5.10.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1066
* build(deps-dev): bump @types/node from 20.5.7 to 20.5.9 by @dependabot in https://github.com/codecov/codecov-action/pull/1070
* build(deps): bump github/codeql-action from 2.21.4 to 2.21.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1069
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.5.0 to 6.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1072
* Update README.md by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1073
* build(deps-dev): bump @typescript-eslint/parser from 6.5.0 to 6.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1071
* build(deps-dev): bump @vercel/ncc from 0.36.1 to 0.38.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1074
* build(deps): bump @actions/core from 1.10.0 to 1.10.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1081
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.6.0 to 6.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1080
* build(deps): bump actions/checkout from 3.6.0 to 4.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1078
* build(deps): bump actions/upload-artifact from 3.1.2 to 3.1.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1077
* build(deps-dev): bump @types/node from 20.5.9 to 20.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1075
* build(deps-dev): bump @typescript-eslint/parser from 6.6.0 to 6.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1079
* build(deps-dev): bump eslint from 8.48.0 to 8.49.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1076
* use cli instead of node uploader by @dana-yaish in https://github.com/codecov/codecov-action/pull/1068
* chore(release): 4.0.0-beta.1 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1084
* not adding -n if empty to do-upload command by @dana-yaish in https://github.com/codecov/codecov-action/pull/1085
* 4.0.0-beta.2 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1086
* build(deps-dev): bump jest from 29.6.4 to 29.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1082
* build(deps-dev): bump @types/jest from 29.5.4 to 29.5.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1092
* build(deps): bump github/codeql-action from 2.21.5 to 2.21.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1094
* build(deps-dev): bump @types/node from 20.6.0 to 20.6.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1093
* build(deps): bump openpgp from 5.10.1 to 5.10.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1096
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.7.0 to 6.7.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1095
* build(deps-dev): bump @types/node from 20.6.2 to 20.6.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1098
* build(deps-dev): bump @typescript-eslint/parser from 6.7.0 to 6.7.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1097
* feat: add plugins by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1099
* build(deps-dev): bump eslint from 8.49.0 to 8.50.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1104
* build(deps): bump github/codeql-action from 2.21.7 to 2.21.8 by @dependabot in https://github.com/codecov/codecov-action/pull/1102
* build(deps): bump actions/checkout from 4.0.0 to 4.1.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1101
* build(deps-dev): bump @typescript-eslint/parser from 6.7.2 to 6.7.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1108
* build(deps-dev): bump @types/node from 20.6.3 to 20.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1107
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.7.2 to 6.7.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1106
* build(deps-dev): bump @types/node from 20.7.0 to 20.7.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1111
* build(deps): bump github/codeql-action from 2.21.8 to 2.21.9 by @dependabot in https://github.com/codecov/codecov-action/pull/1113
* build(deps-dev): bump @types/node from 20.7.1 to 20.8.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1112
* build(deps-dev): bump @types/node from 20.8.0 to 20.8.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1114
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.7.3 to 6.7.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1115
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.7.4 to 6.7.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1123
* build(deps): bump ossf/scorecard-action from 2.2.0 to 2.3.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1120
* build(deps): bump github/codeql-action from 2.21.9 to 2.22.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1119
* build(deps-dev): bump @typescript-eslint/parser from 6.7.3 to 6.7.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1122
* build(deps-dev): bump @types/node from 20.8.2 to 20.8.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1121
* build(deps-dev): bump eslint from 8.50.0 to 8.51.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1117
* build(deps): bump @actions/github from 5.1.1 to 6.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1124
* build(deps): bump github/codeql-action from 2.22.0 to 2.22.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1127
* build(deps-dev): bump @types/node from 20.8.4 to 20.8.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1126
* build(deps-dev): bump @babel/traverse from 7.22.11 to 7.23.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1129
* build(deps): bump undici from 5.25.4 to 5.26.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1128
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.7.5 to 6.8.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1130
* build(deps-dev): bump @typescript-eslint/parser from 6.7.5 to 6.8.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1131
* build(deps-dev): bump @types/node from 20.8.6 to 20.8.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1135
* build(deps-dev): bump @vercel/ncc from 0.38.0 to 0.38.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1136
* build(deps-dev): bump @types/jest from 29.5.5 to 29.5.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1137
* build(deps): bump github/codeql-action from 2.22.3 to 2.22.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1142
* build(deps): bump actions/checkout from 4.1.0 to 4.1.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1141
* build(deps-dev): bump eslint from 8.51.0 to 8.52.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1140
* build(deps-dev): bump @typescript-eslint/parser from 6.8.0 to 6.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1147
* build(deps-dev): bump @types/node from 20.8.7 to 20.8.8 by @dependabot in https://github.com/codecov/codecov-action/pull/1146
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.8.0 to 6.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1145
* chore(deps): move from node-fetch to undici by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1148
* build(deps): bump openpgp from 5.10.2 to 5.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1149
* build(deps-dev): bump @typescript-eslint/parser from 6.9.0 to 6.9.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1155
* build(deps): bump github/codeql-action from 2.22.4 to 2.22.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1152
* build(deps): bump ossf/scorecard-action from 2.3.0 to 2.3.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1151
* build(deps): bump undici from 5.26.5 to 5.27.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1150
* build(deps-dev): bump @types/jest from 29.5.6 to 29.5.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1153
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.9.0 to 6.9.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1154
* build(deps): bump undici from 5.27.0 to 5.27.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1157
* build(deps-dev): bump eslint from 8.52.0 to 8.53.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1156
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.9.1 to 6.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1159
* build(deps-dev): bump @typescript-eslint/parser from 6.9.1 to 6.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1158
* build(deps-dev): bump @types/jest from 29.5.7 to 29.5.8 by @dependabot in https://github.com/codecov/codecov-action/pull/1161
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.10.0 to 6.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1164
* build(deps-dev): bump @typescript-eslint/parser from 6.10.0 to 6.11.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1163
* build(deps): bump github/codeql-action from 2.22.5 to 2.22.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1167
* build(deps-dev): bump eslint from 8.53.0 to 8.54.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1166
* build(deps-dev): bump @types/jest from 29.5.8 to 29.5.9 by @dependabot in https://github.com/codecov/codecov-action/pull/1172
* build(deps-dev): bump typescript from 5.2.2 to 5.3.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1171
* build(deps-dev): bump @typescript-eslint/parser from 6.11.0 to 6.12.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1170
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.11.0 to 6.12.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1169
* build(deps): bump github/codeql-action from 2.22.7 to 2.22.8 by @dependabot in https://github.com/codecov/codecov-action/pull/1175
* build(deps): bump undici from 5.27.2 to 5.28.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1174
* build(deps-dev): bump @types/jest from 29.5.9 to 29.5.10 by @dependabot in https://github.com/codecov/codecov-action/pull/1173
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.12.0 to 6.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1178
* build(deps-dev): bump @typescript-eslint/parser from 6.12.0 to 6.13.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1180
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.13.0 to 6.13.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1181
* build(deps): bump undici from 5.28.0 to 5.28.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1179
* build(deps-dev): bump eslint from 8.54.0 to 8.55.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1183
* build(deps): bump undici from 5.28.1 to 5.28.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1182
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.13.1 to 6.13.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1185
* build(deps-dev): bump @typescript-eslint/parser from 6.13.1 to 6.13.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1184
* build(deps-dev): bump @types/jest from 29.5.10 to 29.5.11 by @dependabot in https://github.com/codecov/codecov-action/pull/1187
* build(deps): bump undici from 5.28.2 to 6.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1186
* build(deps-dev): bump typescript from 5.3.2 to 5.3.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1189
* build(deps): bump undici from 6.0.0 to 6.0.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1188
* build(deps): bump github/codeql-action from 2.22.8 to 2.22.9 by @dependabot in https://github.com/codecov/codecov-action/pull/1191
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.13.2 to 6.14.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1193
* build(deps-dev): bump @typescript-eslint/parser from 6.13.2 to 6.14.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1192
* build(deps-dev): bump eslint from 8.55.0 to 8.56.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1194
* build(deps): bump github/codeql-action from 2.22.9 to 3.22.11 by @dependabot in https://github.com/codecov/codecov-action/pull/1195
* build(deps): bump actions/upload-artifact from 3.1.3 to 4.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1196
* build(deps-dev): bump @typescript-eslint/parser from 6.14.0 to 6.15.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1198
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.14.0 to 6.15.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1197
* build(deps): bump undici from 6.0.1 to 6.2.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1199
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.15.0 to 6.17.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1206
* build(deps-dev): bump @typescript-eslint/parser from 6.15.0 to 6.17.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1205
* build(deps): bump undici from 6.2.0 to 6.2.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1201
* build(deps): bump github/codeql-action from 3.22.11 to 3.22.12 by @dependabot in https://github.com/codecov/codecov-action/pull/1200
* build(deps-dev): bump @typescript-eslint/parser from 6.17.0 to 6.18.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1208
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.17.0 to 6.18.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1207
* build(deps): bump undici from 6.2.1 to 6.3.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1211
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.18.0 to 6.18.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1210
* build(deps-dev): bump @typescript-eslint/parser from 6.18.0 to 6.18.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1209
* build(deps-dev): bump @typescript-eslint/parser from 6.18.1 to 6.19.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1215
* build(deps): bump github/codeql-action from 3.22.12 to 3.23.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1213
* build(deps): bump actions/upload-artifact from 4.0.0 to 4.1.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1212
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.18.1 to 6.19.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1214
* fix: downgrade undici as it has a breaking change by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1219
* fix: remove openpgp dep due to licensing and use gpg by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1218
* chore(ci): add fossa workflow by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1216
* build(deps): bump actions/upload-artifact from 4.1.0 to 4.2.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1222
* build(deps): bump github/codeql-action from 3.23.0 to 3.23.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1221
* build(deps-dev): bump @typescript-eslint/parser from 6.19.0 to 6.19.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1225
* build(deps-dev): bump ts-jest from 29.1.1 to 29.1.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1224
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.19.0 to 6.19.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1223
* build(deps): bump actions/upload-artifact from 4.2.0 to 4.3.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1232
* build(deps): bump github/codeql-action from 3.23.1 to 3.23.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1231
* build(deps-dev): bump @typescript-eslint/parser from 6.19.1 to 6.20.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1235
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.19.1 to 6.20.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1234
* chore(ci): bump to node20 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1236
* Update README.md by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1237
* Update package.json by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1238
* fix: allow for other archs by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1239
* fix: update action.yml by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1240

## New Contributors
* @dana-yaish made their first contribution in https://github.com/codecov/codecov-action/pull/943

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.6...v4.0.0

## v3.1.6
#**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.5...v3.1.6

## v3.1.5
### What's Changed
* action.yml: Update to Node.js 20 by @hallabro in https://github.com/codecov/codecov-action/pull/1228

## New Contributors
* @hallabro made their first contribution in https://github.com/codecov/codecov-action/pull/1228

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.4...v3.1.5

## v4.0.0-beta.3 (Prerelease)
### What's Changed
* build(deps-dev): bump jest from 29.6.4 to 29.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1082
* build(deps-dev): bump @types/jest from 29.5.4 to 29.5.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1092
* build(deps): bump github/codeql-action from 2.21.5 to 2.21.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1094
* build(deps-dev): bump @types/node from 20.6.0 to 20.6.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1093
* build(deps): bump openpgp from 5.10.1 to 5.10.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1096
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.7.0 to 6.7.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1095
* build(deps-dev): bump @types/node from 20.6.2 to 20.6.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1098
* build(deps-dev): bump @typescript-eslint/parser from 6.7.0 to 6.7.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1097
* feat: add plugins by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1099


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.0.0-beta.2...v4.0.0-beta.3

## v4.0.0-beta.2 (Prerelease)
### What's Changed
* not adding -n if empty to do-upload command by @dana-yaish in https://github.com/codecov/codecov-action/pull/1085
* 4.0.0-beta.2 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1086


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v4.0.0-beta.1...v4.0.0-beta.2

## 4.0.0-beta.1 (Prerelease)
#`v4` represents a move from the [universal uploader](https://github.com/codecov/uploader) to the [Codecov CLI](https://github.com/codecov/codecov-cli). Although this will unlock new features for our users, the CLI is not yet at feature parity with the universal uploader.

## Breaking Changes
- No current support for `aarch64` and `alpine` architectures.
- Tokenless uploading is unsuported
- Various arguments to the Action have been removed

## What's Changed
* build(deps): bump openpgp from 5.8.0 to 5.9.0 by @dependabot in https://github.com/codecov/codecov-action/pull/985
* build(deps): bump actions/checkout from 3.0.0 to 3.5.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1000
* build(deps): bump ossf/scorecard-action from 2.1.3 to 2.2.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1006
* build(deps): bump tough-cookie from 4.0.0 to 4.1.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1013
* build(deps-dev): bump word-wrap from 1.2.3 to 1.2.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1024
* build(deps): bump node-fetch from 3.3.1 to 3.3.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1031
* build(deps-dev): bump @types/node from 20.1.4 to 20.4.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1032
* build(deps): bump github/codeql-action from 1.0.26 to 2.21.2 by @dependabot in https://github.com/codecov/codecov-action/pull/1033
* build commit,report and upload args based on codecovcli by @dana-yaish in https://github.com/codecov/codecov-action/pull/943
* build(deps-dev): bump @types/node from 20.4.5 to 20.5.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1055
* build(deps): bump github/codeql-action from 2.21.2 to 2.21.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1051
* build(deps-dev): bump @types/node from 20.5.3 to 20.5.4 by @dependabot in https://github.com/codecov/codecov-action/pull/1058
* chore(deps): update outdated deps by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1059
* build(deps-dev): bump @types/node from 20.5.4 to 20.5.6 by @dependabot in https://github.com/codecov/codecov-action/pull/1060
* build(deps-dev): bump @typescript-eslint/parser from 6.4.1 to 6.5.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1065
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.4.1 to 6.5.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1064
* build(deps): bump actions/checkout from 3.5.3 to 3.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1063
* build(deps-dev): bump eslint from 8.47.0 to 8.48.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1061
* build(deps-dev): bump @types/node from 20.5.6 to 20.5.7 by @dependabot in https://github.com/codecov/codecov-action/pull/1062
* build(deps): bump openpgp from 5.9.0 to 5.10.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1066
* build(deps-dev): bump @types/node from 20.5.7 to 20.5.9 by @dependabot in https://github.com/codecov/codecov-action/pull/1070
* build(deps): bump github/codeql-action from 2.21.4 to 2.21.5 by @dependabot in https://github.com/codecov/codecov-action/pull/1069
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.5.0 to 6.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1072
* Update README.md by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1073
* build(deps-dev): bump @typescript-eslint/parser from 6.5.0 to 6.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1071
* build(deps-dev): bump @vercel/ncc from 0.36.1 to 0.38.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1074
* build(deps): bump @actions/core from 1.10.0 to 1.10.1 by @dependabot in https://github.com/codecov/codecov-action/pull/1081
* build(deps-dev): bump @typescript-eslint/eslint-plugin from 6.6.0 to 6.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1080
* build(deps): bump actions/checkout from 3.6.0 to 4.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1078
* build(deps): bump actions/upload-artifact from 3.1.2 to 3.1.3 by @dependabot in https://github.com/codecov/codecov-action/pull/1077
* build(deps-dev): bump @types/node from 20.5.9 to 20.6.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1075
* build(deps-dev): bump @typescript-eslint/parser from 6.6.0 to 6.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1079
* build(deps-dev): bump eslint from 8.48.0 to 8.49.0 by @dependabot in https://github.com/codecov/codecov-action/pull/1076
* use cli instead of node uploader by @dana-yaish in https://github.com/codecov/codecov-action/pull/1068
* chore(release): 4.0.0-beta.1 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/1084

## New Contributors
* @dana-yaish made their first contribution in https://github.com/codecov/codecov-action/pull/943

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.4...v4.0.0-beta.1

## 3.1.4
### What's Changed
* build(deps-dev): bump @types/node from 18.15.12 to 18.16.3 by @dependabot in https://github.com/codecov/codecov-action/pull/970
* Fix typo in README.md by @hisaac in https://github.com/codecov/codecov-action/pull/967
* fix: add back in working dir by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/971
* fix: CLI option names for uploader by @kleisauke in https://github.com/codecov/codecov-action/pull/969
* build(deps-dev): bump @types/node from 18.16.3 to 20.1.0 by @dependabot in https://github.com/codecov/codecov-action/pull/975
* build(deps-dev): bump @types/node from 20.1.0 to 20.1.2 by @dependabot in https://github.com/codecov/codecov-action/pull/979
* build(deps-dev): bump @types/node from 20.1.2 to 20.1.4 by @dependabot in https://github.com/codecov/codecov-action/pull/981
* release: 3.1.4 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/983

## New Contributors
* @hisaac made their first contribution in https://github.com/codecov/codecov-action/pull/967
* @kleisauke made their first contribution in https://github.com/codecov/codecov-action/pull/969

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.3...v3.1.4

## 3.1.3
### What's Changed
* build(deps-dev): bump jest-junit from 15.0.0 to 16.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/957
* build(deps): bump openpgp from 5.7.0 to 5.8.0 by @dependabot in https://github.com/codecov/codecov-action/pull/958
* build(deps-dev): bump @types/node from 18.15.10 to 18.15.12 by @dependabot in https://github.com/codecov/codecov-action/pull/959
* fix: allow for aarch64 build by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/960
* chore(release): bump to 3.1.3 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/961


**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.2...v3.1.3

## 3.1.2
### What's Changed
* build(deps): bump node-fetch from 3.2.4 to 3.2.10 by @dependabot in https://github.com/codecov/codecov-action/pull/835
* build(deps-dev): bump @types/node from 16.11.40 to 18.13.0 by @dependabot in https://github.com/codecov/codecov-action/pull/911
* build(deps-dev): bump @vercel/ncc from 0.34.0 to 0.36.1 by @dependabot in https://github.com/codecov/codecov-action/pull/900
* build(deps-dev): bump typescript from 4.7.4 to 4.9.5 by @dependabot in https://github.com/codecov/codecov-action/pull/905
* Update README.md by @stefanomunarini in https://github.com/codecov/codecov-action/pull/718
* build(deps): bump openpgp from 5.4.0 to 5.5.0 by @dependabot in https://github.com/codecov/codecov-action/pull/819
* build(deps): bump ossf/scorecard-action from 1.1.1 to 2.0.4 by @dependabot in https://github.com/codecov/codecov-action/pull/840
* build(deps): bump @actions/core from 1.9.1 to 1.10.0 by @dependabot in https://github.com/codecov/codecov-action/pull/841
* build(deps): bump @actions/github from 5.0.3 to 5.1.1 by @dependabot in https://github.com/codecov/codecov-action/pull/843
* build(deps): bump actions/upload-artifact from 3.1.0 to 3.1.2 by @dependabot in https://github.com/codecov/codecov-action/pull/896
* build(deps-dev): bump jest-junit from 13.2.0 to 15.0.0 by @dependabot in https://github.com/codecov/codecov-action/pull/872
* build(deps): bump node-fetch from 3.2.10 to 3.3.0 by @dependabot in https://github.com/codecov/codecov-action/pull/869
* build(deps): bump decode-uri-component from 0.2.0 to 0.2.2 by @dependabot in https://github.com/codecov/codecov-action/pull/879
* build(deps): bump json5 from 2.2.1 to 2.2.3 by @dependabot in https://github.com/codecov/codecov-action/pull/895
* codeql-analysis.yml by @minumulasri in https://github.com/codecov/codecov-action/pull/898
* build(deps): bump ossf/scorecard-action from 1.1.1 to 2.1.2 by @dependabot in https://github.com/codecov/codecov-action/pull/889
* build(deps-dev): bump @types/node from 18.13.0 to 18.14.0 by @dependabot in https://github.com/codecov/codecov-action/pull/922
* build(deps): bump openpgp from 5.5.0 to 5.7.0 by @dependabot in https://github.com/codecov/codecov-action/pull/924
* build(deps-dev): bump @types/node from 18.14.0 to 18.14.2 by @dependabot in https://github.com/codecov/codecov-action/pull/927
* Remove unsupported path_to_write_report argument by @jsoref in https://github.com/codecov/codecov-action/pull/851
* Update README to contain correct information - inputs and negate feature by @moshe-azaria-sage in https://github.com/codecov/codecov-action/pull/901
* build(deps-dev): bump @types/node from 18.14.2 to 18.14.6 by @dependabot in https://github.com/codecov/codecov-action/pull/933
* build(deps-dev): bump @types/node from 18.14.6 to 18.15.0 by @dependabot in https://github.com/codecov/codecov-action/pull/937
* build(deps-dev): bump @types/node from 18.15.0 to 18.15.5 by @dependabot in https://github.com/codecov/codecov-action/pull/945
* build(deps): bump node-fetch from 3.3.0 to 3.3.1 by @dependabot in https://github.com/codecov/codecov-action/pull/938
* build(deps-dev): bump @types/node from 18.15.5 to 18.15.6 by @dependabot in https://github.com/codecov/codecov-action/pull/946
* build(deps-dev): bump @types/node from 18.15.6 to 18.15.10 by @dependabot in https://github.com/codecov/codecov-action/pull/947
* build(deps): bump ossf/scorecard-action from 2.1.2 to 2.1.3 by @dependabot in https://github.com/codecov/codecov-action/pull/951
* fix: add in all the extra arguments for uploader by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/955
* chore(release): bump to 3.1.2 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/956

## New Contributors
* @stefanomunarini made their first contribution in https://github.com/codecov/codecov-action/pull/718
* @minumulasri made their first contribution in https://github.com/codecov/codecov-action/pull/898
* @jsoref made their first contribution in https://github.com/codecov/codecov-action/pull/851
* @moshe-azaria-sage made their first contribution in https://github.com/codecov/codecov-action/pull/901

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.1...v3.1.2

## 3.1.1
### What's Changed
* Update deprecation warning by @slifty in https://github.com/codecov/codecov-action/pull/661
* Create codeql-analysis.yml by @mitchell-codecov in https://github.com/codecov/codecov-action/pull/593
* build(deps): bump node-fetch from 3.2.3 to 3.2.4 by @dependabot in https://github.com/codecov/codecov-action/pull/714
* build(deps-dev): bump typescript from 4.6.3 to 4.6.4 by @dependabot in https://github.com/codecov/codecov-action/pull/713
* README: fix typo by @Evalir in https://github.com/codecov/codecov-action/pull/712
* build(deps): bump github/codeql-action from 1 to 2 by @dependabot in https://github.com/codecov/codecov-action/pull/724
* build(deps-dev): bump @types/jest from 27.4.1 to 27.5.0 by @dependabot in https://github.com/codecov/codecov-action/pull/717
* fix: Remove a blank row by @johnmanjiro13 in https://github.com/codecov/codecov-action/pull/725
* Update README.md with correct badge version by @gsheni in https://github.com/codecov/codecov-action/pull/726
* build(deps-dev): bump @types/node from 17.0.25 to 17.0.33 by @dependabot in https://github.com/codecov/codecov-action/pull/729
* build(deps-dev): downgrade @types/node to 16.11.35 by @dependabot in https://github.com/codecov/codecov-action/pull/734
* build(deps): bump actions/checkout from 2 to 3 by @dependabot in https://github.com/codecov/codecov-action/pull/723
* build(deps): bump @actions/github from 5.0.1 to 5.0.3 by @dependabot in https://github.com/codecov/codecov-action/pull/733
* build(deps): bump @actions/core from 1.6.0 to 1.8.2 by @dependabot in https://github.com/codecov/codecov-action/pull/732
* build(deps-dev): bump @types/node from 16.11.35 to 16.11.36 by @dependabot in https://github.com/codecov/codecov-action/pull/737
* Create scorecards-analysis.yml by @mitchell-codecov in https://github.com/codecov/codecov-action/pull/633
* build(deps): bump ossf/scorecard-action from 1.0.1 to 1.1.0 by @dependabot in https://github.com/codecov/codecov-action/pull/749
* fix: add more verbosity to validation by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/747
* build(deps-dev): bump typescript from 4.6.4 to 4.7.3 by @dependabot in https://github.com/codecov/codecov-action/pull/755
* Regenerate scorecards-analysis.yml by @mitchell-codecov in https://github.com/codecov/codecov-action/pull/750
* build(deps-dev): bump @types/node from 16.11.36 to 16.11.39 by @dependabot in https://github.com/codecov/codecov-action/pull/759
* build(deps-dev): bump @types/node from 16.11.39 to 16.11.40 by @dependabot in https://github.com/codecov/codecov-action/pull/762
* build(deps-dev): bump @vercel/ncc from 0.33.4 to 0.34.0 by @dependabot in https://github.com/codecov/codecov-action/pull/746
* build(deps): bump ossf/scorecard-action from 1.1.0 to 1.1.1 by @dependabot in https://github.com/codecov/codecov-action/pull/757
* build(deps): bump openpgp from 5.2.1 to 5.3.0 by @dependabot in https://github.com/codecov/codecov-action/pull/760
* build(deps): bump actions/upload-artifact from 2.3.1 to 3.1.0 by @dependabot in https://github.com/codecov/codecov-action/pull/748
* build(deps-dev): bump typescript from 4.7.3 to 4.7.4 by @dependabot in https://github.com/codecov/codecov-action/pull/766
* Switch to v3 by @thomasrockhu in https://github.com/codecov/codecov-action/pull/774
* Fix `network` entry in table by @kevmoo in https://github.com/codecov/codecov-action/pull/783
* Trim arguments after splitting them by @mitchell-codecov in https://github.com/codecov/codecov-action/pull/791
* build(deps): bump openpgp from 5.3.0 to 5.4.0 by @dependabot in https://github.com/codecov/codecov-action/pull/799
* build(deps): bump @actions/core from 1.8.2 to 1.9.1 by @dependabot in https://github.com/codecov/codecov-action/pull/798
* Plumb failCi into verification function. by @RobbieMcKinstry in https://github.com/codecov/codecov-action/pull/769
* release: update changelog and version to 3.1.1 by @thomasrockhu-codecov in https://github.com/codecov/codecov-action/pull/828

## New Contributors
* @slifty made their first contribution in https://github.com/codecov/codecov-action/pull/661
* @Evalir made their first contribution in https://github.com/codecov/codecov-action/pull/712
* @johnmanjiro13 made their first contribution in https://github.com/codecov/codecov-action/pull/725
* @gsheni made their first contribution in https://github.com/codecov/codecov-action/pull/726
* @kevmoo made their first contribution in https://github.com/codecov/codecov-action/pull/783
* @RobbieMcKinstry made their first contribution in https://github.com/codecov/codecov-action/pull/769

**Full Changelog**: https://github.com/codecov/codecov-action/compare/v3.1.0...v3.1.1

## v3.1.0
### 3.1.0
### Features
- #699 Incorporate `xcode` arguments for the Codecov uploader

### Dependencies
- #694 build(deps-dev): bump @vercel/ncc from 0.33.3 to 0.33.4
- #696 build(deps-dev): bump @types/node from 17.0.23 to 17.0.25
- #698 build(deps-dev): bump jest-junit from 13.0.0 to 13.2.0

## v3.0.0
#### Breaking Changes
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

## v2.1.0
### 2.1.0
### Features
- #515 Allow specifying version of Codecov uploader

### Dependencies
- #499 build(deps-dev): bump @vercel/ncc from 0.29.0 to 0.30.0
- #508 build(deps): bump openpgp from 5.0.0-5 to 5.0.0
- #514 build(deps-dev): bump @types/node from 16.6.0 to 16.9.0

## v2.0.3
### 2.0.3
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

## v2.0.2
#### Fixes
- Underlying uploader fixes issues with tokens not being sent properly for users seeing
`Error!: Error: Error uploading to https://codecov.io: Error: Error uploading to Codecov: Error: Not Found`
- #432 fix: use import to destructure package.json
- #434 fix: openpgp and asn1.js
- #440 2.0.2 token fixes

### Dependencies
- #420 Bump eslint from 7.30.0 to 7.31.0
- #433 build(deps-dev): bump @types/node from 16.3.3 to 16.4.0
- #425 build(deps-dev): bump @typescript-eslint/eslint-plugin from 4.28.3 to 4.28.4
- #426 build(deps-dev): bump @typescript-eslint/parser from 4.28.3 to 4.28.4
- #438 Set up Dependabot for github-actions dependencies



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