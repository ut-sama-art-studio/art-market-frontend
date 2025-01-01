.PHONY: deploy test run build

deploy:
	@vercel --prod

test:
	@npx playwright test ./tests/pages/login.spec.ts --project chromium --headed

run:
	@npm run dev

build:
	@npm run build