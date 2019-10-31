//扁平化数组

let flatten = arr => {
    return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur)? flatten(cur) : cur);
    }, [])
}

console.log(flatten([1, [2, [3, [4]], 5]]));

