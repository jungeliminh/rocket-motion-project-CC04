function runSimulation() {
    const dm_dt = parseFloat(document.getElementById('dm_dt').value);
    const m0 = parseFloat(document.getElementById('m0').value);
    const x0 = parseFloat(document.getElementById('x0').value);
    const v_gas = parseFloat(document.getElementById('v_gas').value);
    const t_end = parseFloat(document.getElementById('t_end').value);
    const g = parseFloat(document.getElementById('g').value);

    const time = Array.from({ length: 100 }, (_, i) => i * t_end / 100);
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

    drawChart('massChart', 'Mass vs Time', 'Mass [kg]', time, mass);
    drawChart('velocityChart', 'Velocity vs Time', 'Velocity [m/s]', time, velocity);
    drawChart('positionChart', 'Position vs Time', 'Position [m]', time, position);
}

function drawChart(canvasId, title, yLabel, xData, yData) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xData,
            datasets: [{
                label: title,
                data: yData,
                borderColor: 'rgba(237, 62, 247, 0.7)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: yLabel
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time [s]'
                    }
                }
            }
        }
    });
}
