import Vue from "vue";
var Form = (function () {
    function Form() {
    }
    return Form;
}());
export { Form };
(function (Form) {
    function formView() {
        return new Vue({
            el: "#app",
            components: {},
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
            methods: {},
        });
    }
    Form.formView = formView;
})(Form || (Form = {}));
//# sourceMappingURL=form.js.map