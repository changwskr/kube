
if(typeof require !== 'undefined') 
    XLSX = require('xlsx');
else

var workbook = XLSX.readFile('excel_file_01.xlsx');

/* DO SOMETHING WITH workbook HERE */



var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'B1';

 

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

 

/* Find desired cell */
var desired_cell = worksheet[address_of_cell];

 

/* Get the value */
var desired_value = desired_cell.v;

console.log(desired_value);


/* output format determined by filename */

XLSX.writeFile(workbook, 'excelout.xlsx');

/* at this point, out.xlsx is a file that you can distribute */