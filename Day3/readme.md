Day 3:

Create a map with Products Infromation based on Id, Name, Category, Price, Manufacturer.

Create Map() object and call set() method and pass the Product JSON object to it (4) records Create a HTML Table from the Map. The table should show all records from Map.

Iterate over the Map() using for.loop, for..of. INside loop generate and inside display property for each product record

Use Tamplate string to generate Rows and Heades for the table. <tr><td>${prd.ProductId}</td><td>${prd.ProductName}</td></tr>

Add a Input Text element and Select element above the Table.

The select element must show the properties of the Product object. Read all proprties from product object from Map() using Object.keys() Iterate over these keys and generate for in the iteration (for loop)
When the user select a specific property from the select and enter the value for the property in Textbox (input element), the table should show data based on data entered in input element. E.g. If the 'Category' is selected from select element and the value entered in input element is 'ECT', then the table shoud how only recodrs for ECT category. (Immediately)

Add two radio buttons beside the input element for SORT and REVERSE. Based on the property selected from the select element the table should be sorted or reversed when corresponding radiobutton is clicked. e.g. is property selectd from select element is ProductName and sort radio button is clicked then table should show all products sorted by ProductName (at most tomorrow)