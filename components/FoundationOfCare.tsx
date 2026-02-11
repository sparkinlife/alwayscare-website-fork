import { useState, useEffect, useRef } from "react";

const PILLARS = [
  {
    number: "01",
    label: "RESCUE",
    title: "Arham Animal Ambulance",
    subtitle: "First on the scene. Every time.",
    description:
      "43+ fully-equipped ambulances with trained vets and paravets — dispatched free of charge, 24/7 — reaching injured street animals across 15+ cities in India within minutes of a single call.",
    stat: "43+",
    statLabel: "Ambulances on road today",
    secondStat: "15+",
    secondStatLabel: "Cities covered",
    accentColor: "#DC2626",
    accentLight: "rgba(220, 38, 38, 0.08)",
    accentMid: "rgba(220, 38, 38, 0.15)",
    gradient: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
    image: "/images/ambulance/1.jpg",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M5 17h-2v-4m0 0v-5h11v9m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
        <path d="M6 10h4m-2 -2v4" />
      </svg>
    ),
  },
  {
    number: "02",
    label: "TREAT",
    title: "Arham Animal Clinic",
    subtitle: "Where healing begins.",
    description:
      "4 dedicated animal clinics providing ongoing veterinary care — from wound treatment to post-operative recovery — completely free. No animal turned away. No bill presented. Ever.",
    stat: "4",
    statLabel: "Free clinics operational",
    secondStat: "1.5L+",
    secondStatLabel: "Animals treated to date",
    accentColor: "#0D9488",
    accentLight: "rgba(13, 148, 136, 0.08)",
    accentMid: "rgba(13, 148, 136, 0.15)",
    gradient: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
    image: "/images/clinic/1.jpg",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        <path d="M12 6v6m-3 -3h6" />
      </svg>
    ),
  },
  {
    number: "03",
    label: "REBUILD",
    title: "Arham Animal Hospital",
    subtitle: "The future of animal care in India.",
    description:
      "A state-of-the-art animal hospital — currently under construction — designed to deliver advanced surgical care, long-term rehabilitation, and set a new national standard for how India treats its most vulnerable lives.",
    stat: "1",
    statLabel: "Hospital under construction",
    secondStat: "2026",
    secondStatLabel: "Target completion",
    accentColor: "#7C3AED",
    accentLight: "rgba(124, 58, 237, 0.08)",
    accentMid: "rgba(124, 58, 237, 0.15)",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
    image: "/images/hospital/1.jpeg",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l18 0" />
        <path d="M5 21v-14l8 -4v18" />
        <path d="M19 21v-10l-6 -4" />
        <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
      </svg>
    ),
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return isInView;
}

function AnimatedNumber({ value, isVisible, duration = 1800 }: { value: string; isVisible: boolean; duration?: number }) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!isVisible) return;
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    if (isNaN(numericPart)) {
      setDisplay(value);
      return;
    }
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * numericPart);
      setDisplay(current + suffix);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(value);
    };
    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);
  return display;
}

