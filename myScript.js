
			//Width and height
			var wC = 200;
			var hC = 200;
			var w = 1150,
				h = 650,
			formatPercent = d3.format(".0%"),
    		formatNumber = d3.format(".0f");
			var dataset = [ 5, 10, 13, 19, 10];
			
			var dataset1= [100];
			
			var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, wC], 0.05);
			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, hC]);


			var x = d3.scale.ordinal()
			.domain(d3.range(dataset.length))
    				.rangeRoundBands([0, wC], 0.05);

			var y = d3.scale.linear()
    					.range([hC, 0]);

			var xAxis = d3.svg.axis()
    							.scale(x)
    						.orient("bottom");

			var yAxis = d3.svg.axis()
    							.scale(y)
    							.orient("left")
    							.ticks(5, "%");


			//Define map projection
			var projection = d3.geo.albersUsa()
								   .translate([w/3, h/3])
								   .scale([950]);
			//Define path generator
			var path = d3.geo.path()
							 .projection(projection);
							 
			//Define quantize scale to sort data values into buckets of color
			var color = d3.scale.quantize()
								.range(['rgb(222,235,247)','rgb(158,202,225)','rgb(49,130,189)']);
								//Colors taken from colorbrewer.js, included in the D3 download
			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			


			//Load in agriculture data
			d3.csv("us-ag-productivity-2004.csv", function(data) {
				//Set input domain for color scale
				color.domain([
					d3.min(data, function(d) { return d.value; }), 
					d3.max(data, function(d) { return d.value; })
				]);
				//Load in GeoJSON data
				d3.json("us-states1.json", function(json) {
					//Merge the ag. data and GeoJSON
					//Loop through once for each ag. data value

					for (var i = 0; i < data.length; i++) {
				
						var dataState = data[i].state;				//Grab state name
						var dataValue = parseFloat(data[i].value);	//Grab data value, and convert from string to float
				
						//Find the corresponding state inside the GeoJSON
						for (var j = 0; j < json.features.length; j++) {
						
							var jsonState = json.features[j].properties.name;
				
							if (dataState == jsonState) {
						
								//Copy the data value into the JSON
								json.features[j].properties.value = dataValue;
								
								//Stop looking through the JSON
								break;
								
							}
						}		
					}
					//Bind data and create one path per GeoJSON feature
					svg.selectAll("path")
					   .data(json.features)
					   .enter()
					   .append("path")
					   .attr("d", path)
					   .attr("border","black")
					   .attr("stroke", "black")
					   .attr("fill", function(d) {
					   		//Get data value
					   		var value = d.properties.value;
					   		
					   		if (value) {
					   			//If value exists…
						   		return color(value);
					   		} else {
					   			//If value is undefined…
						   		return "#ccc";
					   		}
					   })
					   .on("click", function (d){
					


					d3.csv("XLabel.csv", function(data) {
							
					   	var dataset=[];
					   	

					   	if (d.properties.name=="Alaska"){

						dataset = [0.0, 0.0, 0.0, 0.0, 16.9];
						yScale.domain([0, d3.max(dataset1)]);
						svg.selectAll("rect.bar")
					   .data(dataset)
					   .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					   .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });

					   	
			
						}		

						if (d.properties.name=="Florida"){
						dataset = [0.6, 0.8, 22.2, 20.3, 0.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			 
						}
							if (d.properties.name=="Washington"){
						dataset = [0,0.2, 25.6, 0.0, 0.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
						}	if (d.properties.name=="Oregon"){
						dataset = [10, 0.2, 13.2, 0.0, 36.5];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
					   
			
						}	if (d.properties.name=="California"){
						dataset = [25.8,0.0,0.0,7.9,9.8];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					  

			
			
						}	if (d.properties.name=="Nevada"){
						dataset = [0,0, 10.1, 11.0, 14.1];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
				
			
			
						}	if (d.properties.name=="Arizona"){
						dataset = [18.0,6.1,10.4,10.2,15.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
			
						}	if (d.properties.name=="Idaho"){
						dataset = [5.5, 8.1, 18.1,10.0,18.8];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
			
						}	if (d.properties.name=="Utah"){
						dataset = [2, 6.6, 29.0, 7.2, 11.5];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
				
			
			
						}	if (d.properties.name=="New Mexico"){
						dataset = [0,0,0,0, 9.8];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
			
						}	if (d.properties.name=="Colorado"){
						dataset = [5.0,9.0,12.0,12.2,22.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			 
	
			
						}
						if (d.properties.name=="Wyoming"){
						dataset = [0,6.4,15.9, 13.3, 25.9];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
			
			
						}if (d.properties.name=="Montana"){
						dataset = [0,0, 12.6, 14.8, 27.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    

			
			
						}if (d.properties.name=="Texas"){
						dataset = [6.7, 17.2, 0.3, 47.2, 10.9];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
			
						}if (d.properties.name=="Oklahoma"){
						dataset = [0, 11.2, 8.4, 10.3, 12.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
						}if (d.properties.name=="Kansas"){
						dataset = [0.0, 8.7, 10.8, 11.5, 25.8];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			 
					   
					
			
						}if (d.properties.name=="Nebraska"){
						dataset = [0,0, 9.6, 13.4, 38.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
			
			
						}if (d.properties.name=="South Dakota"){
						dataset = [0,0, 7.1, 10.4, 40.7];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			

				
						}
						if (d.properties.name=="North Dakota"){
						dataset = [0,0,0,7.7, 43.9];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
						}if (d.properties.name=="Minnesota"){
						dataset = [0,0, 6.3, 11.2, 36.7];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			
			
						}if (d.properties.name=="Iowa"){
						dataset = [0, 6.6, 9.5, 13.5, 35.7];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
				
			
			
						}if (d.properties.name=="Arkansas"){
						dataset = [9.9,15.7,7.9,9.5,9.3];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
			
			
						}if (d.properties.name=="Missouri"){
						dataset = [8.8, 10.4, 9.5, 12.7, 23.5];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
			
						}if (d.properties.name=="Wisconsin"){
						dataset = [0,0,6.5, 10.9, 42.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
			
						}if (d.properties.name=="Illinois"){
						dataset = [11.5, 0 ,0 , 12.2, 19.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
				
			
			
						}if (d.properties.name=="Kentucky"){
						dataset = [5.7,20.7, 9.7, 10.5, 12.7];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
				
			
			
						}
						if (d.properties.name=="Tennessee"){
						dataset = [13.0, 17.3, 9.1, 9.3, 8.3];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			 
					   

			
						}if (d.properties.name=="Alabama"){
						dataset = [19.9, 16.8,7.8,7.7,5.7];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			
					   
			
			
						}if (d.properties.name=="Indiana"){
						dataset = [6.5, 11.8, 8.9, 10.8, 22.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
				
			
			
						}if (d.properties.name=="Michigan"){
						dataset = [11.0, 0, 9.9, 10.7, 20.4];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
			
						}if (d.properties.name=="Ohio"){
						dataset = [9.1, 0,9.2, 12.7, 25.2];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
		
			
			
						}if (d.properties.name=="Virginia"){
						dataset = [14.9, 11.2, 11.1,9.8, 11.7];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			 
					   
					
						}
			if (d.properties.name=="West Virginia"){
						dataset = [0,18.7, 9.7, 11.0,14.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
			
			
						}if (d.properties.name=="North Carolina"){
						dataset = [16.6, 13.7, 9.5, 7.4, 9.5];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			
			
		
			
						}if (d.properties.name=="South Carolina"){
						dataset = [22.8, 13.7, 8.2, 7.9, 8.4];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			
					   
				
			
						}if (d.properties.name=="Georgia"){
						dataset = [1.6, 13.3,8.1,2.8,7.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			

				
			
						}if (d.properties.name=="Maryland"){
						dataset = [20.5, 5.6, 9.0, 11.7, 15.7];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			
						}if (d.properties.name=="Delaware"){
						dataset = [14.0,9.3, 12.1, 16.6, 14.3];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
			
						}if (d.properties.name=="Pennsylvania"){
						dataset = [7.4, 0, 7.9, 16.1, 25.4];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					
			
			
						}if (d.properties.name=="New York"){
						dataset = [0,7.7, 6.0, 12.9, 11.2];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
			
			
			
						} if (d.properties.name=="Vermont"){
						dataset = [0,0,18.4, 16.4, 9.1];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
	
			
			
						}if (d.properties.name=="New Hampshire"){
						dataset = [0,0, 18.0, 0.0, 8.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			 
					   
					
			
						}if (d.properties.name=="Maine"){
						dataset = [0, 9.3, 21.5, 15.1, 0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					  
			
			
						}if (d.properties.name=="Massachusetts"){
						dataset = [8.6,0.0, 11.4, 0.0, 5.9];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
			
			
			
						}if (d.properties.name=="Connecticut"){
						dataset = [0.6,5.0,10.3,0.0,34.8];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
			
						} if (d.properties.name=="Rhode Island"){
						dataset = [0,0, 12.0, 18.4, 0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
			
						}

						if (d.properties.name=="New Jersey"){
						dataset = [29.8, 0, 0, 0.0, 2.6];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
						}
						if (d.properties.name=="Louisiana"){
						dataset = [25.5, 10.0, 0, 37.0, 7.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					   
			 
					   
			
						}
						if (d.properties.name=="Hawaii"){
						dataset = [5.6, 2.1, 2.2, 2.3, 5.0];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
				
			
			
						}



						if (d.properties.name=="Mississippi"){
						dataset = [28.3, 14.0, 6.1, 16.9, 4.5];
						yScale.domain([0, d3.max(dataset1)]);

						svg.selectAll("rect.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .duration(1000)
					   .attr("y", function(d) {
					   		return hC - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + (d * 10) + ")";
					   });
					   
					//Update all labels
					svg.selectAll("text.bar")
					   .data(dataset)
					      .attr("class", "bar")
					   .transition()
					   .delay (function (d, i){
					   	return i / dataset.length*1000;
					   })
					   .duration(2000)
					   .ease ("bounce")
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.rangeBand() / 2;
					   })
					   .attr("y", function(d) {
					   		return hC - yScale(d) + 14;
					   });
					    
					   
					
			
			
						}
  	
  	var label  = ["Corn", "Wheat", "Soybeans", "Cotton", "Hay"]

  
x.domain(data.map( function(d, i){ return label[i]; }));
yScale.domain([0, d3.max(dataset1)]);

  	svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(925," + (hC+15) + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform",  " rotate(-50)" );

  svg.append("g")
  .attr("transform", "translate(915, 15)")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .text("Intensity");


			svg.selectAll("rect.bar")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("class", "bar")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return hC - yScale(d);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   })
			   .on("click", function(d) {
			   		console.log(d);
			   }).attr("transform", "translate(925, 15)");
			
			   //Exit…
					

			//Create labels
			svg.selectAll("text.bar")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .attr("class", "bar")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return hC - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white")
			
		   .attr("transform", "translate(925, 15)");



		





		
			



			});
})
					.on("mouseover", function (d) {
						   
						

			   		
			   			d3.select("#tooltipState")
			   			.style("left", (d3.event.pageX) + "px")     
				.style("top", (d3.event.pageY - 28) + "px")
			   			.select("#value")
			   			.html(d.properties.name + '<br/>'+ "Factor Productivity (%): "+ d.properties.value );

			   			

			   			d3.select("#tooltipState").classed("hiddenState", false);



					   })
						   .on("mouseout", function(){


						   	d3.select("#tooltipState").classed("hiddenState", true);
						   });
					    
					//Load in cities data
					d3.csv("10cities_versione3.csv", function(data) {
						
						svg.selectAll("circle")
						   .data(data)
						   .enter()
						   .append("circle")
						   .attr("cx", function(d) {
							   return projection([d.lon, d.lat])[0];
						   })
						   .attr("cy", function(d) {
							   return projection([d.lon, d.lat])[1];
						   })
						   .attr("r", function(d) {
								return Math.sqrt(parseInt(d.garden)* 0.6); //sostituisco 0.00009
						   })
						   .attr("fill", "blue")
						   .on("mouseover", function (d) {
						   
					

			   			d3.select("#tooltip")
			   			.style("left", (d3.event.pageX) + "px")     
				.style("top", (d3.event.pageY - 28) + "px")
			   			.select("#value")
			   			.html(d.place + "<br/>" + "N. community gardens: "+ d.garden);


			   			d3.select("#tooltip").classed("hidden", false);



					   })
						   .on("mouseout", function(){


						   	d3.select("#tooltip").classed("hidden", true);
						   });
						
					});
			
				});
			
			});
var color_domain = [50, 150, 350, 750, 1500]
var colors = d3.scale.threshold()
  .domain(color_domain)
  .range(['rgb(222,235,247)','rgb(158,202,225)','rgb(49,130,189)']);
 var width = 960,
  height = 600;
var ext_color_domain = [0, 50, 150, 1500]
  var legend_labels = ["20% Agriculture activities", "40% Agriculture activities", "60% Agriculture activities", "> 80% Agriculture activities"] 
    var legend = svg.selectAll("g.legend")
  .data(ext_color_domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 20, ls_h = 20;

  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d, i) { return colors(d); })
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 50)
  .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
  .text(function(d, i){ return legend_labels[i]; });

