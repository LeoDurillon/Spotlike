export default function calculate(expression: string): {
  name: string
  type: string
}[] {
  try {
    // Replace implicit multiplication (e.g., 4(5+9) => 4*(5+9))
    expression = expression.replace(/(\d)\(/g, '$1*(')

    // Create a function to evaluate the expression
    const result = expression + ' = ' + new Function('return ' + expression)()

    return [
      {
        name: result,
        type: 'Calc'
      }
    ]
  } catch (e) {
    return [
      {
        name: 'Error: Invalid expression',
        type: 'Calc'
      }
    ]
  }
}
