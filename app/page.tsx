'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroTextVisible, setHeroTextVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const sections = [
    { id: 'about', label: 'About Me' },
    { id: 'who-work', label: 'Who I Work With' },
    { id: 'testimonials', label: 'Client Reviews' },
    { id: 'offer', label: 'What I Offer' },
    { id: 'cta', label: 'Let\'s Connect' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - scrollTop / heroHeight);
      setHeroOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Poppins:wght@600;700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

        * {
          font-family: 'Liberation Mono', monospace;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Outfit', 'Poppins', sans-serif;
        }

        @keyframes slideInLine {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 80%;
            opacity: 1;
          }
        }

        @keyframes slideInText {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(15px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes hamburgerOpen {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel::-webkit-scrollbar {
          display: none;
        }

        .animate-visible {
          animation: fadeInUp 0.8s ease-out forwards !important;
        }

        .animate-visible-left {
          animation: slideInFromLeft 0.8s ease-out forwards !important;
        }

        .animate-visible-right {
          animation: slideInFromRight 0.8s ease-out forwards !important;
        }

        .animate-visible-scale {
          animation: scaleIn 0.6s ease-out forwards !important;
        }
      `}</style>

      {/* HEADER */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        backgroundColor: '#000000', 
        borderBottom: '2px solid #FFD700', 
        padding: '1rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 800, 
          color: '#ffffff', 
          margin: 0,
          fontFamily: 'Outfit, sans-serif'
        }}>
          AMIRUL KHOO
        </h1>
        
        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <a href="#" style={{ color: '#FFD700', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'opacity 0.3s', fontSize: '1.3rem' }}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" style={{ color: '#FFD700', textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'opacity 0.3s', fontSize: '1.3rem' }}>
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
        
        {/* Hamburger Button */}
        <button
          id="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '0.5rem',
            transition: 'transform 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          <span style={{ width: '25px', height: '3px', backgroundColor: '#ffffff', display: 'block' }}></span>
          <span style={{ width: '25px', height: '3px', backgroundColor: '#ffffff', display: 'block' }}></span>
          <span style={{ width: '25px', height: '3px', backgroundColor: '#ffffff', display: 'block' }}></span>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            backgroundColor: '#000000',
            borderBottom: '2px solid #FFD700',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 99,
            animation: 'hamburgerOpen 0.3s ease-out'
          }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: 600,
                  transition: 'color 0.3s',
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
      }}>
        <img 
          src="/amirulhero.webp" 
          alt="Amirul Khoo" 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: heroOpacity,
            transition: 'opacity 0.1s ease-out',
          }}
        />
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(26, 26, 26, 0.3)',
        }}></div>

        {/* Hero Text */}
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#ffffff',
          zIndex: 10,
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 10vw, 5rem)',
            fontWeight: 800,
            margin: 0,
            marginBottom: '1rem',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.02em',
          }}>
            AMIRUL KHOO
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.8rem)',
            fontWeight: 400,
            margin: 0,
            marginBottom: '2rem',
            color: '#FFD700',
            fontFamily: 'Liberation Mono, monospace',
            letterSpacing: '0.05em',
          }}>
            Live Stronger. Live Longer.
          </p>
        </div>

        {/* Animated Arrow */}
        <div style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          animation: 'bounce 2s ease-in-out infinite',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" data-animate style={{
        padding: '3rem 1.5rem',
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        opacity: visibleSections.has('about') ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            marginBottom: '1rem',
            marginTop: 0,
            fontFamily: 'Outfit, sans-serif',
            color: '#FFD700',
            animation: visibleSections.has('about') ? 'slideInFromLeft 0.8s ease-out' : 'none',
          }}>
            Hi, I'm Amirul Khoo
          </h2>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            marginTop: 0,
            color: '#FFD700',
            fontWeight: 600,
            animation: visibleSections.has('about') ? 'slideInFromLeft 0.8s ease-out 0.05s both' : 'none',
          }}>
            I don't train for the mirror.
          </p>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'flex-start',
          }}>
            <div style={{
              flex: '0 0 180px',
              borderRadius: '0.8rem',
              overflow: 'hidden',
              border: '6px solid #FFD700',
              animation: visibleSections.has('about') ? 'slideInFromLeft 0.8s ease-out 0.1s both' : 'none',
              minWidth: '180px',
            }}>
              <img src="/amirulam.webp" alt="Amirul Khoo" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            
            <div style={{
              flex: 1,
              minWidth: '0',
              animation: visibleSections.has('about') ? 'slideInFromRight 0.8s ease-out 0.2s both' : 'none',
              lineHeight: 1.7,
              fontSize: '0.95rem',
              marginTop: '-0.8rem',
            }}>
              <p style={{ margin: '0.5rem 0', color: '#cccccc' }}>
                I train for real life.
              </p>
              <p style={{ margin: '0.5rem 0', color: '#cccccc' }}>
                Carrying groceries. Playing with your kids. Standing tall after 10 hours at a desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POWER MOTTO LINE */}
      <section style={{
        backgroundColor: '#FFD700',
        color: '#1a1a1a',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            fontWeight: 800,
            margin: 0,
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.3,
          }}>
            Functional movement.<br />
            Consistent effort.<br />
            Zero ego.
          </p>
        </div>
      </section>

      {/* WHO I WORK WITH */}
      <section id="who-work" data-animate style={{
        backgroundColor: '#2a2a2a',
        color: '#1a1a1a',
        padding: '3rem 1.5rem',
        opacity: visibleSections.has('who-work') ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.2rem',
          fontWeight: 800,
          marginTop: 0,
          marginBottom: '2.5rem',
          fontFamily: 'Outfit, sans-serif',
          color: '#FFD700',
        }}>
          Who I Work With
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {[
            'Desk pain all day',
            'New dad, low stamina',
            'Recovering from injury',
            'Weekend warrior, sore Monday',
            'Lost in fitness noise',
            'Gym feels intimidating',
            'Tired of backing down',
            'Want to live longer'
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFD700',
                color: '#1a1a1a',
                padding: '1.2rem',
                borderRadius: '0.8rem',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: '0 12px 32px rgba(255, 255, 255, 0.2)',
                animation: visibleSections.has('who-work') ? `scaleIn 0.5s ease-out ${idx * 0.06}s forwards` : 'none',
                opacity: visibleSections.has('who-work') ? 1 : 0,
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1.4,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* MOTTO SECTIONS */}
      <section style={{
        backgroundColor: '#FFD700',
        color: '#1a1a1a',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{
            fontSize: 'clamp(1.3rem, 4vw, 2rem)',
            fontWeight: 800,
            margin: '0 0 1.5rem 0',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.3,
            color: '#ffffff',
          }}>
            Let's develop real strength and it starts with showing up.
          </p>
          <p style={{
            fontSize: 'clamp(1.3rem, 4vw, 2rem)',
            fontWeight: 800,
            margin: 0,
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.3,
            color: '#1a1a1a',
          }}>
            This is your first step.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" data-animate style={{
        backgroundColor: '#2a2a2a',
        padding: '3rem 1.5rem',
        opacity: visibleSections.has('testimonials') ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.2rem',
          fontWeight: 800,
          marginTop: 0,
          marginBottom: '2.5rem',
          color: '#FFD700',
          fontFamily: 'Outfit, sans-serif',
        }}>
          What My Clients Say
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {[
            {
              quote: "I've never felt this strength before. Couldn't believe Amirul unleashed it in me. I've never felt more confident in my life.",
              author: 'Hazeem A'
            },
            {
              quote: "I was in really bad shape the last two years. Decided to take the small group class. Everyone was a beginner. Gained so much support and new friends. Now I feel confident going to the gym — and about myself.",
              author: 'Sandeep'
            },
            {
              quote: "Work pressure was too much and took a toll on my health. Amirul helped me channel it through workouts. Now I can enjoy life better.",
              author: 'Chloe'
            }
          ].map((testimonial, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#1a1a1a',
                padding: '1.5rem',
                borderRadius: '0.8rem',
                borderLeft: '4px solid #FFD700',
                animation: visibleSections.has('testimonials') ? `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards` : 'none',
                opacity: visibleSections.has('testimonials') ? 1 : 0,
              }}
            >
              <p style={{
                fontSize: '0.9rem',
                lineHeight: 1.5,
                color: '#ffffff',
                fontStyle: 'italic',
                margin: '0 0 1rem 0',
              }}>
                "{testimonial.quote}"
              </p>
              <p style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#FFD700',
                margin: 0,
              }}>
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT I OFFER */}
      <section id="offer" data-animate style={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '3rem 1.5rem',
        opacity: visibleSections.has('offer') ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.2rem',
          fontWeight: 800,
          marginTop: 0,
          marginBottom: '2.5rem',
          color: '#FFD700',
          fontFamily: 'Outfit, sans-serif',
        }}>
          What I Offer
        </h2>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          scrollBehavior: 'smooth',
        }} ref={carouselRef} className="carousel">
          {[
            {
              title: 'Starter Consult',
              items: [
                '30-minute movement check',
                'Find your pain points and goals',
                'Get a simple home routine',
                'Zero sales talk'
              ],
              price: 'FREE',
              priceColor: '#FFD700'
            },
            {
              title: 'Small Group',
              items: [
                'Max 5 guys',
                'Build posture, mobility, real strength',
                'Train outdoors or at a KL gym',
                'WhatsApp support + form feedback'
              ],
              price: 'From RM60/person',
              priceColor: '#FFD700'
            },
            {
              title: '1-on-1 Coaching',
              items: [
                'Custom plan for home, gym, or outdoors',
                'Programming that respects old injuries',
                'Weekly check-ins',
                'Nutrition basics included'
              ],
              price: 'From RM120/week',
              priceColor: '#FFD700'
            }
          ].map((offer, idx) => (
            <div
              key={idx}
              style={{
                flex: '0 0 300px',
                backgroundColor: '#2a2a2a',
                border: '2px solid #FFD700',
                borderRadius: '0.8rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                animation: visibleSections.has('offer') ? `scaleIn 0.5s ease-out ${idx * 0.1}s forwards` : 'none',
                opacity: visibleSections.has('offer') ? 1 : 0,
              }}
            >
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#FFD700',
                margin: '0 0 1.5rem 0',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {offer.title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 2rem 0',
                flex: 1,
              }}>
                {offer.items.map((item, i) => (
                  <li key={i} style={{
                    fontSize: '0.95rem',
                    color: '#cccccc',
                    marginBottom: '0.8rem',
                    lineHeight: 1.6,
                  }}>
                    ✓ {item}
                  </li>
                ))}
              </ul>
              <p style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: offer.priceColor,
                margin: 0,
                textAlign: 'center',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {offer.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MOTTO SECTION - NO FANCY MACHINES */}
      <section style={{
        backgroundColor: '#FFD700',
        color: '#1a1a1a',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{
            fontSize: 'clamp(1.3rem, 4vw, 2rem)',
            fontWeight: 800,
            margin: '0.5rem 0',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.3,
          }}>
            No fancy machines.
          </p>
          <p style={{
            fontSize: 'clamp(1.3rem, 4vw, 2rem)',
            fontWeight: 800,
            margin: '0.5rem 0',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.3,
          }}>
            No confusing plans.
          </p>
          <p style={{
            fontSize: 'clamp(1.3rem, 4vw, 2rem)',
            fontWeight: 800,
            margin: '0.5rem 0',
            fontFamily: 'Outfit, sans-serif',
            lineHeight: 1.3,
          }}>
            Just strength that works where it matters.
          </p>
        </div>
      </section>
      <div style={{
        height: '2px',
        backgroundColor: '#FFD700',
        width: '80px',
        margin: '2rem auto',
      }} />

      {/* CTA */}
      <section id="cta" data-animate style={{
        padding: '3rem 1.5rem',
        backgroundColor: '#2a2a2a',
        opacity: visibleSections.has('cta') ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}>
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
          maxWidth: '1200px',
          margin: '0 auto',
          animation: 'slideInFromLeft 0.6s ease-out',
        }}>
          <div style={{
            flex: '0 0 160px',
            borderRadius: '0.8rem',
            overflow: 'hidden',
            minWidth: '160px',
          }}>
            <img src="/amirulam.webp" alt="Amirul Khoo" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minWidth: '0' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '1rem',
              marginTop: 0,
              color: '#FFD700',
              fontFamily: 'Outfit, sans-serif',
              lineHeight: 1.2,
            }}>
              Let's unleash your inner strength.
            </h2>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#FFD700',
              margin: '0 0 0.5rem 0',
            }}>
              Strength that actually matters.
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#cccccc',
              margin: 0,
              lineHeight: 1.6,
            }}>
              Your work, your family, your life.
              <br />
              Your first step. STARTS NOW.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', maxWidth: '1200px', margin: '2rem auto 0' }}>
          <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6, color: '#cccccc' }}>
            Book your free session today.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                padding: '1rem',
                backgroundColor: '#FFD700',
                color: '#1a1a1a',
                textDecoration: 'none',
                borderRadius: '0.6rem',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                fontFamily: 'Outfit, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 215, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp
            </a>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                padding: '1rem',
                backgroundColor: '#FFD700',
                color: '#1a1a1a',
                textDecoration: 'none',
                borderRadius: '0.6rem',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                fontFamily: 'Outfit, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 215, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className="fab fa-instagram"></i>
              Instagram
            </a>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                padding: '1rem',
                backgroundColor: '#FFD700',
                color: '#1a1a1a',
                textDecoration: 'none',
                borderRadius: '0.6rem',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                fontFamily: 'Outfit, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 215, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className="fab fa-tiktok"></i>
              TikTok
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section style={{
        padding: '2rem 1.5rem',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        textAlign: 'center',
        animation: 'fadeInUp 0.6s ease-out',
      }}>
        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
          © Amirul Khoo 2026
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.85rem', color: '#999' }}>
          Engineered by FatCalico&Co for FatCalico&Co 2026
        </p>
      </section>
    </div>
  );
}
