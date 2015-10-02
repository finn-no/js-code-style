
function count (sum, current) {
    var isError = (current.error.code[0] === 'E');
    if (isError) {
        sum.errors++;
    } else {
        sum.warnings++;
    }
    return sum;
}

module.exports = function (result) {
    return result.reduce(count, {errors: 0, warnings: 0});
};
