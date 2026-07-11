import { Tree, prettyPrint } from "./bst.js";

function randomArray(n, max = 100) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max));
}

function collect(label, fn) {
  const out = [];
  fn((v) => out.push(v));
  console.log(`${label}: ${out.join(" ")}`);
}

const tree = Tree(randomArray(15));

console.log("1. Initial tree (random values < 100):");
prettyPrint(tree.root);
console.log(`Balanced? ${tree.isBalanced()}`);

console.log("\n2. Traversals:");
collect("Level order", (cb) => tree.levelOrderForEach(cb));
collect("Pre order", (cb) => tree.preOrderForEach(cb));
collect("Post order", (cb) => tree.postOrderForEach(cb));
collect("In order", (cb) => tree.inOrderForEach(cb));

console.log("\n3. Unbalancing by inserting values > 100:");
[101, 150, 200, 250, 300, 350].forEach((v) => tree.insert(v));
prettyPrint(tree.root);
console.log(`Balanced? ${tree.isBalanced()}`);

console.log("\n4. Rebalancing:");
tree.rebalance();
prettyPrint(tree.root);
console.log(`Balanced? ${tree.isBalanced()}`);

console.log("\n5. Traversals after rebalance:");
collect("Level order", (cb) => tree.levelOrderForEach(cb));
collect("Pre order", (cb) => tree.preOrderForEach(cb));
collect("Post order", (cb) => tree.postOrderForEach(cb));
collect("In order", (cb) => tree.inOrderForEach(cb));

const rootVal = tree.root.data;
console.log(`\nSpot check: includes(root.data=${rootVal})? ${tree.includes(rootVal)} (always true)`);
console.log(`includes(999)? ${tree.includes(999)} (always false)`);
console.log(`height(root.data): ${tree.height(tree.root.data)}`);
console.log(`depth(root.data): ${tree.depth(tree.root.data)}`);

try {
  tree.levelOrderForEach();
} catch (e) {
  console.log(`Callback-required check: ${e.message}`);
}
