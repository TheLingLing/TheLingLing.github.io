var itemArray = [
    ['Angelic Gift','Josu Hernaiz', 'Battle for Zendikar','AngelicGift_BattleforZendikar'],
    ['Battlewise Hoplite','Willian Murai','Theros','BattlewiseHoplite_Theros'],
    ['Chandra Ablaze','Steve Argyle','Zendikar','ChandraAblaze_Zendikar'],
    ['Desperate Stand','Raymond Swanland','Journey into Nyx','DesperateStand_JitN'],
    ['Elspeth Tirel','Michael Komarck','Scars of Mirrodin','ElspethTirel_ScarsofMirrodin'],
    ['Godsend','Daniel Ljunggren','Journey into Nyx','Godsend_JitN'],
    ['Grovetender Druids','Chase Stone','Battle for Zendikar','GrovetenderDruids_BattleforZendikar'],
    ['Jeskai Ascendancy','Dan Scott','Khans of Tarkir','JeskaiAscendancy_KhansofTarkir'],
    ['Karametra, God of Harvests','Eric Deschamps','Born of the Gods','KarametraGodofHarvests_BotG'],
    ['Kiora, the Crashing Wave','Scott M. Fischer','Born of the Gods','KioratheCrashingWave_BotG'],
    ['Liliana of the Veil','Steve Argyle','Innistrad','LilianaoftheVeil_Inniestrad'],
    ['Morgis, God of Slaughter','Peter Mohrbacher','Born of the Gods','MogisGodofSlaughter_BotG'],
    ['Nylea, God of the Hunt','Chris Rahn','Theros','NyleaGodoftheHunt_Theros'],
    ['Oath of Chandra','Wesley Burt','Oath of the Gatewatch','OathofChandra_OathoftheGatewatch'],
    ['Ojutai, Soul of Winter','Chase Stone','Fate Reforged','OjutaiSoulofWinter_FateReforged'],
    ['Sorin, Solemn Visitor','Cynthia Sheppard','Khans of Tarkir','SorinSolemnVisitor_KhansofTarkir'],
    ['Thalia, Guardian of Thraben','Steve Argyle','Promotional','ThaliaGuardianofThraben_Promo'],
    ['Ugin, the Spirit Dragon','Chris Rahn','Fate Reforged Promotional','UgintheSpiritDragon_FateReforgedPromo'],
    ['Vampire Envoy','Johannes Voss','Oath of the Gatewatch','VampireEnvoy_OathoftheGatewatch'],
    ['Vraska the Unseen','Aleksi Briclot','Return to Ravnica','VraskatheUnseen_RTR']
    
]

var disable_artThumbnail_buttons = false;
var disable_artThumbnail_click = false;

$(function(){ 
        $('#section0').css({'padding-top': $('.navbar').height()});
        for(i=0; i<itemArray.length;i++){
            $('#section2 .container-fluid').append('<div class="artThumbnail_container" data-id="' + i + '" ><img class="artThumbnail" src="img/gallery/content/' + itemArray[i][3] + '.jpg"></img></div>');
        }        
        //waits for images to load before setting up thumbnails to correct dimensions
        $('body').imagesLoaded( function () {
            positionThumbnails();
            //positionDisplayContainers();
            $('.artThumbnail_container').eq(3).addClass('selected');
            setSelectedContent();

            $('body').animate({
                opacity:1.0
            }, 200, function() {

            });

            //animate scrolling for the thumbnails, also creates a loop
            var imgContainerWidth;
            $('#artThumbnail_leftbutton').click(function (ev) {
                   //disables button until animation has completed
                   if (disable_artThumbnail_buttons) return;
                   disable_artThumbnail_buttons = true;
                   
                   imgContainerWidth = ($('.artThumbnail_container:not(.selected):first').width());
                   $('.artThumbnail_container:last').clone().css({'left': -imgContainerWidth}).prependTo('#section2 .container-fluid'); 
                   
                   $('.artThumbnail_container').animate({
                        left: "+=" + imgContainerWidth
                      }, 500, function() {
                        //animation complete
                        //animation is working on multiple elements, the remove only occurs after the last animation completes and the button is enabled again
                        if ($(this).index() + 1 == $('.artThumbnail_container').length)
                        {
                            $('.artThumbnail_container:last').remove(); 
                            disable_artThumbnail_buttons = false;
                        }
    
                    }); 
            });


            $('#artThumbnail_rightbutton').click(function (ev) {
                   //disables button until animation has completed
                   if (disable_artThumbnail_buttons) return;
                   disable_artThumbnail_buttons = true;
                   imgContainerWidth = ($('.artThumbnail_container:not(.selected):first').width());
                   $('.artThumbnail_container:first').clone().css({'left': imgContainerWidth + $('.artThumbnail_container:last').position().left }).appendTo('#section2 .container-fluid'); 
                   $('.artThumbnail_container').animate({
                        left: "-=" + imgContainerWidth
                      }, 500, function() {
                        //animation complete 
                        //animation is working on multiple elements, the remove only occurs after the last animation completes
                        if ($(this).index() + 1 == $('.artThumbnail_container').length)
                        {
                            $('.artThumbnail_container:first').remove();
                            disable_artThumbnail_buttons = false;
                        }
                    });
            });

            $(document).on('click', ".artThumbnail_container:not(.selected)", function (ev){
                if (disable_artThumbnail_click) return;
                disable_artThumbnail_click = true;

                var newSelected = $(this);
                var animatecounter = 0;
                $('#section1_left_cardContainer').animate({
                    opacity:0.0
                }, 200, function() {
                        animatecounter++;
                        if (animatecounter >= 2){
                            $('.selected').removeClass('selected');
                            newSelected.addClass('selected');
                            setSelectedContent();
                        }
                });
                $('#section1_right_artContainer').animate({
                    opacity:0.0
                }, 200, function() {
                        animatecounter++;
                        if (animatecounter >= 2){
                            $('.selected').removeClass('selected');
                            newSelected.addClass('selected');
                            setSelectedContent();
                        }
                });          
            });

            $('.content-next_button').on('click', function(i){
                $(this).hide()
                $('#section1_left').hide();
                $('#section1_right').show();
                $('.content-prev_button').show();
                $('#section1_right_artContainer').css({'opacity':'0'});
                positionSelectedContent();
                animateSelectedContent();
            });

            $('.content-prev_button').on('click', function(i){
                $(this).hide()
                $('#section1_right').hide();
                $('#section1_left').show();
                $('.content-next_button').show();
                $('#section1_left_cardContainer').css({'opacity':'0'});
                positionSelectedContent();
                animateSelectedContent();
            });


            $(window).resize(function(){
                positionThumbnails();
                positionSelectedContent();
            });             

        });



});

