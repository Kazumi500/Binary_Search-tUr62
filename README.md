<p align="center">
  <img src="./assets/logo.svg" alt="BST logo">
</p>

# Balanced BST

<div align="center">
  <img alt="ISC" src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge">
  
</div>


A small, ESM-only JavaScript binary search tree: build, insert,
delete, traverse, balance. Stdlib only; no runtime dependencies.

## Install

```bash
npm install
```

## Files

- `src/bst.js` — library: `Node` class + `Tree(arr)` factory
  (`buildTree`, `insert`, `deleteItem`, `includes`,
  `levelOrderForEach` / `inOrderForEach` / `preOrderForEach` /
  `postOrderForEach`, `height`, `depth`, `isBalanced`, `rebalance`)
  + `prettyPrint` for visual inspection.
- `src/driver.js` — demo script. Builds a random BST, checks
  balance, prints all four traversals, unbalances with large
  inserts, then `rebalance`s and re-prints. Run with `npm start`.
- `__tests__/bst.test.js` — 9 jest cases covering build dedupe +
  balance, insert duplicate no-op, delete leaf / one child / two
  children / sibling missing, in-order sorted, and the rebalance
  roundtrip. Run with `npm test`.

## Usage

```js
import { Tree, prettyPrint } from "./src/bst.js";

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);

const out = [];
tree.inOrderForEach((v) => out.push(v));
// => [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
```

## Commands

| Command       | What it does                          |
| ------------- | ------------------------------------- |
| `npm install` | Pulls jest + babel devDeps.          |
| `npm start`   | Runs `src/driver.js` (the demo).      |
| `npm test`    | Runs jest under `__tests__/`.         |

> [!NOTE]
> No runtime dependencies. Tests use jest + babel-jest (devDeps only)
> so the ESM library transpiles to CJS through Babel without the
> `--experimental-vm-modules` flag.
