# Scan Patterns Reference

Quick-reference for the scanning phase. Organized by signal type with concrete shell commands and grep patterns to find each issue.

## Finding Large Files

```bash
# Files over 400 lines (excluding node_modules, .next, dist, etc.)
find . -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.py' | \
  grep -v node_modules | grep -v .next | grep -v dist | \
  xargs wc -l | sort -rn | head -20
```

## Finding Long Functions

```bash
# TypeScript/JavaScript: functions over 50 lines (approximate)
grep -rn 'function \|=> {' --include='*.ts' --include='*.tsx' | head -30
```

Then read the files and count lines between opening and closing braces.

## Finding Code Smells

```bash
# any types in TypeScript
grep -rn ': any' --include='*.ts' --include='*.tsx' | grep -v node_modules

# Empty catch blocks
grep -rn 'catch.*{' -A1 --include='*.ts' --include='*.tsx' | grep -B1 '^\s*}'

# Console.logs in production code (excluding test files)
grep -rn 'console\.\(log\|debug\|info\)' --include='*.ts' --include='*.tsx' | grep -v test | grep -v spec

# TODO/FIXME/HACK comments
grep -rn 'TODO\|FIXME\|HACK\|XXX' --include='*.ts' --include='*.tsx' | grep -v node_modules

# Hardcoded URLs or magic numbers
grep -rn 'http://\|https://' --include='*.ts' --include='*.tsx' | grep -v node_modules | grep -v '.config'
```

## Finding Duplicate Logic

```bash
# Look for similar import patterns across files (signals shared logic)
grep -rn 'import.*from' --include='*.ts' --include='*.tsx' | \
  awk -F'from' '{print $2}' | sort | uniq -c | sort -rn | head -20

# Files with similar names (potential consolidation candidates)
find . -name '*.ts' -o -name '*.tsx' | grep -v node_modules | \
  xargs -I{} basename {} | sort | uniq -d
```

## Finding Unused Exports

```bash
# List all exports, then check if they're imported anywhere
grep -rn 'export ' --include='*.ts' --include='*.tsx' | grep -v node_modules | \
  grep -v '.d.ts' | head -30
```

For each export, grep for the exported name across the codebase. If it only appears in its own file, it's likely dead code.

## Finding Feature Expansion Opportunities

```bash
# Check what env vars are available
cat .env.local .env.example 2>/dev/null | grep -v '^#' | grep -v '^$'

# Check what dependencies are installed but might be underutilized
cat package.json | python3 -c "import sys,json; deps=json.load(sys.stdin).get('dependencies',{}); [print(k) for k in deps]" 2>/dev/null

# Look for commented-out features or disabled code paths
grep -rn '// TODO\|// DISABLED\|// ENABLE\|feature.*flag' --include='*.ts' --include='*.tsx' | grep -v node_modules

# Check for API routes that might be incomplete
find . -path '*/api/*' -name '*.ts' | grep -v node_modules
```

## Risk Assessment Quick Checks

Before making a change, verify:

```bash
# Does the project have tests?
ls -la **/test* **/*.test.* **/*.spec.* **/jest.config* **/vitest.config* 2>/dev/null | head -5

# Does it have a build step?
cat package.json | python3 -c "import sys,json; scripts=json.load(sys.stdin).get('scripts',{}); [print(f'{k}: {v}') for k,v in scripts.items() if 'build' in k or 'lint' in k or 'test' in k]" 2>/dev/null

# Check git status (make sure working tree is clean before starting)
git status --short
```

## Common Safe Refactors (Low Risk)

These almost never break things:

1. **Extract constant**: Move a magic number/string to a named constant
2. **Extract function**: Pull a code block into a named function (same file first, then consider extracting to a utility)
3. **Remove dead code**: Delete unused imports, unreachable branches, commented-out blocks
4. **Add TypeScript types**: Replace `any` with proper types
5. **Rename for clarity**: `data` → `userProfiles`, `handleClick` → `handleSubmitOrder`
6. **Add error handling**: Wrap bare try/catch with proper error messages
7. **Split large file**: Extract a cohesive group of functions/components into a new file

## Common Moderate Refactors (Medium Risk)

These can break things if done carelessly — verify with tests/build:

1. **Consolidate duplicates**: Merge two similar functions into one shared utility
2. **Extract hook**: Pull React state + effects into a custom hook
3. **Add validation**: Add input validation at API boundaries
4. **Add loading/error states**: Improve UX for async operations
5. **Wire up unused integration**: Connect an env var / dependency to an existing feature
