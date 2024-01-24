// Form validation ==================================

function checkValidation(event) {
	let errorMessage = document.querySelector(`#${event.target.id}+p`);

	if (event.target.validity.rangeUnderflow) {
		// Negative values
		event.target.classList.toggle(":out-of-range");
		errorMessage.innerText = "Veuillez entrer une valeur positive.";
		errorMessage.style.display = "inline-block";
		return false;
		// event.target.setCustomValidity("Veuillez entrer une valeur positive.");
	} else if (event.target.validity.valueMissing) {
		// Empty
		event.target.classList.toggle(":invalid");
		errorMessage.innerText = "Veuillez renseigner l'information";
		errorMessage.style.display = "inline-block";
		return false;
		// event.target.setCustomValidity("Veuillez renseigner l'information");
	} else {
		event.target.classList.toggle(":valid");
		errorMessage.style.display = "none";
		return true;
	}
}

function checkAllValid(validationStatus) {
	for (let id in validationStatus) {
		if (validationStatus.id == false) {
			return false;
		}
	}
	return true;
}

// Simulation tarif ==================================

function clearOuput(sectionResult) {
	let child = sectionResult.firstChild;
	if (child != null) {
		sectionResult.removeChild(child);
	}
}

function calculateTarif(age, anciennete, permis, accident, sectionResult) {
	const tarifs = ["rouge", "orange", "vert", "bleu"];

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

	let result = document.createElement("p");
	if (echelon < 0) {
		result.innerText = "Vous ne pouvez pas bénéficier de notre assurance.";
	} else {
		result.innerText = `Tarif : ${tarifs[echelon]}`;
	}

	sectionResult.replaceChildren(result);
}

// Main ==================================

// Check that inputs are valid
const form = document.querySelector("form");
let validationStatus = {
	age: false,
	anciennete: false,
	permis: false,
	accident: false,
};
form.addEventListener("focusout", (event) => {
	let id = event.target.id;
	if (checkValidation(event)) {
		validationStatus.id = true;
	} else {
		validationStatus.id = false;
	}
});

const submit = document.querySelector("#submit");
submit.addEventListener("click", (event) => {
	event.preventDefault();

	const sectionResult = document.querySelector("#result");

	// If all fields are valid, calculate tarif
	if (checkAllValid(validationStatus)) {
		// All input fields are valid
		// Fetch input
		const age = parseInt(document.querySelector("#age").value);
		const anciennete = parseInt(
			document.querySelector("#anciennete").value
		);
		const permis = parseInt(document.querySelector("#permis").value);
		const accident = parseInt(document.querySelector("#accident").value);

		calculateTarif(age, anciennete, permis, accident, sectionResult);

		// Reset status of validation of input fields
		validationStatus = {
			age: false,
			anciennete: false,
			permis: false,
			accident: false,
		};
	} else {
		// Clear previous output
		clearOuput(sectionResult);
	}
});
