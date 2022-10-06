describe("App works correctly with routes", () => {
  const goBackHome = () => {
    it("should return home page", () => {
      cy.get("main div>a[href='/']").click();
    });
  };
  const goPage = (page, title) => {
    it(`should open ${page} page`, () => {
      cy.get(`[href="/${page}"]`).click();
      cy.get("h3").contains(`${title}`);
    });
  };
  it("successfully loads", () => {
    cy.visit("/");
  });
  goPage("recursion", "Строка");
  goBackHome();
  goPage("fibonacci", "Последовательность Фибоначчи");
  goBackHome();
  goPage("sorting", "Сортировка массива");
  goBackHome();
  goPage("stack", "Стек");
  goBackHome();
  goPage("queue", "Очередь");
  goBackHome();
  goPage("list", "Связный список");
  goBackHome();
});
