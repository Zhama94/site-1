import React, { useState } from 'react';
import { MessageSquare, X, Phone, Send, CheckCircle2 } from 'lucide-react';

interface FloatingConciergeProps {
  lang: 'ru' | 'en';
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setIsOpen(false);
      setName('');
      setPhone('');
    }, 2800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#161B1F] hover:bg-[#20262C] text-[#FDFBF7] border border-[#C9A86A]/40 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Expedition Concierge"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase font-sans-body">
            {lang === 'ru' ? 'Консьерж 24/7' : 'Concierge 24/7'}
          </span>
          <MessageSquare className="w-4 h-4 text-[#C9A86A] group-hover:rotate-6 transition-transform" />
        </button>
      </div>

      {/* Concierge Popover Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-[#121518] border border-white/15 rounded-sm shadow-2xl p-6 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-serif-display text-base font-bold text-[#FDFBF7]">
                {lang === 'ru' ? 'Консьерж-служба «ТАЙ ТРЭВЕЛ»' : 'TAY Travel Concierge'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8E8678] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!sent ? (
            <div>
              <p className="text-xs text-[#BFB7A8] leading-relaxed mb-4 font-light">
                {lang === 'ru'
                  ? 'Задайте вопрос старшему гиду в WhatsApp или оставьте контакт для консультации по подбору лошади и дат.'
                  : 'Chat directly with our expedition team or request a callback to discuss horseback suitability.'}
              </p>

              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder={lang === 'ru' ? 'Ваше имя' : 'Your name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181D21] border border-white/10 rounded-sm text-xs text-[#FDFBF7] placeholder-[#766F62] focus:outline-none focus:border-[#C9A86A]"
                />
                <input
                  type="tel"
                  required
                  placeholder={lang === 'ru' ? 'WhatsApp / Телефон' : 'WhatsApp number'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#181D21] border border-white/10 rounded-sm text-xs text-[#FDFBF7] placeholder-[#766F62] focus:outline-none focus:border-[#C9A86A]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C9A86A] hover:bg-[#D8B97D] text-[#0C0E10] text-xs uppercase font-semibold tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'ru' ? 'Связаться с гидом' : 'Contact Lead Guide'}</span>
                </button>
              </form>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A69E90]">
                <span>WhatsApp:</span>
                <a
                  href="https://wa.me/996555789202"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4ADE80] font-medium hover:underline"
                >
                  +996 555 789 202
                </a>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-[#4ADE80] mx-auto mb-2" />
              <div className="text-sm font-semibold text-[#FDFBF7]">
                {lang === 'ru' ? 'Запрос отправлен!' : 'Request Sent!'}
              </div>
              <div className="text-xs text-[#A69E90] mt-1">
                {lang === 'ru' ? 'Мы напишем вам в WhatsApp через 5 минут' : 'We will WhatsApp you within 5 minutes'}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
