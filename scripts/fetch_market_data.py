import json
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

SYMBOLS = ["QQQ", "NVDA", "TSM", "MU", "VRT", "COPX", "LIT", "ANET", "ASML", "CEG", "FCX", "SMH"]
DATA_FILE = Path("market-data.json")


def fetch_quote(symbol):
    query = urllib.parse.urlencode({"interval": "1d", "range": "5d", "events": "history"})
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?{query}"
    request = urllib.request.Request(url, headers={"User-Agent": "signal-atlas-market-data/1.0"})
    with urllib.request.urlopen(request, timeout=15) as response:
        payload = json.load(response)
    result = payload["chart"]["result"][0]
    meta = result["meta"]
    price = meta.get("regularMarketPrice")
    previous = meta.get("previousClose") or meta.get("chartPreviousClose")
    if price is None or previous in (None, 0):
        raise ValueError(f"Missing quote for {symbol}")
    return {"price": round(float(price), 2), "change": round((float(price) - float(previous)) / float(previous) * 100, 2)}


def main():
    quotes = {}
    failures = []
    for symbol in SYMBOLS:
        try:
            quotes[symbol] = fetch_quote(symbol)
        except Exception as error:
            failures.append(f"{symbol}: {error}")
        time.sleep(0.15)
    if not quotes:
        raise RuntimeError("Yahoo Finance returned no usable quotes")
    DATA_FILE.write_text(json.dumps({"source": "Yahoo Finance chart API", "updatedAt": datetime.now(timezone.utc).isoformat(), "quotes": quotes, "failures": failures}, indent=2) + "\n", encoding="utf-8")
    if failures:
        print("Partial update: " + "; ".join(failures))


if __name__ == "__main__":
    main()
