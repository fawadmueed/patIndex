
     $("#search1").keydown(function(){
      alert("")
     var output; 

     // TODO: Each dentist will have its own codes file. This needs to be fixed!
      $.getJSON("json/params/codes.json",function(data){

      var search1= $('#search1').val();
      var reg=new RegExp(search1,'i');

        $.each(data,function(key,val){
          
          if(key.search(reg) != -1)
          {

          output+="<tr>";
          output+="<td id=" + key + ">" +key+"</td>";
          output+="<td id=" + key + ">" +val.prix+"</td>";
          output+="<td id=" + key + ">" +val.ramq+"</td>";
          output+="<td id=" + key + ">" +val.insurance+"</td>";
          output+="<td id=" + key + ">" +val.special+"</td>";
          output+='<td> <button class="btn btn-success btn-small" data-toggle="modal" data-target="#exampleModal">Edit</button> </td>';
          output+="</tr>";

          //console.log(key);
        }
        });


        $('#codesBody').html(output);

      });
    });

