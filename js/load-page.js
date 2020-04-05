const positionTd = {
    DESCRIPTION: 0,
    VALUE: 1,
    MONTH: 2
}

const months = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro'
}

window.addEventListener("load", () => {

    event.preventDefault();

    let aValores = [];
    let aTotal = [];
    let nX = 0;
    let tbody = document.querySelectorAll('#tb_fatura tbody tr');

    //Busca o elemento tBody com cada elemento tr
    for (nX = 0; nX < tbody.length; nX++) {

        let tr = tbody[nX].querySelectorAll('td');

        aValores.push({
            month: parseInt(tr[positionTd.MONTH].textContent),
            value: tr[positionTd.VALUE].textContent.replace('R$', '')
        })

    }

    aTotal = SumValues(aValores);
    CreateTableTotal(aTotal);

})

/**SumValues
 * Função responsável por consolidar as despesas de cada mês
 */
function SumValues(aValores) {
    let aArrayReturn = [];

    for (let nX = 0; nX <= 12; nX++) {
        let sum = 0;
        aValores.map((item) => {
            if (item.month === nX) {
                sum += parseFloat(item.value.replace(',', '.'))
            }
        })
        if (sum > 0) {
            aArrayReturn.push([months[nX], sum])
        }
    }

    return aArrayReturn;

}

/** CreateTableTotal
 *  Função responsável por criar os elementos na tabela de consolidados
 */
function CreateTableTotal(aTotal) {
    let oTable = document.querySelector("#tb_consolidado");
    let oBody = document.createElement("tbody");

    aTotal.forEach((item) => {

        let oTR = document.createElement("tr");
        let oMonth = document.createElement("td");
        let oValue = document.createElement("td");

        oMonth.textContent = item[positionTd.DESCRIPTION];
        oValue.textContent = item[positionTd.VALUE].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        oTR.appendChild(oMonth);
        oTR.appendChild(oValue);
        oBody.appendChild(oTR);
        oTable.appendChild(oBody);

    })

}