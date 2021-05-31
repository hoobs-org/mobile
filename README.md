![](https://raw.githubusercontent.com/hoobs-org/HOOBS/master/docs/logo.png)

## HOOBS Mobile
The HOOBS mobile application is a client for your HOOBS instances on your Raspberry Pi or other devices. It communicates with the built in API in HOOBS Server.

## Enviornment Setup
In order to build and emulate both the iOS and Android app. You need to install some packages. You also need to setup a fed enviornment variables.

 1. Install XCode from the App Store

 2. Open XCode and install Command Line tools

 3. Download and install Android Studio
    https://developer.android.com/studio

 4. Download and install JDK 1.8
   https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html

 5. Run
    ```sh
    /usr/libexec/java_home -V
    ```

    find the version called "Java SE 8" and copy the version
    > example: 1.8.0_291

 6. Set JAVA_HOME
    ```sh
    JAVA_HOME export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_291`
    ```

    > -v 1.8.0_291 comes from the previous step

 7. Install homebrew is you havent
    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

 8. Install gradle
    ```sh
    brew install gradle
    ```

 9. Edit or create ~/.bash_profile
    ```sh
    nano ~/.bash_profile
    ```

    Then and add these values
    ```sh
    export ANDROID_HOME=~/Library/Android/sdk
    export ANDROID_SDK_ROOT=~/Library/Android/sdk
    export ANDROID_AVD_HOME=~/.android/avd
    export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$PATH
    ```

10. Load profile
    ```sh
    source ~/.bash_profile
    ```

11. Install Cordova.
    ```sh
    sudo npm install -g cordova
    ```

12. Add supported platforms. This needs to be ran from the project root.
    ```sh
    cd ~/HOOBS/mobile
    cordova platform add android
    cordova platform add ios
    ```

## Building
This project has a tool chain. To build simply run this command frmo the project root.

```sh
yarn build
```

The tool chaian will ask you which platform to build.

## Emulation
The tool chain can build and start the app in an emulator.

```sh
yarn debug
```

The tool chain will ask you which platform you want to start. The supported platforms are;
* Android
* iOS
* Browser

> The browser platform is used to leverage the live updating when developing.

## Legal
HOOBS and the HOOBS logo are registered trademarks of HOOBS Inc. Copyright (C) 2020 HOOBS Inc. All rights reserved.
