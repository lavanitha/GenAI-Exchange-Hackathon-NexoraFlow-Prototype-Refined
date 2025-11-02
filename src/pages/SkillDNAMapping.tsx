import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useToast } from '../contexts/ToastContext';

// TODO: connect API
// TODO: replace demo data
// TODO: add animations

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
  exp: number; // years of experience
  related: string[];
}

interface SkillDetail extends Skill {
  description?: string;
  suggestedActivities?: string[];
  careerMatches?: string[];
}

type ViewType = 'radial' | 'matrix';

const SkillDNAMapping: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('radial');
  const [timeline, setTimeline] = useState<number>(0); // 0-24 months
  const [pinnedSkills, setPinnedSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { showSuccess, showInfo } = useToast();

  // Demo skills data
  const [skills] = useState<Skill[]>([
    { id: 'js', name: 'JavaScript', category: 'Core', level: 75, exp: 2.5, related: ['React', 'Node.js'] },
    { id: 'react', name: 'React', category: 'Framework', level: 70, exp: 2, related: ['JavaScript', 'TypeScript'] },
    { id: 'sql', name: 'SQL', category: 'Database', level: 45, exp: 1, related: ['Database'] },
    { id: 'ml', name: 'Machine Learning', category: 'Advanced', level: 30, exp: 0.5, related: ['Python', 'Data'] },
    { id: 'cloud', name: 'Cloud (AWS)', category: 'Platform', level: 50, exp: 1.5, related: ['DevOps'] },
    { id: 'communication', name: 'Communication', category: 'Communication', level: 65, exp: 3, related: [] },
    { id: 'data-structures', name: 'Data Structures', category: 'Foundational', level: 58, exp: 1, related: ['Algorithms'] },
  ]);

  // Calculate projected levels based on timeline
  const getProjectedLevel = (skill: Skill): number => {
    const growth = (timeline / 24) * 10; // Max 10% growth over 24 months
    return Math.min(100, skill.level + growth);
  };

  // Get skill level category
  const getLevelCategory = (level: number): 'beginner' | 'intermediate' | 'expert' => {
    if (level < 40) return 'beginner';
    if (level < 70) return 'intermediate';
    return 'expert';
  };

  // Get gap skills (lowest 3)
  const gapSkills = [...skills]
    .sort((a, b) => a.level - b.level)
    .slice(0, 3);

  // Handle skill click
  const handleSkillClick = useCallback((skill: Skill) => {
    // TODO: fetch full skill details from API
    const skillDetail: SkillDetail = {
      ...skill,
      description: `${skill.name} is a ${skill.category.toLowerCase()} skill with ${skill.level}% proficiency.`,
      suggestedActivities: [
        `Complete ${skill.name} tutorial`,
        `Build a project using ${skill.name}`,
        `Join ${skill.name} community`,
      ],
      careerMatches: ['Frontend Engineer', 'Full Stack Developer', 'Software Engineer'],
    };
    setSelectedSkill(skillDetail);
    setIsDrawerOpen(true);
  }, []);

  // Handle pin/unpin
  const handlePinSkill = useCallback((skillId: string) => {
    setPinnedSkills(prev => {
      if (prev.includes(skillId)) {
        showInfo('Skill Unpinned', 'Skill removed from pinned list');
        return prev.filter(id => id !== skillId);
      } else {
        showSuccess('Skill Pinned', 'Skill added to pinned list');
        return [...prev, skillId];
      }
    });
  }, [showSuccess, showInfo]);

  // Handle MicroLearn
  const handleMicroLearn = useCallback((skillId: string) => {
    // TODO: connect to API
    showSuccess('Micro Learn Applied', `+2% added to skill level`);
    console.log('MicroLearn triggered for:', skillId);
  }, [showSuccess]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDrawerOpen]);

  // Handle drawer backdrop click
  const handleDrawerBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDrawerOpen(false);
    }
  };

  // Calculate radial positions for skills
  const getRadialPosition = (skill: Skill, index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 120 + (getProjectedLevel(skill) / 100) * 80;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill DNA Mapping</h1>
        <p className="text-gray-600">
          Interactive radial map + Skill Matrix wheel — visualize your skill clusters and proficiency tiers.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Controls */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Controls</h2>
            
            {/* Simulation Timeline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Simulation timeline
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={timeline}
                  onChange={(e) => setTimeline(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  aria-label="Simulation timeline slider"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Now</span>
                  <span>{timeline} months →</span>
                </div>
              </div>
            </div>

            {/* Pinned Skills */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Pinned Skills</h3>
              <p className="text-xs text-gray-600 mb-3">Pin important skills to monitor progress.</p>
              <div className="space-y-2">
                {pinnedSkills.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No pinned skills yet</p>
                ) : (
                  pinnedSkills.map(skillId => {
                    const skill = skills.find(s => s.id === skillId);
                    return skill ? (
                      <div
                        key={skillId}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-900">{skill.name}</span>
                        <button
                          onClick={() => handlePinSkill(skillId)}
                          className="text-primary-600 hover:text-primary-700 text-xs"
                          aria-label={`Unpin ${skill.name}`}
                        >
                          ×
                        </button>
                      </div>
                    ) : null;
                  })
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    showSuccess('Micro Learn Applied', '+2% added to selected skills');
                    console.log('Micro Learn: +2');
                  }}
                  className="w-full bg-success-500 text-white px-4 py-2 rounded-lg hover:bg-success-600 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
                  aria-label="Apply Micro Learn"
                >
                  Micro Learn: +2
                </button>
                <button
                  onClick={() => {
                    showInfo('Pathway Generation', 'Generating personalized learning pathway...');
                    console.log('Generate Pathway');
                  }}
                  className="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Generate Pathway"
                >
                  Generate Pathway
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Visualization */}
        <div className="col-span-12 lg:col-span-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Skill DNA</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewType('radial')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    viewType === 'radial'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Switch to Radial Map view"
                  aria-pressed={viewType === 'radial'}
                >
                  Radial Map
                </button>
                <button
                  onClick={() => setViewType('matrix')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    viewType === 'matrix'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Switch to Skill Matrix view"
                  aria-pressed={viewType === 'matrix'}
                >
                  Skill Matrix
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Interactive — click a skill to inspect</p>

            {/* Radial Map Visualization */}
            {viewType === 'radial' && (
              <div className="relative w-full" style={{ height: '500px' }}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 400"
                  className="mx-auto"
                  aria-label="Radial Map visualization"
                >
                  {/* Category sectors */}
                  {['Core', 'Platform', 'Database', 'Foundational', 'Advanced', 'Framework', 'Communication'].map(
                    (category, idx, arr) => {
                      const angle = (idx / arr.length) * 2 * Math.PI;
                      const angle2 = ((idx + 1) / arr.length) * 2 * Math.PI;
                      return (
                        <g key={category}>
                          <path
                            d={`M 200 200 L ${200 + Math.cos(angle - Math.PI / 2) * 200} ${200 + Math.sin(angle - Math.PI / 2) * 200} A 200 200 0 0 1 ${200 + Math.cos(angle2 - Math.PI / 2) * 200} ${200 + Math.sin(angle2 - Math.PI / 2) * 200} Z`}
                            fill="rgba(59, 130, 246, 0.05)"
                            stroke="rgba(59, 130, 246, 0.1)"
                          />
                          <text
                            x={200 + Math.cos((angle + angle2) / 2 - Math.PI / 2) * 180}
                            y={200 + Math.sin((angle + angle2) / 2 - Math.PI / 2) * 180}
                            textAnchor="middle"
                            className="text-xs fill-gray-600"
                            fontSize="12"
                          >
                            {category}
                          </text>
                        </g>
                      );
                    }
                  )}

                  {/* Center "You" */}
                  <circle cx="200" cy="200" r="30" fill="#2563eb" />
                  <text x="200" y="205" textAnchor="middle" className="text-white" fontSize="12" fontWeight="bold">
                    You
                  </text>

                  {/* Skill nodes */}
                  {skills.map((skill, idx) => {
                    const { x, y } = getRadialPosition(skill, idx, skills.length);
                    const projectedLevel = getProjectedLevel(skill);
                    const levelBarWidth = (projectedLevel / 100) * 40;

                    return (
                      <g
                        key={skill.id}
                        className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
                        onClick={() => handleSkillClick(skill)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSkillClick(skill);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`${skill.name} - ${projectedLevel}% proficiency`}
                      >
                        {/* Connecting line */}
                        <line
                          x1="200"
                          y1="200"
                          x2={200 + x}
                          y2={200 + y}
                          stroke="rgba(59, 130, 246, 0.3)"
                          strokeWidth="1"
                        />
                        {/* Skill node */}
                        <circle
                          cx={200 + x}
                          cy={200 + y}
                          r="20"
                          fill="#2563eb"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={200 + x}
                          y={200 + y + 35}
                          textAnchor="middle"
                          className="text-xs fill-gray-700"
                          fontSize="10"
                        >
                          {skill.name}
                        </text>
                        {/* Level bar */}
                        <rect
                          x={200 + x - 20}
                          y={200 + y + 25}
                          width={levelBarWidth}
                          height="3"
                          fill="#22c55e"
                          rx="1"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Skill Matrix Visualization */}
            {viewType === 'matrix' && (
              <div className="space-y-4">
                <div className="relative w-full" style={{ height: '500px' }}>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 400 400"
                    className="mx-auto"
                    aria-label="Skill Matrix visualization"
                  >
                    {/* Concentric rings */}
                    <circle cx="200" cy="200" r="60" fill="#fbbf24" opacity="0.3" />
                    <circle cx="200" cy="200" r="120" fill="#60a5fa" opacity="0.3" />
                    <circle cx="200" cy="200" r="180" fill="#22c55e" opacity="0.3" />

                    {/* Center label */}
                    <circle cx="200" cy="200" r="50" fill="#1e3a8a" />
                    <text x="200" y="195" textAnchor="middle" className="text-white" fontSize="10" fontWeight="bold">
                      SKILL
                    </text>
                    <text x="200" y="207" textAnchor="middle" className="text-white" fontSize="10" fontWeight="bold">
                      MATRIX
                    </text>

                    {/* Category sectors */}
                    {skills.reduce((acc, skill) => {
                      if (!acc.includes(skill.category)) acc.push(skill.category);
                      return acc;
                    }, [] as string[]).map((category, idx, arr) => {
                      const angle = (idx / arr.length) * 2 * Math.PI - Math.PI / 2;
                      const angle2 = ((idx + 1) / arr.length) * 2 * Math.PI - Math.PI / 2;
                      return (
                        <g key={category}>
                          <line
                            x1="200"
                            y1="200"
                            x2={200 + Math.cos(angle) * 180}
                            y2={200 + Math.sin(angle) * 180}
                            stroke="rgba(59, 130, 246, 0.2)"
                            strokeWidth="1"
                          />
                          <text
                            x={200 + Math.cos(angle) * 190}
                            y={200 + Math.sin(angle) * 190}
                            textAnchor="middle"
                            className="text-xs fill-gray-600"
                            fontSize="11"
                            transform={`rotate(${(angle * 180) / Math.PI + 90} ${200 + Math.cos(angle) * 190} ${200 + Math.sin(angle) * 190})`}
                          >
                            {category}
                          </text>
                        </g>
                      );
                    })}

                    {/* Skill nodes placed by level */}
                    {skills.map((skill, idx) => {
                      const categoryIndex = skills
                        .reduce((acc, s) => {
                          if (!acc.includes(s.category)) acc.push(s.category);
                          return acc;
                        }, [] as string[])
                        .indexOf(skill.category);
                      const categoryCount = skills.filter(s => s.category === skill.category).length;
                      const skillIndexInCategory = skills.filter(s => s.category === skill.category).indexOf(skill);
                      const angle = ((categoryIndex + skillIndexInCategory / categoryCount) / 
                        skills.reduce((acc, s) => {
                          if (!acc.includes(s.category)) acc.push(s.category);
                          return acc;
                        }, [] as string[]).length) * 2 * Math.PI - Math.PI / 2;
                      
                      const projectedLevel = getProjectedLevel(skill);
                      let radius = 90;
                      if (projectedLevel >= 70) radius = 150;
                      else if (projectedLevel >= 40) radius = 90;

                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;

                      return (
                        <g
                          key={skill.id}
                          className="cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
                          onClick={() => handleSkillClick(skill)}
                          onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSkillClick(skill);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`${skill.name} - ${projectedLevel}% proficiency`}
                        >
                          <circle
                            cx={200 + x}
                            cy={200 + y}
                            r="12"
                            fill={projectedLevel >= 70 ? '#22c55e' : projectedLevel >= 40 ? '#60a5fa' : '#fbbf24'}
                            stroke="white"
                            strokeWidth="2"
                          />
                          <text
                            x={200 + x}
                            y={200 + y + 25}
                            textAnchor="middle"
                            className="text-xs fill-gray-700"
                            fontSize="9"
                          >
                            {skill.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="text-xs text-gray-600">Beginner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-xs text-gray-600">Intermediate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs text-gray-600">Expert</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Snapshot */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Snapshot</h2>

            {/* Timeline */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Timeline</p>
              <p className="text-lg font-semibold text-gray-900">{timeline} months</p>
            </div>

            {/* Top Opportunity */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Top opportunity</p>
              <p className="text-lg font-semibold text-primary-600 mb-1">Frontend Engineer</p>
              <p className="text-xs text-gray-600">
                Recommended by predictive model based on your strengths.
              </p>
            </div>

            {/* Gap Radar */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Gap Radar</p>
              <div className="space-y-2">
                {gapSkills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{skill.name}</p>
                      <p className="text-xs text-gray-600">Projected {getProjectedLevel(skill).toFixed(0)}%</p>
                    </div>
                    <button
                      onClick={() => handleMicroLearn(skill.id)}
                      className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                      aria-label={`Micro Learn for ${skill.name}`}
                    >
                      MicroLearn →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Twin */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Career Twin</p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-2">Skill Level</p>
                <div className="h-16 flex items-end gap-1">
                  {[1, 2, 3, 4, 5, 6].map((month, idx) => {
                    const height = 20 + (idx * 8) + Math.random() * 10;
                    return (
                      <div
                        key={month}
                        className="flex-1 bg-primary-500 rounded-t"
                        style={{ height: `${height}px` }}
                        aria-label={`Month ${month}`}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-gray-600 mt-2">Months</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    showInfo('Extract Skills', 'Extracting skills from your profile...');
                    console.log('Extract Skills');
                  }}
                  className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Extract Skills"
                >
                  Extract Skills →
                </button>
                <button
                  onClick={() => {
                    showInfo('Skill Passport', 'Opening skill passport...');
                    console.log('Skill Passport');
                  }}
                  className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Skill Passport"
                >
                  Skill Passport →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Detail Drawer */}
      {isDrawerOpen && selectedSkill && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
          onClick={handleDrawerBackdropClick}
          aria-label="Skill detail drawer backdrop"
        >
          <div
            ref={drawerRef}
            className="bg-white rounded-t-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-fade-in-up transform translate-y-0"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                <div>
                  <h3 id="drawer-title" className="text-xl font-bold text-gray-900">{selectedSkill.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedSkill.category} · {selectedSkill.exp} yrs exp · {selectedSkill.level}%
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close drawer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePinSkill(selectedSkill.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    pinnedSkills.includes(selectedSkill.id)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={pinnedSkills.includes(selectedSkill.id) ? 'Unpin skill' : 'Pin skill'}
                >
                  {pinnedSkills.includes(selectedSkill.id) ? 'Unpin' : 'Pin'}
                </button>
                <button
                  onClick={() => handleMicroLearn(selectedSkill.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-success-500 text-white hover:bg-success-600 transition-colors focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2"
                  aria-label="Apply Micro Learn"
                >
                  MicroLearn
                </button>
              </div>

              {/* Skill Summary */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Skill Summary</h4>
                <p className="text-sm text-gray-600 mb-3">{selectedSkill.description}</p>
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Suggested Activities:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedSkill.suggestedActivities?.map((activity, idx) => (
                      <li key={idx} className="text-xs text-gray-600">{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Career Matches */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Career Matches</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.careerMatches?.map((career, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Path */}
              <button
                onClick={() => {
                  showSuccess('Added to Path', `${selectedSkill.name} added to learning pathway`);
                  console.log('Add to Path:', selectedSkill.name);
                }}
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Add to learning path"
              >
                Add to Path
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillDNAMapping;

