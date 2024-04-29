const Footer = () => {
  return (
    <footer className="bg-[#12161C] text-white text-sm p-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
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
        {/* ... Other columns similar to the above structure ... */}

        {/* Column 6 */}
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
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>© Your Company, 2024. All rights reserved.</p>
        <p>
          3Commas provides software only. Any references to trading, exchange,
          transfer, or wallet services, etc. are references to services provided
          by third-party service providers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
