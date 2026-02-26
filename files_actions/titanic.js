import fs from 'node:fs';

fs.readFile('../train.csv', 'utf8', (err, data) => {
    if (err) console.log(err);
    else {
        const [headers] = data.split('\n', 1)
                .map(line => line.trim().split(','))

        const list = data.split('\n').map(it => it.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/))
        list.shift()
        list.pop()

        function Passenger (headers, data) {
            headers.forEach((header, i) => {
                this[header] = data[i].trim().replaceAll('"', '');
            })
        }

        const passengers = list.map((item) => {
            return new Passenger(headers, item);
        })

        // console.log(passengers);

        const totalFare = passengers.reduce((acc, cur) => {
            acc += +cur.Fare ? +cur.Fare : 0
            return acc
        }, 0)
        console.log(`Total fare = ${totalFare}`);

        const faresClasses = passengers.reduce((acc, cur) => {
                if(cur.Pclass === '1') acc.fare_1 += +cur.Fare
                if(cur.Pclass === '2') acc.fare_2 += +cur.Fare
                if(cur.Pclass === '3') acc.fare_3 += +cur.Fare
            return acc
            }
            , {
                    fare_1: 0,
                    fare_2: 0,
                    fare_3: 0
                })
        console.log(`Avg fare of 1 class = ${faresClasses.fare_1 / passengers.filter(it => it.Pclass === '1').length}`);
        console.log(`Avg fare of 2 class = ${faresClasses.fare_2 / passengers.filter(it => it.Pclass === '2').length}`);
        console.log(`Avg fare of 3 class = ${faresClasses.fare_3 / passengers.filter(it => it.Pclass === '3').length}`);

        console.log(`Total quantity of survived = ${passengers.filter(it => +it.Survived).length}`);
        console.log(`Total quantity of non survived = ${passengers.filter(it => !+it.Survived).length}`);

        const survAndNonServMens = passengers.filter(it => it.Sex === 'male' && (it.Age >= 18 || !it.Age)).reduce((acc, cur) => {
            if (+cur.Survived) acc.surv++
            if (!+cur.Survived) acc.nonSurv++
            return acc
        }, {
            surv: 0,
            nonSurv: 0
        })

        console.log('Survived Mens = ', survAndNonServMens.surv);
        console.log('Non survived Mens = ', survAndNonServMens.nonSurv);

        const survAndNonServWomen = passengers.filter(it => it.Sex === 'female' && (it.Age >= 18 || !it.Age)).reduce((acc, cur) => {
            if (+cur.Survived) acc.surv++
            if (!+cur.Survived) acc.nonSurv++
            return acc
        }, {
            surv: 0,
            nonSurv: 0
        })

        console.log('Survived Women = ', survAndNonServWomen.surv);
        console.log('Non survived Women = ', survAndNonServWomen.nonSurv);

        const survAndNonServChildren = passengers.filter(it => it.Age < 18 && it.Age).reduce((acc, cur) => {
            if (+cur.Survived) acc.surv++
            if (!+cur.Survived) acc.nonSurv++
            return acc
        }, {
            surv: 0,
            nonSurv: 0
        })

        console.log('Survived Children = ', survAndNonServChildren.surv);
        console.log('Non survived Children = ', survAndNonServChildren.nonSurv);
    }
})