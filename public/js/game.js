/* globals $ */

$(function () {
  $('.edit-game').click(function () {
    $('.edit-game').hide()
    $('.delete-game').hide()

    var $body = $('body')
    var $section = $('<section>').addClass('update-game')
    var $container = $('<div>').addClass('container')
    var $form = $('<form>')

    $form.appendTo($container)
    $container.appendTo($section)
    $section.appendTo($body)

    // Create sport div element and append to form
    var $sportDiv = $('<div>')
    var $sportLabel = $('<label>')
      .attr('for', 'sport')
      .text('Sport:')
    var $sportSelect = $('<select>')
      .attr('name', 'sport')
    var $optionDefault = $('<option disabled>')
      .val('')
      .text('Select a sport')
    var $option1 = $('<option>')
      .addClass('opt-Basketball')
      .val('Basketball')
      .text('Basketball')
    var $option2 = $('<option>')
      .addClass('opt-Football')
      .val('Football')
      .text('Football')
    var $option3 = $('<option>')
      .addClass('opt-Baseball')
      .val('Baseball')
      .text('Baseball')
    var $option4 = $('<option>')
      .addClass('opt-Soccer')
      .val('Soccer')
      .text('Soccer')
    var $option5 = $('<option>')
      .addClass('opt-Hockey')
      .val('Hockey')
      .text('Hockey')
    $sportSelect
      .append($optionDefault)
      .append($option1)
      .append($option2)
      .append($option3)
      .append($option4)
      .append($option5)
    $sportDiv
      .append($sportLabel)
      .append($sportSelect)
    $form.append($sportDiv)
    $('.opt-' + $('.sport').text()).attr('selected', true)

    // Create homeTeam div element and append to form
    var $homeTeamDiv = $('<div>')
    var $homeTeamLabel = $('<label>')
      .attr('for', 'homeTeam')
      .text('Home Team:')
    var $homeTeamInput = $('<input>')
      .attr({
        type: 'text',
        name: 'homeTeam'
      })
      .val($('.homeTeam').text())
    $homeTeamDiv
      .append($homeTeamLabel)
      .append($homeTeamInput)
    $form.append($homeTeamDiv)

    // Create awayTeam div element and append to form
    var $awayTeamDiv = $('<div>')
    var $awayTeamLabel = $('<label>')
      .attr('for', 'awayTeam')
      .text('Away Team:')
    var $awayTeamInput = $('<input>')
      .attr({
        type: 'text',
        name: 'awayTeam'
      })
      .val($('.awayTeam').text())
    $awayTeamDiv
      .append($awayTeamLabel)
      .append($awayTeamInput)
    $form.append($awayTeamDiv)

    // Create homeScore div element and append to form
    var $homeScoreDiv = $('<div>')
    var $homeScoreLabel = $('<label>')
      .attr('for', 'homeScore')
      .text('Home Score:')
    var $homeScoreInput = $('<input>')
      .attr({
        type: 'number',
        min: 0,
        name: 'homeScore',
        value: 0
      })
      .val($('.homeScore').text())
    $homeScoreDiv
      .append($homeScoreLabel)
      .append($homeScoreInput)
    $form.append($homeScoreDiv)

    // Create awayScore div element and append to form
    var $awayScoreDiv = $('<div>')
    var $awayScoreLabel = $('<label>')
      .attr('for', 'awayScore')
      .text('Away Score:')
    var $awayScoreInput = $('<input>')
      .attr({
        type: 'number',
        min: 0,
        name: 'awayScore',
        value: 0
      })
      .val($('.awayScore').text())
    $awayScoreDiv
      .append($awayScoreLabel)
      .append($awayScoreInput)
    $form.append($awayScoreDiv)

    // Create date div element and append to form
    var $dateDiv = $('<div>')
    var $dateLabel = $('<label>')
      .attr('for', 'date')
      .text('Date:')
    var gamedate = new Date($('.date').text()).toISOString().slice(0, 10)
    var $dateInput = $('<input>')
      .attr({
        type: 'date',
        name: 'date'
      })
      .val(gamedate)
    $dateDiv
      .append($dateLabel)
      .append($dateInput)
    $form.append($dateDiv)

    // Create played div element and append to form
    var $playedDiv = $('<div>')
    var $playedLabel = $('<label>')
      .attr('for', 'played')
      .text('Game Over?')
    var $playedSpanNo = $('<span>')
      .text('No')
    var $playedInputNo = $('<input>')
      .addClass('played-false')
      .attr({
        type: 'radio',
        name: 'played',
        value: 'false'
      })
    var $playedSpanYes = $('<span>')
      .text('Yes')
    var $playedInputYes = $('<input>')
      .addClass('played-true')
      .attr({
        type: 'radio',
        name: 'played',
        value: 'true'
      })
    $playedDiv
      .append($playedLabel)
      .append($playedSpanNo)
      .append($playedInputNo)
      .append($playedSpanYes)
      .append($playedInputYes)
    $form.append($playedDiv)
    $('.played-' + $('.played').text()).attr('checked', true)

    // Create action div element and append to form
    var $actionDiv = $('<div>')
    var $submitButton = $('<button>')
      .addClass('save-changes')
      .attr('type', 'button')
      .text('Save & Close')
    var $cancelButton = $('<button>')
      .addClass('cancel-changes')
      .attr('type', 'button')
      .text('Cancel')
    $actionDiv
      .append($submitButton)
      .append($cancelButton)
    $form.append($actionDiv)
  })

  $(document).on('click', '.save-changes', function () {
    $.ajax({
      url: '/games/' + $('.id').text(),
      method: 'PUT',
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
        $('.update-game .container')
          .append($messageHeader)
          .append($errorList)
      } else document.location.reload()
    })
  })

  $(document).on('click', '.cancel-changes', function () {
    $('.update-game').remove()
    $('.edit-game').show()
    $('.delete-game').show()
  })

  $(document).on('click', '.delete-game', function () {
    $.ajax({
      url: '/games/' + $('.id').text(),
      method: 'DELETE'
    }).done(function () {
      window.location = '/games'
    })
  })
})
