'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DocumentIcon, FolderIcon, LockIcon, UnlockIcon, WarningIcon,
  EyeIcon, DownloadIcon, CalendarIcon, ArrowRightIcon, SealIcon
} from '@/components/Icons';

// Case files data
const caseFiles = [
  {
    id: 1,
    title: 'The Roswell Incident',
    caseNumber: 'UAP-1947-001',
    date: 'July 8, 1947',
    location: 'Roswell, New Mexico',
    classification: 'DECLASSIFIED',
    summary: 'Initial recovery of unknown debris and subsequent military response.',
    status: 'available',
  },
  {
    id: 2,
    title: 'Project Blue Book',
    caseNumber: 'USAF-1952-BBK',
    date: '1952-1969',
    location: 'Wright-Patterson AFB, Ohio',
    classification: 'DECLASSIFIED',
    summary: 'Systematic study of UFOs by the United States Air Force.',
    status: 'locked',
  },
  {
    id: 3,
    title: 'The Holloman Landing',
    caseNumber: 'UAP-1955-HLM',
    date: 'February 1955',
    location: 'Holloman AFB, New Mexico',
    classification: 'PARTIALLY REDACTED',
    summary: 'Alleged contact event with unknown entities.',
    status: 'locked',
  },
  {
    id: 4,
    title: 'Rendlesham Forest',
    caseNumber: 'RAF-1980-RND',
    date: 'December 1980',
    location: 'Suffolk, England',
    classification: 'DECLASSIFIED',
    summary: 'Multiple witness sightings near RAF Bentwaters/Woodbridge.',
    status: 'locked',
  },
  {
    id: 5,
    title: 'Phoenix Lights',
    caseNumber: 'UAP-1997-PHX',
    date: 'March 13, 1997',
    location: 'Phoenix, Arizona',
    classification: 'UNCLASSIFIED',
    summary: 'Mass sighting event witnessed by thousands.',
    status: 'locked',
  },
  {
    id: 6,
    title: 'USS Nimitz Encounter',
    caseNumber: 'USN-2004-TIC',
    date: 'November 2004',
    location: 'Pacific Ocean',
    classification: 'DECLASSIFIED',
    summary: 'Navy pilot encounters with "Tic Tac" shaped UAP.',
    status: 'locked',
  },
  {
    id: 7,
    title: 'AATIP Program',
    caseNumber: 'DOD-2007-AAT',
    date: '2007-2012',
    location: 'Pentagon, Washington D.C.',
    classification: 'DECLASSIFIED',
    summary: 'Advanced Aerospace Threat Identification Program files.',
    status: 'locked',
  },
  {
    id: 8,
    title: 'Congressional Hearings',
    caseNumber: 'USC-2023-UAP',
    date: '2023-Present',
    location: 'U.S. Capitol',
    classification: 'ONGOING',
    summary: 'Whistleblower testimonies and official investigations.',
    status: 'locked',
  },
];

