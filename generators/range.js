// export function Range(from, to) {
//     this.from = from;
//     this.to = to;
//     this[Symbol.iterator] = function () {
//         return {
//             current: from,
//             last: to,
//             next: function () {
//                 if(this.current <= this.last) {
//                     return {
//                         done: false,
//                         value: this.current++
//                     }
//                 } else {
//                     return {
//                         done: true,
//                     }
//                 }
//             }
//         }
//     }
// }


export function Range(from, to) {
    this[Symbol.iterator] = function* () {
        for (let i = from; i <= to; i++) {
            yield i
        }
    }
}