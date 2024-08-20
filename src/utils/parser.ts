export function parseExpression(expression: string): string[] {
    const tokens: string[] = [];
    let numberBuffer = '';
  
    for (const char of expression) {
      if (/\d|\./.test(char)) {
        numberBuffer += char;
      } else if (/[+\-*/()%]/.test(char)) {
        if (numberBuffer) {
          tokens.push(numberBuffer);
          numberBuffer = '';
        }
        tokens.push(char);
      } else if (char === '√') {
        tokens.push(char);
      }
    }
  
    if (numberBuffer) {
      tokens.push(numberBuffer);
    }
  
    return tokens;
  }
  