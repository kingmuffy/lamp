import React from "react";
import Formi from "../components/Formi";

const ContactPage = () => {
  return (
    <div className="bg-gray-50 py-8 px-4 sm:p-10 md:p-16 lg:p-20">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="mb-4">
          Problem with your order? Not satisfied? Whatever your concern, our
          dedicated customer care team of over 30 customer service reps are
          ready to help you whenever you find yourself in distress. Whatever the
          issue, we are here to help as soon as possible. At Buy iFollow, the
          customer comes first!
        </p>
        <p className="mb-6">
          You can contact us using the form Below. We respond to emails within 3
          hours. Alternatively, you can contact our dedicated customer care team
          for any specific issues
        </p>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Service Departments</h2>
          <ul className="space-y-3">
            <li>
              <strong>Services:</strong> support@reereestore.shop
            </li>
            <li>
              <strong>Refunds:</strong> refunds@reereestore.shop
            </li>
            <li>
              <strong>Press:</strong> info@reereestore.shop
            </li>
            <li>
              <strong>Jobs:</strong> info@@reereestore.shop
            </li>
            <li>
              <strong>Legal:</strong> legal@reereestore.shop
            </li>
            <li>
              <strong>Investors:</strong> info@reereestore.shop
            </li>
          </ul>
        </div>
        <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
        <div>
          <p>
            <strong>NOTE:</strong> Please allow up to 3 hours for a response
            from our team. We will respond to your email as soon as possible.
          </p>
        </div>
        <div className="mb-6">
          <Formi />
        </div>

        <div className="bg-white shadow rounded-lg py-4 p-6">
          <h2 className="text-xl font-semibold mb-4">Priority Contact</h2>
          <p>
            <strong>Company Address:</strong> Ree ~ Store london, United Kingdom
          </p>
          <p className="mt-3">
            <strong>Contact us:</strong> +44 07449591183
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
