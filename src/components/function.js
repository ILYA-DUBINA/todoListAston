const words = [
  'Got',
  'ability',
  'shop',
  'recall',
  'fruit',
  'easy',
  'dirty',
  'giant',
  'shaking',
  'ground',
  'weather',
  'lesson',
  'almost',
  'square',
  'forward',
  'bend',
  'cold',
  'broken',
  'distant',
  'adjective.',
];
function getRandomWord(firstLetterToUppercase = false) {
  const word = words[getRandomNumber(0, words.length - 1)];
  return firstLetterToUppercase
    ? word.charAt(0).toUpperCase() + word.slice(1)
    : word;
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getArrayDate(seconds) {
  let secondsToday = Math.floor(new Date().getTime() / 1000);
  var t = new Date(Date.UTC(1970, 0, 1));
  t.setUTCSeconds(seconds + secondsToday);
  return [
    t.getFullYear(),
    t.getMonth(),
    t.getDate(),
    t.getHours(),
    t.getMinutes(),
    t.getSeconds(),
  ];
}
function getSecondsDate(years, months, days, hours, minutes, seconds) {
  return (
    years * 31536000 +
    months * 2592000 +
    days * 86400 +
    hours * 3600 +
    minutes * 60 +
    seconds
  );
}
export function generateWords(length = 10) {
  return (
    [...Array(length)]
      .map((_, i) => getRandomWord(i === 0))
      .join(' ')
      .trim() + '.'
  );
}

export function getOneItemElement({
  title,
  description,
  years,
  months,
  days,
  hours,
  minutes,
  seconds,
}) {
  let numberRandom = getRandomNumber(0, 1000) + getRandomNumber(1000, 5000);
  let sumSec = getSecondsDate(years, months, days, hours, minutes, seconds);
  let resultArrayDate = getArrayDate(sumSec);
  return {
    id: numberRandom,
    title: title,
    description: description,
    time: resultArrayDate,
    archive: false,
  };
}

export function calculateTimeLeft(arr) {
  const difference =
    +new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      years: Math.floor(difference / (1000 * 60 * 60 * 24 * 7 * 4 * 12)),
      months: Math.floor((difference / (1000 * 60 * 60 * 24 * 7 * 4)) % 12),
      // weeks: Math.floor((difference / (1000 * 60 * 60 * 24 * 7)) % 4),
      days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}
