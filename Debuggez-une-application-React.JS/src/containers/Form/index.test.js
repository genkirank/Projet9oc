import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./index";

describe("When Form is created", () => {
  it("displays all input fields", async () => {
    render(<Form />);
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("Nom")).toBeInTheDocument();
    expect(await screen.findByText("Prénom")).toBeInTheDocument();
    expect(await screen.findByText("Personel / Entreprise")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("calls the success action if the form is valid", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      const submitButton = await screen.findByTestId("button-test-id");
      userEvent.click(submitButton);


      await screen.findByText("En cours");

      await screen.findByText("Envoyer");

      await waitFor(() => expect(onSuccess).toHaveBeenCalled());
    });
  });
});