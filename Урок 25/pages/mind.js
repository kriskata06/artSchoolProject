function highlightText() {
    // Clear previous highlights
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(el => {
        el.outerHTML = el.textContent; // Replace span with original text
    });

    const query = document.getElementById('search-bar').value.trim();
    if (query === '') return;

    // Escape special characters for the regex
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const elements = document.querySelectorAll('body *:not(script):not(style):not(input):not(textarea)');
    elements.forEach(el => {
        el.childNodes.forEach(child => {
            if (child.nodeType === 3) { // Text node
                const text = child.nodeValue;
                const regex = new RegExp(`(${escapedQuery})`, 'gi'); // Match whole or partial
                if (regex.test(text)) {
                    const newHTML = text.replace(regex, '<span class="highlight">$1</span>');
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newHTML;
                    while (tempDiv.firstChild) {
                        el.insertBefore(tempDiv.firstChild, child);
                    }
                    el.removeChild(child);
                }
            }
        });
    });
}


(async function() {
  // Function to create the pop-up
  function createPopup() {
    // Create the overlay background
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    
    // Create the pop-up box
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1001';

    // Add content to the pop-up
    let message = document.createElement('p');
    message.textContent = 'Можете да подкрепите разработката на сайта!   ';
    
    let link = document.createElement('a');
    link.href = 'https://revolut.me/kristiqjbf';
    link.target = '_blank';
    link.textContent = 'Click here';
    
    // Append message and link to the pop-up
    message.appendChild(link);
    popup.appendChild(message);

    // Create a close button
    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.marginTop = '10px';
    closeBtn.onclick = function() {
      document.body.removeChild(overlay);  // Remove the pop-up when clicked
    };
    popup.appendChild(closeBtn);

    // Append the pop-up and overlay to the body
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }

  // Show the pop-up every 30 seconds
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 40000));  // Wait for 30\5 seconds
    createPopup();  // Create and display the pop-up
  }
})();
