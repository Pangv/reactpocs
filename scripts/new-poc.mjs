#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const slug = process.argv[2];
if (!slug) {
  console.error('❌ Usage: pnpm new-poc <slug>');
  console.error('   Example: pnpm new-poc form-validation');
  process.exit(1);
}

if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
  console.error('❌ Slug must be kebab-case, starting with a letter (e.g. "form-validation")');
  process.exit(1);
}

// --- Detect next NN number ---
const pocsDir = join(root, 'src', 'pocs');
const entries = existsSync(pocsDir) ? readdirSync(pocsDir) : [];
const maxN = entries.reduce((max, name) => {
  const m = name.match(/^(\d{2})-/);
  return m ? Math.max(max, parseInt(m[1], 10)) : max;
}, 0);
const nn = String(maxN + 1).padStart(2, '0');
const pocDirName = `${nn}-${slug}`;
const pocDir = join(pocsDir, pocDirName);

if (existsSync(pocDir)) {
  console.error(`❌ Directory already exists: ${pocDirName}`);
  process.exit(1);
}

// --- Create directory structure ---
mkdirSync(join(pocDir, 'components'), { recursive: true });
mkdirSync(join(pocDir, 'views'), { recursive: true });
mkdirSync(join(pocDir, 'utils'), { recursive: true });

const relPath = `src/pocs/${pocDirName}`;
const importPath = `../pocs/${pocDirName}`;
const importAlias = `@/pocs/${pocDirName}`;

// --- meta.ts ---
const metaContent = `import type { PocMeta } from '@/registry/pocRegistry';

const repoBaseUrl = 'https://github.com/Pangv/reactpocs/blob/main';

export const meta: PocMeta = {
  id: '${pocDirName}',
  title: '${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')}',
  description:
    'TODO: Beschreibung des POCs.',
  repoBaseUrl,
  sourceFiles: [
    { label: 'View', path: '${relPath}/views/ExampleView.tsx' },
    { label: 'Komponente', path: '${relPath}/components/ExampleComponent.tsx' },
    { label: 'Index/Einstieg', path: '${relPath}/index.tsx' },
  ],
  propFlowDiagram: \`
flowchart TD
    A["TODO: Diagramm"]
\`,
};

export default meta;
`;

// --- index.tsx ---
const indexContent = `import { Paper, Stack } from '@mui/material';
import { SourceFileTag } from '@/components/SourceFileTag';
import ExampleView from '${importAlias}/views/ExampleView';
import { meta } from './meta';
import PropFlowDiagram from '@/components/PropFlowDiagram';

export default function Poc${nn}${capitalizePascal(slug)}() {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2.5, md: 5 }, border: '1px solid', borderColor: 'rgba(30,58,95,.08)' }}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <SourceFileTag
          fileName="index.tsx"
          path="${relPath}/index.tsx"
          repoBaseUrl={meta.repoBaseUrl!}
        />
      </Stack>
      <ExampleView />
      <PropFlowDiagram diagram={meta.propFlowDiagram} />
    </Paper>
  );
}
`;

// --- views/ExampleView.tsx ---
const viewContent = `import { Stack, Typography } from '@mui/material';
import { SourceFileTag } from '@/components/SourceFileTag';
import { meta } from '../meta';

export default function ExampleView() {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <SourceFileTag
          fileName="ExampleView.tsx"
          path="${relPath}/views/ExampleView.tsx"
          repoBaseUrl={meta.repoBaseUrl!}
        />
        <Typography variant="h5">${capitalize(slug)}</Typography>
        <Typography variant="body2" color="text.secondary">
          TODO: Beschreibung dieser View.
        </Typography>
      </Stack>
    </Stack>
  );
}
`;

// --- components/ExampleComponent.tsx ---
const componentContent = `export interface ExampleComponentProps {
  // TODO: Props definieren
}

export function ExampleComponent(props: ExampleComponentProps) {
  return null;
}
`;

// --- utils/index.ts ---
const utilsContent = `// TODO: Pure utility/validation functions
`;

// --- Write all files ---
writeFileSync(join(pocDir, 'meta.ts'), metaContent);
writeFileSync(join(pocDir, 'index.tsx'), indexContent);
writeFileSync(join(pocDir, 'views', 'ExampleView.tsx'), viewContent);
writeFileSync(join(pocDir, 'components', 'ExampleComponent.tsx'), componentContent);
writeFileSync(join(pocDir, 'utils', 'index.ts'), utilsContent);

// --- Register in pocRegistry.ts ---
const registryPath = join(root, 'src', 'registry', 'pocRegistry.ts');
let registryContent = readFileSync(registryPath, 'utf-8');

// Add import for new meta (before the last import of meta*)
const importLine = `import meta${nn} from '${importPath}/meta';`;
const lastImportIndex = registryContent.lastIndexOf('import meta');
const afterLastImport = registryContent.indexOf('\n', lastImportIndex);
registryContent =
  registryContent.slice(0, afterLastImport + 1) +
  importLine + '\n' +
  registryContent.slice(afterLastImport + 1);

// Add entry to registry array (before the closing bracket)
const entryLine = `  {\n    ...meta${nn},\n    component: lazy(() => import('${importPath}')),\n  },`;
const arrayEndIndex = registryContent.lastIndexOf('];');
registryContent =
  registryContent.slice(0, arrayEndIndex) +
  entryLine + '\n' +
  registryContent.slice(arrayEndIndex);

writeFileSync(registryPath, registryContent);

// --- Done ---
console.log(`✅ Created POC: ${relPath}/`);
console.log(`   📄 meta.ts`);
console.log(`   📄 index.tsx`);
console.log(`   📁 views/ExampleView.tsx`);
console.log(`   📁 components/ExampleComponent.tsx`);
console.log(`   📁 utils/index.ts`);
console.log(`   🔗 Registered in src/registry/pocRegistry.ts`);

// --- Helpers ---
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
}

function capitalizePascal(s) {
  return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}