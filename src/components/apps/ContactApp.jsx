import React, { useState } from 'react';
import { AppWindow } from '../screen/AppWindow';
import { MailIcon, GithubIcon, LinkedinIcon, ExternalLinkIcon, CheckIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { usePhone } from '../../context/PhoneContext';
import { PROFILE } from '../../data';

export const ContactApp = () => {
  const { soundEnabled } = usePhone();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    playSound('click', soundEnabled);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playSound('click', soundEnabled);
    setStatus('sending');

    // Submit inquiry through FormSubmit or fallback to direct mailto
    setTimeout(() => {
      playSound('notification', soundEnabled);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  return (
    <AppWindow title="Contact" subtitle="Direct Communication Channels">
      {/* Quick Direct Email Card */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#7CF2C9] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#F0F4F8]">
              {PROFILE.availability}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#626e7e]">
            Direct Channel
          </span>
        </div>

        <div className="bg-[#0e1219] border border-[#1b222d] rounded-xl p-3 flex items-center justify-between">
          <div className="flex flex-col overflow-hidden">
            <span className="font-mono text-[10px] text-[#626e7e] uppercase">Primary Email</span>
            <a
              href={`mailto:${PROFILE.email}`}
              className="font-mono text-xs text-[#7CF2C9] hover:underline truncate"
            >
              {PROFILE.email}
            </a>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-2.5 py-1.5 rounded-lg bg-[#141922] hover:bg-[#1f2735] border border-[#232c3a] text-xs font-mono text-[#E8EDF2] flex items-center space-x-1.5 transition-colors shrink-0"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
                <span className="text-[#7CF2C9]">Copied</span>
              </>
            ) : (
              <span>Copy</span>
            )}
          </button>
        </div>
      </div>

      {/* Primary Channels: Email, LinkedIn, GitHub */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626e7e] font-semibold block">
          Verified Profiles
        </span>

        <div className="grid grid-cols-1 gap-2">
          {/* Email Option */}
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center justify-between p-3 rounded-xl bg-[#0e1219] hover:bg-[#181f2a] border border-[#1b222d] hover:border-[#2b3545] text-xs font-mono text-[#C5CED8] hover:text-[#7CF2C9] transition-all"
          >
            <div className="flex items-center space-x-2.5">
              <MailIcon className="w-4 h-4 text-[#7CF2C9]" />
              <div>
                <span className="font-bold text-[#E8EDF2] block">Email</span>
                <span className="text-[10px] text-[#626e7e]">{PROFILE.email}</span>
              </div>
            </div>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-[#626e7e]" />
          </a>

          {/* LinkedIn Option */}
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-[#0e1219] hover:bg-[#181f2a] border border-[#1b222d] hover:border-[#2b3545] text-xs font-mono text-[#C5CED8] hover:text-[#7CF2C9] transition-all"
          >
            <div className="flex items-center space-x-2.5">
              <LinkedinIcon className="w-4 h-4 text-[#8AB4FF]" />
              <div>
                <span className="font-bold text-[#E8EDF2] block">LinkedIn</span>
                <span className="text-[10px] text-[#626e7e]">linkedin.com/in/mohammed-yasar-m</span>
              </div>
            </div>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-[#626e7e]" />
          </a>

          {/* GitHub Option */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-[#0e1219] hover:bg-[#181f2a] border border-[#1b222d] hover:border-[#2b3545] text-xs font-mono text-[#C5CED8] hover:text-[#7CF2C9] transition-all"
          >
            <div className="flex items-center space-x-2.5">
              <GithubIcon className="w-4 h-4 text-[#E8EDF2]" />
              <div>
                <span className="font-bold text-[#E8EDF2] block">GitHub</span>
                <span className="text-[10px] text-[#626e7e]">{PROFILE.handle}</span>
              </div>
            </div>
            <ExternalLinkIcon className="w-3.5 h-3.5 text-[#626e7e]" />
          </a>
        </div>
      </div>

      {/* Message Dispatch Form */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
          Send Quick Message
        </span>

        {status === 'sent' ? (
          <div className="p-4 rounded-xl bg-[#121c17] border border-[#1a382c] text-center space-y-1">
            <CheckIcon className="w-5 h-5 text-[#7CF2C9] mx-auto" />
            <h4 className="font-grotesk text-xs font-bold text-[#7CF2C9]">Message Transmitted</h4>
            <p className="text-[11px] text-[#9AA6B2]">Thank you. I will review and reply within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <label className="block text-[10px] font-mono text-[#626e7e] uppercase mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name or Organization"
                className="w-full bg-[#0e1219] border border-[#1b222d] focus:border-[#7CF2C9] rounded-xl px-3 py-2 text-xs font-mono text-[#E8EDF2] placeholder-[#404c5c] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-[#626e7e] uppercase mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@domain.com"
                className="w-full bg-[#0e1219] border border-[#1b222d] focus:border-[#7CF2C9] rounded-xl px-3 py-2 text-xs font-mono text-[#E8EDF2] placeholder-[#404c5c] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-[#626e7e] uppercase mb-1">
                Message
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Inquiry or collaboration brief..."
                className="w-full bg-[#0e1219] border border-[#1b222d] focus:border-[#7CF2C9] rounded-xl px-3 py-2 text-xs font-mono text-[#E8EDF2] placeholder-[#404c5c] outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-2.5 rounded-xl bg-[#7CF2C9] hover:bg-[#68e0b6] active:scale-[0.99] disabled:opacity-50 text-[#090B0E] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-sm"
            >
              {status === 'sending' ? (
                <span>Dispatching...</span>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </form>
        )}
      </div>
    </AppWindow>
  );
};

export default ContactApp;
