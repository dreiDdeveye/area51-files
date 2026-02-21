'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  DocumentIcon, FolderIcon, LockIcon, SearchIcon, WarningIcon,
  EyeIcon, DownloadIcon, CalendarIcon, UserIcon, ArrowRightIcon,
  ExternalLinkIcon, StarIcon, SealIcon, XIcon
} from '@/components/Icons';

// Music Icon Components
const MusicOnIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const MusicOffIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
    <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2" />
  </svg>
);

// ============================================================================
// DATA
// ============================================================================

const fileCategories = [
  {
    id: 'uap-ufo',
    title: 'Unidentified Aerial Phenomena',
    description: 'Records relating to UAP/UFO sightings, investigations, and government programs.',
    files: 2847,
    status: 'DECLASSIFIED',
    dateRange: '1947-2024',
  },
  {
    id: 'project-bluebook',
    title: 'Project Blue Book',
    description: 'U.S. Air Force studies of unidentified flying objects (UFOs) from 1952 to 1969.',
    files: 12618,
    status: 'DECLASSIFIED',
    dateRange: '1952-1969',
  },
  {
    id: 'roswell',
    title: 'Roswell Incident',
    description: 'Documentation related to the 1947 Roswell, New Mexico incident.',
    files: 347,
    status: 'PARTIALLY REDACTED',
    dateRange: '1947-1997',
  },
  {
    id: 'majestic',
    title: 'Majestic Documents',
    description: 'Alleged documents relating to a secret committee formed to investigate UFOs.',
    files: 89,
    status: 'UNVERIFIED',
    dateRange: '1947-1960',
  },
  {
    id: 'aatip',
    title: 'AATIP Program Files',
    description: 'Advanced Aerospace Threat Identification Program documentation.',
    files: 156,
    status: 'DECLASSIFIED',
    dateRange: '2007-2012',
  },
  {
    id: 'witness',
    title: 'Witness Testimonies',
    description: 'Sworn statements and depositions from military and civilian witnesses.',
    files: 1203,
    status: 'RESTRICTED',
    dateRange: '1947-2024',
  },
];

