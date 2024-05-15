import Header from './Header'

export default function Layout({children, finish = false}) {
  return (
    <main className="bg-dnr-white">
      <GradientBackground finish={finish} />
      <section className="flex flex-col h-screen">
        <Header />
        {children}
      </section>
    </main>
  )
}

function GradientBackground({finish}) {
  if (finish) {
    return (
      <>
        <svg className="z-0 fixed top-0 right-0" viewBox="0 0 1440 510.197">
          <defs>
            <linearGradient id="a" x1="0.5" y1="0.842" x2="0.219" y2="-0.279" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#96e5ff" />
              <stop offset="1" stopColor="#2394ba" />
            </linearGradient>
          </defs>
          <path
            d="M128.89,1445.369a434.65,434.65,0,0,0,62.874,43.817c169.823,97.226,420.05,83.275,604.126-23.625,154.088-89.485,217.87-218.658,398.25-256.5a558.984,558.984,0,0,1,74.249-10.125c134.424-8.616,241.243,35.85,300.5,66.83V1044.371h-1440Z"
            transform="translate(-128.89 -1044.371)"
            opacity="0.08"
            fill="url(#a)"
          />
        </svg>
        <svg viewBox="0 0 610.599 358" className="z-0 fixed bottom-0 right-0 h-1/2">
          <defs>
            <linearGradient id="a" x1="0.201" y1="1.235" x2="1.117" y2="0.225" gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#96e5ff" />
              <stop offset="1" stopColor="#2394ba" />
            </linearGradient>
          </defs>
          <path
            d="M1566.391,1495.192c-153.732-3.139-237.77,41.523-286.4,84.236-52.125,45.781-62.509,88.387-128.039,151.624-69.106,66.689-143.538,102.278-196.032,121.984h610.6Z"
            transform="translate(-955.918 -1495.036)"
            opacity="0.08"
            fill="url(#a)"
          />
        </svg>
      </>
    )
  }

  return (
    <>
      {/* <svg viewBox="0 0 999.873 1099.999" className="z-0 fixed top-0 right-0">
        <defs>
          <linearGradient id="linear-gradient" x1="1" y1="0.5" x2="-0.072" y2="0.823" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#96e5ff" />
            <stop offset="1" stopColor="#2394ba" />
          </linearGradient>
        </defs>
        <path
          id="Path_11564"
          data-name="Path 11564"
          d="M1917.194,1238.509s263.942-74.276,346.44-280.525C2349.9,742.331,2259.078,589.8,2391.969,458.4c93.359-92.314,223.073-86.077,279.582-215.417,17.637-40.366,21.321-78.321,21.6-104.475h223.918v1100Z"
          transform="translate(-1917.194 -138.51)"
          opacity="0.08"
          fill="url(#linear-gradient)"
        />
      </svg> */}
      <svg viewBox="0 0 999.873 1099.999" className="fixed bottom-0 right-0 w-1/2">
        <defs>
          <linearGradient id="linear-gradient" x1="1" y1="0.5" x2="-0.072" y2="0.823" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#96e5ff" />
            <stop offset="1" stopColor="#2394ba" />
          </linearGradient>
        </defs>
        <path
          id="Path_11564"
          data-name="Path 11564"
          d="M1917.194,1238.509s263.942-74.276,346.44-280.525C2349.9,742.331,2259.078,589.8,2391.969,458.4c93.359-92.314,223.073-86.077,279.582-215.417,17.637-40.366,21.321-78.321,21.6-104.475h223.918v1100Z"
          transform="translate(-1917.194 -138.51)"
          opacity="0.08"
          fill="url(#linear-gradient)"
        />
      </svg>
    </>
  )
}
