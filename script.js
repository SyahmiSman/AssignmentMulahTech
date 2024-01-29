document.addEventListener('DOMContentLoaded', function () {
    const csvFileInput = document.getElementById('csvFileInput');
    const csvDataContainer = document.getElementById('csvDataContainer');
    const alphaValue = document.getElementById('alphaValue');
    const betaValue = document.getElementById('betaValue');
    const charlieValue = document.getElementById('charlieValue');

    csvFileInput.addEventListener('change', handleFile);

    function handleFile(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const contents = e.target.result;
                processCSV(contents);
            };

            reader.readAsText(file);
        }
    }

    function processCSV(csv) {
        const lines = csv.split('\n');
        const header = lines[0].split(',');

        let html = '<table>';
        html += '<thead><tr>';
        header.forEach(column => {
            html += `<th>${column}</th>`;
        });
        html += '</tr></thead>';
        html += '<tbody>';

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            if (row.length === header.length) {
                html += '<tr>';
                row.forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            }
        }

        html += '</tbody></table>';
        csvDataContainer.innerHTML = html;

        // Calculate values for Table 2
        const data = {};
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            if (row.length === 2) {
                data[row[0]] = parseInt(row[1], 10); // Parse the value as an integer
            }
        }
        const alpha = data['A5'] + data['A20'];
        const beta = data['A15'] / data['A7'];
        const charlie = data['A13'] * data['A12'];

        // Display Table 2 values
        alphaValue.textContent = alpha;
        betaValue.textContent = beta;
        charlieValue.textContent = charlie;
    }
});
