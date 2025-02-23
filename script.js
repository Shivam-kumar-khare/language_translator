
// const url = "https://api.mymemory.translated.net/get"; // MyMemory API endpoint
// const getTranslation = async () => {
    
//     let baselang = document.getElementById("from-language").value;
//     let targetlang=document.getElementById("to-language").value;
//     let msg=document.getElementById("input-text").value;
    
//     let finalurl = `${url}?q=${encodeURIComponent(msg)}&langpair=${baselang}|${targetlang}`; // Corrected here

//     const res = await fetch(finalurl);
//     const jsonResponse = await res.json(); // Parse the JSON response
//     let outputmsg=jsonResponse.responseData.translatedText;
//     document.getElementById("output-text").innerHTML=outputmsg;
//     console.log(jsonResponse.responseData.translatedText); // Log the translated text
// }
// const buttton=document.getElementsByTagName("button")[0]
// buttton.addEventListener("click",()=>{
//     getTranslation();
// })

const url = "https://api.mymemory.translated.net/get"; // MyMemory API endpoint

const getTranslation = async () => {
    let baselang = document.getElementById("from-language").value;
    let targetlang = document.getElementById("to-language").value;
    let msg = document.getElementById("input-text").value;

    // Display a loading message
    document.getElementById("output-text").innerHTML = "getting response....";

    let finalurl = `${url}?q=${encodeURIComponent(msg)}&langpair=${baselang}|${targetlang}`; // Corrected here

    try {
        const res = await fetch(finalurl);
        const jsonResponse = await res.json(); // Parse the JSON response
        let outputmsg = jsonResponse.responseData.translatedText;

        // Display the translated message
        document.getElementById("output-text").innerHTML = outputmsg;
        console.log(outputmsg); // Log the translated text
    } catch (error) {
        // Handle any errors that may occur
        document.getElementById("output-text").innerHTML = "Error fetching translation.";
        console.error("Error:", error);
    }
}

const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", () => {
    getTranslation();
});
