$(() => {

  const amenity_selected = {};
  $('input[type=checkbox]').change(function () {
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

  $.get('http://0.0.0.0:5001/api/v1/status').done((data, status) => {
    if (data.status === 'OK') $('#api_status').addClass('available');
    else $('#api_status').removeClass('available');
  })


  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
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
          ${ place.description }
        </div>
      </article>`;
      $('section.places').append(template);
    }
  });



});