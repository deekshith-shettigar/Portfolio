function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");
    var navOpenIcon = document.getElementById("navOpenIcon");
    var navCloseIcon = document.getElementById("navCloseIcon");

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
        navOpenIcon.style.display = "none";
        navCloseIcon.style.display = "inline";
    } else {
        menuBtn.className = "nav-menu";
        navOpenIcon.style.display = "inline";
        navCloseIcon.style.display = "none";
    }
}

// Header Shadow Effect
window.onscroll = function () {
    headerShadow();
};

function headerShadow() {
    const navHeader = document.getElementById("header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = "0 1px 6px rgba(0,0,0,0.1)";
        navHeader.style.height = "80px";
        navHeader.style.lineHeight = "80px";
    } else {
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";
    }
}

// Typing Effect
var typingEffect = new Typed(".typedText", {
    strings: ["Designer", "Developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
});