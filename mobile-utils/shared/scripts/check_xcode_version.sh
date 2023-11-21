#!/bin/sh
set -e

REQUIRED_XCODE_VERSION=$(cat .xcode-version)
SELECTED_VERSION=$(/usr/bin/xcodebuild -version | grep Xcode | awk '{print $2}')

if [ -n "$SKIP_CHECK_XCODE_VERSION" ]; then
    echo "SKIP_CHECK_XCODE_VERSION exists. Exiting..."
    exit 0
fi

if [[ "$SELECTED_VERSION" != "$REQUIRED_XCODE_VERSION" ]]; then
    echo "Required Xcode version: $REQUIRED_XCODE_VERSION"
    echo "Installed Xcode version: $SELECTED_VERSION"
    echo "The installed Xcode version does not match the required version."

    # Check if running in TeamCity CI
    if [[ -n "$TEAMCITY_VERSION" ]]; then
        echo "Please install and select required xcode version with command \`xcodes install && xcodes select\` in ios/ directory"
        exit 1
    else
        # Running on a local machine
        read -p "Do you want to install the required Xcode version? (y/n) " choice

        if [[ $choice =~ ^[Yy]$ ]]; then
            if ! command -v xcodes &> /dev/null; then
                echo "xcodes is not installed."
                read -p "Do you want to install xcodes? (y/n) " choice
                if [[ $choice =~ ^[Yy]$ ]]; then
                    echo "Installing xcodes..."
                    brew install xcodesorg/made/xcodes
                else
                    echo "Aborted. Please install xcodes manually."
                    exit 1
                fi
            fi
            xcodes install "$REQUIRED_XCODE_VERSION"
            xcodes select "$REQUIRED_XCODE_VERSION"
        else
            echo "Aborted. Please install the required Xcode version manually."
            exit 1
        fi
    fi
else
    echo "Xcode version is already set to $SELECTED_VERSION."
fi
