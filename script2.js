const url = "https://api.mymemory.translated.net/get"; // MyMemory API endpoint


const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const getTranslation = async () => {
    let baselang = document.getElementById("from-language").value;
    let targetlang = document.getElementById("to-language").value;
    let msg = document.getElementById("input-text").value;

 
    document.getElementById("output-text").innerHTML = "Translating...";

    if (msg.trim() === "") {
        document.getElementById("output-text").innerHTML = "";
        return;
    }

    let finalurl = `${url}?q=${encodeURIComponent(msg)}&langpair=${baselang}|${targetlang}`;

    try {
        const res = await fetch(finalurl);
        const jsonResponse = await res.json();
        let outputmsg = jsonResponse.responseData.translatedText;

        document.getElementById("output-text").innerHTML = outputmsg;
    } catch (error) {
      
        document.getElementById("output-text").innerHTML = "Error fetching translation.";
        console.error("Error:", error);
    }
};

const debouncedTranslation = debounce(getTranslation, 700);


document.getElementById("input-text").addEventListener("input", debouncedTranslation);
document.getElementById("from-language").addEventListener("change", debouncedTranslation);
document.getElementById("to-language").addEventListener("change", debouncedTranslation);
document.getElementById("Refresh-btn").addEventListener("click",()=>{
    location.reload();
});
