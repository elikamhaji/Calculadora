const karats = [
    { label: "10k", purity: 0.41 },
    { label: "14k", purity: 0.575 },
    { label: "18k", purity: 0.735 },
    { label: "87%", purity: 0.87 },
    { label: "88%", purity: 0.88 },
    { label: "90%", purity: 0.90 },
    { label: "91%", purity: 0.91 },
    { label: "92%", purity: 0.92 },
    { label: "93%", purity: 0.93 },
    { label: "95%", purity: 0.95 },
    { label: "99%", purity: 0.99 }
];

// Internal gold price (never shown)
let goldPriceValue = null;

const codeEl = document.getElementById("codeInput");
const precioBtn = document.getElementById("precioBtn");
const shareBtn = document.getElementById("shareBtn");

const priceListEl = document.getElementById("priceList");
const hintEl = document.getElementById("hint");
const refDisplayEl = document.getElementById("refDisplay");
const priceCard = document.getElementById("priceCard");

precioBtn.addEventListener("click", handlePrecio);
shareBtn.addEventListener("click", shareImage);

// 🔗 AUTO-RUN FROM LINK (?c=62)
const params = new URLSearchParams(window.location.search);
const urlCode = params.get("c");

if (urlCode) {
    codeEl.value = urlCode;

    // Auto-run after short delay (DOM + API ready)
    setTimeout(() => {
        handlePrecio();
    }, 400);
}

// ONE BUTTON FLOW
async function handlePrecio() {
    await fetchPrice();
    updateList();
}

// SAME API AS ORIGINAL SITE
async function fetchPrice() {
    try {
        const res = await fetch("https://api.gold-api.com/price/XAU");
        const data = await res.json();
        goldPriceValue = data.price;
    } catch (e) {
        console.log("fetch error", e);
    }
}

function updateList() {
    const oz = goldPriceValue;
    const code = parseInt(codeEl.value, 10);

    if (!oz || oz <= 0) {
        showHint("Unable to retrieve gold price. Try again.");
        return;
    }

    if (!Number.isInteger(code) || code < 60 || code > 70) {
        showHint("Invalid code.");
        return;
    }

    // Code → discount
    // 60 → 90%, 70 → 100%
    const discount = code + 30;
    const pct = discount / 100;

    priceListEl.innerHTML = "";
    const gramBase = oz / 31.1035;

    karats.forEach(k => {
        const perGram = (gramBase * k.purity * pct).toFixed(2);
        const row = document.createElement("div");
        row.className = "row";
        row.innerHTML = `<span>${k.label}</span><span>$${perGram}</span>`;
        priceListEl.appendChild(row);
    });

    // Internal reference (meaningless to clients)
    refDisplayEl.textContent = `Ref#9${Math.floor(oz)}${code}`;

    hintEl.classList.add("hidden");
    priceListEl.classList.remove("hidden");
    refDisplayEl.classList.remove("hidden");
    shareBtn.classList.remove("hidden");
}

function showHint(msg) {
    hintEl.innerHTML = msg;
    hintEl.classList.remove("hidden");
    priceListEl.classList.add("hidden");
    refDisplayEl.classList.add("hidden");
    shareBtn.classList.add("hidden");
}

async function shareImage() {
    const canvas = await html2canvas(priceCard, { scale: 3 });

    canvas.toBlob(blob => {
        if (!blob) return;

        const file = new File([blob], "gold-prices.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file] });
        } else {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "gold-prices.png";
            link.click();
        }
    });
}
