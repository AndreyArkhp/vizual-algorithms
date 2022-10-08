import {get} from "http";
import {isDisabledBtnIfEmptyInput, isEnabledBtnIfNotEmptyInput} from "./utils";

describe("The stack page", () => {
  before(() => {
    cy.visit("/stack");
  });
  beforeEach(function () {
    cy.get("button[class^=text]").as("addBtn");
    cy.clock();
  });
  isDisabledBtnIfEmptyInput(it);
  isEnabledBtnIfNotEmptyInput(it, "string", "Добавить");
  it("should be disabled buttons to delete and clear", () => {
    cy.get("@addBtn").should((btns) => {
      expect(btns.eq(1)).to.be.disabled;
      expect(btns.eq(2)).to.be.disabled;
    });
  });
  it("should add element to the stack", function () {
    cy.get("@addBtn").eq(0).click();
    cy.get("div[class^=circle_circle").should("have.length", 1);
    cy.get("div[class*=circle_changing").should("have.length", 1).and("contain", "qwer");
    cy.get("div[class*=circle_head").should("contain", "Top");
    cy.get("p[class*=circle_index").should("contain", 0);
    cy.get("@addBtn").should((btns) => {
      expect(btns.eq(1)).to.be.enabled;
      expect(btns.eq(2)).to.be.enabled;
    });
    cy.tick(500);
    cy.get("div[class*=circle_changing").should("not.have.length");
    cy.get("div[class*=circle_default").should("have.length", 1).and("contain", "qwer");
    isDisabledBtnIfEmptyInput(it);
  });
  it("should add element to the end of the stack", function () {
    cy.get("input").type("abc");
    cy.get("@addBtn").eq(0).click();
    cy.get("div[class^=circle_circle").should("have.length", 2);
    cy.get("div[class*=circle_changing").should("have.length", 1).and("contain", "abc");
    cy.get("@addBtn").should((btns) => {
      expect(btns.eq(1)).to.be.enabled;
      expect(btns.eq(2)).to.be.enabled;
    });
    cy.get("div[class*=circle_head").should((els) => {
      expect(els.eq(0)).to.contain("");
      expect(els.eq(1)).to.contain("Top");
    });
    cy.get("p[class*=circle_index").should((indexes) => {
      expect(indexes.eq(0)).to.contain(0);
      expect(indexes.eq(1)).to.contain(1);
    });
    cy.tick(500);
    cy.get("div[class*=circle_changing").should("not.have.length");
    cy.get("div[class*=circle_default")
      .should("have.length", 2)
      .and((els) => {
        expect(els.eq(0)).to.contain("qwer");
        expect(els.eq(1)).to.contain("abc");
      });
    isDisabledBtnIfEmptyInput(it);
  });
  it("should remove element from the head of the stack", function () {
    cy.get("div[class^=circle_circle").should("have.length", 2);
    cy.get("@addBtn").eq(1).click();
    cy.get("div[class*=circle_changing").should("have.length", 1).and("contain", "abc");
    cy.get("div[class*=circle_default").should("have.length", 1).and("contain", "qwer");
    cy.tick(500);
    cy.get("div[class*=circle_changing").should("not.have.length");
    cy.get("div[class*=circle_default").should("have.length", 1).and("contain", "qwer");
    cy.get("div[class^=circle_circle").should("have.length", 1);
  });
  it("should clear stack", function () {
    cy.get("input").type("test");
    cy.get("@addBtn").eq(0).click();
    cy.tick(500);
    cy.get("input").type("xyz");
    cy.get("@addBtn").eq(0).click();
    cy.tick(500);
    cy.get("div[class^=circle_circle").should("have.length", 3);
    cy.get("@addBtn").eq(2).click();
    cy.get("div[class^=circle_circle").should("not.have.length");
    cy.get("@addBtn").each((btn) => {
      expect(btn).to.be.disabled;
    });
    cy.get("input").should("not.have.value");
  });
});
