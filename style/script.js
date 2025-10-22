// Dynamic rendering with mapping and image after pages
let messageData;
let currentPage = 1;
let totalPages = 0;
let isOpen = false;
let hasPlayed = false;

$(document).ready(function () {
  const $envelope = $('#envelope');
  const $openBtn = $("#openBtn");
  const $resetBtn = $("#resetBtn");
    const $w20Btn = $("#w20Btn");
  const $lyricsContainer = $("#lyricsContainer");
  const $imageContainer = $("#imageContainer");
  const $recipientImage = $("#recipientImage");
    const $letter = $(".letter");
  const audio = document.getElementById("sound");

    // 20/10 popup elements
    const $popupContainer = $("#popupContainer");
    const bgm = document.getElementById("backgroundMusic");
    const $exitButton = $("#exitButton");
        // Pre-start overlay
        const $preStart = $("#preStart");
        const $preStartOk = $("#preStartOk");
        const $postThanks = $("#postThanks");
        const $postThanksOk = $("#postThanksOk");
    let popupInterval;
    const popupMessages = [
        "Chúc người ấy 20/10 vui vẻ 💐",
        "Cháu là con nhà ai mà xinh thế ⁉️",
        "Bạch nguyệt quang ⁉️",
        "Ôi định mệnh của tôi ⁉️",
        "Nhắn ai kia nhớ ngủ sớm, làm việc nhiều quá chẳng tốt đâu em à 🌸",
        "Luôn luôn rạng rỡ 😘",
        "Chúc cậu có tất cả ₍ᐢ.  ̫.ᐢ₎",
        "Chúc cậu luôn tràn đầy năng lượng và vui vẻ 💖",
        "May mắn luôn mỉm cười 🍀",
        "Love you ꒰ ˶• ༝ •˶꒱ა ♡",
    ];

  // Load data
  messageData = getMessageData();
  totalPages = messageData.pages.length;

    // Set page title dynamically
    try {
        const recipientTitle = (messageData && messageData.recipient) ? messageData.recipient : 'bạn';
        document.title = `Nhắn gửi ${recipientTitle}`;
    } catch (e) {
        // no-op
    }

  // Build pages
  messageData.pages.forEach((text, idx) => {
      let displayText;
      if (idx === 0) {
          // First page: greeting with recipient name
          displayText = `Gửi ${messageData.recipient} yêu 💘,<br><br>${text}`;
      } else {
          // Other pages: replace {name} placeholder
          displayText = text.replace(/{name}/g, messageData.recipient);
      }
      const $page = $('<div>')
        .addClass('lyric-page')
        .attr('id', 'page' + (idx + 1))
        .html('<p>' + displayText + '</p>');
      if (idx === 0) $page.addClass('active');
      $lyricsContainer.append($page);
  });
  // Image
  $recipientImage.attr('src', messageData.imageUrl);
    $recipientImage.on('error', function(){ 
        // Fallback to default.jpg if image not found
        if (this.src.indexOf('default.jpg') === -1) {
            this.src = './assets/default.jpg';
        } else {
            $(this).hide();
        }
    });

  function playAudioOnce() {
      if (!hasPlayed) {
          audio.play().then(() => hasPlayed = true).catch(() => {});
      }
  }

  $envelope.on('click', function () {
      if (isOpen) nextLyric();
  });

  $openBtn.on('click', function () {
      $envelope.removeClass("close").addClass("open");
      isOpen = true;
      $openBtn.hide();
      $resetBtn.show();
      // Ensure image is hidden on each open
      $imageContainer.hide().removeClass('show');
      $('#envelope').removeClass('showing-image');
      $letter.removeClass('show-image').css('animation','');
      playAudioOnce();
  });

  $resetBtn.on('click', function () {
      $envelope.removeClass("open").addClass("close");
      isOpen = false;
      // If image is showing, reverse animation first
      if ($letter.hasClass('show-image')) {
          $imageContainer.removeClass('show').fadeOut(200, function(){
              $letter.css('animation', 'zoomOutAndReturn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards');
              setTimeout(function(){
                  $('#envelope').removeClass('showing-image');
                  $letter.removeClass('show-image');
                  $letter.css('animation','');
                  currentPage = 1;
                  updateActivePage();
                  $lyricsContainer.show();
                  $resetBtn.hide();
                  $openBtn.show();
              }, 700);
          });
      } else {
          setTimeout(function () {
              currentPage = 1;
              updateActivePage();
              $lyricsContainer.show();
              $imageContainer.hide();
              $resetBtn.hide();
              $openBtn.show();
          }, 600);
      }
  });

  function nextLyric() {
      if (currentPage < totalPages) {
          currentPage++;
          updateActivePage();
      } else if (currentPage === totalPages) {
          // Animate letter up and show image
          $lyricsContainer.fadeOut(300, function(){
              $('#envelope').addClass('showing-image');
              $letter.addClass('show-image');
              $imageContainer.show().addClass('show');
              // Show 20/10 button when image is displayed
              $w20Btn.fadeIn(200);
          });
          currentPage++;
      } else {
          // Restart: hide image, animate letter back, show first page
          currentPage = 1;
          $imageContainer.removeClass('show').fadeOut(200, function(){
              $letter.css('animation', 'zoomOutAndReturn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards');
              setTimeout(function(){
                  $('#envelope').removeClass('showing-image');
                  $letter.removeClass('show-image');
                  $letter.css('animation','');
                  $imageContainer.hide();
                  $lyricsContainer.fadeIn(300);
                  updateActivePage();
              }, 700);
          });
      }
  }

  function updateActivePage() {
      $(".lyric-page").removeClass("active");
      $("#page" + currentPage).addClass("active");
  }

    // ===== Pre-start tip logic =====
    try {
        if (sessionStorage.getItem('preStartSeen') !== '1') {
            $preStart.fadeIn(200);
        }
    } catch(e) {}
    function hidePreStart() {
        $preStart.fadeOut(150);
        try { sessionStorage.setItem('preStartSeen','1'); } catch(e) {}
    }
    $preStartOk.on('click', function(e){ e.stopPropagation(); hidePreStart(); });
    $preStart.on('click', function(e){ if (e.target.id === 'preStart') hidePreStart(); });

    // ===== 20/10 Popup logic =====
        function createPopup() {
            const $p = $('<div>').addClass('popup')
                .text(popupMessages[Math.floor(Math.random() * popupMessages.length)]);
            const w = $popupContainer.width() || window.innerWidth;
            const h = $popupContainer.height() || window.innerHeight;
            const x = Math.random() * (w - 180);
            const y = Math.random() * (h - 90);
            $p.css({ left: x + 'px', top: y + 'px' });
            $popupContainer.append($p);
            setTimeout(() => $p.remove(), 5000);
        }

    function startPopups() {
        let active = 0;
        const maxPopups = 35;
        const createInterval = 250;
        popupInterval = setInterval(() => {
            if (active < maxPopups) {
                createPopup();
                active++;
                setTimeout(() => active--, 5000);
            }
        }, createInterval);
    }

    function stopPopups(showThanks) {
        clearInterval(popupInterval);
        $popupContainer.hide();
        $('body').removeClass('bgAnimated popup-mode');
        $popupContainer.find('.popup').remove();
        try { bgm.pause(); } catch(e) {}
        $exitButton.hide();
        // Ensure main content returns
        $('.envlope-wrapper, .controls').show();
        if (showThanks) {
            // Small delay to avoid visual clash
            setTimeout(() => { $postThanks.fadeIn(200); }, 100);
        }
    }

    function enterFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen();
    }

    $w20Btn.on('click', function(){
        // Hide image and reset letter state first
        $imageContainer.removeClass('show').hide();
        $('#envelope').removeClass('showing-image');
        $letter.removeClass('show-image').css('animation','');
        currentPage = 1;
        updateActivePage();
        $lyricsContainer.show();
        
        // Close envelope
        $envelope.removeClass("open").addClass("close");
        isOpen = false;
        $w20Btn.hide();
        $resetBtn.hide();
        $openBtn.show();
        
        // Small delay to let envelope close animation finish
        setTimeout(function(){
            // Start popup immediately
            $popupContainer.show();
            $('body').addClass('bgAnimated popup-mode');
            try { bgm.play(); } catch(e) {}
            enterFullscreen();
            startPopups();
            $exitButton.show();
        }, 600);
    });

    // (removed) extra tap to start popup; now starts immediately on button click

    $exitButton.on('click', function(e){
        e.stopPropagation();
        stopPopups(true);
            // Restore main content after popup
            $('body').removeClass('popup-mode');
            $('.envlope-wrapper, .controls').show();
    });

    // Hide 20/10 button on reset
    $resetBtn.on('click', function(){
        $w20Btn.hide();
        stopPopups(false);
    });

    // Post-thanks overlay handlers
    function hidePostThanks() { $postThanks.fadeOut(150); }
    $postThanksOk.on('click', function(e){ e.stopPropagation(); hidePostThanks(); });
    $postThanks.on('click', function(e){ if (e.target.id === 'postThanks') hidePostThanks(); });
});
