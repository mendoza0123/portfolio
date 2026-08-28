import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface StickyMobileCtaProps {
  onOpenContact: (subject?: string) => void;
}

const WHATSAPP_URL =
  'https://wa.me/918879940967?text=Hi%20Aditya,%20I%20would%20like%20to%20discuss%20an%20AI%20automation%20project';

/**
 * Phone-only action bar. Appears once the hero's own CTAs have scrolled away,
 * and hides again over the contact form so it never covers the fields the
 * visitor is filling in.
 */
export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onOpenContact }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const contact = document.getElementById('contact');
    const audit = document.getElementById('audit');

    const update = () => {
      const scrolledPastHero = window.scrollY > 620;
      // Suppress the bar while either enquiry form is on screen.
      const overAForm = [contact, audit].some((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      setVisible(scrolledPastHero && !overAForm);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={`sm:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-2.5 safe-bottom bg-white/95 backdrop-blur-xl border-t border-slate-200 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => onOpenContact('Free Systems & AI Growth Audit')}
          tabIndex={visible ? 0 : -1}
          className="flex-1 min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-blue-600 active:bg-blue-700 text-white font-mono text-sm font-bold shadow-md shadow-blue-500/25"
        >
          <span>Get Free Growth Audit</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          tabIndex={visible ? 0 : -1}
          aria-label="Message on WhatsApp"
          className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 active:bg-emerald-100"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};
