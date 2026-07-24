"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import products from "./products.json";

type Product = {
  id: string;
  icon: string;
  color: string;
  bg: string;
  tag: string;
  name: string;
  tagline: string;
  image: string;
  desc: string;
  features: string[];
};

export default function TransactionsView() {
  const searchParams = useSearchParams();
  const rawSearch = searchParams?.get("search") ?? "";
  const search = typeof rawSearch === "string" ? decodeURIComponent(rawSearch).replace(/\+/g, " ").trim() : "";
  const searchLower = search.toLowerCase();

  const filtered = search
    ? (products as Product[]).filter((p) => {
        const hay = (
          p.name + " " + p.tag + " " + p.desc + " " + p.tagline + " " + (p.features || []).join(" ")
        ).toLowerCase();
        return searchLower
          .split(/\s+/)
          .filter(Boolean)
          .every((tok) => hay.includes(tok));
      })
    : [];

  const [stage, setStage] = useState<"closed" | "opening" | "open">("closed");
  const [activeIndex, setActiveIndex] = useState(0);

  const active = (products as Product[])[activeIndex];

  const handleOpen = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("open"), 900);
  };

  const handleClose = () => setStage("closed");

  return (
    <div className="transactions-page">
      {search ? (
        <div className="search-results">
          <div className="top-bar">
            <button
              className="back-btn"
              onClick={() => (typeof window !== "undefined" ? history.back() : null)}
            >
              ← Back
            </button>
            <span className="book-label">Search results for "{search}"</span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: 24 }}>No results found.</div>
          ) : (
            <div className="results-grid">
              {filtered.map((p) => (
                <div key={p.id} className="result-card">
                  <div
                    className="result-image"
                    style={{ position: "relative", width: "100%", height: 160 }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 820px) 100vw, 820px"
                    />
                  </div>
                  <div className="result-body">
                    <div className="product-image-title">{p.name}</div>
                    <div className="product-tagline">{p.tagline}</div>
                    <p className="product-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="book-section">
          {stage !== "open" && (
            <div className="book-stage">
              <div className="book-scene" onClick={handleOpen} role="button" aria-label="Open product book">
                <div className="book-body" />
                <div className="book-pages" />
                <div className="book-spine">
                  <span>NAIN Financials</span>
                </div>

                <div className={`cover-flap ${stage === "opening" ? "flipping" : ""}`}>
                  <div className="cover-front">
                    <img
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=60"
                      alt=""
                      className="cover-bg-img"
                    />
                    <div className="cover-content">
                      <div className="cover-logo">🏦</div>
                      <div className="cover-title">NAIN Financials</div>
                      <div className="cover-sub">Product Guide</div>
                      <div className="cover-badges">
                        <span className="cover-badge" style={{ background: "rgba(55,138,221,0.2)", color: "#5a9aff" }}>
                          9 Products
                        </span>
                        <span className="cover-badge" style={{ background: "rgba(29,158,117,0.2)", color: "#4ecba0" }}>
                          Full Coverage
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="cover-back" />
                </div>
              </div>
              <div className="book-hint">{stage === "closed" ? "Click the book to open ↓" : "Opening…"}</div>
            </div>
          )}

          {stage === "open" && (
            <div className="pages-section">
              <div className="top-bar">
                <button className="back-btn" onClick={handleClose}>
                  ← Close book
                </button>
                <span className="book-label">NAIN Financials — Product Guide</span>
              </div>

              <div className="tabs-row">
                {(products as Product[]).map((p, i) => (
                  <button key={p.id} className={`tab-btn${i === activeIndex ? " active" : ""}`} onClick={() => setActiveIndex(i)}>
                    {p.icon} {p.name.split(" ").slice(0, 2).join(" ")}
                  </button>
                ))}
              </div>

              <div className="product-card" key={active.id}>
                <div className="product-image-wrap">
                  <Image src={active.image} alt={active.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 820px) 100vw, 820px" priority />
                  <div className="product-image-overlay" />
                  <div className="product-image-badge">
                    <div className="product-image-icon" style={{ background: active.bg }}>{active.icon}</div>
                    <div>
                      <span className="product-image-tag" style={{ background: active.bg, color: active.color }}>{active.tag}</span>
                      <div className="product-image-title">{active.name}</div>
                    </div>
                  </div>
                </div>

                <div className="product-body">
                  <p className="product-tagline">"{active.tagline}"</p>
                  <p className="product-desc">{active.desc}</p>
                  <div className="features-label">Key features</div>
                  <div className="features-grid">
                    {active.features.map((f) => (
                      <div className="feature-item" key={f}>
                        <div className="feature-check" style={{ background: active.bg, color: active.color }}>✓</div>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="cta-row">
                    <button className="btn-primary" style={{ background: active.color }}>Get started →</button>
                    <button className="btn-outline">Talk to an advisor</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
