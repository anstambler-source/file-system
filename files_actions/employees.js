import fs from 'node:fs';
import {differenceInYears} from "date-fns";

// Total salary
// Total employees
// AVG salary
// AVG age

fs.readFile('./employees.csv', 'utf8', (err, data) => {
    if (err) console.log(err);
    else {
        const arr = data.split('\n');
        arr.shift()
        let salary = 0
        let age = 0;
        for (const line of arr) {
            const cells = line.split(',');
            salary += +cells[2]
            age += differenceInYears(new Date(), new Date(cells[3]))
        }
        console.log(salary);
        console.log(`Total employees: ${arr.length}`)
        console.log(`Avg salary: ${salary / arr.length}`);
        console.log(`Avg age: ${age / arr.length}`);
    }
})