document.getElementById('exportButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'getCookies' }, async (response) => {
    const cookies = response.cookies;
    const filename = 'instagram_cookies.json';
    const blob = new Blob([JSON.stringify(cookies, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    // link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);

    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(cookies, null, 2))
      .then(() => {
        // Show success alert
        alert('Cookies已複製到剪貼簿!');
        // alert('Cookies copied to clipboard and downloaded successfully!');
        const successElement = document.getElementById('success');
        successElement.innerText = '複製成功!';
        successElement.style.display = 'block';
      })
      .catch((error) => {
        // Show error alert
        alert('Cookies複製到剪貼簿失敗,請確認您已在ig登入' + error);
        const errorElement = document.getElementById('error');
        errorElement.innerText = error;
        errorElement.style.display = 'block';
      });
  });
});
