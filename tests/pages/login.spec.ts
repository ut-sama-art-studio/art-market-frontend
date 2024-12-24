import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config(); // load .env into process.env

test("OAuth login", async ({ page }) => {
    await page.goto("http://localhost:3000/login/");
    await page.getByRole("button", { name: "Login with Discord" }).click();

    // wait for redirect
    await page.waitForURL("**/discord.com/**");

    const email = process.env.DISCORD_EMAIL ?? "";
    const password = process.env.DISCORD_PASSWORD ?? "";

    await page.getByLabel("Email or Phone Number*").fill(email);
    await page.getByLabel("Password*").fill(password);

    await page.getByRole("button", { name: "Log In" }).click();

    // might trigger captcha here
    // TODO: add another type of authentication method other than OAuth to avoid captcha

    // wait for redirect
    await page.waitForURL("**/discord.com/**");

    // scroll to agreement bottom
    const agreementElem = await page
        .getByLabel("utsama-art-market-devwants to")
        .locator("div")
        .filter({ hasText: "utsama-art-market-devwants to" })
        .nth(1);

    await agreementElem.evaluate((element) => {
        console.log(element);
        element.scrollTo({
            top: element.scrollHeight,
            behavior: "auto",
        });
    });

    await page.getByRole("button", { name: "Authorize" }).click();

    // wait for redirect
    await page.waitForURL("http://localhost:3000/");

    // verify that we're logged in
    const profilePicture = page.getByRole("img", {
        name: "Profile Picture",
        exact: true,
    });
    await expect(profilePicture).toBeVisible();
});
