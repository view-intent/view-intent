import Vue from "vue";

export class Form {
	
}
export module Form {
	export function formView() {
		return new Vue({
			el: "#app",
			components: {
			},
			data: {
				model: {
					id: 1,
					user: "",
					password: "",
					status: true
				},
				schema: {
					fields: [{
						type: "input",
						inputType: "text",
						label: "ID",
						model: "id",
						readonly: true,
						featured: false,
						disabled: true
					}, {
						type: "input",
						inputType: "text",
						label: "Usuario",
						model: "user",
						readonly: false,
						featured: true,
						required: true,
						disabled: false,
						placeholder: "Usuário",
						validator: function () {
							// create validator here
							return false;
						}
					}, {
						type: "input",
						inputType: "password",
						label: "Senha",
						model: "password",
						min: 6,
						required: true,
						hint: "Pelo menos 6 caracteres",
						validator: function () {
							// create validator here
							return true;
						}
					}
					]
				},
				formOptions: {
					validateAfterLoad: true,
					validateAfterChanged: true
				}
			},
			methods: {

			},

		});
	}
}