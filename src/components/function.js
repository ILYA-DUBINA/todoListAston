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
export function getArrayDate(seconds) {
  let secondsToday = Math.floor(new Date().getTime() / 1000);
  let t = new Date(Date.UTC(1970, 0, 1));
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
export function getSecondsDate(days, hours, minutes, seconds) {
  return days * 86400 + hours * 3600 + minutes * 60 + seconds * 1;
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
  // days,
  // hours,
  // minutes,
  // seconds,
}) {
  let numberRandom = getRandomNumber(0, 1000) + getRandomNumber(1000, 5000);
  // let sumSec = getSecondsDate(days, hours, minutes, seconds);
  // let resultArrayDate = getArrayDate(sumSec);
  return {
    id: numberRandom,
    title: title,
    description: description,
    time: [],
    // time: resultArrayDate,
    archive: false,
    completed: false,
  };
}
export function calculateTimeLeft(arr) {
  const difference =
    +new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}
export function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
