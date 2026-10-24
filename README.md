# Signal Atlas

Signal Atlas is a personal AI supply-chain market research workspace for tracking AI leaders, semiconductor infrastructure, data-center power, and critical materials.

## Market data policy

- Source: Yahoo Finance chart API.
- Refresh: every 30 minutes on weekdays during the US market window through GitHub Actions.
- Browser: loads the latest committed `market-data.json` on page load.
- Coverage: AI leaders, semiconductor equipment, networking, power infrastructure, copper, lithium, rare earths, and precious metals.
- Limitation: quotes may be delayed depending on the exchange and data provider. This dashboard is for research, not financial advice or intraday trading.
