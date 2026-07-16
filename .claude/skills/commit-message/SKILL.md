# Commit Message

## Purpose

Generate high-quality Git commit messages following the Conventional Commits specification and commit the staged changes.

## Use this skill when

- The user asks to commit changes.
- The user asks for a commit message.
- The user says "commit it", "create a commit", "git commit", or similar.
- The assistant is about to run `git commit`.

## Instructions

1. Review the staged changes:

   ```bash
   git diff --cached --stat
   git diff --cached
   ```

2. Understand the intent of the changes.

3. Generate a Conventional Commit message using one of:
   - feat
   - fix
   - docs
   - style
   - refactor
   - perf
   - test
   - build
   - ci
   - chore
   - revert

4. Keep the subject:
   - Present tense
   - Under 72 characters
   - Lowercase (except proper nouns)
   - No trailing period

5. If multiple unrelated changes exist, recommend splitting them into separate commits.

6. Show the proposed commit message.

7. If the user requested a commit, run:

   ```bash
   git commit -m "<generated message>"
   ```

## Examples

### Dependency cleanup

```
chore: add gitignore and remove tracked build artifacts
```

### New feature

```
feat: add user profile settings page
```

### Bug fix

```
fix: prevent duplicate form submissions
```

### Refactoring

```
refactor: simplify authentication middleware
```

## Output

Return only the commit message unless the user requested additional explanation.
