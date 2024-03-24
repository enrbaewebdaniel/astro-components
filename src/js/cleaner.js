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
            console.log(filePath);
            // Here you can perform any operation you want with the HTML file
            cleanHTML(filePath);
        }
    });
}

function getDocumentContent(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf8'); // Lee el contenido del archivo HTML
    const dom = new JSDOM(htmlContent); // Crea un nuevo DOM utilizando jsdom
    const document = dom.window.document; // Accede al documento HTML

    return document;
}

//Funtion to clean Astro atributes from HTML file
function cleanHTML(filePath) {
    const document = getDocumentContent(filePath);

    const astroElements = document.querySelectorAll('');
    astroElements.forEach(astroEl => {

    });


}




// Replace 'folderPath' with the path to the directory you want to traverse
const folderPath = './dist';

// Update this with your folder path
traverseDirectory(folderPath);
