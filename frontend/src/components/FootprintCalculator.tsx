import { useState } from 'react';
import { calculateFootprint } from '../services/footprintApi';
import type { FootprintBreakdownItem } from '../services/footprintApi';

export function FootprintCalculator() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<{ kgCo2: number; breakdown: FootprintBreakdownItem[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    const text = description.trim();
    if (!text) {
      setError('Escribe una descripción de tu día.');
      return;
    }
    setLoading(true);
    try {
      const res = await calculateFootprint(text);
      setResult({ kgCo2: res.kgCo2, breakdown: res.breakdown ?? [] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-primary-200/80 bg-white p-5 shadow-lg shadow-primary-900/5 dark:border-primary-700/50 dark:bg-dark-800/95 dark:shadow-none sm:p-6 md:p-8 lg:p-10">
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <label htmlFor="description" className="block text-body-lg font-medium text-dark-900 dark:text-primary-100">
          Describe tu día en lenguaje natural
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej: Hoy comí carne y viajé 20km en bus"
          rows={5}
          className="min-h-[7rem] w-full rounded-xl border border-primary-200 bg-primary-50/50 px-4 py-4 text-body text-dark-900 placeholder-primary-400/70 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-100 dark:placeholder-primary-400/50 dark:focus:border-primary-400 dark:focus:ring-primary-400/30"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full min-h-[3.25rem] rounded-xl bg-primary-600 px-5 py-4 text-body-lg font-semibold text-white shadow-md transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-400 dark:focus:ring-offset-dark-800 dark:ring-offset-2"
        >
          {loading ? 'Calculando…' : 'Calcular huella de carbono'}
        </button>
      </form>

      {error && (
        <div className="mt-5 rounded-xl bg-red-50 p-4 text-body text-red-700 dark:bg-red-900/30 dark:text-red-300 sm:mt-6 sm:p-5" role="alert">
          {error}
        </div>
      )}

      {result && !error && (
        <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6" role="status" aria-live="polite">
          {result.breakdown.length > 0 && (
            <div className="rounded-xl border border-accent-200/80 bg-accent-50/40 p-5 dark:border-accent-700/50 dark:bg-accent-900/30 sm:p-6">
              <h3 className="mb-4 text-body-lg font-semibold text-dark-900 dark:text-primary-100 sm:mb-5 sm:text-lead">
                Desglose del cálculo
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {result.breakdown.map((item: FootprintBreakdownItem, i: number) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-lg bg-white/70 px-4 py-3 text-dark-800 dark:bg-dark-900/50 dark:text-primary-200 sm:px-5 sm:py-3.5"
                  >
                    <span className="text-body sm:text-body-lg">{item.label}</span>
                    <span className="font-semibold text-accent-700 tabular-nums dark:text-accent-300">
                      {item.kgCo2.toFixed(2)} kg CO₂
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border-2 border-primary-200 bg-gradient-to-br from-primary-500 to-accent-600 p-6 text-center text-white shadow-lg dark:border-primary-600 dark:from-primary-600 dark:to-accent-700 sm:p-8">
            <p className="text-body font-medium opacity-90 sm:text-body-lg">Huella estimada total</p>
            <p className="mt-3 text-display font-bold tracking-tight sm:mt-4 sm:text-display-lg">
              {result.kgCo2.toFixed(2)} kg CO₂
            </p>
            <p className="mt-2 text-body opacity-85 sm:text-body-lg">equivalente de dióxido de carbono</p>
          </div>
        </div>
      )}
    </div>
  );
}
