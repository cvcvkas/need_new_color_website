{
    function range(start, end){
        let rng = [];
        for (let i=start; i<end; i++){
            rng.push(i);
        }
        return rng;
    }
    function random(array){
        return array[Math.floor(Math.random()*array.length)];
    }



    const body = document.querySelector('body');
    const generate = document.querySelector('#generate');
    const rgb_node = document.querySelector('#rgb');
    const hex_node = document.querySelector('#hex');


    function randomRGB(){
        const prefix = 'rgb({r}, {g}, {b})';
        const colorrange = range(0,255);
        
        let r = random(colorrange);
        let g = random(colorrange);
        let b = random(colorrange);
        
        let rgb = prefix.replace('{r}', r).replace('{g}', g).replace('{b}', b);
        return rgb;
    }

    let colortexts = document.querySelectorAll('.color-text');
    
    body.onkeypress = (e) => {
        if ( e.key == ' '){
            generate.click();
        }
    }
    generate.onclick = () => {
        let current_random_rgb = randomRGB();
        let current_random_hex = '#'+tinycolor(current_random_rgb).toHex().toUpperCase();
        
        body.style.backgroundColor = current_random_rgb;
        rgb_node.innerHTML = `RGB: <span class='color-text' id='rgb'>${current_random_rgb}</span>`;
        hex_node.innerHTML = `HEX: <span class='color-text' id='hex'>${current_random_hex}</span>`;
        
        colortexts.forEach(colortext => {
            if (colortext.id.trim().indexOf('rgb') != -1){
                colortext.style.backgroundColor = current_random_rgb;
                if (tinycolor(current_random_rgb).isLight()){
                    colortext.style.color = '#000000';
                }
                else{
                    colortext.style.color = '#FFFFFF';
                }
            }
            else{
                colortext.style.backgroundColor = current_random_hex;
                if (tinycolor(current_random_hex).isLight()){
                    colortext.style.color = '#000000';
                }
                else{
                    colortext.style.color = '#FFFFFF';
                }
            }
        })
    }
    let rgbNode;
    let hexNode;
    function copyColorValueRGB(){
        rgbNode = document.getElementById('rgb');

        var textArea = document.createElement("textarea");
        textArea.value = rgbNode.textContent.replace('RGB: ', '');
        document.body.appendChild(textArea);

        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand("Copy");

        textArea.remove();
        let oldinnertextrgb = rgbNode.innerText;
        rgbNode.innerText = 'Copied!'
        setTimeout(()=> {
            rgbNode.innerText = oldinnertextrgb;
        },500)
    }
    function copyColorValueHEX(){
        hexNode = document.getElementById('hex');

        var textArea = document.createElement("textarea");
        textArea.value = hexNode.textContent.replace('HEX: ', '');
        document.body.appendChild(textArea);

        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand("Copy");

        textArea.remove();
        let oldinnertexthex = hexNode.innerText;
        hexNode.innerText = 'Copied!'
        setTimeout(()=> {
            hexNode.innerText = oldinnertexthex;
        },500)
    }


}