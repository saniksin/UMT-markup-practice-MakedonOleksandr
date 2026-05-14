import { apiClient } from "./apiClient.js";
import { showErrorNotification } from "./notifications.js";
import { extractErrorMessage, formatPriceUsd, resolveImageUrl, suppressHoverUntilLeave } from "./utils.js";

const itemsPerPage = 8;
const showMoreButtonDefaultLabel = "Show More";
const showMoreButtonLoadingLabel = "Loading...";

const bouquetsList = document.getElementById("bouquets-list");
const bouquetsListShell = document.querySelector(".bouquets-list-shell");
const bouquetsLoader = document.getElementById("bouquets-loader");
const showMoreButton = document.querySelector(".bouquets-show-more-button");

// We fetch the full collection once and paginate client-side. This works
// transparently both for live json-server (returns the same array shape) and
// for GitHub Pages static mode (dist/api/products.json is the literal array).
let allProducts = [];
let renderedCount = 0;

function buildBouquetsListItemShellMarkup() {
	return `
		<li class="bouquets-item">
			<article class="product-card" tabindex="0" role="button" data-product-trigger>
				<img loading="lazy" class="bouquets-card-image" alt="">
				<div class="product-card-content">
					<div class="product-card-header">
						<h3 class="product-card-title"></h3>
						<p class="product-card-text"></p>
					</div>
					<p class="product-card-price"></p>
				</div>
			</article>
		</li>`;
}

function fillBouquetsListItem(listItem, product) {
	const image = listItem.querySelector(".bouquets-card-image");
	// Set srcset BEFORE src so the browser only fetches the candidate that
	// matches its DPR — assigning src first kicks off a @1x request even on
	// retina, then srcset triggers a second @2x fetch.
	const img2x = resolveImageUrl(product.img2x);
	if (img2x) {
		image.setAttribute("srcset", `${img2x} 2x`);
	}
	image.src = resolveImageUrl(product.img);
	image.alt = product.alt ?? product.title ?? "";

	listItem.querySelector(".product-card-title").textContent = product.title ?? "";
	listItem.querySelector(".product-card-text").textContent = product.desc ?? "";
	listItem.querySelector(".product-card-price").textContent = formatPriceUsd(product.price);

	// Stash the long description on the card so the product modal can read it
	// without a second API round-trip. The modal falls back to the short desc
	// when descLong is missing.
	if (product.descLong) {
		listItem.querySelector(".product-card").dataset.descLong = product.descLong;
	}
}

function setShowMoreButtonLoading(isLoading) {
	if (!showMoreButton) {
		return;
	}

	showMoreButton.disabled = isLoading;
	showMoreButton.classList.toggle("is-loading", isLoading);
	showMoreButton.textContent = isLoading ? showMoreButtonLoadingLabel : showMoreButtonDefaultLabel;
}

function setBouquetsInitialLoading(isLoading) {
	if (bouquetsLoader) {
		bouquetsLoader.hidden = !isLoading;
	}
	if (bouquetsListShell) {
		bouquetsListShell.setAttribute("aria-busy", isLoading ? "true" : "false");
	}
}

function updateShowMoreVisibility() {
	if (!showMoreButton) {
		return;
	}
	showMoreButton.hidden = renderedCount >= allProducts.length;
}

function renderNextChunk() {
	if (!bouquetsList) {
		return;
	}

	const nextChunk = allProducts.slice(renderedCount, renderedCount + itemsPerPage);
	if (nextChunk.length === 0) {
		return;
	}

	const chunkMarkup = nextChunk.map(() => buildBouquetsListItemShellMarkup()).join("");
	bouquetsList.insertAdjacentHTML("beforeend", chunkMarkup);

	const listItems = bouquetsList.querySelectorAll(":scope > .bouquets-item");
	for (let i = 0; i < nextChunk.length; i += 1) {
		fillBouquetsListItem(listItems[renderedCount + i], nextChunk[i]);
	}

	renderedCount += nextChunk.length;
	updateShowMoreVisibility();
}

function normalizeProductsResponse(responseBody) {
	if (Array.isArray(responseBody)) {
		return responseBody;
	}
	if (Array.isArray(responseBody?.data)) {
		return responseBody.data;
	}
	return [];
}

async function loadBouquets() {
	if (!bouquetsList) {
		return;
	}

	setBouquetsInitialLoading(true);
	bouquetsList.replaceChildren();
	renderedCount = 0;

	try {
		const response = await apiClient.get("/products");
		allProducts = normalizeProductsResponse(response.data);

		renderNextChunk();
	} catch (error) {
		showErrorNotification(extractErrorMessage(error, "Unable to load bouquets right now."));
	} finally {
		setBouquetsInitialLoading(false);
	}
}

function handleShowMoreClick() {
	setShowMoreButtonLoading(true);
	// Tiny async tick so the loading state is visible even when the slice is
	// effectively instant — keeps the UX consistent with the loader pattern.
	window.setTimeout(() => {
		renderNextChunk();
		setShowMoreButtonLoading(false);
		// Drop the hover/focus look until the pointer moves away.
		suppressHoverUntilLeave(showMoreButton);
	}, 120);
}

function initBouquetsFromApi() {
	if (!bouquetsList || !showMoreButton) {
		return;
	}

	if (showMoreButton) {
		showMoreButton.hidden = true;
	}

	showMoreButton.addEventListener("click", handleShowMoreClick);

	loadBouquets();
}

initBouquetsFromApi();
