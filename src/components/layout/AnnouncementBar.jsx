import React from 'react';
import { Link } from 'react-router-dom';
import { navigationData } from '../../data/navigation';

export const AnnouncementBar = () => {
  const { announcement } = navigationData;
  if (!announcement || !announcement.enabled) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#181516] text-[#FAF9F7] py-2 px-4 text-center text-[11px] tracking-widest uppercase font-light border-b border-[#332E30] relative z-40">
      <Link to={announcement.link} className="hover:text-[#F6E0E3] transition-colors inline-flex items-center gap-2">
        <span>{announcement.text}</span>
      </Link>
    </aside>
  );
};
