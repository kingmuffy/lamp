"use client";
// Make sure to run npm install @formspree/react
// Make sure to run npm install @formspree/react
import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import toast, { Toaster } from "react-hot-toast";

function ContactForm() {
  const [state, handleSubmit] = useForm("meqyqdgb");

  const notifySuccess = () =>
    toast.success("Thanks for your message! We will get back to you soon.");
  const notifyError = (message: any) => toast.error(message);

  if (state.succeeded) {
    notifySuccess();
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <label htmlFor="name" className="block">
          Your name:
          <input
            id="name"
            type="text"
            name="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label htmlFor="email">
          Your email address:
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </label>
        <label htmlFor="Instagram handle or order-id">
          Order ID:
          <input
            id="order-id"
            type="text"
            name="order-id"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label htmlFor="subject">
          Subject:
          <input
            id="subject"
            type="text"
            name="subject"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label htmlFor="message">
          Message:
          <textarea
            id="message"
            name="message"
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </label>
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ContactForm />
    </div>
  );
}

export default App;
