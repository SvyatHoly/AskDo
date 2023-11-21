#!/usr/bin/env bash
# !Don't forget update bootstrap.sh in the sweatcoin repo if you change this file
set -e

if ! hash brew 2>/dev/null; then
  echo "Brew is not installed.. Installing..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  source ~/.zprofile
fi

if ! hash asdf 2>/dev/null; then
  echo "Asdf is not installed. Installing..."
  eval "brew install asdf"
  echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc
  source ~/.zshrc
fi

echo "Running asdf install"
if [ ! -f ~/.asdfrc ]; then
  echo "legacy_version_file = yes" >> ~/.asdfrc
fi
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git || true
asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git || true
asdf install

if ! hash bundler 2>/dev/null; then
  echo "Bundler is not installed. Installing"
  gem install bundler
fi

if ! hash yarn 2>/dev/null; then
  echo "Yarn is not installed. Installing..."
  eval "brew install yarn"
fi

if ! hash watchman 2>/dev/null; then
  echo "Watchman is not installed. Installing..."
  eval "brew install watchman"
fi

if ! hash swiftlint 2>/dev/null; then
  echo "Swiftlint is not installed. Installing..."
  eval "brew install swiftlint"
fi

if ! hash ccache 2>/dev/null; then
  echo "Ccache is not installed. Installing..."
  eval "brew install ccache"
fi

if ! hash git-lfs 2>/dev/null; then
  echo "git-lfs is not installed. Installing..."
  eval "brew install git-lfs"
  git-lfs install
fi

if ! hash xcodes 2>/dev/null; then
   echo "xcodes is not installed. Installing..."
   eval "brew install xcodesorg/made/xcodes"
fi

if ! hash tuist 2>/dev/null; then
   echo "tuist is not installed. Installing..."
   eval "curl -Ls https://install.tuist.io | bash"
fi

#additional Java setup to build android app without Android Studio
brew tap homebrew/cask-versions
brew install --cask zulu11

echo "Running bundle install"
bundle install

echo "Downloading provision profiles"
bundle exec fastlane match development --readonly

echo "Running git submodule update --init --recursive"
git submodule update --init --recursive

echo "Running yarn install"
yarn install

echo "✅ All good!"