import type { ComponentType } from 'react';
import PocPropsStateValidation from '../pocs/01-props-state-validation';
import { meta } from '../pocs/01-props-state-validation/meta';

export interface PocEntry {
  id: string;
  title: string;
  description: string;
  Component: ComponentType;
}

export const pocRegistry: PocEntry[] = [
  { ...meta, Component: PocPropsStateValidation },
];
