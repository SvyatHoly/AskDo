#! /bin/bash

DEVICE_NAME="Pixel_API_31"

function setup_android_emulator() {
    adb_start_stop
    create_android_emulator
}

function adb_start_stop() {
    echo "ADB Start Stop"
    adb start-server
    adb devices
    adb devices | grep emulator | cut -f1 | while read line; do adb -s $line emu kill; done
    adb kill-server
}

function create_android_emulator() {
    if emulator -list-avds | grep -q $DEVICE_NAME; then
        echo "'${DEVICE_NAME}' Android virtual device already exists."
    else

        AVD_ARCH="x86_64"
        HOST_ARCH=$(arch)

        if [ "$HOST_ARCH" == "arm64" ]; then
            AVD_ARCH="arm64-v8a"
        fi

        PACKAGE="system-images;android-31;default;$AVD_ARCH"

        "sdkmanager" --install $PACKAGE
        "avdmanager" create avd --name "$DEVICE_NAME" --package $PACKAGE --device pixel_5

        echo "Android virtual device successfully created: ${DEVICE_NAME}"
    fi
}
