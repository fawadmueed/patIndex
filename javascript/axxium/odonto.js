
  function drawRest(ctx,aColor1,aColor2,aList)
  {
      		for (cd in aList)
      		{
    	  		if (aList[cd]["tooth"] && aList[cd].code == "23111" || aList[cd]["tooth"] && aList[cd].code == "23112" || aList[cd]["tooth"] && aList[cd].code == "23113" || aList[cd]["tooth"] && aList[cd].code == "23211")
    	  			{
					ctx.strokeStyle = "#"+aColor2;
					ctx.fillStyle = "#"+aColor2;
					ctx.lineWidth=3;
    	  				surf = aList[cd]["surface"];
    	  				//alert(aList[cd].code);
    	  				for (var i = 0, len = surf.length; i < len; i++)
    	  				{
    	  				    if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				    {
    	  					pos = mapping[aList[cd]["tooth"]+surf[i]];
						ctx.beginPath();
						ctx.ellipse(pos.x*odoX,pos.y*odoY,(pos.dx)*odoX,(pos.dy)*odoY, 0, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.fill();
    	  				    }
    	  				}
    	  			}
    	  		if (aList[cd]["tooth"] && aList[cd].code == "23114")
    	  			{
					ctx.strokeStyle = "#"+aColor2;
					ctx.fillStyle = "#"+aColor2;
					ctx.lineWidth=1;
    	  				pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  				if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				{
						if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-40)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
						else
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+40)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
					}
    	  			}
    	  		if (aList[cd]["tooth"] && aList[cd].code == "23115")
    	  			{
					ctx.strokeStyle = "#"+aColor2;
					ctx.fillStyle = "#"+aColor2;
					ctx.lineWidth=1;
    	  				pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  				if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				{
						if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-20)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
						else
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+20)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
					}
    	  			}
    	  		if (aList[cd]["tooth"] && aList[cd].code.substr(0,3) == "212")
    	  			{
					ctx.strokeStyle = "#"+aColor1;
					ctx.fillStyle = "#"+aColor1;
					ctx.lineWidth=3;
    	  				surf = aList[cd]["surface"];
    	  				for (var i = 0, len = surf.length; i < len; i++)
    	  				{
    	  				    if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				    {
    	  					pos = mapping[aList[cd]["tooth"]+surf[i]];
    	  					if (surf[i] == "O")
    	  						{
								ctx.beginPath();
								ctx.ellipse(pos.x*odoX,pos.y*odoY,(pos.dx-4)*odoX,(pos.dy-3)*odoY, 0, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fill();
    	  						}
    	  					else
    	  						{
    	  							ctx.fillRect(pos.x*odoX,pos.y*odoY,pos.dx*odoX,pos.dy*odoY);
    	  						}
    	  				    }
    	  				}
    	  			}
    	  		if (aList[cd]["tooth"] && aList[cd].code.substr(0,3) == "232")
    	  			{
					ctx.strokeStyle = "#"+aColor2;
					ctx.fillStyle = "#"+aColor2;
					ctx.lineWidth=3;
    	  				surf = aList[cd]["surface"];
    	  				for (var i = 0, len = surf.length; i < len; i++)
    	  				{
    	  				    if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				    {
    	  					pos = mapping[aList[cd]["tooth"]+surf[i]];
    	  					if (surf[i] == "O")
    	  						{
								ctx.beginPath();
								ctx.ellipse(pos.x*odoX,pos.y*odoY,(pos.dx-4)*odoX,(pos.dy-3)*odoY, 0, 0, 2 * Math.PI);
								ctx.closePath();
								ctx.fill();
    	  						}
    	  					else
    	  						{
    	  							ctx.fillRect(pos.x*odoX,pos.y*odoY,pos.dx*odoX,pos.dy*odoY);
    	  						}
    	  				    }
    	  				}
    	  			}
    	  	}
  }

  function drawExo(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	ctx.lineWidth=3;

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  	{
    	  		pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  		if ((aList[cd].code.substr(0,2) == "71" || aList[cd].code.substr(0,2) == "72"))
    	  		{
    	  			if (aList[cd].code.substr(0,4) == "7230")
    	  			{
					if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
					{
    	  					ctx.fillRect(pos.x*odoX,(pos.y+(pos.dy*0.4))*odoY,pos.dx*odoX,(pos.dy*0.15)*odoY);
    	  				}
    	  				else
    	  				{
    	  					ctx.fillRect(pos.x*odoX,(pos.y+(pos.dy*0.45))*odoY,pos.dx*odoX,(pos.dy*0.15)*odoY);
    	  				}
    	  			}
    	  			else if (aList[cd].code.substr(0,4) == "7231")
    	  			{
					if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
					{
    	  					ctx.fillRect(pos.x*odoX,(pos.y+(pos.dy*0.3))*odoY,pos.dx*odoX,(pos.dy*0.25)*odoY);
    	  				}
    	  				else
    	  				{
    	  					ctx.fillRect(pos.x*odoX,(pos.y+(pos.dy*0.45))*odoY,pos.dx*odoX,(pos.dy*0.25)*odoY);
    	  				}
    	  			}
    	  			else
    	  			{
    	  				ctx.fillRect(pos.x*odoX,pos.y*odoY,pos.dx*odoX,pos.dy*odoY);
    	  			}
    	  		}
    	  	}
    	  }
  }

  function drawExo2(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	ctx.lineWidth=3;

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  	{
    	  		if ((aList[cd].code.substr(0,2) == "71" || aList[cd].code.substr(0,2) == "72"))
    	  		{
    	  			pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  			//ctx.fillRect(pos.x*odoX,pos.y*odoY,pos.dx*odoX,pos.dy*odoY);
				ctx.beginPath();
				ctx.moveTo(pos.x*odoX,pos.y*odoY);
				ctx.lineTo((pos.x+pos.dx)*odoX,(pos.y+pos.dy)*odoY);
				ctx.stroke();
				ctx.closePath();
    	  		}
    	  	}
    	  }
  }

  function drawEnd(ctx,aColor,aList)
  {
		ctx.strokeStyle = "#"+aColor;
		ctx.fillStyle = "#"+aColor;
		ctx.lineWidth=3;

      		for (cd in aList)
      		{
    	  		if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  		{
    	  			if (aList[cd].code.substr(0,2) == "33")
    	  			{
    	  				pos = mapping[aList[cd]["tooth"]+"Ex"];
					ctx.beginPath();
					if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
					{
						//ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy/3.7))*odoY,pos.dx*odoX/2,pos.dy*odoY/3.7, 0, 0, 2 * Math.PI);
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2))*odoX,(pos.y+12)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2))*odoX,(pos.y+2+(pos.dy/3))*odoY);
						ctx.stroke();
						ctx.closePath();
					}
					else
					{
						//ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy/1.4))*odoY,pos.dx*odoX/2,pos.dy*odoY/3.7, 0, 0, 2 * Math.PI);
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy*0.667))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy-12))*odoY);
						ctx.stroke();
						ctx.closePath();
					}
					ctx.stroke();
					ctx.closePath();
					//ctx.fill();
    	  			}
    	  		}
    	  	}
  }

  function drawPer(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	ctx.lineWidth=3;

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  	{
    	  		if (aList[cd].code == "00001")
    	  		{
    	  			pos = mapping[aList[cd]["tooth"]+"Ex"];
				if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
				{
					ctx.fillRect(pos.x*odoX,(pos.y+10)*odoY,(pos.dx/3)*odoX,3);
					ctx.fillRect((pos.x+(pos.dx*2/3))*odoX,(pos.y+10)*odoY,(pos.dx/3)*odoX,3);
					ctx.beginPath();
					ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+7)*odoY,(pos.dx/4)*odoX,6*odoY, 0, 2.5, 7);
					ctx.stroke();
					ctx.closePath();
				}
				else
				{
					ctx.fillRect(pos.x*odoX,(pos.y+pos.dy-10)*odoY,(pos.dx/3)*odoX,3);
					ctx.fillRect((pos.x+(pos.dx*2/3))*odoX,(pos.y+pos.dy-10)*odoY,(pos.dx/3)*odoX,3);
					ctx.beginPath();
					ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+pos.dy-7)*odoY,(pos.dx/4)*odoX,6*odoY, 0, -0.5, 3.5);
					ctx.stroke();
					ctx.closePath();
				}
    	  		}
    	  	}
    	  }
  }

  function drawEtr(ctx,aColor,aList)
  {
		ctx.strokeStyle = "#"+aColor;
		ctx.fillStyle = "#"+aColor;
		ctx.lineWidth=3;

      		for (cd in aList)
      		{
    	  		if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  		{
    	  			if (aList[cd].code == "00002")
    	  			{
    	  				pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  				//ctx.fillRect(pos.x*odoX,pos.y*odoY,pos.dx*odoX,pos.dy*odoY);
					ctx.beginPath();
					if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
					{
						ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+10)*odoY,pos.dx*odoX/2,6*odoY, 0, 0, 2 * Math.PI);
					}
					else
					{
						ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy-10))*odoY,pos.dx*odoX/2,6*odoY, 0, 0, 2 * Math.PI);
					}
					ctx.stroke();
					ctx.closePath();
					//ctx.fill();
    	  			}
    	  		}
    	  	}
  }

  function drawInc(ctx,aColor,aList)
  {
		ctx.strokeStyle = "#"+aColor;
		ctx.fillStyle = "#"+aColor;
		ctx.lineWidth=3;

      		for (cd in aList)
      		{
    	  		if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  		{
    	  			if (aList[cd].code == "00003")
    	  			{
    	  				pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  				//ctx.fillRect(pos.x*odoX,pos.y*odoY,pos.dx*odoX,pos.dy*odoY);
					ctx.beginPath();
					if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
					{
						ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy/3.7))*odoY,pos.dx*odoX/2,pos.dy*odoY/3.7, 0, 0, 2 * Math.PI);
					}
					else
					{
						ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy/1.4))*odoY,pos.dx*odoX/2,pos.dy*odoY/3.7, 0, 0, 2 * Math.PI);
					}
					ctx.stroke();
					ctx.closePath();
					//ctx.fill();
    	  			}
    	  		}
    	  	}
  }

  function drawRto(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	ctx.lineWidth=3;

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  	{
    	  		if ((aList[cd].code == "00011" || aList[cd].code == "00012"))
    	  		{
    	  			pos = mapping[aList[cd]["tooth"]+"Ex"];
				if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
				{
					ctx.beginPath();
					ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy-90))*odoY,(pos.dx/4)*odoX,6*odoY, 0, 2.5, 7);
					ctx.stroke();
					ctx.closePath();
					if (aList[cd].code == "00011")
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)-13)*odoX,(pos.y+(pos.dy-92))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-8)*odoX,(pos.y+(pos.dy-86))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-3)*odoX,(pos.y+(pos.dy-92))*odoY);
						ctx.stroke();
						ctx.closePath();
					}
					else
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)+13)*odoX,(pos.y+(pos.dy-92))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+8)*odoX,(pos.y+(pos.dy-86))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+3)*odoX,(pos.y+(pos.dy-92))*odoY);
						ctx.stroke();
						ctx.closePath();
					}
				}
				else
				{
					ctx.beginPath();
					ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+91)*odoY,(pos.dx/4)*odoX,6*odoY, 0, 2.5, 7);
					ctx.stroke();
					ctx.closePath();
					if (aList[cd].code == "00011")
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)-13)*odoX,(pos.y+(pos.dy-83))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-8)*odoX,(pos.y+(pos.dy-77))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-3)*odoX,(pos.y+(pos.dy-83))*odoY);
						ctx.stroke();
						ctx.closePath();
					}
					else
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)+13)*odoX,(pos.y+(pos.dy-83))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+8)*odoX,(pos.y+(pos.dy-77))*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+3)*odoX,(pos.y+(pos.dy-83))*odoY);
						ctx.stroke();
						ctx.closePath();
					}
				}
    	  		}
    	  	}
    	  }
  }

  function drawRbo(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	ctx.lineWidth=3;

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  	{
    	  		if ((aList[cd].code == "00013" || aList[cd].code == "00014"))
    	  		{
    	  			pos = mapping[aList[cd]["tooth"]+"Ex"];
				if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
				{
					ctx.beginPath();
					ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy-90))*odoY,(pos.dx/4)*odoX,6*odoY, 0, -0.5, 3.5);
					ctx.stroke();
					ctx.closePath();
					if (aList[cd].code == "00013")
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)-14)*odoX,(pos.y+84)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-9)*odoX,(pos.y+78)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-4)*odoX,(pos.y+84)*odoY);
						ctx.stroke();
						ctx.closePath();
					}
					else
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)+14)*odoX,(pos.y+84)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+9)*odoX,(pos.y+78)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+4)*odoX,(pos.y+84)*odoY);
						ctx.stroke();
						ctx.closePath();
					}
				}
				else
				{
					ctx.beginPath();
					ctx.ellipse((pos.x+(pos.dx/2))*odoX,(pos.y+91)*odoY,(pos.dx/4)*odoX,6*odoY, 0, -0.5, 3.5);
					ctx.stroke();
					ctx.closePath();
					if (aList[cd].code == "00013")
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)-14)*odoX,(pos.y+93)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-9)*odoX,(pos.y+87)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)-4)*odoX,(pos.y+93)*odoY);
						ctx.stroke();
						ctx.closePath();
					}
					else
					{
						ctx.beginPath();
						ctx.moveTo((pos.x+(pos.dx/2)+14)*odoX,(pos.y+93)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+9)*odoX,(pos.y+87)*odoY);
						ctx.lineTo((pos.x+(pos.dx/2)+4)*odoX,(pos.y+93)*odoY);
						ctx.stroke();
						ctx.closePath();
					}
				}
    	  		}
    	  	}
    	  }
  }

  function drawPon(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	ctx.lineWidth=2;

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  	{
    	  		if ((aList[cd].code.substr(0,3) == "625" || aList[cd].code.substr(0,3) == "655"))
    	  		{
    	  			pos = mapping[aList[cd]["tooth"]+"Ex"];

				var p = document.createElement("canvas")
				p.width=16;
				p.height=8;
				var pctx=p.getContext('2d');

				var x0=18;
				var x1=-2;
				var y0=-1;
				var y1=9;
				var offset=16;

				pctx.strokeStyle = "#0000ff";
				pctx.lineWidth=2;
				pctx.beginPath();
				pctx.moveTo(x0,y0);
				pctx.lineTo(x1,y1);
				pctx.moveTo(x0-offset,y0);
				pctx.lineTo(x1-offset,y1);
				pctx.moveTo(x0+offset,y0);
				pctx.lineTo(x1+offset,y1);
				pctx.stroke();

				ctx.fillStyle=ctx.createPattern(p,'repeat');

				if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
				{
					ctx.beginPath();
					ctx.arc((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy*0.667))*odoY,pos.dx*odoX/3, 0, 2 * Math.PI, true);
					ctx.stroke();
					ctx.fill();
					ctx.closePath();
				}
				else
				{
					ctx.beginPath();
					ctx.arc((pos.x+(pos.dx/2))*odoX,(pos.y+(pos.dy*.333))*odoY,pos.dx*odoX/3, 0, 2 * Math.PI, true);
					ctx.stroke();
					ctx.fill();
					ctx.closePath();
				}
    	  		}
    	  	}
    	  }
  }

  function drawCou(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	ctx.lineWidth=2;

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50)))
    	  	{
    	  		if (aList[cd].code.substr(0,2) == "27")
    	  		{
    	  			pos = mapping[aList[cd]["tooth"]+"Ex"];

				if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
				{
					ctx.strokeRect(pos.x*odoX,(pos.y+(pos.dy*0.56))*odoY,(pos.dx-3)*odoX,(pos.dy/5)*odoY);
				}
				else
				{
					ctx.strokeRect(pos.x*odoX,(pos.y+(pos.dy*0.24))*odoY,(pos.dx-3)*odoX,(pos.dy/5)*odoY);
				}
    	  		}
    	  	}
    	  }
  }

  function drawCar(ctx,aColor,aList)
  {
	ctx.strokeStyle = "#"+aColor;
	ctx.fillStyle = "#"+aColor;
	// console.log(aList);

      	for (cd in aList)
      	{
    	  	if (aList[cd]["tooth"] && (aList[cd].code == "23111" || aList[cd].code == "23112" || aList[cd].code == "23113"))
    	  			{
    	  				surf = aList[cd]["surface"];
					ctx.lineWidth=4;
    	  				for (var i = 0, len = surf.length; i < len; i++)
    	  				{
    	  				    if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				    {
    	  					pos = mapping[aList[cd]["tooth"]+surf[i]];
						ctx.beginPath();
						ctx.ellipse(pos.x*odoX,pos.y*odoY,(pos.dx)*odoX,(pos.dy)*odoY, 0, 0, 2 * Math.PI);
						ctx.closePath();
						ctx.stroke();
    	  				    }
    	  				}
    	  			}
    	  	if (aList[cd]["tooth"] && aList[cd].code == "23114")
    	  			{
					ctx.lineWidth=1;
    	  				pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  				if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				{
						if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-40)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
						else
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+40)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
					}
    	  			}
    	  	if (aList[cd]["tooth"] && aList[cd].code == "23115")
    	  			{
					ctx.lineWidth=1;
    	  				pos = mapping[aList[cd]["tooth"]+"Ex"];
    	  				if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  				{
						if ((showAdult && aList[cd]["tooth"] < 30) || (!showAdult && aList[cd]["tooth"] < 70))
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-20)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+pos.dy-6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
						else
						{
							ctx.beginPath();
							ctx.moveTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+20)*odoY);
							ctx.lineTo((pos.x+11)*odoX,(pos.y+6)*odoY);
							ctx.lineTo((pos.x+3)*odoX,(pos.y+6)*odoY);
							ctx.fill();
							ctx.closePath();
						}
					}
    	  			}
    	  	if (aList[cd]["tooth"] && (aList[cd].code.substr(0,4) == "2121" || aList[cd].code.substr(0,4) == "2321" || aList[cd].code.substr(0,4) == "2122" || aList[cd].code.substr(0,4) == "2322"))
    	  		{
    	  			surf = aList[cd]["surface"];
				ctx.lineWidth=4;
    	  			for (var i = 0, len = surf.length; i < len; i++)
    	  			{
    	  			    if ((showAdult && aList[cd]["tooth"] < 50) || (!showAdult && aList[cd]["tooth"] > 50))
    	  			    {
    	  				pos = mapping[aList[cd]["tooth"]+surf[i]];
    	  				console.log(aList[cd].code+" / "+aList[cd]["tooth"]+" / "+surf+" / "+pos);
    	  				if (surf[i] == "O")
    	  					{
							ctx.beginPath();
							ctx.ellipse(pos.x*odoX,pos.y*odoY,(pos.dx-4)*odoX,(pos.dy-3)*odoY, 0, 0, 2 * Math.PI);
							ctx.closePath();
							ctx.stroke();
    	  					}
    	  				else
    	  					{
    	  						ctx.strokeRect(pos.x*odoX,pos.y*odoY,pos.dx*odoX,pos.dy*odoY);
    	  					}
    	  			    }
    	  			}
    	  		}
    	  }
  }

  function cancelSelo()
  {
	$('.modalSelo.modal').modal('hide');
  }

  function resetSeloButtons()
  {
	if(curKind == 'Observations')		document.getElementById("oB0").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB0").setAttribute("class","ui axxium small button");
	if(curKind == 'Restauration')		document.getElementById("oB1").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB1").setAttribute("class","ui axxium small button");
	if(curKind == 'Endodontie')		document.getElementById("oB2").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB2").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses fixes')	document.getElementById("oB3").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB3").setAttribute("class","ui axxium small button");
	if(curKind == 'Chirurgie')		document.getElementById("oB4").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB4").setAttribute("class","ui axxium small button");
	if(curKind == 'Parodontie')		document.getElementById("oB5").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB5").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses amovibles')	document.getElementById("oB6").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB6").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèse complète')	document.getElementById("oB7").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB7").setAttribute("class","ui axxium small button");
	if(curKind == 'Prothèses complète et partielle') document.getElementById("oB8").setAttribute("class","ui axxium small disabled button"); else document.getElementById("oB8").setAttribute("class","ui axxium small button");
  }

  function selectBLO()
  {
	textS = "";
	isBucO = true;
	document.getElementById("butBucO").setAttribute("class","ui axxium tiny button");
	isLabO = true;
	document.getElementById("butLabO").setAttribute("class","ui axxium tiny button");
	$('.modalSeloBL.modal').modal('show');
  }

  function selectMDO()
  {
	textS = "";
	isMedO = true;
	document.getElementById("butMedO").setAttribute("class","ui axxium tiny button");
	isDisO = true;
	document.getElementById("butDisO").setAttribute("class","ui axxium tiny button");
	$('.modalSeloMD.modal').modal('show');
  }

  function selectSurfO()
  {
	textS = "";
	isMsO = true;
	document.getElementById("butMsO").setAttribute("class","ui axxium tiny button");
	isOsO = true;
	document.getElementById("butOsO").setAttribute("class","ui axxium tiny button");
	isDsO = true;
	document.getElementById("butDsO").setAttribute("class","ui axxium tiny button");
	isBsO = true;
	document.getElementById("butBsO").setAttribute("class","ui axxium tiny button");
	isLsO = true;
	document.getElementById("butLsO").setAttribute("class","ui axxium tiny button");
	$('.modalSeloSurf.modal').modal('show');
  }

  function setBucO() { isBucO = true; document.getElementById("butBucO").setAttribute("class","ui red tiny button"); addTextS("B"); }
  function setLabO() { isLabO = true; document.getElementById("butLabO").setAttribute("class","ui red tiny button"); addTextS("L"); }
  function setMedO() { isMedO = true; document.getElementById("butMedO").setAttribute("class","ui red tiny button"); addTextS("M"); }
  function setDisO() { isDisO = true; document.getElementById("butDisO").setAttribute("class","ui red tiny button"); addTextS("D"); }
  function setMsO() { isMsO = true; document.getElementById("butMsO").setAttribute("class","ui red tiny button"); addTextS("M"); }
  function setOsO() { isOsO = true; document.getElementById("butOsO").setAttribute("class","ui red tiny button"); addTextS("O"); }
  function setDsO() { isDsO = true; document.getElementById("butDsO").setAttribute("class","ui red tiny button"); addTextS("D"); }
  function setBsO() { isBsO = true; document.getElementById("butBsO").setAttribute("class","ui red tiny button"); addTextS("B"); }
  function setLsO() { isLsO = true; document.getElementById("butLsO").setAttribute("class","ui red tiny button"); addTextS("L"); }

  function closeBLO()
  {
	$('.modalSeloBL.modal').modal('hide');
  }

  function closeMDO()
  {
	$('.modalSeloMD.modal').modal('hide');
  }

  function closeSurfO()
  {
	$('.modalSeloSurf.modal').modal('hide');
  }

  function toggleOdon()
  {
        showAdult = !showAdult;
  		drawOdon("odonto");
      	displaySub("odontos");
  }

  function delODO()
  {
  	var ctrp = 0;
  	var qNewExist = [ ];
  	for (tt in odonto.exist)
  	{
  	  if (document.getElementById("xOEB"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewExist.push({"code": odonto.exist[tt]["code"], "tooth": odonto.exist[tt]["tooth"], "surface": odonto.exist[tt]["surface"], "note": odonto.exist[tt]["note"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	odonto.exist = qNewExist;

  	ctrp = 0;
  	var qNewTodo = [ ];
  	for (tt in odonto.todo)
  	{
  	  if (document.getElementById("xOAF"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewTodo.push({"code": odonto.todo[tt]["code"], "tooth": odonto.todo[tt]["tooth"], "surface": odonto.todo[tt]["surface"], "note": odonto.todo[tt]["note"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	odonto.todo = qNewTodo;

  	ctrp = 0;
  	var qNewObserv = [ ];
  	for (tt in odonto.observ)
  	{
  	  if (document.getElementById("xOAS"+ctrp).checked)
  	  {
  		//Nothing
  	  }
  	  else
  	  {
  		qNewObserv.push({"code": odonto.observ[tt]["code"], "tooth": odonto.observ[tt]["tooth"], "surface": odonto.observ[tt]["surface"], "note": odonto.observ[tt]["note"]});
  	  }
  	  ctrp = ctrp + 1;
  	}
  	odonto.observ = qNewObserv;

  	uploadODO(qFileOdo);
  	//setTimeout(loadODONS(curPatient), 500);
  }

  function createODO()
  {
  	if (qODONS.files.length > 0)
  	{
  		odonto["locked"] = "Y";
  		uploadODO(qFileOdo);
  	}
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
  	var hdj = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes());
  	odonto = { "id" : curPatient, "date" : ddj, "time" : hdj, "exist" : [ ], "todo" : [ ], "observ" : [ ] };
  	qFileOdo = "O_" + curPatient + "_" + d.getTime();
  	uploadODO(qFileOdo);
  	//drawOdon();
  	//setTimeout(loadODONS(curPatient), 500);
  }

  function uploadODO(aName)
  {
        $.post("uploadJSONsub.py", {sub: "odonto", name: aName, json: JSON.stringify(odonto)}, function(result){
            //alert("L'odontogramme a été enregistré.");
            loadODONS(curPatient, true);
        });
  }

  function drawOdon(aCanvas)
  {
    //alert("Draw the whole thing!");
  	var canvas = document.getElementById(aCanvas);
    	var ctx = canvas.getContext("2d");

  	if (showAdult)
  	{
  		canvas.width = 600 * odoX;
  		canvas.height = 395 * odoY;
  		var background = new Image();
  		background.src = "images/odontogramme.png";
  	}
  	else
  	{
  		canvas.width = 389 * odoX;
  		canvas.height = 395 * odoY;
  		var background = new Image();
  		background.src = "images/odontogramme2.png";
  	}

  	background.onload = function(){
      	ctx.drawImage(background,0,0,canvas.width,canvas.height);
  		//if (curOdo == 1)
  		//{
		//	ctx.strokeStyle = "#"+mapping["exist"];
		//	ctx.lineWidth=5;
  		//	ctx.strokeRect(0,0,canvas.width,canvas.height);
  		//}

		//Amalgame and Composite
		drawRest(ctx,mapping["amalgame"],mapping["composite"],odonto.exist);

		//Caries
		drawCar(ctx,mapping["observ"],odonto.observ);
		drawCar(ctx,mapping["todo"],odonto.todo);

		//Exo
		drawExo(ctx,"ffffff",odonto.exist);
		drawExo2(ctx,mapping["observ"],odonto.observ);
		drawExo2(ctx,mapping["todo"],odonto.todo);

		//Endo
		drawEnd(ctx,mapping["exist"],odonto.exist);
		drawEnd(ctx,mapping["observ"],odonto.obsev);
		drawEnd(ctx,mapping["todo"],odonto.todo);

		//Peripiale
		drawPer(ctx,mapping["todo"],odonto.exist);
		drawPer(ctx,mapping["observ"],odonto.observ);
		drawPer(ctx,mapping["todo"],odonto.todo);

		//Rotation top
		drawRto(ctx,mapping["todo"],odonto.exist);
		drawRto(ctx,mapping["observ"],odonto.obsev);
		drawRto(ctx,mapping["todo"],odonto.todo);

		//Rotation bottom
		drawRbo(ctx,mapping["todo"],odonto.exist);
		drawRbo(ctx,mapping["observ"],odonto.obsev);
		drawRbo(ctx,mapping["todo"],odonto.todo);

		//Corps etranger
		drawEtr(ctx,mapping["todo"],odonto.exist);
		drawEtr(ctx,mapping["observ"],odonto.obsev);
		drawEtr(ctx,mapping["todo"],odonto.todo);

		//Incluse
		drawInc(ctx,mapping["todo"],odonto.exist);
		drawInc(ctx,mapping["observ"],odonto.obsev);
		drawInc(ctx,mapping["todo"],odonto.todo);

		//Pontique
		drawPon(ctx,mapping["exist"],odonto.exist);
		drawPon(ctx,mapping["observ"],odonto.obsev);
		drawPon(ctx,mapping["todo"],odonto.todo);

		//Couronne
		drawCou(ctx,mapping["exist"],odonto.exist);
		drawCou(ctx,mapping["observ"],odonto.obsev);
		drawCou(ctx,mapping["todo"],odonto.todo);
	}
  }

  function acceptVal1(aList)
  {
  	text42 = document.getElementById("text42").value;
  	note42 = document.getElementById("EnoteT").value;
  	if (trait == 1)
  		{
  			if (isAnte) { currentCode = "2110"+classNum(); } else { currentCode = "2122"+totSurf(); }
  		}
  	if (trait == 2)
  		{
  			if (isAnte) { currentCode = "2311"+classNum(); } else { currentCode = "2322"+totSurf(); }
  		}
  	if (trait == 3)
  		{
  			currentCode = "11300";
  		}
  	if (trait == 4)
  		{
  			currentCode = "01205";
  		}

    if (aList == 0)
    	{
    		odonto.exist.push({ "code" : currentCode, "tooth" : aTooth, "surface" : textSurf(), "note" : note42 });
    	}
    if (aList == 1)
    	{
    		odonto.todo.push({ "code" : currentCode, "tooth" : aTooth, "surface" : textSurf(), "note" : note42 });
    	}
    if (aList == 2)
    	{
    		odonto.observ.push({ "code" : currentCode, "tooth" : aTooth, "surface" : textSurf(), "note" : note42 });
    	}
    drawOdon("odonto");
    clearVal1();
    uploadODO(qFileOdo);
  }

  function clearVal1()
  {
    tracks42 = "";
  	document.getElementById("text42").value = "";
  	document.getElementById("searchField").value = "";
  	trait = 0;
  	resetTrait();
  	resetMLDBO();
  	$('.ui.modal').modal('hide');
  }

  function totSurf()
  {
  	var tot = 0;
  	if (isM) tot = tot + 1;
  	if (isL) tot = tot + 1;
  	if (isD) tot = tot + 1;
  	if (isB) tot = tot + 1;
  	if (isO) tot = tot + 1;
  	return tot
  }

  function classNum()
  {
  	if (is1) return 1;
  	if (is2) return 2;
  	if (is3) return 3;
  	if (is4) return 4;
  	if (is5) return 5;
  	if (is6) return 6;
  }

  function textSurf()
  {
  	var txt = "";
  	if (isM) txt = txt + "M";
  	if (isL) txt = txt + "L";
  	if (isD) txt = txt + "D";
  	if (isB) txt = txt + "B";
  	if (isO) txt = txt + "O";
  	return txt
  }

  function addText(aText)  { document.getElementById("text42").value = document.getElementById("text42").value + aText;  }

  function setAmal()  { trait = 1; resetTrait(); document.getElementById("butAmal").setAttribute("class","ui red large fluid button");  addText(" AMALGAME"); }
  function setComp()  { trait = 2; resetTrait(); document.getElementById("butComp").setAttribute("class","ui red large fluid button");  addText(" COMPOSITE"); }
  function set1()   { trait = 3; resetTrait(); document.getElementById("butOr").setAttribute("class","ui red large fluid button");   currentCode = "11300"; document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr; }
  function set2()  { trait = 4; resetTrait(); document.getElementById("butRes").setAttribute("class","ui red large fluid button");  currentCode = "01205"; document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr; }

  function resetTrait()
  {
  	document.getElementById("butAmal").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butComp").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butOr").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butRes").setAttribute("class","ui axxium large fluid button");
  }

  function setC1() {
  	is1 = true;
  	document.getElementById("butM").setAttribute("class","ui red large fluid button");
  	document.getElementById("butM").setAttribute("onclick","setC1();");
  	document.getElementById("butM").innerHTML = "<font size=5>1</font>";
  	addText("CLASSE 1");
  }
  function setC2() {
  	is2 = true;
  	document.getElementById("butL").setAttribute("class","ui red large fluid button");
  	document.getElementById("butL").setAttribute("onclick","setC2();");
  	document.getElementById("butL").innerHTML = "<font size=5>2</font>";
  	addText("CLASSE 2");
  }
  function setC3() {
  	is3 = true;
  	document.getElementById("butD").setAttribute("class","ui red large fluid button");
  	document.getElementById("butD").setAttribute("onclick","setC3();");
  	document.getElementById("butD").innerHTML = "<font size=5>3</font>";
  	addText("CLASSE 3");
  }
  function setC4() {
  	is4 = true;
  	document.getElementById("butB").setAttribute("class","ui red large fluid button");
  	document.getElementById("butB").setAttribute("onclick","setC4();");
  	document.getElementById("butB").innerHTML = "<font size=5>4</font>";
  	addText("CLASSE 4");
  }
  function setC5() {
  	is5 = true;
  	document.getElementById("butO").setAttribute("class","ui red large fluid button");
  	document.getElementById("butO").setAttribute("onclick","setC5();");
  	document.getElementById("butO").innerHTML = "<font size=5>5</font>";
  	addText("CLASSE 5");
  }
  function setC6() {
  	is6 = true;
  	document.getElementById("butS").setAttribute("class","ui red large fluid button");
  	document.getElementById("butS").setAttribute("onclick","setC6();");
  	document.getElementById("butS").innerHTML = "<font size=5>6</font>";
  	addText("CLASSE 6");
  }

  function reset12345()
  {
  	isAnte = true;
  	is1 = false;
  	is2 = false;
  	is3 = false;
  	is4 = false;
  	is5 = false;
  	is6 = false;
  	document.getElementById("butM").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butM").setAttribute("onclick","setC1();");
  	document.getElementById("butM").innerHTML = "<font size=5>1</font>";
  	document.getElementById("butL").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butL").setAttribute("onclick","setC2();");
  	document.getElementById("butL").innerHTML = "<font size=5>2</font>";
  	document.getElementById("butD").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butD").setAttribute("onclick","setC3();");
  	document.getElementById("butD").innerHTML = "<font size=5>3</font>";
  	document.getElementById("butB").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butB").setAttribute("onclick","setC4();");
  	document.getElementById("butB").innerHTML = "<font size=5>4</font>";
  	document.getElementById("butO").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butO").setAttribute("onclick","setC5();");
  	document.getElementById("butO").innerHTML = "<font size=5>5</font>";

  	document.getElementById("butS").setAttribute("style","visibility:visible");
  	document.getElementById("butS").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butS").setAttribute("onclick","setC6();");
  	document.getElementById("butS").innerHTML = "<font size=5>6</font>";
  }

  function resetMLDBO()
  {
  	isAnte = false;
  	isM = false;
  	isL = false;
  	isD = false;
  	isB = false;
  	isO = false;
  	document.getElementById("butM").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butM").setAttribute("onclick","setM();");
  	document.getElementById("butM").innerHTML = "<font size=6>M</font>";
  	document.getElementById("butL").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butL").setAttribute("onclick","setL();");
  	document.getElementById("butL").innerHTML = "<font size=6>L</font>";
  	document.getElementById("butD").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butD").setAttribute("onclick","setD();");
  	document.getElementById("butD").innerHTML = "<font size=6>D</font>";
  	document.getElementById("butB").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butB").setAttribute("onclick","setB();");
  	document.getElementById("butB").innerHTML = "<font size=6>B</font>";
  	document.getElementById("butO").setAttribute("class","ui axxium large fluid button");
  	document.getElementById("butO").setAttribute("onclick","setO();");
  	document.getElementById("butO").innerHTML = "<font size=6>O</font>";

  	document.getElementById("butS").setAttribute("style","visibility:hidden");
  }

  function setM() { isM = true; document.getElementById("butM").setAttribute("class","ui red large fluid button"); addText("M"); }
  function setL() { isL = true; document.getElementById("butL").setAttribute("class","ui red large fluid button"); addText("L"); }
  function setD() { isD = true; document.getElementById("butD").setAttribute("class","ui red large fluid button"); addText("D"); }
  function setB() { isB = true; document.getElementById("butB").setAttribute("class","ui red large fluid button"); addText("B"); }
  function setO() { isO = true; document.getElementById("butO").setAttribute("class","ui red large fluid button"); addText("O"); }

  function keyEntry(aNum)
  {
      		if (aNum == -1)
      			{
      				if (tracks42.length > 0) tracks42 = tracks42.substr(0,tracks42.length - 1);
      				document.getElementById("text42").value = tracks42;
      			}
      		if (aNum == -2)
      			{
    				tracks42 = "";
  				document.getElementById("text42").value = "";
  				trait = 0;
  				resetTrait();
    				if (isAnte)
    				{
    					reset12345();
    				}
    				else
    				{
    					resetMLDBO();
    				}
      			}
      		if (aNum > -1)
      			{
  				tracks42 = tracks42 + aNum;
      				if (tracks42.length == 5)
      				{
      					currentCode = tracks42;
      					if (qCODES[currentCode])
      						{
      							document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr;
      						}
      					else
      						{
      							document.getElementById("text42").value = "CODE INCORRECT : "+tracks42;
      							tracks42 = "";
      						}
      				}
      				else
      				{
      					document.getElementById("text42").value = tracks42;
      				}
      			}
  }

  function getTooth(evX, evY)
  {
  	//alert(evX + "-" + evY);
  	var div = document.getElementById("odonto");
	var rect = div.getBoundingClientRect();
	var delta = 0;
	//alert(rect);
	realX = Math.floor(evX - rect.left);
	realY = Math.floor(evY - rect.top);
	if (showAdult)
	{
		delta = rect.width/16;
	}
	else
	{
		delta = rect.width/10;
	}
	half = rect.height/2;
	h = rect.height;
	//alert("Coordinates: " + realX + "px, " + realY + "px");
  	aTooth = 0;
	//alert("Start calculations");
	if (realY < half)
	{
		//alert("haut");
		if (realY > half*0.85)
		{
			if (showAdult)
			{
				teeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
			}
			else
			{
				teeth = [55,54,53,52,51,61,62,63,64,65];
			}
			//alert(teeth[Math.floor(realX/delta)]);
			aTooth = teeth[Math.floor(realX/delta)];
		}
	}
	else
	{
		//alert("bas");
		if (realY < half + (half*0.15))
		{
			if (showAdult)
			{
				teeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
			}
			else
			{
				teeth = [85,84,83,82,81,71,72,73,74,75];
			}
			//alert(teeth[Math.floor(realX/delta)]);
			aTooth = teeth[Math.floor(realX/delta)];
		}
	}
	return aTooth;
  }

  function loadCODES()
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      qCODES = JSON.parse(xmlhttp2.responseText);
      var qKeys = Object.keys(qCODES);
      searchItems = [];
      for (key in qKeys)
      		{
    	  		searchItems.push({ "code" : qKeys[key], "fr" : qCODES[qKeys[key]].fr });
    	  	}
	  $('.ui.search')
		  .search({
		    source : searchItems,
		    minCharacters : 3,
		    searchFields   : [
		      'code',
		      'fr'
		    ],
    		fields: {
    		  title : 'fr'
    		},
		    searchFullText: true,
    		onSelect: function(result, response) {
        		//alert(result.code+" - "+result.fr);
        		if (inTrait)
        		{
        			currentCode2 = result.code;
        			document.getElementById("text422").value = currentCode2 + " - " + qCODES[currentCode2].fr;
        			document.getElementById("EpriceT2").value = qCODES[currentCode2].prix;
        		}
        		else
        		{
        			currentCode = result.code;
        			document.getElementById("text42").value = currentCode + " - " + qCODES[currentCode].fr;
        		}
    		}
	  });
  	  loadMapping();
      }
    }

		// TODO: Each dentist will have its own codes file. This needs to be fixed!
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=params&code=codes&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function loadMapping()
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
        mapping = JSON.parse(xmlhttp2.responseText);
        //AK display treatment history.
        TrHistGetDataFromDB();
      }
  }

  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=params&code=mapping&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function loadOdonto()
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      odonto = JSON.parse(xmlhttp2.responseText);
      isLockedODO = false;
      if (odonto.date)
      {
  	var d = new Date();
  	var ddj = d.getFullYear() + '/' + twoDigits(d.getMonth() + 1) + '/' + twoDigits(d.getDate());
      	if (curOdo == 1 && odonto.date != ddj) isLockedODO = true;
      }
      document.getElementById("ebList").innerHTML = "";
      ctrID = 0;
      for (tt in odonto.exist)
      		{
    			var dCode, dNote = "";
    			if (qCODES[odonto.exist[tt]["code"]]) dCode = qCODES[odonto.exist[tt]["code"]].fr;
    			if (odonto.exist[tt]["note"].length > 0) dNote = odonto.exist[tt]["note"];
    			div = document.createElement("tr");
    			div.setAttribute("id", "OEB"+ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td><h4><input id="xOEB'+ctrID+'" type="checkbox" tabindex="'+ctrID+'" class="hidden"></h4></td><td><h5>'+odonto.exist[tt]["code"]+'</h5></td><td><h5>'+odonto.exist[tt]["tooth"]+'</h5></td><td><h5>'+odonto.exist[tt]["surface"]+'</h5></td><td><h5>'+dCode+'</h5></td><td><h5>'+dNote+'</h5></td>';
    			document.getElementById("ebList").appendChild(div);
    			ctrID = ctrID + 1;
    	  	}
      document.getElementById("afList").innerHTML = "";
      ctrID = 0;
      for (tt in odonto.todo)
      		{
    			var dCode, dNote = "";
    			if (qCODES[odonto.todo[tt]["code"]]) dCode = qCODES[odonto.todo[tt]["code"]].fr;
    			if (odonto.todo[tt]["note"].length > 0) dNote = odonto.todo[tt]["note"];
    			div = document.createElement("tr");
    			div.setAttribute("id", "OAF"+ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td><h4><input id="xOAF'+ctrID+'" type="checkbox" tabindex="'+ctrID+'" class="hidden"></h4></td><td><h5>'+odonto.todo[tt]["code"]+'</h5></td><td><h5>'+odonto.todo[tt]["tooth"]+'</h5></td><td><h5>'+odonto.todo[tt]["surface"]+'</h5></td><td><h5>'+dCode+'</h5></td><td><h5>'+dNote+'</h5></td>';
    			document.getElementById("afList").appendChild(div);
    			ctrID = ctrID + 1;
    	  	}
      document.getElementById("asList").innerHTML = "";
      ctrID = 0;
      for (tt in odonto.observ)
      		{
    			var dCode, dNote = "";
    			if (qCODES[odonto.observ[tt]["code"]]) dCode = qCODES[odonto.observ[tt]["code"]].fr;
    			if (odonto.observ[tt]["note"].length > 0) dNote = odonto.observ[tt]["note"];
    			div = document.createElement("tr");
    			div.setAttribute("id", "OAS"+ctrID);
    			div.setAttribute("class", "error");
    			div.innerHTML = '<td><h4><input id="xOAS'+ctrID+'" type="checkbox" tabindex="'+ctrID+'" class="hidden"></h4></td><td><h5>'+odonto.observ[tt]["code"]+'</h5></td><td><h5>'+odonto.observ[tt]["tooth"]+'</h5></td><td><h5>'+odonto.observ[tt]["surface"]+'</h5></td><td><h5>'+dCode+'</h5></td><td><h5>'+dNote+'</h5></td>';
    			document.getElementById("asList").appendChild(div);
    			ctrID = ctrID + 1;
    	  	}
      if (isLockedODO)
      {
      	document.getElementById("delODO").setAttribute("class","ui axxium tiny disabled button");
      	//document.getElementById("addTrait").setAttribute("class","ui axxium tiny disabled button");
      }
      else
      {
      	document.getElementById("delODO").setAttribute("class","ui axxium tiny button");
      	//document.getElementById("addTrait").setAttribute("class","ui axxium tiny button");
      }
      drawOdon("odonto");
      displaySign(odonto,"ODO");
      }
  }

  //alert("Get the Odonto!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=odonto&code="+qFileOdo+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function loadODONS(aPat, relBan)
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      qODONS = JSON.parse(xmlhttp2.responseText);
      curOdo = 0;
      	if (qODONS.files.length > 0)
      	{
      		if (relBan) displaySub("odontos");
      		qFileOdo = qODONS.files[curOdo].file;
      		loadOdonto();
      	}
      	else
      	{
  		var canvas = document.getElementById("odonto"),
    		ctx = canvas.getContext("2d");
		ctx.font="16px Arial";
		ctx.textAlign = "left";
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "#000000";
		ctx.fillText("Aucun odontogramme",10,20);
      	}
      }
  }

  //alert("Get the Files!");
  xmlhttp2.open("GET","allScriptsv1.py?tx=getALLsub&sub=odonto&patID="+aPat+"&rand="+Math.random(),true);
  xmlhttp2.send();

  }

  function displaySelo(aKind)
  {
      curKind = aKind;
      resetSeloButtons();
      document.getElementById("seloHeader").innerHTML = '<i class="treatment icon"></i>' + aKind + " pour la dent "+aToothO;
      document.getElementById("eachSeloRow").innerHTML = "";
      document.getElementById("EnoteSelo").value = "";
      var ctrp = 0;
      for (rr in qSelo[aKind]["rows"])
      	{
    		div = document.createElement("tr");
    		for (cc in qSelo[aKind]["rows"][rr])
    		{
    			//<td id="C8" name="Prophylaxie" class="two column wide">Prophylaxie</td>
    			aType = qSelo[aKind]["rows"][rr][cc].type;
    			aDesc = qSelo[aKind]["rows"][rr][cc].desc;
    			div2 = document.createElement("td");
    			div2.setAttribute("id", aType+ctrp);
    			div2.setAttribute("name", aDesc);
    			div2.setAttribute("class", "two column wide");
    			if (aType == "N" && cc == 0)
    			{
    				div2.innerHTML = '<h4>'+aDesc+'</h4>';
    			}
    			else if (aType == "T")
    			{
    				div2.innerHTML = aDesc + " :";
    			}
    			else
    			{
    				div2.innerHTML = aDesc;
    			}
    			div.appendChild(div2);
    			ctrp = ctrp + 1;
    		}
    		document.getElementById("eachSeloRow").appendChild(div);
    	}

	    $('#seloTable tbody tr td').click(function(){
	          curType = $(this).attr("id");
	          curProtName = $(this).attr("name");
	          cont = document.getElementById(curType).innerHTML;
	          if (curType.substring(0,1) == "C" || curType.substring(0,1) == "B" || curType.substring(0,1) == "M" || curType.substring(0,1) == "S")
	          {
	          	if (oMaster[curKind][curType] == "Y")
	          	{
	          		document.getElementById(curType).innerHTML = curProtName;
	          		oMaster[curKind][curType] = "N";
	          	}
	          	else
	          	{
	          		document.getElementById(curType).innerHTML = '<i class="icon checkmark"></i> <b>' + cont + '</b>';
	          		oMaster[curKind][curType] = "Y";
	          		if (curType.substring(0,1) == "B") selectBLO();
	          		if (curType.substring(0,1) == "M") selectMDO();
	          		if (curType.substring(0,1) == "S") selectSurfO();
	          	}
	          }
	          if (curType.substring(0,1) == "T")
	          {
	          	if (oMaster[curKind][curType].length > 0)
	          	{
	          		document.getElementById("EnoteProt").value = oMaster[curKind][curType];
	          	}
	          	else
	          	{
	          		document.getElementById("EnoteProt").value = "";
	          	}
	          	$('.modalNoteProt.modal').modal('show');
	          }
      	});
  }

  function loadSelo()
  {
  var xmlhttp2;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp2=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp2.onreadystatechange=function()
    {
    if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
      {
      //alert(xmlhttp2.responseText.length);
      qSelo = JSON.parse(xmlhttp2.responseText);
  	  var qKeys = Object.keys(qSelo);
  	  for (key in qKeys)
  		{
  			oMaster[qKeys[key]] = { };
      			var ctrp = 0;
      			for (rr in qSelo[qKeys[key]]["rows"])
      			{
    				div = document.createElement("tr");
    				for (cc in qSelo[qKeys[key]]["rows"][rr])
    				{
    					aType = qSelo[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C")
    					{
    						oMaster[qKeys[key]][aType+ctrp] = "N";
    					}
    					else
    					{
    						oMaster[qKeys[key]][aType+ctrp] = "";
    					}
    					ctrp = ctrp + 1;
    				}
    			}
    			oMaster[qKeys[key]]["T"+ctrp] = "";
  		}
      }
    }

		xmlhttp2.open("GET","allScriptsv1.py?tx=getJSONsub&sub=params&code=odonto&rand="+Math.random(),true);
  	xmlhttp2.send();

  }

  function acceptSeloEB()
  {
  	var qKeys = Object.keys(qSelo);
  	for (key in qKeys)
  	{
      		var ctrp = 0;
      		for (rr in qSelo[qKeys[key]]["rows"])
      			{
    				for (cc in qSelo[qKeys[key]]["rows"][rr])
    				{
    					aType = qSelo[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C" || aType == "B" || aType == "M" || aType == "S")
    					{
    						if (oMaster[qKeys[key]][aType+ctrp] == "Y")
    						{
    		//{ "code" : "23223", "tooth" : "24", "surface" : "MDO", "prots": { list } }
    		var aCode = qSelo[qKeys[key]]["rows"][rr][cc].desc.substring(0,5);
    		var aNote = document.getElementById("EnoteSelo").value;
    		//alert("code "+aCode+" tooth "+aToothO+" surface "+textS);
  		odonto.exist.push({ "code" : aCode, "tooth" : aToothO, "surface" : textS, "note" : aNote });
    						}
    					}
    					ctrp = ctrp + 1;
    				}
    			}
  	}
    	drawOdon("odonto");
    	uploadODO(qFileOdo);
  	$('.modalSelo.modal').modal('hide');
  }

  function acceptSeloAF()
  {
  	var qKeys = Object.keys(qSelo);
  	for (key in qKeys)
  	{
      		var ctrp = 0;
      		for (rr in qSelo[qKeys[key]]["rows"])
      			{
    				for (cc in qSelo[qKeys[key]]["rows"][rr])
    				{
    					aType = qSelo[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C" || aType == "B" || aType == "M" || aType == "S")
    					{
    						if (oMaster[qKeys[key]][aType+ctrp] == "Y")
    						{
    		//{ "code" : "23223", "tooth" : "24", "surface" : "MDO", "prots": { list } }
    		var aCode = qSelo[qKeys[key]]["rows"][rr][cc].desc.substring(0,5);
    		var aNote = document.getElementById("EnoteSelo").value;
    		//alert("code "+aCode+" tooth "+aToothO+" surface "+textS);
  		odonto.todo.push({ "code" : aCode, "tooth" : aToothO, "surface" : textS, "note" : aNote });
    						}
    					}
    					ctrp = ctrp + 1;
    				}
    			}
  	}
    	drawOdon("odonto");
    	uploadODO(qFileOdo);
  	$('.modalSelo.modal').modal('hide');
  }

  function acceptSeloAS()
  {
  	var qKeys = Object.keys(qSelo);
  	for (key in qKeys)
  	{
      		var ctrp = 0;
      		for (rr in qSelo[qKeys[key]]["rows"])
      			{
    				for (cc in qSelo[qKeys[key]]["rows"][rr])
    				{
    					aType = qSelo[qKeys[key]]["rows"][rr][cc].type;
    					if (aType == "C" || aType == "B" || aType == "M" || aType == "S")
    					{
    						if (oMaster[qKeys[key]][aType+ctrp] == "Y")
    						{
    		//{ "code" : "23223", "tooth" : "24", "surface" : "MDO", "prots": { list } }
    		var aCode = qSelo[qKeys[key]]["rows"][rr][cc].desc.substring(0,5);
    		var aNote = document.getElementById("EnoteSelo").value;
    		//alert("code "+aCode+" tooth "+aToothO+" surface "+textS);
  		odonto.observ.push({ "code" : aCode, "tooth" : aToothO, "surface" : textS, "note" : aNote });
    						}
    					}
    					ctrp = ctrp + 1;
    				}
    			}
  	}
    	drawOdon("odonto");
    	uploadODO(qFileOdo);
  	$('.modalSelo.modal').modal('hide');
  }

  function initialODO()
  {
      if (0 < qODONS.files.length)
      {
      	curOdo = 1;
      	qFileOdo = qODONS.files[curOdo].file;
  	loadOdonto();
      }
      displaySub("odontos");
  }

  function evolutifODO()
  {
      if (0 < qODONS.files.length)
      {
      	curOdo = 0;
      	qFileOdo = qODONS.files[curOdo].file;
  	loadOdonto();
      }
      displaySub("odontos");
  }

  function backODO()
  {
      if (curOdo < qODONS.files.length - 1)
      {
      	curOdo = curOdo + 1;
      	qFileOdo = qODONS.files[curOdo].file;
  	loadOdonto();
      }
      displaySub("odontos");
  }

  function forODO()
  {
      if (curOdo > 0)
      {
      	curOdo = curOdo - 1;
      	qFileOdo = qODONS.files[curOdo].file;
  	loadOdonto();
      }
      displaySub("odontos");
  }

  function odonPlus()
  {
      if (odoX < 3)
      {
      	odoX = odoX + 0.5;
      	odoY = odoY + 0.5;
      }
      drawOdon("odonto");
  }

  function odonMoins()
  {
      if (odoX > 1)
      {
      	odoX = odoX - 0.5;
      	odoY = odoY - 0.5;
      }
      drawOdon("odonto");
  }
