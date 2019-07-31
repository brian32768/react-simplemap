#!/bin/bash

#
# Run this script to publish a new version of the library to npm.  This requires
# that you have a clean working directory and have created a tag that matches
# the version number in package.json.
#
set -o errexit

#
# Where the unpublished-but-prepped package is living.
#
BUILT_PACKAGE=build/@map46/react-simplemap

#
# URL for canonical repo.
#
REMOTE=git@github.com:brian32768/react-simplemap.git

#
# Display usage and exit.
#
display_usage() {
  cat <<-EOF

  Usage: ${1} <version>

  To publish a new release, update the version number in package.json and
  create a tag for the release. Normally you can do this with the
  "npm release {minor|patch}" command. That will bump the version,
  update package.json, and create the matching tag in github.

EOF
}

#
# Exit if the current working tree is not clean.
#
assert_clean() {
  source `git --exec-path`/git-sh-setup && \
      require_clean_work_tree "publish" "Please commit or stash them."
}

#
# Exit if the requested version doesn't match package.json.
#
assert_version_match() {
  v=`grep -o '"version":.*' package.json | sed 's/"version": *"\(.*\)",/\1/'`
  if test "${1}" != "${v}"; then
    echo "Version mismatch: requested '${1}', but package.json specifies '${v}'"
    exit 1
  fi
}

#
# Check out the provided tag.  This ensures that the tag has been pushed to
# the canonical remote.
#
checkout_tag() {
  git fetch ${REMOTE} refs/tags/v${1}:refs/tags/v${1}
  git checkout refs/tags/v${1}
}

#
# Build the package and publish.
#
main() {
  root=$(cd -P -- "$(dirname -- "${0}")" && pwd -P)/..
  cd ${root}
  assert_clean
  checkout_tag ${1}
  assert_version_match ${1}
  npm install
  npm run build-package
  cd ${BUILT_PACKAGE}
  npm publish
}

if test ${#} -ne 1; then
  display_usage ${0}
  exit 1
else
  main ${1}
fi
