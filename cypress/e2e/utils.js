export function isDisabledBtnIfEmptyInput(fn) {
  fn("should button disabled if input is empty", () => {
    cy.get("input").should("have.value", "").get("button").should("be.disabled");
  });
}

export function isEnabledBtnIfNotEmptyInput(fn, inputType) {
  const inputData = inputType === "string" ? "qwerty" : 5;
  fn("should button enabled if input is not empty", () => {
    cy.get("input").type(inputData).get("button[class^=text]").should("be.enabled");
  });
}
