/* global $ */

$(function () {
  $('.delete-game').click(function () {
    var self = $(this)

    $.ajax({
      url: '/games/' + this.dataset.id,
      method: 'DELETE'
    }).done(function () {
      self.parent().remove()
    })
  })

  $('.save-game').click(function () {
    $.ajax({
      url: '/games',
      method: 'POST',
      data: {
        sport: $('select[name="sport"]').val(),
        homeTeam: $('input[name="homeTeam"]').val(),
        awayTeam: $('input[name="awayTeam"]').val(),
        homeScore: $('input[name="homeScore"]').val(),
        awayScore: $('input[name="awayScore"]').val(),
        date: $('input[name="date"]').val(),
        played: $('input[name="played"]:checked').val()
      }
    }).done(function (message) {
      if (message) {
        $('.error-message').remove()

        var $messageHeader = $('<p>').addClass('error-message').text(message.header + ':')
        var $errorList = $('<ul>').addClass('error-message')
        message.errors.forEach(function (element) {
          $('<li>').text(element).appendTo($errorList)
        })
        $('.add-game')
          .append($messageHeader)
          .append($errorList)
      } else document.location.reload()
    })
  })
})
