    $.ajax({
     url: "students.csv",
     dataType:"text",
     success:function(data)
     {
      var employee_data = data.split(/\r?\n|\r/);
      var table_data = '<table id="myTable" class="table table-bordered table-striped">';
      for(var count = 0; count<employee_data.length-1; count++)
      {
       var cell_data = employee_data[count].split(",");
       table_data += '<tr>';
       for(var cell_count=0; cell_count<cell_data.length; cell_count++)
       {
        if(count === 0)
        {
         table_data += '<th>'+cell_data[cell_count]+'</th>';
        }
        else
        {
         table_data += '<td>'+cell_data[cell_count]+'</td>';
        }
       }
       table_data += '</tr>';
      }
      table_data += '</table>';
      $('#employee_table').html(table_data);
     }
    });

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }