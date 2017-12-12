$(document).ready(function(){
    $.ajax({
        url: "https://api.myjson.com/bins/2sadq?pretty=1",
        datatype: "json",
        success: function(response){
            $.each(response.apartments, function(i, apartment){
                var apartmentClass = apartment.city.toLowerCase().replace(" ", "-");
                
                var listing = "<a href='#' id=" + apartment.id + " class='list-group-item " + apartmentClass + " listings list-group-item-action flex-column align-items-start'><h6 class='mb-1'>" + apartment.description + " / " + apartment.bedrooms + " BR / " + apartment.price + "</h6><p class='mb-1'>" + apartment.neighborhood + "</p></a>";
                
                $(".apartments").append(listing);
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
    
    $(".filter").click(function(){
        $(".filter").removeClass("active");
        $(this).addClass("active");
        
        $(".listings").show();
        
        var city = $(this).attr("id");
        if(city !== "all"){
            $(".listings").not("." + city).css("display", "none");
        }
    });
    
    $(document).on("click", ".listings", function(){
        var id = $(this).attr("id");
        
        $.ajax({
            url: "https://api.myjson.com/bins/2sadq?pretty=1",
            datatype: "json",
            success: function(response){
                var selectedApartment = $.grep(response.apartments, function(apartment){
                    return apartment.id == id;
                })
                var address = selectedApartment[0].address;
                
                window.open("http://maps.google.com/?q=" + address);
            },
            error: function(error) {
                console.log(error);
            }
        }); 
    });
}); 