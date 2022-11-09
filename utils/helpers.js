module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getData()}/${new Date(date).getFullYear()}`;
    }
}