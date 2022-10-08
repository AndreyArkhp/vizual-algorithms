export function isDisabledBtnIfEmptyInput(fn) {
  fn("should button disabled if input is empty", () => {
    cy.get("input").should("have.value", "");
    cy.get("button[class^=text]").each((btn) => {
      expect(btn).to.be.disabled;
    });
  });
}

export function isEnabledBtnIfNotEmptyInput(fn, inputType, textBtn) {
  const inputData = inputType === "string" ? "qwerty" : 5;
  fn("should button enabled if input is not empty", () => {
    cy.get("input").type(inputData);
    cy.get("button[class^=text]").eq(0).should("have.text", textBtn).should("be.enabled");
  });
}
