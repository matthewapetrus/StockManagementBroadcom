// app.js
// Author: Matthew Petrus
// This script handles the stock management functionality for a web application.
// It fetches stock data, populates a table and a tag filter, and provides actions for stock management.

document.addEventListener('DOMContentLoaded', () => {
    const stockTable = document.getElementById('stockTable').querySelector('tbody');
    const tagFilter = document.getElementById('tagFilter');
    const detailPanel = document.getElementById('detailPanel');

    // Fetch stocks and populate table
    fetch('http://localhost:3001/api/stocks')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);          // Populate the stock table with fetched data
            populateTagFilter(data);      // Populate the tag filter with unique tags
        })
        .catch(error => console.error('Fetch error:', error));

    // Populate the stock table with rows based on stock data
    function populateTable(stocks) {
        stockTable.innerHTML = ''; // Clear existing rows
        stocks.forEach(stock => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" class="stock-link" data-symbol="${stock.symbol}">${stock.symbol}</a></td>
                <td>${stock.name}</td>
                <td>${stock.last_price}</td>
                <td>${stock.market_cap}</td>
                <td>${stock.tag}</td>
                <td><span class="action-icon" data-symbol="${stock.symbol}">X</span></td>
            `;
            stockTable.appendChild(row);
        });
    }

    // Populate the tag filter dropdown with unique tags from stocks
    function populateTagFilter(stocks) {
        const tags = new Set(stocks.map(stock => stock.tag));
        tagFilter.innerHTML = ''; // Clear existing options
        const allOption = document.createElement('option');
        allOption.value = 'All';
        allOption.textContent = 'All';
        tagFilter.appendChild(allOption);
        
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });

        // Filter stocks based on selected tag
        tagFilter.addEventListener('change', (event) => {
            const selectedTag = event.target.value;
            const filteredStocks = selectedTag === 'All' ? stocks : stocks.filter(stock => stock.tag === selectedTag);
            populateTable(filteredStocks);
            detailPanel.style.display = 'none'; // Hide detail panel when filtering
        });
    }

    // Handle user interactions with the stock table
    stockTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('action-icon')) {
            const symbol = event.target.getAttribute('data-symbol');
            fetch(`http://localhost:3001/api/stocks/${symbol}`, { method: 'DELETE' })
                .then(() => {
                    // Fetch updated stocks after deletion
                    return fetch('http://localhost:3001/api/stocks');
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(updatedStocks => {
                    populateTable(updatedStocks);      // Update the stock table
                    populateTagFilter(updatedStocks);  // Update the tag filter
                    detailPanel.style.display = 'none'; // Hide the detail panel
                })
                .catch(error => console.error('Fetch error:', error));
        } else if (event.target.classList.contains('stock-link')) {
            event.preventDefault();
            const symbol = event.target.getAttribute('data-symbol');
            showStockDetails(symbol); // Show details for the selected stock
        }
    });

    // Show detailed information about a specific stock
    function showStockDetails(symbol) {
        fetch(`http://localhost:3001/api/stocks/${symbol}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(stock => {
                detailPanel.style.display = 'block'; // Show the detail panel
                detailPanel.innerHTML = `
                    <h2>Stock Detail</h2>
                    <p><strong>Symbol:</strong> ${stock.symbol}</p>
                    <p><strong>Name:</strong> ${stock.name}</p>
                    <p><strong>Market Cap:</strong> ${stock.market_cap}</p>
                    <p><strong>Tag:</strong> ${stock.tag}</p>
                `;
            })
            .catch(error => console.error('Error fetching stock details:', error));
    }
});