// Scene data for Case 1 (Roswell)
const case1Scenes = [
  {
    id: 'start',
    title: 'Initial Report',
    text: 'SUBJECT: Unknown Debris Recovery\nDATE: July 7, 1947\nLOCATION: Foster Ranch, Lincoln County, NM\n\nRancher William "Mac" Brazel has reported discovery of unusual debris scattered across his property. Initial description indicates metallic material of unknown origin. Local sheriff has been notified.\n\nREQUEST: Immediate dispatch of intelligence officer for assessment.',
    choices: [
      { text: 'Dispatch Intelligence Officer', next: 'dispatch' },
      { text: 'Request Additional Details', next: 'details' },
    ],
  },
  {
    id: 'dispatch',
    title: 'Field Assessment',
    text: 'FIELD REPORT - CLASSIFIED\nFROM: Major Jesse Marcel, 509th Bomb Group\nTO: Commanding Officer\n\nArrived at debris site 1400 hours. Material covers approximately 3/4 mile area. Have collected samples including:\n\n- Metallic foil-like material (unusual properties - returns to original shape)\n- Structural beams with unknown symbols\n- Fibrous material of unknown composition\n\nRECOMMENDATION: Full recovery team required. Material does not match any known aircraft or weather equipment.',
    choices: [
      { text: 'Authorize Full Recovery', next: 'recovery' },
      { text: 'Consult with Higher Command', next: 'command' },
    ],
  },
  {
    id: 'details',
    title: 'Witness Statement',
    text: 'WITNESS INTERVIEW TRANSCRIPT\nSUBJECT: William Brazel\nDATE: July 7, 1947\n\n"I heard a loud explosion during the storm last night. This morning I found this stuff scattered everywhere. It ain\'t like anything I\'ve seen. The metal... you can\'t tear it, can\'t burn it. Tried to fold it and it just pops right back.\n\nThere\'s pieces with some kind of writing on \'em. Purple-ish colored. Doesn\'t look like any language I know."',
    choices: [
      { text: 'Proceed with Investigation', next: 'dispatch' },
    ],
  },
  {
    id: 'recovery',
    title: 'Recovery Operation',
    text: 'OPERATIONAL UPDATE - TOP SECRET\n\nFull recovery team deployed to site. All debris collected and transported to Roswell Army Air Field.\n\nUNEXPECTED DEVELOPMENT: Secondary debris field located 2.5 miles north of primary site. Recovery team reports discovery of [REDACTED] at this location.\n\nALL PERSONNEL have been ordered to maintain strict silence regarding this operation.\n\nAWAITING FURTHER INSTRUCTIONS.',
    choices: [
      { text: 'Investigate Secondary Site', next: 'secondary' },
      { text: 'Prepare Press Statement', next: 'press' },
    ],
  },
  {
    id: 'command',
    title: 'Chain of Command',
    text: 'ENCRYPTED COMMUNICATION\nFROM: 8th Air Force HQ, Fort Worth\nTO: 509th Bomb Group, Roswell\n\nMessage received. Situation escalated to highest levels. General Ramey assuming direct oversight.\n\nINSTRUCTIONS:\n1. Secure all materials immediately\n2. Prepare for press briefing\n3. Official narrative to be provided\n4. All personnel reminded of security oaths\n\nTransport aircraft being dispatched for material transfer to Wright Field.',
    choices: [
      { text: 'Comply with Orders', next: 'recovery' },
    ],
  },
  {
    id: 'secondary',
    title: 'Secondary Site Report',
    text: 'FIELD REPORT - EYES ONLY\nCLASSIFICATION: [REDACTED]\n\nSecondary site secured. Team has recovered [REDACTED] measuring approximately [REDACTED] feet in length.\n\nBIOLOGICAL MATERIAL: [REDACTED] specimens recovered. Transport to [REDACTED] arranged.\n\nNOTE: Several team members have reported [REDACTED]. Medical evaluation recommended.\n\nALL PHOTOGRAPHIC EVIDENCE has been collected and secured.',
    choices: [
      { text: 'Continue to Press Statement', next: 'press' },
    ],
  },
  {
    id: 'press',
    title: 'Public Relations',
    text: 'ROSWELL DAILY RECORD - JULY 8, 1947\n\n"RAAF CAPTURES FLYING SAUCER ON RANCH IN ROSWELL REGION"\n\n---\n\nUPDATE - JULY 9, 1947:\n\nStatement from General Roger Ramey:\n\n"The material recovered near Roswell has been identified as debris from a weather balloon and RAWIN radar target. There is no truth to rumors of \'flying discs\' or extraterrestrial origin."\n\n[Photo shows General Ramey with weather balloon debris]\n\nCASE CLOSED.',
    choices: [
      { text: 'Review Final Assessment', next: 'ending' },
    ],
  },
  {
    id: 'ending',
    title: 'Case File Closed',
    text: 'FINAL ASSESSMENT - CLASSIFIED\nRETROSPECTIVE ANALYSIS\n\nThe Roswell incident of 1947 remains one of the most significant UAP events in recorded history. Despite official explanations, numerous discrepancies exist:\n\n• Initial military press release confirmed "flying disc"\n• Debris descriptions do not match weather balloon materials\n• Multiple witnesses report intimidation and silencing\n• Secondary site evidence never publicly addressed\n\n[CASE FILE COMPLETE]\n\nYou have unlocked access to Roswell documents in the archive.',
    isEnding: true,
    vaultUnlock: 'Roswell Recovery Files',
  },
];

