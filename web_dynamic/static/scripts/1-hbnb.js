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
  });