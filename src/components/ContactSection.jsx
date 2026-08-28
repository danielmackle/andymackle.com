import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, X, Send, CheckCircle } from 'lucide-react';

// Custom Inline SVGs for Facebook and Instagram to avoid Lucide version issues
const FacebookIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WEB3FORMS_ACCESS_KEY = "228e912d-d3bc-4cac-9358-f183b50edc7e";

const ContactSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', contacts: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      // Simulate successful delivery locally if key is not set yet
      setTimeout(() => {
        setIsSending(false);
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
          setIsFormOpen(false);
          setFormData({ name: '', email: '', contacts: '', message: '' });
        }, 2500);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          contacts: formData.contacts,
          message: formData.message,
          subject: `New AndyMackle.com Message from ${formData.name}`
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsSending(false);
        setSendSuccess(true);
        setTimeout(() => {
          setSendSuccess(false);
          setIsFormOpen(false);
          setFormData({ name: '', email: '', contacts: '', message: '' });
        }, 2500);
      } else {
        throw new Error(data.message || "Failed to send email.");
      }
    } catch (err) {
      setIsSending(false);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: '#0a0a1a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', zIndex: 10, position: 'relative' }}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginTop: '3rem', alignItems: 'center' }}>
          
          <motion.div 
            style={{ flex: '1 1 350px' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-white)' }}>Let's Connect</h3>
            <p style={{ marginBottom: '2.5rem', color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                          Your phone linging your phone linging blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <a href="tel:+447740024532" style={linkStyle}>
                <Phone size={22} style={{ color: 'var(--color-evh-red)' }} />
                <span>+44 7740 024532 (Phone & WhatsApp)</span>
              </a>
              <a href="https://instagram.com/_theandymack_" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <InstagramIcon size={22} />
                <span>@_theandymack_</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                <FacebookIcon size={22} />
                <span>Facebook</span>
              </a>
              <a href="mailto:contact@andymackle.com" style={linkStyle}>
                <Mail size={22} style={{ color: 'var(--color-evh-red)' }} />
                <span>contact@andymackle.com</span>
              </a>
            </div>
          </motion.div>

          <motion.div 
            style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button 
              onClick={() => setIsFormOpen(true)}
              className="jagged-btn"
              style={{
                padding: '2rem 3rem',
                fontSize: '1.4rem',
                backgroundColor: 'var(--color-evh-red)',
                color: 'var(--color-white)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: '0 10px 30px rgba(209, 16, 19, 0.4)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <Mail size={28} />
              Open Contact Form
            </button>
          </motion.div>

        </div>
      </div>

      {/* Full-Screen Email Composition Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
            style={modalOverlayStyle}
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="jagged-box"
              style={modalContentStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <button style={closeButtonStyle} onClick={() => setIsFormOpen(false)}>
                <X size={24} />
              </button>

              {!sendSuccess ? (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '2rem', color: 'var(--color-evh-red)', margin: 0, letterSpacing: '1px' }}>
                      NEW COMPOSITION
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '5px 0 0 0' }}>
                      TO: contact@andymackle.com
                    </p>
                  </div>

                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={labelStyle}>YOUR NAME</label>
                        <input 
                          type="text" 
                          style={inputStyle} 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={isSending}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <label style={labelStyle}>EMAIL ADDRESS</label>
                        <input 
                          type="email" 
                          style={inputStyle} 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={isSending}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>PHONE / WHATSAPP / OTHER CONTACTS</label>
                      <input 
                        type="text" 
                        style={inputStyle} 
                        value={formData.contacts}
                        onChange={(e) => setFormData({ ...formData, contacts: e.target.value })}
                        disabled={isSending}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>MESSAGE BODY</label>
                      <textarea 
                        style={{ ...inputStyle, minHeight: '180px', resize: 'vertical' }} 
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        disabled={isSending}
                      />
                    </div>

                    {errorMessage && (
                      <p style={{ color: 'var(--color-evh-red)', fontWeight: 'bold', margin: 0 }}>
                        {errorMessage}
                      </p>
                    )}

                    <button 
                      type="submit" 
                      style={{
                        ...buttonStyle,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        cursor: isSending ? 'not-allowed' : 'pointer',
                        opacity: isSending ? 0.7 : 1
                      }}
                      disabled={isSending}
                    >
                      {isSending ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ display: 'inline-block', width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
                          />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          SEND TRANSMISSION
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '3rem 0' }}
                >
                  <CheckCircle size={80} color="var(--color-evh-red)" style={{ marginBottom: '2rem' }} />
                  <h3 style={{ fontSize: '2.2rem', color: 'var(--color-white)', margin: '0 0 1rem 0' }}>
                    TRANSMISSION SUCCESSFUL
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Your message has been routed. Andrew will review your details and get back to you shortly.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  color: 'var(--color-text-main)',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  fontSize: '1.15rem',
  fontWeight: '500'
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: 'rgba(255,255,255,0.03)',
  border: '1px solid #333',
  color: 'var(--color-white)',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s ease, background-color 0.3s ease',
  marginTop: '5px'
};

const labelStyle = {
  fontSize: '0.85rem',
  letterSpacing: '1.5px',
  color: 'var(--color-text-muted)',
  fontWeight: 'bold',
  display: 'block'
};

const buttonStyle = {
  padding: '1.2rem 2rem',
  backgroundColor: 'var(--color-evh-red)',
  color: 'var(--color-white)',
  border: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  transition: 'background-color 0.3s ease',
  width: '100%',
  letterSpacing: '1px'
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(10px)',
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem'
};

const modalContentStyle = {
  backgroundColor: '#0c0c16',
  width: '100%',
  maxWidth: '750px',
  padding: '3rem',
  position: 'relative',
  border: '2px solid var(--color-evh-red)',
  boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '120px',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#888',
  cursor: 'pointer',
  padding: '5px',
  transition: 'color 0.3s ease'
};

export default ContactSection;

