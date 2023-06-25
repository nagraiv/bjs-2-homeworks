//Задача № 1
function cachingDecoratorNew(func) {
    const cache = [];
    return (...args) => {
        const hash = md5(args);
        const fromCache = cache.find((item) => item.hash === hash);
        if (fromCache) {
            return 'Из кэша: ' + fromCache.value;
        }
        const value = func(...args);
        cache.push({ hash, value });
        if (cache.length > 5) {
            cache.shift();
        }
        return 'Вычисляем: ' + value;
    }
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
    let intervalID = null;
    function wrap(...args) {
        wrap.allCount += 1;
        if (intervalID) {
            clearTimeout(intervalID);
            intervalID = setTimeout(processAfterDelay, delay, ...args);
            return;
        }
        wrap.count += 1;
        intervalID = setTimeout(processAfterDelay, delay, ...args);
        return func(...args);

    }
    wrap.allCount = 0;
    wrap.count = 0;
    function processAfterDelay(...args) {
        intervalID = null;
        // wrap.count += 1;
        return func(...args);
    }
    return wrap;
}

// functionToDecorate = () => console.log("функция вызвана!");
//
// let decorator1 = debounceDecoratorNew(functionToDecorate, 1000);
//
// console.log(decorator1);
// decorator1();
// decorator1();
// decorator1();
// decorator1();
// decorator1();