function PillarCard({ pillar, index }: { pillar: (typeof PILLARS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, 0.15);
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="pillar-card-wrapper"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(60px)",
        transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <div
        className={`pillar-card ${isReversed ? "pillar-card--reversed" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          minHeight: "520px",
          borderRadius: "24px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: isHovered
            ? `0 25px 60px -12px rgba(0,0,0,0.12), 0 0 0 1px ${pillar.accentMid}`
            : "0 4px 24px -4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          direction: isReversed ? "rtl" : "ltr",
        }}
      >
        {/* Image Side */}
        <div
          className="pillar-image"
          style={{
            position: "relative",
            overflow: "hidden",
            background: pillar.accentLight,
            minHeight: "520px",
            direction: "ltr",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(${isReversed ? "to left" : "to right"}, ${pillar.accentColor}11 0%, ${pillar.accentColor}05 100%)`,
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              right: isReversed ? "auto" : "-10px",
              left: isReversed ? "-10px" : "auto",
              fontFamily: "'Open Runde', sans-serif",
              fontSize: "280px",
              fontWeight: "700",
              color: pillar.accentColor,
              opacity: isHovered ? 0.12 : 0.06,
              lineHeight: "1",
              zIndex: 3,
              transition: "opacity 0.5s ease",
              userSelect: "none",
            }}
          >
            {pillar.number}
          </div>
          <div
            style={{
              position: "absolute",
              top: "32px",
              left: "32px",
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: pillar.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                boxShadow: `0 8px 24px -4px ${pillar.accentColor}44`,
              }}
            >
              {pillar.icon}
            </div>
            <span
              style={{
                fontFamily: "'Open Runde', sans-serif",
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "2.5px",
                color: pillar.accentColor,
                background: "#fff",
                padding: "6px 14px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              {pillar.label}
            </span>
          </div>
          <img
            src={pillar.image}
            alt={pillar.title}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
        </div>

        {/* Content Side */}
        <div
          className="pillar-content"
          style={{
            padding: "56px 52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            direction: "ltr",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div
              style={{
                fontFamily: "'Open Runde', sans-serif",
                fontSize: "13px",
                fontWeight: "500",
                color: pillar.accentColor,
                opacity: 0.6,
              }}
            >
              {pillar.number}
            </div>
            <div style={{ height: "1px", width: "40px", background: pillar.accentColor, opacity: 0.25 }} />
            <div
              style={{
                fontFamily: "'Open Runde', sans-serif",
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: "#94A3B8",
                fontWeight: "500",
              }}
            >
              OF 03
            </div>
          </div>

          <h3
            style={{
              fontFamily: "'Open Runde', sans-serif",
              fontSize: "38px",
              fontWeight: "700",
              color: "#0F172A",
              lineHeight: "1.15",
              margin: "0 0 8px 0",
              letterSpacing: "-0.5px",
            }}
          >
            {pillar.title}
          </h3>

          <p
            style={{
              fontFamily: "'Open Runde', sans-serif",
              fontSize: "18px",
              fontStyle: "italic",
              color: pillar.accentColor,
              margin: "0 0 24px 0",
              opacity: 0.8,
            }}
          >
            {pillar.subtitle}
          </p>

          <p
            style={{
              fontSize: "15.5px",
              lineHeight: "1.75",
              color: "#475569",
              margin: "0 0 40px 0",
              fontFamily: "'Open Runde', sans-serif",
            }}
          >
            {pillar.description}
          </p>

          <div style={{ display: "flex", gap: "32px", paddingTop: "32px", borderTop: "1px solid #E2E8F0" }}>
            <div>
              <div
                style={{
                  fontFamily: "'Open Runde', sans-serif",
                  fontSize: "48px",
                  fontWeight: "700",
                  color: pillar.accentColor,
                  lineHeight: "1",
                  marginBottom: "6px",
                }}
              >
                <AnimatedNumber value={pillar.stat} isVisible={isVisible} />
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  fontWeight: "500",
                  color: "#94A3B8",
                  letterSpacing: "0.5px",
                }}
              >
                {pillar.statLabel}
              </div>
            </div>
            <div style={{ width: "1px", background: "#E2E8F0" }} />
            <div>
              <div
                style={{
                  fontFamily: "'Open Runde', sans-serif",
                  fontSize: "48px",
                  fontWeight: "700",
                  color: "#0F172A",
                  lineHeight: "1",
                  marginBottom: "6px",
                }}
              >
                <AnimatedNumber value={pillar.secondStat} isVisible={isVisible} />
              </div>
              <div
                style={{
                  fontSize: "12.5px",
                  fontWeight: "500",
                  color: "#94A3B8",
                  letterSpacing: "0.5px",
                }}
              >
                {pillar.secondStatLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FoundationOfCare() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerVisible = useInView(headerRef, 0.3);

  return (
    <section
      style={{
        position: "relative",
        padding: "120px 0 140px",
        background: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.025) 1px, transparent 0)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "0",
          width: "4px",
          height: "200px",
          background: "linear-gradient(to bottom, #DC2626, #0D9488, #7C3AED)",
          borderRadius: "0 4px 4px 0",
          opacity: 0.3,
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "80px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={{ height: "1px", width: "40px", background: "#CBD5E1" }} />
            <span
              style={{
                fontFamily: "'Open Runde', sans-serif",
                fontSize: "11.5px",
                fontWeight: "600",
                letterSpacing: "3px",
                color: "#94A3B8",
                textTransform: "uppercase",
              }}
            >
              How We Save Lives
            </span>
            <div style={{ height: "1px", width: "40px", background: "#CBD5E1" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Open Runde', sans-serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: "700",
              color: "#0F172A",
              lineHeight: "1.15",
              margin: "0 0 24px 0",
              letterSpacing: "-1.5px",
            }}
          >
            The Foundation of{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #DC2626 0%, #0D9488 50%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Care
            </span>
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#64748B",
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "'Open Runde', sans-serif",
            }}
          >
            From the moment of rescue to full recovery — every animal that enters our care
            moves through a system built to give them the best chance at life.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .pillar-card {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
          .pillar-image {
            min-height: 300px !important;
          }
          .pillar-content {
            padding: 36px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
