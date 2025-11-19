// app/privacy-notice/page.tsx
"use client";

import Hero from "@/components/landing/hero/hero";
import Navbar from "@/components/landing/hero/navBar";
import React from "react";

const PrivacyNotice = () => {
  return (
    <div>
    
      <main className="min-h-screen font-poppins bg-gray-50 p-6 md:p-12 text-gray-800">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">
            ShiftRemit – Privacy Notice
          </h1>

          <p className="mb-4">
            In this Data Privacy Notice (“Privacy Notice”), we explain how
            ShiftRemit Ltd (“ShiftRemit”, “we”, “our”, or “us”) collects, uses,
            stores and protects your personal information when you use our
            services, visit our website or mobile applications, or otherwise
            interact with us within the European Economic Area (“EEA”). This
            Privacy Notice also explains how we share your information and the
            safeguards we apply.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Who We Are and Scope of This Privacy Notice
            </h2>
            <p className="mb-2">
              This Privacy Notice applies to ShiftRemit Ltd, located at:
            </p>
            <ul className="list-disc list-inside mb-2">
              <li>128 City Road, London, United Kingdom, EC1V 2NX</li>
              <li>Email: support@shiftremit.com</li>
              <li>Phone: +44 7852 366172</li>
            </ul>
            <p className="mb-2">
              ShiftRemit is the data controller responsible for deciding how
              your personal information is collected, used and protected when:
            </p>
            <ul className="list-disc list-inside mb-2">
              <li>You use our services</li>
              <li>You communicate with us by email, phone, or post</li>
              <li>You use our website: www.shiftremit.com</li>
            </ul>
            <p>
              If you have any privacy-related questions, our Data Protection
              Officer (“DPO”) can be contacted at support@shiftremit.com.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Data Protection Principles
            </h2>
            <p className="mb-2">
              “Personal Data” means any information that identifies you—directly
              or indirectly—such as your name, address, email, phone number,
              identification documents, financial information, or beneficiary
              details.
            </p>
            <p>ShiftRemit is committed to ensuring that Personal Data is:</p>
            <ul className="list-disc list-inside mb-2">
              <li>Used lawfully, fairly, and transparently</li>
              <li>Collected for clear, legitimate purposes only</li>
              <li>Relevant and limited to what is necessary</li>
              <li>Accurate and kept up to date</li>
              <li>Retained only as long as necessary</li>
              <li>Stored securely</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Personal Data We Collect and How We Collect It
            </h2>
            <p className="mb-2">1. Data you provide directly</p>
            <p className="mb-2">This includes data you give us when:</p>
            <ul className="list-disc list-inside mb-2">
              <li>Registering for our services</li>
              <li>Completing online forms</li>
              <li>Contacting us by email, phone, or post</li>
              <li>Engaging in transactions through our website</li>
              <li>Visiting or interacting with our platform</li>
            </ul>
            <p>
              We collect, process, and retain information necessary to provide
              our services, including:
            </p>
            <ul className="list-disc list-inside mb-2">
              <li>
                <strong>Personal Details:</strong> Name, address, phone number,
                email, Date of birth, gender, Identification documents, Images
                or signatures
              </li>
              <li>
                <strong>Financial Information:</strong> Bank account details,
                Payment information, Beneficiary details
              </li>
              <li>
                <strong>Compliance Information:</strong> Source of funds,
                Relationship to beneficiary, Purpose of transaction
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Cookies and Similar Technologies
            </h2>
            <p className="mb-2">
              We may automatically collect IP address, browser type, device
              details, screen settings, and interaction data. This helps us
              analyze platform usage, improve user experience, conduct
              analytics, and maintain security.
            </p>
            <p>Disabling cookies may affect website functionality.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              How We Use Your Personal Data
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>To perform our contract with you:</strong> Process
                transfers, verify identity, communicate regarding transactions,
                refund or fulfil payments.
              </li>
              <li>
                <strong>To comply with legal obligations:</strong> AML, fraud
                prevention, regulatory reporting.
              </li>
              <li>
                <strong>With your consent:</strong> Marketing, service updates
                (can withdraw anytime).
              </li>
              <li>
                <strong>For legitimate business interests:</strong> Improve
                website, personalize experience, analytics.
              </li>
            </ol>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Sharing of Personal Data
            </h2>
            <ul className="list-disc list-inside mb-2">
              <li>Within ShiftRemit: internal sharing as necessary</li>
              <li>
                Third-party service providers: banks, identity verification,
                hosting, debt recovery
              </li>
              <li>
                Corporate transactions: mergers/acquisitions with safeguards
              </li>
              <li>
                Legal/regulatory disclosure: law enforcement, fraud prevention
              </li>
              <li>
                International transfers: protected via SCCs or adequacy
                decisions
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
            <p className="mb-2">
              We retain data only as long as necessary for service delivery,
              regulatory obligations, or legitimate business needs.
              Financial/AML data: minimum five years. Marketing data: until
              opt-out.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
            <p className="mb-2">
              We employ firewalls, intrusion detection, secure data centers,
              limited access, and regular reviews. However, no system is
              completely impenetrable.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">
              Your Data Protection Rights
            </h2>
            <p>
              You may request access, correction, deletion, restriction,
              transfer, or object to processing of your data. Requests should be
              submitted using your registered email. For deletion or privacy
              complaints, contact support@shiftremit.com.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              Email:{" "}
              <a href="mailto:support@shiftremit.com" className="text-blue-600">
                support@shiftremit.com
              </a>
            </p>
            <p>Phone: +44 7852 366172</p>
            <p>Address: 128 City Road, London, United Kingdom, EC1V 2NX</p>
          </section>

          <p className="text-sm text-gray-500 mt-6">
            Last updated: November 2025
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyNotice;
