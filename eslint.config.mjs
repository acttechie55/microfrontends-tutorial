import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:feature', 'type:ui', 'type:data-access', 'type:models', 'type:util', 'type:auth'] },
            { sourceTag: 'type:feature', onlyDependOnLibsWithTags: ['type:ui', 'type:data-access', 'type:models', 'type:util', 'type:auth'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:models', 'type:util'] },
            { sourceTag: 'type:data-access', onlyDependOnLibsWithTags: ['type:models', 'type:util', 'type:auth'] },
            { sourceTag: 'type:auth', onlyDependOnLibsWithTags: ['type:models', 'type:util'] },
            { sourceTag: 'scope:user-profile', onlyDependOnLibsWithTags: ['scope:user-profile', 'scope:shared'] },
            { sourceTag: 'scope:analytics', onlyDependOnLibsWithTags: ['scope:analytics', 'scope:shared'] },
            { sourceTag: 'scope:settings', onlyDependOnLibsWithTags: ['scope:settings', 'scope:shared'] },
            { sourceTag: 'scope:notifications', onlyDependOnLibsWithTags: ['scope:notifications', 'scope:shared'] },
            { sourceTag: 'scope:shell', onlyDependOnLibsWithTags: ['scope:shared'] },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
