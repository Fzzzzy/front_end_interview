/*
* 手动实现Promise.all()
* 接受一个promise数组 / 具有iterator的参数
* 返回 results[] / 抛出error
* 只要有一个reject就停止；全部resolve则返回结果
*/

function promiseAll(promises) {
    
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject('Arguments should be iterable');
        }

        let count = promises.length;
        if (!count) {
            return resolve([]);
        } else {
            let results = new Array(count);
            for (let i = 0; i < count; i++) {
                Promise.resolve(promises[i]).then(res => {
                    results[i] = res;
                    if (!(results.includes(undefined) || results.includes(null))) {
                        return resolve(results);
                    }
                }).catch(err => {
                    return reject(err);
                })
            }
        }
    });
}