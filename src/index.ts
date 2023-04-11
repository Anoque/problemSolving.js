import { startModule1 } from 'CSFrontend/Module1';
import { isDevelopment } from 'utils/development'

// Empty line after successfully build in watch
if (isDevelopment) {
  console.log()
}

function main() {
  startModule1()
}

main()
