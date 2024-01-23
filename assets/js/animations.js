// const inputs = document.querySelector("input");

// inputs.addEventListener("focus", (event) => {
// 	event.target.style.border = "red";
// });

addEventListener("keydown", function changeBg(event) {
	switch (event.key) {
		case "Enter":
			document.body.style.backgroundColor = "blue";
			setTimeout(() => {
				// document.body.style.backgroundColor = "red";
				document.body.classList.toggle("secondaryBgColor");
			}, 500);
	}
});
