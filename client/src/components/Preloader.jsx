import React from "react"
import Lottie from "lottie-react"

// Simple loading animation data (you can replace this with any Lottie JSON)
const loadingAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.833], y: [0.833] },
              o: { x: [0.167], y: [0.167] },
              t: 0,
              s: [0],
            },
            { t: 120, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [80, 80] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.27, 0, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 1,
              ml: 4,
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Dots",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: {
                a: 1,
                k: [
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 0,
                    s: [8, 8],
                  },
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 30,
                    s: [12, 12],
                  },
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 60,
                    s: [8, 8],
                  },
                  { t: 120, s: [8, 8] },
                ],
              },
              p: { a: 0, k: [30, 0] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.27, 0, 1] },
              o: { a: 0, k: 100 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: {
                a: 1,
                k: [
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 10,
                    s: [8, 8],
                  },
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 40,
                    s: [12, 12],
                  },
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 70,
                    s: [8, 8],
                  },
                  { t: 120, s: [8, 8] },
                ],
              },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.27, 0, 1] },
              o: { a: 0, k: 100 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: {
                a: 1,
                k: [
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 20,
                    s: [8, 8],
                  },
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 50,
                    s: [12, 12],
                  },
                  {
                    i: { x: [0.833, 0.833], y: [0.833, 0.833] },
                    o: { x: [0.167, 0.167], y: [0.167, 0.167] },
                    t: 80,
                    s: [8, 8],
                  },
                  { t: 120, s: [8, 8] },
                ],
              },
              p: { a: 0, k: [-30, 0] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.27, 0, 1] },
              o: { a: 0, k: 100 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0,
    },
  ],
}

const Preloader = ({
  isLoading,
  loadingText = "Loading your portfolio...",
  progress = 0,
}) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-colors duration-300 dark:bg-gray-900">
      {/* Background overlay with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50 dark:from-gray-900 dark:to-gray-800"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Logo/Brand */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-gray-800 lg:text-6xl dark:text-white">
            <span className="text-[#ff4500] dark:text-[#ff6b35]">K</span>rishna
            Jain
          </h1>
          <p className="mt-2 text-center text-lg text-gray-600 dark:text-gray-300">
            Full Stack Developer
          </p>
        </div>

        {/* Lottie Animation */}
        <div className="h-32 w-32 lg:h-40 lg:w-40">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Loading text with animated dots */}
        <div className="text-center">
          <p className="mb-2 text-xl font-medium text-gray-700 dark:text-gray-200">
            {loadingText}
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-[#ff4500] dark:bg-[#ff6b35]"></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-[#ff4500] dark:bg-[#ff6b35]"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-[#ff4500] dark:bg-[#ff6b35]"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Progress indicator with percentage */}
        <div className="relative h-3 w-64 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full animate-pulse rounded-full bg-gradient-to-r from-[#ff4500] to-[#ff6b35] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700 dark:text-gray-200">
            {progress}%
          </span>
        </div>

        {/* Subtle loading tips */}
        <div className="max-w-md text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Preparing an amazing portfolio experience for you...
          </p>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-float absolute h-2 w-2 rounded-full bg-[#ff4500] opacity-20 dark:bg-[#ff6b35]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${2 + Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Preloader
