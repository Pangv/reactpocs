import type { JSX } from 'react';

export interface PocSourceFile {
  label: string;
  path: string;
}

export interface PocMeta {
  id: string;
  title: string;
  description: string;
  repoBaseUrl?: string;
  sourceFiles?: Array<{ label: string; path: string }>;
  propFlowDiagram?: string;
}

export interface PocEntry extends PocMeta {
  component: React.LazyExoticComponent<() => JSX.Element>;
}

// Beispiel-Registrierung (Import je nach bestehendem Setup anpassen):
import { lazy } from 'react';
import meta01 from '../pocs/01-props-state-validation/meta';

export const pocRegistry: PocEntry[] = [
  {
    ...meta01,
    component: lazy(() => import('../pocs/01-props-state-validation')),
  },
];