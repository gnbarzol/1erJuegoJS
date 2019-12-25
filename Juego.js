const lvl = document.getElementById('nivel');
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 5;


class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500);
    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        document.getElementById('nivel').innerHTML= ` ${this.nivel}`;
        this.colores = {celeste, violeta, naranja, verde}
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else{
            btnEmpezar.classList.add('hide');//Con esto le añado una clase a ese id 
        }
    }

    generarSecuencia(){
        //.fill(valor) me inicializa el array con valores (valor)
        //Math.floor me redondea el valor para bajo (3.9 = 3)
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4)); //Al usar this.nombre_variable, este dato se va a guardar internamente en el objeto juego
        
    }

    siguienteNivel(){
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja';
            case 3:
                return 'verde';                     
        }
    }

    transformarColorANumero(color){
        switch(color){
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;                     
        }
    }

    iluminarSecuencia(){
        for(let i=0; i<this.nivel ; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout(()=> this.apagarColor(color), 400);
    }

    apagarColor(color){
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick(){
        for(let color in this.colores){
            this.colores[color].addEventListener('click', this.elegirColor) //bind(this) para hacer referencia al hacer click al this de la clase y no del boton que lo llama
        }
        // this.colores.celeste.addEventListener('click',this.elegirColor);
        // this.colores.naranja.addEventListener('click',this.elegirColor);
        // this.colores.violeta.addEventListener('click',elegirColor);
        // this.colores.verde.addEventListener('click',elegirColor);
    }

    eliminarEventosClick(){
        for(let color in this.colores){
            this.colores[color].removeEventListener('click', this.elegirColor) 
        }
    }

    elegirColor(Evento){
        const nombreColor = Evento.target.dataset.color;
        const numColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if(numColor === this.secuencia[this.subNivel]){
            this.subNivel++;
            if(this.subNivel === this.nivel){
                this.nivel++;
                document.getElementById('nivel').innerHTML= ` ${this.nivel}`;
                this.eliminarEventosClick();
                if(this.nivel === (ULTIMO_NIVEL+1)){
                    document.getElementById('nivel').innerHTML= ` ${ULTIMO_NIVEL}`;
                    this.ganoElJuego();
                }else{
                    setTimeout(this.siguienteNivel, 1100);
                }  
            } 
        }else{
            this.perdioElJuego();
        }
    }

    ganoElJuego(){
        swal('Gary Dice', 'Felicitaciones Ganaste el Juego!', 'success')
            .then(() => {
                this.inicializar();
                document.getElementById('nivel').innerHTML= `0`;
            })
    }

    perdioElJuego(){
        swal('Gary Dice', 'Lo lamentamos, perdiste :(', 'error')
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
                document.getElementById('nivel').innerHTML= `0`;
            })
    }

}


function empezarJuego(){
    //window.juego = new Juego(); Me permite ver el objeto juevo por consola
    var juego = new Juego();
    console.log(`Falta agregar tiempo para cada nivel, puntaje, 404 page.`);
}

