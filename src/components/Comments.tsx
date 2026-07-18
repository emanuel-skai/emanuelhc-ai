'use client';

import { useEffect, useState } from 'react';

interface Comment {
  date: string;
  name: string;
  comment: string;
}

const COPY = {
  en: {
    title: 'Comments',
    intro: 'Join the discussion. Comments appear after a quick review.',
    name: 'Name',
    comment: 'Your comment',
    submit: 'Post comment',
    submitting: 'Posting…',
    thanks: 'Thanks! Your comment will appear once approved.',
    empty: 'No comments yet. Be the first.',
    error: 'Something went wrong. Please try again.',
  },
  es: {
    title: 'Comentarios',
    intro: 'Únete a la conversación. Los comentarios aparecen tras una revisión rápida.',
    name: 'Nombre',
    comment: 'Tu comentario',
    submit: 'Publicar comentario',
    submitting: 'Publicando…',
    thanks: '¡Gracias! Tu comentario aparecerá una vez aprobado.',
    empty: 'Aún no hay comentarios. Sé el primero.',
    error: 'Algo salió mal. Inténtalo de nuevo.',
  },
};

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors text-sm';

export default function Comments({
  slug,
  lang,
}: {
  slug: string;
  lang: 'en' | 'es';
}) {
  const t = COPY[lang];
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments || []))
      .catch(() => setComments([]))
      .finally(() => setLoaded(true));
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, comment, website }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setName('');
      setComment('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="mt-16 pt-10 border-t border-[var(--border)]">
      <h2 className="text-xl font-semibold text-[var(--text)] mb-2">{t.title}</h2>
      <p className="text-[var(--muted)] text-sm mb-8">{t.intro}</p>

      {loaded && comments.length === 0 && (
        <p className="text-[var(--muted2)] text-sm mb-8">{t.empty}</p>
      )}

      {comments.length > 0 && (
        <ul className="space-y-4 mb-10">
          {comments.map((c, i) => (
            <li key={i} className="card p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[var(--text)] text-sm font-semibold">
                  {c.name}
                </span>
                {c.date && (
                  <time className="text-[var(--muted2)] text-xs">
                    {new Date(c.date).toLocaleDateString(
                      lang === 'es' ? 'es-CO' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </time>
                )}
              </div>
              <p className="text-[var(--muted)] text-[15px] leading-relaxed whitespace-pre-line">
                {c.comment}
              </p>
            </li>
          ))}
        </ul>
      )}

      {status === 'sent' ? (
        <p className="text-[var(--emerald)] text-sm">{t.thanks}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.name}
            maxLength={80}
            required
            className={inputClass}
          />
          {/* Honeypot — hidden from real readers */}
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.comment}
            maxLength={2000}
            required
            rows={4}
            className={inputClass}
          />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary !py-3 !px-6 text-sm disabled:opacity-60"
            >
              {status === 'submitting' ? t.submitting : t.submit}
            </button>
            {status === 'error' && (
              <span className="text-red-400 text-sm">{t.error}</span>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
