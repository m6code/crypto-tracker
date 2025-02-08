# Crypto Tracker
- Repository URL: [Github](https://github.com/m6code/crypto-tracker)
- Live Demo URL: [Crypto Tracker on Vercel](https://crypto-tracker-theta-three.vercel.app/)

## Overview
A simple cryptocurrency tracking application built with Next.js, featuring real-time price tracking, search functionality, and a watchlist.

## Technologies Used
- Next.js
- Redux Toolkit
- Tailwind CSS
- Ant Design
- Recharts
- CoinGecko API

## Features
- Top 100 Cryptocurrencies Listing
- Real-time Price Tracking
- Search Functionality
- Watchlist Management
- Detailed Coin Information
- Responsive Design
- Dark/Light Mode Support


## Running the Project locally
### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup and Running 
- Open your terminal 
- Clone this repository to your local machine by running 
```sh
git clone https://github.com/m6code/crypto-tracker.git
```
- Navigate to the just cloned repository with 
```sh 
cd crypto-tracker 
```
- Install project dependencies with 
```sh 
npm install
```
- Run the dev server with 
```sh 
npm run dev 
``` 
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Potential Challenges
### API rate limits 
The [Coingecko API has a rate limit](https://support.coingecko.com/hc/en-us/articles/4538771776153-What-is-the-rate-limit-for-CoinGecko-API-public-plan) for free accounts of 5 to 15 calls per minute, this occasionally causes the app to return an api error from time to time

---


# TODOs
- [x] Add theming
    - [x] Add Light/Dark mode toggle button
    - [x] Add light/dark mode styling
- [ ] Add spinner
- [ ] Add fallback error page from failed api call
- [ ] Responsiveness
- [ ] Add sorting functionality to the table columns (e.g., by price, market cap).
- [ ]  Implement server-side rendering (SSR) or static site generation (SSG) for the homepage.

