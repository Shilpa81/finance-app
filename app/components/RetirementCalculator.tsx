'use client';

import { useState, useMemo } from 'react';

interface CalculatorInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  inflationRate: number;
  monthlyExpenses: number;
}

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 500,
    expectedReturn: 7,
    inflationRate: 3,
    monthlyExpenses: 4000,
  });

  const [showResults, setShowResults] = useState(false);

  const update = (key: keyof CalculatorInputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const results = useMemo(() => {
    const years        = inputs.retirementAge - inputs.currentAge;
    const monthlyRate  = inputs.expectedReturn / 100 / 12;
    const months       = years * 12;

    // Future value of current savings
    const fvSavings = inputs.currentSavings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions
    const fvContributions =
      monthlyRate > 0
        ? inputs.monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        : inputs.monthlyContribution * months;

    const totalSavings = fvSavings + fvContributions;

    // Inflation-adjusted monthly expenses at retirement
    const inflationFactor  = Math.pow(1 + inputs.inflationRate / 100, years);
    const adjustedExpenses = inputs.monthlyExpenses * inflationFactor;
    const annualExpenses   = adjustedExpenses * 12;

    // Using 4% safe withdrawal rule
    const requiredNest   = annualExpenses * 25;
    const monthlyIncome  = totalSavings * 0.04 / 12;
    const savingsGap     = requiredNest - totalSavings;
    const onTrack        = totalSavings >= requiredNest;

    // Years savings will last
    const withdrawalRate   = inputs.expectedReturn / 100 / 12;
    const yearsLastMonths  =
      withdrawalRate > 0
        ? Math.log(1 - (totalSavings * withdrawalRate) / adjustedExpenses) /
          Math.log(1 + withdrawalRate) * -1
        : totalSavings / adjustedExpenses;
    const yearsLast = Math.min(yearsLastMonths / 12, 100);

    return {
      years,
      totalSavings,
      adjustedExpenses,
      annualExpenses,
      requiredNest,
      monthlyIncome,
      savingsGap,
      onTrack,
      yearsLast: isNaN(yearsLast) ? 100 : yearsLast,
    };
  }, [inputs]);

  const fmt = (n: number, compact = false) => {
    if (compact && n >= 1_000_000) {
      return `${(n / 1_000_000).toFixed(1)} million`;
    }

    if (compact && n >= 1_000) {
      return `${(n / 1_000).toFixed(0)}k`;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  };

  const progressPct = Math.min(100, (results.totalSavings / results.requiredNest) * 100);

  return (
    <>
     <section className="retirement-section">
        <div className="retirement-wrap">

          {/* Header */}
          <div className="retirement-header">
            <h2 className="retirement-title">Retirement Calculator</h2>
            <p className="retirement-subtitle">
              See if you&apos;re on track for a comfortable retirement
            </p>
          </div>
          <div className="retirement-body">

            {/* ── Inputs ── */}
            <div className="retirement-inputs">

              <div className="input-group">
                <label>Current Age</label>
                <div className="input-row">
                  <input
                    type="range" min={18} max={80} step={1}
                    value={inputs.currentAge}
                    onChange={e => update('currentAge', e.target.value)}
                  />
                  <span className="input-value">{inputs.currentAge} yrs</span>
                </div>
              </div>

              <div className="input-group">
                <label>Retirement Age</label>
                <div className="input-row">
                  <input
                    type="range" min={inputs.currentAge + 1} max={85} step={1}
                    value={inputs.retirementAge}
                    onChange={e => update('retirementAge', e.target.value)}
                  />
                  <span className="input-value">{inputs.retirementAge} yrs</span>
                </div>
              </div>

              <div className="input-group">
                <label>Current Savings</label>
                <div className="input-number-wrap">
                  <span className="input-prefix">$</span>
                  <input
                    type="number" min={0}
                    value={inputs.currentSavings}
                    onChange={e => update('currentSavings', e.target.value)}
                    className="input-number"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Monthly Contribution</label>
                <div className="input-number-wrap">
                  <span className="input-prefix">$</span>
                  <input
                    type="number" min={0}
                    value={inputs.monthlyContribution}
                    onChange={e => update('monthlyContribution', e.target.value)}
                    className="input-number"
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Expected Annual Return</label>
                <div className="input-row">
                  <input
                    type="range" min={1} max={15} step={0.5}
                    value={inputs.expectedReturn}
                    onChange={e => update('expectedReturn', e.target.value)}
                  />
                  <span className="input-value">{inputs.expectedReturn}%</span>
                </div>
              </div>

              <div className="input-group">
                <label>Inflation Rate</label>
                <div className="input-row">
                  <input
                    type="range" min={1} max={8} step={0.5}
                    value={inputs.inflationRate}
                    onChange={e => update('inflationRate', e.target.value)}
                  />
                  <span className="input-value">{inputs.inflationRate}%</span>
                </div>
              </div>

              <div className="input-group">
                <label>Monthly Expenses (today)</label>
                <div className="input-number-wrap">
                  <span className="input-prefix">$</span>
                  <input
                    type="number" min={0}
                    value={inputs.monthlyExpenses}
                    onChange={e => update('monthlyExpenses', e.target.value)}
                    className="input-number"
                  />
                </div>
              </div>

              <button
                className="calc-btn"
                onClick={() => setShowResults(true)}
              >
                Calculate →
              </button>
            </div>

            {/* ── Results ── */}
            <div className={`retirement-results ${showResults ? 'results-visible' : ''}`}>
              {!showResults ? (
                <div className="results-placeholder">
                  <div className="placeholder-icon">📊</div>
                  <h3>Your retirement outlook will appear here</h3>
                  <p>Fill in your details and calculate to see your projected savings, retirement gap, and how long your money may last.</p>
                  <div className="placeholder-mini-grid">
                    <div className="placeholder-mini-card">
                      <span>Projected savings</span>
                      <strong>Live estimate</strong>
                    </div>
                    <div className="placeholder-mini-card">
                      <span>Retirement gap</span>
                      <strong>Action plan</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Status badge */}
                  <div className={`status-badge ${results.onTrack ? 'on-track' : 'off-track'}`}>
                    {results.onTrack ? '✅ You\'re on track!' : '⚠️ Savings gap detected'}
                  </div>

                  {/* Progress bar */}
                  <div className="progress-wrap">
                    <div className="progress-labels">
                      <span>Progress to goal</span>
                      <span>{progressPct.toFixed(0)}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className={`progress-bar-fill ${results.onTrack ? 'fill-green' : 'fill-amber'}`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Key numbers */}
                  <div className="results-grid">
                    <div className="result-card">
                      <span className="result-label">Projected Savings</span>
                      <span className="result-value result-green">{fmt(results.totalSavings, true)}</span>
                    </div>
                    <div className="result-card">
                      <span className="result-label">Required Nest Egg</span>
                      <span className="result-value">{fmt(results.requiredNest, true)}</span>
                    </div>
                    <div className="result-card">
                      <span className="result-label">Monthly Income at Retirement</span>
                      <span className="result-value result-green">{fmt(results.monthlyIncome, true)}</span>
                    </div>
                    <div className="result-card">
                      <span className="result-label">Inflation-Adjusted Expenses</span>
                      <span className="result-value">{fmt(results.adjustedExpenses, true)}/mo</span>
                    </div>
                    <div className="result-card">
                      <span className="result-label">Years Until Retirement</span>
                      <span className="result-value">{results.years} years</span>
                    </div>
                    <div className="result-card">
                      <span className="result-label">Savings Will Last</span>
                      <span className={`result-value ${results.yearsLast >= 30 ? 'result-green' : 'result-amber'}`}>
                        {results.yearsLast >= 100 ? '30+ years ✓' : `~${results.yearsLast.toFixed(0)} years`}
                      </span>
                    </div>
                  </div>

                  {/* Gap warning */}
                  {!results.onTrack && (
                    <div className="gap-warning">
                      <p>
                        You still need <strong>{fmt(results.savingsGap, true)}</strong> to reach your target retirement fund.
                      </p>
                      <p>
                        {inputs.monthlyContribution < 1000
                          ? 'A modest increase in monthly savings could close much of the gap.'
                          : 'Your current contribution level is strong, so a small boost or later retirement age may help.'}
                      </p>
                    </div>
                  )}

                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
