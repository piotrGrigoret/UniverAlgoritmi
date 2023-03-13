
class Tovar{

    constructor(items){
        this.array =  items;       
    }
   
    static copy(other) {
        return new Tovar(
            other.imia, 
            other.opisanie, 
            other.tenaZaEdinitu, 
            other.vNalicii, 
            other.edinitaIzmer, 
            other.id
            );
    }

    equals(other) {
        if (other instanceof Tovar) {
          return (
            this.imia == other.imia && 
            this.opisanie == other.opisanie && 
            this.tenaZaEdinitu == other.tenaZaEdinitu && 
            this.vNalicii == other.vNalicii&&
            this.edinitaIzmer == other.edinitaIzmer&& 
            this.id == other.id
          );
        }
        return false;
    }

    parseFile = async () => {
        
        const fileContents = await this.readFile();
        const items = [];         
        const separateLines = fileContents.split(/\r?\n|\r|\n/g);
        for (let line of separateLines) {
            const itemProps = line.split(";");
            // console.log(itemProps)
            if (itemProps.length > 3) {
                items.push( {
                    name: itemProps[0],
                    type: itemProps[1],
                    number: Number(itemProps[2]),
                    vNalicii: Boolean(itemProps[3]),
                    edinitaIzmer: itemProps[4],
                    id: itemProps[5]
                });
             }
        }
        items.push({
            edinitaIzmer: "kg",
            id: "51",
            name: "banani",
            number: 10,
            type: "azerbaijan",
            vNalicii: false
        })
        console.log(items);
        const csv = this.arrayToCsvObj(items);
        this.downloadBlob(csv, "banan.csv");
    }

    readFile = () => {
      
        var reader = new FileReader();
        return new Promise((resolve, reject) => {
          
            reader.onload = () => {
                
                resolve(reader.result);
               
            }
            
            reader.readAsText(fileInput.files[0]);
        });
        
        
    }
    arrayToCsvArr = (items) => {
        return items.map(row =>
        row
        .map(String)
        .map(v => v.replaceAll('"', '""')) 
        .join(';')  
        ).join('\r\n');  
    }
    arrayToCsvObj = (items) => {
        return items.map(row =>
        row.id + ";" + row.name  + ";" + row.number + ";" + row.vNalicii + ";"
        ).join('\r\n');  
    }
     downloadBlob = (content, filename, contentType) => {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
    
        const pom = document.createElement('a');
        pom.href = url;
        pom.setAttribute('download', filename);
        pom.click();
    }
    

}
let product = new Tovar();
var fileInput = document.getElementById("csv");  
// fileInput.addEventListener('change', product.readFile);
fileInput.addEventListener('change', product.parseFile);






