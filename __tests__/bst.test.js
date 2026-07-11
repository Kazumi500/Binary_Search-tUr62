import { Tree } from "../src/bst.js";

const inOrder = (tree) => {
  const out = [];
  tree.inOrderForEach((v) => out.push(v));
  return out;
};

describe("buildTree", () => {
  test("dedupes and sorts the input", () => {
    const tree = Tree([3, 1, 2, 2, 1, 3]);
    expect(inOrder(tree)).toEqual([1, 2, 3]);
  });

  test("produces a balanced tree from a sorted unique input", () => {
    const tree = Tree([10, 20, 30, 40, 50, 60, 70]);
    expect(tree.isBalanced()).toBe(true);
  });
});

describe("insert", () => {
  test("inserting a duplicate value is a no-op", () => {
    const tree = Tree([5, 3, 7]);
    tree.insert(3);
    tree.insert(5);
    tree.insert(7);
    expect(inOrder(tree)).toEqual([3, 5, 7]);
  });

  test("in-order traversal matches sorted unique input", () => {
    const tree = Tree([5, 3, 7, 1, 4, 6, 8]);
    expect(inOrder(tree)).toEqual([1, 3, 4, 5, 6, 7, 8]);
  });
});

describe("deleteItem", () => {
  test("deletes a leaf", () => {
    const tree = Tree([5, 3, 7, 1]); // 1 is a leaf
    tree.deleteItem(1);
    expect(tree.includes(1)).toBe(false);
    expect(inOrder(tree)).toEqual([3, 5, 7]);
  });

  test("deletes a node with one child", () => {
    const tree = Tree([5, 3, 7]);
    tree.insert(8); // 7 now has a single right child
    tree.deleteItem(7);
    expect(tree.includes(7)).toBe(false);
    expect(tree.includes(8)).toBe(true);
    expect(inOrder(tree)).toEqual([3, 5, 8]);
  });

  test("deletes a node with two children (in-order successor replaces)", () => {
    const tree = Tree([5, 3, 7, 1, 4, 6, 8]);
    tree.deleteItem(3); // successor is 4
    expect(tree.includes(3)).toBe(false);
    expect(tree.includes(4)).toBe(true);
    expect(inOrder(tree)).toEqual([1, 4, 5, 6, 7, 8]);
  });

  test("deleting a missing value is a no-op", () => {
    const tree = Tree([5, 3, 7]);
    tree.deleteItem(999);
    expect(inOrder(tree)).toEqual([3, 5, 7]);
  });
});

describe("rebalance", () => {
  test("rebalances after unbalance; in-order preserved", () => {
    const tree = Tree([10, 20, 30, 40, 50]);
    expect(tree.isBalanced()).toBe(true);

    [101, 150, 200, 250, 300, 350, 400, 450].forEach((v) => tree.insert(v));
    expect(tree.isBalanced()).toBe(false);

    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
    expect(inOrder(tree)).toEqual([
      10, 20, 30, 40, 50, 101, 150, 200, 250, 300, 350, 400, 450,
    ]);
  });
});
