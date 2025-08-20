import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, TrendingUp, Brain, Target, MessageCircle, Download, Settings, ChevronRight, Sparkles } from 'lucide-react';

const IdentityDashboard = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodNote, setMoodNote] = useState('');
  const [timeRange, setTimeRange] = useState('7');
  const [showGuidance, setShowGuidance] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(5);
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moodOptions = [
    { emoji: '😃', label: 'Joyful', score: 5, color: '#10b981' },
    { emoji: '😊', label: 'Content', score: 4, color: '#3b82f6' },
    { emoji: '😐', label: 'Neutral', score: 3, color: '#6b7280' },
    { emoji: '😔', label: 'Down', score: 2, color: '#f59e0b' },
    { emoji: '😤', label: 'Frustrated', score: 1, color: '#ef4444' },
    { emoji: '😰', label: 'Anxious', score: 1.5, color: '#8b5cf6' }
  ];

  // Sample mood data - in real app, this would come from Supabase
  const [moodData, setMoodData] = useState([
    { date: '8/12', mood_score: 3.5, selected_mood: '😊', ai_detected_tone: 'optimistic' },
    { date: '8/13', mood_score: 4.2, selected_mood: '😃', ai_detected_tone: 'confident' },
    { date: '8/14', mood_score: 2.8, selected_mood: '😔', ai_detected_tone: 'reflective' },
    { date: '8/15', mood_score: 3.8, selected_mood: '😊', ai_detected_tone: 'balanced' },
    { date: '8/16', mood_score: 4.5, selected_mood: '😃', ai_detected_tone: 'energetic' },
    { date: '8/17', mood_score: 4.0, selected_mood: '😊', ai_detected_tone: 'peaceful' },
    { date: '8/18', mood_score: 4.3, selected_mood: '😃', ai_detected_tone: 'motivated' }
  ]);

  const progressStats = {
    totalEntries: 87,
    consistentWeeks: 12,
    improvementTrend: '+15%',
    topMood: '😊'
  };

  const handleMoodSubmit = () => {
    if (!selectedMood) return;
    
    const newEntry = {
      date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
      mood_score: moodOptions.find(m => m.emoji === selectedMood)?.score || 3,
      selected_mood: selectedMood,
      ai_detected_tone: 'processing...'
    };
    
    setMoodData(prev => [...prev.slice(-6), newEntry]);
    setSelectedMood('');
    setMoodNote('');
    
    // Simulate AI analysis
    setTimeout(() => {
      const tones = ['reflective', 'optimistic', 'thoughtful', 'balanced', 'energetic'];
      const randomTone = tones[Math.floor(Math.random() * tones.length)];
      setMoodData(prev => prev.map((entry, index) => 
        index === prev.length - 1 
          ? { ...entry, ai_detected_tone: randomTone }
          : entry
      ));
    }, 2000);
  };

  const requestGuidance = () => {
    setIsAnalyzing(true);
    setShowGuidance(true);
    
    // Simulate TRUFiT AI processing
    setTimeout(() => {
      const responses = [
        "I notice you've been consistently positive this week! Let's explore what's working well for you. Try this reflection: What specific actions or thoughts contributed to your recent emotional balance?",
        "Your mood pattern shows some variability. This is completely normal! Consider taking 5 minutes for a grounding exercise: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
        "I see you're building strong emotional awareness. Your TRUFiT journey is progressing beautifully. Would you like to explore a new identity strength today?",
        "Based on your recent entries, you might benefit from a confidence-building exercise. Try writing three things you accomplished today, no matter how small."
      ];
      
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const downloadInsights = () => {
    alert('PDF Insights downloading... (In production, this would generate a comprehensive mood and growth report)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* iAscendAi Logo */}
              <div className="relative">
                <svg width="60" height="60" viewBox="0 0 200 200" className="drop-shadow-lg">
                  {/* Outer triangular frames */}
                  <path d="M100 20 L160 80 L140 80 L100 40 L60 80 L40 80 Z" fill="url(#logoGradient1)" />
                  <path d="M100 35 L145 80 L125 80 L100 55 L75 80 L55 80 Z" fill="url(#logoGradient2)" />
                  <path d="M100 50 L130 80 L110 80 L100 70 L90 80 L70 80 Z" fill="url(#logoGradient3)" />
                  
                  {/* Central circle */}
                  <circle cx="100" cy="100" r="15" fill="url(#logoGradient4)" stroke="#0891b2" strokeWidth="2"/>
                  <circle cx="100" cy="100" r="8" fill="#0891b2"/>
                  
                  {/* Radiating lines */}
                  <g stroke="#0891b2" strokeWidth="3" strokeLinecap="round">
                    <line x1="100" y1="130" x2="100" y2="155" />
                    <line x1="85" y1="125" x2="75" y2="145" />
                    <line x1="115" y1="125" x2="125" y2="145" />
                    <line x1="70" y1="115" x2="50" y2="125" />
                    <line x1="130" y1="115" x2="150" y2="125" />
                  </g>
                  
                  <defs>
                    <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <linearGradient id="logoGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="logoGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">i</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Ascend</span>
                  <span className="bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent">Ai</span>
                </h1>
                <p className="text-orange-400 font-semibold text-sm tracking-wide">THE TRUST ENGINE</p>
                <p className="text-slate-300 text-sm">Identity Dashboard - Track your emotional journey</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={downloadInsights}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <Download size={18} />
                Export Insights
              </button>
              <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Daily Mood Entry */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-cyan-400" size={24} />
              <h2 className="text-xl font-semibold">How are you feeling today?</h2>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
              {moodOptions.map((mood) => (
                <button
                  key={mood.emoji}
                  onClick={() => setSelectedMood(mood.emoji)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                    selectedMood === mood.emoji 
                      ? 'border-cyan-400 bg-cyan-400/20 scale-110' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="text-3xl mb-1">{mood.emoji}</div>
                  <div className="text-xs text-slate-300">{mood.label}</div>
                </button>
              ))}
            </div>

            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              placeholder="Add a note about your day... (optional)"
              className="w-full bg-white/5 border border-white/20 rounded-xl p-3 text-white placeholder-slate-400 resize-none focus:border-cyan-400 focus:outline-none transition-colors duration-300"
              rows="3"
            />

            <button
              onClick={handleMoodSubmit}
              disabled={!selectedMood}
              className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Log Today's Mood
            </button>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-semibold">Current Streak</span>
                <Target className="text-green-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-green-400">{currentStreak} days</div>
              <div className="text-sm text-green-300 mt-1">Consistent logging</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-semibold">Growth Trend</span>
                <TrendingUp className="text-purple-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-purple-400">{progressStats.improvementTrend}</div>
              <div className="text-sm text-purple-300 mt-1">This month</div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-400 font-semibold">Most Common</span>
                <Sparkles className="text-cyan-400" size={20} />
              </div>
              <div className="text-3xl font-bold text-cyan-400">{progressStats.topMood}</div>
              <div className="text-sm text-cyan-300 mt-1">Dominant mood</div>
            </div>
          </div>
        </div>

        {/* Emotional Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-cyan-400" size={24} />
                <h2 className="text-xl font-semibold">Emotional Trends</h2>
              </div>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
              </select>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={moodData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis domain={[1, 5]} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="mood_score" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fill="url(#moodGradient)"
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#06b6d4' }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                {moodData.slice(-3).map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-2xl">{entry.selected_mood}</span>
                    <span className="text-xs text-slate-400">{entry.date}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                AI Tone: <span className="text-cyan-400">{moodData[moodData.length - 1]?.ai_detected_tone}</span>
              </div>
            </div>
          </div>

          {/* iAscendAi Trust Engine */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="text-orange-400" size={24} />
              <h2 className="text-xl font-semibold">iAscendAi Trust Engine</h2>
            </div>

            {!showGuidance ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Brain size={32} />
                </div>
                <p className="text-slate-300 mb-6">Ready to provide personalized insights based on your mood patterns</p>
                <button
                  onClick={requestGuidance}
                  className="bg-gradient-to-r from-orange-500 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:from-orange-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <MessageCircle size={18} />
                  Trust Engine Analysis
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {isAnalyzing ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-cyan-400">Analyzing your patterns...</span>
                  </div>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="text-purple-400" size={16} />
                        <span className="text-purple-400 font-semibold text-sm">TRUFiT AI Insight</span>
                      </div>
                      <p className="text-white leading-relaxed">{aiResponse}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <button className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="flex-1 text-left">Start guided reflection</span>
                        <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                      </button>
                      <button className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="flex-1 text-left">Try breathing exercise</span>
                        <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                      </button>
                      <button className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="flex-1 text-left">Explore identity tools</span>
                        <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-300">Total Entries</span>
              <Calendar className="text-cyan-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-cyan-400">{progressStats.totalEntries}</div>
            <div className="text-sm text-slate-400 mt-1">Mood logs recorded</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-300">Consistency</span>
              <Target className="text-green-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-green-400">{progressStats.consistentWeeks}</div>
            <div className="text-sm text-slate-400 mt-1">Weeks tracked</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-300">Growth</span>
              <TrendingUp className="text-purple-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-purple-400">{progressStats.improvementTrend}</div>
            <div className="text-sm text-slate-400 mt-1">Improvement rate</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-300">Dominant Mood</span>
              <Sparkles className="text-yellow-400" size={20} />
            </div>
            <div className="text-3xl font-bold">{progressStats.topMood}</div>
            <div className="text-sm text-slate-400 mt-1">Most frequent</div>
          </div>
        </div>

        {/* Recent Activity & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
              <MessageCircle className="text-cyan-400" size={20} />
              Recent Journal Insights
            </h3>
            
            <div className="space-y-3">
              {moodData.slice(-3).reverse().map((entry, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <span className="text-2xl">{entry.selected_mood}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{entry.date}</div>
                    <div className="text-xs text-slate-400">AI detected: {entry.ai_detected_tone}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-cyan-400">{entry.mood_score.toFixed(1)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
              <Target className="text-purple-400" size={20} />
              Identity Growth Milestones
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <div className="font-medium">Self-Awareness Builder</div>
                  <div className="text-sm text-slate-400">Completed 2 weeks ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <div className="font-medium">Emotional Intelligence Quiz</div>
                  <div className="text-sm text-slate-400">Completed 1 week ago</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-dashed border-purple-400">
                  <span className="text-sm">50%</span>
                </div>
                <div>
                  <div className="font-medium">Resilience Pathway</div>
                  <div className="text-sm text-slate-400">In progress</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-[1.02]">
              Take New Assessment
            </button>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl p-6 border border-purple-500/20">
          <p className="text-lg font-medium mb-2">
            "You've had <span className="text-cyan-400 font-bold">{currentStreak} calm days</span> in a row — keep going!"
          </p>
          <p className="text-slate-300">Your emotional awareness is growing stronger every day. 🌟</p>
        </div>
      </div>
    </div>
  );
};

export default IdentityDashboard;
