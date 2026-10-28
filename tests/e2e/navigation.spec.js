const { test, expect } = require('@playwright/test');

test.describe('Site shell & navigation', () => {
    test('homepage injects header, footer and current year', async ({ page }) => {
        await page.goto('/index.html');
        await expect(page.locator('#site-header .logo').first()).toBeVisible();
        const nav = page.locator('#site-header nav[aria-label="Main navigation"]');
        await expect(nav.getByRole('link', { name: 'Learning Paths' })).toBeVisible();

        const year = String(new Date().getFullYear());
        await expect(page.locator('#site-footer .footer-bottom')).toContainText(year);
    });

    test('primary nav links reach their pages', async ({ page }) => {
        await page.goto('/index.html');
        await page.locator('#site-header').getByRole('link', { name: 'Certifications' }).click();
        await expect(page).toHaveURL(/certifications\.html$/);
        await expect(page.locator('#site-header nav a.active')).toHaveText('Certifications');
    });

    /* Pages in subdirectories (labs/, modules/<track>/) need "../" prefixes in
       the injected header and footer. Regressions here are invisible on the
       homepage, so assert assets load, links resolve, and no request 404s. */
    test('subdirectory pages resolve injected links and assets', async ({ page }) => {
        for (const path of ['/labs/endorctl-first-scan.html', '/modules/sca/02-reachability-analysis.html']) {
            const failed = [];
            const onResponse = (r) => { if (r.status() >= 400) failed.push(r.status() + ' ' + r.url()); };
            page.on('response', onResponse);

            await page.goto(path);

            const logo = page.locator('#site-header .logo-img').first();
            await expect(logo).toBeVisible();
            expect(await logo.evaluate((i) => i.complete && i.naturalWidth > 0)).toBe(true);

            await page.locator('#site-header').getByRole('link', { name: 'Home' }).click();
            /* Must land on the site root, not /labs/index.html or /modules/.../index.html. */
            await expect.poll(() => new URL(page.url()).pathname).toBe('/index.html');

            page.off('response', onResponse);
            expect(failed, `failed requests on ${path}`).toEqual([]);
        }
    });

    test('header search works on subdirectory pages', async ({ page }) => {
        await page.goto('/labs/endorctl-first-scan.html');
        await page.fill('#nav-search-input', 'reachability');
        const first = page.locator('.search-dropdown .search-result-item').first();
        await expect(first).toBeVisible();
        await expect(page.locator('#site-header nav a.active')).toHaveText('Labs');

        /* Result links must resolve from the site root, not into /labs/. */
        await first.click();
        await expect.poll(() => new URL(page.url()).pathname.startsWith('/labs/')).toBe(false);
        await expect(page.locator('#site-header nav')).toBeVisible();
    });

    test('dark mode toggle persists across reloads', async ({ page }) => {
        await page.goto('/index.html');
        const toggle = page.locator('#dark-mode-toggle');
        await toggle.click();
        await expect(page.locator('body')).toHaveClass(/dark-mode/);
        await page.reload();
        await expect(page.locator('body')).toHaveClass(/dark-mode/);
    });

    test('notification center opens and can be marked read', async ({ page }) => {
        await page.goto('/index.html');
        const badge = page.locator('#notif-count');
        await expect(badge).toBeVisible();
        await page.locator('#nav-notifications').click();
        const dropdown = page.locator('#notif-dropdown');
        await expect(dropdown).toHaveClass(/open/);
        await dropdown.locator('#notif-mark-read').click();
        await expect(badge).toBeHidden();
    });
});
