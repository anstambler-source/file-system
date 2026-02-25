import fs from 'node:fs';

// fs.stat('./package.json', (err, stats) => { // polu4it statistiku po package.json
//     if(err) console.log(err)
//     else console.log(stats)
// })

fs.writeFile('./test.txt', 'Aloha!', err => {
    if (err) console.log(err);
    else console.log('File created!');
})

fs.appendFile('./test.txt', '\nHello Java 62!', err => {
    if (err) console.log(err);
    else console.log('File updated successfully!');
})

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    else console.log(data.toString());
})