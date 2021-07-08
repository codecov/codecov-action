# Adding a new CI provider

1. View https://github.com/codecov/uploader/blob/master/src/ci_providers/provider_template.js
2. Collect the needed enviromental variables for each section (you can use provider_circleci.js if you get confused)
3. Copy provider_template.js and fill it in.
4. Add your new providers list in https://github.com/codecov/uploader/blob/master/src/ci_providers/index.js
5. Copy test/providers/provider_template.test.js and fill it in.
6. Ensure 100% code coverage on the new provider code.
7. Open a PR and we'll take a look!
