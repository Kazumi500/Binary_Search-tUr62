class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function buildFromSorted(arr, lo, hi) {
  if (lo > hi) return null;
  const mid = (lo + hi) >> 1;
  const node = new Node(arr[mid]);
  node.left = buildFromSorted(arr, lo, mid - 1);
  node.right = buildFromSorted(arr, mid + 1, hi);
  return node;
}

function buildTree(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const sorted = [...new Set(arr)].sort((a, b) => a - b);
  return buildFromSorted(sorted, 0, sorted.length - 1);
}

function findNode(root, value) {
  if (!root) return null;
  if (value < root.data) return findNode(root.left, value);
  if (value > root.data) return findNode(root.right, value);
  return root;
}

function insertNode(root, value) {
  if (!root) return new Node(value);
  if (value < root.data) {
    root.left = insertNode(root.left, value);
  } else if (value > root.data) {
    root.right = insertNode(root.right, value);
  }
  return root;
}

function findMin(node) {
  while (node.left) node = node.left;
  return node;
}

function removeNode(root, value) {
  if (!root) return null;
  if (value < root.data) {
    root.left = removeNode(root.left, value);
    return root;
  }
  if (value > root.data) {
    root.right = removeNode(root.right, value);
    return root;
  }
  if (!root.left) return root.right;
  if (!root.right) return root.left;
  const succ = findMin(root.right);
  root.data = succ.data;
  root.right = removeNode(root.right, succ.data);
  return root;
}

function nodeHeight(node) {
  if (!node) return -1;
  return 1 + Math.max(nodeHeight(node.left), nodeHeight(node.right));
}

function balancedInfo(node) {
  if (!node) return { ok: true, height: -1 };
  const l = balancedInfo(node.left);
  const r = balancedInfo(node.right);
  return {
    ok: l.ok && r.ok && Math.abs(l.height - r.height) <= 1,
    height: 1 + Math.max(l.height, r.height),
  };
}

const requireCb = (name) => (cb) => {
  if (typeof cb !== "function") {
    throw new Error(`${name} requires a callback function`);
  }
};

function walkInOrder(node, cb) {
  if (!node) return;
  walkInOrder(node.left, cb);
  cb(node.data);
  walkInOrder(node.right, cb);
}

const Tree = (arr) => ({
  root: buildTree(arr),

  includes(value) {
    return findNode(this.root, value) !== null;
  },

  insert(value) {
    this.root = insertNode(this.root, value);
  },

  deleteItem(value) {
    this.root = removeNode(this.root, value);
  },

  levelOrderForEach(cb) {
    requireCb("levelOrderForEach")(cb);
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (!node) continue;
      cb(node.data);
      queue.push(node.left, node.right);
    }
  },

  inOrderForEach(cb) {
    requireCb("inOrderForEach")(cb);
    walkInOrder(this.root, cb);
  },

  preOrderForEach(cb) {
    requireCb("preOrderForEach")(cb);
    const walk = (n) => {
      if (!n) return;
      cb(n.data);
      walk(n.left);
      walk(n.right);
    };
    walk(this.root);
  },

  postOrderForEach(cb) {
    requireCb("postOrderForEach")(cb);
    const walk = (n) => {
      if (!n) return;
      walk(n.left);
      walk(n.right);
      cb(n.data);
    };
    walk(this.root);
  },

  height(value) {
    const node = findNode(this.root, value);
    return node ? nodeHeight(node) : undefined;
  },

  depth(value) {
    let node = this.root;
    let d = 0;
    while (node) {
      if (value === node.data) return d;
      node = value < node.data ? node.left : node.right;
      d++;
    }
    return undefined;
  },

  isBalanced() {
    return balancedInfo(this.root).ok;
  },

  rebalance() {
    const values = [];
    this.inOrderForEach((v) => values.push(v));
    this.root = buildTree(values);
  },
});

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

export { Node, Tree, prettyPrint, buildTree };