function setSelectedContent() {
    $('#cardImage').remove();
    $('#artImage').remove();
    var j = $('.selected').attr('data-id');
    $('#itemName').html(itemArray[j][0]);
    $('#artistName').html('Illustrator: <i>' + itemArray[j][1] + '</i>');
    $('#setName').html('Magic Set: <i>' + itemArray[j][2] + '</i>');
    $('#section1_left_cardContainer').append('<img id="cardImage" src="img/gallery/content/' + itemArray[j][3] + '_Card.jpg"></img>');
    $('#section1_right_artContainer').append('<img id="artImage" src="img/gallery/content/' + itemArray[j][3] + '.jpg"></img>');


    var loadcounter = 0;
    $('#cardImage').load(function(){
        loadcounter++;
        if (loadcounter >= 2) {
            positionSelectedContent();
            animateSelectedContent();
        };
    });
    $('#artImage').load(function(){
        loadcounter++;
        if (loadcounter >= 2) {
            positionSelectedContent();
            animateSelectedContent();
        };
    });
    
}

function positionSelectedContent() {
    //using a standard sized card now, no need for this
    /*if ($('#cardImage').width() > $('#section1_left_cardContainer').width()){
        $('#cardImage').css({'max-width':'100%','max-height':''});
    }
    if ($('#cardImage').height() > $('#section1_left_cardContainer').height()){
        $('#cardImage').css({'max-width':'','max-height':'100%'});
    }*/
    if ($('#artImage').width() > $('#section1_right_artContainer').width()){
        $('#artImage').css({'max-width':'100%','max-height':''});
    }
    if ($('#artImage').height() > $('#section1_right_artContainer').height()){
        $('#artImage').css({'max-width':'','max-height':'100%'});
    }

    //canters the card container, minus 30 to make up for logo-img margin-top and to offset it just abit
    $('#section1_left_cardContainer').css({'margin-top': ($('#section1_left').height() - $('#section1_left_cardContainer').height())/2})
}

function animateSelectedContent() {
    var animatecounter = 0;
    $('#section1_left_cardContainer').animate({
        opacity:1
    }, 200, function() {
            animatecounter++;
            if (animatecounter >= 2){
                disable_artThumbnail_click = false;
            }
    });
    $('#section1_right_artContainer').animate({
        opacity:1
    }, 200, function() {
            animatecounter++;
            if (animatecounter >= 2){
                disable_artThumbnail_click = false;
            }
    });    
}

function positionThumbnails(){
    //sets body hieght to window height
    $('body').css({'max-height':$(window).height()});
    //sets amount of thumbnails appearing on window based on window size
    if ($(window).width() >= 1320) {
        $('.artThumbnail_container').css({'width':'21%'});   
        $('#artThumbnail_leftbutton,#artThumbnail_rightbutton').css({'height':'100%','top':'0%'});
    }
    if ($(window).width() >= 720 && $(window).width() < 1320) {
        $('.artThumbnail_container').css({'width':'28%'});
        $('#artThumbnail_leftbutton,#artThumbnail_rightbutton').css({'height':'80%','top':'10%'});   
    }
    if ($(window).width() < 720) {
        $('.artThumbnail_container').css({'width':'28%'});
        $('#artThumbnail_leftbutton,#artThumbnail_rightbutton').css({'height':'60%','top':'20%'});   
    }

    if ($(window).width() >= 800) {
        $('#section1_left').css({'width':'35%'}).show();
        $('#section1_right').css({'width':'65%'}).show();
        $('.content-next_button').hide();
        $('.content-prev_button').hide();
    }
    if ($(window).width() < 800) {
        $('#section1_left').css({'width':'100%'}).show();
        $('#section1_right').css({'width':'100%'}).hide();
        $('.content-next_button').show();
        $('.content-prev_button').hide();
    }

    //sets thumbnail img to fit correctly in container
    $('.artThumbnail').each(function(i) {
        $(this).css({'max-width':'100%'});
        if ($(this).width() < $(this).parent('.artThumbnail_container').width() + 10){
            $(this).css({'max-width':'100%','max-height':''});
        }
        if ($(this).height() < $(this).parent('.artThumbnail_container').height() + 10){
            $(this).css({'max-width':'','max-height':'100%'});
        }
    });
    //sets the position of img thumbnail containers based on window size
    var imgContainerWidth = ($('.artThumbnail_container:first').width());
    $('.artThumbnail_container').each(function(i) {
        $(this).css({'left': i*imgContainerWidth });
    });
}