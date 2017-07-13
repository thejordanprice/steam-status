// I wanted to capitalize some of the letters.
export var capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// timestring is handy for throwing the current 12 hour format time.
export var timestring = function () {
  var time = new Date();
  time = time.toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true });
  return time;
}

// Doing random DOM crap depending on status.
export var funcrap = function(data) {
  // If it was over 90% online.
  if(data.online > 90) {
    document.getElementById('percent-online').style.color = 'GREEN';
  };

  // If it was between 50% and 89% online.
  if(data.online < 89 && data.online > 50) {
    document.getElementById('percent-online').style.color = 'YELLOW';
  };

  // If it was under 50% online
  if(data.online < 49) {
    document.getElementById('percent-online').style.color = 'RED';
    document.getElementById('percent-online').innerHTML = 'WTF GABE';
  };

  // If it was completely down.
  if(data.online < 1 ) {
    document.getElementById('app').innerHTML = 'more shit';
  };
}