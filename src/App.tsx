import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ArrowRight,
  Volume2,
  VolumeX,
  Mail,
  ArrowLeft,
  Disc,
  Phone,
  Github,
  Linkedin,
  Globe,
  GraduationCap,
  Briefcase,
  Trophy,
  Layout,
  Server,
  Database,
  Code2,
  FileText
} from "lucide-react";

type Tab = "home" | "about" | "projects" | "services" | "contact";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Contact form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  // Typewriter effect state
  const words = [
    "scalable web applications.",
    "beautiful UI/UX.",
    "robust RESTful APIs.",
    "innovative tech solutions."
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Typewriter Effect logic
  useEffect(() => {
    if (subIdx === words[wordIdx].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 1700);
      return () => clearTimeout(timeout);
    }

    if (subIdx === 0 && isDeleting) {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIdx((prev) => prev + (isDeleting ? -1 : 1));
      setTypedText(words[wordIdx].substring(0, subIdx + (isDeleting ? -1 : 1)));
    }, isDeleting ? 45 : 95);

    return () => clearTimeout(timeout);
  }, [subIdx, isDeleting, wordIdx]);

  // Smooth scroll scroll-to-section helper
  const handleNavClick = (sectionId: Tab) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  // Sync scroll position with navigation active state
  useEffect(() => {
    const sections: Tab[] = ["home", "about", "projects", "services", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTab(id);
            }
          });
        },
        { threshold: 0.2, rootMargin: "-20% 0px -55% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);



  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${contactName}`);
    const body = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`);
    
    setFeedback("A coordinate has been saved. Opening your email app with a pre-filled draft...");
    
    setTimeout(() => {
      window.location.href = `mailto:chauhankunal695@gmail.com?subject=${subject}&body=${body}`;
      setFeedback("");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground flex flex-col font-sans">
      {/* Cinematic dark radial backdrop */}
      <div className="cinematic-bg"></div>

      {/* 1. Fullscreen Looping Background Video */}
      <video
        id="bg-video"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-[1500ms]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      {/* Sound Controller (Discrete utility for cinematic ambient audio) */}
      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          id="sound-toggle"
          onClick={() => setIsMuted(!isMuted)}
          className="liquid-glass p-3 rounded-full text-foreground hover:scale-[1.08] transition-all duration-300 cursor-pointer flex items-center justify-center"
          title={isMuted ? "Unmute immersive sound" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
          ) : (
            <Volume2 className="size-4 animate-pulse text-foreground" />
          )}
        </button>
        <span className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase select-none opacity-60">
          Ambient Audio {isMuted ? "OFF" : "ON"}
        </span>
      </div>

      {/* 2. Glassmorphic Sticky Navigation Bar */}
      <header className="sticky top-0 z-30 w-full bg-background/30 backdrop-blur-lg border-b border-white/[0.04] transition-all duration-300">
        <div className="flex flex-row justify-between items-center px-8 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            id="logo-button"
            className="text-3xl tracking-tight text-foreground transition-transform hover:scale-[1.01] active:scale-95 cursor-pointer text-left font-normal"
            style={{ fontFamily: "var(--font-display)" }}
            onClick={() => handleNavClick("home")}
          >
            Kunal Chauhan<sup className="text-xs">.</sup>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex flex-row items-center gap-8">
            {(["home", "about", "projects", "services", "contact"] as const).map((tab) => (
              <button
                id={`nav-${tab}`}
                key={tab}
                onClick={() => handleNavClick(tab)}
                className={`text-sm tracking-wide capitalize transition-colors duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "text-foreground font-medium border-b border-white/20 pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "contact" ? "Contact Me" : tab}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button & CV Link */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/cv.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-mono flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
            >
              <FileText className="size-3.5" />
              <span>View CV</span>
            </a>
            <button
              id="nav-cta-button"
              onClick={() => handleNavClick("contact")}
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              Begin Journey
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden liquid-glass p-2.5 rounded-full text-foreground cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu-drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-4 right-4 liquid-glass rounded-2xl p-6 flex flex-col gap-4 md:hidden z-30"
            >
              {(["home", "about", "projects", "services", "contact"] as const).map((tab) => (
                <button
                  id={`mobile-nav-${tab}`}
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`text-base tracking-wide text-left capitalize py-2 border-b border-white/5 transition-colors duration-300 cursor-pointer ${
                    activeTab === tab
                      ? "text-foreground font-medium pl-2"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "contact" ? "Contact Me" : tab}
                </button>
              ))}
              <div className="flex flex-col gap-3.5 mt-2">
                <a
                  href="/cv.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/10 hover:bg-white/5 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="size-4" />
                  <span>View CV</span>
                </a>
                <button
                  id="mobile-nav-cta-button"
                  onClick={() => handleNavClick("contact")}
                  className="liquid-glass rounded-full w-full py-3.5 text-sm text-foreground hover:scale-[1.02] transition-transform duration-300"
                >
                  Begin Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Hero Section & Content Wrapper */}
      <main className="relative z-10 flex-1 w-full px-6 py-[40px]">
        <div className="max-w-5xl w-full mx-auto flex flex-col gap-28 md:gap-40 items-center">
          
          {/* Section: Home (Landing view) */}
          <section
            id="home"
            className="min-h-[80vh] flex flex-col items-center justify-center text-center w-full scroll-mt-28"
          >
            <div className="max-w-3xl w-full flex flex-col items-center">
              {/* Main Heading H1 with strict animate-fade-rise class */}
              <h1
                id="hero-heading"
                className="animate-fade-rise text-4xl sm:text-6xl md:text-[80px] leading-[1.05] tracking-[-2px] font-normal text-foreground select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Building <span className="not-italic text-muted-foreground font-light">{typedText}</span><span className="animate-pulse">|</span>
              </h1>

              {/* Subtext with strict animate-fade-rise-delay class */}
              <p
                id="hero-subtext"
                className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-xl mt-8 leading-relaxed font-normal"
              >
                I'm Kunal Chauhan, a full-stack developer and BCA student at COER University (9.0 CGPA) crafting highly interactive, visual, and secure full-stack web architectures. I design digital structures that blend meticulous technical execution with silent, robust craftsmanship.
              </p>

              {/* Hero CTA Button with strict animate-fade-rise-delay-2 class */}
              <div className="animate-fade-rise-delay-2 flex flex-col sm:flex-row items-center gap-4 mt-10">
                <button
                  id="hero-cta-button"
                  onClick={() => handleNavClick("projects")}
                  className="liquid-glass rounded-full px-10 py-4.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer font-medium tracking-wide"
                >
                  View My Work
                </button>
                <button
                  id="hero-secondary-button"
                  onClick={() => handleNavClick("contact")}
                  className="rounded-full border border-white/10 px-10 py-4.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 hover:scale-[1.03] transition-all duration-300 cursor-pointer font-medium tracking-wide"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </section>

          {/* Section: About (Philosophy, Education, Experience) */}
          <section
            id="about"
            className="w-full scroll-mt-28 flex flex-col items-center text-center"
          >
            <div className="mb-4">
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Biography & Philosophy</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl text-foreground font-normal mb-8 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The quiet rebellion.
            </h2>
            
            {/* Philosophy Glassmorphic Box */}
            <div className="liquid-glass p-8 sm:p-12 rounded-3xl text-left border border-white/[0.03] mb-8 w-full">
              <p className="text-foreground text-lg sm:text-xl font-normal leading-relaxed mb-6 italic" style={{ fontFamily: "var(--font-display)" }}>
                "Our digital creations are a manifestation of absolute technical clarity. I believe the future belongs to those who learn to design without the constant friction of bloated workflows."
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                Why must every modern tool scream for attention or introduce unnecessary layers of lag? I do the opposite. I construct software that is robust, compiles cleanly, executes instantly with high-fidelity visual feedback, and operates beautifully under heavy load.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                With expertise spanning typesafe databases, responsive UI primitives, and cloud-native backends, I construct lightweight but durable environments designed for ultimate user utility.
              </p>
            </div>

            {/* Education and Experience Timelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12 w-full">
              
              {/* Experience Timeline */}
              <div className="liquid-glass p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-normal mb-6 text-foreground flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                  <Briefcase className="size-5 text-muted-foreground" />
                  <span>Professional Experience</span>
                </h3>
                <div className="space-y-6">
                  <div className="border-l border-white/10 pl-4 relative">
                    <div className="absolute size-2.5 rounded-full bg-foreground left-[-5.5px] top-1.5"></div>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase">June 2024</span>
                    <h4 className="text-sm font-medium text-foreground mt-1">Software Engineering Intern</h4>
                    <span className="text-[11px] text-muted-foreground">Java & MySQL Training</span>
                    <p className="text-xs text-muted-foreground/85 mt-2">
                      Built end-to-end JDBC applications, normalized relational schemas, practiced advanced queries, and structured CRUD modules.
                    </p>
                  </div>
                  <div className="border-l border-white/10 pl-4 relative">
                    <div className="absolute size-2.5 rounded-full bg-foreground left-[-5.5px] top-1.5"></div>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase">2024</span>
                    <h4 className="text-sm font-medium text-foreground mt-1">2nd Place Winner — Hackathon</h4>
                    <span className="text-[11px] text-muted-foreground">COER University</span>
                    <p className="text-xs text-muted-foreground/85 mt-2">
                      Competed against top engineering minds to design and build a functioning web prototype under strict deadline limits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Card */}
              <div className="liquid-glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-normal mb-6 text-foreground flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                    <GraduationCap className="size-5 text-muted-foreground" />
                    <span>Education</span>
                  </h3>
                  <div className="border-l border-white/10 pl-4 relative">
                    <div className="absolute size-2.5 rounded-full bg-foreground left-[-5.5px] top-1.5"></div>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase">2024 – 2028</span>
                    <h4 className="text-sm font-medium text-foreground mt-1">Bachelor of Computer Applications (BCA)</h4>
                    <span className="text-[11px] text-muted-foreground">COER University, Roorkee</span>
                    <p className="text-xs text-muted-foreground/85 mt-2">
                      <strong>Active CGPA:</strong> 9.0 / 10.0
                    </p>
                    <p className="text-xs text-muted-foreground/85 mt-2">
                      <strong>Relevant Modules:</strong> Data Structures, System Algorithms, DBMS, OOP Core, Web Engineering Primitives.
                    </p>
                  </div>
                </div>
                <div className="mt-6 font-mono text-[9px] text-muted-foreground pt-4 border-t border-white/5 uppercase tracking-widest text-center">
                  Open to internships & freelance
                </div>
              </div>

            </div>
          </section>

          {/* Section: Projects (Creations & Skills) */}
          <section
            id="projects"
            className="w-full scroll-mt-28 flex flex-col items-center text-center"
          >
            <div className="mb-4">
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Selected Creations</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl text-foreground font-normal mb-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Projects
            </h2>

            {/* Grid of actual projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mb-12 w-full">
              
              {/* Featured Project */}
              <div className="md:col-span-2 lg:col-span-3 liquid-glass p-8 rounded-2xl flex flex-col justify-between min-h-[260px] border border-white/5 relative group hover:border-white/10 transition-colors duration-300">
                <span className="absolute top-6 right-6 font-mono text-[9px] bg-white/10 px-2.5 py-1 rounded-full text-foreground tracking-widest uppercase flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span> FEATURED CREATION
                </span>
                <div>
                  <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">01 // FULL STACK SYSTEM</span>
                  <h3 className="text-3xl mt-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    Developer Portfolio & Client System
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-3xl">
                    A full-stack personal portfolio integrated with a secure client portal workflow. Clients can sign up, log in, initiate freelance projects, and track real-time project schedules and delivery status. Streamlines the complete contract workflow.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">Next.js</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">Node.js</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">MongoDB</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">JWT Auth</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">React</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">Tailwind CSS</span>
                  </div>
                  <a
                    href="https://deadraon.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-foreground hover:underline flex items-center gap-1"
                  >
                    <span>deadraon.dev</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>

              {/* Project 2: GainIQ */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col justify-between min-h-[240px] transition-transform hover:translate-y-[-4px] duration-300 border border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">02 // HEALTH ARCHITECTURE</span>
                  <h3 className="text-2xl mt-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    GainIQ
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    A comprehensive fitness mobile application providing personalized AI-driven diet planning, macro computations, and dynamically structured workout plans.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-muted-foreground mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Flutter</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Node.js</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Firebase</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Android Build Done</span>
                </div>
              </div>

              {/* Project 3: Taj View Residency */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col justify-between min-h-[240px] transition-transform hover:translate-y-[-4px] duration-300 border border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">03 // FRONTEND REAL ESTATE</span>
                  <h3 className="text-2xl mt-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    Taj View Residency
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    A high-end, premium booking application crafted for luxury hospitality. Features smooth room filterings, interactive carousels, and visual gallery boards.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-muted-foreground mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-white/5">React</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">HTML/CSS</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">UI/UX</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">Client Reviewing</span>
                </div>
              </div>

              {/* Project 4: Shivaay Fitness */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col justify-between min-h-[240px] transition-transform hover:translate-y-[-4px] duration-300 border border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">04 // MOBILE CORE</span>
                  <h3 className="text-2xl mt-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    Shivaay Fitness
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    A specialized gym administration portal helping local gyms coordinate member check-ins, fee records, and trainer timelines.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Flutter</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Dart</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Java</span>
                  </div>
                  <a href="https://github.com/deadraon" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-foreground hover:underline">Code</a>
                </div>
              </div>

              {/* Project 5: Lifeline Hospital */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col justify-between min-h-[240px] transition-transform hover:translate-y-[-4px] duration-300 border border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">05 // HEALTH INFRASTRUCTURE</span>
                  <h3 className="text-2xl mt-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    Lifeline Hospital
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    A robust, interactive web portal engineered for patient clinical scheduling, consulting directories, and secure medical details.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-white/5">React</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Node.js</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">MongoDB</span>
                  </div>
                  <a href="https://github.com/deadraon" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-foreground hover:underline">Code</a>
                </div>
              </div>

              {/* Project 6: Om Chaudhary Hospital */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col justify-between min-h-[240px] transition-transform hover:translate-y-[-4px] duration-300 border border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">06 // HOSPITAL WEB</span>
                  <h3 className="text-2xl mt-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    Om Chaudhary Hospital
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    A specialized hospital booking architecture designed to streamline patient appointments and showcase active medical clinics.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Next.js</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Express</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">Database</span>
                  </div>
                  <a href="https://github.com/deadraon" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-foreground hover:underline">Code</a>
                </div>
              </div>

              {/* Project 7: Rustic House */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col justify-between min-h-[240px] transition-transform hover:translate-y-[-4px] duration-300 border border-white/5">
                <div>
                  <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">07 // DIGITAL RETAIL</span>
                  <h3 className="text-2xl mt-3 text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    Rustic House
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    A modern, interactive restaurant website featuring dynamic visual menus, high-fidelity imagery, and client booking interfaces.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[8px] text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-full bg-white/5">React</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">CSS3</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5">JavaScript</span>
                  </div>
                  <a href="https://github.com/deadraon" target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-foreground hover:underline">Code</a>
                </div>
              </div>

            </div>

            {/* Tech Stack List */}
            <div className="liquid-glass p-8 rounded-2xl text-left border border-white/5 mb-12 w-full">
              <span className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase block mb-4">The Primary Core Arsenal</span>
              <div className="flex flex-wrap gap-3">
                {[
                  "Next.js",
                  "React 19",
                  "TypeScript",
                  "Flutter",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "MySQL",
                  "SQL / NoSQL",
                  "Firebase",
                  "Tailwind CSS",
                  "C/C++ & Java",
                  "Dart",
                  "UI/UX Design",
                  "Azure",
                  "Git",
                  "Figma"
                ].map((tech) => (
                  <span key={tech} className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.02] border border-white/10 text-foreground transition-all hover:bg-white/10 select-none">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Services (What I Do) */}
          <section
            id="services"
            className="w-full scroll-mt-28 flex flex-col items-center text-center"
          >
            <div className="mb-4">
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Services</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl text-foreground font-normal mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What I Do
            </h2>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12 w-full">
              
              {/* Card 1: Frontend Development */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col min-h-[220px] border border-white/5">
                <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground mb-6">
                  <Layout className="size-5" />
                </div>
                <h3 className="text-xl font-normal text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Frontend Development
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Building highly interactive, responsive, and accessible user interfaces using React, Next.js, HTML5, CSS3, and modern JavaScript/TypeScript framework standards.
                </p>
              </div>

              {/* Card 2: Backend Architecture */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col min-h-[220px] border border-white/5">
                <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground mb-6">
                  <Server className="size-5" />
                </div>
                <h3 className="text-xl font-normal text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Backend Architecture
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Designing robust RESTful APIs, core business workflows, and secure microservices utilizing Node.js, Express, and secure authentication schemas.
                </p>
              </div>

              {/* Card 3: Database Management */}
              <div className="liquid-glass p-8 rounded-2xl flex flex-col min-h-[220px] border border-white/5">
                <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground mb-6">
                  <Database className="size-5" />
                </div>
                <h3 className="text-xl font-normal text-foreground mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Database Management
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Structuring efficient database schemas, data normalization patterns, and writing complex, optimized queries for both NoSQL (MongoDB, Firebase) and SQL (MySQL).
                </p>
              </div>

            </div>
          </section>

          {/* Section: Contact (Contact Coordinate) */}
          <section
            id="contact"
            className="w-full scroll-mt-28 flex flex-col items-center text-center mb-10"
          >
            <div className="mb-4">
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Connection</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl text-foreground font-normal mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contact Me
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">
              Drop an impulse. Share your project resonance. Let's build together in the quiet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left w-full">
              
              {/* Left Column: Direct Links */}
              <div className="liquid-glass p-8 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[300px]">
                <div>
                  <h3 className="text-2xl font-normal mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    Direct Pulse
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    Always ready to collaborate on innovative projects, backend systems, responsive layouts, or specialized student research cohorts.
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <a href="mailto:chauhankunal695@gmail.com" className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                      <Mail className="size-4" />
                      <span>chauhankunal695@gmail.com</span>
                    </a>
                    <a href="tel:+916396714325" className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                      <Phone className="size-4" />
                      <span>+91 6396714325</span>
                    </a>
                    <a href="https://github.com/deadraon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                      <Github className="size-4" />
                      <span>github.com/deadraon</span>
                    </a>
                    <a href="https://linkedin.com/in/deadraon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                      <Linkedin className="size-4" />
                      <span>linkedin.com/in/deadraon</span>
                    </a>
                    <a href="https://deadraon.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                      <Globe className="size-4" />
                      <span>deadraon.dev</span>
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-center">
                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/10 hover:bg-white/5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
                  >
                    <FileText className="size-4" />
                    <span>Interactive CV / PDF</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="liquid-glass p-8 rounded-2xl border border-white/5 min-h-[300px]">
                {feedback ? (
                  <motion.div
                    id="contact-feedback"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex items-center justify-center text-center p-6"
                  >
                    <p className="text-lg text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                      {feedback}
                    </p>
                  </motion.div>
                ) : (
                  <form id="contact-form" onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest pl-1">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Name"
                        className="bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest pl-1">
                        Your Coordinate (Email)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-message" className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest pl-1">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Share your resonance..."
                        className="bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>

                    <button
                      id="contact-submit"
                      type="submit"
                      className="liquid-glass rounded-full py-3 text-xs text-foreground hover:scale-[1.02] active:scale-98 transition-transform cursor-pointer mt-2 text-center flex items-center justify-center gap-2 group font-mono uppercase tracking-wider"
                    >
                      <span>Transmit Message</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>
        </div>
      </main>

      {/* 4. Elegant Minimal Footer */}
      <footer className="relative z-10 w-full mt-auto py-6 px-8 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground select-none">
          <div className="font-mono uppercase tracking-wider opacity-60">
            © {new Date().getFullYear()} Kunal Chauhan®. All silences reserved.
          </div>
          <div className="flex gap-6 font-mono text-[10px]">
            <span className="hover:text-foreground transition-colors cursor-help">COORDINATE 28.7041° N, 77.1025° E</span>
            <span className="hover:text-foreground transition-colors">PORTFOLIO V2.2.0</span>
          </div>
        </div>
      </footer>


    </div>
  );
}
