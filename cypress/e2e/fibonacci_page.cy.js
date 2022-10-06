import {isDisabledBtnIfEmptyInput, isEnabledBtnIfNotEmptyInput} from "./utils";

describe("The fibonacci page", () => {
  before(() => {
    cy.visit("/fibonacci");
  });
  isDisabledBtnIfEmptyInput(it);
  isEnabledBtnIfNotEmptyInput(it, "number");
  it("should generate the fibonacci numbers", () => {
    cy.clock();
    cy.get("button[class^=text").click();
    cy.get("div[class^=circle_content]").should("have.length", 1).contains(0);
    cy.get("div[class*=circle_tail]").should((elements) =>
      expect(elements.eq(0).text()).to.contain(0)
    );
    cy.tick(500);
    cy.get("div[class^=circle_content]").then((elements) => {
      expect(elements).to.have.length(2);
      expect(elements.eq(0)).to.contain(0);
      expect(elements.eq(1)).to.contain(1);
    });
    cy.get("div[class*=circle_tail]").should((elements) => {
      expect(elements.eq(0).text()).to.contain(0);
      expect(elements.eq(1).text()).to.contain(1);
    });
    cy.tick(500);
    cy.get("div[class^=circle_content]").then((elements) => {
      expect(elements).to.have.length(3);
      expect(elements.eq(0)).to.contain(0);
      expect(elements.eq(1)).to.contain(1);
      expect(elements.eq(2)).to.contain(1);
    });
    cy.get("div[class*=circle_tail]").should((elements) => {
      expect(elements.eq(0).text()).to.contain(0);
      expect(elements.eq(1).text()).to.contain(1);
      expect(elements.eq(2).text()).to.contain(2);
    });
    cy.tick(500);
    cy.get("div[class^=circle_content]").then((elements) => {
      expect(elements).to.have.length(4);
      expect(elements.eq(0)).to.contain(0);
      expect(elements.eq(1)).to.contain(1);
      expect(elements.eq(2)).to.contain(1);
      expect(elements.eq(3)).to.contain(2);
    });
    cy.get("div[class*=circle_tail]").should((elements) => {
      expect(elements.eq(0).text()).to.contain(0);
      expect(elements.eq(1).text()).to.contain(1);
      expect(elements.eq(2).text()).to.contain(2);
      expect(elements.eq(3).text()).to.contain(3);
    });
    cy.tick(500);
    cy.get("div[class^=circle_content]").then((elements) => {
      expect(elements).to.have.length(5);
      expect(elements.eq(0)).to.contain(0);
      expect(elements.eq(1)).to.contain(1);
      expect(elements.eq(2)).to.contain(1);
      expect(elements.eq(3)).to.contain(2);
      expect(elements.eq(4)).to.contain(3);
    });
    cy.get("div[class*=circle_tail]").should((elements) => {
      expect(elements.eq(0).text()).to.contain(0);
      expect(elements.eq(1).text()).to.contain(1);
      expect(elements.eq(2).text()).to.contain(2);
      expect(elements.eq(3).text()).to.contain(3);
      expect(elements.eq(4).text()).to.contain(4);
    });
    cy.tick(500);
    cy.get("div[class^=circle_content]").then((elements) => {
      expect(elements).to.have.length(6);
      expect(elements.eq(0)).to.contain(0);
      expect(elements.eq(1)).to.contain(1);
      expect(elements.eq(2)).to.contain(1);
      expect(elements.eq(3)).to.contain(2);
      expect(elements.eq(4)).to.contain(3);
      expect(elements.eq(5)).to.contain(5);
    });
    cy.get("div[class*=circle_tail]").should((elements) => {
      expect(elements.eq(0).text()).to.contain(0);
      expect(elements.eq(1).text()).to.contain(1);
      expect(elements.eq(2).text()).to.contain(2);
      expect(elements.eq(3).text()).to.contain(3);
      expect(elements.eq(4).text()).to.contain(4);
      expect(elements.eq(5).text()).to.contain(5);
    });
  });
  isDisabledBtnIfEmptyInput(it);
});
