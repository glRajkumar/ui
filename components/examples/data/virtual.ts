function generateLargeList(count = 1000): itemsT {
  return Array.from({ length: count }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option-${i + 1}`,
  }))
}

export { generateLargeList }
