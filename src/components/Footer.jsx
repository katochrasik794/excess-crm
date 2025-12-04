// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-10 flex items-center justify-center">
      <div className="px-4 md:px-6 lg:px-10 mx-auto max-w-7xl">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
          
          {/* LEFT SIDE TEXT */}
          <div className="text-xs text-gray-600 leading-relaxed space-y-4">
            <p>
              FinCRM (SC) LTD is a Securities Dealer registered in Seychelles with
              registration number 8423606-1 and authorised by the Financial Services
              Authority (FSA) with licence number SD025. The registered office of
              FinCRM (SC) LTD is at 9A CT House, 2nd floor, Providence, Mahe, Seychelles.
            </p>

            <p>
              The information on this website may only be copied with the express written
              permission of FinCRM. General Risk Warning: CFDs are leveraged products.
              Trading in CFDs carries a high level of risk thus may not be appropriate for
              all investors. The investment value can both increase and decrease and the
              investors may lose all their invested capital. Under no circumstances shall
              the Company have any liability to any person or entity for any loss or damage
              in whole or part caused by, resulting from, or relating to any transactions
              related to CFDs.{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Learn more
              </a>
            </p>

            <p>
              FinCRM complies with the Payment Card Industry Data Security Standard (PCI DSS)
              to ensure your security and privacy. We conduct regular vulnerability scans and
              penetration tests in accordance with the PCI DSS requirements for our business
              model.
            </p>
          </div>

          {/* RIGHT SIDE LINKS */}
          <div className="text-xs text-gray-600 space-y-2 md:text-left lg:ml-40">
            <a href="#" className="block hover:underline">Privacy Agreement</a>
            <a href="#" className="block hover:underline">Risk Disclosure</a>
            <a href="#" className="block hover:underline">Preventing Money Laundering</a>
            <a href="#" className="block hover:underline">Security Instructions</a>
            <a href="#" className="block hover:underline">Legal documents</a>
            <a href="#" className="block hover:underline">Complaints Handling Policy</a>
            <a href="#" className="block hover:underline">Contact</a>
          </div>

        </div>

        {/* COPY RIGHT */}
        <div className="mt-10 text-xs text-gray-500 md:text-right text-center">
          © 2008 - 2025. FinCRM
        </div>

      </div>
    </footer>
  );
};

export default Footer;
