addEventListener("keydown", function changeBg(event) {
	switch (event.key) {
		case "Enter":
			this.document.body.classList.toggle("secondaryBgColor");
			setTimeout(() => {
				// document.body.style.backgroundColor = "red";
				document.body.classList.toggle("secondaryBgColor");
			}, 500);
	}
});
