//尾递归优化

function Fib(n, n1, n2) {
    'use strict';
    if(n == 0) {
        return n1
    }
    return Fib(n - 1, n2, n1 + n2);
}