import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { estados } from '../data/estados';

const validacao = Yup.object({
  nomeUsuario: Yup.string()
    .min(5, 'O nome deve ter pelo menos 5 caracteres.')
    .max(50, 'O nome deve ter no máximo 50 caracteres.')
    .required('Informe seu nome completo.'),
  emailUsuario: Yup.string()
    .email('Informe um e-mail válido.')
    .max(50, 'O e-mail deve ter no máximo 50 caracteres.')
    .required('Informe seu e-mail.'),
  telUsuario: Yup.string()
    .matches(
      /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/,
      'Informe um telefone válido. Ex: (51) 99999-9999.'
    ),
  regiaoUsuario: Yup.string().required('Selecione sua região.'),
});

export default function DivulgarJogo() {
  const [enviado, setEnviado] = useState(false);

  return (
    <section className="area-divulga-games py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            <h2 className="titulo-divulgar-jogos text-center mb-4">
              Deseja divulgar seus jogos na<br />
              Iara Games?<br />
              Envie seus dados
            </h2>

            {enviado ? (
              <div className="alert alert-success text-center" role="alert">
                Cadastro enviado com sucesso! Em breve entraremos em contato.
              </div>
            ) : (
              <Formik
                initialValues={{
                  nomeUsuario: '',
                  emailUsuario: '',
                  telUsuario: '',
                  regiaoUsuario: '',
                }}
                validationSchema={validacao}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log('Dados enviados:', values);

                  // Aqui você pode enviar os dados para uma API depois:
                  // await fetch('https://sua-api.com/divulgacoes', {
                  //   method: 'POST',
                  //   headers: { 'Content-Type': 'application/json' },
                  //   body: JSON.stringify(values),
                  // });

                  setEnviado(true);
                  setSubmitting(false);
                  resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form
                    id="form-divulga-games"
                    name="form-divulga-games"
                    className="form-divulga-games"
                    noValidate
                  >
                    <div className="row g-3">
                      {/* Nome completo */}
                      <div className="col-12">
                        <div className="campo-wrapper">
                          <label
                            htmlFor="nomeUsuario"
                            className="label-interna"
                          >
                            Nome completo
                          </label>

                          <Field
                            type="text"
                            id="nomeUsuario"
                            name="nomeUsuario"
                            className="form-control form-field-custom"
                            placeholder=" "
                            autoComplete="name"
                          />
                        </div>

                        <ErrorMessage
                          name="nomeUsuario"
                          component="small"
                          className="erro-campo d-block mt-1"
                        />
                      </div>

                      {/* E-mail */}
                      <div className="col-12">
                        <div className="campo-wrapper">
                          <label
                            htmlFor="emailUsuario"
                            className="label-interna"
                          >
                            E-mail
                          </label>

                          <Field
                            type="email"
                            id="emailUsuario"
                            name="emailUsuario"
                            className="form-control form-field-custom"
                            placeholder=" "
                            autoComplete="email"
                          />
                        </div>

                        <ErrorMessage
                          name="emailUsuario"
                          component="small"
                          className="erro-campo d-block mt-1"
                        />
                      </div>

                      {/* Telefone */}
                      <div className="col-12">
                        <div className="campo-wrapper">
                          <label
                            htmlFor="telUsuario"
                            className="label-interna"
                          >
                            Telefone
                          </label>

                          <Field
                            type="tel"
                            id="telUsuario"
                            name="telUsuario"
                            className="form-control form-field-custom"
                            placeholder=" "
                            autoComplete="tel"
                          />
                        </div>

                        <ErrorMessage
                          name="telUsuario"
                          component="small"
                          className="erro-campo d-block mt-1"
                        />
                      </div>

                      {/* Região */}
                      <div className="col-12">
                        <div className="campo-wrapper">
                          <label
                            htmlFor="regiaoUsuario"
                            className="label-interna"
                          >
                            Região
                          </label>

                          <Field
                            as="select"
                            id="regiaoUsuario"
                            name="regiaoUsuario"
                            className="form-select select-custom"
                          >
                            <option value="">Região</option>

                            {estados.map((estado) => (
                              <option
                                key={estado.sigla}
                                value={estado.sigla}
                              >
                                {estado.nome} ({estado.sigla})
                              </option>
                            ))}
                          </Field>
                        </div>

                        <ErrorMessage
                          name="regiaoUsuario"
                          component="small"
                          className="erro-campo d-block mt-1"
                        />
                      </div>

                      {/* Botão de envio */}
                      <div className="col-12 text-center mt-3">
                        <button
                          type="submit"
                          id="enviar-form"
                          name="enviar-form"
                          className="btn btn-form"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}