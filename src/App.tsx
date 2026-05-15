import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  Menu, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen, 
  Target, 
  Award, 
  ArrowLeft,
  Home,
  BarChart3,
  Users,
  Search,
  Settings,
  Info
} from 'lucide-react';
import { cn } from './lib/utils';
import { courseData } from './data/courseContent';
import { Phase, Lesson } from './types';

// Components
const Sidebar = ({ isOpen, onClose, currentLessonId }: { isOpen: boolean, onClose: () => void, currentLessonId?: string }) => {
  const [completed, setCompleted] = useState<string[]>([]);
  
  useEffect(() => {
    const checkCompleted = () => {
      const data = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
      setCompleted(data);
    };
    checkCompleted();
    window.addEventListener('storage', checkCompleted);
    return () => window.removeEventListener('storage', checkCompleted);
  }, [currentLessonId]);

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 bg-brand-sidebar border-r border-brand-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-brand-text-primary tracking-tight">BIRD DOG <span className="text-brand-blue font-black italic">PRO</span></span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-2 text-brand-text-muted hover:bg-brand-card rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          {courseData.phases.map((phase, pIndex) => (
            <div key={phase.id} className="space-y-2">
              <h3 className="px-3 text-[10px] font-semibold text-brand-text-muted uppercase tracking-widest flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-border flex items-center justify-center text-[10px] text-brand-text-secondary">
                  {pIndex + 1}
                </span>
                {phase.title}
              </h3>
              <div className="space-y-1">
                {phase.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={`/lesson/${phase.id}/${lesson.id}`}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors border border-transparent",
                      currentLessonId === lesson.id
                        ? "bg-brand-card text-brand-blue border-brand-border"
                        : "text-brand-text-muted hover:bg-brand-card hover:text-brand-text-secondary"
                    )}
                  >
                    {completed.includes(lesson.id) ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-blue" />
                    ) : (
                      <BookOpen className={cn("w-4 h-4 shrink-0", currentLessonId === lesson.id ? "text-brand-blue" : "text-brand-text-muted group-hover:text-brand-text-secondary")} />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-border italic text-[11px] text-brand-text-muted text-center underline decoration-brand-border underline-offset-4">
          This is NOT a wholesaling system.
        </div>
      </div>
    </div>
  );
};

