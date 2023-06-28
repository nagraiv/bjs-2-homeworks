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
    let timerID = null;
    function wrap(...args) {
        if (!timerID) { // самый первый раз функция должна вызваться мгновенно + второй раз асинхронно
            wrap.count += 1;
            func(...args);
        }
        wrap.allCount += 1;
        clearTimeout(timerID);
        timerID = setTimeout(processAfterDelay, delay, ...args);
    }
    wrap.allCount = 0;
    wrap.count = 0;
    function processAfterDelay(...args) {
        wrap.count += 1;
        func(...args);
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

