// frontend/src/learningContent.ts

// An array of objects, where each object is a step in the learning path
export const learningPath = [
  {
    title: "1. What is the Stock Market?",
    content: `The stock market is a network where shares of public companies are bought and sold. It consists of two main parts: the Primary Market, where companies first issue shares to raise money (like an IPO), and the Secondary Market (like the NYSE or Nasdaq), where investors trade those shares among themselves.`
  },
  {
    title: "2. Why Do Companies Issue Stock?",
    content: `Companies sell shares of their ownership to the public to raise capital. This money is essential for expanding their business, funding research and development, launching new products, and paying off debt, all without having to take out a traditional loan.`
  },
  {
    title: "3. Why Do People Buy Stock?",
    content: `Investors buy stocks for several reasons: to receive a portion of the company's profits in the form of dividends; to sell the stock at a higher price later on (capital gains); or to gain voting rights in the company's major decisions.`
  },
  {
    title: "4. How Are Stock Prices Determined?",
    content: `A stock's price is determined by supply and demand. If more people want to buy a stock than sell it, the price goes up. If more people want to sell than buy, the price goes down. This is influenced by many factors, including company performance, economic news, and investor sentiment.`
  },
  {
    title: "5. What is a Stock Exchange?",
    content: `A stock exchange (like the NYSE or Nasdaq) is an organized and regulated marketplace that provides a platform for buying and selling stocks. They ensure fair trading practices and provide liquidity, which is the ability to buy or sell stocks quickly and easily because there are so many participants.`
  },
  {
    title: "6. What are Market Indexes?",
    content: `A market index, like the S&P 500 or the Dow Jones (DJIA), is a basket of stocks that represents a section of the market. Its performance is used as a benchmark to gauge the overall health and direction of the economy or a specific industry.`
  },
  {
    title: "7. Who Participates in the Market?",
    content: `The market includes individual Retail investors (like you and me) and large Institutional investors (like pension funds and banks). People can be long-term Investors, who aim to grow wealth over time, or short-term Traders, who try to profit from rapid price movements.`
  },
  {
    title: "8. How Do You Actually Buy a Stock?",
    content: `You can't walk onto the floor of the NYSE to buy a stock. Instead, you use a Broker. A brokerage (like Fidelity, Charles Schwab, or Robinhood) is a company licensed to buy and sell stocks on your behalf.`
  },
  {
    title: "9. Is it Just Stocks?",
    content: `No, many other assets are traded. A very common one for beginners are ETFs (Exchange-Traded Funds), which are like a basket containing many different stocks, allowing for instant diversification. You can also buy Bonds, which are essentially a loan to a company or government.`
  },
  {
    title: "10. What Are the Risks?",
    content: `All investing involves risk. The value of stocks can go down as well as up, which is known as Volatility. It's possible to lose your entire investment. A key principle is diversification—not putting all your eggs in one basket.`
  }
];

// Definitions for our clickable key terms
export const termDefinitions: { [key: string]: string } = {
  "Primary Market": "The market where securities are created and sold for the first time by the issuing company.",
  "IPO": "An Initial Public Offering is the process where a private company first sells its shares to the public, becoming a publicly-traded company.",
  "Secondary Market": "The market where investors buy and sell securities from each other, rather than from the issuing company itself (e.g., the NYSE).",
  "raise capital": "The process of a business gathering money to fund its operations, expansion, or large projects.",
  "dividends": "A distribution of a portion of a company's earnings, decided by the board of directors, to a class of its shareholders.",
  "capital gains": "The profit realized from the sale of an asset, like a stock, for a higher price than what it was purchased for.",
  "voting rights": "The right of a shareholder to vote on matters of corporate policy, including the election of the board of directors.",
  "supply and demand": "An economic model where the price of an asset is determined by the balance of its availability (supply) and the desire for it (demand).",
  "liquidity": "The ease with which an asset, or security, can be converted into ready cash without affecting its market price.",
  "S&P 500": "A stock market index that represents the performance of 500 of the largest publicly-traded companies in the United States.",
  "Dow Jones (DJIA)": "A price-weighted stock market index that tracks 30 large, publicly-owned blue-chip companies.",
  "Retail investors": "Individual, non-professional investors who buy and sell securities for their own personal accounts.",
  "Institutional investors": "Large organizations, such as banks, pension funds, and hedge funds, that invest on behalf of their members or clients.",
  "Investors": "People or entities who commit money with the expectation of achieving a profit over the long term.",
  "Traders": "People or entities who engage in the short-term buying and selling of assets to profit from price fluctuations.",
  "Broker": "A person or firm that acts as an intermediary, buying and selling securities on behalf of an investor.",
  "ETFs": "Exchange-Traded Funds are a type of investment fund that holds a collection of assets (like stocks) and trades on stock exchanges, much like a single stock.",
  "Bonds": "A type of investment where you lend money to a government or corporation, and they promise to pay you back with interest over a set period.",
  "Volatility": "A statistical measure of the dispersion of returns for a given security or market index. In simple terms, it's how fast and how much the price changes."
};