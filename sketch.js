//Variaveis da Posicao Bolinha
let posicaoXBolinha = 300; 
let posicaoYBolinha = 200; 
//Variaveis Tamanhos Bolinha

let diametroBolinha = 15; 
let raioBolinha = (diametroBolinha / 2);

//Variaveis Velocidade Bolinha
let velocidadeXBolinha = 7; 
let velocidadeYBolinha = 7;

//Variaveis Posicao Raquete 
let posicaoXMinhaRaquete = 5; 
let posicaoYMinhaRaquete = 150;
let posicaoXRaqueteOponente = 585; 
let posicaoYRaqueteOponente = 150;

//Variaveis Tamanho Raquete 
let larguraRaquete = 10; 
let alturaRaquete = 90;

//Colisao 
let colidiu = false;

//Velocidade 
let velocidadeYRaqueteOponente;

//Pontos
let meusPontos = 0; 
let pontosOponente = 0; 

//Sons 
let trilha; 
let raquetada; 
let pontos;


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(posicaoXMinhaRaquete,posicaoYMinhaRaquete);
  colisaoRaqueteBiblioteca(posicaoXMinhaRaquete,posicaoYMinhaRaquete);
  mostraRaquete(posicaoXRaqueteOponente,posicaoYRaqueteOponente);
  movimentaMinhaRaquete(); 
  //movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(posicaoXRaqueteOponente,posicaoYRaqueteOponente);
  incluiPlacar();
  bolinhaNaoFicaPresa();
  marcaPonto();
  movimentaRaqueteOponenteMultiplayer();
  
} 

function mostraBolinha() {
   circle(posicaoXBolinha, posicaoYBolinha, diametroBolinha); 
   
}

function movimentaBolinha() {
  posicaoXBolinha += velocidadeXBolinha; 
  posicaoYBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if(posicaoXBolinha + raioBolinha > width || posicaoXBolinha - raioBolinha < 0) {
    velocidadeXBolinha *= -1;
  }
  if(posicaoYBolinha + raioBolinha > height || posicaoYBolinha - raioBolinha < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
  rect(x,y,larguraRaquete,alturaRaquete);
  rect(x,y,larguraRaquete,alturaRaquete)
} 

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    posicaoYMinhaRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    posicaoYMinhaRaquete += 10;
  }
  posicaoYMinhaRaquete = constrain(posicaoYMinhaRaquete, 10, 310);
} 

function movimentaRaqueteOponente() {
  velocidadeYRaqueteOponente =  posicaoYBolinha - posicaoYRaqueteOponente - 
    larguraRaquete / -30;
  posicaoYRaqueteOponente += velocidadeYRaqueteOponente; 
}

function movimentaRaqueteOponenteMultiplayer() {
  if(keyIsDown(87)) {
    posicaoYRaqueteOponente -= 10;
  }
  if(keyIsDown(83)) {
    posicaoYRaqueteOponente += 10;
  }
   posicaoYRaqueteOponente = constrain(posicaoYRaqueteOponente, 10, height - alturaRaquete - 10);

}

function verificaColisaoRaquete() {
  if(posicaoXBolinha - raioBolinha < posicaoXMinhaRaquete + larguraRaquete &&
     posicaoYBolinha - raioBolinha < posicaoYMinhaRaquete + alturaRaquete &&
     posicaoYBolinha + raioBolinha > posicaoYMinhaRaquete) {
       velocidadeXBolinha *= -1;
       raquetada.play();
  } 
 
  
} 

function colisaoRaqueteBiblioteca(x,y) {
  colidiu = collideRectCircle(x, y, larguraRaquete,
        alturaRaquete, posicaoXBolinha, posicaoYBolinha, raioBolinha );
  if(colidiu) {
    velocidadeXBolinha *= -1; 
    raquetada.play();
  }
  
} 

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20)
  fill(255);
  text(meusPontos, 170, 26); 
  fill(color(255,140,0));
  rect(450,10,40,20)
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if(posicaoXBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if(posicaoXBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}

function preload() {
  trilha = loadSound("trilha.mp3"); 
  raquetada = loadSound("raquetada.mp3"); 
  ponto = loadSound("ponto.mp3");
  
}


function bolinhaNaoFicaPresa(){
    if (posicaoXBolinha - raioBolinha < 0){
    posicaoXBolinha = 23
    }
}
