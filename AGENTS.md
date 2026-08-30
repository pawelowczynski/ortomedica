## Destructive operations

- Never delete files or directories unless the user explicitly requests deletion.
- Even when deletion was requested, ask for explicit confirmation immediately before deleting.
- Do not use destructive substitutes such as `git clean`, `git reset --hard`, overwriting with empty content, or recursive removal without the same confirmation.
- Prefer recoverable alternatives such as moving an item to a clearly named backup or trash location when practical.

## Routine file edits

- Use `apply_patch` for ordinary source-file edits. Do not implement routine edits through generated PowerShell, Python, or shell read/replace/write scripts.
- Editing files inside the active repository is pre-authorized and must not trigger a user approval request.
- Preserve the file encoding and line-ending style when applying patches.
