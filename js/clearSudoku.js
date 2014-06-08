$(document).ready(function() {
	$("#button_clear").click(function() {
		for (var i=0; i<9; i++) {
			for (var j=0; j<9; j++) {
				var theInput = table_sudoku.find("#input_" + i + "_" + j);

				theInput.removeAttr("disabled");
				theInput.css("color", "black");
				theInput.val("");
			}
		}
	});
});
