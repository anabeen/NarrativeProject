d3.csv('https://raw.githubusercontent.com/anabeen/NarrativeProject/main/MedianIncome.csv', 
function(data) {
    data.forEach(function(d) {
        d.Income = +d.Income;
        d["Year Ago from period"] = +d["Year Ago from period"];
        d["NumBillionaireResidents"] = +d["NumBillionaireResidents"];
        //console.log(d.States);
      });        
      //console.log(data[0].NumBillionaireResidents);

  });

d3.csv('https://raw.githubusercontent.com/anabeen/NarrativeProject/main/MedianIncome.csv', function(d) {
return {
        States: d.States,
        medHouseIncome: +d.Income.replace(',',''),
        BillionaireCount: +d["NumBillionaireResidents"],
    };
}, function (data) {

    const map = new Datamap({
        scope: 'usa',
        element: document.getElementById('mapContainer'),
        responsive: true,
        geographyConfig: {
            highlightOnHover: false,
            popupTemplate: function(geo){

                //console.log(geo.properties.name);
                //console.log(typeof geo.properties.name);
                //console.log(data[0].States);
                //console.log(typeof data[0].States);

                function findState(states) {
                    for (var i=0; i < data.length; i++){
                        if (data[i].States == states)
                        {
                            return i;
                        }
                    }
                }

                //console.log(data[findState(geo.properties.name)].medHouseIncome);

                return [
                    '<div class = "hoverinfo"><strong>',
                    geo.properties.name,
                    ': $ ' + data[findState(geo.properties.name)].medHouseIncome,
                    '\r\n Num of Billionaire Residents ' + data[findState(geo.properties.name)].BillionaireCount,
                    '</strong></div>'].join('');
            }
        }
    });

            
    //loop through each state and assign color based on income
    for (var i=0; i < data.length; i++){
        let st = d3.select('.' + data[i].States);

        //d3.select('.' + data[i].States).style("fill", "red");

        //st.style("fill", "red");

        if (data[i].medHouseIncome < 50000){
            st.style("fill", "red");
        } else if (data[i].medHouseIncome >= 50000 && data[i].medHouseIncome < 55000){
            st.style('fill', '#1D231E');
        }else if (data[i].medHouseIncome >= 55000 && data[i].medHouseIncome < 60000){
            st.style('fill', '#1D231E');
        }else if (data[i].medHouseIncome >= 60000 && data[i].medHouseIncome < 65000){
            st.style('fill', '#1D231E');
        }else if (data[i].medHouseIncome >= 65000 && data[i].medHouseIncome < 70000){
            st.style('fill', '#1D231E');
        }else if (data[i].medHouseIncome >= 70000 && data[i].medHouseIncome < 75000){
            st.style('fill', '#1D231E');
        }else if (data[i].medHouseIncome >= 75000 && data[i].medHouseIncome < 80000){
            st.style('fill', '#1D231E');
        }else if (data[i].medHouseIncome >= 80000 && data[i].medHouseIncome < 85000){
            st.style('fill', '#1D231E');
        }else if (data[i].medHouseIncome >= 85000){
            st.style('fill', '#1D231E');
        }
    }

    d3.select(window).on('resize', function() {
        map.resize ();
    });
});
