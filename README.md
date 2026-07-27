# 🚀 Crypto Tracker

A React + Redux cryptocurrency tracker built with the [CoinGecko API](https://www.coingecko.com/en/api). Browse coins ranked by market cap, search for a specific coin, and drill into a coin's page to see its price history on an interactive chart.

---

## 📦 Features

### 🔥 Trending Coins Carousel

* A rotating carousel on the home banner (`react-alice-carousel`) showing top trending coins with logo, symbol, 24h % change, and current price.

### 💰 Market Table

* Paginated table of all coins ranked by market cap (price, 24h change, market cap).
* Live search/filter by coin name or ticker.
* Responsive layout — market cap column and coin names collapse on small screens.
* Clicking a row navigates to that coin's detail page.

### 📊 Coin Detail Page

* Coin logo, name, description, market cap rank, current price, and market cap.
* Historical price line chart (Chart.js) with selectable timeframes: **24 Hours**, **30 Days**, **3 Months**, **1 Year**.

### 💱 Currency Switcher

* Toggle prices between **USD ($)**, **PKR (Rs)**, and **INR (₹)** from the header. All prices, charts, and market data update accordingly.

---

## 🛠️ Tech Stack

* **Frontend:** React 19 + Vite
* **Routing:** React Router v7
* **State Management:** Redux Toolkit (currency, all coins, trending coins, single coin slices)
* **UI Library:** MUI (Material UI) + `@mui/styles`
* **Charts:** Chart.js via `react-chartjs-2`
* **Carousel:** react-alice-carousel
* **HTTP Client:** Axios
* **API:** [CoinGecko API](https://api.coingecko.com/api/v3) (`/coins/markets`, `/coins/:id`, `/coins/:id/market_chart`)
* **Linting:** ESLint 9

---

## 📂 Project Structure

```
src
├── components
│   ├── Banner/         # Home page banner + trending coins carousel
│   ├── CoinInfo.jsx     # Historical price chart + timeframe selector
│   ├── CoinsTable.jsx   # Market cap table with search & pagination
│   ├── Header.jsx       # App bar with currency selector
│   └── SelectedButton.jsx
├── constants/           # API endpoints & static UI copy
├── hooks/                # useFetchAllCoins, useFetchSingleCoin, useFetchTrendingCoins
├── Layout/               # App shell (Header + <Outlet />) and theme
├── Pages/                # HomePage, CoinPage (route-level components)
├── store/                # Redux Toolkit store and slices
├── styles/               # CSS modules
└── utils/                # Helper functions & shared constants (e.g. chart timeframes)
```

Routes (defined in `src/main.jsx`):

| Path         | Page     |
|--------------|----------|
| `/`          | Home page — banner, trending carousel, market table |
| `/coin/:id`  | Coin detail page — stats + historical chart |

---

## ⚙️ Setup and Installation

1. Clone the repo:

```bash
git clone <your-repo-url>
```

2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

Other scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build
npm run lint       # run ESLint
```

---

## 🧾 License

This project is free to use for learning and personal development.

---

## 🤝 Contributing

Pull requests are welcome! If you have ideas, feel free to improve the project.

---

## 🙌 Author

**Faraz** — Frontend Developer & Learner

---

Happy coding! 🚀
