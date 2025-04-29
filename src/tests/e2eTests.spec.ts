import { test } from "@playwright/test";
// Make sure that both the client and server are running before running this test

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page
    .getByTestId("rf__node-form-0f58384c-4966-4ce6-9ec2-40b96d61f745")
    .getByRole("button", { name: "Form Form D" })
    .click();
  await page.getByText("Form D Prefill").click();
  await page.getByRole("button", { name: "button" }).click();
  await page.getByText("Form A").first().click();
  await page.getByText("Form B").first().click();
  await page.getByText("Form A").first().click();
  await page.getByText("button").click();
  await page
    .locator("div")
    .filter({
      hasText:
        /^Form Abuttondynamic_checkbox_groupdynamic_objectemailidmulti_selectnamenotes$/,
    })
    .locator("svg")
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Ok" }).click();
  await page.getByRole("button", { name: "dynamic_checkbox_group" }).click();
  await page.getByText("Form B").first().click();
  await page.getByText("dynamic_checkbox_group").click();
  await page.getByRole("button", { name: "Ok" }).click();
  await page.getByRole("button", { name: "button: Form A.button" }).click();
  await page
    .getByRole("button", { name: "dynamic_checkbox_group: Form" })
    .click();
  await page
    .getByRole("button", { name: "dynamic_checkbox_group: Form" })
    .getByRole("button")
    .click();
  await page.getByRole("button", { name: "dynamic_checkbox_group" }).click();
  await page.getByText("Form A").first().click();
  await page.getByText("dynamic_checkbox_group").click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "dynamic_checkbox_group" }).click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Form D Prefill$/ })
    .locator("svg")
    .click();
  await page.getByRole("button", { name: "fit view" }).click();
});
