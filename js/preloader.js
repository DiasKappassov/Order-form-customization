window.onload = function() {
  var preloader = document.getElementById("crowdfund-preloader");
  if (typeof(preloader) != 'undefined' && preloader != null){
    setTimeout(function(){
      preloader.className = "loaded";
    }, 1000);

    setTimeout(function(){
      preloader.className = "hidden";
    }, 5000);
  }
}
