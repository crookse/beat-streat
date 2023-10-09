# Roadiform (App)

Roadiform (sounds like Rotiform because stanced cars and potholes don't mix) is
a pothole reporting system.

## Reporting Flow

When you want to report a pothole, you can take the following steps:

1. You open app (you must be logged in to report).

1 You tap the location of the pothole on the map.

1. Your hit report (you will be asked to confirm before proceeding).

## Getting Started

Follow the instructions below to install and run this app.

### Prerequisites

- A what3words API key.

  - Link: https://what3words.com/
  - This is the map provider and the map that users interact with when reporting
    potholes.

- A Google Maps API key

  - Link: https://developers.google.com/maps
  - what3words uses Google Maps under the hood. Therefore, a Google Maps API key
    is required.
  - Obtaining an API key from Google requires you to provide a payment method
    (even for Google's Free tiers).

### Steps

1. Install the Node version written in the `.nvmrc` file.

1. In a separate terminal, run `arlocal`.

   ```bash
   npx arlocal
   ```

   _You should see `arlocal started on port 1984` when it starts_

1. Install the dependencies.

   ```bash
   yarn install
   ```

   _This project uses `yarn`. If you use a different package manager, your
   experience may vary._

1. Run the app.

   ```bash
   yarn start
   ```

## Use Cases / Acceptance Criteria

TBC
