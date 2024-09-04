// Check if cookies were already accepted
if (localStorage.getItem('cookiesAccepted') === 'true') {
    document.getElementById('cookies').style.display = 'none';
} else {
    document.getElementById('cookies').style.display = 'flex';
}

// Handle accept button click
document.getElementById('acceptCookies').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookies').style.display = 'none';
    // Add any additional cookie acceptance logic here
});

// Handle decline button click
document.getElementById('declineCookies').addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookies').style.display = 'none';
    // Add any additional cookie decline logic here
});
