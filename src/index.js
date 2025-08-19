const player1 = {
    NOME: "Mario",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
};

const player2 = {
    NOME: "Luige",
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

            console.log(`${player1.NOME} um jogou um dado de ${dicePlayer1} + ${player1.VELOCIDADE} de velocidade = ${skillPlayer1}`);
            console.log(`${player2.NOME} um jogou um dado de ${dicePlayer2} + ${player2.VELOCIDADE} de velocidade = ${skillPlayer2}`);
            
        }else if(block === "CURVA"){
            skillPlayer1 = player1.MANOBRABILIDADE + dicePlayer1;
            skillPlayer2 = player2.MANOBRABILIDADE + dicePlayer2;

            console.log(`${player1.NOME} um jogou um dado de ${dicePlayer1} + ${player1.MANOBRABILIDADE} de manobrabilidade = ${skillPlayer1}`);
            console.log(`${player2.NOME} um jogou um dado de ${dicePlayer2} + ${player2.MANOBRABILIDADE} de manobrabilidade = ${skillPlayer2}`);
        }else if(block === "CONFRONTO"){
            skillPlayer1 = player1.PODER + dicePlayer1;
            skillPlayer2 = player2.PODER + dicePlayer2;

            console.log(`${player1.NOME} um jogou um dado de ${dicePlayer1} + ${player1.PODER} de poder = ${skillPlayer1}`);
            console.log(`${player2.NOME} um jogou um dado de ${dicePlayer2} + ${player2.PODER} de poder = ${skillPlayer2}`);
        }

        console.log(await roundWinner(skillPlayer1, skillPlayer2, player1, player2, block));

        console.log(player1.PONTOS);
        console.log(player2.PONTOS);
    }
})();

async function roundWinner(skill1, skill2, player1, player2, round) {
    let result = '';

    if(round === "CONFRONTO"){
        
        if(skill1 > skill2){
            player1.PONTOS -= skill1 > skill2 && player1.PONTOS > 0 ? 0 : 1;
            result = player2.PONTOS === 0 ? `${player2.NOME} tem 0 pontos! Não perde pontos` : `${player2.NOME} perdeu um ponto!`;
        }else if(skill2 > skill1){
            result = player1.PONTOS === 0 ? `${player1.NOME} tem 0 pontos! Não perde pontos` : `${player1.NOME} perdeu um ponto!`;
        }else {
            result = "Empatado, nenhum jogador perdeu ponto!";
        }
        player2.PONTOS -= skill2 > skill1 && player2.PONTOS > 0 ? 0 : 1;
    }else{
        player1.PONTOS += skill1 > skill2 ? 1 : 0;
        player2.PONTOS += skill2 > skill1 ? 1 : 0;

        if(skill1 > skill2){
            result = `${player1.NOME} Venceu a disputa, ganhou um ponto!`;
        }else if(skill2 > skill1){
            result = `${player2.NOME} Venceu a disputa, ganhou um ponto!`;
        }else{
            result = "Empatado!"
        }
    }

    return result;
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