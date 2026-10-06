import React, { useState } from 'react';
import { BookOpen, Search, GraduationCap, Clock, Award, ArrowRight } from 'lucide-react';
import { COMPREHENSIVE_CURRICULUM } from '../../data/curriculumComprehensive';
import { ComprehensiveCourse } from '../../types/comprehensiveChemistry';

interface CourseCatalogGridProps {
  onSelectCourse?: (course: ComprehensiveCourse) => void;
}

export const CourseCatalogGrid: React.FC<CourseCatalogGridProps> = ({ onSelectCourse }) => {
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = ['All', 'Introductory', 'Intermediate', 'Advanced', 'Graduate'];

  const filteredCourses = COMPREHENSIVE_CURRICULUM.filter((c) => {
    const matchesLevel = levelFilter === 'All' || c.level === levelFilter;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-400" /> Academic Chemistry Curriculum Directory
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Eight accredited university lecture courses with modular lesson sequences and problem sets.
          </p>
        </div>
        <div className="flex gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                levelFilter === lvl
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelectCourse?.(c)}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition flex flex-col justify-between cursor-pointer group shadow-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-400 font-semibold">
                  {c.code}
                </span>
                <span className="text-[10px] text-slate-500">{c.creditHours} Credits</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-primary-300 transition">{c.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-3">{c.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{c.modules.length} Modules</span>
              <span className="flex items-center gap-1 text-primary-400 font-semibold group-hover:translate-x-1 transition">
                View Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
