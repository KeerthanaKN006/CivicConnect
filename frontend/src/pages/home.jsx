import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      title: "Report Problems",
      desc: "Snap a photo of potholes, broken streetlights, or overflowing bins. Our intelligent system automatically tags your location and routes the report to the right department.",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
      icon: ""
    },
    {
      title: "Track Progress",
      desc: "Watch as your reports move through stages from submission to resolution. Receive notifications when authorities acknowledge, investigate, and complete repairs.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      icon: ""
    },
    {
      title: "Join the Community",
      desc: "Connect with neighbors who care about your area. Upvote critical issues, share insights, and celebrate improvements together as your city transforms.",
      img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=500&fit=crop",
      icon: ""
    },
  ];

  const testimonials = [
    {
      text: "Within three days of reporting a dangerous pothole, the road was repaired. This platform actually works and saves lives.",
      author: "Priya Sharma",
      role: "Local Resident"
    },
    {
      text: "As a municipal worker, this system helps us prioritize urgent issues and respond faster than ever before. Game changer.",
      author: "Rajesh Kumar",
      role: "Public Works Department"
    },
    {
      text: "I reported five broken streetlights in my neighborhood. All were fixed within a week. Finally, citizens have a voice.",
      author: "Anjali Mehta",
      role: "Community Volunteer"
    }
  ];

  const process = [
    {
      step: "Spot the Issue",
      desc: "Notice a problem during your daily commute or walk"
    },
    {
      step: "Capture & Report",
      desc: "Take a photo and submit with location tagging"
    },
    {
      step: "Automated Routing",
      desc: "System assigns to the relevant department instantly"
    },
    {
      step: "Track & Resolve",
      desc: "Monitor progress and receive updates until completion"
    }
  ];

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const styles = {
    home: {
      fontFamily: "'Poppins', sans-serif",
      color: "#1a1a2e",
      background: "#ffffff",
      minHeight: "100vh",
      textAlign: "center",
      overflowX: "hidden",
      width: "100%",
      margin: 0,
      padding: 0,
    },
    hero: {
      padding: "140px 5% 120px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#ffffff",
      position: "relative",
      width: "100%",
      boxSizing: "border-box",
    },
    heroTitle: {
      fontSize: "4.2rem",
      marginBottom: "25px",
      fontWeight: "800",
      letterSpacing: "-2px",
      animation: "slideDown 1s ease-out",
      lineHeight: "1.2",
      textShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    heroSubtitle: {
      fontSize: "1.6rem",
      marginBottom: "20px",
      color: "#f0f0f0",
      fontWeight: "400",
      animation: "slideUp 1s ease-out 0.2s backwards",
      maxWidth: "900px",
      margin: "0 auto 20px",
      lineHeight: "1.6",
    },
    heroDescription: {
      fontSize: "1.15rem",
      color: "#e8e8e8",
      maxWidth: "1000px",
      margin: "0 auto 40px",
      lineHeight: "1.8",
      animation: "fadeIn 1s ease-out 0.4s backwards",
    },
    ctaBtn: {
      background: "#ffffff",
      color: "#667eea",
      border: "none",
      padding: "18px 50px",
      borderRadius: "50px",
      fontSize: "1.15rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: "700",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      animation: "fadeIn 1s ease-out 0.6s backwards",
      marginRight: "15px",
    },
    ctaBtnSecondary: {
      background: "transparent",
      color: "#ffffff",
      border: "2px solid #ffffff",
      padding: "16px 48px",
      borderRadius: "50px",
      fontSize: "1.15rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: "600",
      animation: "fadeIn 1s ease-out 0.6s backwards",
    },
    featuresContainer: {
      padding: "120px 5%",
      background: "#f8f9fd",
      width: "100%",
      boxSizing: "border-box",
    },
    sectionTitle: {
      fontSize: "3.2rem",
      marginBottom: "20px",
      color: "#1a1a2e",
      fontWeight: "800",
      letterSpacing: "-1px",
    },
    sectionSubtitle: {
      fontSize: "1.3rem",
      color: "#6c757d",
      maxWidth: "900px",
      margin: "0 auto 80px",
      lineHeight: "1.8",
    },
    carouselWrapper: {
      maxWidth: "100%",
      margin: "0 auto",
      position: "relative",
      height: "550px",
      perspective: "2000px",
    },
    featureCard: {
      background: "#ffffff",
      borderRadius: "24px",
      border: "none",
      padding: "0",
      width: "100%",
      maxWidth: "900px",
      position: "absolute",
      left: "50%",
      top: "50%",
      transition: "all 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
      overflow: "hidden",
    },
    featureImageContainer: {
      width: "100%",
      height: "320px",
      overflow: "hidden",
      position: "relative",
    },
    featureImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    featureContent: {
      padding: "50px",
      textAlign: "left",
    },
    featureIcon: {
      fontSize: "3rem",
      marginBottom: "20px",
      display: "block",
    },
    featureTitle: {
      fontSize: "2.2rem",
      marginBottom: "20px",
      color: "#1a1a2e",
      fontWeight: "700",
    },
    featureDesc: {
      fontSize: "1.2rem",
      color: "#6c757d",
      lineHeight: "1.9",
    },
    indicators: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      marginTop: "80px",
    },
    indicator: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "#cbd5e0",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    indicatorActive: {
      width: "40px",
      borderRadius: "6px",
      background: "#667eea",
    },
    processSection: {
      padding: "120px 5%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      width: "100%",
      boxSizing: "border-box",
    },
    processSectionTitle: {
      fontSize: "3.2rem",
      marginBottom: "20px",
      color: "#ffffff",
      fontWeight: "800",
      letterSpacing: "-1px",
    },
    processSectionSubtitle: {
      fontSize: "1.3rem",
      color: "#f0f0f0",
      maxWidth: "900px",
      margin: "0 auto 80px",
      lineHeight: "1.8",
    },
    processGrid: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      maxWidth: "1600px",
      margin: "0 auto",
      flexWrap: "wrap",
    },
    processCard: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "50px 40px",
      flex: "1",
      minWidth: "280px",
      maxWidth: "350px",
      border: "none",
      transition: "all 0.4s ease",
      position: "relative",
    },
    processNumber: {
      fontSize: "4rem",
      fontWeight: "800",
      color: "#f0f0f0",
      position: "absolute",
      top: "30px",
      right: "30px",
      lineHeight: "1",
    },
    processStep: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1a1a2e",
      marginBottom: "15px",
      marginTop: "10px",
    },
    processDesc: {
      fontSize: "1.05rem",
      color: "#6c757d",
      lineHeight: "1.7",
    },
    testimonialSection: {
      padding: "120px 5%",
      background: "#f8f9fd",
      width: "100%",
      boxSizing: "border-box",
    },
    testimonialCarousel: {
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative",
      height: "320px",
    },
    testimonialCard: {
      position: "absolute",
      width: "100%",
      padding: "60px 80px",
      background: "#ffffff",
      borderRadius: "24px",
      transition: "all 0.8s ease",
      left: "50%",
      top: "50%",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
    },
    testimonialText: {
      fontSize: "1.5rem",
      color: "#1a1a2e",
      marginBottom: "35px",
      fontStyle: "italic",
      lineHeight: "1.8",
      fontWeight: "400",
    },
    testimonialAuthor: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#667eea",
      marginBottom: "8px",
    },
    testimonialRole: {
      fontSize: "1.05rem",
      color: "#6c757d",
    },
    infoSection: {
      padding: "120px 5%",
      background: "#ffffff",
      width: "100%",
      boxSizing: "border-box",
    },
    infoGrid: {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      maxWidth: "1600px",
      margin: "0 auto",
      flexWrap: "wrap",
    },
    infoCard: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "24px",
      padding: "50px",
      flex: "1",
      minWidth: "320px",
      maxWidth: "450px",
      border: "none",
      textAlign: "left",
      transition: "all 0.4s ease",
      color: "#ffffff",
    },
    infoIcon: {
      fontSize: "3.5rem",
      marginBottom: "25px",
    },
    infoTitle: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#ffffff",
      marginBottom: "18px",
    },
    infoDesc: {
      fontSize: "1.1rem",
      color: "#f0f0f0",
      lineHeight: "1.8",
    },
    footer: {
      padding: "80px 5% 50px",
      background: "#1a1a2e",
      color: "#ffffff",
      width: "100%",
      boxSizing: "border-box",
    },
    footerContent: {
      maxWidth: "1600px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "60px",
      marginBottom: "50px",
    },
    footerSection: {
      flex: "1",
      minWidth: "220px",
      textAlign: "left",
    },
    footerTitle: {
      fontSize: "1.4rem",
      fontWeight: "700",
      marginBottom: "25px",
      color: "#ffffff",
    },
    footerLink: {
      display: "block",
      color: "#b8b8b8",
      fontSize: "1.05rem",
      marginBottom: "14px",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    footerBottom: {
      borderTop: "1px solid #2d2d44",
      paddingTop: "35px",
      fontSize: "1rem",
      color: "#b8b8b8",
    },
  };

  const getCardStyle = (index) => {
    const diff = (index - currentFeature + features.length) % features.length;
    
    if (diff === 0) {
      return {
        ...styles.featureCard,
        transform: "translate(-50%, -50%) scale(1) rotateY(0deg)",
        opacity: 1,
        zIndex: 3,
      };
    } else if (diff === 1) {
      return {
        ...styles.featureCard,
        transform: "translate(-25%, -50%) scale(0.8) rotateY(-35deg)",
        opacity: 0.4,
        zIndex: 2,
        pointerEvents: "none",
      };
    } else if (diff === features.length - 1) {
      return {
        ...styles.featureCard,
        transform: "translate(-75%, -50%) scale(0.8) rotateY(35deg)",
        opacity: 0.4,
        zIndex: 2,
        pointerEvents: "none",
      };
    } else {
      return {
        ...styles.featureCard,
        transform: "translate(-50%, -50%) scale(0.6) rotateY(0deg)",
        opacity: 0,
        zIndex: 1,
        pointerEvents: "none",
      };
    }
  };

  const getTestimonialStyle = (index) => {
    const diff = (index - currentTestimonial + testimonials.length) % testimonials.length;
    
    if (diff === 0) {
      return {
        ...styles.testimonialCard,
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
        zIndex: 3,
      };
    } else {
      return {
        ...styles.testimonialCard,
        transform: "translate(-50%, -50%) scale(0.9)",
        opacity: 0,
        zIndex: 1,
      };
    }
  };

  const handleStartReporting = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div style={styles.home}>
      <header style={styles.hero}>
        <h1 style={styles.heroTitle}>Transforming Cities Together</h1>
        <p style={styles.heroSubtitle}>
          Empowering citizens to report civic issues and municipalities to respond faster
        </p>
        <p style={styles.heroDescription}>
          CivicConnect bridges the gap between communities and local governments. 
          Report problems in seconds, track resolutions in real-time, and watch your city improve one fix at a time.
        </p>
        <div>
          <button
            style={styles.ctaBtn}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px) scale(1.05)";
              e.target.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.25)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
            }}
            onClick={handleStartReporting}
          >
            Start Reporting
          </button>
          <button
            style={styles.ctaBtnSecondary}
            onMouseOver={(e) => {
              e.target.style.background = "#ffffff";
              e.target.style.color = "#667eea";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#ffffff";
              e.target.style.transform = "translateY(0)";
            }}
            onClick={handleLearnMore}
          >
            Learn More
          </button>
        </div>
      </header>

      <section style={styles.featuresContainer}>
        <h2 style={styles.sectionTitle}>Features That Make a Difference</h2>
        <p style={styles.sectionSubtitle}>
          Discover how CivicConnect makes civic engagement simple, effective, and impactful for everyone
        </p>
        
        <div style={styles.carouselWrapper}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={getCardStyle(index)}
            >
              <div style={styles.featureImageContainer}>
                <img 
                  src={feature.img} 
                  alt={feature.title} 
                  style={styles.featureImg}
                  onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                  onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                />
              </div>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDesc}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.indicators}>
          {features.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.indicator,
                ...(index === currentFeature ? styles.indicatorActive : {}),
              }}
              onClick={() => setCurrentFeature(index)}
            />
          ))}
        </div>
      </section>

      <section style={styles.processSection}>
        <h2 style={styles.processSectionTitle}>How It Works</h2>
        <p style={styles.processSectionSubtitle}>
          From identifying problems to celebrating solutions, every step is designed for simplicity
        </p>
        
        <div style={styles.processGrid}>
          {process.map((item, index) => (
            <div
              key={index}
              style={styles.processCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-15px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 25px 60px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={styles.processNumber}>{index + 1}</div>
              <h3 style={styles.processStep}>{item.step}</h3>
              <p style={styles.processDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.infoSection}>
        <h2 style={styles.sectionTitle}>Why Choose CivicConnect</h2>
        <p style={styles.sectionSubtitle}>
          Built with cutting-edge technology to ensure reliability, speed, and transparency
        </p>
        
        <div style={styles.infoGrid}>
          <div 
            style={styles.infoCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 25px 70px rgba(102, 126, 234, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={styles.infoIcon}></div>
            <h3 style={styles.infoTitle}>Lightning Fast</h3>
            <p style={styles.infoDesc}>
              Reports are processed instantly with automatic routing to relevant departments. No delays, no bureaucracy.
            </p>
          </div>
          
          <div 
            style={styles.infoCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 25px 70px rgba(102, 126, 234, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={styles.infoIcon}></div>
            <h3 style={styles.infoTitle}>Secure & Private</h3>
            <p style={styles.infoDesc}>
              Your data is encrypted and protected. Report anonymously or with your identity—your choice, always.
            </p>
          </div>
          
          <div 
            style={styles.infoCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 25px 70px rgba(102, 126, 234, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={styles.infoIcon}></div>
            <h3 style={styles.infoTitle}>Interactive Maps</h3>
            <p style={styles.infoDesc}>
              Visualize every reported issue on live maps. See hotspots, track trends, and understand your city better.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.testimonialSection}>
        <h2 style={styles.sectionTitle}>Voices from the Community</h2>
        <p style={styles.sectionSubtitle}>
          Real stories from citizens and officials who are transforming their cities
        </p>
        
        <div style={styles.testimonialCarousel}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={getTestimonialStyle(index)}
            >
              <p style={styles.testimonialText}>"{testimonial.text}"</p>
              <div style={styles.testimonialAuthor}>{testimonial.author}</div>
              <div style={styles.testimonialRole}>{testimonial.role}</div>
            </div>
          ))}
        </div>

        <div style={styles.indicators}>
          {testimonials.map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.indicator,
                ...(index === currentTestimonial ? styles.indicatorActive : {}),
              }}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>CivicConnect</h3>
            <p style={{color: "#b8b8b8", lineHeight: "1.7", fontSize: "1.05rem"}}>
              Building stronger communities through transparent civic engagement and responsive governance.
            </p>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Platform</h3>
            <a href="#" style={styles.footerLink} onMouseOver={(e) => e.target.style.color = "#667eea"} onMouseOut={(e) => e.target.style.color = "#b8b8b8"}>Report Issues</a>
            <a href="#" style={styles.footerLink} onMouseOver={(e) => e.target.style.color = "#667eea"} onMouseOut={(e) => e.target.style.color = "#b8b8b8"}>Track Reports</a>
            <a href="#" style={styles.footerLink} onMouseOver={(e) => e.target.style.color = "#667eea"} onMouseOut={(e) => e.target.style.color = "#b8b8b8"}>Admin Dashboard</a>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Company</h3>
            <a href="#" style={styles.footerLink} onMouseOver={(e) => e.target.style.color = "#667eea"} onMouseOut={(e) => e.target.style.color = "#b8b8b8"}>About Us</a>
            <a href="#" style={styles.footerLink} onMouseOver={(e) => e.target.style.color = "#667eea"} onMouseOut={(e) => e.target.style.color = "#b8b8b8"}>Contact</a>
            <a href="#" style={styles.footerLink} onMouseOver={(e) => e.target.style.color = "#667eea"} onMouseOut={(e) => e.target.style.color = "#b8b8b8"}>Privacy Policy</a>
            <a href="#" style={styles.footerLink} onMouseOver={(e) => e.target.style.color = "#667eea"} onMouseOut={(e) => e.target.style.color = "#b8b8b8"}>Terms of Service</a>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          Built by CivicConnect Team
        </div>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
          }
          to { 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
};

export default Home;