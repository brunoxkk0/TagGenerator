const BASE = document.querySelector("#content");
const FORM = document.querySelector("#form");
const TEMPLATE = BASE.children.item(0);

const _serializeToString = XMLSerializer.prototype.serializeToString;

XMLSerializer.prototype.serializeToString = function (node) {
    return _serializeToString
        .call(this, node)
        .replace(
            /background-image:/g,
            '-webkit-background-clip: text; background-image:',  // Add the -webkit-background-clip
        );
};

const addTag = (title, color, text_color = "white", sImg = "", pImg = "", borderSquared = false) => {

    let copy = TEMPLATE.cloneNode(true);

    console.log(copy)

    copy.innerHTML = copy.innerHTML
        .replaceAll("{text}", title)
        .replaceAll("${url}", pImg)
        .replaceAll("${url2}", sImg)
        .replaceAll("<img class=\"tag-img\" src=\"\" alt=\"\">", "")
        .replaceAll("<img class=\"tag-img tag-img-suffix\" src=\"\" alt=\"\">", "");

    copy.style = `--tag-background: ${color}; --text-color: ${text_color}; --border-radius: ${borderSquared ? 0 : "5px"}`

    return copy;
}

document.addEventListener("DOMContentLoaded", event => {

    BASE.innerHTML = "";

})

FORM.addEventListener("submit", evt => {

    evt.preventDefault()

    const title = document.querySelector("#tag").value
    const cor = document.querySelector("#cor").value
    const border = document.querySelector("#border").value
    const pImg = document.querySelector("#p-img").value
    const sImg = document.querySelector("#s-img").value
    const borderSquared = document.querySelector("#border-squared").checked

    BASE.innerHTML = "";

    if(cor === "#000000"){
        gerarRandom(title, border, cor, sImg, pImg, borderSquared)
    }else {
        gerar(title, border, cor, sImg, pImg,borderSquared)
    }

})

const gerar = (title, border, cor, sImg, pImg, borderSquared) => {
    BASE.appendChild(addTag(title, cor, border, sImg, pImg, borderSquared))
}
const gerarRandom = (title, cor, sImg, pImg, borderSquared) => {

    let data = [];

    for(let i = 0; i < 360; i += 10){

        let arr = [];

        for(let j = 0; j < 100; j += 10){
            arr.push(addTag(title, `hsl(${i},100%,${j}%)`, cor, sImg, pImg, borderSquared))
        }

        data.push(arr)
    }

    data.forEach(el => {

        let div = document.createElement("div");

        el.forEach(child => { div.appendChild(child) })

        BASE.appendChild(div)
    })

}

const save = (element) => {
    domtoimage.toBlob(element, {width: element.width, height: element.height})
        .then(function (blob) {
            window.saveAs(blob, 'tag.png');
        }).catch(err => console.log(err))
}