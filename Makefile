deploy:
	@vercel --prod

test:
	@npx playwright test ./tests/pages/login.spec.ts --project chromium --headed