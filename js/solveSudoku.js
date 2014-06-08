$(document).ready(function() {
	$("#button_solve").click(function() {
		var sudokuBoard = [];
		var rowUsed = [];
		var colUsed = [];
		var squareUsed = [];

		for (var i=0; i<9; i++) {
			var rowUsedInnerArr = [];
			var colUsedInnerArr = [];
			var squareUsedInnerArr = [];

			for (var j=0; j<=9; j++) {
				rowUsedInnerArr.push(false);
				colUsedInnerArr.push(false);
				squareUsedInnerArr.push(false);
			}
			rowUsed.push(rowUsedInnerArr);
			colUsed.push(colUsedInnerArr);
			squareUsed.push(squareUsedInnerArr);
		}
		for (var i=0; i<9; i++) {
			var rowArr = [];

			for (var j=0; j<9; j++) {
				var theInput = table_sudoku.find("#input_" + i + "_" + j);
				var strInputNum = theInput.val();

				if (strInputNum == "")
					rowArr.push(0);
				else {
					var inputNum = parseInt(strInputNum);
					var squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

					rowArr.push(inputNum);
					if (!rowUsed[i][inputNum] && !colUsed[j][inputNum] && !squareUsed[squareIndex][inputNum]) {
						rowUsed[i][inputNum] = true;
						colUsed[j][inputNum] = true;
						squareUsed[squareIndex][inputNum] = true;
					}
					else {
						alert("You input a sudoku problem with wrong format");
						return;
					}
				}
			}
			sudokuBoard.push(rowArr);
		}
		setSudokuColors();
		if (solveSudoku(0, 0)) {
			for (var i=0; i<sudokuBoard.length; i++) {
				for (var j=0; j<sudokuBoard[i].length; j++) {
					var theInput = table_sudoku.find("#input_" + i + "_" + j);

					theInput.attr("disabled", "disabled");
					theInput.val(sudokuBoard[i][j]);
				}
			}
		}
		else
			alert("This sudoku problem can not be solved");

		function setSudokuColors() {
			for (var i=0; i<9; i++) {
				for (var j=0; j<9; j++) {
					var theInput = table_sudoku.find("#input_" + i + "_" + j);

					theInput.css("background-color", "white");
					if (theInput.val() == "")
						theInput.css("color", "#006BFF");
					else
						theInput.css("color", "black");
				}
			}
		}
		function solveSudoku(row, col) {
			if (col == sudokuBoard.length) {
				row++;
				col = 0;
				if (row == sudokuBoard.length)
					return true;
			}
			if (sudokuBoard[row][col] == 0) {
				for (var i=1; i<=9; i++) {
					var squareIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

					if (!rowUsed[row][i] && !colUsed[col][i] && !squareUsed[squareIndex][i]) {
						sudokuBoard[row][col] = i;
						rowUsed[row][i] = true;
						colUsed[col][i] = true;
						squareUsed[squareIndex][i] = true;
						if (solveSudoku(row, col + 1))
							return true;
						else {
							sudokuBoard[row][col] = 0;
							rowUsed[row][i] = false;
							colUsed[col][i] = false;
							squareUsed[squareIndex][i] = false;
						}
					}
				}
				return false;
			}
			else
				return solveSudoku(row, col + 1);
		}
	});
});
