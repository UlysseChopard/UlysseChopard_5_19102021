const updateClipboard = (text) => navigator.clipboard.writeText(text).catch(console.error);

const copyToClipboard = (text) => {
    return navigator.permissions.query({ name: "clipboard-write" }).then(result => {
        if (result.state === "granted" || result.state === "prompt") {
            updateClipboard(text);
        }
    });
};

export default copyToClipboard;