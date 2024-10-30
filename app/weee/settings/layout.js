"use client";

import "../../globals.css";

export default function SettingsLayout({ children }) {
  return (
    <section className="w-full bg-white p-2 md:p-4 rounded-lg">
      {children}
    </section>
  );
}
