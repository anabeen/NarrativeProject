d3.csv('MedianIncome.csv', function(d) {
    return {
        state: d.States,
        medHouseIncome: +d.Income.replace(',',''),
    };
}, function (data) {
    d3.select('body').style('background-color','black');

    const map = new Datamap({
        scope: 'usa',
        element: document.getElementById('USAmapContainer'),
        responsive: true,
        geographyConfig: {
            highlightOnHover: false,
            popupTemplate: function(geo){
                function findState(states) {
                    return states.state = geo.id;
                }
                return [
                    '<div class = "hoverinfo"><strong>',
                    geo.properties.name,
                    ': $' + data.find(findState).medHouseIncome,
                    '</strong></div>'].join('');
                

            }
        }
    });

    //colors for different income
    const underFifty = '#88FC97',
            fiftyThruFiftyfive = '#6BEC7C',
            fiftyfiveThruSixty = '#54DC66',
            sixtyThruSixtyfive = '#42CB54',
            sixtyfiveThruSeventy = '#30C343',
            seventyThruSeventyfive = '#22BA36',
            seventyfiveThruEighty = '#17AF2B',
            eightyThruEightyfive = '#10A423',
            overEightyfive =  '#0C9A1E';

    //loop through each state and assign color based on income
    for (var i=0; i < data.length; i++){
        let st = d3.select(',' + data[i].state);

        if (data[i].medHouseIncome < 50000){
            st.style('fill', underFifty);
        } else if (data[i].medHouseIncome >= 50000 && data[i].medHouseIncome < 55000){
            st.style('fill', fiftyThruFiftyfive);
        }else if (data[i].medHouseIncome >= 55000 && data[i].medHouseIncome < 60000){
            st.style('fill', fiftyfiveThruSixty);
        }else if (data[i].medHouseIncome >= 60000 && data[i].medHouseIncome < 65000){
            st.style('fill', sixtyThruSixtyfive);
        }else if (data[i].medHouseIncome >= 65000 && data[i].medHouseIncome < 70000){
            st.style('fill', sixtyfiveThruSeventy);
        }else if (data[i].medHouseIncome >= 70000 && data[i].medHouseIncome < 75000){
            st.style('fill', seventyThruSeventyfive);
        }else if (data[i].medHouseIncome >= 75000 && data[i].medHouseIncome < 80000){
            st.style('fill', seventyfiveThruEighty);
        }else if (data[i].medHouseIncome >= 80000 && data[i].medHouseIncome < 85000){
            st.style('fill', eightyThruEightyfive);
        }else if (data[i].medHouseIncome >= 85000){
            st.style('fill', overEightyfive);
        }
    }

    d3.select(window).on('recize', function() {
        map.resize ();
    });
});
