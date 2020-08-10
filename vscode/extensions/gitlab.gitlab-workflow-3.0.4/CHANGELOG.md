# CHANGELOG

## v3.0.4 - 2020-07-03

- Increased interval for polling pipelines and merge requests for a branch [#211](https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/issues/211)

## v3.0.3 - 2020-06-29

- No user-facing changes.
- Fixed automated releasing of the extension [#206](https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/issues/206)

## v3.0.0 - 2020-06-25

- Support multi root workspaces.
- Enable custom queries in GitLab panel.
- Improvements to the issue and merge request webview.
- Adds gitlab icon as webview tab icon.
- Improve remote URL parsing to support non standard Gitlab usernames.
- Update Extension Icon to match the new vscode-codicons.

### Fixed

- Click on merge request "for current branch" doesn't do anything
- Unable to create Snippets [#195](https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/issues/195)
  - Fixed by [@massimeddu](https://gitlab.com/massimeddu) with [MR !62](https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/merge_requests/62) 👍

## v2.2.2 - 2020-06-19

- Fix dependency issues caused by publishing the extension using `yarn`

## v2.2.1 - 2020-06-19

### Security

- [CVE-2020-13279](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-13279) Prevent possible client side code execution, https://gitlab.com/gitlab-org/gitlab-vscode-extension/-/issues/170

## v2.2.0 - 2019-11-06

- [Experimental Feature](https://gitlab.com/fatihacet/gitlab-vscode-extension#experimental-features): View Merge Request details and comments in VSCode. Click a Merge Request link from the sidebar and VSCode will open a new tab to show the Merge Request details. You can also directly comment on the Merge Request.

## v2.1.1 - 2019-07-10

### Fixed

- Showing issue details and discussions in VSCode was not working properly. Extension was only showing loading screen.

## v2.1.0 - 2019-05-10

### Fixed

- Ensure that WebView is fully loaded before sending message
  - Fixed by [@Grafexy](https://gitlab.com/Grafexy) with [MR !39](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/39) 👍
- Create public snippet when there is no GitLab project in open workspace
  - Fixed by [@ttilberg](https://gitlab.com/ttilberg) with [MR !38](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/38) 👍

### Documentation updates

- [@renestalder](https://gitlab.com/renestalder) improved documentation for additional custom domain information with [MR !35](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/35) 👍
- [@jparkrr](https://gitlab.com/jparkrr) fixed some typos with [MR !36](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/36) 👍

## v2.0.0 - 2019-02-14

- [Experimental Feature](https://gitlab.com/fatihacet/gitlab-vscode-extension#experimental-features): View issue details and comments right in the VSCode. Click an issue link from the sidebar and VSCode will open a new tab to show the issue details. You can also comment to the issue from VSCode.

## v1.9.3 - 2019-02-05

### Fixed

- Fix broken v1.9.2 by including require package
  - Fixed by [@swiffer](https://gitlab.com/swiffer) with [MR !33](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/33) 👍

## v1.9.2 - 2019-02-05 (Please skip this version and upgrade to v1.9.3)

### Fixed

- Node 8.5/8.6 request bug, moved vscode to devDependencies and upgraded npm packages
  - Fixed by [@swiffer](https://gitlab.com/swiffer) with [MR !32](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/32) 👍

### Changed

- [#85](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/85) Print URLs in "No token found" warning
  - This was done for troubleshooting purposes. A lot of people are having hard time to configure the instance url and hopefully this will give them a clue to understand what's going wrong.

## v1.9.1 - 2019-01-18

### Fixed

- [#28](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/28) Creating a snippet doesn't work when only 2 lines selected
  - Fixed by by [@joshanne](https://gitlab.com/joshanne) with [MR !30](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/30) 👍

## v1.9.0 - 2019-01-17

### Added

- Support for crt/key pair certificates for users that may use a \*.p12 certificate
  - Implemented by [@joshanne](https://gitlab.com/joshanne) with [MR !29](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/29) 👍

## v1.8.0 - 2019-01-02

### Added

- A new panel in the GitLab sidebar to show all MRs in the current project
  - Implemented by [@jkdufair](https://gitlab.com/jkdufair) with [MR !27](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/27) 👍

## v1.7.0 - 2018-12-13

### Added

- Ability to work with the non-root domains for self hosted GitLab instances.
  - Implemented by [@tuomoa](https://gitlab.com/tuomoa) with [MR !11](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/11) 👍
  - Special thanks to [@Turmio](https://gitlab.com/Turmio) for helping to test this. 👍

## v1.6.0 - 2018-12-12

### Security

- Fixed NPM security issues

### Added

- Pipeline notification on the status bar will now include the list of running and failed jobs
  - Implemented by [@jduponchelle](https://gitlab.com/jduponchelle) with [MR !23](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/23) 👍

### Fixed

- Refresh buttons on the sidebar were visible for all panes and even for other extensions.
  - Fixed by [@Logerfo](https://gitlab.com/Logerfo) with [MR !26](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/26) 👍

## v1.5.1 - 2018-11-28

### Fixed

- View in GitLab button in the pipeline updated notification was not visible
  - Fixed by [@Clapfire](https://gitlab.com/Clapfire) with [MR !24](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/24) 👍

## v1.5.0 - 2018-11-08

### Added

- A new config option to fetch pipeline data from a different Git remote [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#configuration-options)
  - Implemented by [@jduponchelle](https://gitlab.com/jduponchelle) with [MR !22](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/22) and closes [Issue #59](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/59) 👍

## v1.4.0 - 2018-11-06

### Added

- A new config option to toggle pipeline status change notifications [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#configuration-options)

### Changed

- Pipeline notifications introduced in v1.3.0 will not be on by default with this version. You need to manually set the option to true.

## v1.3.0 - 2018-11-05

### Added

- A new config option to set remote name manually [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#configuration-options)
  - Implemented by [@jduponchelle](https://gitlab.com/jduponchelle) with [MR !18](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/18) 👍
- Extension will show a notification after pipeline status changed
  - Implemented by [@Clapfire](https://gitlab.com/Clapfire) with [MR !21](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/21) and closes [Issue #32](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/32) 👍

### Changed

- Pipeline action will not open the pipeline on the default browser
  - Changed by [@Clapfire](https://gitlab.com/Clapfire) with [MR !20](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/20) and closes [#31](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/31) 👍

## v1.2.0 - 2018-10-03

### Added

- A new config option to toggle MR status on status bar [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#configuration-options)
  - Implemented by [@robinvoor](https://gitlab.com/robinvoor) with [MR !15](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/15) 👍

## v1.1.1 - 2018-10-03

### Fixed

- Invalid date parsing for unfinished pipelines.

## v1.1.0 - 2018-10-02

### Added

- A new config option to toggle GitLab related links on the status bar [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#configuration-options)
  - Implemented with [this commit](https://gitlab.com/fatihacet/gitlab-vscode-extension/commit/6318028f1d3959ee0f70d22bb31b68bcbc4a998c) closes [#58](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/58)

### Fixed

- [#57](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/57) Can't use extension with self-hosted gitlab - scope validity
  - Fixed with [this commit](https://gitlab.com/fatihacet/gitlab-vscode-extension/commit/cf2fafec91df042ada35609848f251b6ebb02aeb)

## v1.0.0 - 2018-09-26

### Added

- A new panel on the sidebar to see the list of your issues and MRs alongside with the links and informations for your current branch. [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#sidebar)

### Fixed

- [#41](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/41) Extension not opening the pipeline from command pallete
  - Fixed with [this commit](https://gitlab.com/fatihacet/gitlab-vscode-extension/commit/080a8c609f57df19b093dcfd0ec44cf89e7f5790)
- Respect VSCode http.proxy settings
  - Implemented by [@martianboy](https://gitlab.com/martianboy) with [MR !13](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/13) 👍

## v0.6.0 - 2018-03-02

### Added

- A new config option named `gitlab.ca` to set self signed certificates. [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#configuration-options)
- A new config option named `gitlab.ignoreCertificateErrors` to ignore certificate errors while connecting and fetching data from GitLab instance. [Read more](https://gitlab.com/fatihacet/gitlab-vscode-extension#configuration-options)

### Fixed

- [#26](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/26) Support for on-premises GitLab instances with self-signed
  - Fixed by [@piec](https://gitlab.com/piec) with [MR !8](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/8) 👍
  - Possibily fixes [#23](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/23) and [#10](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/10)
- [#29](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/29) Support for on-premises GitLab instances with no certification (http)

## v0.5.2 - 2018-03-01

### Added

- GitLab Workflow now supports multiple instances.
  - Implemented by [@csvn](https://gitlab.com/csvn) with [MR !5](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/5) 👍
- ESLint and Prettier integration for dev environment.
  - Added by [@alpcanaydin](https://gitlab.com/alpcanaydin) with [MR !6](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/6) 👍

### Changed

- Private Access Token set and remove flow changed. We automatically migrate existing keys so this change shouldn't break your existing workflow or you shouln't need to do anyhing. Read more [here](https://gitlab.com/fatihacet/gitlab-vscode-extension#setup) and [here](https://gitlab.com/fatihacet/gitlab-vscode-extension#multiple-gitlab-instances).

## v0.5.1 - 2018-02-27

### Added

- Add an option to turn off the issue link in the status bar

## v0.5.0 - 2018-02-25

### Added

- [#25](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/25) Create snippet from selection or entire file.
- [#22](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/22) Add support for .gitlab-ci.yml lint-ing
- [#20](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/20) Added Read more and Set token now buttons to token ask notification.

## v0.4.3 - 2018-02-19

### Fixed

- [#19](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/19) Can't add token

## v0.4.2 - 2018-02-18

### Added

- 🎉 [New logo](https://gitlab.com/fatihacet/gitlab-vscode-extension/raw/master/src/assets/logo.png) _Special thanks to [@ademilter](https://twitter.com/ademilter) for his amazing work_ 👍

### Fixed

- [#14](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/14) GitLab: Open active file on GitLab - workspace path not filtered out
  - Fixed by [@swiffer](https://gitlab.com/swiffer) with [MR !1](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/1) 👍
- [#16](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/16) Does not work witch projects in subgroup
  - Fixed by [@AmandaCameron](https://gitlab.com/AmandaCameron) with [MR !3](https://gitlab.com/fatihacet/gitlab-vscode-extension/merge_requests/3) 👍

## v0.4.1 - 2018-02-10

### Fixed

- [#17](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/17) Cross project closing issue goes to wrong URL.

## v0.4.0 - 2018-02-02

### Added

- Added search feature for MRs and Issues. Supports basic and advanced search.
  - For basic search, just type anything and hit Enter. Extension will search in title and description fields of MRs and issues.
  - For advanced search, you can use multiple tokens to search issues and MRs where tokens can be `title`, `author`, `assignee`, `labels`, `label`, `milestone`, `state`, `scope`. Some example usages:
    - discussions refactor
    - title: discussions refactor author: fatihacet labels: frontend, performance milestone: 10.5
    - title: group labels author: annabeldunstone assignee: timzallmann label: frontend
- Added closing issue link of current MR to status bar and clicking it will open related issue on GitLab.
- Added compare current branch with master feature.
- Added MIT License

### Changed

- Pipeline not found text on status bar will be hidden if there is no GL project.
- Significantly reduced timing of opening current MR from status bar.

## v0.3.4 - 2018-02-01

### Fixed

- [#12](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/12) Fix fetching git remote and tracking branch names.

## v0.3.3 - 2018-02-01

### Fixed

- Fixed slient failing of status bar items and hide them on error.

## v0.3.2 - 2018-01-31

### Fixed

- Fixed fetching remote url. Thanks to @kushalpandya.

## v0.3.1 - 2018-01-30

### Changed

- Clicking the pipeline status text on status bar now opens Pipeline action picker.

## v0.3.0 - 2018-01-30

### Added

- Pipeline actions picker
  - View latest pipeline on GitLab.com
  - Create a new pipeline for your current branch
  - Retry last pipeline
  - Cancel last pipeline

## v0.2.2 - 2018-01-29

### Added

- Added a new command to open current pipeline on GitLab.
- Added click handler to pipeline status text on status bar to open pipeline on GitLab.
- Added refresh interval for MR link on status bar.

### Fixed

- [#9](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/9) Branch names with slashes appear to break URL generation

## v0.2.1 - 2018-01-28

### Fixed

- Update pipeline status on status bar.

## v0.2.0 - 2018-01-27

### Added

- Added a new service layer to opearate git commands.
- Added a new service layer to talk with GitLab API.
- Added new methods to get info from Git and GitLab.
- Added Personal Access Token flow providing menu options to save and delete GitLab PAT.
- Implemented MR link on status bar and add click handler to open MR on GitLab.
- Implemented pipeline status on status bar.
- Implemented open active file on GitLab including active line number and selection.
- Implemented open current MR on GitLab.
- Implemented open GitLab to create new merge request.
- Implemented open GitLab to create new issue.

### Changed

- Deprecated `gitlab.userId`.
- Show assigned Issues and MRs now work project specific.

### Fixed

- [#7](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/7) Remove hardcoded origin in fetchGitRemote method.
- [#3](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/3) Assigned MR and issues openers should be project specific
- [#1](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/1) Local branch name and tracking remote branch name may not be the same
- [#8](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/8) API URL is hardcoded
- [#4](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/4) Remove pipes `|` from git commands
- [#5](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/5) Pipeline info won't be visible in status bar if there is no MR
- [#2](https://gitlab.com/fatihacet/gitlab-vscode-extension/issues/4) Remove own MR requirement to find branch MR

## v0.1.1 - 2018-01-25

### Added

- Implemented show issues assigned to me.
- Implemented show merge requests assigned to me.