const Header = ({ onMenuOpen, title }: { onMenuOpen: () => void, title: string }) => {
  return (
    <header className="sticky top-0 z-40 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border px-4 py-3 sm:px-6 flex items-center gap-4">
      <button onClick={onMenuOpen} className="lg:hidden p-2 text-brand-text-muted hover:bg-brand-card rounded-md">
        <Menu className="w-6 h-6" />
      </button>
      <div className="flex-1">
        <h1 className="text-sm font-semibold text-brand-text-primary truncate uppercase tracking-widest">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/" className="p-2 text-brand-text-muted hover:bg-brand-card rounded-md transition-colors">
          <Home className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
};

// Pages
const Dashboard = () => {
  const [completed, setCompleted] = useState<string[]>([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    setCompleted(data);
  }, []);

  const getPhaseProgress = (phase: Phase) => {
    const phaseLessons = phase.lessons.map(l => l.id);
    const completedInPhase = phaseLessons.filter(id => completed.includes(id));
    return (completedInPhase.length / phaseLessons.length) * 100;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center px-3 py-1 bg-brand-green/10 text-brand-blue text-[10px] font-bold uppercase tracking-widest rounded transition-colors">
            Operational Training
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-brand-text-primary tracking-tight leading-tight">
            Bird Dog <span className="text-brand-blue italic font-bold">Operator</span> Blueprint
          </h1>
          <p className="text-lg text-brand-text-muted max-w-2xl leading-relaxed">
            A system for becoming the person investors trust to bring them opportunities that actually fit their criteria. Your value is in the <span className="text-brand-text-secondary border-b border-brand-border">filtering</span>, not the volume.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseData.phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-brand-card border border-brand-card-border p-8 rounded-2xl hover:border-brand-blue/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-bg text-brand-text-primary font-bold border border-brand-border group-hover:bg-brand-accent group-hover:border-brand-accent transition-all">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <div className="w-12 h-12 rounded-full border border-brand-border flex items-center justify-center bg-brand-sidebar">
                <span className="text-[10px] font-bold text-brand-blue">{Math.round(getPhaseProgress(phase))}%</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-brand-text-primary mb-2 group-hover:text-brand-blue transition-colors uppercase tracking-tight">{phase.title}</h3>
            <p className="text-sm text-brand-text-muted mb-6 line-clamp-2 leading-relaxed">
              {phase.objective}
            </p>

            <div className="space-y-2 mb-6">
              <div className="h-1 w-full bg-brand-border rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${getPhaseProgress(phase)}%` }}
                  className="h-full bg-brand-blue rounded-full"
                />
              </div>
            </div>

            <Link 
              to={`/lesson/${phase.id}/${phase.lessons[0].id}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-text-secondary border-b border-brand-border pb-1 hover:text-brand-blue hover:border-brand-blue transition-all"
            >
              ACCESS MODULE <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-brand-card border border-brand-card-border rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 space-y-8 max-w-2xl">
          <div>
            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] block mb-2">Primary Objective</span>
            <h2 className="text-3xl font-light text-brand-text-primary leading-tight">Turn from a beginner into an <span className="text-brand-blue font-semibold">Elite Scout</span></h2>
          </div>
          <p className="text-brand-text-muted text-lg font-light leading-relaxed">
            Understand investor psychology, master deal filtering, and build sourcing systems that professional buyers respect.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "No Seller Negotiation",
              "Investor-Facing Only",
              "Operational Focus Only",
              "Trusted Acquisition Scout"
            ].map((tag) => (
              <div key={tag} className="flex items-center gap-3 text-brand-text-secondary text-sm font-mono tracking-tight leading-none group">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:scale-150 transition-transform" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonViewer = () => {
  const { phaseId, lessonId } = useParams();
  const navigate = useNavigate();
  const phase = courseData.phases.find(p => p.id === phaseId);
  const lesson = phase?.lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (lessonId) {
      const completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
      if (!completed.includes(lessonId)) {
        localStorage.setItem('completed_lessons', JSON.stringify([...completed, lessonId]));
      }
    }
  }, [lessonId]);

  if (!phase || !lesson) return <div>Lesson not found</div>;

  const currentPhaseIndex = courseData.phases.indexOf(phase);
  const currentLessonIndex = phase.lessons.indexOf(lesson);

  const nextLesson = phase.lessons[currentLessonIndex + 1] 
    ? { phaseId: phase.id, lessonId: phase.lessons[currentLessonIndex + 1].id }
    : courseData.phases[currentPhaseIndex + 1]
    ? { phaseId: courseData.phases[currentPhaseIndex + 1].id, lessonId: courseData.phases[currentPhaseIndex + 1].lessons[0].id }
    : null;

  const prevLesson = phase.lessons[currentLessonIndex - 1]
    ? { phaseId: phase.id, lessonId: phase.lessons[currentLessonIndex - 1].id }
    : courseData.phases[currentPhaseIndex - 1]
    ? { phaseId: courseData.phases[currentPhaseIndex - 1].id, lessonId: courseData.phases[currentPhaseIndex - 1].lessons[courseData.phases[currentPhaseIndex - 1].lessons.length - 1].id }
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-brand-text-muted hover:text-brand-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> DASHBOARD
        </Link>
        <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-[0.2em]">
          Phase {currentPhaseIndex + 1} // Lesson {currentLessonIndex + 1}
        </span>
      </div>

      <motion.article 
        key={lesson.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-invert max-w-none 
          prose-headings:text-brand-text-primary prose-headings:font-light prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:pb-6 prose-h1:border-b prose-h1:border-brand-border
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-brand-blue
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-bold prose-h3:uppercase prose-h3:tracking-widest prose-h3:text-brand-gold
          prose-p:text-brand-text-muted prose-p:leading-loose prose-p:text-lg
          prose-li:text-brand-text-muted prose-li:text-lg
          prose-strong:text-brand-text-primary prose-strong:font-bold
          prose-blockquote:border-l-brand-blue prose-blockquote:bg-brand-card prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic
          prose-code:text-brand-blue prose-code:bg-brand-bg prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
        "
      >
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
      </motion.article>

      <div className="mt-20 pt-10 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-6">
        {prevLesson ? (
          <Link 
            to={`/lesson/${prevLesson.phaseId}/${prevLesson.lessonId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-bold text-brand-text-secondary bg-brand-card border border-brand-card-border rounded-lg hover:border-brand-blue transition-all uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link 
            to={`/lesson/${nextLesson.phaseId}/${nextLesson.lessonId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-xs font-bold text-white bg-brand-accent rounded-lg hover:bg-brand-blue transition-all shadow-xl shadow-brand-accent/10 uppercase tracking-widest"
          >
            Mark Complete & Continue <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link 
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-xs font-bold text-white bg-brand-blue rounded-lg hover:bg-brand-accent transition-all shadow-xl shadow-brand-blue/10 uppercase tracking-widest"
          >
            Finish Course <Award className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppContent />
  );
}

// Wrapper to use location hooks
function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getHeaderTitle = () => {
    const match = location.pathname.match(/\/lesson\/([^/]+)\/([^/]+)/);
    if (match) {
      const [_, phaseId, lessonId] = match;
      const phase = courseData.phases.find(p => p.id === phaseId);
      const lesson = phase?.lessons.find(l => l.id === lessonId);
      return lesson?.title || "Course Material";
    }
    return "Operator Dashboard";
  };

  const getCurrentLessonId = () => {
    const match = location.pathname.match(/\/lesson\/([^/]+)\/([^/]+)/);
    return match ? match[2] : undefined;
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text-secondary selection:bg-brand-blue selection:text-white">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentLessonId={getCurrentLessonId()}
      />
      
      <div className="lg:pl-72 h-full">
        <Header 
          onMenuOpen={() => setIsSidebarOpen(true)} 
          title={getHeaderTitle()} 
        />
        
        <main className="min-h-[calc(100vh-100px)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lesson/:phaseId/:lessonId" element={<LessonViewer />} />
          </Routes>
        </main>

        <footer className="px-10 py-10 border-t border-brand-border bg-brand-sidebar">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-brand-text-primary uppercase">BIRD DOG <span className="text-brand-blue">OPERATOR</span></span>
              </div>
              <p className="text-[10px] text-brand-text-muted uppercase tracking-[0.3em]">Investor-Side Deal Sourcing Blueprint</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2 text-[10px] text-brand-text-muted font-mono uppercase tracking-widest">
              <span>SYSTEM STATUS: OPERATIONAL</span>
              <p className="opacity-50 italic">
                © {new Date().getFullYear()} Not a Wholesaling Course.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
