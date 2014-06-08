var table_sudoku;

$(document).ready(function() {
	table_sudoku = $("#table_sudoku");
	for (var i=0; i<9; i++) {
		var row = $("<tr></tr>");

		for (var j=0; j<9; j++) {
			var col = $("<td></td>");
			var input = $("<input id=\"input_" + i + "_" + j + "\" type=\"text\" />");
			var squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

			col.css("border-bottom", "1px solid #CFCECE");
			col.css("border-right", "1px solid #CFCECE");
			if (i % 3 == 2)
				col.css("border-bottom", "2px solid black");
			if (j % 3 == 2)
				col.css("border-right", "2px solid black");
			input.keydown(function(e) {
				var valueLen = $(this).val().length;
				var keyCode = e.which;

				if (keyCode != 8 && (keyCode < 49 || keyCode > 57 || valueLen == 1))
					return false;
			});
			input.css("border", "0px");
			input.css("padding", "10px");
			input.css("font-size", "20px");
			input.css("width", "20px");
			input.css("height", "20px");
			input.css("ime-mode", "disabled");
			input.css("background-color", "white");
			col.append(input);
			row.append(col);
		}
		table_sudoku.append(row);
	}
});
