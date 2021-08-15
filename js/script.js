
var dem = 0;
var chon = []; 
var ques = $('#ques'); 

hienthiTiep();
//nút tiếp theo
$('#after').on('click', function (e) {
  e.preventDefault();
  if (ques.is(':animated')) {
    return false;
  }
  luaChon();

  if (isNaN(chon[dem])) {
    alert('Không được để trống đáp án!');
  } else {
    dem++;
    hienthiTiep();
  }
});
//nút trước đó
$('#before').on('click', function (e) {
  e.preventDefault();

  if (ques.is(':animated')) {
    return false;
  }
  luaChon();
  dem--;
  hienthiTiep();
});
//làm lại
$('#again').on('click', function (e) {
  e.preventDefault();

  if (ques.is(':animated')) {
    return false;
  }
  dem = 0;
  chon = [];
  hienthiTiep();
  $('#again').hide();
});

$('.btn').on('mouseenter', function () {
  $(this).addClass('active');
});
$('.btn').on('mouseleave', function () {
  $(this).removeClass('active');
});

//tạo câu hoi
function taoMoiCauHoi(i) {
  var ch = $('<div>', {
    id: 'question'
  });

  var header = $('<h2> Câu hỏi thứ ' + (i + 1) + ':</h2>');
  ch.append(header);

  var question = $('<p>').append(dscauhoi[i].question);
  ch.append(question);

  var radioButtons = taoRadio(i);
  ch.append(radioButtons);

  return ch;
}

function taoRadio(i) {
  var taoRadios = $('<ul>');
  var item;
  var input = '';
  for (var i = 0; i < dscauhoi[i].choices.length; i++) {
    item = $('<li>');
    input = '<input type="radio" name="answer" value=' + i + ' />';
    input += dscauhoi[i].choices[i];
    item.append(input);
    taoRadios.append(item);
  }
  return taoRadios;
}

// Reads the user selection and pushes the value to an array
function luaChon() {
  chon[dem] = +$('input[name="answer"]:checked').val();
}

// Displays after requested element
function hienthiTiep() {
  ques.fadeOut(function () {
    $('#question').remove();

    if (dem < dscauhoi.length) {
      var cHoiTiepTheo = taoMoiCauHoi(dem);
      ques.append(cHoiTiepTheo).fadeIn();
      if (!(isNaN(chon[dem]))) {
        $('input[value=' + chon[dem] + ']').prop('checked', true);
      }

      // Controls display of 'prev' button
      if (dem === 1) {
        $('#before').show();
      } else if (dem === 0) {

        $('#before').hide();
        $('#after').show();
      }
    } else {
      var hienDiem = displayScore();
      ques.append(hienDiem).fadeIn();
      $('#after').hide();
      $('#before').hide();
      $('#again').show();
    }
  });
}

// Computes score and returns a paragraph element to be displayed
function displayScore() {
  var diemSo = $('<p>', { id: 'question' });

  var dung = 0;
  for (var i = 0; i < chon.length; i++) {
    if (chon[i] === dscauhoi[i].answer) {
      dung++;
    }
  }

  diemSo.append(' Kết quả có ' + dung + ' câu đúng trong ' +
    dscauhoi.length + ' câu ');
  return diemSo;
}

