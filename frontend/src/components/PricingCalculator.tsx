"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "../dictionaries/types";

interface PricingCalculatorProps {
  pricing: Dictionary["pricing"];
  pageData?: Dictionary["pricingPage"];
  lang: Locale;
}

export function PricingCalculator({ pricing, pageData, lang }: PricingCalculatorProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = pricing.plans.map((plan, idx) => {
    let displayPrice = plan.price;
    let periodText = pricing.period;

    if (isAnnual) {
      if (lang === "id") {
        if (idx === 0) displayPrice = "Rp 124.000";
        else if (idx === 1) displayPrice = "Rp 249.000";
        else displayPrice = "Rp 415.000";
        periodText = "/ bulan (dibayar tahunan)";
      } else {
        if (idx === 0) displayPrice = "$12";
        else if (idx === 1) displayPrice = "$24";
        else displayPrice = "$40";
        periodText = "/ mo (billed annually)";
      }
    }

    return {
      ...plan,
      displayPrice,
      periodText,
    };
  });

  return (
    <div className="pricing-calc-wrapper">
      {/* Billing Switcher */}
      <div className="pricing-billing-toggle" role="group" aria-label="Pilihan Penagihan">
        <button
          type="button"
          className={`billing-toggle-btn ${!isAnnual ? "active" : ""}`}
          onClick={() => setIsAnnual(false)}
        >
          {pageData?.monthlyToggle || "Bulanan"}
        </button>
        <button
          type="button"
          className={`billing-toggle-btn ${isAnnual ? "active" : ""}`}
          onClick={() => setIsAnnual(true)}
        >
          <span>{pageData?.annualToggle || "Tahunan"}</span>
          <span className="annual-savings-badge">{pageData?.annualBadge || "HEMAT 2 BULAN"}</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="pricing-grid">
        {plans.map((plan, idx) => (
          <div
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
            key={plan.name}
          >
            {plan.popular && (
              <span className="popular-badge">{pricing.popularBadge}</span>
            )}
            <div className="pricing-header">
              <h3 className="pricing-name">{plan.name}</h3>
              <p className="pricing-desc">{plan.desc}</p>
            </div>
            <div className="pricing-amount-block">
              <span className="pricing-amount">{plan.displayPrice}</span>
              <span className="pricing-period">{plan.periodText}</span>
            </div>
            <Link
              className={`button ${plan.popular ? "" : "secondary"} pricing-button`}
              href={idx < plans.length - 1 ? `/${lang}/register-as-owner` : `/${lang}#mulai`}
            >
              {plan.cta}
            </Link>
            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
