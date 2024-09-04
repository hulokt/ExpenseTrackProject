// Fetch and load the navigation bar
fetch('nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    });

// Fetch and load the footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const script = document.createElement('script');
script.src = "https://kit.fontawesome.com/40c843f2b0.js";
script.crossOrigin = "anonymous";
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', activate);
});

function activate() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');

    if (!document.querySelector('.nav-links li.my-account')) {
        const myAccount = document.createElement('li');
        myAccount.classList.add('my-account');
        myAccount.innerHTML = '<a href="joinNow.html">My account</a>';
        navLinks.appendChild(myAccount);
    }
}



