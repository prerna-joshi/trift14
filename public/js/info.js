  function some(y){
      
    
      document.getElementById("myInput").value = y;
      document.getElementById('myul').style.display = "none";
  } 
  
  function pass(l,m){
    if(document.getElementById(l).style.display=="none"){
      document.getElementById(l).style.display="block";
    }
    else{
      document.getElementById(l).style.display="none";
    }
    if(document.getElementById(m).style.display=="none"){
      document.getElementById(m).style.display="block";
    }
    else{
      document.getElementById(m).style.display="none";
    }
   }
   function add(a,b,p){
       var x=((Number)(document.getElementById(a).innerHTML))+1;
       
       document.getElementById(a).innerHTML=x;
       document.getElementById(b).innerHTML=x;
       document.getElementById(p).value=x;
   }
   function subs(a,b,p){
    var x=0;
    if(document.getElementById(a).innerHTML!=0)
     x=((Number)(document.getElementById(a).innerHTML))-1;
    
    document.getElementById(a).innerHTML=x;
    document.getElementById(b).innerHTML=x;
       if(document.getElementById(p).value<=0)
      document.getElementById(p).value=(Number)(document.getElementById(p).value)-1;
       
   }
   function hide(r,s){
     var l=r;
     var k=s;
  pass(l,k);
   }
   function filterFunction() {
    console.log('called');
      var input, filter, ul, li, a, i;
      document.getElementById('myul').style.display = "block";
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      div = document.getElementById("myDropdown");
      a = div.getElementsByTagName("a");
      for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
        } else {
          a[i].style.display = "none";
        }
      }
    } 