document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const simulateBtn = document.getElementById("simulateBtn");
    const finalVelocity = document.getElementById("finalVelocity");
    const finalPosition = document.getElementById("finalPosition");
    const fuelDepletionTime = document.getElementById("fuelDepletionTime");
    const resultsGraph = document.getElementById("resultsGraph");

    // Function to calculate and display results
    const simulateRocketMotion = () => {
        // Get input values
        const dm_dt = parseFloat(document.getElementById("dm_dt").value);
        const m0 = parseFloat(document.getElementById("m0").value);
        const x0 = parseFloat(document.getElementById("x0").value);
        const v_gas = parseFloat(document.getElementById("v_gas").value);
        const t_end = parseFloat(document.getElementById("t_end").value);
        const g = parseFloat(document.getElementById("g").value);
        const k = parseFloat(document.getElementById("k").value);

        // Validate input
        if (isNaN(dm_dt) || isNaN(m0) || isNaN(x0) || isNaN(v_gas) || isNaN(t_end) || isNaN(g) || isNaN(k)) {
            alert("Please fill in all fields with valid values.");
            return;
        }

        // Constants and arrays
        const time = [];
        const velocity = [];
        const position = [];
        const mass = [];

        // Calculate fuel depletion time
        const fuelDepletion = m0 / dm_dt;

        // Numerical computation
        let v_prev = 0; // Previous velocity for free-fall calculation
        for (let t = 0; t <= t_end; t += 0.1) {
            time.push(t);

            // Calculate mass
            const m_t = Math.max(0, m0 - dm_dt * t);
            mass.push(m_t);

            // Calculate velocity
            let v_t;
            if (t <= fuelDepletion) {
                v_t = v_gas * Math.log(m0 / m_t) - g * t;
                v_prev = v_t;
            } else {
                v_t = v_prev - g * (t - fuelDepletion);
            }
            velocity.push(v_t);

            // Calculate position
            const x_t = (t === 0) ? x0 : position[position.length - 1] + v_t * 0.1;
            position.push(x_t);
        }

        // Update Results
        finalVelocity.textContent = velocity[velocity.length - 1].toFixed(2);
        finalPosition.textContent = position[position.length - 1].toFixed(2);
        fuelDepletionTime.textContent = fuelDepletion.toFixed(2);

        // Generate Graph
        generateGraph(time, mass, velocity, position);
    };

    // Function to generate graph using Chart.js
    const generateGraph = (time, mass, velocity, position) => {
        // Remove existing canvas if already plotted
        if (Chart.getChart("resultsGraph")) Chart.getChart("resultsGraph").destroy();

        // Create Chart.js instance
        new Chart(resultsGraph, {
            type: "line",
            data: {
                labels: time.map(t => t.toFixed(1)), // Time labels
                datasets: [
                    {
                        label: "Mass [kg]",
                        data: mass,
                        borderColor: "#800020",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3,
                    },
                    {
                        label: "Velocity [m/s]",
                        data: velocity,
                        borderColor: "#87CEEB",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3,
                    },
                    {
                        label: "Position [m]",
                        data: position,
                        borderColor: "#D2B48C",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            font: {
                                family: "Lora",
                                size: 14,
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Time [s]",
                            font: {
                                family: "Playfair Display",
                                size: 16,
                            },
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Values",
                            font: {
                                family: "Playfair Display",
                                size: 16,
                            },
                        },
                    },
                },
            },
        });
    };

    // Attach event listener to button
    simulateBtn.addEventListener("click", simulateRocketMotion);
});
