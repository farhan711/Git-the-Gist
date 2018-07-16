function getUserGists(user, callback) {
  var requestUrl = 'https://api.github.com/users/' + user + '/gists';

  $.ajax({
    url: requestUrl,
    dataType: 'json'
  }).done(function(gists){
    callback(gists);
  }).fail(function(error){
    callback(null, error);
  });
}

function buildGistList(parent, gists, clickFunc) {
  gists.forEach(function(gist, index) {

    var listItem = $('<li/>')
      .addClass('ms-ListItem')
      .addClass('is-selectable')
      .attr('tabindex', index)
      .appendTo(parent);

    var desc = $('<span/>')
      .addClass('ms-ListItem-primaryText')
      .text(gist.description)
      .appendTo(listItem);

    var desc = $('<span/>')
      .addClass('ms-ListItem-secondaryText')
      .text(buildFileList(gist.files))
      .appendTo(listItem);

    var updated = new Date(gist.updated_at);

    var desc = $('<span/>')
      .addClass('ms-ListItem-tertiaryText')
      .text('Last updated ' + updated.toLocaleString())
      .appendTo(listItem);

    var selTarget = $('<div/>')
      .addClass('ms-ListItem-selectionTarget')
      .appendTo(listItem);

    var id = $('<input/>')
      .addClass('gist-id')
      .attr('type', 'hidden')
      .val(gist.id)
      .appendTo(listItem);
  });

  $('.ms-ListItem').on('click', clickFunc);
}

function buildFileList(files) {

  var fileList = '';

  for (var file in files) {
    if (files.hasOwnProperty(file)) {
      if (fileList.length > 0) {
        fileList = fileList + ', ';
      }

      fileList = fileList + files[file].filename + ' (' + files[file].language + ')';
    }
  }

  return fileList;
}