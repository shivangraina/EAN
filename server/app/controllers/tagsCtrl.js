/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */

const Tag = require('../models/tags');

// The format for Tags is :-

/**
 * Year_Branch_Division_Batch
 *  Year -> FE, SE, TE, BE
 *  Branch -> Comp (C), ENTC(E), IT(I), X(None)
 *  Division -> 1 to 12 and X
 *  Batches -> 4 batches of any Alphabet format
 *  ALL -> Everyone
 */

exports.getAllTags = (req, res) => {
  Tag.find({}, { _id: 0, __v: 0 })
    .then((result) => {
      res.json(result);
      // console.log(result);
    })
    .catch((error) => {
      res.status(500).json(error);
      console.log(error, 'get all tags error');
    });
};

const getBranch = (div, verbose) => {
  // Get branch from division

  if (div <= 4) {
    return verbose ? 'Comp' : 'C';
  }
  if (div <= 8 && div > 4) {
    return verbose ? 'ENTC' : 'E';
  }

  if (div <= 12 && div > 8) {
    return verbose ? 'IT' : 'I';
  }
};

const getVerboseName = (y, d, ba) => {
  if (y === 'FE') {
    return `FE ${ba}${d}`;
  }

  if (ba === 'X' && d === 'X') {
    return y;
  }

  if (ba === 'X') {
    return `${y}${d}`;
  }

  return `${y} ${ba}${d}`;
};

const years = ['SE', 'TE', 'BE'];
const divisions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'X'];

// Some batches have different naming convention so handle that
// Mapping not confirmed yet
const batches = {
  FE: ['A', 'B', 'C', 'D', 'X'],
  SE: {
    C: ['D', 'E', 'F', 'G', 'X'],
    E: ['K', 'L', 'M', 'N', 'X'],
    I: ['K', 'L', 'M', 'N', 'X'],
  },
  TE: {
    C: ['K', 'L', 'M', 'N', 'X'],
    E: ['K', 'L', 'M', 'N', 'X'],
    I: ['K', 'L', 'M', 'N', 'X'],
  },
  BE: {
    C: ['K', 'L', 'M', 'N', 'X'],
    E: ['K', 'L', 'M', 'N', 'X'],
    I: ['K', 'L', 'M', 'N', 'X'],
  },
};

const branches = {
  C: 'Comp',
  I: 'IT',
  E: 'ENTC',
};

exports.getBranch = getBranch;
exports.getVerboseName = getVerboseName;
exports.branches = branches;
exports.batches = batches;

exports.createTags = (req, res) => {
  // Loop for adding Tags
  for (let i = 0; i < years.length; ++i) {
    for (let k = 0; k < divisions.length; ++k) {
      // Avoid creation of impossible tags
      if (divisions[k] === 'X') {
        // If division X then all batches X as well and create Year Tag
        Tag.create({
          tagName: `${years[i]}_X_X_X`,
          verboseName: `${years[i]}`,
        });
        continue;
      }
      for (
        let l = 0;
        l < batches[years[i]][getBranch(divisions[k])].length;
        ++l
      ) {
        Tag.create({
          tagName: `${years[i]}_${getBranch(divisions[k])}_${divisions[k]}_${
            batches[years[i]][getBranch(divisions[k])][l]
          }`,
          verboseName: getVerboseName(
            years[i],
            divisions[k],
            batches[years[i]][getBranch(divisions[k])][l]
          ),
        });
      }
    }
  }

  // Handle Tag creation for separate branches
  Object.keys(branches).map((key) => {
    for (let i = 0; i < years.length; ++i) {
      Tag.create({
        tagName: `${years[i]}_${key}_X_X`,
        verboseName: `${years[i]} ${branches[key]}`,
      });
    }
  });

  // Handle FE case separately
  for (let i = 0; i < divisions.length; ++i) {
    if (divisions[i] === 'X') {
      Tag.create({
        tagName: 'FE_X_X_X',
        verboseName: 'FE',
      });
    } else {
      for (let j = 0; j < batches.FE.length; ++j) {
        Tag.create({
          tagName: `FE_X_${divisions[i]}_${batches.FE[j]}`,
          verboseName: getVerboseName('FE', divisions[i], batches.FE[j]),
        });
      }
    }
  }

  Tag.create({
    tagName: 'ALL',
    verboseName: 'ALL',
  });

  res.send('Done');
};
