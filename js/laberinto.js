
//multiple attribute selector
// var posicion_i = [[document.getElementById('inicio').getAttributeNode("horizontal").value, document.getElementById('inicio').getAttributeNode("vertical").value]];
var posicion_x = $( ".inicio" ).attr( "horizontal" );
var posicion_y = $( ".inicio" ).attr( "vertical" );
// alert("INICIO   horizontal= "+posicion_x+" vertical= "+posicion_y)
var recorrido = [[posicion_x,posicion_y]];

var vista;
var posible_ruta;
var begin="B2";
var llegada="N14"
$("[name=" + begin + "]").addClass( "inicio" );
$("[name=" + llegada + "]").addClass( "fin" );
// alert("Posicion Inicial= "+recorrido[0][0]+" - "+recorrido[0][1]+" largo = "+ recorrido.length);
// recorrido.push([4,5]);
// alert("Segunda Posicion= "+recorrido[1][0]+" - "+recorrido[1][1]+" largo = "+ recorrido.length);
// ver_arriba(H,V);
// ver_abajo(H,V);
// ver_izquierda(H,V);
// ver_derecha(H,V);
var contador = 1;
var repetido = 1;
var max_repetido = 15;
recorrer(recorrido);
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function recorrer(recorrido) {
  // alert("contador="+contador);
     var terminado = "1/";
     var retorno = "";

        $("#resultado").append("<ul id=genoma_"+contador+"></ul>");
        $('#genoma_'+contador).attr({
           'class': 'genoma'
        });
  while (terminado != 0) {
   terminado = principal(recorrido);
if(terminado == 0)
{

}
else {
  retorno = retorno+"/"+terminado;
}





  //  setTimeout(function(){ terminado = principal(recorrido); }, 2000);
  //  delay(15);
  }

  var final = retorno.split('/');

var valorfinal = final[final.length-1];
if(valorfinal == llegada)
{
  $("#resultado").append("<input type='hidden' id=array_"+contador+" value="+final+" />");
  // alert("Termino");
  $('#genoma_'+contador).attr({
     'class': 'genoma resultado'
  });
  $('#array_'+contador).attr({
     'class': 'terminado'
  });

  $(".explorado").attr( "class", " ");

  var posicion_x2 = $( ".inicio" ).attr( "horizontal" );
  var posicion_y2 = $( ".inicio" ).attr( "vertical" );
  // alert("INICIO   horizontal= "+posicion_x+" vertical= "+posicion_y)

  if(contador>1)
  {
    verificar_recorrido();
  }
  if (repetido<max_repetido){
    contador = contador + 1;
    var recorrido2 = [[posicion_x2,posicion_y2]];
    recorrer(recorrido2);
  } else {

    $( "li" ).each(function() {})

  }

}
else {

  $("#resultado").append("<input type='hidden' id=array_"+contador+" value="+final+" />");



$(".explorado").attr( "class", " ");

var posicion_x2 = $( ".inicio" ).attr( "horizontal" );
var posicion_y2 = $( ".inicio" ).attr( "vertical" );
// alert("INICIO   horizontal= "+posicion_x+" vertical= "+posicion_y)

if(contador>1)
{
  verificar_recorrido();
}
if (repetido<max_repetido){
  contador = contador + 1;
  var recorrido2 = [[posicion_x2,posicion_y2]];
  recorrer(recorrido2);
} else {
var almacenar=[[]];
  $( ".terminado" ).each(function( index, element ) {
    input=$( element ).val();
    id=$( element ).attr("id");
    arreglo = input.split(",");
    almacenar.push([id,arreglo.length]);

  })







      var arreglo_2=[];

    for (x=1;x<almacenar.length;x++)
    {

            arreglo_2.push(almacenar[x][1]);




    }


      var min = Math.min.apply( Math, arreglo_2 );

      for (x=1;x<almacenar.length;x++)
      {

              if(min == almacenar[x][1])
              {

               id_final = almacenar[x][0];

               genoma_final = id_final.split("_");
               id_genoma_final = genoma_final[1];

               $("#genoma_"+id_genoma_final).attr( "class", "genoma seleccionado");






              }




      }


      prueba = $(".seleccionado").attr( "id");
      prueba = prueba.split("_");
      prueba = prueba[1];
      ul_li = $("#array_"+prueba).val();

      ul_li = ul_li.substr(1);

      cambiar_fondo = ul_li.split(",");



      for (i=0;i<cambiar_fondo.length;i++)
      {

        if(cambiar_fondo[i] == llegada)
        {
          $("[name=" + cambiar_fondo[i] + "]").addClass( "fin" );
        }
        else {
          $("[name=" + cambiar_fondo[i] + "]").addClass( "explorado" );
        }







      }


}

}
}
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function verificar_recorrido() {
    espera=false;
    var i=1;
    while (espera==false){
      var valor1 = $('#array_'+i).val();
      var valor2 = $('#array_'+contador).val();
      if(valor1 == valor2){
        repetido++
        // alert("igual");
        $("#genoma_"+contador).remove();
        $("#array_"+contador).remove();
        contador = contador - 1;
        espera = true;
        }
        i++
         if(i==contador) {
        {
          repetido=0;
          espera = true;
        }
      }

  }
}


