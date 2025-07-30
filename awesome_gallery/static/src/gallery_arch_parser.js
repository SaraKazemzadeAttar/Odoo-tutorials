    export class GalleryArchParser {
    parse(xmlDoc) {
       const imgField = xmlDoc.getAttribute("image_field")
       return {
           imgField,
       }
    }
}