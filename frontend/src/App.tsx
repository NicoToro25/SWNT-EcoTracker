import { FootprintCalculator } from './components/FootprintCalculator';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50/40 to-primary-100/50 dark:from-dark-900 dark:via-primary-900/30 dark:to-accent-900/20">
      <header className="border-b border-primary-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-primary-700/50 dark:bg-dark-900/90 dark:supports-[backdrop-filter]:bg-dark-900/80">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h1 className="text-title font-bold text-dark-900 dark:text-primary-100 sm:text-title-lg">
              EcoTrack
            </h1>
            <p className="mt-0.5 text-body text-dark-800/80 dark:text-primary-200/90">
              Estima tu huella de carbono del día
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:max-w-3xl lg:px-8 lg:py-12">
        <FootprintCalculator />
      </main>
    </div>
  );
}

export default App;
