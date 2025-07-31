import { test, expect } from '@playwright/test';

test.describe("update cutomer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/account-management/customer");
  }) 

  test("should able to update customer", async ({ page }) => { 
    const row = page.locator("tr").filter({ hasText: "Nexus Innovations Inc." });

    // Click the row to select the customer
    await row.getByRole("button").nth(1).click();
    await page.getByRole("textbox", { name: "Company Name" }).fill("Updated Nexus Innovations Inc.");
    await page.getByRole("button", { name: "Save" }).click();

    //optional: Add verification steps
    await expect(page.getByText("Customer updated successfully")).toBeVisible();
  }) });
