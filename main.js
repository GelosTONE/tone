document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const menu = document.getElementById('menu');
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const exitAboutButton = document.getElementById('exit-about');
    const casesLink = document.querySelector('a[href="#cases-per-year"]');
    const casesSection = document.getElementById('cases-per-year');
    const exitCasesButton = document.getElementById('exit-cases');
    const stagesLink = document.querySelector('a[href="#stages-of-hiv"]');
    const stagesSection = document.getElementById('stages-of-hiv');
    const exitStagesButton = document.getElementById('exit-stages');

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('hidden');
    });

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();
        aboutSection.classList.remove('hidden');
        menu.classList.add('hidden');
    });

    exitAboutButton.addEventListener('click', function() {
        aboutSection.classList.add('hidden');
        window.location.href = '#home';
    });

    casesLink.addEventListener('click', function(event) {
        event.preventDefault();
        casesSection.classList.remove('hidden');
        menu.classList.add('hidden');
        showBarChart();
    });

    exitCasesButton.addEventListener('click', function() {
        casesSection.classList.add('hidden');
        window.location.href = '#home';
    });

    stagesLink.addEventListener('click', function(event) {
        event.preventDefault();
        stagesSection.classList.remove('hidden');
        menu.classList.add('hidden');
    });

    exitStagesButton.addEventListener('click', function() {
        stagesSection.classList.add('hidden');
        window.location.href = '#home';
    });

    // Close the menu if clicked outside
    document.addEventListener("click", function (event) {
        if (!menuButton.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.add("hidden");
        }
    });

    function showBarChart() {
        // Data from the table
        const years = [2019, 2020, 2021, 2022, 2023, 2024];
        const cases = [12711, 8027, 12319, 14921, 17227, 17551];

        // Get the canvas element
        const ctx = document.getElementById('hivChart').getContext('2d');

        // Create the bar chart
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Total Number of Cases',
                    data: cases,
                    backgroundColor: 'skyblue',
                    borderColor: 'black',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById("casesChart").getContext("2d");
    var casesChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
            datasets: [{
                label: "Cases",
                data: [12711, 8027, 12319, 14921, 17227, 17551],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                pointBackgroundColor: "red",
                pointBorderColor: "red",
                pointRadius: 5,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 2000, // Duration of the animation in milliseconds
                easing: 'easeInOutQuad' // Easing function for the animation
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Year"
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return ["2019", "2020", "2021", "2022", "2023", "2024"][index];
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Number of Cases"
                    },
                    beginAtZero: false
                }
            }
        }
    });
});

function calculateHIV() {
    let C0 = parseFloat(document.getElementById("C0").value);
    let R0 = parseFloat(document.getElementById("R0").value);
    let alpha = parseFloat(document.getElementById("alpha").value);
    let beta = parseFloat(document.getElementById("beta").value);
    let t = parseFloat(document.getElementById("t").value);

    if (isNaN(C0) || isNaN(R0) || isNaN(alpha) || isNaN(beta) || isNaN(t)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers.";
        return;
    }

    let e = Math.E; // Euler's constant
    let baseValue = (R0 / alpha) * Math.log(1 + (beta * Math.pow(e, -alpha * t)));

    // Determine the correct multiplier based on β value
    let multiplier;
    if (beta <= 37.3) {
        multiplier = 1;   // No multiplier for 20% or lower
    } else if (beta <= 149.2) {
        multiplier = 10;  // 21% to 50%
    } else {
        multiplier = 100; // 51% and above
    }

    // Apply the multiplier to the base formula
    let Ct = C0 + (multiplier * baseValue);

    document.getElementById("result").innerHTML = `Predicted Cases C(t): ${Ct.toFixed(0)}`;
}
