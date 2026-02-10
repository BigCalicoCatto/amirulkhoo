'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroTextVisible, setHeroTextVisible] = useState(false);
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
    setHeroTextVisible(true);
  }, []);

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
        backgroundColor: '#ffffff', 
        borderBottom: '2px solid #FFD700', 
        padding: '1rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 800, 
          color: '#1a1a1a', 
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
          <span style={{ width: '25px', height: '3px', backgroundColor: '#1a1a1a', display: 'block' }}></span>
          <span style={{ width: '25px', height: '3px', backgroundColor: '#1a1a1a', display: 'block' }}></span>
          <span style={{ width: '25px', height: '3px', backgroundColor: '#1a1a1a', display: 'block' }}></span>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
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
                  color: '#1a1a1a',
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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#ffffff',
          zIndex: 10,
          opacity: heroTextVisible ? 1 : 0,
          animation: heroTextVisible ? 'fadeInUp 0.8s ease-out' : 'none',
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
            Live stronger, live longer, for you and your family
          </p>
        </div>

        {/* Animated Arrow */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
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
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{
            flex: '0 1 300px',
            borderRadius: '0.8rem',
            overflow: 'hidden',
            border: '6px solid #FFD700',
            animation: visibleSections.has('about') ? 'slideInFromLeft 0.8s ease-out' : 'none',
          }}>
            <img src="/amirulam.webp" alt="Amirul Khoo" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          
          <div style={{
            flex: 1,
            minWidth: '300px',
            animation: visibleSections.has('about') ? 'slideInFromRight 0.8s ease-out 0.2s both' : 'none',
          }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              marginTop: 0,
              fontFamily: 'Outfit, sans-serif',
              color: '#FFD700',
            }}>
              Hi, I'm Amirul Khoo
            </h2>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
              color: '#ffffff',
            }}>
              I don't train for the mirror.
            </p>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#cccccc',
              marginBottom: 0,
            }}>
              I train for real life. Carrying groceries. Playing with your kids. Standing tall after 10 hours at a desk.
            </p>
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
            fontSize: 'clamp(1.3rem, 4vw, 2.2rem)',
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
        backgroundColor: '#FFD700',
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
        }}>
          Who I Work With
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                padding: '2rem',
                borderRadius: '0.8rem',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)',
                animation: visibleSections.has('who-work') ? `scaleIn 0.5s ease-out ${idx * 0.06}s forwards` : 'none',
                opacity: visibleSections.has('who-work') ? 1 : 0,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section style={{
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 800,
            margin: '0 0 3rem 0',
            fontFamily: 'Outfit, sans-serif',
            color: '#FFD700',
          }}>
            187 clients • 5 years • 1 promise
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}>
            <div>
              <p style={{
                fontSize: '3rem',
                fontWeight: 800,
                margin: '0 0 0.5rem 0',
                color: '#FFD700',
                fontFamily: 'Outfit, sans-serif',
              }}>
                187
              </p>
              <p style={{ fontSize: '1.1rem', margin: 0, color: '#cccccc' }}>
                Clients Trained
              </p>
            </div>
            <div>
              <p style={{
                fontSize: '3rem',
                fontWeight: 800,
                margin: '0 0 0.5rem 0',
                color: '#FFD700',
                fontFamily: 'Outfit, sans-serif',
              }}>
                5+
              </p>
              <p style={{ fontSize: '1.1rem', margin: 0, color: '#cccccc' }}>
                Years Experience
              </p>
            </div>
            <div>
              <p style={{
                fontSize: '3rem',
                fontWeight: 800,
                margin: '0 0 0.5rem 0',
                color: '#FFD700',
                fontFamily: 'Outfit, sans-serif',
              }}>
                100%
              </p>
              <p style={{ fontSize: '1.1rem', margin: 0, color: '#cccccc' }}>
                Commitment
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '1.3rem',
            lineHeight: 1.6,
            color: '#ffffff',
            marginBottom: '1rem',
            fontWeight: 600,
          }}>
            Let's develop real strength and it starts with showing up.
          </p>
          <p style={{
            fontSize: '1.1rem',
            color: '#FFD700',
            margin: 0,
            fontWeight: 700,
          }}>
            This is your first step.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" data-animate style={{
        backgroundColor: '#ffffff',
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
          color: '#1a1a1a',
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
                backgroundColor: '#f5f5f5',
                padding: '2rem',
                borderRadius: '0.8rem',
                borderLeft: '4px solid #FFD700',
                animation: visibleSections.has('testimonials') ? `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards` : 'none',
                opacity: visibleSections.has('testimonials') ? 1 : 0,
              }}
            >
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#1a1a1a',
                fontStyle: 'italic',
                margin: '0 0 1.5rem 0',
              }}>
                "{testimonial.quote}"
              </p>
              <p style={{
                fontSize: '0.95rem',
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
          marginBottom: '0.5rem',
          color: '#FFD700',
          fontFamily: 'Outfit, sans-serif',
        }}>
          What I Offer
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#cccccc',
          marginBottom: '2.5rem',
        }}>
          No fancy machines. No confusing plans. Just strength that works where it matters.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          scrollBehavior: 'smooth',
          ref: carouselRef,
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

      {/* Premium Line */}
      <div style={{
        height: '2px',
        backgroundColor: '#FFD700',
        width: '80px',
        margin: '2rem auto',
      }} />

      {/* CTA */}
      <section id="cta" data-animate style={{
        padding: '3rem 1.5rem',
        backgroundColor: '#f5f5f5',
        opacity: visibleSections.has('cta') ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}>
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          maxWidth: '1200px',
          margin: '0 auto',
          animation: 'slideInFromLeft 0.6s ease-out',
        }}>
          <div style={{
            flex: '0 0 auto',
            width: '160px',
            borderRadius: '0.8rem',
            overflow: 'hidden',
          }}>
            <img src="/amirulam.webp" alt="Amirul Khoo" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ flex: 1, minWidth: '0' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              marginBottom: '1rem',
              marginTop: 0,
              color: '#1a1a1a',
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
              color: '#666',
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
          <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6, color: '#1a1a1a' }}>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.969 1.523A9.937 9.937 0 002.121 12a9.935 9.935 0 001.52 4.977A9.87 9.87 0 008.07 19.88h.004c2.46 0 4.709-.822 6.552-2.36.306-.272.603-.56.889-.862-3.982-.424-7.126-3.86-7.126-7.658 0-3.798 3.144-7.234 7.126-7.658-.286-.302-.583-.59-.889-.862-1.843-1.538-4.092-2.36-6.552-2.36z"/>
              </svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              </svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.321 5.562a5.122 5.122 0 01-2.996-2.965A5.408 5.408 0 0012.4 1c-3.003 0-5.544 2.563-5.544 5.622 0 .442.052.872.144 1.287-2.324-.12-4.657-1.213-6.234-2.966C-.243 2.97-.604 3.956.247 4.721c.852.765 2.397 1.201 3.942 1.201.63 0 1.248-.084 1.846-.252v1.004c0 3.059 2.54 5.622 5.544 5.622 1.46 0 2.81-.559 3.777-1.468.897.059 1.799.237 2.664.527.643-2.084-.494-3.959-2.211-4.88 1.031-.169 1.99-.427 2.872-.766z"/>
              </svg>
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
