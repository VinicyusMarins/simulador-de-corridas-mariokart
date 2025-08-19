const player1 = {
    NAME: "Mario",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
};

const player2 = {
    NAME: "Luige",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0
};

//função principal
(async function main() {
    console.log("🚦🏁A Corrida vai começar! \n")
    for (let round = 1; round <= 5 ; round++) {
        console.log(`\nRodada ${round}`);
        let block = await raceEngine();
        console.log(`Parte da pista é um(a) ${block}\n`);

        let skillPlayer1 = 0;
        let skillPlayer2 = 0;

        let dicePlayer1 = await rollDice();
        let dicePlayer2 = await rollDice();

        if(block === "RETA"){
            skillPlayer1 = player1.VELOCIDADE + dicePlayer1;
            skillPlayer2 = player2.VELOCIDADE + dicePlayer2;

            console.log(`Jogador1 um jogou um dado de ${dicePlayer1} + ${player1.VELOCIDADE} de velocidade = ${skillPlayer1}`);
            console.log(`Jogador2 um jogou um dado de ${dicePlayer2} + ${player2.VELOCIDADE} de velocidade = ${skillPlayer2}`);
            
        }else if(block === "CURVA"){
            skillPlayer1 = player1.MANOBRABILIDADE + dicePlayer1;
            skillPlayer2 = player2.MANOBRABILIDADE + dicePlayer2;

            console.log(`Jogador1 um jogou um dado de ${dicePlayer1} + ${player1.MANOBRABILIDADE} de manobrabilidade = ${skillPlayer1}`);
            console.log(`Jogador2 um jogou um dado de ${dicePlayer2} + ${player2.MANOBRABILIDADE} de manobrabilidade = ${skillPlayer2}`);
        }else if(block === "CONFRONTO"){
            skillPlayer1 = player1.PODER + dicePlayer1;
            skillPlayer2 = player2.PODER + dicePlayer2;

            console.log(`Jogador1 um jogou um dado de ${dicePlayer1} + ${player1.PODER} de poder = ${skillPlayer1}`);
            console.log(`Jogador2 um jogou um dado de ${dicePlayer2} + ${player2.PODER} de poder = ${skillPlayer2}`);
        }

    }
})();

async function roundWinner(skill1, skill2, player1, player2, round) {
    let result = '';

    if(round === "CONFRONTO"){
        player1.PONTOS -= skill1 > skill2 && player1.PONTOS >= 0 ? 1 : 0;
        player2.PONTOS -= skill2 > skill1 && player2.PONTOS >= 0 ? 1 : 0;
    }else{

    }

}

async function rollDice() {
    return Math.floor(Math.random()*6)+1; 
}

async function raceEngine() {
    let result = '';
    let random = Math.random();
        
    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        case random < 0.99:
            result = "CONFRONTO";
            break;
    }

    return result;
}