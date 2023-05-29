chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    debugger

    if (request.action === 'getCookies') {
        chrome.cookies.getAll({}, (cookies) => {
            debugger

            sendResponse({ cookies });

        });
        return true;
    }
});
