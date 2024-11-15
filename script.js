// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 50, // Adjust offset for header
            behavior: 'smooth'
        });
    });
});

// Theme Toggle Functionality
const themeToggleBtn = document.createElement('button');
themeToggleBtn.textContent = 'Toggle Theme';
themeToggleBtn.style.position = 'fixed';
themeToggleBtn.style.bottom = '20px';
themeToggleBtn.style.right = '20px';
themeToggleBtn.style.padding = '10px 20px';
themeToggleBtn.style.backgroundColor = '#FFCCEA'; // Light pink
themeToggleBtn.style.color = '#333';
themeToggleBtn.style.border = 'none';
themeToggleBtn.style.cursor = 'pointer';
themeToggleBtn.style.borderRadius = '5px';
themeToggleBtn.style.fontFamily = 'Lato, sans-serif';
document.body.appendChild(themeToggleBtn);

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Button Hover Effect - Scale Up Animation
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
        button.style.transition = 'transform 0.2s ease';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Applying Dark Theme Styles
const style = document.createElement('style');
style.innerHTML = `
    body.dark-theme {
        background-color: #333;
        color: #FFF6E3;
    }
    body.dark-theme header {
        background-color: #444;
        color: #FFF6E3;
    }
    body.dark-theme nav ul {
        background-color: #555;
    }
    body.dark-theme nav ul li a {
        color: #FFF6E3;
    }
    body.dark-theme section {
        background-color: #444;
        color: #FFF6E3;
    }
    body.dark-theme footer {
        background-color: #444;
        color: #FFF6E3;
    }
    body.dark-theme button {
        background-color: #FFF6E3;
        color: #333;
    }
    body.dark-theme .theme-toggle-btn {
        background-color: #FFF6E3;
        color: #333;
    }
`;
document.head.appendChild(style);