export default function GamePage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [currentScene, setCurrentScene] = useState<string>('start');
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedCases, setCompletedCases] = useState<number[]>([]);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentSceneData = case1Scenes.find(s => s.id === currentScene);

  // Typing effect
  useEffect(() => {
    if (!currentSceneData || !isPlaying) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    let i = 0;
    const text = currentSceneData.text;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [currentScene, isPlaying]);

  const startCase = (id: number) => {
    if (id === 1 || completedCases.includes(id - 1)) {
      setSelectedCase(id);
      setCurrentScene('start');
      setIsPlaying(true);
    }
  };

  const handleChoice = (next: string) => {
    setCurrentScene(next);
  };

  const completeCase = () => {
    if (selectedCase && !completedCases.includes(selectedCase)) {
      setCompletedCases([...completedCases, selectedCase]);
    }
    setIsPlaying(false);
    setSelectedCase(null);
    setCurrentScene('start');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Classification Banner */}
      <div className="bg-fbi-gold text-fbi-dark text-center py-1 text-xs font-bold tracking-wider">
        UNCLASSIFIED // FOR PUBLIC RELEASE // FREEDOM OF INFORMATION ACT
      </div>

      {/* Header */}
      <header className="bg-fbi-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-fbi-gold rounded-full flex items-center justify-center text-fbi-dark">
              <SealIcon size={40} />
            </div>
            <div>
              <div className="text-xl font-bold">FBI VAULT</div>
              <div className="text-xs text-fbi-gold">Case Files Division</div>
            </div>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              <DocumentIcon size={16} className="inline mr-1" />
              {completedCases.length}/8 Cases Complete
            </span>
            <Link href="/" className="px-4 py-2 border border-fbi-gold text-fbi-gold hover:bg-fbi-gold hover:text-fbi-dark transition-colors rounded">
              Return to Archive
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Case Selection */}
        {!isPlaying && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-fbi-dark mb-2">UAP/UFO Case Files</h1>
              <p className="text-gray-600">Complete case files to unlock additional declassified documents.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {caseFiles.map((caseFile) => {
                const isUnlocked = caseFile.id === 1 || completedCases.includes(caseFile.id - 1);
                const isCompleted = completedCases.includes(caseFile.id);
                
                return (
                  <button
                    key={caseFile.id}
                    onClick={() => startCase(caseFile.id)}
                    disabled={!isUnlocked}
                    className={`text-left paper rounded-lg p-5 transition-all relative ${
                      isUnlocked 
                        ? 'hover:shadow-lg cursor-pointer' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {isCompleted ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                          COMPLETED
                        </span>
                      ) : isUnlocked ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                          AVAILABLE
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded flex items-center gap-1">
                          <LockIcon size={12} /> LOCKED
                        </span>
                      )}
                    </div>

                    {/* Case Header */}
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded flex items-center justify-center ${isUnlocked ? 'bg-fbi-blue text-white' : 'bg-gray-300 text-gray-500'}`}>
                        <FolderIcon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 font-mono">{caseFile.caseNumber}</div>
                        <h3 className="text-lg font-bold text-fbi-dark">{caseFile.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <CalendarIcon size={12} />
                            {caseFile.date}
                          </span>
                          <span>{caseFile.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Case Summary */}
                    <p className="text-sm text-gray-600 mt-3">{caseFile.summary}</p>

                    {/* Classification */}
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className={`text-xs font-semibold ${
                        caseFile.classification === 'DECLASSIFIED' ? 'text-green-700' :
                        caseFile.classification === 'PARTIALLY REDACTED' ? 'text-orange-700' :
                        caseFile.classification === 'ONGOING' ? 'text-blue-700' :
                        'text-gray-600'
                      }`}>
                        {caseFile.classification}
                      </span>
                      {isUnlocked && !isCompleted && (
                        <span className="text-fbi-blue text-sm font-semibold flex items-center gap-1">
                          Open Case <ArrowRightIcon size={16} />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Active Case */}
        {isPlaying && currentSceneData && (
          <div className="max-w-4xl mx-auto">
            {/* Case Header */}
            <div className="bg-fbi-dark text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FolderIcon size={24} className="text-fbi-gold" />
                <div>
                  <div className="text-xs text-fbi-gold">CASE FILE UAP-1947-001</div>
                  <div className="font-bold">The Roswell Incident</div>
                </div>
              </div>
              <button 
                onClick={() => { setIsPlaying(false); setSelectedCase(null); }}
                className="px-4 py-2 border border-white/30 text-white/70 hover:bg-white/10 rounded text-sm"
              >
                Close File
              </button>
            </div>

            {/* Document */}
            <div className="paper p-8 rounded-b-lg">
              {/* Document Header */}
              <div className="border-b-2 border-fbi-dark pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 font-mono">DOCUMENT SECTION</div>
                    <h2 className="text-xl font-bold text-fbi-dark">{currentSceneData.title}</h2>
                  </div>
                  <div className="stamp">CLASSIFIED</div>
                </div>
              </div>

              {/* Document Content */}
              <div className="font-mono text-sm text-gray-800 whitespace-pre-line min-h-[300px] leading-relaxed">
                {displayedText}
                {isTyping && <span className="cursor-blink">|</span>}
              </div>

              {/* Actions */}
              {!isTyping && currentSceneData.choices && (
                <div className="mt-8 pt-6 border-t border-gray-300 space-y-3">
                  <div className="text-xs text-gray-500 font-semibold mb-3">SELECT ACTION:</div>
                  {currentSceneData.choices.map((choice, i) => (
                    <button
                      key={i}
                      onClick={() => handleChoice(choice.next)}
                      className="w-full text-left p-4 bg-fbi-dark/5 border border-fbi-dark/20 rounded hover:bg-fbi-blue hover:text-white transition-all group flex items-center justify-between"
                    >
                      <span className="font-semibold">{choice.text}</span>
                      <ArrowRightIcon size={18} className="text-fbi-gold group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              {/* Case Complete */}
              {!isTyping && currentSceneData.isEnding && (
                <div className="mt-8 pt-6 border-t border-gray-300 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg mb-4">
                    <UnlockIcon size={18} />
                    <span className="font-semibold">Unlocked: {currentSceneData.vaultUnlock}</span>
                  </div>
                  <br />
                  <button
                    onClick={completeCase}
                    className="mt-4 px-8 py-3 bg-fbi-gold text-fbi-dark font-bold rounded hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
                  >
                    Return to Case Files
                    <ArrowRightIcon size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-fbi-dark text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>FBI VAULT - Electronic Reading Room</p>
          <p className="mt-1">This is a community project. Not affiliated with any government agency.</p>
        </div>
      </footer>
    </div>
  );
}
