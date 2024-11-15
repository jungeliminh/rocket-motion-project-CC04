// Function to simulate rocket motion based on user input
function simulateRocketMotion() {
    // Get user inputs
    const dm_dt = parseFloat(document.getElementById("dm_dt").value);
    const m0 = parseFloat(document.getElementById("m0").value);
    const x0 = parseFloat(document.getElementById("x0").value);
    const v_prime = parseFloat(document.getElementById("v_prime").value);

    // Define time range for simulation (0 to 50 seconds)
    const timeRange = Array.from({ length: 500 }, (_, i) => i * 0.1);

    // Calculate velocity and position over time
    const velocity = timeRange.map(t => -v_prime * dm_dt / (m0 + dm_dt * t));
    const position = velocity.reduce((acc, v, i) => {
        const dt = i === 0 ? 0 : timeRange[i] - timeRange[i - 1];
        acc.push(acc[acc.length - 1] + v * dt);
        return acc;
    }, [x0]);

    // Plot Velocity and Position graphs
    plotGraph('velocityChart', 'Rocket Velocity Over Time', timeRange, velocity, 'Velocity (m/s)');
    plotGraph('positionChart', 'Rocket Position Over Time', timeRange, position, 'Position (m)');
}

// Function to plot the graph using Chart.js
function plotGraph(canvasId, title, labels, data, yLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: yLabel,
                data: data,
                borderColor: '#AD49E1',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    color: '#333',
                    font: {
                        size: 18,
                        family: 'Abril Fatface'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)',
                        color: '#333'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: yLabel,
                        color: '#333'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

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
