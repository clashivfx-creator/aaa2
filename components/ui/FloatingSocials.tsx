import React from 'react';
import { Instagram } from 'lucide-react';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 127.14 96.36" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.24-23.28-13.26-47.57-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const FloatingSocials: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
       {/* Instagram */}
       <a 
         href="https://www.instagram.com/clashivfx/" 
         target="_blank" 
         rel="noopener noreferrer"
         className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-orange-500 hover:to-purple-600 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/40 group"
         aria-label="Instagram"
       >
         <Instagram className="w-8 h-8 group-hover:text-white" />
       </a>

       {/* TikTok */}
       <a 
         href="https://www.tiktok.com/@clashivfx" 
         target="_blank" 
         rel="noopener noreferrer"
         className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-black hover:border-[#00f2ea]/50 shadow-lg hover:shadow-[#00f2ea]/40 group"
         aria-label="TikTok"
       >
         <TikTokIcon className="w-8 h-8 group-hover:text-[#00f2ea]" />
       </a>

       {/* Discord - Neon Blue */}
       <a 
         href="https://discord.gg/zEcFPBqy6s" 
         target="_blank" 
         rel="noopener noreferrer"
         className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2] transition-all duration-300 hover:scale-110 hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2]/50 shadow-[0_0_15px_rgba(88,101,242,0.15)] hover:shadow-[0_0_25px_rgba(88,101,242,0.5)] group"
         aria-label="Discord"
       >
         <DiscordIcon className="w-9 h-9" />
       </a>
    </div>
  );
};