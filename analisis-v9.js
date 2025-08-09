// Oráculo Nuclear v9 - Goles con cálculo de cuota sugerida
function calcularResultado(data) {
  const {
    winL, drawL, lossL, avgGoalsL, avgAgainstL,
    winV, drawV, lossV, avgGoalsV, avgAgainstV
  } = data;

  const totalL = winL + drawL + lossL;
  const totalV = winV + drawV + lossV;

  const pGanL = winL / totalL;
  const pEmpL = drawL / totalL;
  const pPerL = lossL / totalL;

  const pGanV = winV / totalV;
  const pEmpV = drawV / totalV;
  const pPerV = lossV / totalV;

  const cruzLocal = (pGanL + pPerV) / 2;
  const cruzEmpate = (pEmpL + pEmpV) / 2;
  const cruzVisitante = (pGanV + pPerL) / 2;

  const expectedGoals = (avgGoalsL + avgAgainstV + avgGoalsV + avgAgainstL) / 4;
  let resultado = {};
  const diferenciaLocalVisitante = Math.abs(cruzLocal - cruzVisitante);

 if (cruzEmpate > cruzLocal && cruzEmpate > cruzVisitante) {
    resultado.tipo = "Empate";
    resultado.confianza = cruzEmpate;
  } else if (diferenciaLocalVisitante < 0.05) {
    resultado.tipo = "Empate";
    resultado.confianza = cruzEmpate;
  } else if (cruzLocal >= 0.55 && (cruzLocal - Math.max(cruzVisitante, cruzEmpate)) >= 0.10) {
    resultado.tipo = "Gana Local";
    resultado.confianza = cruzLocal;
  } else if (cruzVisitante >= 0.55 && (cruzVisitante - Math.max(cruzLocal, cruzEmpate)) >= 0.10) {
    resultado.tipo = "Gana Visitante";
    resultado.confianza = cruzVisitante;
  } else {
    const mayor = Math.max(cruzLocal, cruzVisitante);
    resultado.tipo = cruzLocal === mayor ? "Gana Local" : "Gana Visitante";
    resultado.confianza = mayor;
  }

  let goles = "";
  let alerta = "";
  let cuotaGoles = null;
  const pg = expectedGoals;

  if (pg <= 1.12) {
    goles = "Under 1.5";
  }
  else if (pg >= 1.13 && pg <= 1.74) {
    goles = "Under 2.5";
  }
  else if (pg >= 1.75 && pg <= 1.90) {
    goles = "Over 1.5";
  }
  else if (pg >= 1.91 && pg <= 2.12) {
    goles = "Under 2.5";
  }
  else if (pg >= 2.13 && pg <= 2.74) {
    goles = "Under 3.5";
  }
  else if (pg >= 2.75 && pg <= 2.90) {
    goles = "Over 2.5";
  }
 else if (pg >= 2.91 && pg <= 3.12) {
    goles = "Under 3.5";
  }
  else if (pg >= 3.13 && pg <= 3.74) {
    goles = "Under 4.5";
  }
  else if (pg >= 3.75 && pg <= 3.90) {
    goles = "Over 3.5";
  }
  else if (pg >= 3.91 && pg <= 4.12) {
    goles = "Under 4.5";
  }
  else if (pg >= 4.13 && pg <= 4.74) {
    goles = "Under 5.5";
  }
  else if (pg >= 4.75 && pg <= 4.90) {
    goles = "Over 4.5";
  }
  else if (pg >= 4.91 && pg <= 5.12) {
    goles = "Under 5.5";
  }
  else if (pg >= 5.13 && pg <= 5.74) {
    goles = "Under 6.5";
  }
  else if (pg >= 5.75 && pg <= 5.90) {
    goles = "Over 5.5";
  }

  resultado.goles = goles || alerta;
  resultado.promedioGoles = expectedGoals.toFixed(2);
  resultado.unico = `${resultado.tipo} | ${resultado.goles}`;

  return resultado;
}
