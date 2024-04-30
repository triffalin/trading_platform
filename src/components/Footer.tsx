const Footer = () => {
  return (
    <footer className="bg-[#181a20] text-[#EAECEF] text-sm p-10">
      <div className="container max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 ">
        {/* Column 1 */}
        <div>
          <h5 className="font-bold mb-3">Trading software</h5>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                GRID Bot
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                DCA Bot
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Signal Bot
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Smart Trade
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                TradingView
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h5 className="font-bold mb-3">Trading software</h5>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Crypto-Signals
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                System Status
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h5 className="font-bold mb-3">Trading Bots</h5>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Binance
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Bitstamp
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Bitfinex
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Coinbase
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                OKX
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                KuCoin
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h5 className="font-bold mb-3">Trading Bots</h5>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                HTX
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Bybit
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Krakon
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ripple
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ethereum
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Dogecoin
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h5 className="font-bold mb-3">For Developers</h5>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Qtrading Apps
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Apps Chat
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                API Git
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                API Chat
              </a>
            </li>
          </ul>
        </div>

        {/* Column 6 */}
        <div>
          <div>
            <h5 className="font-bold mb-3">Company</h5>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Affiliate program
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Qtrading & Binance
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reviews
                </a>
              </li>
            </ul>
          </div>
          <br />
          <div>
            <h5 className="font-bold mb-3">Subscribe to our newsletter</h5>
            <form>
              <input
                type="email"
                placeholder="your@email.com"
                className="text-black mb-2"
              />
              <button className="bg-[#F3BA2F] text-black px-4 py-2 rounded hover:bg-[#F0B90B]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>© Qtrading, 2024. All rights reserved.</p>
        <p>
          Qtrading provides software only. Any references to trading, exchange,
          transfer, or wallet services, etc. are references to services provided
          by third-party service providers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
