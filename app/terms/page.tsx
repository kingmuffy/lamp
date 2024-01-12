import React from "react";

import termsData from "../../utils/tems.json";

const Refund = () => {
  return (
    <div className="bg-gray-50 text-gray-700 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-10">
          Terms of service
        </h1>
        {Object.entries(termsData).map(([key, value]) => {
          const { title, content } = value;
          return (
            <div key={key} className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {title}
              </h2>
              {Array.isArray(content) ? (
                <ul className="list-disc list-inside">
                  {content.map((item, index) => (
                    <li key={index} className="mb-2">
                      <strong className="font-semibold">{item.method}:</strong>{" "}
                      {item.detail}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 leading-relaxed">{content}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Refund;
