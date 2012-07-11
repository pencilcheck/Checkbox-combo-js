function isArray(unknown) {
  return Object.prototype.toString.apply(unknown) == '[object Array]';
}

$(function() {
  var rules = [];
  var container, messages;

  // Methods
  comboSetup = function(c, m) {
    
    container = $(c);
    messages = $(m);

    $('input[type="checkbox"]').live('change', function() {
      process();
    });
  }

  checked = function() {

    var temps = [];
    $('input[type="checkbox"]:checked').each(function() {
      temps.push(parseInt($(this).attr('id')));
    });
    return temps;
  }

  match = function(checked, conditions) {
    if (checked.length > conditions.length) return false;
    var len = checked.length;
    var count = 0;
    _.each(checked, function(value) {
      if (conditions.indexOf(value) > -1) {
        count += 1;
      }
    });

    return (count == len);
  }

  process = function() {

    messages.empty();

    checks = checked();
    _.each(rules, function(value) {
      if (match(checks, value['conds'])) {
        messages.append('<li>' + value['msg'] + '</li>');
      }
    });
  }

  addCheckbox = function(label, id) {

    if (id) {

      container.append('<label for="' + id + '"><input name="' + id + '" id="' + id + '" type="checkbox" />' + label + '</label>');
    }
  };

  addRule = function(conditions, message) {

    if (conditions && isArray(conditions) && message) {

      conditions = conditions.sort();
      rules.push({conds: conditions, msg: message});
    }
  }
});
