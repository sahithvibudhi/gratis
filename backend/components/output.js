module.exports = (res, data) => {
    var output = {
        data : undefined
    }
    output.data = data;
    res.write(JSON.stringify(output));
}