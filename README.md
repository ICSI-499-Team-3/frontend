# Mobile App for Health Tracking
This is a cross-platform iOS and Android app built to motivate users to self-regulate their health and actively engage with their wellness by providing a platform for activity logging. 

# Features
- Manually input activity logs with notes and categories.
- Manually input metrics such as heart rate data, or they can automatically import data from Google Fit and Apple Health.
- Receive insights about their activities which will allow them to easily realize correlations in their data.
- Share their data with health professional (or family member) to allow them to track their data and provide more targeted care and treatment.
- Share logs through social media networks such as Facbook, Twitter, or Reddit.
- Receive notifications to remind you to log your activites and metrics

# Getting Started
This app is dependant on the backend for user authentication and data storage. The backend can be found and configured here: [ICSI-499-Team-3/backend](https://github.com/ICSI-499-Team-3/backend)

## Installation
- Install project requirements with `npm install` while in the [frontend](./frontend) (*frontend/frontend*) directory
- Follow the [React Native development environment setup](https://reactnative.dev/docs/environment-setup), specifically the *React Native CLI Quickstart* to configure your environment based on your development OS and target OS (Andorid or iOS)

## Running
- The app must be directed to the IP address of a running instance of the [backend](https://github.com/ICSI-499-Team-3/backend). Navigate to the [`index.js`](./frontend/index.js) file (*frontend/frontend/index.js*) and modify the `LOCAL_SYSTEM_IP_ADDR` variable to the IP address of the backend application (if running the backend locally, this will be your machine's IP address).
- Perform the following from the [frontend](./frontend) (*frontend/frontend*) directory
- Start [Metro](https://reactnative.dev/docs/environment-setup#:~:text=Running%20your%20React%20Native%20application) (the JavaScript bundler that ships with React Native) with `npx react-native start`
- Run the app with either `npx react-native run-anroid` or `npx react-native run-ios` based on your targeted platform
