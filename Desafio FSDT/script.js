const CONTACT_ENDPOINT = "https://fsdt-contact.onrender.com/contact";

const form = document.querySelector(".form-wrapper");
const nameInputs = document.querySelectorAll("input[id^='nome']");
const messageInput = document.querySelector("#historia");

const clearFormFields = () => {
	nameInputs.forEach((input) => {
		input.value = "";
	});

	messageInput.value = "";
};

const buildPayload = () => {
	const names = Array.from(nameInputs)
		.map((input) => input.value.trim())
		.filter((name) => name.length > 0);

	const message = messageInput.value.trim();

	return {
		names,
		message
	};
};

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const payload = buildPayload();

	try {
		const response = await fetch(CONTACT_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			throw new Error("Falha ao enviar formulário");
		}

		clearFormFields();
		alert("Formulário enviado com sucesso!");
	} catch (error) {
		alert("Ocorreu um erro ao enviar o formulário.");
	}
});