//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function principal(recorrido){

      actual= parseFloat(recorrido.length-1);
      // alert("Paso = "+actual);
      var cromosoma= "";
      var H = parseFloat(recorrido[actual][0]);
      var V = parseFloat(recorrido[actual][1]);
      vista=chequear(H,V);

      vistalen = vista.length;
      // alert("Distancia de arreglo= " + vistalen);
      if(vistalen==0){

        return 0;
      } else{
        direccion=Math.floor((Math.random() * vistalen) + 0);
        // alert("direccion tomada= " + direccion);
        decision=vista[direccion];
        // alert("decision tomada= " + decision);
        paso = parseFloat(actual+1);
        if (decision=="U"){ //si arriba no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
          // alert("SUBE Horizontal = " + parseFloat(H-1));
          recorrido.push([parseFloat(H-1),V]);
          $("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").addClass( "explorado" );
          name=$("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").attr( "name" );
          $("#genoma_"+contador).append("<li>"+ name +"</li>");
          cromosoma=name;
        }
        else if (decision=="D"){  //si abajo no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
          // alert("BAJA Horizontal = " + parseFloat(H+1));
          recorrido.push([parseFloat(H+1),V]);
          $("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").addClass( "explorado" );
          name=$("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").attr( "name" );
          $("#genoma_"+contador).append("<li>"+ name +"</li>");
          cromosoma=name;
        }
        else if (decision=="L"){  //si izquierda no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
          // alert("IZQUIERDA vertical = " + parseFloat(V-1));
          recorrido.push([H,parseFloat(V-1)]);
          $("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").addClass( "explorado" );
          name=$("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").attr( "name" );
          $("#genoma_"+contador).append("<li>"+ name +"</li>");
          cromosoma=name;
        }
        else if (decision=="R"){  //si derecha no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
          // alert("DERECHA vertical = " + parseFloat(V+1));
          recorrido.push([H,parseFloat(V+1)]);
        $("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").addClass( "explorado" );
        name=$("[horizontal=" + recorrido[paso][0] + "][vertical="+recorrido[paso][1] + "]").attr( "name" );
        $("#genoma_"+contador).append("<li>"+ name +"</li>");
        cromosoma=name;
        }
        return cromosoma;
      }
}
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function chequear(H,V) {
  var posible_ruta = [];

  if (ver_arriba(H,V)==false){ //si arriba no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
    posible_ruta[posible_ruta.length]="U"; //UP
  }
  if (ver_abajo(H,V)==false){ //si abajo no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
    posible_ruta[posible_ruta.length]="D"; //DOWN
  }
  if (ver_izquierda(H,V)==false){ //si izquierda no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
    posible_ruta[posible_ruta.length]="L"; //LEFT
  }
  if (ver_derecha(H,V)==false){ //si derecha no está libre (sin pared ni ruta recorrida) agrega al vector una ruta posible.
    posible_ruta[posible_ruta.length]="R"; //RIGHT
  }
  return posible_ruta;
}
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function ver_arriba(H,V) {
  H = parseFloat(H-1);
  V = V;
  var consulta = $("[horizontal="+H+"][vertical="+V+"]"); // Busco por Vertical y horizontal
  // alert("ARRIBA: Horizontal: " + H + " Vertical: " + V + "  Pared = " + consulta.hasClass('pared') + " Explorado = " + consulta.hasClass('explorado') );
  if (consulta.hasClass('pared') || consulta.hasClass('explorado') || consulta.hasClass('inicio')) {

    // si esta explorado O es pared regresa true

 return true;

  } else{

    return false;

  }

}
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function ver_abajo(H,V) {

  H = parseFloat(H+1);
  V = V;
  var consulta = $("[horizontal="+H+"][vertical="+V+"]"); // Busco por Vertical y horizontal
  // alert("ABAJO: Horizontal: " + H + " Vertical: " + V + "  Pared = " + consulta.hasClass('pared') + " Explorado = " + consulta.hasClass('explorado') );
  if (consulta.hasClass('pared') || consulta.hasClass('explorado') || consulta.hasClass('inicio')) {
    // si esta explorado O es pared regresa true

 return true;

  } else{

    return false;

  }

}
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function ver_derecha(H,V) {

  H = H;
  V = parseFloat(V+1);
  var consulta = $("[horizontal="+H+"][vertical="+V+"]"); // Busco por Vertical y horizontal
  // alert("DERECHA: Horizontal: " + H + " Vertical: " + V + "  Pared = " + consulta.hasClass('pared') + " Explorado = " + consulta.hasClass('explorado') );
  if (consulta.hasClass('pared') || consulta.hasClass('explorado') || consulta.hasClass('inicio')) {

    // si esta explorado O es pared regresa true

 return true;

  } else{

    return false;

  }

}
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
function ver_izquierda(H,V) {

  H = H;
  V = parseFloat(V-1);
  var consulta = $("[horizontal="+H+"][vertical="+V+"]"); // Busco por Vertical y horizontal
  // alert("IZQUIERDA: Horizontal: " + H + " Vertical: " + V + "  Pared = " + consulta.hasClass('pared') + " Explorado = " + consulta.hasClass('explorado') );
  if (consulta.hasClass('pared') || consulta.hasClass('explorado') || consulta.hasClass('inicio')) {

    // si esta explorado O es pared regresa true

 return true;

  } else{

    return false;

  }
}
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************

function delay(ms) { var start_time = Date.now(); while (Date.now() - start_time < ms); } // esto es un retraso para percibir el ejercicio paso a paso

//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************
//*****************************************************************************************

//BIBLIOGRAFIA

// html() http://www.w3schools.com/jquery/html_html.asp // http://api.jquery.com/html/

// append() http://www.w3schools.com/jquery/html_append.asp // http://api.jquery.com/append/

// append() y prepend() http://www.actualidadjquery.es/2011/12/01/anadir-elementos-contenidos-con-append-y-prepend-en-jquery/

// text() http://www.w3schools.com/jquery/html_text.asp // http://api.jquery.com/text/ // http://www.anerbarrena.com/jquery-text-4730/

// selectors http://www.anerbarrena.com/jquery-selectors-selectores-4768/
