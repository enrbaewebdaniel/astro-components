import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

// Function to recursively traverse directories
function traverseDirectory(dir) {
    const files = fs.readdirSync(dir); // Read contents of the directory
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath); // Get file stat
        if (stat.isDirectory()) {
            // If it's a directory, traverse it recursively
            traverseDirectory(filePath);
        } else if (path.extname(filePath) === '.html') {
            // If it's an HTML file, do something with it
            // Here you can perform any operation you want with the HTML file
            cleanHTML(filePath);
            changeStyleSheet(filePath);
        }
    });
}

function getDocumentContent(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf8'); // Lee el contenido del archivo HTML
    const dom = new JSDOM(htmlContent); // Crea un nuevo DOM utilizando jsdom

    return dom; // Accede al documento HTML;
}

//Funtion to clean Astro atributes from HTML file
function cleanHTML(filePath) {
    const dom = getDocumentContent(filePath);
    const document = dom.window.document;
    const astroElements = document.querySelectorAll('body *');

    astroElements.forEach(astroEl => {
        const listAttributes = astroEl.getAttributeNames();
        //Encuentra los atributos que contengan la cadena indicada
        listAttributes.forEach(name => {
            if (name.includes("data-astro")) {
                astroEl.removeAttribute(name);
            }
        });
    });

    //Guardas los cambios realizados
    fs.writeFileSync(filePath, dom.serialize());
    console.log("Etiquetas limpiadas!")
}

//Cambiar la stylessheet por la generada por sass
function changeStyleSheet(filePath) {
    const dom = getDocumentContent(filePath);
    const document = dom.window.document;

    const link = document.querySelector("[rel='stylesheet']");

    link.href = "./styles/styles.css";

    fs.writeFileSync(filePath, dom.serialize());
    console.log("Estilos generados!")
}


// Replace 'folderPath' with the path to the directory you want to traverse
const folderPath = './dist';

// Update this with your folder path
traverseDirectory(folderPath);

