import Link from "next/link";
import { notFound } from "next/navigation";

const productCatalog: Record<
  string,
  {
    title: string;
    description: string;
    summary: string;
    highlights: string[];
    whoItHelps: string[];
  }
> = {
  "estate-planning": {
    title: "Estate Planning",
    description: "Protect your assets, family, and legacy with thoughtful plans that make your intentions clear.",
    summary: "We help families create a complete estate plan that preserves wealth, reduces confusion, and keeps loved ones protected.",
    highlights: [
      "Last Will & Testament support",
      "Trust-based planning for probate avoidance",
      "Legacy and asset protection strategies",
    ],
    whoItHelps: [
      "Families planning ahead for children and dependents",
      "Owners who want to protect business or personal assets",
      "Anyone who wants clarity around final wishes",
    ],
  },
  "special-needs-trust": {
    title: "Special Needs Trust",
    description: "Create long-term financial protection for a loved one with special needs without jeopardizing benefits.",
    summary: "A Special Needs Trust can preserve access to Medicaid and SSI while supporting supplemental needs that government benefits do not cover.",
    highlights: [
      "Preserves government benefit eligibility",
      "Supports education, travel, comfort, and enrichment",
      "Provides structured, long-term financial oversight",
    ],
    whoItHelps: [
      "Parents planning for a disabled child",
      "Families wanting to protect a loved one’s future",
      "Caregivers coordinating long-term support",
    ],
  },
  "term-life-insurance": {
    title: "Term Life Insurance",
    description: "Affordable protection that helps keep your family financially secure when life changes unexpectedly.",
    summary: "Term life insurance can provide a straightforward layer of protection for a set period, helping loved ones handle expenses and maintain stability.",
    highlights: [
      "Budget-friendly coverage options",
      "Protection for mortgage, childcare, and everyday expenses",
      "Flexible term lengths to match life stage",
    ],
    whoItHelps: [
      "Young families with dependents",
      "Homeowners with mortgage obligations",
      "Individuals seeking simple, cost-conscious coverage",
    ],
  },
  "index-universal-life": {
    title: "Index Universal Life",
    description: "A flexible insurance strategy that can combine lifelong protection with cash value growth potential.",
    summary: "Index Universal Life offers lifelong coverage with the ability to build cash value tied to market indexes while maintaining downside protection features.",
    highlights: [
      "Permanent life insurance coverage",
      "Cash value accumulation potential",
      "Living benefits and policy flexibility",
    ],
    whoItHelps: [
      "Clients wanting lifelong protection",
      "Individuals who value tax-advantaged growth potential",
      "Families planning for long-term wealth transfer",
    ],
  },
  "fixed-index-annuities": {
    title: "Fixed Index Annuities",
    description: "A retirement-focused strategy to help protect assets while pursuing growth potential.",
    summary: "Fixed Index Annuities can provide a balance of growth potential, downside protection, and reliable income support for retirement planning.",
    highlights: [
      "Principal protection features",
      "Growth linked to market indexes",
      "Income planning support for retirement",
    ],
    whoItHelps: [
      "Pre-retirees seeking stability",
      "Retirees wanting predictable income",
      "Clients protecting retirement assets from volatility",
    ],
  },
  "long-term-care": {
    title: "Long-Term Care",
    description: "Prepare for future care needs so your savings and legacy stay protected.",
    summary: "Long-term care planning helps you address assisted living, nursing care, and home health needs before expenses become overwhelming.",
    highlights: [
      "Coverage for care expenses",
      "Protection against significant medical costs",
      "Support for family caregiving decisions",
    ],
    whoItHelps: [
      "Adults planning for aging-related expenses",
      "Families who want to protect retirement savings",
      "Clients concerned about future healthcare costs",
    ],
  },
  "health-insurance-aca": {
    title: "Health Insurance (ACA)",
    description: "Find comprehensive, affordable healthcare coverage that fits your household needs.",
    summary: "ACA Marketplace plans can offer essential medical coverage, preventive care, and prescription benefits with subsidies that may lower monthly costs.",
    highlights: [
      "Preventive and emergency care coverage",
      "Prescription drug benefits",
      "Potential premium subsidies",
    ],
    whoItHelps: [
      "Individuals and families without employer coverage",
      "Self-employed professionals",
      "Households looking for affordable care options",
    ],
  },
  "medicare-advantage": {
    title: "Medicare Advantage",
    description: "Explore an all-in-one Medicare option with added benefits beyond Original Medicare.",
    summary: "Medicare Advantage plans combine hospital and medical coverage and may also include prescription drug and extra wellness benefits.",
    highlights: [
      "Bundled Medicare coverage",
      "Possible dental, vision, and hearing benefits",
      "Support for care coordination and added services",
    ],
    whoItHelps: [
      "Medicare-eligible adults",
      "Seniors seeking simpler coverage",
      "Clients wanting broader healthcare benefits",
    ],
  },
  "partnership-program": {
    title: "Partnership Program",
    description: "Build a meaningful career helping families access financial confidence and protection.",
    summary: "The ProsperPath Partnership Program is designed for people who want to guide clients toward insurance and financial planning solutions while growing a professional career.",
    highlights: [
      "Training and mentorship support",
      "Access to products and planning resources",
      "Commission-based growth opportunities",
    ],
    whoItHelps: [
      "Individuals exploring a financial services career",
      "Professionals seeking a mission-driven path",
      "People who want to help families make better decisions",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(productCatalog).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productCatalog[slug];

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.title} | ProsperPath`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productCatalog[slug];

  if (!product) {
    notFound();
  }

  return (
    <section style={{ minHeight: "100vh", padding: "4rem 1.5rem 5rem", background: "linear-gradient(135deg, #06101e 0%, #0d1e3a 100%)", color: "#f4f7fb" }}>
      <div style={{ maxWidth: "940px", margin: "0 auto", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "24px", padding: "2rem", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
        <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.3em", color: "#8bb8f2", fontSize: "0.8rem", fontWeight: 700 }}>
          ProsperPath solution
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0.5rem 0 1rem", lineHeight: 1.2 }}>
          {product.title}
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#dce9fb", marginBottom: "1.5rem" }}>
          {product.summary}
        </p>

        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginBottom: "1.5rem" }}>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1rem 1.1rem" }}>
            <h2 style={{ marginTop: 0, fontSize: "1rem" }}>Why it matters</h2>
            <p style={{ margin: 0, color: "#dce9fb", lineHeight: 1.7 }}>{product.description}</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1rem 1.1rem" }}>
            <h2 style={{ marginTop: 0, fontSize: "1rem" }}>Who it can help</h2>
            <ul style={{ margin: 0, paddingLeft: "1rem", color: "#dce9fb", lineHeight: 1.8 }}>
              {product.whoItHelps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: "rgba(55,138,221,0.12)", border: "1px solid rgba(55,138,221,0.3)", borderRadius: "16px", padding: "1rem 1.1rem" }}>
          <h2 style={{ marginTop: 0, fontSize: "1rem" }}>Key highlights</h2>
          <ul style={{ margin: 0, paddingLeft: "1rem", color: "#dce9fb", lineHeight: 1.8 }}>
            {product.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 1.2rem", borderRadius: "999px", background: "#4ecba0", color: "#051018", fontWeight: 700, textDecoration: "none" }}>
            Back to home
          </Link>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 1.2rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)", color: "#f4f7fb", textDecoration: "none" }}>
            Explore your options
          </Link>
        </div>
      </div>
    </section>
  );
}
