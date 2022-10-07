import {isDisabledBtnIfEmptyInput, isEnabledBtnIfNotEmptyInput} from "./utils";

describe("The queue page", () => {
  before(() => {
    cy.visit("/queue");
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
  it("should be empty queue", function () {
    cy.get("div[class^=circle_content]").should("have.length", 10);
  });
  it("should correctly add elements to the end of the queue", function () {
    cy.get("@addBtn").eq(0).click();
    cy.get("div[class*=circle_changing]").should("have.length", 1);
    cy.get("div[class*=circle_default]").should("have.length", 9);
    cy.tick(500);
    cy.get("div[class*=circle_changing]").should("not.have.length");
    cy.get("div[class*=circle_default]").should("have.length", 10).eq(0).and("contain", "qwer");
    cy.get("div[class^=circle_content]")
      .eq(0)
      .should((element) => {
        expect(element.find("div[class*=circle_head]")).to.contain("head");
        expect(element.find("div[class*=circle_tail]")).to.contain("tail");
        expect(element.find("p[class*=circle_index]")).to.contain(0);
      });
    cy.get("input").type("abc");
    cy.get("@addBtn").eq(0).click();
    cy.get("div[class*=circle_changing]").should("have.length", 1);
    cy.get("div[class*=circle_default]").should("have.length", 9);
    cy.tick(500);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("qwer");
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(1);
      });
    });
    cy.get("input").type("xyz");
    cy.get("@addBtn").eq(0).click();
    cy.get("div[class*=circle_changing]").should("have.length", 1);
    cy.get("div[class*=circle_default]").should("have.length", 9);
    cy.tick(500);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("qwer");
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(1);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el).to.contain("xyz");
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(2);
      });
    });
  });
  it("should remove element from the front of the queue", function () {
    cy.get("@addBtn").eq(1).click();
    cy.get("div[class*=circle_changing]").should("have.length", 1);
    cy.get("div[class*=circle_default]").should("have.length", 9);
    cy.tick(500);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("");
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(1);
      });
    });
  });
  it("should clear the queue", function () {
    cy.get("input").type("qwer");
    cy.get("@addBtn").eq(0).click();
    cy.tick(500);
    cy.get("input").type("test");
    cy.get("@addBtn").eq(0).click();
    cy.tick(500);
    cy.get("@addBtn").eq(2).click();
    cy.get("p[class*=circle_letter]").each((el) => {
      expect(el).to.have.text("");
    });
  });
});
