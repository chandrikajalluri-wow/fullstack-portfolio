## Git Merge

- Used to combine changes from one branch into another.

- Keeps the complete history of both branches, showing when they diverged and merges.

- Creates an extra merge commit to record the merge event.

- Safe for team collaboration because it doesn't alter existing commits.

- Can make the commit history look messy with many merge commits.

## Git Rebase

- Used to move or replay your branch's commits on top of another branch.

- Makes the history linear and clean, as if all work happened in order.

- Doesn't create a merge commit - instead, it rewrites commit history.

- Great for keeping a tidy, easy-to-read history.

- Not ideal for shared branches, since rewriting commits can confuse others.
