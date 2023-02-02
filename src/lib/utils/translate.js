import dictionary from '../data/dictionary.json';

export default key => {
  key = key.toString();
  if (key) {
    const translation = dictionary[key] || key;
    return `${translation[0].toUpperCase()}${translation.slice(1)}`;
  }
  return '';
};
