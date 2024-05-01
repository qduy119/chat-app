export const formatMessage = (message: string) => {
    let res = "";
    while (message.length > 0) {
        res += message.slice(0, 40) + "<br/>";
        if (message.length > 40) {
            message = message.slice(40);
        } else {
            message = "";
        }
    }
    return res;
};
