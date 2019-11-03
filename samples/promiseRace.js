/*
* Promise.race(iterable) 返回一个 promise
* 一旦 iterable 中的一个 promise 状态是 fulfilled / rejected 
* 那么 Promise.race 返回的 promise 状态是 fulfilled / rejected
*/

let promiseRace = function (promises) {
    if (!Array.isArray(promises)) {
        return reject('Arguments should be iterable');
    }

    let count = promises.length;
    if (!count) {
        return resolve([]);
    } else {
        return new Promise((resolve, reject) => {
            let count = promises.length;
            for (let i = 0; i < count; i++) {
                Promise.resolve(promises[i]).then(res => {
                    return resolve(res);
                }).catch(err => {
                    return reject(err);
                })
            }
        })
    }
}