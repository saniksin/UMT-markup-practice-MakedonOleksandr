/* ================================ */
/* Modal manager — Order + Product Details */
/* ================================ */

const FOCUSABLE_SELECTOR = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type='hidden'])",
	"textarea:not([disabled])",
	"select:not([disabled])",
	"[tabindex]:not([tabindex='-1'])",
].join(",");

const modalRefs = document.querySelectorAll("[data-modal]");
const productTriggerRefs = document.querySelectorAll("[data-product-trigger]");
const openTriggerRefs = document.querySelectorAll("[data-open-modal]");

const productModalRef = document.getElementById("product-modal");
const productImageRef = document.getElementById("product-modal-image");
const productTitleRef = document.getElementById("product-modal-title");
const productPriceRef = document.getElementById("product-modal-price");
const productTextRef = document.getElementById("product-modal-text");

const orderModalRef = document.getElementById("order-modal");
const orderFormRef = document.getElementById("order-form");

let lastFocusedElement = null;
let activeModal = null;

function getFocusable(modalRef) {
	return Array.from(modalRef.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
		(el) => !el.hasAttribute("hidden") && el.offsetParent !== null
	);
}

function trapFocus(event) {
	if (!activeModal || event.key !== "Tab") return;

	const focusable = getFocusable(activeModal);
	if (focusable.length === 0) return;

	const first = focusable[0];
	const last = focusable[focusable.length - 1];

	if (event.shiftKey && document.activeElement === first) {
		event.preventDefault();
		last.focus();
	} else if (!event.shiftKey && document.activeElement === last) {
		event.preventDefault();
		first.focus();
	}
}

function onKeyDown(event) {
	if (event.key === "Escape") {
		closeModal();
		return;
	}
	trapFocus(event);
}

function openModal(modalRef, trigger) {
	if (!modalRef) return;

	if (activeModal && activeModal !== modalRef) {
		closeModal({ keepBodyLock: true });
	}

	if (trigger) {
		lastFocusedElement = trigger;
	} else if (!lastFocusedElement) {
		lastFocusedElement = document.activeElement;
	}

	activeModal = modalRef;
	modalRef.removeAttribute("hidden");

	// Force reflow so the transition runs
	void modalRef.offsetWidth;
	modalRef.classList.add("is-open");

	document.body.classList.add("modal-open");
	document.addEventListener("keydown", onKeyDown);

	// Move focus inside the modal (skip close button so labels read first)
	const focusable = getFocusable(modalRef);
	const target = focusable.find((el) => !el.matches("[data-modal-close]")) || focusable[0];
	if (target) {
		target.focus({ preventScroll: true });
	}
}

function closeModal(options = {}) {
	if (!activeModal) return;

	const closing = activeModal;
	closing.classList.remove("is-open");
	closing.setAttribute("hidden", "");

	activeModal = null;

	if (!options.keepBodyLock) {
		document.body.classList.remove("modal-open");
		document.removeEventListener("keydown", onKeyDown);

		if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
			lastFocusedElement.focus({ preventScroll: true });
		}
		lastFocusedElement = null;
	}
}

function fillProductModal(card) {
	const title = card.querySelector(".product-card-title")?.textContent?.trim() ?? "";
	const price = card.querySelector(".product-card-price")?.textContent?.trim() ?? "";
	const image = card.querySelector("img");

	productTitleRef.textContent = title;
	productPriceRef.textContent = price;

	// Use the shared product copy that matches the Figma spec body length
	// (≈7 lines @ 14px on mobile). The card's own short blurb is intentionally
	// not appended — the modal mock-up uses a single fixed description.
	productTextRef.textContent =
		"Each stem is carefully selected to create a bouquet that radiates freshness, elegance, and the gentle charm of spring. Whether you're celebrating a birthday, sending love, or simply brightening someone's day, this arrangement is sure to bring warm smiles and lasting impressions.";

	if (image) {
		productImageRef.src = image.getAttribute("src") || "";
		productImageRef.srcset = image.getAttribute("srcset") || "";
		productImageRef.alt = image.getAttribute("alt") || title;
	}
}

/* ===== Wire up triggers ===== */

productTriggerRefs.forEach((card) => {
	card.addEventListener("click", () => {
		fillProductModal(card);
		openModal(productModalRef, card);
	});

	card.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			fillProductModal(card);
			openModal(productModalRef, card);
		}
	});
});

openTriggerRefs.forEach((trigger) => {
	trigger.addEventListener("click", () => {
		const targetId = trigger.getAttribute("data-open-modal");
		const targetRef = document.getElementById(targetId);
		openModal(targetRef, trigger);
	});
});

/* ===== Close interactions ===== */

modalRefs.forEach((modalRef) => {
	modalRef.addEventListener("click", (event) => {
		if (event.target === modalRef) {
			closeModal();
		}
	});

	modalRef.querySelectorAll("[data-modal-close]").forEach((btn) => {
		btn.addEventListener("click", () => {
			closeModal();
		});
	});
});

/* ===== Order form submit ===== */

if (orderFormRef) {
	orderFormRef.addEventListener("submit", (event) => {
		event.preventDefault();

		const formData = new FormData(orderFormRef);
		const data = Object.fromEntries(formData.entries());

		const name = (data.name || "").toString().trim();
		const phone = (data.phone || "").toString().trim();

		if (!name || !phone) {
			alert("Please fill in your name and phone number.");
			return;
		}

		alert(`Thank you, ${name}! We'll call you at ${phone} shortly.`);

		orderFormRef.reset();
		closeModal();
	});
}