const recentFiles = [
  { name: 'UAP-DOD-2024-0147.pdf', date: '2024-01-15', pages: 23, classification: 'UNCLASSIFIED' },
  { name: 'AATIP-FINAL-REPORT.pdf', date: '2023-12-08', pages: 156, classification: 'DECLASSIFIED' },
  { name: 'ROSWELL-AAF-1947-MEMO.pdf', date: '2023-11-22', pages: 4, classification: 'DECLASSIFIED' },
  { name: 'PROJECT-BLUEBOOK-CASE-9842.pdf', date: '2023-10-30', pages: 18, classification: 'UNCLASSIFIED' },
  { name: 'WITNESS-DEPOSITION-2023-089.pdf', date: '2023-10-15', pages: 42, classification: 'RESTRICTED' },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const ClassificationBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    'DECLASSIFIED': 'bg-green-100 text-green-800 border-green-300',
    'UNCLASSIFIED': 'bg-blue-100 text-blue-800 border-blue-300',
    'RESTRICTED': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'PARTIALLY REDACTED': 'bg-orange-100 text-orange-800 border-orange-300',
    'UNVERIFIED': 'bg-gray-100 text-gray-800 border-gray-300',
    'CLASSIFIED': 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold border rounded ${colors[status] || colors['UNCLASSIFIED']}`}>
      {status}
    </span>
  );
};

const StatCard = ({ icon: Icon, value, label }: { icon: React.FC<any>, value: string, label: string }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
    <Icon size={24} className="text-fbi-blue mx-auto mb-2" />
    <div className="text-2xl font-bold text-fbi-dark">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visitorCount, setVisitorCount] = useState(15847);
  
  // Background music state
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio('/bgmusic.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 1.0; // MAX VOLUME
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Autoplay music on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasUserInteracted && audioRef.current) {
        setHasUserInteracted(true);
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(err => {
          console.log('Audio autoplay failed:', err);
        });
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasUserInteracted]);

  // Toggle music function
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CA = 'E2Mwd4541yoWr416hK6wHh89Xv2C1zVjGZxXyLYzpump';
  const [copied, setCopied] = useState(false);

  const copyCA = async () => {
    await navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Classification Banner */}
      <div className="bg-fbi-gold text-fbi-dark text-center py-1 text-xs font-bold tracking-wider">
        UNCLASSIFIED // FOR PUBLIC RELEASE // FREEDOM OF INFORMATION ACT
      </div>

      {/* Header */}
      <header className="bg-fbi-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-fbi-blue/50 text-xs">
            <div className="flex items-center gap-4">
              <span>An official website of the United States government</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-fbi-gold">Contact</a>
              <a href="#" className="hover:text-fbi-gold">Submit a Tip</a>
              <a href="#" className="hover:text-fbi-gold">Español</a>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              {/* Logo Placeholder */}
              <div className="w-16 h-16 bg-fbi-blue/50 border-2 border-fbi-gold rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-fbi-gold text-xs font-bold">LOGO</span>';
                  }}
                />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-wide">X-Files</div>
                <div className="text-sm text-fbi-gold">Electronic Reading Room</div>
              </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3">
              {/* Music Toggle */}
              <button
                onClick={toggleMusic}
                className={`flex items-center gap-2 px-3 py-2 rounded border transition-all ${
                  isMusicPlaying 
                    ? 'bg-fbi-gold/20 border-fbi-gold text-fbi-gold' 
                    : 'bg-fbi-blue/30 border-fbi-blue text-gray-400 hover:border-fbi-gold hover:text-fbi-gold'
                }`}
                title={isMusicPlaying ? 'Pause Music' : 'Play Music'}
              >
                {isMusicPlaying ? <MusicOnIcon size={18} /> : <MusicOffIcon size={18} />}
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pr-10 rounded bg-fbi-blue/50 border border-fbi-blue text-white placeholder-gray-400 focus:outline-none focus:border-fbi-gold"
                />
                <SearchIcon size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 py-2 text-sm">
            <Link href="/" className="px-4 py-2 bg-fbi-gold text-fbi-dark font-semibold rounded-t">
              Home
            </Link>
            <Link href="/game" className="px-4 py-2 hover:bg-fbi-blue/50 rounded-t">
              UAP/UFO Files
            </Link>
            <a href="#" className="px-4 py-2 hover:bg-fbi-blue/50 rounded-t">
              Recently Added
            </a>
            <a href="#" className="px-4 py-2 hover:bg-fbi-blue/50 rounded-t">
              Popular Records
            </a>
            <a href="#" className="px-4 py-2 hover:bg-fbi-blue/50 rounded-t">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-fbi-dark to-fbi-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-fbi-gold/20 border border-fbi-gold/50 rounded mb-4">
                <WarningIcon size={16} className="text-fbi-gold" />
                <span className="text-fbi-gold text-sm font-semibold">NEW RELEASE</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Unidentified Aerial Phenomena
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Access declassified government documents, witness testimonies, and investigative reports on UAP/UFO incidents spanning over 75 years.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/game"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-fbi-gold text-fbi-dark font-bold rounded hover:bg-yellow-500 transition-colors"
                >
                  <EyeIcon size={20} />
                  Browse Records
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition-colors"
                >
                  <FolderIcon size={20} />
                  View Categories
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="paper rounded-lg p-6 transform rotate-2 relative">
                <div className="absolute top-4 right-4 stamp">TOP SECRET</div>
                <div className="font-mono text-sm text-gray-800 space-y-2">
                  <div className="text-xs text-gray-500">DOCUMENT ID: UAP-2024-CLASSIFIED</div>
                  <div className="h-px bg-gray-300 my-3"></div>
                  <p>SUBJECT: Unidentified Aerial Phenomenon Report</p>
                  <p>DATE: <span className="redacted px-8">REDACTED</span></p>
                  <p>LOCATION: <span className="redacted px-12">REDACTED</span></p>
                  <div className="h-px bg-gray-300 my-3"></div>
                  <p>SUMMARY:</p>
                  <p>On the evening of <span className="redacted px-6">XXXX</span>, multiple witnesses reported observing <span className="redacted px-16">REDACTED</span> in the vicinity of <span className="redacted px-10">REDACTED</span>.</p>
                  <p className="mt-4">Radar confirmation obtained from <span className="redacted px-8">XXXX</span> Air Force Base. Object demonstrated capabilities inconsistent with known aircraft...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={DocumentIcon} value="17,260" label="Total Documents" />
            <StatCard icon={FolderIcon} value="847" label="Case Files" />
            <StatCard icon={CalendarIcon} value="75+" label="Years of Records" />
            <StatCard icon={UserIcon} value={visitorCount.toLocaleString()} label="Visitors Today" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* File Categories */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-fbi-dark flex items-center gap-2">
                <FolderIcon size={24} className="text-fbi-blue" />
                Record Categories
              </h2>
              <a href="#" className="text-fbi-blue hover:text-fbi-gold text-sm font-semibold flex items-center gap-1">
                View All <ArrowRightIcon size={16} />
              </a>
            </div>

            <div className="space-y-4" id="categories">
              {fileCategories.map((category) => (
                <Link
                  key={category.id}
                  href="/game"
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-fbi-gold hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FolderIcon size={20} className="text-fbi-gold" />
                        <h3 className="font-bold text-fbi-dark group-hover:text-fbi-blue">
                          {category.title}
                        </h3>
                        <ClassificationBadge status={category.status} />
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <DocumentIcon size={14} />
                          {category.files.toLocaleString()} files
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={14} />
                          {category.dateRange}
                        </span>
                      </div>
                    </div>
                    <ArrowRightIcon size={20} className="text-gray-400 group-hover:text-fbi-gold group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recently Added */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-fbi-dark text-white px-4 py-3 font-semibold flex items-center gap-2">
                <CalendarIcon size={18} />
                Recently Added
              </div>
              <div className="divide-y divide-gray-100">
                {recentFiles.map((file, i) => (
                  <a key={i} href="#" className="block px-4 py-3 hover:bg-gray-50 group">
                    <div className="flex items-start gap-3">
                      <DocumentIcon size={16} className="text-fbi-blue mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-fbi-dark truncate group-hover:text-fbi-blue">
                          {file.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <span>{file.date}</span>
                          <span>•</span>
                          <span>{file.pages} pages</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <a href="#" className="block px-4 py-3 bg-gray-50 text-center text-sm text-fbi-blue font-semibold hover:text-fbi-gold">
                View All Recent Files →
              </a>
            </div>

            {/* Token Info */}
            <div className="bg-fbi-dark text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <StarIcon size={20} className="text-fbi-gold" />
                <span className="font-bold">On-Chain Archive</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                These records are permanently stored on the blockchain. Immutable. Uncensorable. Forever.
              </p>
              <div
                onClick={copyCA}
                className="bg-fbi-blue/50 rounded p-3 cursor-pointer hover:bg-fbi-blue/70 transition-colors"
              >
                <div className="text-xs text-fbi-gold mb-1">Contract Address:</div>
                <div className="font-mono text-xs break-all">{CA}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {copied ? '✓ Copied!' : 'Click to copy'}
                </div>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <WarningIcon size={20} className="text-yellow-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-yellow-800 text-sm">Notice</div>
                  <p className="text-xs text-yellow-700 mt-1">
                    Some documents may contain redacted or partially obscured information in accordance with national security protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-fbi-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Access the Complete Archive</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Complete interactive case files to unlock additional declassified documents. 
            Your progress is tracked and stored on-chain.
          </p>
          <Link
            href="/game"
            className="inline-flex items-center gap-2 px-8 py-4 bg-fbi-gold text-fbi-dark font-bold rounded-lg hover:bg-yellow-500 transition-colors text-lg"
          >
            <LockIcon size={24} />
            Begin Investigation
            <ArrowRightIcon size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fbi-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-fbi-blue/50 border border-fbi-gold rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-fbi-gold text-[8px] font-bold">LOGO</span>';
                    }}
                  />
                </div>
                <div>
                  <div className="font-bold">X-Files</div>
                  <div className="text-xs text-gray-400">Electronic Reading Room</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Freedom of Information Act Electronic Reading Room
              </p>
            </div>
            <div>
              <div className="font-semibold mb-3 text-fbi-gold">Quick Links</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">FOIA Requests</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Accessibility</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-fbi-gold">Resources</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Submit a Tip</a></li>
                <li><a href="#" className="hover:text-white">Report a Crime</a></li>
                <li><a href="#" className="hover:text-white">Press Room</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-fbi-gold">Connect</div>
              <a
                href="https://x.com/i/communities/2021922006829281631"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <XIcon size={20} />
                Join the Investigation
              </a>
            </div>
          </div>
          <div className="border-t border-fbi-blue/50 pt-6 text-center text-xs text-gray-500">
            <p>This is a community project. Not affiliated with any government agency.</p>
            <p className="mt-2">The truth is on the blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}