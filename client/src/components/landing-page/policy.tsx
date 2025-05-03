"use client";

import React from "react";

export default function policy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8" id="Policy">
      {/* <Header/> */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
        <p className="text-center text-gray-600">Last Updated: [Date]</p>
      </header>

      <section className="space-y-8">
        <p className="text-lg leading-relaxed" id="policy">
          Welcome to Al-Nawayath (&quot;we,&quot; &quot;our,&quot; or
          &quot;us&quot;). Your privacy is important to us, and we are committed
          to protecting your personal information. This Privacy Policy explains
          how we collect, use, and safeguard your data when you visit our
          website al-nawayath.com.
        </p>

        <div>
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, shipping and billing address.
            </li>
            <li>
              <strong>Payment Information:</strong> Payment details (processed
              securely via third-party payment gateways).
            </li>
            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              device information, and cookies.
            </li>
            <li>
              <strong>Order Information:</strong> Details of products purchased,
              order history, and transaction details.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process and fulfill your orders.</li>
            <li>To improve our website and services.</li>
            <li>
              To send order confirmations, updates, and promotional emails.
            </li>
            <li>To enhance security and prevent fraudulent activities.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell or rent your personal data. However, we may share
            information with:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Service Providers:</strong> Payment processors, shipping
              companies, and analytics providers.
            </li>
            <li>
              <strong>Legal Authorities:</strong> If required by law or in case
              of fraudulent activities.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">
            4. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies to enhance user experience, analyze website traffic,
            and personalize content. You can manage cookie preferences through
            your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data. However, no online platform can guarantee complete security.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">6. Your Rights</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access, correct, or delete your personal data.</li>
            <li>Opt out of marketing communications.</li>
            <li>Disable cookies through browser settings.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not
            responsible for their privacy practices.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with the updated date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p>Al-Nawayath</p>
          <p>[Your Email Address]</p>
          <p>[Your Phone Number]</p>
          <p>[Your Address]</p>
        </div>
      </section>
    </div>
  );
}
