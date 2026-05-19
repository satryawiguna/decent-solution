'use client';

import Link from 'next/link';
import type { WorkspaceTemplate } from '@workspace-pro/shared';

interface TemplateCardProps {
  template: WorkspaceTemplate;
  tag: string;
  tagColor: string;
}

const tagStyles: Record<string, string> = {
  teal: 'bg-teal-900/40 text-teal-400 border-teal-700/30',
  purple: 'bg-purple-900/40 text-purple-400 border-purple-700/30',
  amber: 'bg-amber-900/40 text-amber-400 border-amber-700/30',
};

export default function TemplateCard({ template, tag, tagColor }: TemplateCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-brand-800/70 bg-brand-900/60 transition-all hover:border-brand-700 hover:bg-brand-900/80">
      {/* Image */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-brand-950/60">
        <img
          src={template.imageUrl}
          alt={template.name}
          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Tag */}
        <span
          className={`inline-block w-fit rounded-full border px-3 py-0.5 text-xs font-medium ${tagStyles[tagColor] || tagStyles.teal}`}
        >
          {tag}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white">{template.name}</h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-brand-300">
          {template.description}
        </p>

        {/* CTA */}
        <Link
          href={`/design?template=${template.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          Select Template
          <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
