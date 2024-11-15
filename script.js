// Function to simulate rocket motion based on user input
function simulateRocketMotion() {
    // Get user inputs
    const dm_dt = parseFloat(document.getElementById("dm_dt").value);
    const m0 = parseFloat(document.getElementById("m0").value);
    const x0 = parseFloat(document.getElementById("x0").value);
    const v_prime = parseFloat(document.getElementById("v_prime").value);

    // Define time range for simulation (0 to 50 seconds)
    const timeRange = Array.from({ length: 500 }, (_, i) => i * 0.1);

    // Calculate mass, velocity, and position over time
    const mass = timeRange.map(t => m0 + dm_dt * t);
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
                borderColor: '#AD49E1', // Purple color for line
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
