import Link from 'next/link';
import { workspaceTemplates } from '@/domain/entities';
import TemplateCard from '@/components/ui/TemplateCard';

const templateMeta: Record<
  string,
  { tag: string; tagColor: string; description: string }
> = {
  'home-office': {
    tag: 'For individuals',
    tagColor: 'teal',
    description:
      'Ideal for individual focus and domestic comfort. A single desk with ergonomic seating and personal accents.',
  },
  'collaborative-studio': {
    tag: 'For teams',
    tagColor: 'purple',
    description:
      'Built for teams that thrive together. Modular tables, shared storage, and breakout areas.',
  },
  'executive-suite': {
    tag: 'For leaders',
    tagColor: 'amber',
    description:
      'A premium environment for leadership and focus. Commanding desk, executive seating, and refined aesthetics.',
  },
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-28">
      {/* Hero */}
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Define Your Space
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-brand-300">
          Select a workspace archetype that matches your style, then customize
          every detail.
        </p>
      </div>

      {/* Template Cards */}
      <div className="mt-16 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workspaceTemplates.map((template) => {
          const meta = templateMeta[template.id] ?? {
            tag: template.name,
            tagColor: 'teal',
            description: template.description,
          };

          return (
            <TemplateCard
              key={template.id}
              template={{ ...template, description: meta.description }}
              tag={meta.tag}
              tagColor={meta.tagColor}
            />
          );
        })}
      </div>

      {/* Start from scratch */}
      <Link
        href="/design"
        className="mt-10 text-sm font-medium text-brand-400 transition-colors hover:text-brand-200"
      >
        Start from scratch &rarr;
      </Link>
    </main>
  );
}
