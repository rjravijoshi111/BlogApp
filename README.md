# BlogApp

<img src="src/assets/logo.png" alt="BlogApp Logo" width="200" height="200" />

**BlogApp** is a React Native application built with TypeScript that allows authenticated users to view blog posts. The app features a seamless user experience with tab navigation and state persistence, ensuring that your data remains intact across sessions.

## Features

- **User Authentication**
  - Sign up and log in functionalities.
  
- **Blog Viewing**
  - **BlogsList:** Displays all blog posts.
  - **Blogs Details:** Displays blog details.
  
- **Navigation**
  - **Stack Navigation** for navigating between screens.
  
- **State Management**
  - Utilizes **Redux Toolkit** for efficient state management.
  - **Redux Persist** ensures that the app's state is persisted across sessions.
  
- **Responsive Design**
  - Consistent and adaptive UI across different devices and screen sizes.
  
- **Error Handling**
  - Comprehensive error messages and alerts for better user experience.

## Technologies Used

- **React Native**: Framework for building native apps using React.
- **TypeScript**: Adds static typing to JavaScript for better code quality and maintainability.
- **Redux Toolkit**: Simplifies Redux state management.
- **Redux Persist**: Persists the Redux store across app reloads.
- **React Navigation**: Manages in-app navigation with stack and tab navigators.
- **Formik & Yup**: Handles form state and validation.
- **i18next & react-i18next**: Provides localization support.
- **Ionicons**: Icon library for React Native.
- **Styled Components / StyleSheet**: Manages component styling.


## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **React Native CLI**: For running the app on your device/emulator.
- **Xcode** (for iOS) or **Android Studio** (for Android): Required for running the app on simulators/emulators.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/BlogApp.git
   cd BlogApp

2. **Install Dependencies**

   Using Yarn:
   ```bash
   yarn install

3. **Install Pods (iOS Only)**

   Navigate to the ios directory and install pods:
   ```bash
   cd ios
   pod install
   cd ..


## Running the App

### For ios

```bash
npx react-native run-ios
```

### For Android

```bash
npx react-native run-android
```

