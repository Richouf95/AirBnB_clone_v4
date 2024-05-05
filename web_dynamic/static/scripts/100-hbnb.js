$(() => {

  $.get('http://127.0.0.1:5001/api/v1/status').done((data, status) => {
    if (data.status === 'OK') $('#api_status').css('background-color', '#ff545f');
    else $('#api_status').css('background-color', '#cccccc');
  })

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done((data) => {
    for (const place of data) {
      const template = `
      <article>
        <div class="title_box">
          <h2>${ place.name }</h2>
          <div class="price_by_night">${ place.price_by_night }</div>
        </div>
        <div class="information">
          <div class="max_guest">${ place.max_guest } Guest</div>
            <div class="number_rooms">${ place.number_rooms } Bedroom</div>
            <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
        </div>
        <div class="description">
          <b>Description</b> : <br />${ place.description }
        </div>
      </article>`;
      $('section.places').append(template);
    }
  });

  const amenity_selected = {};
  const state_selected = {};
  const city_selected = {};

  $('.amenity_checkbox').click(function () {
    if ($(this).prop('checked')) {
      amenity_selected[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete amenity_selected[$(this).attr('data-id')];
    }
    if (Object.keys(amenity_selected).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      checked_amenity = Object.values(amenity_selected).join(', ');
      if (checked_amenity.length > 60) $('div.amenities h4').text(checked_amenity.substring(0, 60) + '...')
      else $('div.amenities h4').text(checked_amenity);
    }
  });

  $('.state_checkbox').click(function () {
    if ($(this).prop('checked')) {
      state_selected[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete state_selected[$(this).attr('data-id')];
    }
    if (Object.keys(state_selected).length === 0) {
      $('div.locations h4').html('&nbsp');
    } else {
      checked_state = Object.values(state_selected).join(', ');
      if (checked_state.length > 60) $('div.locations h4').text(checked_state.substring(0, 60) + '...')
      else $('div.locations h4').text(checked_state);
    }
  });

  $('.city_checkbox').click(function () {
    if ($(this).prop('checked')) {
      city_selected[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete city_selected[$(this).attr('data-id')];
    }
    if (Object.keys(city_selected).length === 0) {
      $('div.locations h4').html('&nbsp');
    } else {
      checked_city = Object.values(city_selected).join(', ');
      if (checked_city.length > 60) $('div.locations h4').text(checked_city.substring(0, 60) + '...')
      else $('div.locations h4').text(checked_city);
    }
  });

  $('.filters button').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenity_selected),
        states: Object.keys(state_selected),
        cities: Object.keys(city_selected)
      })
    }).done( data => {
      $('section.places').empty();

      for (const place of data) {
        const filters_resulte_template = `
          <article>
            <div class="title_box">
              <h2>${ place.name }</h2>
              <div class="price_by_night">${ place.price_by_night }</div>
            </div>
            <div class="information">
              <div class="max_guest">${ place.max_guest } Guest</div>
                <div class="number_rooms">${ place.number_rooms } Bedroom</div>
                <div class="number_bathrooms">${ place.number_bathrooms } Bathroom</div>
            </div>
            <div class="description">
              <b>Description</b> : <br />${ place.description }
            </div>
          </article>`;
        $('section.places').append(filters_resulte_template);
      }
    })
  })

});