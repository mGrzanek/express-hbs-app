const convertText = (text) => {
    let newText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    return newText;
}

module.exports = convertText;