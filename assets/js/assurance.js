function validateForm(age, anciennete, permis, accident) {
	switch (true) {
		case isNaN(age):
			return "Merci de renseigner votre âge";
		case isNaN(anciennete):
			return "Merci de renseigner votre ancienneté";
		case isNaN(permis):
			return "Merci de renseigner depuis combien d'année vous possédez le permis";
		case isNaN(accident):
			return "Merci de renseigner combien d'accidents vous avez eu";
		case accident < 0 || age < 0 || anciennete < 0 || permis < 0:
			return "Merci de ne renseigner que des valeurs positives.";
		default:
			return "";
	}
}

function calculateTarif(age, anciennete, permis, accident, sectionResult) {
	const tarifs = ["rouge", "orange", "vert", "bleu"];

	let result = document.createElement("p");

	let echelon = 0; // Default tarif

	if (age > 25) {
		echelon++;
	}
	if (permis > 2) {
		echelon++;
	}
	echelon = echelon - accident;

	if (anciennete > 5 && echelon > 0) {
		echelon++;
	}

	if (echelon < 0) {
		result.innerText = "Vous ne pouvez pas bénéficier de notre assurance.";
	} else {
		result.innerText = `Tarif : ${tarifs[echelon]}`;
	}

	sectionResult.replaceChildren(result);
}

let submit = document.querySelector("#submit");
submit.addEventListener("click", (event) => {
	event.preventDefault();

	// Fetch input
	let age = parseInt(document.querySelector("#age").value);
	let anciennete = parseInt(document.querySelector("#anciennete").value);
	let permis = parseInt(document.querySelector("#permis").value);
	let accident = parseInt(document.querySelector("#accident").value);
	let sectionResult = document.querySelector("#result");
	let errorMessage = document.createElement("p");

	errorMessage.innerText = validateForm(age, anciennete, permis, accident);

	if (errorMessage.innerText == "") {
		calculateTarif(age, anciennete, permis, accident, sectionResult);
	} else {
		errorMessage.classList.toggle("error");
		sectionResult.replaceChildren(errorMessage);
	}
});
