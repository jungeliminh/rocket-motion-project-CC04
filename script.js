document.addEventListener("DOMContentLoaded", () => {
    const simulateBtn = document.getElementById("simulateBtn");
    const finalVelocity = document.getElementById("finalVelocity");
    const finalPosition = document.getElementById("finalPosition");
    const fuelDepletionTime = document.getElementById("fuelDepletionTime");
    const resultsGraph = document.getElementById("resultsGraph");

    const populateTable = (time, mass, velocity, position) => {
        const tableBody = document.querySelector("#resultsTable tbody");
        tableBody.innerHTML = "";

        for (let i = 0; i < time.length; i++) {
            const row = `
                <tr>
                    <td>${time[i].toFixed(1)}</td>
                    <td>${mass[i].toFixed(2)}</td>
                    <td>${velocity[i].toFixed(2)}</td>
                    <td>${position[i].toFixed(2)}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    };

    const generateGraph = (time, mass, velocity, position) => {
        if (Chart.getChart("resultsGraph")) Chart.getChart("resultsGraph").destroy();

        new Chart(resultsGraph, {
            type: "line",
            data: {
                labels: time.map(t => t.toFixed(1)),
                datasets: [
                    { label: "Mass [kg]", data: mass, borderColor: "#800020", fill: false },
                    { label: "Velocity [m/s]", data: velocity, borderColor: "#87CEEB", fill: false },
                    { label: "Position [m]", data: position, borderColor: "#D2B48C", fill: false },
                ],
            },
        });
    };

    simulateBtn.addEventListener("click", () => {
        const dm_dt = parseFloat(document.getElementById("dm_dt").value);
        const m0 = parseFloat(document.getElementById("m0").value);
        const x0 =
