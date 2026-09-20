"use client";

import { useEffect, useState } from "react";

type GoldData = {
  price24k: number;
  price22k: number;
  timestamp: string;
};

export default function Home() {
  const [gold, setGold] = useState<GoldData | null>(null);

  const [karat, setKarat] = useState<"22K" | "24K">("22K");
  const [weight, setWeight] = useState(10);
  const [wastage, setWastage] = useState(8);
  const [makingCharges, setMakingCharges] = useState(500);

  useEffect(() => {
    async function loadGoldPrice() {
      const response = await fetch("/api/gold");

      if (!response.ok) return;

      const data = await response.json();
      setGold(data);
    }

    loadGoldPrice();
  }, []);

  const goldRate =
    karat === "22K"
      ? gold?.price22k ?? 0
      : gold?.price24k ?? 0;

  const wastageWeight = weight * (wastage / 100);

  const billableWeight = weight + wastageWeight;

  const goldValue = billableWeight * goldRate;

  const total = goldValue + makingCharges;

  const formatINR = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">

      {/* Header */}

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-xl font-semibold">
              GoldCalc
            </h1>

            <p className="text-xs text-neutral-500">
              Gold price & jewellery calculator
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-neutral-500">
              Today
            </p>

            <p className="text-sm text-green-400">
              Live price
            </p>
          </div>

        </div>
      </header>


      {/* Hero */}

      <section className="mx-auto max-w-6xl px-6 py-14">

        <div className="max-w-3xl">

          <p className="mb-3 text-sm text-yellow-400">
            INDIA • INR / GRAM
          </p>

          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            Know what your gold
            <span className="text-yellow-400">
              {" "}really costs.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-neutral-400">
            Calculate jewellery cost using today's gold rate,
            wastage and making charges.
          </p>

        </div>


        {/* Price cards */}

        <div className="mt-10 grid gap-4 md:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

            <p className="text-sm text-neutral-500">
              22K Gold
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {gold
                ? formatINR(gold.price22k)
                : "Loading..."}
            </p>

            <p className="mt-2 text-xs text-neutral-500">
              per gram
            </p>

          </div>


          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

            <p className="text-sm text-neutral-500">
              24K Gold
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {gold
                ? formatINR(gold.price24k)
                : "Loading..."}
            </p>

            <p className="mt-2 text-xs text-neutral-500">
              per gram
            </p>

          </div>

        </div>


        {/* Calculator */}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">


          {/* Controls */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">

            <h3 className="text-xl font-semibold">
              Jewellery calculator
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Adjust the values below.
            </p>


            {/* Karat */}

            <div className="mt-8">

              <label className="text-sm text-neutral-400">
                Gold purity
              </label>

              <div className="mt-3 grid grid-cols-2 gap-3">

                {(["22K", "24K"] as const).map((item) => (

                  <button
                    key={item}
                    onClick={() => setKarat(item)}
                    className={`rounded-xl border px-4 py-3 transition ${
                      karat === item
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>


            {/* Weight */}

            <div className="mt-8">

              <div className="flex justify-between">

                <label className="text-sm text-neutral-400">
                  Gold weight
                </label>

                <span className="font-semibold">
                  {weight} g
                </span>

              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={weight}
                onChange={(e) =>
                  setWeight(Number(e.target.value))
                }
                className="mt-4 w-full accent-yellow-400"
              />

              <div className="flex justify-between text-xs text-neutral-600">
                <span>1g</span>
                <span>100g</span>
              </div>

            </div>


            {/* Wastage */}

            <div className="mt-8">

              <div className="flex justify-between">

                <label className="text-sm text-neutral-400">
                  Wastage
                </label>

                <span className="font-semibold">
                  {wastage}%
                </span>

              </div>

              <input
                type="range"
                min="8"
                max="20"
                value={wastage}
                onChange={(e) =>
                  setWastage(Number(e.target.value))
                }
                className="mt-4 w-full accent-yellow-400"
              />

              <div className="flex justify-between text-xs text-neutral-600">
                <span>8%</span>
                <span>20%</span>
              </div>

            </div>


            {/* Making charges */}

            <div className="mt-8">

              <div className="flex justify-between">

                <label className="text-sm text-neutral-400">
                  Making charges
                </label>

                <span className="font-semibold">
                  {formatINR(makingCharges)}
                </span>

              </div>

              <input
                type="range"
                min="100"
                max="9999"
                step="100"
                value={makingCharges}
                onChange={(e) =>
                  setMakingCharges(Number(e.target.value))
                }
                className="mt-4 w-full accent-yellow-400"
              />

              <div className="flex justify-between text-xs text-neutral-600">
                <span>₹100</span>
                <span>₹9,999</span>
              </div>

            </div>

          </div>


          {/* Result */}

          <div className="rounded-3xl bg-yellow-400 p-7 text-black">

            <p className="text-sm font-medium opacity-70">
              Estimated jewellery cost
            </p>

            <p className="mt-3 text-5xl font-bold">
              {formatINR(total)}
            </p>


            <div className="mt-10 space-y-4 border-t border-black/10 pt-6">

              <div className="flex justify-between">
                <span>Gold rate</span>
                <span className="font-semibold">
                  {formatINR(goldRate)}/g
                </span>
              </div>

              <div className="flex justify-between">
                <span>Original weight</span>
                <span>{weight} g</span>
              </div>

              <div className="flex justify-between">
                <span>Wastage</span>
                <span>
                  +{wastageWeight.toFixed(2)} g
                </span>
              </div>

              <div className="flex justify-between">
                <span>Billable weight</span>
                <span className="font-semibold">
                  {billableWeight.toFixed(2)} g
                </span>
              </div>

              <div className="flex justify-between">
                <span>Gold value</span>
                <span>
                  {formatINR(goldValue)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Making charges</span>
                <span>
                  {formatINR(makingCharges)}
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* Disclaimer */}

        <p className="mt-8 text-xs leading-5 text-neutral-600">
          This calculator provides an estimate using a spot-derived
          gold reference rate. Actual jewellery prices may vary based
          on the jeweller, taxes, premiums, stones and other charges.
        </p>


        {/* About */}

        <section className="mt-24 border-t border-white/10 pt-12">

          <p className="text-sm text-yellow-400">
            BUILT BY AKSHAY D
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            Software engineering meets
            <br />
            practical problem solving.
          </h3>

          <p className="mt-5 max-w-2xl text-neutral-400">
            Mechanical engineer transitioning into ML Engineering,
            building practical products with modern software,
            APIs, data and AI.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">

            {[
              "Python",
              "Java",
              "SQL",
              "Next.js",
              "TypeScript",
              "REST APIs",
              "Machine Learning",
              "Generative AI"
            ].map((skill) => (

              <span
                key={skill}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-neutral-400"
              >
                {skill}
              </span>

            ))}

          </div>

        </section>

      </section>

    </main>
  );
}
