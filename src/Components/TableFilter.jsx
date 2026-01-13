function filterTable() {
  // Declare variables
  let input, filter, table, tr, td, i, j, cell, txtValue;
  let loadingText = document.getElementById("searchLoading");
  input = document.getElementById("filterInput");
  filter = input.value.toUpperCase(); // Case-insensitive search
  table = document.getElementById("spellTable");
  tr = table.getElementsByTagName("tr");

  loadingText.setAttribute('disabled', 'false');

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 1; i < tr.length; i++) {
    // // Start from the second row (index 1) to skip the header row
    // if (tr[i].classList.contains('header')) {
    //     continue;
    // }
    
    // Hide the row initially
    tr[i].style.display = "none"; 
    
    // Get all cells in the current row
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      cell = td[j];
      if (cell) {
        txtValue = cell.textContent || cell.innerText; // Get text content
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = ""; // Show the row if a match is found
          break; // Stop searching other cells in this row
        }
      }
    }
  }
  loadingText.setAttribute('disabled', 'true');
}

export default filterTable;