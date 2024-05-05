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
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest</div>
            <div class="number_rooms">${place.number_rooms} Bedroom</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
        </div>
        <div class="description">
          <b>Description</b> : <br />${place.description}
        </div>
        <div>
          <h2 style="font-size: 14px; text-align: left; margin-top: 10px;">Reviews <span style="cursor: pointer; color: #ff545f" class="let_see_reviews_${place.id}" >show</span></h2>
          <ul class="display_place_${place.id}revicew" style='padding-left: 0'></ul>
        <div>
      </article>`;
      $('section.places').append(template);

      $(`.let_see_reviews_${place.id}`).click(() => {
        show_review(place.id, $(`.let_see_reviews_${place.id}`).text())
      })
    }
  });

  const show_review = (place_id, text) => {
    if (text === "show") {
      const url = `http://127.0.0.1:5001/api/v1/places/${place_id}/reviews`
      $.ajax({
        type: 'GET',
        url
      }).done(data => {
        for (const review of data) {
          const review_template = `<li style='list-style: none; margin-top:10px;'>${review.text}</li>`
          $(`.display_place_${place_id}revicew`).append(review_template)
        }
      })
      $(`.let_see_reviews_${place_id}`).text('hide')
    }

    if (text === 'hide') {
      $(`.let_see_reviews_${place_id}`).click(() => {
        $(`.display_place_${place_id}revicew`).empty();
        $(`.let_see_reviews_${place_id}`).text('show')
      })
    }
  }

  const amenity_selected = {};
  const state_selected = {};
  const city_selected = {};

  $('.amenity_checkbox').click((e) => {
    const check_box = e.target;
    const id = check_box.dataset.id;
    const name = check_box.dataset.name;

    if (check_box.checked) {
      amenity_selected[id] = name;
    } else if (!check_box.checked) {
      delete amenity_selected[id];
    }

    if (Object.keys(amenity_selected).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      checked_amenity = Object.values(amenity_selected).join(', ');
      if (checked_amenity.length > 60) $('div.amenities h4').text(checked_amenity.substring(0, 60) + '...')
      else $('div.amenities h4').text(checked_amenity);
    }
  });

  $('.state_checkbox').click((e) => {
    const check_box = e.target;
    const id = check_box.dataset.id;
    const name = check_box.dataset.name;

    if (check_box.checked) {
      state_selected[id] = name;
    } else if (!check_box.checked) {
      delete state_selected[id];
    }
    if (Object.keys(state_selected).length === 0) {
      $('div.locations h4').html('&nbsp');
    } else {
      checked_state = Object.values(state_selected).join(', ');
      if (checked_state.length > 60) $('div.locations h4').text(checked_state.substring(0, 60) + '...')
      else $('div.locations h4').text(checked_state);
    }
  });

  $('.city_checkbox').click((e) => {
    const check_box = e.target;
    const id = check_box.dataset.id;
    const name = check_box.dataset.name;

    if (check_box.checked) {
      city_selected[id] = name;
    } else if (!check_box.checked) {
      delete city_selected[id];
    }
    if (Object.keys(city_selected).length === 0) {
      $('div.locations h4').html('&nbsp');
    } else {
      checked_city = Object.values(city_selected).join(', ');
      if (checked_city.length > 60) $('div.locations h4').text(checked_city.substring(0, 60) + '...')
      else $('div.locations h4').text(checked_city);
    }
  });

  $('#go_search').click(() => {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenity_selected),
        states: Object.keys(state_selected),
        cities: Object.keys(city_selected)
      })
    }).done(data => {
      $('section.places').empty();

      for (const place of data) {
        const filters_resulte_template = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest</div>
                <div class="number_rooms">${place.number_rooms} Bedroom</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
            </div>
            <div class="description">
              <b>Description</b> : <br />${place.description}
            </div>
            <div>
              <h2 style="font-size: 14px; text-align: left; margin-top: 10px;">Reviews <span style="cursor: pointer; color: #ff545f" class="let_see_reviews_${place.id}" >show</span></h2>
              <ul class="display_place_${place.id}revicew" style='padding-left: 0'></ul>
            <div>
          </article>`;
        $('section.places').append(filters_resulte_template);

        $(`.let_see_reviews_${place.id}`).click(() => {
          show_review(place.id, $(`.let_see_reviews_${place.id}`).text())
        })
      }
    })
  })

});