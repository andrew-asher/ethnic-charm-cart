import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center bg-card rounded-2xl p-8 md:p-12" style={{ boxShadow: 'var(--shadow-card)' }}>
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-2">Stay Updated</p>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Join Our Community</h2>
          <p className="font-body text-sm text-muted-foreground mb-6">Be the first to know about new collections and exclusive offers.</p>
          {submitted ? (
            <p className="font-body text-primary font-semibold">Thank you for subscribing! 💕</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-secondary rounded-full font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
