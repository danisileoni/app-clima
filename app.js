import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";
import dotenv from "dotenv";
dotenv.config();


const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    


    do {
        opt = await inquirerMenu();
        console.log({opt});

        switch (opt) {
            case 1:
                // mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                // buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                
                // seleccionar el lugar
                const id = await listarLugares(lugares);
                if( id === '0') continue;

                const lugarSeleccionado = lugares.find(l => l.id === id);

                //guardar en DB
                busquedas.agregarHistorial( lugarSeleccionado.nombre );

                // datos del clima
                const climaDeLugar = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng)
                // mostrar resultados
                console.clear();
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ', lugarSeleccionado.lng);
                console.log('Temperatura: ', climaDeLugar.temp);
                console.log('Minima: ', climaDeLugar.min);
                console.log('Maxima: ', climaDeLugar.max);
                console.log('Descripcion del clima: ', climaDeLugar.desc);
            break;

            case 2:


                busquedas.historialCapitalizado.forEach( (lugar, i) => {

                    const idx = `${i+1}.`.green;
                    console.log( `${idx} ${lugar}`);

                })

            break;
        
            default:
            
            break;
        }


        if (opt !== 0 ) await pausa();
        
    } while (opt !== 0);
    
}

main();