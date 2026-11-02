import React, { useState } from 'react';
import { AppWindow } from '../screen/AppWindow';
import { MailIcon, GithubIcon, ExternalLinkIcon, CheckIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { usePhone } from '../../context/PhoneContext';

export const ContactApp = () => {
  const { soundEnabled } = usePhone();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    playSound('click', soundEnabled);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('mohammedyasar990@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playSound('click', soundEnabled);
    setStatus('sending');

    setTimeout(() => {
      playSound('notification', soundEnabled);
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  return (
    <AppWindow title="Contact" subtitle="Direct Inquiries">
      {/* Quick Direct Email Card */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#7CF2C9] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#F0F4F8]">
              Available for Opportunities
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#626e7e]">
            Response: &lt; 24h
          </span>
        </div>

        <div className="bg-[#0e1219] border border-[#1b222d] rounded-xl p-3 flex items-center justify-between">
          <div className="flex flex-col overflow-hidden">
            <span className="font-mono text-[10px] text-[#626e7e] uppercase">Primary Email</span>
            <span className="font-mono text-xs text-[#7CF2C9] truncate">mohammedyasar990@gmail.com</span>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-lg bg-[#181f2a] hover:bg-[#232d3d] border border-[#2d3848] text-xs font-mono text-[#E8EDF2] hover:text-[#7CF2C9] transition-all shrink-0 flex items-center space-x-1.5"
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

      {/* Interactive Message Dispatcher */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
          Send a Direct Message
        </span>

        {status === 'sent' ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2 text-center">
            <div className="w-10 h-10 rounded-full bg-[#7CF2C9]/10 border border-[#7CF2C9]/40 flex items-center justify-center text-[#7CF2C9]">
              <CheckIcon className="w-5 h-5" />
            </div>
            <h4 className="font-grotesk text-sm font-bold text-[#F0F4F8]">
              Message Received
            </h4>
            <p className="font-mono text-xs text-[#9AA6B2] max-w-[220px]">
              Thank you! I will get back to you shortly at your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0e1219] border border-[#1b222d] focus:border-[#7CF2C9] rounded-xl px-3 py-2 text-xs font-mono text-[#E8EDF2] placeholder-[#626e7e] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0e1219] border border-[#1b222d] focus:border-[#7CF2C9] rounded-xl px-3 py-2 text-xs font-mono text-[#E8EDF2] placeholder-[#626e7e] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Your message, project opportunity, or inquiry..."
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#0e1219] border border-[#1b222d] focus:border-[#7CF2C9] rounded-xl px-3 py-2 text-xs font-mono text-[#E8EDF2] placeholder-[#626e7e] focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1b2330] hover:bg-[#253245] border border-[#2d3b52] text-xs font-mono text-[#7CF2C9] font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
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

      {/* Network Profiles */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626e7e] font-semibold block">
          Channels & Network
        </span>

        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://github.com/Yasar-17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e1219] hover:bg-[#181f2a] border border-[#1b222d] text-xs font-mono text-[#C5CED8] hover:text-[#7CF2C9] transition-all"
          >
            <div className="flex items-center space-x-2">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </div>
            <ExternalLinkIcon className="w-3 h-3 text-[#626e7e]" />
          </a>

          <a
            href="mailto:mohammedyasar990@gmail.com"
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e1219] hover:bg-[#181f2a] border border-[#1b222d] text-xs font-mono text-[#C5CED8] hover:text-[#7CF2C9] transition-all"
          >
            <div className="flex items-center space-x-2">
              <MailIcon className="w-3.5 h-3.5" />
              <span>Mail</span>
            </div>
            <ExternalLinkIcon className="w-3 h-3 text-[#626e7e]" />
          </a>
        </div>
      </div>
    </AppWindow>
  );
};

export default ContactApp;

