const getDate = () => {
    const date = new Date();
    let month = date.getMonth() + 1;
    if(month < 10) {
        month = "0" + month;
    }
    let d = `${date.getDate()}.${month}.${date.getFullYear()} ` + 
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
    return d;
}

module.exports = getDate;