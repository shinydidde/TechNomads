# TechNomads Frontend

This is the frontend part of the TechNomads project, a service booking platform similar to Achareh or Urban Company. This project is built using React, Material-UI, and i18next for internationalization.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Internationalization](#internationalization)
- [Google Login](#google-login)
- [Service Detail and Booking](#service-detail-and-booking)
- [Location Dropdown](#location-dropdown)
- [Dependencies](#dependencies)

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/technomads-frontend.git
   cd technomads-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
|__ public/
│   ├── index.html
│   └── locales/
│       ├── en/
│       │   └── translation.json
│       │   └── locations.json
│       ├── fa/
│       │   └── translation.json
│       │   └── locations.json
│       └── ar/
│           └── translation.json
│           └── locations.json
├── src/
│   ├── components/
│   │   ├── NavBar.js
│   │   ├── ServiceSearch.js
│   │   └── ServiceItem.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── Services.js
│   │   └── ServiceDetail.js
│   ├── App.js
│   ├── index.js
│   ├── i18n.js
│   ├── theme.js
│   └── config.js
├── .env
├── package.json
└── README.md
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Internationalization

This project uses `react-i18next` for internationalization. The translation files are located in the `public/locales` directory. Each language has its own folder containing `translation.json` and `locations.json`.

To add a new language, create a new folder in `public/locales` with the language code and add the necessary translation files.

## Google Login

Google login is integrated using `@react-oauth/google`. To use it, make sure you have the necessary client ID from the Google Developer Console and add it to your `.env` file.

## Service Detail and Booking

The service detail and booking functionality are implemented in the `ServiceDetail.js` component. Users can view the details of a selected service and book it through the booking form.

## Location Dropdown

The location dropdown is implemented in the `NavBar.js` component. It dynamically populates based on the selected language using the `locations.json` file from the respective language folder in `public/locales`.

## Dependencies

- React
- Material-UI
- i18next
- @react-oauth/google
- react-router-dom
- axios
