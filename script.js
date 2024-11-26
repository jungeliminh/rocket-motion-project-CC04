// JavaScript for Rocket Motion Simulation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rocketForm');
    const simulateButton = document.getElementById('simulateButton');

    // Add event listener for simulation button
    simulateButton.addEventListener('click', runSimulation);

    // Function to handle simulation
    function runSimulation() {
        // Collect user inputs
        const dm_dt = parseFloat(document.getElementById('dm_dt').value);
        const m0 = parseFloat(document.getElementById('m0').value);
        const x0 = parseFloat(document.getElementById('x0').value);
        const v_gas = parseFloat(document.getElementById('v_gas').value);
        const t_end = parseFloat(document.getElementById('t_end').value);
        const g = parseFloat(document.getElementById('g').value);

        // Check if inputs are valid
        if (isNaN(dm_dt) || isNaN(m0) || isNaN(x0) || isNaN(v_gas) || isNaN(t_end) || isNaN(g)) {
            alert('Please fill in all fields with valid numbers!');
            return;
        }

        // Time vector
        const time = Array.from({ length: 100 }, (_, i) => i * t_end / 100);

        // Calculate mass, velocity, and position
        const fuelDepletionTime = m0 / dm_dt;
        const mass = time.map(t => (t <= fuelDepletionTime ? m0 - dm_dt * t : 0));
        const velocity = time.map(t => {
            if (t <= fuelDepletionTime) {
                const m = m0 - dm_dt * t;
                return v_gas * Math.log(m0 / m) - g * t;
            } else {
                return 0;
            }
        });
        const position = velocity.reduce((acc, v, i) => {
            const dt = time[1] - time[0];
            acc.push((acc[acc.length - 1] || x0) + v * dt);
            return acc;
        }, []);

        // Draw charts
        drawChart('massChart', 'Mass vs Time', 'Mass [kg]', time, mass);
        drawChart('velocityChart', 'Velocity vs Time', 'Velocity [m/s]', time, velocity);
        drawChart('positionChart', 'Position vs Time', 'Position [m]', time, position);

        // Smooth scroll to the charts
        document.getElementById('charts').scrollIntoView({ behavior: 'smooth' });
    }

    // Function to render charts
    function drawChart(canvasId, title, yLabel, xData, yData) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        // Clear previous chart if it exists
        if (ctx.chart) ctx.chart.destroy();

        // Create new chart
        ctx.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xData,
                datasets: [{
                    label: title,
                    data: yData,
                    borderColor: 'rgba(237, 62, 247, 0.8)', // Light purple
                    borderWidth: 2,
                    fill: false,
                    pointBackgroundColor: 'rgba(237, 62, 247, 1)',
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 18, family: "'Abril Fatface', cursive" },
                        color: '#ED3EF7'
                    },
                    legend: { display: false }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Time [s]', color: '#0B2F9F' }
                    },
                    y: {
                        title: { display: true, text: yLabel, color: '#0B2F9F' }
                    }
                }
            }
        });
    }
});
