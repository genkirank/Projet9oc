import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();


      setSending(true);

      const form = evt.target;

      // Validation du formulaire avant l'envoi
      if (!form.checkValidity()) {
        form.reportValidity(); // Affiche les erreurs HTML5
        setSending(false);
        return;
      }

      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        form.reset();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact} noValidate>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name='nom' />
          <Field placeholder="" label="Prénom" name='prenom' />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            name='type'
          />
          <Field placeholder="" label="Email" name='email' />
          <Button id='formbutton' type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name='message'
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;