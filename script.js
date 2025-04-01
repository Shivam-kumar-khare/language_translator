const url = "https://api.mymemory.translated.net/get"; // MyMemory API endpoint

let fromLang=document.getElementById("from-language");
let toLang=document.getElementById("to-language");
let inputText=document.getElementById("input-text");
let outputText=document.getElementById("output-text");

const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const getTranslation = async () => {
    let baselang =fromLang.value;
    let targetlang = toLang.value;
    let msg = inputText.value;


    outputText.innerHTML = "Translating...";

    if (msg.trim() === "") {
        outputText.innerHTML = "";
        return;
    }

    let finalurl = `${url}?q=${encodeURIComponent(msg)}&langpair=${baselang}|${targetlang}`;
    try {
        const res = await fetch(finalurl);
        const jsonResponse = await res.json();
        let outputmsg = jsonResponse.responseData.translatedText;

        outputText.innerHTML = outputmsg;
    } catch (error) {

        outputText.innerHTML = "Error fetching translation.";
        console.error("Error:", error);
    }
};

const debouncedTranslation = debounce(getTranslation, 700);


inputText.addEventListener("input", debouncedTranslation);
fromLang.addEventListener("change", debouncedTranslation);
toLang.addEventListener("change", debouncedTranslation);
document.getElementById("Refresh-btn").addEventListener("click", () => {
    location.reload();
});
