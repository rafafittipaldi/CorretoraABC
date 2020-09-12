
window.onload = function() {
	
	var dataArrayEMA = [];
    $.ajax({
        async: false,
        url: "char",
        dataType:"json",
        success: function(quote) {
	  	      $.each(quote.dias, function(idx1, diaOperacao){
	      			var date = new Date(diaOperacao.date);
		  	    	dataArrayEMA.push([
		  	    		date, 
		  	    		Number(diaOperacao.open),  
		  	    		Number(diaOperacao.close),
		  	    		Number(diaOperacao.ema9),
		  	    		Number(diaOperacao.ema12),
		  	    		Number(diaOperacao.ema26)
		  	    	]);
	  	      });
	  	      drawChartEMA(dataArrayEMA);
  	      }
    });
      
	var dataArrayMACD = [];
    $.ajax({
        async: false,
        url: "char",
        dataType:"json",
        success: function(quote) {
	  	      $.each(quote.dias, function(idx1, diaOperacao){
	      			var date = new Date(diaOperacao.date);
		  	    	dataArrayMACD.push([
		  	    		date, 
		  	    		Number(diaOperacao.macd)
		  	    	]);
	  	      });
	  	      drawChartMACD(dataArrayMACD);
  	      }
      });
};


google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChartEMA);

function drawChartEMA(dataArray) {

      var data = new google.visualization.DataTable();
      data.addColumn('date',   'DATA');
      data.addColumn('number', 'ABERTURA');
      data.addColumn('number', 'FECHAMENTO');
      data.addColumn('number', 'EMA9');
      data.addColumn('number', 'EMA12');
      data.addColumn('number', 'EMA26');
      
      data.addRows(dataArray);

      var options = {
	        hAxis: {
	          title: 'Period Time'
	        },
	        vAxis: {
	          title: 'Close and Open Values'
	        },
	        colors: ['#008000', '#FF0000', '#FFFF00', '#FFA500', '#0000FF'],
	        chartArea: {
				width:'70%',
				height:'60%'
			},
			explorer: {
				maxZoomOut:2,
				keepInBounds: true
			}
	        
	      };
	      
	      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	      chart.draw(data, options);
}
 
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawChartMACD);

function drawChartMACD(dataArray) {
      var data = new google.visualization.DataTable();
      
      data.addColumn('date',   'DATA');
      data.addColumn('number', 'MACD');
      
      data.addRows(dataArray);

     var options = {
       title: 'MACD EMA 9 and 26,',
       width: 1000,
       height: 300,
       maxZoomOut:2,
	   keepInBounds: true,
       bar: {groupWidth: '95%'},
       vAxis: { gridlines: { count: 4 } }
     };
     
     var chart = new google.visualization.LineChart(document.getElementById('number_format_chart'));
     chart.draw(data, options);
     
	 $('#format-select').change(function(){
        options['vAxis']['format'] = this.value;
        chart.draw(data, options);
	 })
  };