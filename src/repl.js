import readline from 'readline';


export default (callback) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt('calc> ');
  console.log("To close calculator type 'exit'\n");
  rl.prompt();

  rl.on('line', (line) => {
    if (line.trim() === 'exit') {
      rl.close();
      return;
    }

    // console.log(line);
    const res = callback(line);
    console.log(res);
    rl.prompt();
  });
};
