module.exports = function countdown(tick) {
    let count = 10;

    let timer = setInterval(_ => {
        count -= 1;
        tick(count);
        if (count == 0) clearInterval(timer);
    }, 1000);
}