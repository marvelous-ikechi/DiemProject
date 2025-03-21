This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.


- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run your React Native App. :partying_face:

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# How to use project
You can sign up with the `sign up with google` button using your email or you can use input a valid `email` and `password` into the email and password fields respectively.

If you don't already have an account, a new account will be created for you. If you don't want to create a new account you can use the login details:

```
email: testemail@gmail.com
password: password
```

This project contains push notifications setup from `react-native-push-notification`, however, notifications are only received on android. Reason being that IOS requires a paid apple developer account which I don't have access to at the moment. 

The push notification works on background, foreground, and when the app is cleared from history. Push notifications can be sent via firebase console.

Push notifications with additional object like pokemon name and url, when clicked opens PokemonDetails screen.

A pokemon can be caught and released from the home-screen. All caught pokemons can also be viewed from the Profile screen.

**Pokemon animation**
long-pressing a pokemon in the caught Pokemons screen moves the pokemon to the right by 20px; when it is at the end of the screen, the pokemon item resumes at the beginning of the screen.

**Home screen**
Pressing each pokemon on the homes screen opens a bottomsheet containing brief information of a pokemon.

Catch Pokemon button adds a pokemon to the global caught pokemon list.

View Pokemon button opens the pokemon details screen.

