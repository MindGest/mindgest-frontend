import dictionary from '../data/dictionary.json';

export default key => {
  return dictionary[key] || key;
};
