# boutiq.native
Boutiq.Travel with React Native

Dependencies:
Make sure you have following dependencies:
* [nodejs](https://nodejs.org/en/download/package-manager/) and npm
* react-native-cli (`npm install -g react-native-cli`)
* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)

Steps for setting up boutiq.native for Android:

1. Download and install [Android Studio](https://developer.android.com/studio/install.html)
2. For Linux: (Install the AVD and configure VM acceleration) and For Mac: (Install the AVD and [HAXM](https://software.intel.com/en-us/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-windows))
3. If you want to debug your app on physical device. Install [ADB](http://www.howtogeek.com/125769/how-to-install-and-use-abd-the-android-debug-bridge-utility/)
  ADB commonly used commands
     + `adb kill-server`  - kill adb server
     + `adb start-server` - start adb server
     + `adb devices` - list connected devices
     + `adb reverse tcp:8081 tcp:8081` - to allow adb devices to listen on port 8081
4. Install the Android 6.0 (Marshmallow) SDK
5. Set up the ANDROID_HOME environment variable

    Add the following lines to your ~/.bashrc (or equivalent) config file:

    `export ANDROID_HOME=~/Android/Sdk
    export PATH=${PATH}:${ANDROID_HOME}/tools
    export PATH=${PATH}:${ANDROID_HOME}/platform-tools`

Please refer [React Native installation guide](https://facebook.github.io/react-native/docs/getting-started.html) for detailed installation instructions of AVD.


Compiling and building project:

For compiling and building apk use: `react-native run-android`
To Start project use: `react-native start`

If you get below error while building apk:

>> Execution failed for task ':app:installDebug'.
>> > com.android.builder.testing.api.DeviceException: No connected devices!

use manual apk installation to `adb` devices using:
`adb install android/app/build/outputs/apk/app-debug.apk`


## WARNING

### Issue due react-native-share
We have to use react-native-share 1.0.17 until RN updated. Edit `components/Overlay.js` in the node modules as the following: https://github.com/wasedaigo/react-native-share/commit/398aa738c8d3fc7de4f43f1c158dc3866313b1c2
