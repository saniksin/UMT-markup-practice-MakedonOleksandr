export function extractErrorMessage(error, fallbackMessage = "Something went wrong. Please try again later.") {
	const serverMessage = error.response?.data?.error;
	if (typeof serverMessage === "string") {
		return serverMessage;
	}
	if (error.message) {
		return error.message;
	}
	return fallbackMessage;
}

export function formatPriceUsd(priceValue) {
	if (priceValue === null || priceValue === undefined || priceValue === "") {
		return "—";
	}
	const numericValue = typeof priceValue === "number" ? priceValue : Number.parseFloat(String(priceValue).replace(/[^0-9.,-]/g, "").replace(",", "."));
	if (Number.isNaN(numericValue)) {
		return String(priceValue);
	}
	return `$${numericValue}`;
}

// Pre-resolve every image under /images/ so Vite emits hashed copies into
// dist/assets and accounts for the GitHub Pages base path. db.json stores
// paths like "./images/spring-elegance@1x.jpg"; at runtime we map them to
// the build-time URL.
const imageRegistry = import.meta.glob("../images/*", {
	eager: true,
	query: "?url",
	import: "default",
});

export function resolveImageUrl(rawPath) {
	if (!rawPath || typeof rawPath !== "string") {
		return "";
	}
	if (/^(https?:)?\/\//i.test(rawPath) || rawPath.startsWith("data:")) {
		return rawPath;
	}
	const cleaned = rawPath.replace(/^\.?\/+/, "");
	const key = `../${cleaned}`;
	return imageRegistry[key] ?? rawPath;
}

// Drop focus after a click so the button doesn't keep its :focus-visible
// outline. Hover/active animations remain native — we only clear focus.
export function suppressHoverUntilLeave(button) {
	if (!button) return;
	button.blur();
}


