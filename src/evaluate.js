const evaluate = (node) => {
  if (node.data.isOperand) {
    return node.data.valueOf();
  }

  const args = node.children.map(evaluate);
  return node.data.eval(...args);
};

export default evaluate;
